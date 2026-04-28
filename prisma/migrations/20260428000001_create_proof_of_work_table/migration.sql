-- DR-804 Bucket 1 backfill: ProofOfWork table missing in live Supabase.
-- Models defined in prisma/schema.prisma but no backing table exists.
-- This migration is idempotent (IF NOT EXISTS) and safe to re-run.

-- CreateTable
CREATE TABLE IF NOT EXISTS "ProofOfWork" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "workType" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientContact" TEXT NOT NULL,
    "projectAddress" TEXT,
    "completionDate" TIMESTAMP(3) NOT NULL,
    "projectValue" DOUBLE PRECISION NOT NULL,
    "projectDescription" TEXT,
    "damageType" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "propertyType" TEXT NOT NULL,
    "emergencyResponse" BOOLEAN NOT NULL DEFAULT false,
    "insuranceClaim" BOOLEAN NOT NULL DEFAULT false,
    "insuranceCompany" TEXT,
    "evidence" TEXT NOT NULL DEFAULT '[]',
    "verificationStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProofOfWork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ProofOfWork_contractorId_idx" ON "ProofOfWork"("contractorId");
CREATE INDEX IF NOT EXISTS "ProofOfWork_verificationStatus_idx" ON "ProofOfWork"("verificationStatus");
CREATE INDEX IF NOT EXISTS "ProofOfWork_workType_idx" ON "ProofOfWork"("workType");

-- AddForeignKey (Contractor live table assumed present; ON DELETE NO ACTION matches Prisma default)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Contractor')
       AND NOT EXISTS (
           SELECT 1 FROM information_schema.table_constraints
           WHERE constraint_name = 'ProofOfWork_contractorId_fkey'
       ) THEN
        ALTER TABLE "ProofOfWork"
        ADD CONSTRAINT "ProofOfWork_contractorId_fkey"
        FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id")
        ON DELETE NO ACTION ON UPDATE CASCADE;
    END IF;
END $$;
