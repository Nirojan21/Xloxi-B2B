#!/bin/bash
set -e

# Set a dummy DATABASE_URL if not provided (needed for Prisma generate)
if [ -z "$DATABASE_URL" ]; then
  export DATABASE_URL="mysql://user:password@localhost:3306/temp_db"
  echo "⚠️  DATABASE_URL not set, using dummy value for Prisma generate"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build Next.js
echo "🏗️  Building Next.js application..."
npm run build

