-- DR-804 Bucket 1 backfill: ContractorSubscription table missing in live Supabase.
-- Stripe subscription cancel route writes to this table; route 500s today.
-- Idempotent (IF NOT EXISTS).

-- CreateTable
CREATE TABLE IF NOT EXISTS "ContractorSubscription" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "baseRadius" INTEGER NOT NULL,
    "additionalTerritories" TEXT,
    "billingFrequency" TEXT NOT NULL DEFAULT 'MONTHLY',
    "amount" DOUBLE PRECISION NOT NULL,
    "nextBillingDate" TIMESTAMP(3),
    "paymentMethod" TEXT,
    "paymentDetails" TEXT,
    "bondAmount" DOUBLE PRECISION NOT NULL DEFAULT 5000,
    "bondStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "bondSecuredDate" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractorSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex (unique contractorId)
CREATE UNIQUE INDEX IF NOT EXISTS "ContractorSubscription_contractorId_key" ON "ContractorSubscription"("contractorId");

-- AddForeignKey (Contractor; ON DELETE Cascade per Prisma onDelete: Cascade)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Contractor')
       AND NOT EXISTS (
           SELECT 1 FROM information_schema.table_constraints
           WHERE constraint_name = 'ContractorSubscription_contractorId_fkey'
       ) THEN
        ALTER TABLE "ContractorSubscription"
        ADD CONSTRAINT "ContractorSubscription_contractorId_fkey"
        FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id")
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
