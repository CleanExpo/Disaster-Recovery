-- DR-804 Bucket 1 backfill: OnboardingPayment table missing in live Supabase.
-- Stripe onboarding payment flow writes to this table; routes 500 today.
-- Idempotent (IF NOT EXISTS).

-- CreateTable
CREATE TABLE IF NOT EXISTS "OnboardingPayment" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'AUD',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "stripePaymentId" TEXT,
    "stripeSessionId" TEXT,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "OnboardingPayment_contractorId_idx" ON "OnboardingPayment"("contractorId");
CREATE INDEX IF NOT EXISTS "OnboardingPayment_status_idx" ON "OnboardingPayment"("status");

-- Note: Prisma model has no relation() declaration for contractorId — no FK constraint added.
