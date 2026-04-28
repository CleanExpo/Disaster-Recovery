-- DR-814 Bucket 1 backfill: ContractorNotification table missing in live Supabase.
-- Contractor dashboard notifications writer; dashboard route 500s today.
-- Idempotent (IF NOT EXISTS).

-- CreateTable
CREATE TABLE IF NOT EXISTS "ContractorNotification" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "actionRequired" BOOLEAN NOT NULL DEFAULT false,
    "actionUrl" TEXT,
    "actionDeadline" TIMESTAMP(3),
    "read" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "dismissed" BOOLEAN NOT NULL DEFAULT false,
    "dismissedAt" TIMESTAMP(3),
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "smsSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContractorNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ContractorNotification_type_read_priority_idx" ON "ContractorNotification"("type", "read", "priority");

-- AddForeignKey (Contractor live; ON DELETE CASCADE per Prisma model)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Contractor')
       AND NOT EXISTS (
           SELECT 1 FROM information_schema.table_constraints
           WHERE constraint_name = 'ContractorNotification_contractorId_fkey'
       ) THEN
        ALTER TABLE "ContractorNotification"
        ADD CONSTRAINT "ContractorNotification_contractorId_fkey"
        FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id")
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
