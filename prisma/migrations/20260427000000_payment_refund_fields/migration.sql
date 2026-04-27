-- DR-700 P0: add refund-tracking fields to Payment.
-- The application code at app/api/payments/refund/route.ts writes
-- refundAmountAUD / refundReason / refundedAt / description / metadata
-- after a successful Stripe refund. Without these columns the DB write
-- silently fails (catch-block swallowed the error) — money refunds,
-- DB never records it. See docs/audits/schema-drift-phase-1-summary-2026-04-27.md.
--
-- All columns nullable so existing rows continue to validate.

ALTER TABLE "Payment"
  ADD COLUMN "refundAmountAUD" DOUBLE PRECISION,
  ADD COLUMN "refundReason"    TEXT,
  ADD COLUMN "refundedAt"      TIMESTAMP(3),
  ADD COLUMN "description"     TEXT,
  ADD COLUMN "metadata"        JSONB;
