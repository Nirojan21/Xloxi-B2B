#!/bin/bash

# Quick setup script for Vercel environment variables
# This script helps you set up all required environment variables

echo "🚀 Vercel Environment Variables Quick Setup"
echo "==========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "❌ Vercel CLI is not installed"
  echo "   Install it with: npm install -g vercel"
  exit 1
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
  echo "❌ Not logged in to Vercel"
  echo "   Run: vercel login"
  exit 1
fi

echo "✅ Vercel CLI is installed and you're logged in"
echo ""

# Get environment
read -p "Select environment (production/preview/development) [production]: " env
env=${env:-production}

if [[ ! "$env" =~ ^(production|preview|development)$ ]]; then
  echo "❌ Invalid environment"
  exit 1
fi

echo ""
echo "📝 Setting up environment variables for: $env"
echo ""

# Function to set environment variable
set_env_var() {
  local key=$1
  local description=$2
  local example=$3
  
  echo "Setting: $key"
  echo "Description: $description"
  echo "Example: $example"
  read -p "Enter value for $key: " value
  
  if [ -z "$value" ]; then
    echo "⚠️  Skipping $key (empty value)"
    echo ""
    return
  fi
  
  echo "$value" | vercel env add "$key" "$env"
  
  if [ $? -eq 0 ]; then
    echo "✅ $key set successfully"
  else
    echo "❌ Failed to set $key"
  fi
  echo ""
}

# Set required environment variables
set_env_var "DATABASE_URL" "MySQL database connection string" "mysql://user:password@host:3306/database"
set_env_var "JWT_SECRET" "Secret key for JWT tokens" "your-super-secret-jwt-key"
set_env_var "STRIPE_SECRET_KEY" "Stripe API secret key" "sk_test_your_stripe_secret_key"
set_env_var "STRIPE_WEBHOOK_SECRET" "Stripe webhook secret (optional)" "whsec_your_webhook_secret"

echo "✅ Environment variables setup complete!"
echo ""
echo "Next steps:"
echo "1. Verify variables: vercel env ls"
echo "2. Redeploy your application"
echo "3. Check build logs for any issues"

