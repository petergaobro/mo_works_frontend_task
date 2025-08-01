#!/bin/bash
set -e

echo "🔒 Setting up SSL with self-signed certificate..."

# Check if we're on the server
if [ "$(hostname)" = "ip-172-26-6-226" ]; then
    echo "✅ Running on Lightsail server"
    
    echo "🔐 Step 1: Generate self-signed certificate..."
    sudo mkdir -p /etc/ssl/private /etc/ssl/certs
    
    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/ssl/private/nginx-selfsigned.key \
        -out /etc/ssl/certs/nginx-selfsigned.crt \
        -subj "/C=AU/ST=NSW/L=Sydney/O=YourCompany/CN=16.176.228.22"
    
    echo "✅ Self-signed certificate generated"
    
    echo "📄 Step 2: Update Nginx configuration for HTTPS..."
    sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name 16.176.228.22;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
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
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

    echo "✅ Nginx configuration updated"
    
    echo "🔍 Step 3: Test Nginx configuration..."
    sudo nginx -t
    
    if [ $? -eq 0 ]; then
        echo "✅ Nginx configuration is valid"
        
        echo "🔄 Step 4: Reload Nginx..."
        sudo systemctl reload nginx
        echo "✅ Nginx reloaded"
        
        echo "🌐 Step 5: Test HTTPS access..."
        sleep 2
        curl -k -I https://localhost/ 2>/dev/null && echo "✅ HTTPS is working locally" || echo "❌ HTTPS test failed"
        
        echo ""
        echo "🎉 SSL setup completed!"
        echo "🌐 Your website is now accessible at: https://16.176.228.22"
        echo "⚠️  Note: Browser will show security warning (normal for self-signed certificates)"
        echo "   Click 'Advanced' → 'Proceed to 16.176.228.22 (unsafe)' to access"
        
    else
        echo "❌ Nginx configuration is invalid"
        exit 1
    fi
    
else
    echo "❌ This script should be run on the Lightsail server"
    echo "To run on server, SSH to your Lightsail instance and execute:"
    echo "ssh ubuntu@16.176.228.22"
    echo "Then run: ./setup-ssl-simple.sh"
fi 