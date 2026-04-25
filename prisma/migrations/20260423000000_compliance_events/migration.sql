-- DR-624 / Wave 12
-- Compliance events table: append-only ledger for AML/CTF + consent audit trail.
-- Feature-flagged via env var COMPLIANCE_EVENTS_ENABLED (default false).
-- Writes are no-ops until the flag is flipped, so this migration is safe to
-- apply before counsel advises on scope.

CREATE TABLE IF NOT EXISTS "compliance_events" (
  "id"                       UUID        NOT NULL DEFAULT gen_random_uuid(),

  -- Event classification
  "event_type"               TEXT        NOT NULL,

  -- Correlation: links to source row in other tables
  "correlation_id"           UUID        NOT NULL,
  "correlation_type"         TEXT        NOT NULL,

  -- Entity the event relates to (may be null for system events)
  "entity_type"              TEXT,
  "entity_identifier_hash"   TEXT,

  -- Amount fields (for transaction-reportable events)
  "amount_cents"             BIGINT,
  "amount_currency"          CHAR(3),

  -- AUSTRAC designated service code (only populated if we become in-scope)
  "designated_service_code"  TEXT,

  -- Consent snapshot (for consent events)
  "consent_copy_hash"        TEXT,
  "consent_version"          TEXT,
  "consent_method"           TEXT,

  -- Timing
  "occurred_at"              TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Freeform metadata (JSONB for flexible future fields without migrations)
  "metadata"                 JSONB       NOT NULL DEFAULT '{}'::jsonb,

  -- Audit
  "created_at"               TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT "compliance_events_pkey" PRIMARY KEY ("id")
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS "idx_compliance_events_correlation"
  ON "compliance_events" ("correlation_id", "correlation_type");
CREATE INDEX IF NOT EXISTS "idx_compliance_events_occurred_at"
  ON "compliance_events" ("occurred_at" DESC);
CREATE INDEX IF NOT EXISTS "idx_compliance_events_type"
  ON "compliance_events" ("event_type", "occurred_at" DESC);
CREATE INDEX IF NOT EXISTS "idx_compliance_events_entity"
  ON "compliance_events" ("entity_identifier_hash")
  WHERE "entity_identifier_hash" IS NOT NULL;

-- Append-only: revoke UPDATE and DELETE at the DB layer so tampering is
-- traceable. Only INSERT is permitted, and only via the service role
-- (enforced by RLS below).
REVOKE UPDATE, DELETE ON "compliance_events" FROM PUBLIC;
REVOKE UPDATE, DELETE ON "compliance_events" FROM authenticated;
REVOKE UPDATE, DELETE ON "compliance_events" FROM service_role;

-- RLS: deny read by default; only service_role can insert.
ALTER TABLE "compliance_events" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "compliance_events_no_read"
  ON "compliance_events" FOR SELECT
  TO authenticated, anon
  USING (false);

CREATE POLICY "compliance_events_service_role_insert"
  ON "compliance_events" FOR INSERT
  TO service_role
  WITH CHECK (true);

COMMENT ON TABLE "compliance_events" IS
  'Append-only AML/CTF + consent audit ledger. Feature-flagged via COMPLIANCE_EVENTS_ENABLED env. See DR-Sandbox proposals/DR-compliance-events-scaffold/migration.md.';
