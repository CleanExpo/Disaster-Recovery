# Business Rules — Disaster Recovery

> How the business actually works — billing, pricing, quoting, who can
> do what. Linked from @CLAUDE.md §0.
>
> **NOT LEGAL ADVICE — interim scaffold pending counsel validation.**

_Last updated: 2026-04-24 (Foundation Sprint Day 10)._

---

## 1. The model in one sentence

Disaster Recovery is a NETWORK ORCHESTRATOR. IICRC-certified
`Contractors` do the restoration work and bill the `Client` directly.
DR does not do restoration and does not bill on behalf of anyone.

## 2. Who bills who (hard)

> **Funds-flow architecture: Path A (confirmed 2026-04-28).** See
> @docs/adr/ADR-014-funds-flow-path-a.md. The previously-staged Path B
> Connect + escrow surface (`release-payment` route, `stripeConnectAccountId`
> field, KPI release engine) was removed in that cutover. Do NOT
> reintroduce.

| Flow                        | Billing?                               |
| --------------------------- | -------------------------------------- |
| Restoration work (claim)    | Contractor → Client directly.          |
| Platform / network access   | Contractor → DR (subscription).        |
| Insurance cover             | Client ↔ their insurer (DR not party). |
| Finance (Equipped referral) | Equipped → Client (Reg 25 referral).   |

DR does NOT:

- Invoice the client for restoration work.
- Invoice the insurer directly.
- Act as an intermediary for payment between client and contractor.
- Hold client funds in escrow.
- Give credit advice on Equipped finance (Reg 25 referrer only — see
  @.claude/rules/compliance.md §8).

DR DOES:

- Charge contractors a subscription + platform fee (`ContractorSubscription`,
  `ContractorPayment` in Prisma).
- Refer clients to Equipped via a compliant Reg 25 flow.
- Accept payment from contractors via Stripe Checkout (DR-586/712 —
  flag-gated).

---

## 3. Quoting + pricing

### Who can quote what

| Actor                | May quote                                  | May NOT quote                        |
| -------------------- | ------------------------------------------ | ------------------------------------ |
| Public site copy     | Indicative RANGES sourced from data.       | Firm prices for a specific job.      |
| Cost estimator       | Range + disclaimer, pre-fills to `/claim`. | Fixed quote.                         |
| Voice agent (Sarah)  | Nothing price-related — escalates.         | Any price claim whatsoever.          |
| Contractor (on-site) | Firm `Scope of works` with GST.            | (no restriction — this is their job) |
| Operator (DR)        | Nothing price-related to clients directly. | Any price claim to clients.          |

### Published price ranges

Every price range on the public site is sourced. See
@.claude/rules/compliance.md §2 for the ACL s29 rationale.

Sources currently in use:

- 2026-02/25 Conversion Audit CSV (`data/pricing/*.json`)
- Per-service cost guides (e.g. `/guides/water-damage/cost`)

If you add a new price, add its source in the same commit. No
fabricated ranges.

### Currency

AUD on AU pages; NZD on NZ pages. Never mixed. GST-inclusive unless
explicitly stated. See @.claude/rules/australian-english.md §4.

---

## 4. Service offering

- Core damage categories: water, fire, flood, storm, mould, biohazard,
  vehicle impact, sewage, trauma. See `Damage Type` in
  @.context/domain-models.md.
- Location coverage: AU + NZ. ~1,152 location pages generated from
  `data/locations/*.json` + `data/suburbs/*.ts`.
- SLA targets (indicative only; no guarantees):
  - Emergency: response within 24h where possible.
  - Urgent: within 2-3 business days.
  - Routine: scheduled by the contractor.

Do NOT use the word "guaranteed" anywhere near SLAs. See
@.claude/rules/compliance.md §1.

---

## 5. Contractor economics (INTERNAL — never in public context)

Data class: **INTERNAL** / **CONFIDENTIAL** where tied to a specific
contractor. NEVER let contractor commission data into an AI context.
See @.claude/rules/privacy.md §2.

- Contractors pay a subscription to join the network.
- Contractors pay a platform fee per accepted job (see
  `ContractorPayment` + `OnboardingPayment`).
- DR does NOT take a cut of the restoration fee the contractor bills the
  client — that is 100% the contractor's revenue.
- Territory exclusivity varies by tier (`ContractorTerritory` model).

The SPECIFIC rates live in Vercel env vars + the membership agreement,
not in public code. If you find a hard-coded percentage that looks like
a commission, that's a data-class drift — raise it.

---

## 6. Claim flow (operations)

See @.context/domain-models.md for the detailed lifecycle. Summary:

1. `Enquiry` (light touch) →
2. `Lead` (Operator-scored) →
3. `Claim` (Client-completed intake) →
4. `Job` (Contractor dispatched) →
5. `Make-safe` → `Scope of works` → `Remediation` → reconstruction →
6. `Completed`.

### Intake surfaces

- **Primary:** `/claim` (web form). Canonical entry. All fake live-chat
  surfaces redirect here (DR-Feb-26 cleanup).
- **Voice:** Sarah (DR-706/709/710/724). Consent-gated, flag-gated,
  5-tool only.
- **Operator-created:** Operator can file on behalf of a client (phone
  intake before voice agent is fully rolled out).

### Assignment

Contractor matching uses `src/lib/contractor-matching.ts` +
`src/lib/contractor-network.ts`. Key inputs: postcode, damage type,
urgency, contractor territory + skill tags. Operator can override.

---

## 7. Contractor onboarding (separate lifecycle)

See @.context/domain-models.md (Applicant + Contractor).

1. `Application started` (public `/contractor/apply`) →
2. Documents submitted (ABN, IICRC certs, insurance COI) →
3. Background check (identity + professional) →
4. Competency tests (per damage category) →
5. Agreement signed (`ContractorAgreement`) →
6. First subscription payment →
7. `Approved` → territory assigned → live.

All onboarding mutations log to `compliance_events` (see
@.claude/rules/privacy.md §5).

---

## 8. Insurance relationship

- DR is NOT an insurance broker, agent, or authorised representative.
- We do NOT provide insurance advice.
- We MAY say: "Most major Australian insurers accept certified
  restoration" (sourced).
- We MAY NOT say: "your insurer will cover this", "insurance
  approved", "guaranteed approval" (see
  @.claude/rules/compliance.md §1).
- The `Claim.insurance` field is a string (insurer name + policy ref
  captured at client option — not validated).

---

## 9. Payments (Stripe — DR-586/712)

- Stripe Checkout is flag-gated (`NEXT_PUBLIC_STRIPE_ENABLED`).
- Only used for CONTRACTOR payments (subscription, platform fee,
  onboarding). Never for client-facing restoration billing.
- Webhook handlers write to `compliance_events` (`payment_*` types).
- Keys live in Vercel env vars only. See @.claude/rules/privacy.md §2.

---

## 10. Exceptions + reg-change triggers

The following would change the legal posture and MUST be counsel-
reviewed before any code ships:

- DR starting to bill clients directly for restoration → AML/CTF review.
- DR holding any client funds → AML/CTF + financial-services review.
- DR quoting Equipped rates or "approving" finance → NCCP licensing
  review.
- DR acting as an insurance intermediary → insurance-broker licensing
  review.

If a product spec drifts toward any of these — STOP. Raise it.

---

## References

- @CLAUDE.md (project anchor)
- @.context/domain-models.md (lifecycles)
- @.claude/rules/compliance.md (legal constraints)
- @.claude/rules/privacy.md (data classes)
- Prisma schema (`prisma/schema.prisma`) — source of truth for models.
