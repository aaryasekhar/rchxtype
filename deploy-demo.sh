#!/bin/bash

# rchxtype Demo Deployment Script
# This script deploys the demo to Vercel for easy sharing

set -e

echo "🚀 rchxtype Demo Deployment"
echo "============================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI is not installed."
    echo ""
    echo "Please install Vercel CLI first:"
    echo "npm install -g vercel"
    echo ""
    echo "Then login to Vercel:"
    echo "vercel login"
    exit 1
fi

print_status "Preparing demo for deployment..."

# Build the application
print_status "Building the application..."
npm run build

print_success "Build completed!"

# Deploy to Vercel
print_status "Deploying to Vercel..."
vercel --prod

print_success "Demo deployed successfully!"
echo ""
echo "🌐 Your demo is now live at the URL shown above!"
echo ""
echo "📋 Demo Features:"
echo "• Beautiful dark theme UI"
echo "• Mock user data and interactions"
echo "• Personality profiling interface"
echo "• External integrations showcase"
echo "• User matching and connections"
echo "• Responsive design"
echo ""
echo "👤 Demo Login:"
echo "• Email: any@example.com"
echo "• Password: any password"
echo ""
echo "📱 Features to explore:"
echo "• Landing page with animations"
echo "• User registration and login"
echo "• Dashboard with statistics"
echo "• Profile management"
echo "• Personality analysis"
echo "• External integrations"
echo "• User matching"
echo "• Connection management" 