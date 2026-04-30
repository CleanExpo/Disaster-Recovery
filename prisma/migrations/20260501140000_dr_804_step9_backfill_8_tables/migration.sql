-- DR-804 Step 9 — Backfill 8 tables flagged by post-#336 reconciliation.
--
-- Phill ran the reconciliation query on 2026-05-01 and found 8 tables
-- missing from live Supabase despite their definitions existing in
-- earlier migrations:
--
--   BotConversation, ContractorCompany, ContractorInsurance,
--   ContractorKPI, ClaimPhotoAttachment, CompetencyTestResult,
--   SubContractor, SubContractorEngagement
--
-- Most likely cause: an earlier migration was marked APPLIED in
-- _prisma_migrations without the CREATE TABLE statements actually
-- running (e.g. partial-failure that wasn't rolled back; manual
-- `prisma migrate resolve --applied` after a recoverable error).
--
-- Same idempotent pattern as previous DR-804 PRs. CREATE TABLE
-- IF NOT EXISTS + guarded DO blocks for FKs (Postgres lacks
-- ADD CONSTRAINT IF NOT EXISTS at the deployed version).
--
-- All 8 tables have FKs landing on real models (Contractor /
-- contractor_profiles, InsuranceClaimAU, Job / field_service_jobs)
-- — verified before writing this migration.

