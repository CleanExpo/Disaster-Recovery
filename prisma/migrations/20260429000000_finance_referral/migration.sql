-- L9 — FinanceReferral persistence (DR-finance-phase1.5).
-- See docs/prd/loops/2026-04-29-finance-referral-persistence/.
--
-- Materialises the `FinanceReferral` model already defined in
-- prisma/schema.prisma (lines 2099-2123) so the submission audit write
-- in app/api/finance/referral/route.ts can persist instead of stdout-only.
--
-- Data class: CONFIDENTIAL when joined to a customer (IP + UA are PII).
-- See .claude/rules/privacy.md §1. No raw email / mobile / name lives in
-- this table — plaintext goes straight to Equipped via JWT handoff.

CREATE TABLE IF NOT EXISTS "FinanceReferral" (
  "id"                          TEXT         NOT NULL,
  "createdAt"                   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "country"                     TEXT         NOT NULL,
  "customerType"                TEXT         NOT NULL,
  "fundingBand"                 TEXT         NOT NULL,
  "disasterCategory"            TEXT         NOT NULL,
  "source"                      TEXT         NOT NULL,
  "disclosureVersion"           TEXT         NOT NULL,
  "privacyNoticeVersion"        TEXT         NOT NULL,
  "consentShareEquipped"        BOOLEAN      NOT NULL,
  "consentReferralDisclosure"   BOOLEAN      NOT NULL,
  "consentMarketing"            BOOLEAN      NOT NULL DEFAULT false,
  "payloadHash"                 TEXT         NOT NULL,
  "ip"                          TEXT,
  "userAgent"                   TEXT,
  "receiver"                    TEXT         NOT NULL,
  "handoffAck"                  BOOLEAN      NOT NULL DEFAULT false,
  "statusWebhookLastStatus"     TEXT,
  "statusWebhookLastAt"         TIMESTAMP(3),

  CONSTRAINT "FinanceReferral_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "FinanceReferral_createdAt_idx"
  ON "FinanceReferral" ("createdAt");

CREATE INDEX IF NOT EXISTS "FinanceReferral_country_customerType_idx"
  ON "FinanceReferral" ("country", "customerType");

CREATE INDEX IF NOT EXISTS "FinanceReferral_receiver_createdAt_idx"
  ON "FinanceReferral" ("receiver", "createdAt");
