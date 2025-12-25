-- Seed data for local development
-- Password for all test users: "Password123!"
-- Bcrypt hash generated with: bcrypt.hash("Password123!", 10)

-- Admin User
INSERT INTO users (id, email, password, name, "userType", "createdAt", "updatedAt")
VALUES (
  'admin-001',
  'admin@disasterrecovery.com',
  '$2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy',
  'Admin User',
  'ADMIN',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Client User
INSERT INTO users (id, email, password, name, "userType", "createdAt", "updatedAt")
VALUES (
  'client-001',
  'client@example.com',
  '$2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy',
  'John Client',
  'CLIENT',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Contractor User
INSERT INTO users (id, email, password, name, "userType", "createdAt", "updatedAt")
VALUES (
  'contractor-001',
  'contractor@example.com',
  '$2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy',
  'Mike Contractor',
  'CONTRACTOR',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Create contractor profile for contractor user
INSERT INTO contractor_profiles (
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

-- Verify insertion
SELECT 'Seed completed! Test users created:' AS status;
SELECT id, email, name, "userType" FROM users WHERE id LIKE '%-001';
