#!/bin/bash
set -e

echo "🔧 Resetting password with default credentials..."

# Check if we're on the server
if [ "$(hostname)" != "ip-172-26-6-226" ]; then
    echo "❌ This script should be run on the Lightsail server"
    echo "To run on server, SSH to your Lightsail instance and execute:"
    echo "ssh ubuntu@16.176.228.22"
    echo "Then run: ./reset-password.sh"
    exit 1
fi

echo "✅ Running on Lightsail server"

# Use default credentials from setup-password-protection.sh
username="moworks"
password="peter"

echo "🔑 Using default credentials:"
echo "   Username: $username"
echo "   Password: $password"

# Step 1: Remove old password file
echo ""
echo "📋 Step 1: Removing old password file..."
sudo rm -f /etc/nginx/.htpasswd

# Step 2: Create new password file with default credentials
echo ""
echo "📋 Step 2: Creating new password file..."
echo "$username:\$(openssl passwd -apr1 '$password')" | sudo tee /etc/nginx/.htpasswd

# Step 3: Verify password file
echo ""
echo "📋 Step 3: Verifying password file..."
echo "📄 Password file content:"
cat /etc/nginx/.htpasswd

# Step 4: Set permissions
echo ""
echo "📋 Step 4: Setting permissions..."
sudo chown root:root /etc/nginx/.htpasswd
sudo chmod 644 /etc/nginx/.htpasswd
echo "📁 File permissions:"
ls -la /etc/nginx/.htpasswd

# Step 5: Restart Nginx
echo ""
echo "📋 Step 5: Restarting Nginx..."
sudo systemctl restart nginx
echo "✅ Nginx restarted"

# Step 6: Test authentication
echo ""
echo "📋 Step 6: Testing authentication..."
echo "🔐 Testing with default credentials..."
response=$(curl -k -s -o /dev/null -w "%{http_code}" -u moworks:peter https://16.176.228.22)
echo "Response code: $response"

if [ "$response" = "200" ]; then
    echo "✅ Authentication working correctly!"
else
    echo "⚠️  Authentication still has issues (Response: $response)"
fi

echo ""
echo "✅ Password reset completed!"
echo "🌐 Access your application at: https://16.176.228.22"
echo "🔑 Username: moworks"
echo "�� Password: peter" 