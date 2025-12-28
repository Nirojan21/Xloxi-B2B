# 🚀 Vercel Environment Variables Setup

Complete guide and scripts for setting up environment variables in Vercel.

## 📋 Quick Start

### Option 1: Interactive Setup (Easiest)
```bash
# Make script executable
chmod +x scripts/quick-setup.sh

# Run interactive setup
./scripts/quick-setup.sh
```

### Option 2: Using NPM Scripts
```bash
# Set variables for production
npm run vercel:env:set:prod

# Set variables for preview
npm run vercel:env:set:preview

# List all environment variables
npm run vercel:env:ls

# Pull environment variables to .env.local
npm run vercel:env:pull
```

### Option 3: Manual Vercel CLI
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Set each variable
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
```

## 📁 Files Created

- **`scripts/set-vercel-env.js`** - Node.js script to set env vars
- **`scripts/set-vercel-env.sh`** - Bash script for automated setup
- **`scripts/quick-setup.sh`** - Interactive setup script
- **`scripts/vercel-env-setup.md`** - Detailed documentation
- **`vercel.json`** - Vercel configuration file
- **`env.example`** - Environment variables template

## 🔑 Required Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URL` | MySQL connection string | ✅ Yes | `mysql://user:pass@host:3306/db` |
| `JWT_SECRET` | JWT signing secret | ✅ Yes | `your-secret-key-here` |
| `STRIPE_SECRET_KEY` | Stripe API key | ✅ Yes | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | ⚠️ Optional | `whsec_...` |

## 📝 Step-by-Step Guide

### 1. Prepare Your Values

Create a `.env.local` file (for local reference only):
```env
DATABASE_URL="mysql://user:password@host:3306/database"
JWT_SECRET="your-super-secret-jwt-key"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

### 2. Set Variables in Vercel

**Using Dashboard:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Settings → Environment Variables
4. Add each variable
5. Select environments (Production/Preview/Development)
6. Save

**Using CLI:**
```bash
vercel env add DATABASE_URL production
# Enter value when prompted
```

### 3. Verify Setup

```bash
# List all variables
vercel env ls

# Pull variables (for local dev)
vercel env pull .env.local
```

### 4. Redeploy

After setting variables, redeploy your application:
```bash
vercel --prod
```

## 🛠️ Available Scripts

```bash
# Set environment variables (interactive)
npm run vercel:env:set

# Set for specific environment
npm run vercel:env:set:prod      # Production
npm run vercel:env:set:preview   # Preview
npm run vercel:env:set:dev       # Development

# List all environment variables
npm run vercel:env:ls

# Pull environment variables to .env.local
npm run vercel:env:pull
```

## 🔒 Security Notes

- ✅ Never commit `.env.local` or `.env` files
- ✅ Use strong, random values for `JWT_SECRET`
- ✅ Generate JWT secret: `openssl rand -base64 32`
- ✅ Use different keys for test/production
- ✅ Rotate secrets regularly

## 🐛 Troubleshooting

### Variables not working?
1. ✅ Check variable names (case-sensitive)
2. ✅ Verify variables are set for correct environment
3. ✅ Redeploy after adding variables
4. ✅ Check Vercel build logs

### Database connection issues?
- Verify `DATABASE_URL` format
- Check database allows Vercel IPs
- Test connection locally first

### Stripe issues?
- Verify test vs live keys
- Check webhook endpoint URL
- Ensure webhook secret matches

## 📚 Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel CLI Docs](https://vercel.com/docs/cli)
- [Stripe API Keys](https://dashboard.stripe.com/apikeys)

## 💡 Tips

- Set variables for all environments (production, preview, development)
- Use Vercel's encrypted environment variables
- Test in preview environment before production
- Keep a backup of your environment variable values (securely)

