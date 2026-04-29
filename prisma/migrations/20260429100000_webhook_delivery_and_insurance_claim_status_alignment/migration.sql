-- A8 — Stripe webhook idempotency table.
--
-- This migration is **idempotent**: prod already has WebhookDelivery from a
-- manual SQL run on 2026-04-29 (the original A8+B9 migration partially
-- applied — the WebhookDelivery half landed; the B9 enum half failed
-- because `InsuranceClaimAU.status` was already typed as the existing
-- `InsuranceClaimStatus` enum, not String as the agent had assumed).
--
-- All DDL below uses `IF NOT EXISTS` so this migration is safe to run
-- whether the schema is fresh or already partially aligned.
--
-- B9 — DEFERRED. Prod has an existing `InsuranceClaimStatus` enum
-- (insurer-adjudication stages: DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED,
-- PARTIALLY_APPROVED, DENIED, PAYMENT_PROCESSED, CLOSED) that pre-dates
-- the restoration-lifecycle `ClaimStatus` enum from the original B9 spec.
-- A domain-modelling decision (insurer-stage vs contractor-stage split) is
-- required before any conversion. Tracked separately. The `ClaimStatus`
-- enum is retained in `prisma/schema.prisma` as scaffolding for that
-- future work but is currently unreferenced by any model.

-- A8 — WebhookDelivery (idempotent)

CREATE TABLE IF NOT EXISTS "WebhookDelivery" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'stripe',
    "livemode" BOOLEAN,
    "payloadHash" TEXT,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WebhookDelivery_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "WebhookDelivery_eventId_key" ON "WebhookDelivery"("eventId");
CREATE INDEX IF NOT EXISTS "WebhookDelivery_eventType_processedAt_idx" ON "WebhookDelivery"("eventType", "processedAt");
CREATE INDEX IF NOT EXISTS "WebhookDelivery_provider_processedAt_idx" ON "WebhookDelivery"("provider", "processedAt");
