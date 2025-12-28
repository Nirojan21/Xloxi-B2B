#!/usr/bin/env node

/**
 * Script to set environment variables in Vercel
 * Usage: node scripts/set-vercel-env.js [environment]
 * Environments: production, preview, development
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Environment variables to set
const envVars = {
  DATABASE_URL: {
    description: 'MySQL database connection string',
    required: true,
    example: 'mysql://user:password@host:3306/database_name'
  },
  JWT_SECRET: {
    description: 'Secret key for JWT token signing',
    required: true,
    example: 'your-super-secret-jwt-key-change-this-in-production'
  },
  STRIPE_SECRET_KEY: {
    description: 'Stripe API secret key',
    required: true,
    example: 'sk_test_your_stripe_secret_key'
  },
  STRIPE_WEBHOOK_SECRET: {
    description: 'Stripe webhook signing secret',
    required: false,
    example: 'whsec_your_webhook_secret'
  }
};

// Get environment from command line argument
const targetEnv = process.argv[2] || 'production';
const validEnvs = ['production', 'preview', 'development'];

if (!validEnvs.includes(targetEnv)) {
  console.error(`❌ Invalid environment: ${targetEnv}`);
  console.error(`Valid environments: ${validEnvs.join(', ')}`);
  process.exit(1);
}

// Check if .env.local exists
const envLocalPath = path.join(process.cwd(), '.env.local');
let envValues = {};

if (fs.existsSync(envLocalPath)) {
  console.log('📄 Reading .env.local file...');
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        envValues[key.trim()] = value.trim();
      }
    }
  });
}

console.log(`\n🚀 Setting environment variables for ${targetEnv} environment...\n`);

// Set each environment variable
Object.entries(envVars).forEach(([key, config]) => {
  const value = envValues[key];
  
  if (!value && config.required) {
    console.warn(`⚠️  Warning: ${key} is required but not found in .env.local`);
    console.warn(`   Example: ${config.example}\n`);
    return;
  }
  
  if (!value && !config.required) {
    console.log(`⏭️  Skipping optional variable: ${key}`);
    return;
  }
  
  try {
    console.log(`📝 Setting ${key}...`);
    
    // Use Vercel CLI to set environment variable
    const command = `vercel env add ${key} ${targetEnv}`;
    
    // Note: This requires interactive input, so we'll use a different approach
    // For automated setup, use: vercel env add KEY VALUE ENVIRONMENT
    console.log(`   Run: vercel env add ${key} ${targetEnv}`);
    console.log(`   Value: ${value.substring(0, 20)}...`);
    
  } catch (error) {
    console.error(`❌ Failed to set ${key}:`, error.message);
  }
});

console.log('\n✅ Environment variables setup instructions:');
console.log('\nTo set environment variables in Vercel, use one of these methods:\n');

console.log('Method 1: Using Vercel CLI (Interactive)');
console.log('  vercel env add DATABASE_URL production');
console.log('  vercel env add JWT_SECRET production');
console.log('  vercel env add STRIPE_SECRET_KEY production');
console.log('  vercel env add STRIPE_WEBHOOK_SECRET production\n');

console.log('Method 2: Using Vercel Dashboard');
console.log('  1. Go to your project on Vercel');
console.log('  2. Navigate to Settings → Environment Variables');
console.log('  3. Add each variable manually\n');

console.log('Method 3: Using this script with .env.local file');
console.log('  Create .env.local with your values, then run:');
console.log('  node scripts/set-vercel-env.js production\n');

