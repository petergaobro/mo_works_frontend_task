#!/bin/bash
set -e

echo "🔐 Password Protection Management Script"

# Check if we're on the server
if [ "$(hostname)" != "ip-172-26-6-226" ]; then
    echo "❌ This script should be run on the Lightsail server"
    echo "To run on server, SSH to your Lightsail instance and execute:"
    echo "ssh ubuntu@16.176.228.22"
    echo "Then run: ./setup-password-protection.sh"
    exit 1
fi

echo "✅ Running on Lightsail server"

# Check command line argument
if [ "$1" = "disable" ]; then
    echo "🔓 Disabling password protection..."
    
    # Update Nginx configuration without password protection
    sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name 16.176.228.22;
    return 301 https://$server_name$request_uri;
}

# HTTPS server without password protection
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
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

    # Test and restart Nginx
    if sudo nginx -t; then
        sudo systemctl restart nginx
        echo "✅ Password protection disabled!"
        echo "🌐 Access your application at: https://16.176.228.22"
        echo "📝 No password required"
    else
        echo "❌ Nginx configuration error"
        exit 1
    fi

elif [ "$1" = "enable" ]; then
    echo "🔐 Enabling password protection..."
    
    # Use default credentials
    username="moworks"
    password="peter"
    
    echo "🔑 Using default credentials:"
    echo "   Username: $username"
    echo "   Password: $password"
    
    # Create password file
    echo "📋 Creating password file..."
    sudo mkdir -p /etc/nginx
    echo "$username:\$(openssl passwd -apr1 '$password')" | sudo tee /etc/nginx/.htpasswd
    
    # Update Nginx configuration with password protection
    sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
# HTTP to HTTPS redirect
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
    index index.html;
    
    # Password protection
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

    # Set permissions
    sudo chown root:root /etc/nginx/.htpasswd
    sudo chmod 644 /etc/nginx/.htpasswd
    
    # Test and restart Nginx
    if sudo nginx -t; then
        sudo systemctl restart nginx
        echo "✅ Password protection enabled!"
        echo "🌐 Access your application at: https://16.176.228.22"
        echo "🔑 Username: moworks"
        echo "🔑 Password: peter"
    else
        echo "❌ Nginx configuration error"
        exit 1
    fi

else
    echo "📋 Usage:"
    echo "  ./setup-password-protection.sh enable   - Enable password protection"
    echo "  ./setup-password-protection.sh disable  - Disable password protection"
    echo ""
    echo "🔑 Default credentials:"
    echo "  Username: moworks"
    echo "  Password: peter"
fi 