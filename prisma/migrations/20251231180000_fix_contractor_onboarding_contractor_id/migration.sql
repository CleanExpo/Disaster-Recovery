-- Align contractor onboarding tables with NRPG user IDs (CUID strings).
-- Existing schema used UUID for contractorId, but users/contractors use CUID strings.

ALTER TABLE IF EXISTS contractor_onboarding
  ALTER COLUMN "contractorId" TYPE TEXT
  USING "contractorId"::text;

ALTER TABLE IF EXISTS contractor_certifications
  ALTER COLUMN "contractorId" TYPE TEXT
  USING "contractorId"::text;

