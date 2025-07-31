#!/bin/bash
set -e

echo "🔍 Checking Lightsail SSL options..."

echo "📋 Step 1: Check if we're on the server..."
if [ "$(hostname)" = "ip-172-26-6-226" ]; then
    echo "✅ Running on Lightsail server"
    
    echo ""
    echo "📋 Step 2: Check AWS CLI availability..."
    if command -v aws &> /dev/null; then
        echo "✅ AWS CLI is available"
        
        echo ""
        echo "📋 Step 3: Check Lightsail SSL certificates..."
        echo "🔍 Looking for existing certificates..."
        aws lightsail get-certificates --region ap-southeast-2 2>/dev/null || echo "❌ No certificates found or AWS CLI not configured"
        
        echo ""
        echo "📋 Step 4: Check if we can create certificate for IP..."
        echo "🔍 Attempting to create certificate for IP address..."
        aws lightsail create-certificate \
            --certificate-name "ip-cert-$(date +%s)" \
            --domain-name "16.176.228.22" \
            --region ap-southeast-2 2>/dev/null && echo "✅ Certificate creation attempted" || echo "❌ Certificate creation failed"
            
    else
        echo "❌ AWS CLI not available"
        echo "📦 Installing AWS CLI..."
        sudo apt update
        sudo apt install -y awscli
        
        echo "⚠️  AWS CLI installed. You need to configure it with your AWS credentials."
        echo "   Run: aws configure"
    fi
    
    echo ""
    echo "📋 Step 5: Alternative SSL methods..."
    echo "🌐 Method 1: Use self-signed certificate (works without domain)"
    echo "🌐 Method 2: Use Cloudflare Tunnel (free, works with IP)"
    echo "🌐 Method 3: Use AWS Certificate Manager (requires domain)"
    
    echo ""
    echo "📋 Step 6: Check current Nginx SSL status..."
    echo "🔍 Current Nginx configuration:"
    sudo grep -i ssl /etc/nginx/sites-available/default || echo "No SSL configuration found"
    
else
    echo "❌ This script should be run on the Lightsail server"
    echo "To run on server, SSH to your Lightsail instance and execute:"
    echo "ssh ubuntu@16.176.228.22"
    echo "Then run: ./check-lightsail-ssl.sh"
fi 