-- ────────────────────────────────────────────────────────────────────
-- 1. ContractorCompany — used by /api/contractor/onboarding/* + apply
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "ContractorCompany" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "tradingName" TEXT,
    "abn" TEXT NOT NULL,
    "acn" TEXT,
    "companyStructure" TEXT NOT NULL,
    "registeredAddress" TEXT NOT NULL,
    "registeredCity" TEXT NOT NULL,
    "registeredState" TEXT NOT NULL,
    "registeredPostcode" TEXT NOT NULL,
    "mailingAddress" TEXT,
    "mailingCity" TEXT,
    "mailingState" TEXT,
    "mailingPostcode" TEXT,
    "officePhone" TEXT,
    "officeFax" TEXT,
    "website" TEXT,
    "companyEmail" TEXT,
    "directors" TEXT NOT NULL,
    "companyLogo" TEXT,
    "brandColors" TEXT,
    "abnVerified" BOOLEAN NOT NULL DEFAULT false,
    "abnVerifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContractorCompany_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ContractorCompany_contractorId_key"
    ON "ContractorCompany"("contractorId");

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ContractorCompany_contractorId_fkey') THEN
        ALTER TABLE "ContractorCompany"
            ADD CONSTRAINT "ContractorCompany_contractorId_fkey"
            FOREIGN KEY ("contractorId") REFERENCES "contractor_profiles"("id")
            ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- 2. ContractorInsurance — public-liability + professional-indemnity COIs
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "ContractorInsurance" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "insuranceType" TEXT NOT NULL,
    "insurer" TEXT NOT NULL,
    "policyNumber" TEXT NOT NULL,
    "coverageAmount" DOUBLE PRECISION NOT NULL,
    "excess" DOUBLE PRECISION,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "certificateUrl" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContractorInsurance_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "ContractorInsurance_contractorId_idx"
    ON "ContractorInsurance"("contractorId");

CREATE INDEX IF NOT EXISTS "ContractorInsurance_expiryDate_idx"
    ON "ContractorInsurance"("expiryDate");

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ContractorInsurance_contractorId_fkey') THEN
        ALTER TABLE "ContractorInsurance"
            ADD CONSTRAINT "ContractorInsurance_contractorId_fkey"
            FOREIGN KEY ("contractorId") REFERENCES "contractor_profiles"("id")
            ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- 3. ContractorKPI — periodic KPI rollup target (cron not yet wired)
--    See docs/audits/dr-804-kpi-payment-loss-surface-2026-05-01.md §2
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "ContractorKPI" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "periodType" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "totalJobs" INTEGER NOT NULL DEFAULT 0,
    "completedJobs" INTEGER NOT NULL DEFAULT 0,
    "averageResponseTime" DOUBLE PRECISION,
    "averageCompletionTime" DOUBLE PRECISION,
    "customerSatisfaction" DOUBLE PRECISION,
    "qualityScore" DOUBLE PRECISION,
    "complianceScore" DOUBLE PRECISION,
    "cleanClaimsScore" DOUBLE PRECISION,
    "carsiCompliance" DOUBLE PRECISION,
    "totalRevenue" DOUBLE PRECISION,
    "averageJobValue" DOUBLE PRECISION,
    "complaints" INTEGER NOT NULL DEFAULT 0,
    "violations" INTEGER NOT NULL DEFAULT 0,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContractorKPI_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ContractorKPI_contractorId_periodType_periodStart_key"
    ON "ContractorKPI"("contractorId", "periodType", "periodStart");

CREATE INDEX IF NOT EXISTS "ContractorKPI_periodType_periodStart_idx"
    ON "ContractorKPI"("periodType", "periodStart");

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ContractorKPI_contractorId_fkey') THEN
        ALTER TABLE "ContractorKPI"
            ADD CONSTRAINT "ContractorKPI_contractorId_fkey"
            FOREIGN KEY ("contractorId") REFERENCES "contractor_profiles"("id")
            ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- 4. CompetencyTestResult — used by competency-tests onboarding flow
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "CompetencyTestResult" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL DEFAULT 1,
    "score" INTEGER NOT NULL,
    "totalPossible" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "timeTakenSeconds" INTEGER,
    "certificateNumber" TEXT,
    "certificateExpiry" TIMESTAMP(3),
    "reassessmentDueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CompetencyTestResult_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "CompetencyTestResult_contractorId_idx"
    ON "CompetencyTestResult"("contractorId");

CREATE INDEX IF NOT EXISTS "CompetencyTestResult_category_idx"
    ON "CompetencyTestResult"("category");

CREATE INDEX IF NOT EXISTS "CompetencyTestResult_passed_idx"
    ON "CompetencyTestResult"("passed");

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CompetencyTestResult_contractorId_fkey') THEN
        ALTER TABLE "CompetencyTestResult"
            ADD CONSTRAINT "CompetencyTestResult_contractorId_fkey"
            FOREIGN KEY ("contractorId") REFERENCES "contractor_profiles"("id")
            ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- 5. ClaimPhotoAttachment — DR-725 iOS app native-camera bridge
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "ClaimPhotoAttachment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "claimId" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL,
    "geoLat" DOUBLE PRECISION,
    "geoLng" DOUBLE PRECISION,
    "geoAccuracyM" DOUBLE PRECISION,
    "sizeBytes" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClaimPhotoAttachment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "ClaimPhotoAttachment_claimId_idx"
    ON "ClaimPhotoAttachment"("claimId");

CREATE INDEX IF NOT EXISTS "ClaimPhotoAttachment_createdAt_idx"
    ON "ClaimPhotoAttachment"("createdAt");

-- ────────────────────────────────────────────────────────────────────
-- 6. BotConversation — voice + chat bot session ledger
--    Note: Job FK -> field_service_jobs (Prisma `Job` is mapped there).
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "BotConversation" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "jobId" TEXT,
    "contractorId" TEXT,
    "messages" JSONB[],
    "context" JSONB,
    "status" TEXT NOT NULL DEFAULT 'active',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "lastMessageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BotConversation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "BotConversation_sessionId_key"
    ON "BotConversation"("sessionId");

CREATE INDEX IF NOT EXISTS "BotConversation_status_userType_idx"
    ON "BotConversation"("status", "userType");

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'BotConversation_jobId_fkey') THEN
        ALTER TABLE "BotConversation"
            ADD CONSTRAINT "BotConversation_jobId_fkey"
            FOREIGN KEY ("jobId") REFERENCES "field_service_jobs"("id")
            ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- 7. SubContractor — DR-592 sub-contractor onboarding (registered by a
--    primary contractor; separate identity from Contractor table).
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "SubContractor" (
    "id" TEXT NOT NULL,
    "abn" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "tradingName" TEXT,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "tradeType" TEXT NOT NULL,
    "licenceNumber" TEXT NOT NULL,
    "licenceState" TEXT NOT NULL,
    "licenceExpiry" TIMESTAMP(3) NOT NULL,
    "publicLiabilityCoverage" DOUBLE PRECISION NOT NULL,
    "publicLiabilityInsurer" TEXT NOT NULL,
    "publicLiabilityExpiry" TIMESTAMP(3) NOT NULL,
    "onboardingStatus" TEXT NOT NULL DEFAULT 'NOT_STARTED',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "agreementSignedAt" TIMESTAMP(3),
    "agreementSignedBy" TEXT,
    "registeredByContractorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SubContractor_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "SubContractor_abn_key"
    ON "SubContractor"("abn");

CREATE INDEX IF NOT EXISTS "SubContractor_registeredByContractorId_idx"
    ON "SubContractor"("registeredByContractorId");

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SubContractor_registeredByContractorId_fkey') THEN
        ALTER TABLE "SubContractor"
            ADD CONSTRAINT "SubContractor_registeredByContractorId_fkey"
            FOREIGN KEY ("registeredByContractorId") REFERENCES "contractor_profiles"("id")
            ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- 8. SubContractorEngagement — per-job sub-contractor work + invoice.
--    FKs: jobId -> field_service_jobs, subContractorId -> SubContractor,
--    primaryContractorId -> contractor_profiles.
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "SubContractorEngagement" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "subContractorId" TEXT NOT NULL,
    "primaryContractorId" TEXT NOT NULL,
    "tradeType" TEXT NOT NULL,
    "workScope" TEXT NOT NULL,
    "subInvoiceAmount" DOUBLE PRECISION NOT NULL,
    "markupPercent" DOUBLE PRECISION NOT NULL,
    "customerChargeAmount" DOUBLE PRECISION NOT NULL,
    "gstAmount" DOUBLE PRECISION NOT NULL,
    "customerChargeTotalIncGst" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'QUOTED',
    "authorisedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "invoicedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SubContractorEngagement_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "SubContractorEngagement_jobId_idx"
    ON "SubContractorEngagement"("jobId");

CREATE INDEX IF NOT EXISTS "SubContractorEngagement_subContractorId_idx"
    ON "SubContractorEngagement"("subContractorId");

CREATE INDEX IF NOT EXISTS "SubContractorEngagement_primaryContractorId_idx"
    ON "SubContractorEngagement"("primaryContractorId");

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SubContractorEngagement_jobId_fkey') THEN
        ALTER TABLE "SubContractorEngagement"
            ADD CONSTRAINT "SubContractorEngagement_jobId_fkey"
            FOREIGN KEY ("jobId") REFERENCES "field_service_jobs"("id")
            ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SubContractorEngagement_subContractorId_fkey') THEN
        ALTER TABLE "SubContractorEngagement"
            ADD CONSTRAINT "SubContractorEngagement_subContractorId_fkey"
            FOREIGN KEY ("subContractorId") REFERENCES "SubContractor"("id")
            ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SubContractorEngagement_primaryContractorId_fkey') THEN
        ALTER TABLE "SubContractorEngagement"
            ADD CONSTRAINT "SubContractorEngagement_primaryContractorId_fkey"
            FOREIGN KEY ("primaryContractorId") REFERENCES "contractor_profiles"("id")
            ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;
