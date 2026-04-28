-- DR-818 + DR-819 Path Y — backing tables for the Prisma 14-day training flow.
--
-- Same class of decision as DR-816 (Job vs jobs). Two different onboarding
-- systems shared a name:
--   * Prisma side: 14-day step-counter training program (currentStep/totalSteps,
--     consumed by /api/contractor/onboarding/progress and the Stripe webhook
--     post-payment hook).
--   * Live side: `contractor_onboarding` is specialisation-based onboarding with
--     assessmentScore, recommendedModules JSONB, and OnboardingStatus enum
--     (PENDING_START → ...). Different consumer entirely.
--
-- Path Y preserves the Prisma 14-day shape under dedicated tables. Live
-- `contractor_onboarding` and `contractor_module_progress` stay for the
-- specialisation flow.
--
-- Idempotent (IF NOT EXISTS) and safe to re-run.

-- contractor_training_progress (Prisma OnboardingProgress)
CREATE TABLE IF NOT EXISTS "contractor_training_progress" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "totalSteps" INTEGER NOT NULL DEFAULT 14,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "metadata" TEXT,

    CONSTRAINT "contractor_training_progress_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "contractor_training_progress_contractorId_key"
  ON "contractor_training_progress"("contractorId");

CREATE INDEX IF NOT EXISTS "contractor_training_progress_contractorId_idx"
  ON "contractor_training_progress"("contractorId");

-- contractor_training_modules (Prisma ModuleProgress)
CREATE TABLE IF NOT EXISTS "contractor_training_modules" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "score" DOUBLE PRECISION,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "contractor_training_modules_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "contractor_training_modules_contractorId_moduleName_key"
  ON "contractor_training_modules"("contractorId", "moduleName");

CREATE INDEX IF NOT EXISTS "contractor_training_modules_contractorId_idx"
  ON "contractor_training_modules"("contractorId");
