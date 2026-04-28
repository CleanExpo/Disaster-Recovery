# ADR-014 — Funds-flow Path A cutover (remove escrow + Connect surface)

**Status:** Accepted
**Date:** 2026-04-28
**Supersedes:** ADR-011 (Path A vs Path B deliberation — Path A confirmed and cut over here)
**Related:** `.claude/rules/business-rules.md §2`, `.claude/rules/compliance.md §5`

---

## Context

Disaster Recovery (DR) is a NETWORK ORCHESTRATOR. IICRC-certified
contractors do the restoration work and bill the client directly. DR
takes a subscription + per-job platform fee FROM the contractor; DR
is NOT party to the client → contractor restoration payment.

Two architectural paths had been scaffolded in parallel:

- **Path A — DR not in the funds path.** Contractor invoices client
  directly on-site. DR collects subscription + platform fee from the
  contractor only. This is the canonical model in
  `business-rules.md §2`.
- **Path B — DR holds funds in escrow.** Client pays a callout fee
  into a DR-controlled Stripe account; DR releases payment to the
  contractor via Stripe Connect transfers gated on KPI checkpoints.

Path B accumulated infrastructure that contradicted the canonical
business rules:

- `app/api/contractors/release-payment/route.ts` (475-line KPI release
  engine: held / partial-released / fully-released / refunded states,
  KPICheckpoint typing, Stripe transfer issuance, audit trail).
- `ContractorProfile.stripeConnectAccountId String?` field on the
  Prisma `ContractorProfile` model.
- `MockEmailService.sendPaymentReleasedNotification` (templated
  contractor "your payment has been released" email).

The voice agent's `send-payment-link` tool (deprecated and
`VOICE_AGENT_ENABLED=false` gated, per ADR-011) still issues a Stripe
Checkout session for the callout fee that would settle into DR's
account. That surface is flagged for follow-up here, not modified.

## Decision

**Path A is the operating model.** The Path B surface is removed.

This ADR records:

### Removed (this PR)

- `app/api/contractors/release-payment/route.ts` — entire 475-line KPI
  release engine. No callers.
- `ContractorProfile.stripeConnectAccountId` Prisma field — schema
  removed; live column dropped via migration
  `prisma/migrations/20260428007000_drop_stripe_connect_account_id/migration.sql`
  (`ALTER TABLE "contractor_profiles" DROP COLUMN IF EXISTS "stripeConnectAccountId"`).
  Phill applies the migration via Supabase SQL Editor in a follow-up
  step.
- `MockEmailService.sendPaymentReleasedNotification` — only caller was
  the deleted route.
- `KPICheckpoint`, `PaymentReleaseRequest`, `JobPaymentDetails`,
  `PaymentRelease` interfaces — all were locally typed in the removed
  route file; no other importers.

### Kept (still Path A)

- `PRICING_CONSTANTS.CALLOUT_FEE` and related cents constants in
  `src/lib/payment-security.ts`. These are INDICATIVE pricing only,
  used by marketing copy ("from $X" ranges per ACL s29). DR does NOT
  charge these via Stripe Checkout against its own account. Comment
  block at the constant explicitly says so; do not reintroduce a
  client-side Stripe Checkout flow that settles to DR.
- `PRICING_CONSTANTS.SUBSCRIPTION_TIERS` — contractor subscription is
  on the DR side of the funds flow and is the legitimate Path A
  payment surface.
- `PRICING_CONSTANTS.APPLICATION_FEE` / `JOINING_FEE` — onboarding fees
  charged to contractor (Path A).

### Flagged for follow-up (NOT modified in this PR)

- `app/api/voice/tools/send-payment-link/route.ts` — currently issues a
  Stripe Checkout session for `CALLOUT_FEE_AUD_CENTS` via
  `process.env.STRIPE_SECRET_KEY` (DR's account). Under Path A, DR is
  not party to that payment. The route is `VOICE_AGENT_ENABLED=false`
  gated and never fires from a real call (per ADR-011 deprecation
  comment), so this is a code-removal task, not a behaviour change.
  Tracked as a separate PR; either remove the tool entirely or
  redirect to a contractor-side payment surface once one exists.
  Behaviour change requires Phill confirmation.

## Why Path A

- **No AML/CTF + AUSTRAC review trigger.** Holding client funds in
  escrow (Path B) would be a financial-services regulatory event per
  `business-rules.md §10` reg-change list. Path A keeps DR outside
  that trigger.
- **Preserves the NETWORK ORCHESTRATOR model.** DR doesn't bill clients
  for restoration; contractors do. Path B silently inverts that.
- **Lower operational complexity.** No KPI-release dispute path, no
  escrow reconciliation, no Connect onboarding for contractors.
- **Aligns the codebase with the canonical rule** in
  `.claude/rules/business-rules.md §2` (already Path A; the Path B
  surface was drift, not a sanctioned alternative).

## Future option

If DR ever takes a financial-services licence (AFSL or equivalent)
plus AUSTRAC enrolment, Path B becomes available again. At that point
this ADR would be superseded by a Path B ADR that re-introduces:

- A funds-holding entity / segregated trust account.
- A Stripe Connect onboarding flow on `Contractor`.
- A KPI-checkpoint release engine (the deleted file is preserved in git
  history for reference: see commit removing
  `app/api/contractors/release-payment/route.ts` on branch
  `feat/path-a-cutover-remove-escrow-surface`).

Until then: do NOT reintroduce client-side Stripe Checkout that
settles into DR's account, do NOT add a `stripeConnectAccountId` field
on contractors, do NOT add KPI-release logic.

## Consequences

- The funds-flow surface area in code matches the canonical rule.
- One follow-up: voice payment-link tool removal (flagged above).
- Marketing copy unchanged — indicative pricing remains via
  `PRICING_CONSTANTS.CALLOUT_FEE`.
- Contractor onboarding flow unchanged — `stripeConnectAccountId` was
  never populated by any onboarding step.

## References

- `.claude/rules/business-rules.md §2` (who bills who) and §10
  (reg-change triggers).
- `.claude/rules/compliance.md §5` (AML/CTF posture).
- ADR-011 — earlier callout-fee deliberation that originally proposed
  Path A; this ADR is the cutover.
- `MEMORY.md` 2026-04-28 entry.
