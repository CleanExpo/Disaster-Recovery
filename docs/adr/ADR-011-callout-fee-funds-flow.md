# ADR-011: Callout fee funds flow — Path A vs Path B

- **Status:** **Accepted — Path A** (decided 2026-04-26 by Phill McGurk, principal/founder of NRPG)
- **Date:** 2026-04-26
- **Context:** Funds-flow review for the $2,750 client callout fee

## Decision summary

**Path A — Cancel intermediary model.** DR is not in the funds path between client and contractor. Contractor charges client directly on-site (or via their own merchant account); DR collects a per-job platform fee from the contractor.

Rationale:

- Aligns with already-published `business-rules.md §2` ("DR does NOT … act as an intermediary for payment between client and contractor").
- Zero AML/CTF / AUSTRAC / AFSL exposure.
- Simpler engineering (~2 days vs 1-2 weeks for Path B).
- Reversible — A → B migration is straightforward later if Path B becomes desirable; B → A would be much harder once clients have paid into DR.

This decision was made by the principal/founder without counsel review. The counsel briefing package at `docs/counsel/2026-04-26-callout-fee-counsel-package.md` remains available for retroactive review. Path A is the lower-risk option, so bypassing counsel here is conservative — Path A is a strict subset of acceptable legal postures.

> **NOT LEGAL ADVICE.** This ADR is an engineering scaffold. Every legal claim, statutory reference, and regulatory characterisation below is provisional. The decision recorded above is a business-architecture call by Phill, not a legal opinion.

## Context

The Sarah voice agent and supporting payment surface charge a flat
**$2,750 (incl GST) callout fee** to clients before a contractor is
dispatched. The fee is defined in code at
`src/lib/payment-security.ts`:

```ts
export const PRICING_CONSTANTS = {
  CALLOUT_FEE: 275000, // cents, AUD, GST inclusive
  CONTRACTOR_PAYOUT_PCT: 80, // ~$2,200 to contractor on KPI release
  PLATFORM_RETENTION_PCT: 20, // ~$550 retained by DR on KPI completion
};
```

The current charge path is `app/api/voice/tools/send-payment-link/route.ts`:
the route generates a Stripe Checkout session that settles **into the
DR (NRPG) Stripe account**. Funds sit in DR's Stripe balance until a
KPI gate (operator marks the job completed against the contractor's
deliverables) releases the contractor's ~$2,200 share.

This contradicts the network-orchestrator posture documented in
`.claude/rules/business-rules.md` §2:

> DR does NOT … act as an intermediary for payment between client and
> contractor. … hold client funds in escrow.

And it triggers the reg-change conditions in §10 of the same file:

> DR holding any client funds → AML/CTF + financial-services review.

The mismatch was scaffolded in ahead of counsel review and now needs a
decision before the voice agent flag is flipped on in production.

## Decision drivers

- **Regulatory exposure** — AUSTRAC remittance-dealer / non-financier
  intermediary characterisation; ACL s29 disclosure obligations on who
  the merchant of record actually is; APP 5 notice-of-collection
  obligations when DR holds payment data.
- **Commercial** — client UX (one payment surface vs two), contractor
  cash-flow timing, contractor confidence in the KPI release mechanic,
  refund + chargeback recoverability.
- **Engineering complexity** — Stripe Connect onboarding cost, KPI
  state-machine wiring, reconciliation surface, audit trail into
  `compliance_events`.

## Path A — Cancel the intermediary model

DR exits the funds path entirely:

- Each contractor charges the client direct via the contractor's own
  Stripe (or invoice / EFT terms).
- DR collects a per-job platform fee from the contractor after the
  fact, using the existing `ContractorPayment` flow already wired for
  subscription + onboarding fees.
- The voice agent stops generating client-side payment links; instead,
  it captures contact + property + damage and hands the client to a
  named contractor who initiates their own billing.

**Pros**

- Zero AUSTRAC / AML-CTF exposure on client funds (DR never touches
  them).
- Aligns with current `business-rules.md` §2 without a rewrite.
- Lower engineering surface — `ContractorPayment` already exists; no
  Stripe Connect, no KPI release endpoint, no transfer reconciliation.
- Cleaner ACL s29 story: contractor is unambiguously the merchant of
  record for restoration work.

**Cons**

- Two payment surfaces in the client journey (callout to contractor,
  any DR-side charge separately) — measurable UX cost on intake.
- Contractor cash-flow risk shifts onto contractors; some may want
  faster guarantees.
- Harder to enforce the KPI gate — DR can withhold its platform fee
  but cannot claw funds back from the client → contractor path.
- Potential dispute exposure: if a contractor charges $2,750 then
  fails to attend, DR has reputational exposure with no contractual
  hold on the funds.

## Path B — DR holds funds, Stripe Connect manual transfers on KPI release

DR continues to charge the client into its own Stripe balance, then
releases the contractor share via Stripe Connect:

- Onboard every active contractor as a Stripe Connect Express account;
  capture `stripeAccountId` on the `Contractor` model.
- Client charge stays as today (DR is merchant of record on the
  Checkout session).
- On KPI completion (operator action in the contractor portal) the
  server calls `stripe.transfers.create({ destination: stripeAccountId,
amount: ~220000 })` and writes a `payment_released` event to
  `compliance_events`.
- DR retains ~$550 (20%) only after KPI confirmation.

**Pros**

- Single client payment surface — best UX on intake.
- KPI gate is enforceable server-side; release is auditable.
- Refund + chargeback flow recoverable from a balance DR controls.
- Compatible with future escrow / hold-back models (e.g. retention on
  reconstruction sign-off).

