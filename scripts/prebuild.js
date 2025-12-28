// Pre-build script to ensure DATABASE_URL is set for Prisma generate
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "mysql://user:password@localhost:3306/temp_db";
  console.log("⚠️  DATABASE_URL not set, using dummy value for Prisma generate");
}

