#!/bin/bash
set -e

echo "🔐 Setting up password protection with HTTPS..."

# Check if we're on the server
if [ "$(hostname)" = "ip-172-26-6-226" ]; then
    echo "✅ Running on Lightsail server"
    
    # Set custom username and password
    username="moworks"
    password="peter"
    
    echo "🔐 Creating password file with custom credentials..."
    sudo mkdir -p /etc/nginx
    echo "$username:\$(openssl passwd -apr1 '$password')" | sudo tee /etc/nginx/.htpasswd
    
    echo "📄 Updating Nginx configuration with password protection and HTTPS..."
    sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name 16.176.228.22;
    return 301 https://$server_name$request_uri;
}

# HTTPS server with password protection
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
    index index.html index.htm;
    
    # Password protection
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

    echo "🔍 Testing Nginx configuration..."
    sudo nginx -t
    
    if [ $? -eq 0 ]; then
        echo "✅ Nginx configuration is valid"
        echo "🔄 Reloading Nginx..."
        sudo systemctl reload nginx
        echo "✅ Password protection enabled with HTTPS!"
        echo "🔑 Username: $username"
        echo "🔑 Password: $password"
        echo "🌐 Access: https://16.176.228.22"
        echo "📝 Login credentials configured!"
    else
        echo "❌ Nginx configuration is invalid"
        exit 1
    fi
    
else
    echo "❌ This script should be run on the Lightsail server"
fi 