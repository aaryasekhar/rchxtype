#!/bin/bash

# rchxtype Demo Script
# This script runs the application locally for demo purposes

set -e

echo "🎭 rchxtype Demo"
echo "=================="

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

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Setting up rchxtype demo..."

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    print_status "Installing client dependencies..."
    cd client && npm install && cd ..
fi

print_success "Dependencies installed!"

# Create demo environment file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating demo environment file..."
    cat > .env << EOF
# Demo Environment Variables
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rchxtype-demo
JWT_SECRET=demo-jwt-secret-key-for-development
OPENAI_API_KEY=demo-openai-key
CORS_ORIGIN=http://localhost:3000
EOF
    print_success "Demo environment file created!"
fi

echo ""
echo "🚀 Starting rchxtype demo..."
echo ""
echo "📋 Demo Features:"
echo "• Beautiful dark theme UI"
echo "• Mock user data and interactions"
echo "• Personality profiling interface"
echo "• External integrations showcase"
echo "• User matching and connections"
echo "• Responsive design"
echo ""
echo "🌐 Access the application at:"
echo "• Frontend: http://localhost:3000"
echo "• Backend API: http://localhost:5000"
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
echo ""
echo "⏹️  Press Ctrl+C to stop the demo"
echo ""

# Start the development server
print_status "Starting development servers..."
npm run dev 