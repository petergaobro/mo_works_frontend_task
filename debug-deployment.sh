#!/bin/bash
set -e

echo "🔍 Comprehensive deployment debug script..."

echo "📋 Step 1: Check if we're on the server..."
if [ "$(hostname)" = "ip-172-26-6-226" ]; then
    echo "✅ Running on Lightsail server"
    
    echo ""
    echo "📋 Step 2: Check web server contents..."
    echo "📁 /var/www/html contents:"
    ls -la /var/www/html/
    
    echo ""
    echo "📋 Step 3: Check if index.html exists..."
    if [ -f "/var/www/html/index.html" ]; then
        echo "✅ index.html found"
        echo "📄 File size: $(ls -lh /var/www/html/index.html | awk '{print $5}')"
        echo "📄 First few lines:"
        head -3 /var/www/html/index.html
    else
        echo "❌ index.html not found!"
        echo "📁 Available HTML files:"
        find /var/www/html/ -name "*.html" -type f
    fi
    
    echo ""
    echo "📋 Step 4: Check Nginx status..."
    sudo systemctl status nginx --no-pager
    
    echo ""
    echo "📋 Step 5: Check Nginx configuration..."
    echo "📄 Current config:"
    sudo cat /etc/nginx/sites-available/default
    
    echo ""
    echo "📋 Step 6: Test Nginx configuration..."
    sudo nginx -t
    
    echo ""
    echo "📋 Step 7: Check Nginx error logs..."
    echo "📄 Recent error logs:"
    sudo tail -10 /var/log/nginx/error.log
    
    echo ""
    echo "📋 Step 8: Test local access..."
    echo "🌐 Testing http://localhost/"
    curl -I http://localhost/ 2>/dev/null || echo "❌ Local access failed"
    
    echo ""
    echo "📋 Step 9: Check project directory..."
    echo "📁 /home/ubuntu/mo_works_frontend_task contents:"
    ls -la /home/ubuntu/mo_works_frontend_task/
    
    echo ""
    echo "📋 Step 10: Check if build output exists..."
    if [ -d "/home/ubuntu/mo_works_frontend_task/out" ]; then
        echo "✅ out directory found"
        echo "📁 out directory contents:"
        ls -la /home/ubuntu/mo_works_frontend_task/out/
    else
        echo "❌ out directory not found!"
    fi
    
    echo ""
    echo "✅ Debug completed!"
else
    echo "❌ This script should be run on the Lightsail server"
    echo "To run on server, SSH to your Lightsail instance and execute:"
    echo "ssh ubuntu@16.176.228.22"
    echo "Then run: ./debug-deployment.sh"
fi 