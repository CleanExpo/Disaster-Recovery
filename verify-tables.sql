-- Verify contractor onboarding tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name LIKE 'contractor_%'
ORDER BY table_name;
