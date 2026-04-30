-- DR-804 Step 5 — ContractorPayment table.
--
-- The ContractorSubscription table already exists in production (created
-- by 20260428000005_create_contractor_subscription_table on 2026-04-28).
-- The paired ContractorPayment table was missed in that backfill batch
-- — this migration completes the pair.
--
-- Models defined in prisma/schema.prisma:
--   ContractorSubscription.payments  ContractorPayment[]
--   ContractorPayment.subscription   ContractorSubscription @relation(...)
--
-- Without this table, every contractor-payment write throws P2021. The
-- analytics/kpi route's prisma.contractorPayment.aggregate() also throws.
--
-- Idempotent (CREATE TABLE IF NOT EXISTS + guarded DO block for FK).
-- Same shape as 20260501100000 / 20260501110000 / 20260501120000.

CREATE TABLE IF NOT EXISTS "ContractorPayment" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT NOT NULL,
    "transactionId" TEXT,
    "failureReason" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContractorPayment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "ContractorPayment_subscriptionId_idx"
    ON "ContractorPayment"("subscriptionId");

CREATE INDEX IF NOT EXISTS "ContractorPayment_status_dueDate_idx"
    ON "ContractorPayment"("status", "dueDate");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'ContractorPayment_subscriptionId_fkey'
    ) THEN
        ALTER TABLE "ContractorPayment"
            ADD CONSTRAINT "ContractorPayment_subscriptionId_fkey"
            FOREIGN KEY ("subscriptionId")
            REFERENCES "ContractorSubscription"("id")
            ON DELETE RESTRICT
            ON UPDATE CASCADE;
    END IF;
END $$;
