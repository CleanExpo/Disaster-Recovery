# B11 — Ubiquitous Language Ambiguity Resolutions

> **Status:** OPEN — proposes canonical resolution for the 3 flagged ambiguities in `UBIQUITOUS_LANGUAGE.md`. Each option is a concrete pick-one decision; once Phill chooses, a follow-up agent does the codebase sweep + doc updates.

## Why this doc exists

`UBIQUITOUS_LANGUAGE.md` (DR-724 Foundation Audit) flags 3 unresolved domain-vocabulary ambiguities under "Flagged ambiguities (resolve in next `ubiquitous-language` session)". This is audit finding **B11** — P2.

Per `CLAUDE.md` §2 and `.claude/rules/business-rules.md`, the glossary is **load-bearing for compliance and CRM consistency**. Each ambiguity below has a recommended resolution + 2 alternatives + the scope of the codebase sweep required once decided.

---

## Ambiguity 1 — "Brand" vs "Tradename" vs "Operating name"

DR trades as _Disaster Recovery Australia_; the legal entity is _National Restoration Professionals Group Pty Ltd (NRPG)_. Same-thing, three-name problem.

### The three faces

| Face                         | What                              | Where it appears                                                 |
| ---------------------------- | --------------------------------- | ---------------------------------------------------------------- |
| **Consumer brand**           | The name the public sees          | Website, GBP listing, phone greeting, email signature, marketing |
| **Contractual counterparty** | The legal entity signing paper    | Membership agreement, contractor invoices, ABR/ABN registration  |
| **GBP listing name**         | The Google Business Profile entry | Google Search, Maps                                              |

### Recommended resolution — **Option A**

| Term                                                            | Refers to              | Used in                                                                                |
| --------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------- |
| **"Disaster Recovery"**                                         | Consumer brand         | Public copy, page titles, voice agent, emails to clients                               |
| **"NRPG" / "National Restoration Professionals Group Pty Ltd"** | Legal entity           | Membership agreement, contractor-facing legal docs, invoices generated for contractors |
| **"Disaster Recovery Australia"**                               | GBP listing label only | Schema.org Organization markup, GBP source-of-truth name                               |

**Why:** Three distinct names with three distinct roles already exist in practice; the ambiguity is just the lack of a written rule. This codifies what's already happening.

### Alternative — Option B

Collapse to **two** names: "Disaster Recovery" for everything public, "NRPG" for everything contractual. Drop "Disaster Recovery Australia" entirely.

**Trade-off:** simpler glossary; requires renaming the GBP listing (SEO impact, may affect ranking). Not recommended unless GBP risk is acceptable.

### Alternative — Option C

Collapse to **one** name: "Disaster Recovery Australia" as the consumer brand, NRPG only on legal paper. Drop the bare "Disaster Recovery" form.

**Trade-off:** more typing, more verbose page titles. Not recommended.

### Sweep scope if Option A picked

- ~1,152 location pages — already use "Disaster Recovery"
- Footer copy in `src/components/UltraModernFooter.tsx` (deleted) and `AntigravityFooter.tsx` — verify
- Voice agent prompt files (`src/lib/ai/sarah-prompt.ts`, `olivia-prompt.ts`) — already use "Disaster Recovery" per recent edits
- `src/lib/constants.ts` — `NAP` constant should formalise the three names with comments
- `UBIQUITOUS_LANGUAGE.md` — update "Flagged ambiguities" section to record the resolution

---

## Ambiguity 2 — "Platform fee" vs "Service fee" vs "Booking fee"

All three appear across Stripe Checkout, footer copy, and the membership agreement. Per the original audit + `business-rules.md` §5, these are all the **contractor-paid** fee per accepted job.

### Why this matters

Stripe Checkout descriptors (`statement_descriptor`) are limited to 22 characters and appear on bank statements. Inconsistent labels confuse contractors during reconciliation. Compliance-wise, ASIC and ACCC expect platform fees to be **explicitly named** in the membership agreement.

### Recommended resolution — **Option A**

**"Platform fee"** as the canonical term. Used in:

| Surface                              | Wording                                              |
| ------------------------------------ | ---------------------------------------------------- |
| Stripe Checkout statement descriptor | `NRPG PLATFORM FEE`                                  |
| Membership agreement                 | "Platform Fee" (defined term, capitalised)           |
| Footer / public copy                 | "platform fee" (lowercase, unless paragraph-leading) |
| Contractor invoices                  | "Platform Fee — [period]"                            |
| `compliance_events` event_type       | `payment_platform_fee_*`                             |

