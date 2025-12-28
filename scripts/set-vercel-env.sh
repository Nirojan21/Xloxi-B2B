#!/bin/bash

# Script to set environment variables in Vercel using Vercel CLI
# Usage: ./scripts/set-vercel-env.sh [environment]
# Environments: production, preview, development

ENVIRONMENT=${1:-production}

if [[ ! "$ENVIRONMENT" =~ ^(production|preview|development)$ ]]; then
  echo "❌ Invalid environment: $ENVIRONMENT"
  echo "Valid environments: production, preview, development"
  exit 1
fi

echo "🚀 Setting environment variables for $ENVIRONMENT environment..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "⚠️  Warning: .env.local file not found"
  echo "   Create .env.local with your environment variables first"
  exit 1
fi

# Read .env.local and set variables
while IFS='=' read -r key value; do
  # Skip comments and empty lines
  [[ "$key" =~ ^#.*$ ]] && continue
  [[ -z "$key" ]] && continue
  
  # Remove quotes from value
  value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
  
  echo "📝 Setting $key..."
  echo "$value" | vercel env add "$key" "$ENVIRONMENT"
  
  if [ $? -eq 0 ]; then
    echo "✅ $key set successfully"
  else
    echo "❌ Failed to set $key"
  fi
  echo ""
done < .env.local

echo "✅ Done! Environment variables have been set for $ENVIRONMENT"

