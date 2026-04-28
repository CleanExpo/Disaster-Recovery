-- DR-820 — backfill DR-322 Path B KPI columns on live `job_outcome_logs`.
-- The Prisma `JobOutcome` model declares 9 KPI fields (state/suburb/postcode/
-- urgency/insuranceClaim/insurerName/responseMinutes/durationMinutes/
-- totalMinutes) intended to land via DR-322 Path B migration. The Prisma
-- side committed; the live ALTER TABLE never landed. Every
-- `prisma.jobOutcome.create({ ... })` writing KPI fields hits a column-
-- not-found error today.
-- Idempotent (IF NOT EXISTS) and safe to re-run.

ALTER TABLE "job_outcome_logs"
  ADD COLUMN IF NOT EXISTS "state"           TEXT,
  ADD COLUMN IF NOT EXISTS "suburb"          TEXT,
  ADD COLUMN IF NOT EXISTS "postcode"        TEXT,
  ADD COLUMN IF NOT EXISTS "urgency"         TEXT,
  ADD COLUMN IF NOT EXISTS "insuranceClaim"  BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "insurerName"     TEXT,
  ADD COLUMN IF NOT EXISTS "responseMinutes" INTEGER,
  ADD COLUMN IF NOT EXISTS "durationMinutes" INTEGER,
  ADD COLUMN IF NOT EXISTS "totalMinutes"    INTEGER;

-- Indexes from Prisma model (state+jobType+loggedAt for KPI dashboards)
CREATE INDEX IF NOT EXISTS "job_outcome_logs_state_jobType_loggedAt_idx"
  ON "job_outcome_logs"("state", "jobType", "loggedAt");
