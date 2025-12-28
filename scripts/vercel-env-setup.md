# Vercel Environment Variables Setup Guide

This guide shows you how to set environment variables in Vercel for your temple ticket platform.

## Required Environment Variables

1. **DATABASE_URL** - MySQL database connection string
2. **JWT_SECRET** - Secret key for JWT authentication
3. **STRIPE_SECRET_KEY** - Stripe API secret key
4. **STRIPE_WEBHOOK_SECRET** - Stripe webhook signing secret (optional)

## Method 1: Using Vercel CLI (Recommended)

### Prerequisites
```bash
npm install -g vercel
vercel login
```

### Set Variables Interactively
```bash
# For production
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production

# For preview/development
vercel env add DATABASE_URL preview
vercel env add JWT_SECRET preview
vercel env add STRIPE_SECRET_KEY preview
```

### Set Variables from .env.local (Automated)
```bash
# Make script executable (Linux/Mac)
chmod +x scripts/set-vercel-env.sh

# Run the script
./scripts/set-vercel-env.sh production
```

Or using Node.js script:
```bash
node scripts/set-vercel-env.js production
```

## Method 2: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `temple-ticket-booking`
3. Navigate to **Settings** → **Environment Variables**
4. Click **Add New**
5. For each variable:
   - **Key**: Variable name (e.g., `DATABASE_URL`)
   - **Value**: Your actual value
   - **Environment**: Select `Production`, `Preview`, and/or `Development`
6. Click **Save**

## Method 3: Using Vercel API

```bash
# Get your Vercel token from: https://vercel.com/account/tokens
export VERCEL_TOKEN="your_token_here"
export PROJECT_ID="your_project_id"
export TEAM_ID="your_team_id" # Optional

# Set environment variable
curl -X POST "https://api.vercel.com/v10/projects/$PROJECT_ID/env" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "DATABASE_URL",
    "value": "mysql://user:password@host:3306/database",
    "type": "encrypted",
    "target": ["production", "preview", "development"]
  }'
```

## Quick Setup Script

Create a `.env.local` file with your values:

```env
DATABASE_URL="mysql://user:password@host:3306/database"
JWT_SECRET="your-super-secret-jwt-key"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

Then run:
```bash
npm run vercel:env:set
```

## Verify Environment Variables

```bash
# List all environment variables
vercel env ls

# Pull environment variables (for local development)
vercel env pull .env.local
```

## Important Notes

- ⚠️ Never commit `.env.local` or `.env` files to Git
- 🔒 Environment variables are encrypted in Vercel
- 🔄 After adding variables, redeploy your application
- 🌍 Set variables for all environments (production, preview, development) as needed
- 🔑 Generate a strong JWT_SECRET (use `openssl rand -base64 32`)

## Troubleshooting

### Variables not working?
1. Check variable names match exactly (case-sensitive)
2. Redeploy after adding variables
3. Verify variables are set for the correct environment
4. Check Vercel build logs for errors

### Database connection issues?
- Verify DATABASE_URL format: `mysql://user:password@host:port/database`
- Check database allows connections from Vercel IPs
- Ensure database credentials are correct

### Stripe issues?
- Verify you're using the correct key (test vs live)
- Check webhook endpoint URL in Stripe dashboard
- Ensure STRIPE_WEBHOOK_SECRET matches Stripe webhook configuration

