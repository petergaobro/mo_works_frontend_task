#!/bin/bash
set -e

echo "🔍 Checking deployment status..."

# Check if we're on the server
if [ "$(hostname)" = "ip-172-26-6-226" ]; then
    echo "✅ Running on Lightsail server"
    
    echo "📁 Project directory contents:"
    ls -la /home/ubuntu/mo_works_frontend_task/
    
    echo "📁 Web server contents:"
    ls -la /var/www/html/
    
    echo "🌐 Checking web server status:"
    sudo systemctl status nginx --no-pager || echo "Nginx not running"
    
    echo "📊 Disk usage:"
    df -h /var/www/html
    
    echo "🔍 Checking for index.html:"
    if [ -f "/var/www/html/index.html" ]; then
        echo "✅ index.html found"
        echo "📄 First few lines of index.html:"
        head -5 /var/www/html/index.html
    else
        echo "❌ index.html not found"
    fi
    
    echo "✅ Deployment check completed!"
else
    echo "❌ This script should be run on the Lightsail server"
    echo "To run on server, SSH to your Lightsail instance and execute:"
    echo "ssh ubuntu@16.176.228.22"
    echo "Then run: ./check-deployment.sh"
fi 