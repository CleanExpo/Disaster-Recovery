# Domain Models — Disaster Recovery Australia

> Extended domain descriptions. This is the file every Claude Code session
> working on domain-adjacent code should load FIRST. The canonical term
> glossary lives in @UBIQUITOUS_LANGUAGE.md — this file expands each term
> into its shape, lifecycle, related terms, and aliases to avoid.
>
> When glossary and code disagree, the glossary wins (drift = bug).

**NOT LEGAL ADVICE — interim scaffold pending counsel validation.**

*Last updated: 2026-04-24 (Foundation Sprint Day 10).*

---

## How to use this file

Every domain model below has five parts:

1. **Canonical definition** — one sentence, authoritative.
2. **Shape** — which Prisma model (or Zod schema) it maps to.
3. **Lifecycle** — the state transitions it moves through.
4. **Related terms** — what it links to in the domain graph.
5. **Aliases to avoid** — words that mean the same thing but should not
   appear in code, copy, or CRM labels.

If you find yourself inventing a new term, stop — either the term is
already here (find it, use it) or it's a drift (raise an ADR).

---

## Claim lifecycle models

### Enquiry

- **Canonical definition:** Light-touch contact form submission — someone
  has given us their name and a rough problem, but no property has been
  committed yet.
- **Shape:** `Enquiry` model (`prisma/schema.prisma`). Fields: `id`,
  `name`, `contact`, `message`, `source`, `createdAt`. NO property fields.
- **Lifecycle:** `new` → `scored` (Operator assigns a score) → transitions
  to a `Lead` record. An `Enquiry` is never directly dispatched.
- **Related:** precedes `Lead`; does not yet link to `Claim` or `Job`.
- **Aliases to avoid:** "Lead" (ambiguous before scoring), "prospect",
  "opportunity", "ticket".

### Lead

- **Canonical definition:** An `Enquiry` that Operations has scored and
  assigned to a team for follow-up.
- **Shape:** `Lead` model. Contains `enquiryId` FK + `score`, `assignedTo`,
  `stage`. Note the related `LeadTracking` and `LeadNote` rows.
- **Lifecycle:** `new` → `contacted` → `qualified` → (either) `converted`
  (becomes a `Claim` when the client completes intake) / `lost` / `parked`.
- **Related:** one-to-one with `Enquiry`; one-to-zero-or-one with `Claim`
  (via client-completed intake).
- **Aliases to avoid:** "Prospect", "opportunity", "warm contact".

### Claim

- **Canonical definition:** A completed claim-intake submission with
  property details, damage details, and insurance details captured.
- **Shape:** Prisma `Claim` model (created Day 7-8 as part of validation
  consolidation). Also validated by the `claimSchema` in
  `src/lib/validation.ts` — that Zod schema is the API-layer source of
  truth. See @docs/adr/ADR-002-claim-shape-single-source-of-truth.md.
- **Lifecycle:** `draft` → `submitted` → `assigned` (a `Contractor` is
  matched; a `Job` record is created) → `active` → `completed` / `cancelled`.
- **Related:** `Lead` (upstream), `Job` (downstream, 1:1 once assigned),
  `Contractor` (via `Job`), `Client`.
