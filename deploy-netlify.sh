#!/bin/bash

# RCHXTYPE Demo - Netlify Deployment Script
# This script helps deploy the demo to Netlify

echo "🚀 RCHXTYPE Demo - Netlify Deployment"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "demo/package.json" ]; then
    echo "❌ Error: Please run this script from the root directory of the rchxtype project"
    exit 1
fi

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

echo "📁 Building demo..."
cd demo

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🌐 Deploying to Netlify..."
echo ""

# Deploy to Netlify
netlify deploy --dir=build --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Your demo is now live on Netlify"
    echo "2. You can find the URL in the output above"
    echo "3. Share the URL with others to showcase your demo"
    echo ""
    echo "🔐 Demo Login:"
    echo "   Email: demo@rchxtype.com"
    echo "   Password: demo123"
    echo ""
    echo "📚 For more information, check the demo/README.md file"
else
    echo "❌ Deployment failed!"
    echo ""
    echo "💡 Alternative deployment methods:"
    echo "1. Go to https://netlify.com"
    echo "2. Click 'New site from Git'"
    echo "3. Connect your GitHub repository"
    echo "4. Set base directory to 'demo'"
    echo "5. Set build command to 'npm run build'"
    echo "6. Set publish directory to 'build'"
fi

cd ..
