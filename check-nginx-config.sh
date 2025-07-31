#!/bin/bash
set -e

echo "🔍 Checking Nginx configuration and website status..."

# Check if we're on the server
if [ "$(hostname)" = "ip-172-26-6-226" ]; then
    echo "✅ Running on Lightsail server"
    
    echo "📁 Web server contents:"
    ls -la /var/www/html/
    
    echo "🌐 Nginx status:"
    sudo systemctl status nginx --no-pager
    
    echo "📄 Nginx configuration:"
    sudo cat /etc/nginx/sites-available/default
    
    echo "🔍 Checking for index.html:"
    if [ -f "/var/www/html/index.html" ]; then
        echo "✅ index.html found"
        echo "📄 File size:"
        ls -lh /var/www/html/index.html
        echo "📄 First few lines of index.html:"
        head -5 /var/www/html/index.html
    else
        echo "❌ index.html not found"
        echo "📁 Available HTML files:"
        find /var/www/html/ -name "*.html" -type f
    fi
    
    echo "🌐 Testing local access:"
    curl -I http://localhost/ 2>/dev/null && echo "✅ Local access successful" || echo "❌ Local access failed"
    
    echo "✅ Nginx check completed!"
else
    echo "❌ This script should be run on the Lightsail server"
    echo "To run on server, SSH to your Lightsail instance and execute:"
    echo "ssh ubuntu@16.176.228.22"
    echo "Then run: ./check-nginx-config.sh"
fi 