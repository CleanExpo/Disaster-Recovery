-- DR-814 Bucket 1 backfill: ClaimNotification table missing in live Supabase.
-- Outbox for claim status change notifications. notifications.ts writes here from
-- claim routes; reads break today.
-- Idempotent (IF NOT EXISTS).
--
-- claimId is a soft reference (no FK declared in the Prisma model).

-- CreateTable
CREATE TABLE IF NOT EXISTS "ClaimNotification" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClaimNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ClaimNotification_claimId_read_idx" ON "ClaimNotification"("claimId", "read");
CREATE INDEX IF NOT EXISTS "ClaimNotification_claimId_createdAt_idx" ON "ClaimNotification"("claimId", "createdAt");