**Why:** "Platform fee" is the most-precise term. "Service fee" is generic (could mean DR-charges-client, contractor-charges-client, etc. — confusion vector). "Booking fee" implies a per-booking unit that doesn't match the actual subscription + per-job split.

### Alternative — Option B

**"Service fee"** as canonical. Reads more friendly in client-facing copy. **Trade-off:** is wrong because DR's commercial relationship is platform-mediated, not service-provision (per `business-rules.md` §1 — "DR does NOT do restoration work").

### Alternative — Option C

Distinguish the **subscription** (monthly) from the **per-job** charge:

- "Platform fee" = monthly subscription
- "Booking fee" = per-job charge

**Trade-off:** more accurate but adds vocabulary. Reasonable for the membership agreement; clutters public copy.

### Sweep scope if Option A picked

- `src/lib/stripe.ts` `statement_descriptor` literals — already done in PR #260
- Membership agreement template (`docs/legal/membership-agreement-*.md` if it exists)
- Footer copy + public marketing pages
- `compliance_events` writer (rename event_type values + add migration notes)

---

## Ambiguity 3 — "Emergency" vs "Urgent" vs "Immediate"

The voice agent (Sarah) currently uses a 3-way urgency split. Each implies a different SLA but only "emergency" has a documented response window.

### Current state

| Term          | Where used                                                                 | Implied SLA                      |
| ------------- | -------------------------------------------------------------------------- | -------------------------------- |
| **emergency** | Voice agent intake (`urgency: emergency` Zod enum), `business-rules.md` §4 | Within 24h where possible        |
| **urgent**    | Voice agent (`urgency: urgent`), `business-rules.md` §4                    | 2-3 business days                |
| **immediate** | Public copy ("immediate response"), occasionally in voice prompt           | Undocumented — implies < 1 hour? |

### Recommended resolution — **Option A**

**Drop "immediate". Keep two-way split.**

| Term            | Replaces                 | SLA                               |
| --------------- | ------------------------ | --------------------------------- |
| **emergency**   | "emergency", "immediate" | Within 24h where possible         |
| **urgent**      | unchanged                | 2-3 business days                 |
| (no third tier) | —                        | Routine = scheduled by contractor |

**Why:** "Immediate" promises something the network can't reliably deliver. "Within 24h where possible" is what the contractor terms actually commit to (per `business-rules.md` §4). Three tiers create routing complexity for marginal differentiation.

### Alternative — Option B

Keep three tiers but explicitly document SLA for each:

| Term      | SLA                                            |
| --------- | ---------------------------------------------- |
| emergency | < 4h response, on-site < 24h                   |
| urgent    | < 24h response, on-site within 2 business days |
| routine   | scheduled                                      |

**Trade-off:** Sharper differentiation but commits to time-bound promises that need contractor capacity backing. Not recommended unless contractor-capacity dashboards prove these SLAs are actually met.

### Alternative — Option C

Keep "immediate" as a synonym for "emergency" in client-facing copy only. Internal/CRM uses "emergency".

**Trade-off:** maintains marketing flexibility ("immediate response" reads better in ads) but creates a code/copy mismatch that violates CLAUDE.md §5.5 (no marketing spin in technical fields).

### Sweep scope if Option A picked

- `src/lib/validation/schemas.ts` claimSubmitSchema — `urgencyLevel: z.enum(['emergency', 'urgent', 'standard'])` — already excludes "immediate" ✓
- Voice agent prompts — search for "immediate" usage; replace with "emergency" or "urgent"
- Public marketing pages — remove "immediate response" claims (already partially done — see `compliance.md` §1 banned phrase "Same-day guarantee")
- Update `UBIQUITOUS_LANGUAGE.md` to record the resolution

---

## How to use this doc

**Phill picks A/B/C for each of the 3 ambiguities** (or proposes a 4th option). Then a follow-up agent run does the codebase sweep + glossary update.

Estimated agent effort once decisions are in:

- Ambiguity 1: ~1 hour (mostly verifying existing usage matches the chosen rule)
- Ambiguity 2: ~2 hours (Stripe descriptor + invoice template + membership doc + compliance event renames)
- Ambiguity 3: ~30 min (mostly grep + replace, plus glossary update)

**Total: half a day of senior-agent work to fully close B11.**

---

_Drafted 2026-04-30 for Phill McGurk's product decision. Source-of-truth glossary lives at `UBIQUITOUS_LANGUAGE.md`._
