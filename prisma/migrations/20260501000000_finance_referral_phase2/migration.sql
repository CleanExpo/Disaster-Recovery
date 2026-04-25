-- L9 Phase 2 — FinanceReferral status-webhook persistence + idempotency log.
-- See docs/prd/loops/2026-05-01-residual-cleanup/.
--
-- Idempotent (`IF NOT EXISTS` / column-existence checks) so this migration
-- can run on databases that already received the L9 Phase 1 migration
-- (20260429000000_finance_referral) or on fresh databases.
--
-- Data class: CONFIDENTIAL when joined to a customer (per
-- .claude/rules/privacy.md §1). All identifier fields are hashes only.

-- Add new columns to FinanceReferral. Each column wrapped to be re-run safe.
ALTER TABLE "FinanceReferral" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "FinanceReferral" ADD COLUMN IF NOT EXISTS "equippedReferralId" TEXT;
ALTER TABLE "FinanceReferral" ADD COLUMN IF NOT EXISTS "entityIdentifierHash" TEXT;
ALTER TABLE "FinanceReferral" ADD COLUMN IF NOT EXISTS "stage" TEXT;
ALTER TABLE "FinanceReferral" ADD COLUMN IF NOT EXISTS "lastStatus" TEXT;
ALTER TABLE "FinanceReferral" ADD COLUMN IF NOT EXISTS "consentVersion" TEXT;
ALTER TABLE "FinanceReferral" ADD COLUMN IF NOT EXISTS "smsSent" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "FinanceReferral" ADD COLUMN IF NOT EXISTS "metadata" JSONB;

CREATE UNIQUE INDEX IF NOT EXISTS "FinanceReferral_equippedReferralId_key"
  ON "FinanceReferral" ("equippedReferralId");

CREATE INDEX IF NOT EXISTS "FinanceReferral_stage_updatedAt_idx"
  ON "FinanceReferral" ("stage", "updatedAt");

-- New idempotency log table.
CREATE TABLE IF NOT EXISTS "FinanceReferralEvent" (
  "id"                TEXT         NOT NULL,
  "receivedAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "referralId"        TEXT         NOT NULL,
  "eventKey"          TEXT         NOT NULL,
  "webhookTimestamp"  TEXT         NOT NULL,
  "stage"             TEXT         NOT NULL,
  "status"            TEXT         NOT NULL,
  "unknownStage"      BOOLEAN      NOT NULL DEFAULT false,
  "payload"           JSONB,

  CONSTRAINT "FinanceReferralEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "FinanceReferralEvent_eventKey_key"
  ON "FinanceReferralEvent" ("eventKey");

CREATE INDEX IF NOT EXISTS "FinanceReferralEvent_referralId_receivedAt_idx"
  ON "FinanceReferralEvent" ("referralId", "receivedAt");

CREATE INDEX IF NOT EXISTS "FinanceReferralEvent_receivedAt_idx"
  ON "FinanceReferralEvent" ("receivedAt");

-- FK from FinanceReferralEvent.referralId → FinanceReferral.id.
-- ON DELETE SET NULL because FinanceReferral rows are append-only and never
-- deleted in normal operation; this is purely a safety net.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'FinanceReferralEvent_referralId_fkey'
      AND table_name = 'FinanceReferralEvent'
  ) THEN
    ALTER TABLE "FinanceReferralEvent"
      ADD CONSTRAINT "FinanceReferralEvent_referralId_fkey"
      FOREIGN KEY ("referralId") REFERENCES "FinanceReferral"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
