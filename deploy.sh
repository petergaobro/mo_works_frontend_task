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
npx next build

# Debug: Show contents of out/
ls -lh out

# Deploy to web server
echo "📁 Copying files to web server directory..."
sudo rm -rf /var/www/html/*
sudo cp -r out/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html

echo "✅ Deployment complete!"
