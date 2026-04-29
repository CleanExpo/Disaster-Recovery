-- A8 + B9 (DR-700 audit refresh 2026-04-28)
--
-- A8 — Adds `WebhookDelivery` table for Stripe webhook idempotency tracking
--      keyed on `eventId @unique`.
-- B9 — Promotes `InsuranceClaimAU.status` from free-form `String` to a
--      Prisma-managed `ClaimStatus` enum, with default `submitted`.
--
-- The status migration is data-preserving: existing values are lower-cased
-- and the legacy `'DRAFT'`, `'SUBMITTED'` shouts get mapped to the new enum
-- variants. Anything outside the known set is mapped to `submitted` (safe
-- fallback — `submitted` is the canonical entry-point state and downstream
-- triage will re-classify if needed).

-- CreateEnum
CREATE TYPE "ClaimStatus" AS ENUM ('draft', 'submitted', 'triaged', 'assigned', 'in_progress', 'make_safe_complete', 'awaiting_kpi_review', 'kpi_passed', 'kpi_failed', 'closed', 'cancelled', 'disputed', 'withdrawn', 'ineligible');

-- B9 — data-preserving column conversion. Drop the old default first, then
-- USING-cast every existing row's text into the enum, then re-attach the
-- new default. Any value not in the enum vocabulary collapses to
-- `submitted` (the safe canonical re-entry state).
ALTER TABLE "InsuranceClaimAU" ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE "InsuranceClaimAU"
  ALTER COLUMN "status" TYPE "ClaimStatus"
  USING (
    CASE LOWER("status")
      WHEN 'draft' THEN 'draft'::"ClaimStatus"
      WHEN 'submitted' THEN 'submitted'::"ClaimStatus"
      WHEN 'triaged' THEN 'triaged'::"ClaimStatus"
      WHEN 'assigned' THEN 'assigned'::"ClaimStatus"
      WHEN 'in_progress' THEN 'in_progress'::"ClaimStatus"
      WHEN 'make_safe_complete' THEN 'make_safe_complete'::"ClaimStatus"
      WHEN 'awaiting_kpi_review' THEN 'awaiting_kpi_review'::"ClaimStatus"
      WHEN 'kpi_passed' THEN 'kpi_passed'::"ClaimStatus"
      WHEN 'kpi_failed' THEN 'kpi_failed'::"ClaimStatus"
      WHEN 'closed' THEN 'closed'::"ClaimStatus"
      WHEN 'cancelled' THEN 'cancelled'::"ClaimStatus"
      WHEN 'disputed' THEN 'disputed'::"ClaimStatus"
      WHEN 'withdrawn' THEN 'withdrawn'::"ClaimStatus"
      WHEN 'ineligible' THEN 'ineligible'::"ClaimStatus"
      ELSE 'submitted'::"ClaimStatus"
    END
  );

ALTER TABLE "InsuranceClaimAU" ALTER COLUMN "status" SET DEFAULT 'submitted';

-- A8 — CreateTable
CREATE TABLE "WebhookDelivery" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'stripe',
    "livemode" BOOLEAN,
    "payloadHash" TEXT,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebhookDelivery_eventId_key" ON "WebhookDelivery"("eventId");

-- CreateIndex
CREATE INDEX "WebhookDelivery_eventType_processedAt_idx" ON "WebhookDelivery"("eventType", "processedAt");

-- CreateIndex
CREATE INDEX "WebhookDelivery_provider_processedAt_idx" ON "WebhookDelivery"("provider", "processedAt");
