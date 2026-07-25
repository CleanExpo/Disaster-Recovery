-- =============================================================================
-- Lead capture idempotency — atomic duplicate protection
-- =============================================================================
--
-- Adds an OPTIONAL dedupe key to the leads table with a UNIQUE index. The
-- public /api/leads/capture endpoint sets it to sha256(email|phone|time-bucket)
-- so two concurrent identical submissions can never both insert a billable
-- lead: the DB rejects the second with a unique violation (P2002), which the
-- route handles as an idempotent duplicate (no second lead, no re-bill, no
-- re-notify). Nullable so existing rows and any non-capture inserts are
-- unaffected (Postgres permits multiple NULLs under a UNIQUE index).
-- =============================================================================

ALTER TABLE "leads" ADD COLUMN "dedupeKey" TEXT;

CREATE UNIQUE INDEX "leads_dedupeKey_key" ON "leads"("dedupeKey");
