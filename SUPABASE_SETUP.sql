-- Supabase Database Setup Script
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/xoomalxaybjjcxschhrf/sql/new

-- Step 1: Create ENUMS
CREATE TYPE "UserType" AS ENUM ('CLIENT', 'CONTRACTOR', 'ADMIN');

-- Step 2: Create core tables
CREATE TABLE IF NOT EXISTS "users" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT,
  "password" TEXT,
  "userType" "UserType" NOT NULL DEFAULT 'CLIENT',
  "googleId" TEXT UNIQUE,
  "avatar" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "tenantId" TEXT
);

CREATE TABLE IF NOT EXISTS "tenants" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "domain" TEXT NOT NULL UNIQUE,
  "logo" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

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
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "contractor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "service_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "messages" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "senderId" TEXT NOT NULL,
  "receiverId" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "isRead" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "user_preferences" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "theme" TEXT NOT NULL DEFAULT 'light',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "contractor_matches" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "requestId" TEXT NOT NULL,
  "contractorId" TEXT NOT NULL,
  "score" DECIMAL(5,2) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "tenant_configurations" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "tenantId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "admin_themes" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "admin_services" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "admin_service_categories" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Step 3: Create indexes
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users"("email");
CREATE INDEX IF NOT EXISTS "users_googleId_idx" ON "users"("googleId");

-- Step 4: Seed test users
-- Password for all users: "Password123!"
-- Bcrypt hash: $2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy

INSERT INTO "users" (id, email, password, name, "userType", "createdAt", "updatedAt")
VALUES (
  'admin-001',
  'admin@disasterrecovery.com',
  '$2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy',
  'Admin User',
  'ADMIN',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

INSERT INTO "users" (id, email, password, name, "userType", "createdAt", "updatedAt")
VALUES (
  'client-001',
  'client@example.com',
  '$2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy',
  'John Client',
  'CLIENT',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

INSERT INTO "users" (id, email, password, name, "userType", "createdAt", "updatedAt")
VALUES (
  'contractor-001',
  'contractor@example.com',
  '$2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy',
  'Mike Contractor',
  'CONTRACTOR',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Step 5: Create contractor profile
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
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Step 6: Verify setup
SELECT 'Database setup complete!' AS status;
SELECT id, email, name, "userType" FROM users ORDER BY "userType";
