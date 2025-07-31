#!/bin/bash
set -e

echo "🚀 Quick fix for website deployment..."

echo "📋 Step 1: Check if we're on the server..."
if [ "$(hostname)" = "ip-172-26-6-226" ]; then
    echo "✅ Running on Lightsail server"
    
    echo ""
    echo "📋 Step 2: Clean web server directory..."
    sudo rm -rf /var/www/html/*
    echo "✅ Web server directory cleaned"
    
    echo ""
    echo "📋 Step 3: Copy files from project to web server..."
    sudo cp -r /home/ubuntu/mo_works_frontend_task/out/* /var/www/html/
    sudo chown -R www-data:www-data /var/www/html
    echo "✅ Files copied to web server"
    
    echo ""
    echo "📋 Step 4: Verify files were copied..."
    echo "📁 Web server contents:"
    ls -la /var/www/html/
    
    echo ""
    echo "📋 Step 5: Fix Nginx configuration..."
    sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    
    root /var/www/html;
    index index.html index.htm;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

    echo ""
    echo "📋 Step 6: Test and reload Nginx..."
    sudo nginx -t
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded"
    
    echo ""
    echo "📋 Step 7: Test website access..."
    sleep 2
    curl -I http://localhost/ 2>/dev/null && echo "✅ Website is accessible locally" || echo "❌ Local access failed"
    
    echo ""
    echo "✅ Quick fix completed!"
    echo "🌐 Your website should now be accessible at: http://16.176.228.22"
else
    echo "❌ This script should be run on the Lightsail server"
    echo "To run on server, SSH to your Lightsail instance and execute:"
    echo "ssh ubuntu@16.176.228.22"
    echo "Then run: ./quick-fix.sh"
fi 