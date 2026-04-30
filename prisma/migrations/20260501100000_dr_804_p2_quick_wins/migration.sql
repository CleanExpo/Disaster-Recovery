-- DR-804 Step 2 — Bucket 1 P2 quick-win migrations.
--
-- Two phantom Prisma models (real call sites in deployed routes, no
-- backing live table) are restored here as proper tables. Audit:
-- docs/audits/dr-804-phantom-prisma-models-2026-04-30.md §2 + §6.1.
--
-- All DDL below uses IF NOT EXISTS / IF EXISTS so this migration is
-- safe under repeated runs and partial-state schemas (the same pattern
-- as 20260429100000_webhook_delivery).
--
-- ────────────────────────────────────────────────────────────────────
-- 1. ErrorLog — used by app/api/log-error/route.ts
--    Closes the Tier-5 smoke fixme on /api/log-error (PR #329).
-- ────────────────────────────────────────────────────────────────────

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

CREATE INDEX IF NOT EXISTS "ErrorLog_level_idx" ON "ErrorLog"("level");
CREATE INDEX IF NOT EXISTS "ErrorLog_createdAt_idx" ON "ErrorLog"("createdAt");
CREATE INDEX IF NOT EXISTS "ErrorLog_userId_idx" ON "ErrorLog"("userId");

-- ────────────────────────────────────────────────────────────────────
-- 2. ContractorNotification — used by app/api/contractor/dashboard/route.ts
--    FKs to Contractor (live table: contractor_profiles via @@map).
-- ────────────────────────────────────────────────────────────────────

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

CREATE INDEX IF NOT EXISTS "ContractorNotification_type_read_priority_idx"
    ON "ContractorNotification"("type", "read", "priority");

-- FK is added in a guarded DO block so the migration stays idempotent
-- (Postgres has no `ADD CONSTRAINT IF NOT EXISTS` at this version).
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'ContractorNotification_contractorId_fkey'
    ) THEN
        ALTER TABLE "ContractorNotification"
            ADD CONSTRAINT "ContractorNotification_contractorId_fkey"
            FOREIGN KEY ("contractorId")
            REFERENCES "contractor_profiles"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
    END IF;
END $$;
