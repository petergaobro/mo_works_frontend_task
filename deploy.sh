#!/bin/bash

set -e

echo "🚀 Starting deployment..."

# 1. Pull the latest code from GitHub
echo "🔄 Pulling latest changes from GitHub..."
git pull origin main

# 2. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 3. Remove previous build output
echo "🧹 Cleaning previous build output..."
rm -rf out

# 4. Build the static site (Next.js 13+ with `output: 'export'`)
echo "🔧 Building static site..."
npm run build

# 5. Copy output files to web server directory (adjust if needed)
# This assumes you're serving from /var/www/html
echo "🚚 Copying files to web server directory..."
sudo rm -rf /var/www/html/*
sudo cp -r out/* /var/www/html/

# 6. Set file ownership to web server user (optional)
sudo chown -R www-data:www-data /var/www/html

echo "✅ Deployment complete!"
