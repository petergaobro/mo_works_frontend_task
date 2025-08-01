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
if [ "$1" = "enable" ]; then
    echo "🔐 Enabling password protection..."
    
    # Step 1: Create password file with simple method
    echo "📋 Step 1: Creating password file..."
    sudo mkdir -p /etc/nginx
    
    # Use htpasswd command if available, otherwise use openssl
    if command -v htpasswd &> /dev/null; then
        echo "Using htpasswd command..."
        echo "moworks" | sudo htpasswd -i /etc/nginx/.htpasswd
    else
        echo "Using openssl method..."
        PASSWORD_HASH=$(openssl passwd -apr1 'peter')
        echo "Generated hash: $PASSWORD_HASH"
        echo "moworks:$PASSWORD_HASH" | sudo tee /etc/nginx/.htpasswd
        echo "Password file created successfully"
    fi
    
    # Step 2: Create simple Nginx configuration
    echo "📋 Step 2: Creating Nginx configuration..."
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
    
    # Simple password protection
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

    # Step 3: Set permissions
    echo "📋 Step 3: Setting permissions..."
    sudo chown root:root /etc/nginx/.htpasswd
    sudo chmod 644 /etc/nginx/.htpasswd
    
    # Step 4: Test and restart
    echo "📋 Step 4: Testing and restarting..."
    if sudo nginx -t; then
        sudo systemctl restart nginx
        echo "✅ Password protection enabled!"
        echo "🌐 Access: https://16.176.228.22"
        echo "🔑 Username: moworks"
        echo "🔑 Password: peter"
    else
        echo "❌ Nginx configuration error"
        exit 1
    fi

elif [ "$1" = "disable" ]; then
    echo "🔓 Disabling password protection..."
    
    # Step 1: Remove password file
    echo "📋 Step 1: Removing password file..."
    sudo rm -f /etc/nginx/.htpasswd
    
    # Step 2: Create configuration without password protection
    echo "📋 Step 2: Creating configuration without password protection..."
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
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

    # Step 3: Test and restart
    echo "📋 Step 3: Testing and restarting..."
    if sudo nginx -t; then
        sudo systemctl restart nginx
        echo "✅ Password protection disabled!"
        echo "🌐 Access: https://16.176.228.22"
        echo "📝 No password required"
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