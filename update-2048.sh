#!/bin/bash

# Update script for 2048 Game
# Usage: ./update-2048.sh

set -e  # Exit on any error

echo "🚀 Starting update process for 2048 Game..."

# Define paths
PROJECT_DIR="/home/deploy/game-2048"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# Navigate to project directory
cd "$PROJECT_DIR"

echo "📥 Pulling latest changes from git..."
git pull origin main

# Update Backend
echo "⚙️  Updating backend..."
cd "$BACKEND_DIR"
source venv/bin/activate
pip install -r requirements.txt --upgrade
deactivate

# Update Frontend
echo "🎨 Building frontend..."
cd "$FRONTEND_DIR"
npm install
npm run build

# Restart backend service
echo "🔄 Restarting backend service..."
sudo systemctl restart 2048-backend

# Reload nginx
echo "🔄 Reloading nginx..."
sudo systemctl reload nginx

# Check service status
echo "✅ Checking backend service status..."
sudo systemctl status 2048-backend --no-pager

echo ""
echo "✨ Update completed successfully!"
echo "🌐 Visit: https://2048web.com"
echo ""
echo "📊 To view logs:"
echo "   Backend: sudo journalctl -u 2048-backend -f"
echo "   Nginx: sudo tail -f /var/log/nginx/2048web-error.log"
