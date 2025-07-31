#!/bin/bash
set -e

echo "🔧 Fixing Nginx configuration for static files..."

# Check if we're on the server
if [ "$(hostname)" = "ip-172-26-6-226" ]; then
    echo "✅ Running on Lightsail server"
    
    echo "📄 Current Nginx configuration:"
    sudo cat /etc/nginx/sites-available/default
    
    echo "🔧 Creating new Nginx configuration..."
    sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Handle static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

    echo "🔍 Testing Nginx configuration..."
    sudo nginx -t
    
    if [ $? -eq 0 ]; then
        echo "✅ Nginx configuration is valid"
        echo "🔄 Reloading Nginx..."
        sudo systemctl reload nginx
        
        echo "🌐 Testing website..."
        sleep 2
        curl -I http://localhost/ 2>/dev/null && echo "✅ Website is accessible locally" || echo "❌ Local access failed"
        
        echo "📁 Checking web server contents:"
        ls -la /var/www/html/
        
        echo "✅ Nginx configuration fixed!"
    else
        echo "❌ Nginx configuration is invalid"
        exit 1
    fi
else
    echo "❌ This script should be run on the Lightsail server"
    echo "To run on server, SSH to your Lightsail instance and execute:"
    echo "ssh ubuntu@16.176.228.22"
    echo "Then run: ./fix-nginx-config.sh"
fi 