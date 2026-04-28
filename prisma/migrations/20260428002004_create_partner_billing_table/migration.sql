-- DR-814 Bucket 1 backfill: PartnerBilling table missing in live Supabase.
-- Lead-assignment billing rows; lead-assignment routes 500 today.
-- Idempotent (IF NOT EXISTS).
--
-- NOTE: Partner table landed in PR #255 (DR-810). Lead PascalCase table does NOT
-- exist live (Lead is deferred — live `lead_captures` is a candidate Bucket 2 @@map).
-- Lead FK is wrapped in an existence guard so this migration succeeds in isolation.

-- CreateTable
CREATE TABLE IF NOT EXISTS "PartnerBilling" (
    "id" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "invoiceNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerBilling_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey (Partner — live since PR #255)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Partner')
       AND NOT EXISTS (
           SELECT 1 FROM information_schema.table_constraints
           WHERE constraint_name = 'PartnerBilling_partnerId_fkey'
       ) THEN
        ALTER TABLE "PartnerBilling"
        ADD CONSTRAINT "PartnerBilling_partnerId_fkey"
        FOREIGN KEY ("partnerId") REFERENCES "Partner"("id")
        ON DELETE NO ACTION ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey (Lead — not live yet)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Lead')
       AND NOT EXISTS (
           SELECT 1 FROM information_schema.table_constraints
           WHERE constraint_name = 'PartnerBilling_leadId_fkey'
       ) THEN
        ALTER TABLE "PartnerBilling"
        ADD CONSTRAINT "PartnerBilling_leadId_fkey"
        FOREIGN KEY ("leadId") REFERENCES "Lead"("id")
        ON DELETE NO ACTION ON UPDATE CASCADE;
    END IF;
END $$;
