-- Expand the contractor training progress counter from the old 14-day
-- curriculum to the current 22-module onboarding programme.

ALTER TABLE "contractor_training_progress"
  ALTER COLUMN "totalSteps" SET DEFAULT 22;

UPDATE "contractor_training_progress"
SET "totalSteps" = 22
WHERE "totalSteps" = 14;

UPDATE "contractor_training_progress"
SET "completed" = false,
    "completedAt" = NULL
WHERE "totalSteps" = 22
  AND "currentStep" < 22
  AND "completed" = true;