**Cons**

- Likely AUSTRAC review — characterisation as a "remittance dealer"
  or analogous designated-services provider is the open question.
- Likely financial-services / e-money-style review — holding client
  funds pre-release may engage trust-account or escrow-agent rules
  that vary by state.
- ACL s29 + APP 5 surface expands: client must be told clearly that
  DR (not the contractor) is taking the money, why, and on what
  release condition.
- Engineering: Stripe Connect onboarding + KYC for every contractor
  (~1–2 weeks build), KPI release endpoint, reconciliation cron,
  expanded `compliance_events` schema.

## Counsel questions (explicit)

To take into the counsel meeting verbatim:

1. **AUSTRAC characterisation.** Does holding $2,750 in DR's Stripe
   balance pre-release constitute "holding client funds" under the
   AUSTRAC remittance-dealer definition (AML/CTF Act s6 designated
   services), or does the fact that the funds are held in a Stripe
   account take it outside that scope?
2. **Non-financier intermediary status.** Does the 80/20 split with a
   KPI-gated release qualify DR as a non-financier intermediary
   (analogous to escrow-agent licensing under each state's regime,
   e.g. NSW _Conveyancers Licensing Act_ / VIC _Estate Agents Act_
   trust-account rules), or is the Stripe-held-balance pattern
   commercially distinct?
3. **Merchant-of-record structure.** Is there a Stripe Connect
   structure (e.g. **destination charges with `on_behalf_of`** so the
   contractor is the legal merchant of record while DR still holds the
   captured funds) that gives Path B's UX without putting DR in the
   funds-holder role for AUSTRAC purposes?
4. **Disclosure obligations under Path B.** What disclosure is required
   to the client at point of collection (ACL s18 / s29, APP 5) when DR
   collects funds and the contractor is the party performing the work?
   Specifically: does the consent surface need to name DR as merchant
   of record, name the contractor, state the release condition, and
   state refund mechanics?
5. **Disclosure obligations under Path A.** What disclosure is required
   to the client when handing off to a contractor for billing — is
   there a referral-fee disclosure trigger if DR's platform fee is
   deducted from amounts the contractor collects from the client?
6. **Contractor-absconds exposure under Path A.** What is DR's exposure
   if a contractor charges the client then fails to attend? Is the
   network-membership agreement sufficient to disclaim liability, or
   does ACL s18 (misleading conduct by the platform) attach to DR for
   the matchmaking representation?
7. **NZ parity.** Same questions under NZ FTA / CGA / Privacy Act 2020
   for NZ clients — is the answer materially different?
8. **AUSTRAC reporting burden.** If Path B is taken and characterised
   as a remittance service, what is the threshold-transaction-report
   (TTR) and suspicious-matter-report (SMR) burden, and at what client
   volume does it become material?

## Recommendation (engineering, not legal)

Marked clearly: **engineering recommendation, not legal advice.**

- **Default to Path A** — it is the lowest-risk path under the current
  posture documented in `business-rules.md` and the only path that
  ships without a counsel green-light on AUSTRAC.
- **Path B is feasible** and gives the better client UX, but it is
  gated entirely on counsel's answers to questions 1–4 above. The
  engineering work is well-scoped (~1–2 weeks for Connect onboarding
  - release endpoint + reconciliation) but should not start until the
    legal characterisation is settled.

## Consequences

Independent of which path is taken:

- **Stays unchanged:** `PRICING_CONSTANTS` in `src/lib/payment-security.ts`
  — the $2,750 figure and the 80/20 split are commercial decisions, not
  funds-flow decisions.
- **Voice tool surface changes either way:** `send-payment-link`
  becomes either a contractor-direct link (Path A) or a DR-merchant
  link with explicit disclosure copy (Path B).
- **Contractor onboarding adds `stripeAccountId` only under Path B** —
  Path A leaves the `Contractor` model untouched.
- **Disclosure copy changes in both paths** — the consent surface on
  the voice agent and `/claim` form must name the merchant of record
  per counsel's answer to questions 4 + 5.
- **`compliance_events` schema gains a `payment_released` event under
  Path B** — Path A reuses existing `payment_*` events on the
  contractor side only.

## Implementation log

| Date | PR | Action |
|---|---|---|
| 2026-04-28 | ADR-014 cutover | `app/api/contractors/release-payment/route.ts` (KPI release engine, 475 lines) removed; `ContractorProfile.stripeConnectAccountId` field and migration dropped. `app/api/voice/tools/send-payment-link/route.ts` flagged but NOT removed pending Phill confirmation. |
| 2026-05-03 | chore/path-a-remove-deprecated-routes | Grace window confirmed — no production callers surfaced. `app/api/payments/create-booking/route.ts` (267 lines) removed. `send-payment-link` confirmed already absent from tree (removed between ADR-014 and this PR). Orphan rate-limit rule in `src/middleware.ts` replaced with the correct `widget-consent` entry. DR-789 implementation epilogue closed. |

## References

- `.claude/rules/business-rules.md` §2 (who bills who) and §10
  (reg-change triggers).
- `.claude/rules/compliance.md` §5 (AML/CTF) and §1 (banned phrases —
  affects disclosure copy).
- `.claude/rules/privacy.md` §5 (compliance_events per route type).
- `src/lib/payment-security.ts` — `PRICING_CONSTANTS`.
- `app/api/voice/tools/send-payment-link/route.ts` — current charge path.
- ADR-003 — voice agent consent + data boundary (disclosure surface
  precedent).
- ADR-004 — feature-flag strategy (whichever path ships will be
  flag-gated for rollback).
