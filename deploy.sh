#!/bin/bash

# rchxtype Deployment Script
# This script helps deploy the application to various platforms

set -e

echo "🚀 rchxtype Deployment Script"
echo "=============================="

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

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from .env.example..."
    cp .env.example .env
    print_success ".env file created. Please configure your environment variables."
fi

# Install dependencies
print_status "Installing dependencies..."
npm run install-all

# Build the application
print_status "Building the application..."
npm run build

print_success "Build completed successfully!"

echo ""
echo "📋 Deployment Options:"
echo "1. Vercel (Recommended)"
echo "2. Railway"
echo "3. Heroku"
echo "4. Netlify (Frontend only)"
echo "5. Manual deployment"
echo ""

read -p "Choose deployment option (1-5): " choice

case $choice in
    1)
        print_status "Deploying to Vercel..."
        echo "Steps:"
        echo "1. Push your code to GitHub"
        echo "2. Go to https://vercel.com"
        echo "3. Import your repository"
        echo "4. Set environment variables in Vercel dashboard"
        echo "5. Deploy"
        ;;
    2)
        print_status "Deploying to Railway..."
        echo "Steps:"
        echo "1. Install Railway CLI: npm i -g @railway/cli"
        echo "2. Login: railway login"
        echo "3. Initialize: railway init"
        echo "4. Set environment variables: railway variables set"
        echo "5. Deploy: railway up"
        ;;
    3)
        print_status "Deploying to Heroku..."
        echo "Steps:"
        echo "1. Install Heroku CLI"
        echo "2. Login: heroku login"
        echo "3. Create app: heroku create your-app-name"
        echo "4. Set environment variables: heroku config:set"
        echo "5. Deploy: git push heroku main"
        ;;
    4)
        print_status "Deploying to Netlify..."
        echo "Steps:"
        echo "1. Push code to GitHub"
        echo "2. Go to https://netlify.com"
        echo "3. Connect your repository"
        echo "4. Set build command: cd client && npm run build"
        echo "5. Set publish directory: client/build"
        ;;
    5)
        print_status "Manual deployment..."
        echo "Your application is built and ready for manual deployment."
        echo "Check DEPLOYMENT.md for detailed instructions."
        ;;
    *)
        print_error "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
print_success "Deployment script completed!"
echo ""
echo "📚 Next steps:"
echo "1. Configure your environment variables"
echo "2. Set up your MongoDB database"
echo "3. Configure external service credentials"
echo "4. Test your deployment"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md" 