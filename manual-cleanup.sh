#!/bin/bash
set -e

echo "🧹 Manual cleanup script for Lightsail server"

echo "📋 Files to be cleaned:"
echo "  - NwaypSrAcP.tar.gz"
echo "  - next-app directory (if exists)"
echo "  - temp_static directory (if exists)"

echo ""
echo "🚀 To clean these files, SSH to your server and run:"
echo "ssh ubuntu@16.176.228.22"
echo ""
echo "Then execute these commands:"
echo "rm -f /home/ubuntu/*.tar.gz"
echo "rm -rf /home/ubuntu/next-app"
echo "rm -rf /home/ubuntu/temp_static"
echo "ls -la /home/ubuntu/"
echo ""
echo "✅ This will clean all unnecessary files!" 