-- DR-804 Step 3 — ContractorTerritory + ContractorAuditLog tables.
--
-- Two more phantom Prisma models (real call sites in deployed routes,
-- no backing live table) restored as proper tables. Audit:
-- docs/audits/dr-804-phantom-prisma-models-2026-04-30.md §3 + §6.1.
--
-- Both were originally listed as Bucket 2 LOW-confidence @@map
-- candidates, but the column-diff §3 verified the suggested live
-- co-tenants (`contractor_location_history`, `workspace_audit_logs`)
-- have wrong semantics. Better to create dedicated tables.
--
-- Same idempotency pattern as 20260501100000_dr_804_p2_quick_wins:
-- CREATE TABLE IF NOT EXISTS + guarded DO block for FKs (Postgres
-- has no ADD CONSTRAINT IF NOT EXISTS at this version).
--
-- ────────────────────────────────────────────────────────────────────
-- 1. ContractorTerritory — used by app/api/contractor/analytics/route.ts
--    Service-area definition per contractor (radius / postcode / suburb /
--    LGA / state). Joined to suburb data for claim routing.
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "ContractorTerritory" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "centerLat" DOUBLE PRECISION,
    "centerLng" DOUBLE PRECISION,
    "radiusKm" DOUBLE PRECISION,
    "postcodes" TEXT,
    "suburbs" TEXT,
    "emergencyResponse" BOOLEAN NOT NULL DEFAULT true,
    "afterHours" BOOLEAN NOT NULL DEFAULT false,
    "weekendService" BOOLEAN NOT NULL DEFAULT true,
    "maxJobsPerDay" INTEGER NOT NULL DEFAULT 5,
    "currentActiveJobs" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContractorTerritory_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "ContractorTerritory_type_active_idx"
    ON "ContractorTerritory"("type", "active");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'ContractorTerritory_contractorId_fkey'
    ) THEN
        ALTER TABLE "ContractorTerritory"
            ADD CONSTRAINT "ContractorTerritory_contractorId_fkey"
            FOREIGN KEY ("contractorId")
            REFERENCES "contractor_profiles"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
    END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- 2. ContractorAuditLog — used by app/api/contractor/login/route.ts
--    Per-contractor action ledger (login/logout/profile/document/
--    payment/compliance). Independent of compliance_events; this one
--    is contractor-scoped and not subject to the ADR-013 append-only
--    constraint.
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "ContractorAuditLog" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "details" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "performedBy" TEXT NOT NULL,
    "performedByType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContractorAuditLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "ContractorAuditLog_category_createdAt_idx"
    ON "ContractorAuditLog"("category", "createdAt");

CREATE INDEX IF NOT EXISTS "ContractorAuditLog_action_createdAt_idx"
    ON "ContractorAuditLog"("action", "createdAt");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'ContractorAuditLog_contractorId_fkey'
    ) THEN
        ALTER TABLE "ContractorAuditLog"
            ADD CONSTRAINT "ContractorAuditLog_contractorId_fkey"
            FOREIGN KEY ("contractorId")
            REFERENCES "contractor_profiles"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
    END IF;
END $$;
