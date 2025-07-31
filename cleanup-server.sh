#!/bin/bash
set -e

echo "🧹 Server cleanup script for Lightsail"

# Check if we're on the server
if [ "$(hostname)" = "ip-172-26-6-226" ]; then
    echo "✅ Running on Lightsail server"
    
    echo "🧹 Cleaning old deployment directories..."
    rm -rf /home/ubuntu/next-app 2>/dev/null || echo "next-app directory not found"
    rm -rf /home/ubuntu/temp_static 2>/dev/null || echo "temp_static directory not found"
    
    echo "🧹 Cleaning old archive files..."
    rm -f /home/ubuntu/*.tar.gz 2>/dev/null || echo "No tar.gz files found"
    
    echo "📁 Current directory contents:"
    ls -la /home/ubuntu/
    
    echo "📁 Web server contents:"
    ls -la /var/www/html/
    
    echo "✅ Server cleanup completed!"
else
    echo "❌ This script should be run on the Lightsail server"
    echo "To run on server, SSH to your Lightsail instance and execute:"
    echo "ssh ubuntu@16.176.228.22"
    echo "Then run: ./cleanup-server.sh"
fi 