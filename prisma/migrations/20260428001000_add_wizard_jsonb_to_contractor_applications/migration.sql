-- DR-815 — Wizard payload persistence (Option A).
-- Adds 5 nullable JSONB columns to contractor_applications for the
-- onboarding wizard sections that don't fit the flat column shape.
-- Idempotent (IF NOT EXISTS) and safe to re-run.

ALTER TABLE "contractor_applications"
  ADD COLUMN IF NOT EXISTS "insuranceData"    JSONB,
  ADD COLUMN IF NOT EXISTS "experienceData"   JSONB,
  ADD COLUMN IF NOT EXISTS "equipmentData"    JSONB,
  ADD COLUMN IF NOT EXISTS "healthSafetyData" JSONB,
  ADD COLUMN IF NOT EXISTS "bankingData"      JSONB;
