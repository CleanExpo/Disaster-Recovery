-- ADR-014 Path A cutover (2026-04-28).
-- DR is NOT in the funds path between client and contractor.
-- The Stripe Connect account id was scaffolded for the (now-rejected)
-- Path B model where DR would have held funds in escrow and released
-- them to contractors via Connect transfers. Path A removes that surface.
--
-- Destructive: drops a live column. Apply via Supabase SQL Editor in a
-- follow-up step. `IF EXISTS` makes it safe to re-run.

ALTER TABLE "contractor_profiles" DROP COLUMN IF EXISTS "stripeConnectAccountId";
