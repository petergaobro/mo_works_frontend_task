#!/bin/bash
set -e

echo "🔧 Fixing Nginx authentication configuration..."

# Check if we're on the server
if [ "$(hostname)" != "ip-172-26-6-226" ]; then
    echo "❌ This script should be run on the Lightsail server"
    echo "To run on server, SSH to your Lightsail instance and execute:"
    echo "ssh ubuntu@16.176.228.22"
    echo "Then run: ./fix-nginx-auth.sh"
    exit 1
fi

echo "✅ Running on Lightsail server"

# Step 1: Check current Nginx configuration
echo "📋 Step 1: Checking current Nginx configuration..."
sudo cat /etc/nginx/sites-available/default

# Step 2: Create simplified correct configuration
echo ""
echo "📋 Step 2: Creating simplified correct configuration..."
sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
server {
    listen 80;
    server_name 16.176.228.22;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name 16.176.228.22;
    
    ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    
    root /var/www/html;
    index index.html;
    
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Step 3: Test configuration
echo ""
echo "📋 Step 3: Testing configuration..."
if sudo nginx -t; then
    echo "✅ Nginx configuration is valid"
else
    echo "❌ Nginx configuration has errors"
    exit 1
fi

# Step 4: Restart Nginx
echo ""
echo "📋 Step 4: Restarting Nginx..."
sudo systemctl restart nginx
echo "✅ Nginx restarted successfully"

# Step 5: Test authentication
echo ""
echo "📋 Step 5: Testing authentication..."
response=$(curl -k -s -o /dev/null -w "%{http_code}" -u moworks:peter https://16.176.228.22)
echo "Response code: $response"

if [ "$response" = "200" ]; then
    echo "✅ Authentication working correctly!"
else
    echo "⚠️  Authentication still has issues (Response: $response)"
    echo "🔍 Testing without credentials..."
    no_auth_response=$(curl -k -s -o /dev/null -w "%{http_code}" https://16.176.228.22)
    echo "No auth response: $no_auth_response"
fi

echo ""
echo "✅ Nginx authentication fix completed!"
echo "🌐 Access your application at: https://16.176.228.22"
echo "🔑 Username: moworks"
echo "🔑 Password: peter"
echo ""
echo "📝 If you still have issues:"
echo "1. Clear browser cache completely"
echo "2. Try incognito/private mode"
echo "3. Try a different browser" 