#!/bin/bash
set -e

echo "🧪 Testing Next.js 15 static export..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the app
echo "🔧 Building the app..."
npm run build

# Check if out directory exists and has content
echo "📁 Checking build output..."
if [ -d "out" ]; then
    echo "✅ out directory created successfully"
    echo "📊 Build output contents:"
    ls -la out/
    echo "📄 HTML files found:"
    find out/ -name "*.html" -type f
else
    echo "❌ out directory not found!"
    exit 1
fi

echo "✅ Build test completed successfully!" 