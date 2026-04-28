-- DR-804 Bucket 1 backfill: Partner table missing in live Supabase.
-- Lead assignment to partners writes to this table; assignment routes 500 today.
-- Idempotent (IF NOT EXISTS).
--
-- NOTE: Lead model has FK partnerId -> Partner.id. Lead's live table is `lead_captures`
-- per Bucket 2 audit. The Lead -> Partner FK is NOT created here (the Lead PascalCase
-- table itself doesn't exist live, and `lead_captures` columns may differ). Wire that
-- FK when Lead is reconciled.

-- CreateTable
CREATE TABLE IF NOT EXISTS "Partner" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "abn" TEXT,
    "serviceAreas" TEXT NOT NULL,
    "specializations" TEXT NOT NULL,
    "certifications" TEXT,
    "insuranceApproved" BOOLEAN NOT NULL DEFAULT false,
    "leadCredits" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "accountBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "creditLimit" DOUBLE PRECISION NOT NULL DEFAULT 5000,
    "paymentTerms" INTEGER NOT NULL DEFAULT 7,
    "autoAcceptScore" INTEGER NOT NULL DEFAULT 80,
    "maxLeadsPerDay" INTEGER NOT NULL DEFAULT 10,
    "receiveEmergency" BOOLEAN NOT NULL DEFAULT true,
    "receiveCommercial" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "verifiedAt" TIMESTAMP(3),
    "suspendedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex (unique email)
CREATE UNIQUE INDEX IF NOT EXISTS "Partner_email_key" ON "Partner"("email");
