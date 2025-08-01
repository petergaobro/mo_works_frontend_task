#!/bin/bash
set -e

echo "🔧 Fixing SSL certificate domain issue..."

# Check if we're on the server
if [ "$(hostname)" != "ip-172-26-6-226" ]; then
    echo "❌ This script should be run on the Lightsail server"
    echo "To run on server, SSH to your Lightsail instance and execute:"
    echo "ssh ubuntu@16.176.228.22"
    echo "Then run: ./fix-ssl-domain.sh"
    exit 1
fi

echo "✅ Running on Lightsail server"

# Step 1: Check current SSL certificate
echo "📋 Step 1: Checking current SSL certificate..."
if [ -f "/etc/ssl/certs/nginx-selfsigned.crt" ]; then
    echo "✅ SSL certificate exists"
    echo "📄 Certificate details:"
    openssl x509 -in /etc/ssl/certs/nginx-selfsigned.crt -text -noout | grep -E "(Subject:|DNS:|IP Address:)"
else
    echo "❌ SSL certificate not found"
fi

# Step 2: Generate new SSL certificate with correct IP
echo ""
echo "📋 Step 2: Generating new SSL certificate with correct IP..."
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt \
    -subj "/C=AU/ST=NSW/L=Sydney/O=MoWorks/CN=16.176.228.22" \
    -addext "subjectAltName=IP:16.176.228.22,DNS:16.176.228.22"

# Step 3: Verify new certificate
echo ""
echo "📋 Step 3: Verifying new certificate..."
openssl x509 -in /etc/ssl/certs/nginx-selfsigned.crt -text -noout | grep -E "(Subject:|DNS:|IP Address:)"

# Step 4: Update Nginx configuration with proper SSL settings
echo ""
echo "📋 Step 4: Updating Nginx configuration..."
sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name 16.176.228.22;
    return 301 https://$server_name$request_uri;
}

# HTTPS server with proper SSL configuration
server {
    listen 443 ssl http2;
    server_name 16.176.228.22;
    
    # SSL configuration
    ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    root /var/www/html;
    index index.html;
    
    # Authentication
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Step 5: Test and restart Nginx
echo ""
echo "📋 Step 5: Testing and restarting Nginx..."
if sudo nginx -t; then
    sudo systemctl restart nginx
    echo "✅ Nginx restarted successfully"
else
    echo "❌ Nginx configuration has errors"
    exit 1
fi

# Step 6: Test SSL connection
echo ""
echo "📋 Step 6: Testing SSL connection..."
echo "🔐 Testing SSL without authentication:"
ssl_test=$(curl -k -s -o /dev/null -w "%{http_code}" https://16.176.228.22)
echo "SSL test response: $ssl_test"

echo ""
echo "🔐 Testing with authentication:"
auth_test=$(curl -k -s -o /dev/null -w "%{http_code}" -u moworks:peter https://16.176.228.22)
echo "Authentication test response: $auth_test"

# Step 7: Test with different curl options
echo ""
echo "📋 Step 7: Testing with different curl options..."
echo "🔐 Testing with verbose output:"
curl -k -v -u moworks:peter https://16.176.228.22 2>&1 | head -20

echo ""
echo "✅ SSL domain fix completed!"
echo "🌐 Access your application at: https://16.176.228.22"
echo "🔑 Username: moworks"
echo "🔑 Password: peter"