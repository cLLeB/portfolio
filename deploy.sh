#!/bin/bash

# Deployment script to bypass Vercel cached settings
echo "🚀 Starting fresh deployment..."

# Clean any existing build artifacts
echo "🧹 Cleaning build artifacts..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building project..."
npm run build

# Verify build output
echo "✅ Build completed successfully!"
echo "📁 Build output:"
ls -la .next/

echo "🎉 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Go to Vercel dashboard"
echo "2. Clear Output Directory setting (must be empty)"
echo "3. Set Framework Preset to 'Next.js'"
echo "4. Redeploy"
