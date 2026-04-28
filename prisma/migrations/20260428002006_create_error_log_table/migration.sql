-- DR-814 Bucket 1 backfill: ErrorLog table missing in live Supabase.
-- /api/log-error route writes to this table; smoke test on /log-error fails today
-- (per MEMORY.md 2026-04-27).
-- Idempotent (IF NOT EXISTS).
--
-- userId is a soft reference (no FK declared in the Prisma model).

-- CreateTable
CREATE TABLE IF NOT EXISTS "ErrorLog" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "metadata" TEXT,
    "source" TEXT,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ErrorLog_level_idx" ON "ErrorLog"("level");
CREATE INDEX IF NOT EXISTS "ErrorLog_createdAt_idx" ON "ErrorLog"("createdAt");
CREATE INDEX IF NOT EXISTS "ErrorLog_userId_idx" ON "ErrorLog"("userId");
