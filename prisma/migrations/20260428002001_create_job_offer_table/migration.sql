-- DR-814 Bucket 1 backfill: JobOffer table missing in live Supabase.
-- Contractor matching pipeline writes to this table; routes 500 today.
-- Idempotent (IF NOT EXISTS).
--
-- NOTE: JobOffer has FK jobId -> Job.id. The Job PascalCase table does NOT exist live
-- (Job is deferred to DR-816 — different domain entity). The Job FK is wrapped in an
-- existence guard so this migration succeeds in isolation. Wire the FK once Job lands.

-- CreateTable
CREATE TABLE IF NOT EXISTS "JobOffer" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "offeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "requiresLiabilityAck" BOOLEAN NOT NULL DEFAULT false,
    "liabilityAcknowledgedAt" TIMESTAMP(3),
    "pool" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "JobOffer_jobId_status_idx" ON "JobOffer"("jobId", "status");
CREATE INDEX IF NOT EXISTS "JobOffer_contractorId_status_idx" ON "JobOffer"("contractorId", "status");
CREATE INDEX IF NOT EXISTS "JobOffer_expiresAt_idx" ON "JobOffer"("expiresAt");

-- AddForeignKey (Job table not live yet — guard)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Job')
       AND NOT EXISTS (
           SELECT 1 FROM information_schema.table_constraints
           WHERE constraint_name = 'JobOffer_jobId_fkey'
       ) THEN
        ALTER TABLE "JobOffer"
        ADD CONSTRAINT "JobOffer_jobId_fkey"
        FOREIGN KEY ("jobId") REFERENCES "Job"("id")
        ON DELETE NO ACTION ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey (Contractor live)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Contractor')
       AND NOT EXISTS (
           SELECT 1 FROM information_schema.table_constraints
           WHERE constraint_name = 'JobOffer_contractorId_fkey'
       ) THEN
        ALTER TABLE "JobOffer"
        ADD CONSTRAINT "JobOffer_contractorId_fkey"
        FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id")
        ON DELETE NO ACTION ON UPDATE CASCADE;
    END IF;
END $$;
