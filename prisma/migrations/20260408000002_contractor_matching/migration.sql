-- Migration: contractor_matching
-- Adds radius-tier matching fields to Contractor and creates JobOffer model.

-- Add matching fields to Contractor
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "baseLatitude"       DOUBLE PRECISION;
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "baseLongitude"      DOUBLE PRECISION;
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "serviceRadiusTier"  TEXT;
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "maxKmRadius"        INTEGER;
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "iicrcCertifications" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "lastJobOfferedAt"   TIMESTAMP(3);
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "rotationIndex"      INTEGER NOT NULL DEFAULT 0;

-- Add jobOffers relation back-reference on Job (no column needed — handled by JobOffer.jobId FK)

-- Create JobOffer table
CREATE TABLE IF NOT EXISTS "JobOffer" (
    "id"                      TEXT NOT NULL,
    "jobId"                   TEXT NOT NULL,
    "contractorId"            TEXT NOT NULL,
    "status"                  TEXT NOT NULL DEFAULT 'pending',
    "offeredAt"               TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt"               TIMESTAMP(3) NOT NULL,
    "requiresLiabilityAck"    BOOLEAN NOT NULL DEFAULT false,
    "liabilityAcknowledgedAt" TIMESTAMP(3),
    "pool"                    TEXT NOT NULL,
    "createdAt"               TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"               TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("id")
);

-- Foreign keys
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_jobId_fkey"
    FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_contractorId_fkey"
    FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Indexes
CREATE INDEX IF NOT EXISTS "JobOffer_jobId_status_idx"        ON "JobOffer"("jobId", "status");
CREATE INDEX IF NOT EXISTS "JobOffer_contractorId_status_idx" ON "JobOffer"("contractorId", "status");
CREATE INDEX IF NOT EXISTS "JobOffer_expiresAt_idx"           ON "JobOffer"("expiresAt");
