-- Add callout payment tracking for ServiceRequest flow (AUD).

-- ContractorProfile: Stripe Connect account id (for payouts)
ALTER TABLE IF EXISTS contractor_profiles
  ADD COLUMN IF NOT EXISTS "stripeConnectAccountId" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "contractor_profiles_stripeConnectAccountId_key"
  ON contractor_profiles ("stripeConnectAccountId");

-- Callout payments
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'CalloutPaymentStatus') THEN
    CREATE TYPE "CalloutPaymentStatus" AS ENUM (
      'CREATED',
      'CHECKOUT_CREATED',
      'PAID',
      'RELEASED',
      'REFUNDED',
      'CANCELLED'
    );
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS service_request_callout_payments (
  id TEXT PRIMARY KEY,
  "serviceRequestId" TEXT NOT NULL UNIQUE,
  "clientId" TEXT NOT NULL,
  "contractorProfileId" TEXT,

  "totalAUD" NUMERIC(12,2) NOT NULL,
  "totalExGstAUD" NUMERIC(12,2) NOT NULL,
  "gstAUD" NUMERIC(12,2) NOT NULL,

  "platformFeeAUD" NUMERIC(12,2) NOT NULL,
  "platformFeeExGstAUD" NUMERIC(12,2) NOT NULL,
  "platformFeeGstAUD" NUMERIC(12,2) NOT NULL,

  "contractorEntitlementAUD" NUMERIC(12,2) NOT NULL,
  "contractorEntitlementExGstAUD" NUMERIC(12,2) NOT NULL,
  "contractorEntitlementGstAUD" NUMERIC(12,2) NOT NULL,

  "gstInclusive" BOOLEAN NOT NULL DEFAULT TRUE,
  status "CalloutPaymentStatus" NOT NULL DEFAULT 'CREATED',

  "stripeCheckoutSessionId" TEXT UNIQUE,
  "stripePaymentIntentId" TEXT UNIQUE,
  "stripeTransferId" TEXT,

  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT "service_request_callout_payments_serviceRequestId_fkey"
    FOREIGN KEY ("serviceRequestId") REFERENCES service_requests(id) ON DELETE CASCADE,
  CONSTRAINT "service_request_callout_payments_clientId_fkey"
    FOREIGN KEY ("clientId") REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT "service_request_callout_payments_contractorProfileId_fkey"
    FOREIGN KEY ("contractorProfileId") REFERENCES contractor_profiles(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "service_request_callout_payments_clientId_idx"
  ON service_request_callout_payments ("clientId");
CREATE INDEX IF NOT EXISTS "service_request_callout_payments_contractorProfileId_idx"
  ON service_request_callout_payments ("contractorProfileId");
CREATE INDEX IF NOT EXISTS "service_request_callout_payments_status_idx"
  ON service_request_callout_payments (status);

