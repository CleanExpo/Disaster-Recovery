-- DR-814 Bucket 1 backfill: PushToken table missing in live Supabase.
-- Push notification dispatch (cron + native) writes to this table.
-- Idempotent (IF NOT EXISTS).
--
-- No FK is declared in the Prisma model (claimId is a soft reference).

-- CreateTable
CREATE TABLE IF NOT EXISTS "PushToken" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "platform" TEXT NOT NULL DEFAULT 'web',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PushToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "PushToken_claimId_idx" ON "PushToken"("claimId");
