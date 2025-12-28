# Vercel Environment Variables

Add these environment variables in your Vercel project settings:

## Required Environment Variables

### 1. Database Configuration
```
DATABASE_URL=mysql://user:password@host:3306/database_name
```
- **Description**: MySQL database connection string for Prisma
- **Format**: `mysql://username:password@host:port/database_name`
- **Example**: `mysql://admin:password123@db.example.com:3306/temple_platform`

### 2. Authentication
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```
- **Description**: Secret key for JWT token signing and verification
- **Important**: Use a strong, random string (at least 32 characters)
- **Generate**: You can use `openssl rand -base64 32` or any secure random string generator

### 3. Stripe Payment Configuration
```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```
- **Description**: Stripe API secret key for processing payments
- **Get from**: https://dashboard.stripe.com/apikeys
- **Note**: Use `sk_test_...` for testing, `sk_live_...` for production

```
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```
- **Description**: Stripe webhook signing secret for verifying webhook events
- **Get from**: Stripe Dashboard → Developers → Webhooks → Add endpoint → Copy signing secret
- **Note**: Optional but recommended for production

## How to Add in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: Variable name (e.g., `DATABASE_URL`)
   - **Value**: Your actual value
   - **Environment**: Select `Production`, `Preview`, and/or `Development` as needed
4. Click **Save**

## Notes

- `NODE_ENV` is automatically set by Vercel (you don't need to add it)
- Never commit actual `.env` files to Git (they're already in `.gitignore`)
- For local development, create a `.env.local` file with these variables
- After adding environment variables, redeploy your application

