-- DR-816 Path Y — backing table for the Prisma `Job` field-service work-order entity.
--
-- The live `jobs` table is a property-based work-order (different domain entity:
-- propertyId/clientId/estimatedCost/scheduledDate). The Prisma `Job` model is a
-- field-service work-order with inline customer + address + insurance metadata.
-- They share a name but are different concepts. Path Y preserves the Prisma shape
-- under a new live table `field_service_jobs`; live `jobs` stays orphan or gets
-- repurposed by NRPG-side later.
--
-- Idempotent (IF NOT EXISTS) and safe to re-run.

-- CreateTable
CREATE TABLE IF NOT EXISTS "field_service_jobs" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "contractorId" TEXT,

    -- Job Details
    "serviceType" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    -- Location
    "address" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "coordinates" JSONB,

    -- Customer Info (encrypted-at-rest expected at app layer)
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT,

    -- Insurance
    "insuranceClaim" BOOLEAN NOT NULL DEFAULT false,
    "insurerName" TEXT,
    "claimNumber" TEXT,
    "policyNumber" TEXT,

    -- Assignment lifecycle
    "assignedAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    -- Notes
    "description" TEXT NOT NULL,
    "internalNotes" TEXT,

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "field_service_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "field_service_jobs_status_urgency_idx" ON "field_service_jobs"("status", "urgency");
CREATE INDEX IF NOT EXISTS "field_service_jobs_contractorId_status_idx" ON "field_service_jobs"("contractorId", "status");
CREATE INDEX IF NOT EXISTS "field_service_jobs_suburb_state_idx" ON "field_service_jobs"("suburb", "state");

-- AddForeignKey (Contractor live table — ON DELETE NO ACTION matches Prisma optional relation)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Contractor')
       AND NOT EXISTS (
           SELECT 1 FROM information_schema.table_constraints
           WHERE constraint_name = 'field_service_jobs_contractorId_fkey'
       ) THEN
        ALTER TABLE "field_service_jobs"
        ADD CONSTRAINT "field_service_jobs_contractorId_fkey"
        FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id")
        ON DELETE NO ACTION ON UPDATE CASCADE;
    END IF;
END $$;
