-- DR-820 Path Y — backing tables for the Prisma Lead funnel models.
--
-- Same class of decision as DR-816 (Job vs jobs) and DR-818/819
-- (OnboardingProgress vs contractor_onboarding). Prisma `Lead` and live
-- `lead_captures` are different domain entities:
--   * Prisma side: rich Lead funnel — 40 fields, lead-scoring (leadScore,
--     leadValue, qualityStatus), Partner FK relation, full assignment
--     lifecycle (NEW → ASSIGNED → ACCEPTED → REJECTED → COMPLETED) and
--     paired LeadTracking + LeadNote audit trail.
--   * Live side: `lead_captures` is the simpler contact-form intake table
--     (used by public-form submissions for early-funnel capture).
--
-- Path Y preserves the rich Prisma Lead under dedicated tables (`leads`,
-- `lead_tracking`, `lead_notes`). Live `lead_captures` stays for the
-- contact-form intake.
--
-- Idempotent (IF NOT EXISTS) and safe to re-run.

-- leads (Prisma Lead)
CREATE TABLE IF NOT EXISTS "leads" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "damageType" TEXT NOT NULL,
    "damageDate" TIMESTAMP(3) NOT NULL,
    "damageDescription" TEXT NOT NULL,
    "estimatedAreaAffected" TEXT NOT NULL,
    "hasInsurance" BOOLEAN NOT NULL,
    "insuranceCompany" TEXT,
    "claimNumber" TEXT,
    "excessAmount" TEXT,
    "urgencyLevel" TEXT NOT NULL,
    "propertyValue" TEXT NOT NULL,
    "isBusinessProperty" BOOLEAN NOT NULL,
    "requiresAccommodation" BOOLEAN NOT NULL,
    "leadScore" INTEGER NOT NULL,
    "leadValue" DOUBLE PRECISION NOT NULL,
    "hasPhotos" BOOLEAN NOT NULL,
    "readyToStart" TEXT NOT NULL,
    "budget" TEXT,
    "decisionMaker" BOOLEAN NOT NULL,
    "qualityStatus" TEXT NOT NULL,
    "source" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "partnerId" TEXT,
    "assignedAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- lead_tracking (Prisma LeadTracking)
CREATE TABLE IF NOT EXISTS "lead_tracking" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_tracking_pkey" PRIMARY KEY ("id")
);

-- lead_notes (Prisma LeadNote)
CREATE TABLE IF NOT EXISTS "lead_notes" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey: lead_tracking.leadId -> leads.id
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'lead_tracking_leadId_fkey'
    ) THEN
        ALTER TABLE "lead_tracking"
        ADD CONSTRAINT "lead_tracking_leadId_fkey"
        FOREIGN KEY ("leadId") REFERENCES "leads"("id")
        ON DELETE NO ACTION ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey: lead_notes.leadId -> leads.id
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'lead_notes_leadId_fkey'
    ) THEN
        ALTER TABLE "lead_notes"
        ADD CONSTRAINT "lead_notes_leadId_fkey"
        FOREIGN KEY ("leadId") REFERENCES "leads"("id")
        ON DELETE NO ACTION ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey: leads.partnerId -> Partner.id (Partner table live since PR #255)
-- Wrapped in existence guard for safety in case Partner is not yet live in a
-- target environment.
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Partner')
       AND NOT EXISTS (
           SELECT 1 FROM information_schema.table_constraints
           WHERE constraint_name = 'leads_partnerId_fkey'
       ) THEN
        ALTER TABLE "leads"
        ADD CONSTRAINT "leads_partnerId_fkey"
        FOREIGN KEY ("partnerId") REFERENCES "Partner"("id")
        ON DELETE NO ACTION ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey: PartnerBilling.leadId -> leads.id
-- The original PartnerBilling migration (DR-814) guarded this FK against the
-- uppercase `Lead` table that never landed live. Now that `leads` exists,
-- activate the FK against the new table. Guarded so the migration succeeds in
-- isolation (if PartnerBilling itself isn't present yet) and is idempotent.
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'PartnerBilling')
       AND NOT EXISTS (
           SELECT 1 FROM information_schema.table_constraints
           WHERE constraint_name = 'PartnerBilling_leadId_fkey'
       ) THEN
        ALTER TABLE "PartnerBilling"
        ADD CONSTRAINT "PartnerBilling_leadId_fkey"
        FOREIGN KEY ("leadId") REFERENCES "leads"("id")
        ON DELETE NO ACTION ON UPDATE CASCADE;
    END IF;
END $$;