- **Aliases to avoid:** "Job" (that's downstream), "case", "ticket",
  "incident".

### Draft claim

- **Canonical definition:** Claim data captured mid-flow — voice intake
  in progress, a partially completed form, a page refresh — not yet
  finalised.
- **Shape:** Either a `Claim` row with `status = 'draft'`, or a voice-agent
  session record awaiting commit (see Sarah tools).
- **Lifecycle:** `draft` → `submitted` (promotes to a full `Claim`) /
  `abandoned` (TTL-expired).
- **Related:** becomes a `Claim` on submission. Does NOT become a `Job`
  directly.
- **Aliases to avoid:** "Incomplete claim", "stub claim", "pending claim".

### Job

- **Canonical definition:** An accepted, dispatched piece of restoration
  work — i.e. a `Claim` after a `Contractor` has been assigned and
  accepted.
- **Shape:** `Job` links `claimId` ↔ `contractorId` with a lifecycle of
  its own. The Prisma row for the customer-facing record stays `Claim`;
  the `Job` is a linked row.
- **Lifecycle:** `dispatched` → `accepted` → `make-safe` → `scope-of-works`
  → `remediation` → `reconstruction` → `completed`. Any stage can
  transition to `on-hold` or `cancelled`.
- **Related:** 1:1 with `Claim` (once assigned), N:1 with `Contractor`.
- **Aliases to avoid:** "Service call" (too narrow), "contract" (too
  legal), "work order" (too ERP).

### Make-safe

- **Canonical definition:** Emergency stabilisation work — board-up,
  tarp, water extraction — distinct from the bulk of the remediation.
- **Shape:** A stage within a `Job`, not its own record. Has its own SLA
  (typically within 24h of dispatch for emergencies).
- **Lifecycle:** `pending` → `on-site` → `complete`. Must complete before
  `scope-of-works` can begin.
- **Related:** first stage of `Job`; distinct from `Remediation`.
- **Aliases to avoid:** "Emergency response" (ambiguous), "first response",
  "stabilisation" (OK in technical copy, not in public).

### Scope of works

- **Canonical definition:** The costed plan of everything the `Contractor`
  will do, produced at assessment.
- **Shape:** Document + structured line-items attached to a `Job`. Feeds
  the client invoice (contractor bills client directly — see
  @.claude/rules/business-rules.md).
- **Lifecycle:** `draft` → `submitted` → `client-approved` /
  `insurer-approved` (where applicable) → `locked` (changes become
  variations).
- **Related:** produced during `Job`; precedes `Remediation`.
- **Aliases to avoid:** "Quote" or "estimate" (too generic — a scope of
  works is costed AND contractually specific), "SOW" (abbreviation only).

### Remediation

- **Canonical definition:** The main restoration work — drying, mould
  removal, reconstruction prep.
- **Shape:** Stage within a `Job`.
- **Lifecycle:** `pending` → `in-progress` → `complete`.
- **Related:** follows `Scope of works`; precedes reconstruction.
- **Aliases to avoid:** "Cleanup" (too casual), "repair" (too generic).

### Restoration

- **Canonical definition:** The umbrella term covering `Make-safe` +
  `Remediation` + reconstruction. This is the public-facing word.
- **Shape:** Not a DB field — a concept. In public copy, "restoration
  work" refers to the whole `Job`.
- **Related:** superset of `Make-safe`, `Remediation`, reconstruction.
- **Aliases to avoid:** "Works", "project", "fix-up".

---

## Party models

### Client

- **Canonical definition:** The end consumer filing a `Claim`.
- **Shape:** `Client` model. Has `userId` (Supabase Auth) for the portal.
- **Lifecycle:** `anonymous` (pre-claim) → `registered` (claim filed) →
  `active` (during job) → `archived` (post-job, 7-year retention).
- **Related:** 1:N with `Claim`. Not the same as a B2B `Partner`.
- **Aliases to avoid:** "Customer" (too commercial), "user" (too
  software-centric), "insured" (varies — not every claim goes through
  insurance).

### Contractor

- **Canonical definition:** A network-approved business providing
  restoration services, who bills the `Client` directly.
- **Shape:** `Contractor` + `ContractorCompany` + ~20 related tables
  (`ContractorApplication`, `ContractorCertification`,
  `ContractorInsurance`, `ContractorPayment`, `ContractorSubscription`,
  `ContractorTerritory`, etc.).
- **Lifecycle:** An `Applicant` becomes a `Contractor` on approval. A
  `Contractor` can be `active` / `suspended` / `terminated`.
- **Related:** N:N with `Job`; 1:N with `Applicant` pre-approval.
- **Aliases to avoid:** "Supplier", "vendor", "partner" (capital-P
  `Partner` is reserved — see below).

### Applicant

- **Canonical definition:** A `Contractor` mid-onboarding; becomes a
  `Contractor` on approval.
- **Shape:** `ContractorApplication` + `OnboardingProgress` +
  `ModuleProgress` + `CompetencyTestResult`.
- **Lifecycle:** `application-started` → `documents-submitted` →
  `background-check` → `competency-tested` → `approved` / `rejected`.
- **Related:** promoted to `Contractor` on approval.
- **Aliases to avoid:** "Candidate", "prospective contractor", "recruit".

### Member

- **Canonical definition:** Explicit B2B term used in the membership
  agreement ONLY — where `Contractor` = `Member`.
- **Shape:** Not a DB concept — a legal-document term.
- **Related:** a `Contractor` viewed through the lens of the membership
  agreement.
- **Aliases to avoid:** NEVER use "Member" in user-facing copy. Use
  "Contractor" everywhere outside the signed membership agreement.

### Partner

- **Canonical definition:** Capital-P external entities we sign paper with
  — Equipped Commercial Finance, insurer panels (Suncorp, IAG, QBE, etc.).
- **Shape:** `Partner` + `PartnerBilling` + `PartnerPayment` in Prisma.
- **Related:** Distinct from `Contractor`. "Partner contractor" is a
  phrase that should never appear in copy.
- **Aliases to avoid:** Never call individual contractors "partners".

### Loss adjuster

- **Canonical definition:** The insurer's appointed assessor.
- **Shape:** Not a DR-owned entity — external party we reference on
  a `Claim`.
- **Related:** attached to `Claim` via `lossAdjusterRef` field.
- **Aliases to avoid:** "Assessor" (too generic — could be a DR
  competency assessor).

### Operator

- **Canonical definition:** DR internal staff handling a `Claim` or
  dispatching a `Job`.
- **Shape:** `User` with operator role.
- **Related:** attached to `Lead` (scoring) and `Claim` (triage).
- **Aliases to avoid:** "Agent" (ambiguous with voice agent), "admin"
  (too broad), "rep".

### Insurance Company

- **Canonical definition:** The client's home-insurance carrier.
- **Shape:** Stored as a string on `Claim`; not an FK (we don't model
  every insurer). Canonical list lives in `src/lib/constants.ts`.
- **Related:** linked informationally on a `Claim`. DR does NOT bill the
  insurer (see @.claude/rules/business-rules.md).
- **Aliases to avoid:** "Insurer" is acceptable; "insurance provider" and
  "insurance carrier" are not (inconsistent with local usage).

---

## Classification models

### Damage Type

- **Canonical definition:** The category of damage that triggered the
  claim.
- **Shape:** Enum-ish string on `Claim.damageType`. Canonical values:
  `water`, `fire`, `flood`, `storm`, `mould`, `biohazard`, `vehicle-impact`,
  `sewage`, `trauma`, `other`.
- **Related:** drives service-page matching, video matching (see
  `data/seo/video-config.ts`), and contractor-skill matching.
- **Aliases to avoid:** "Incident type" (too insurance-jargon),
  "disaster type" (too dramatic for non-catastrophic damage).

### Urgency Level

- **Canonical definition:** How quickly a response is needed. Voice agent
  currently uses a 3-way split (emergency / urgent / routine).
- **Shape:** Enum on `Claim.urgency`. Canonical values: `emergency` (life
  safety / active water) → `urgent` (within 24h) → `routine` (scheduled).
- **Lifecycle:** Set at intake, can be re-classified by Operator.
- **Related:** drives SLA on `Make-safe` stage of `Job`.
- **Aliases to avoid:** The canonical set is `emergency`/`urgent`/`routine`.
  "Immediate", "ASAP", "rush", "critical" should not appear in code.

---

## Relationship diagram (text)

```
Enquiry  ──(score)──>  Lead  ──(intake)──>  Claim  ──(assign)──>  Job
                                              │                     │
                                              │                     ├── Make-safe
                                              │                     ├── Scope of works
                                              │                     ├── Remediation
                                              │                     └── Reconstruction
  Applicant  ──(approve)──>  Contractor  ──(dispatched to)──>  Job
                                              │
                                              └──(bills directly)──>  Client
  Partner  (Equipped / insurer panels — never "partner contractor")
  Loss adjuster  (insurer-side, attached to Claim)
  Operator  (DR internal staff, attached to Lead + Claim)
```

---

## Flagged ambiguities

Same three open items carried from `UBIQUITOUS_LANGUAGE.md`. Resolve via
ADR + next `ubiquitous-language` skill run:

- **Brand vs tradename vs operating name.** DR trades as *Disaster
  Recovery Australia*; legal entity is *National Restoration
  Professionals Group Pty Ltd*. Decide canonical term for: consumer
  brand, contracting counterparty, GBP listing.
- **Platform fee / service fee / booking fee.** Three terms appear across
  Stripe Checkout, footer copy, and the membership agreement. Pick one
  before DR-586 ships.
- **Emergency / urgent / immediate.** The voice agent uses a 3-way split
  — confirm canonical values and whether synonyms are aliases or genuine
  distinct SLAs.

---

## Changelog

- **2026-04-24** — File created (Foundation Sprint Day 10). Expands all
  29 terms from `UBIQUITOUS_LANGUAGE.md` (DR-724) into model-level
  descriptions.
