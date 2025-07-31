#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Pull latest code
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Clean build directories
echo "🧹 Cleaning previous build output..."
rm -rf .next out

# Build static site
echo "🔧 Building static site..."
npm run build

# Debug: Show contents of out/
echo "📁 Build output contents:"
ls -lh out

# Deploy to web server
echo "🧹 Cleaning web server directory..."
sudo rm -rf /var/www/html/*

echo "📁 Copying files to web server directory..."
sudo cp -r out/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html

echo "🧹 Cleaning temporary files..."
rm -rf /home/ubuntu/next-app 2>/dev/null || true
rm -rf /home/ubuntu/temp_static 2>/dev/null || true

echo "✅ Deployment complete!"
