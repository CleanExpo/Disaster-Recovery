-- =============================================================================
-- GAP-084: Supabase RLS Hardening — April 12, 2026 deadline
-- =============================================================================
--
-- Enables Row Level Security on all tables that contain PII or sensitive
-- operational data. Without RLS, any client holding the Supabase anon key
-- can read/write these tables directly.
--
-- Pattern:
--   1. ENABLE ROW LEVEL SECURITY — activates RLS; default-deny for all roles.
--   2. service_role BYPASS — Prisma uses the service_role key; it bypasses RLS
--      by Supabase default (BYPASSRLS privilege). No explicit policy needed.
--   3. anon / authenticated roles — NO policies created for these roles on
--      sensitive tables, so direct client access is denied by default.
--
-- NOTE: This migration is safe to run on an existing database. All Prisma
-- operations use the service_role key and are unaffected by RLS.
-- =============================================================================

-- ─── Sensitive tables: PII, claim data, property access ────────────────────

-- InsuranceClaimAU — contains property addresses, policy numbers, access
-- instructions (encrypted), and damage descriptions. Highest sensitivity.
ALTER TABLE "InsuranceClaimAU" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "InsuranceClaimAU" FORCE ROW LEVEL SECURITY;

-- ClaimNotification — linked to claim IDs; contains claim status messages.
ALTER TABLE "ClaimNotification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ClaimNotification" FORCE ROW LEVEL SECURITY;

-- PushToken — client browser push subscriptions linked to claim IDs.
ALTER TABLE "PushToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PushToken" FORCE ROW LEVEL SECURITY;

-- ─── Operational tables: contractor data, jobs, offers ─────────────────────

-- Job — contains property addresses, contractor assignments, customer emails.
ALTER TABLE "Job" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Job" FORCE ROW LEVEL SECURITY;

-- JobOffer — contractor matching records; links jobs to contractors.
ALTER TABLE "JobOffer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "JobOffer" FORCE ROW LEVEL SECURITY;

-- job_outcome_logs — immutable outcome records; contains geo and cost data.
ALTER TABLE "job_outcome_logs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "job_outcome_logs" FORCE ROW LEVEL SECURITY;

-- Contractor — ABN, licence numbers, certification data, bank/payment info.
ALTER TABLE "Contractor" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Contractor" FORCE ROW LEVEL SECURITY;

-- ContractorApplication — pre-onboarding applications with personal details.
ALTER TABLE "ContractorApplication" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ContractorApplication" FORCE ROW LEVEL SECURITY;

-- ─── Auth / user tables ─────────────────────────────────────────────────────

-- User — email addresses, hashed passwords, role assignments.
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;

-- ─── Lead / contact tables ───────────────────────────────────────────────────

-- Lead — inbound contact details from the DR website.
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" FORCE ROW LEVEL SECURITY;

-- =============================================================================
-- NOTE TO TEAM (DR-GAP-084):
--
-- FORCE ROW LEVEL SECURITY also applies to table owners and superusers
-- within the database session. The Supabase service_role bypasses RLS at
-- the connection level (BYPASSRLS privilege) — this is intentional and
-- correct for Prisma server-side access.
--
-- If you need to grant authenticated Supabase users (e.g., a future mobile
-- app using Supabase Auth) direct read access to their own claims, add
-- specific policies like:
--
--   CREATE POLICY "claim_owner_select" ON "InsuranceClaimAU"
--     FOR SELECT TO authenticated
--     USING (auth.uid()::text = "clientId");
--
-- Do NOT add policies for the anon role on any of these tables.
-- =============================================================================
