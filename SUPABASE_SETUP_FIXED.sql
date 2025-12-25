-- Supabase Database Setup Script - FIXED VERSION
-- Run this in Supabase SQL Editor
-- Matches actual Prisma schema with all fields

-- Check and drop existing tables if needed (CAREFUL - this deletes data)
-- DROP TABLE IF EXISTS "contractor_profiles" CASCADE;
-- DROP TABLE IF EXISTS "service_requests" CASCADE;
-- DROP TABLE IF EXISTS "messages" CASCADE;
-- DROP TABLE IF EXISTS "user_preferences" CASCADE;
-- DROP TABLE IF EXISTS "users" CASCADE;
-- DROP TYPE IF EXISTS "UserType";
-- DROP TYPE IF EXISTS "AustralianState";

-- Step 1: Create ENUMS
DO $$ BEGIN
  CREATE TYPE "UserType" AS ENUM ('CLIENT', 'CONTRACTOR', 'ADMIN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "AustralianState" AS ENUM ('NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Step 2: Create users table with ALL fields from Prisma schema
CREATE TABLE IF NOT EXISTS "users" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT,
  "password" TEXT,
  "userType" "UserType" NOT NULL DEFAULT 'CLIENT',
  "googleId" TEXT UNIQUE,
  "avatar" TEXT,
  "australianPhoneNumber" TEXT,
  "australianPostcode" TEXT,
  "australianState" "AustralianState",
  "suburb" TEXT,
  "streetAddress" TEXT,
  "isEmailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  "emailVerificationToken" TEXT,
  "emailVerificationTokenExpiry" TIMESTAMP(3),
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "isBlocked" BOOLEAN NOT NULL DEFAULT FALSE,
  "lastLoginAt" TIMESTAMP(3),
  "tenantId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Create contractor_profiles table
CREATE TABLE IF NOT EXISTS "contractor_profiles" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "businessName" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "state" TEXT NOT NULL,
  "zipCode" TEXT NOT NULL,
  "licenseNumber" TEXT NOT NULL,
  "insuranceProvider" TEXT NOT NULL,
  "insuranceExpiry" TEXT NOT NULL,
  "serviceAreas" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "hourlyRate" DECIMAL(10,2) NOT NULL,
  "experience" INTEGER NOT NULL,
  "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
  "totalJobs" INTEGER NOT NULL DEFAULT 0,
  "bio" TEXT,
  "availability" TEXT NOT NULL DEFAULT 'AVAILABLE',
  "isVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "contractor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Step 4: Create other tables
CREATE TABLE IF NOT EXISTS "service_requests" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "serviceCategory" TEXT NOT NULL,
  "serviceTitle" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "urgency" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "service_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "messages" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "senderId" TEXT NOT NULL,
  "receiverId" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "isRead" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "user_preferences" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "serviceTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "budgetRange" TEXT,
  "urgencyLevel" TEXT,
  "communicationStyle" TEXT,
  "preferredContactMethod" TEXT,
  "theme" TEXT NOT NULL DEFAULT 'light',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Step 5: Create indexes
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users"("email");
CREATE INDEX IF NOT EXISTS "users_googleId_idx" ON "users"("googleId");

-- Step 6: Insert test users
-- Password for all users: "Password123!"
-- Bcrypt hash: $2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy

INSERT INTO "users" (
  id,
  email,
  password,
  name,
  "userType",
  "isActive",
  "isEmailVerified",
  "createdAt",
  "updatedAt"
)
VALUES (
  'admin-001',
  'admin@disasterrecovery.com',
  '$2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy',
  'Admin User',
  'ADMIN',
  TRUE,
  TRUE,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  name = EXCLUDED.name,
  "userType" = EXCLUDED."userType";

INSERT INTO "users" (
  id,
  email,
  password,
  name,
  "userType",
  "isActive",
  "isEmailVerified",
  "createdAt",
  "updatedAt"
)
VALUES (
  'client-001',
  'client@example.com',
  '$2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy',
  'John Client',
  'CLIENT',
  TRUE,
  TRUE,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  name = EXCLUDED.name,
  "userType" = EXCLUDED."userType";

INSERT INTO "users" (
  id,
  email,
  password,
  name,
  "userType",
  "isActive",
  "isEmailVerified",
  "createdAt",
  "updatedAt"
)
VALUES (
  'contractor-001',
  'contractor@example.com',
  '$2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy',
  'Mike Contractor',
  'CONTRACTOR',
  TRUE,
  TRUE,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  name = EXCLUDED.name,
  "userType" = EXCLUDED."userType";

-- Step 7: Create contractor profile
INSERT INTO "contractor_profiles" (
  id,
  "userId",
  "businessName",
  phone,
  address,
  city,
  state,
  "zipCode",
  "licenseNumber",
  "insuranceProvider",
  "insuranceExpiry",
  "serviceAreas",
  "hourlyRate",
  experience,
  rating,
  "totalJobs",
  bio,
  availability,
  "isVerified",
  "createdAt",
  "updatedAt"
)
VALUES (
  'contractor-profile-001',
  'contractor-001',
  'Mikes Restoration Services',
  '+61400123456',
  '123 Main Street',
  'Sydney',
  'NSW',
  '2000',
  'LIC123456',
  'Insurance Co',
  '2026-12-31',
  ARRAY['Sydney', 'NSW'],
  150.00,
  10,
  4.5,
  50,
  'Experienced restoration contractor',
  'AVAILABLE',
  TRUE,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  "businessName" = EXCLUDED."businessName",
  phone = EXCLUDED.phone;

-- Step 8: Verify setup
SELECT '✅ Database setup complete!' AS status;
SELECT '✅ Users created:' AS info;
SELECT id, email, name, "userType", "isActive" FROM "users" ORDER BY "userType";

SELECT '✅ Tables created:' AS info;
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE'
ORDER BY table_name;
