# Ubiquitous Language — Disaster Recovery

_Version 1 seed — generated 2026-04-24 from the DR-724 Foundation Audit._
_Format follows the `ubiquitous-language` skill (`.claude/skills/ubiquitous-language/SKILL.md`)._

This is the canonical DR domain vocabulary. When code, copy, CRM labels, or
claim-flow wording disagrees with this glossary, **the glossary wins** and the
drift is treated as a bug. Re-run the `ubiquitous-language` skill to update it;
raise an ADR under `docs/adr/` if a term's meaning changes.

## Claim lifecycle

| Term               | Definition                                                                              | Aliases to avoid                                  |
| ------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Enquiry**        | Light-touch contact form submission (no property yet committed).                        | Lead (ambiguous before scoring)                   |
| **Lead**           | An **Enquiry** that Ops has scored and assigned to a team for follow-up.                | Prospect, opportunity                             |
| **Claim**          | A completed claim-intake submission with property + damage + insurance details.         | Job (that's downstream), case, ticket             |
| **Draft claim**    | Claim data captured mid-flow (voice intake, partially completed form), not finalised.   | Incomplete claim, stub claim                      |
| **Job**            | An accepted, dispatched piece of restoration work.                                      | Service call (too narrow), contract (too legal)   |
| **Make-safe**      | Emergency stabilisation (board-up, tarp, water extraction) — distinct from remediation. | Emergency response (ambiguous), first response    |
| **Remediation**    | The main restoration work (drying, mould removal, reconstruction).                      | Cleanup, repair                                   |
| **Restoration**    | Umbrella term covering **Make-safe** + **Remediation** + reconstruction.                | Works, project                                    |
| **Scope of works** | The costed plan of everything the **Contractor** will do, produced at assessment.       | Quote, estimate (too generic), SOW (abbreviation) |

## Parties

| Term              | Definition                                                                           | Aliases to avoid                                                 |
| ----------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| **Client**        | The end consumer filing a **Claim**.                                                 | Customer (too commercial), user (too software), insured (varies) |
| **Contractor**    | A network-approved business providing restoration services.                          | Supplier, vendor, partner                                        |
| **Applicant**     | A **Contractor** mid-onboarding; becomes a **Contractor** on approval.               | Candidate                                                        |
| **Member**        | Explicit B2B term used in the membership agreement only (Contractor = Member there). | (never in user-facing copy)                                      |
| **Partner**       | External capitalised partners only (Equipped Commercial Finance, insurer panels).    | (never used for contractors)                                     |
| **Loss adjuster** | The insurer's appointed assessor.                                                    | Assessor (too generic)                                           |
| **Operator**      | DR internal staff handling a **Claim**.                                              | Agent, admin, rep                                                |

## Compliance

| Term                | Definition                                                                            | Aliases to avoid                     |
| ------------------- | ------------------------------------------------------------------------------------- | ------------------------------------ |
| **IICRC-certified** | Verified against the IICRC register. Do NOT use "insurance approved" (see DR-535).    | Insurance approved, insurer endorsed |
| **APP**             | Australian Privacy Principles (Privacy Act 1988 Cth).                                 | (spell out on first use)             |
| **NDB**             | Notifiable Data Breaches scheme (Part IIIC of the Privacy Act).                       | Breach notification scheme           |
| **CGA**             | Consumer Guarantees Act 1993 (NZ).                                                    | NZ consumer law                      |
| **FTA**             | Fair Trading Act 1986 (NZ).                                                           | NZ fair trading law                  |
| **IPP**             | Information Privacy Principles (NZ Privacy Act 2020).                                 | NZ privacy principles                |
| **Reg 25**          | Regulation 25 of NCCP Regulations 2010 (credit referrer exemption used for Equipped). | Referral reg, credit carve-out       |

## Relationships

- An **Enquiry** becomes a **Lead** when an **Operator** scores it.
- A **Lead** becomes a **Claim** when a **Client** completes claim-intake.
- A **Claim** becomes a **Job** when a **Contractor** is assigned.
- A **Job** is sequenced: **Make-safe** -> **Scope of works** -> **Remediation** -> reconstruction.
- A **Contractor** is a **Member** in the membership agreement only; never in public copy.
- A **Partner** is NEVER a **Contractor** — that word is reserved for Equipped, insurer panels, and other capitalised third-parties.
- An **Applicant** becomes a **Contractor** on approval; the onboarding lifecycle is separate from the **Claim** lifecycle.

## Example dialogue

> **Engineer:** "If a voice call drops before the caller gives a property
> address, is that an **Enquiry** or a **Draft claim**?"
>
> **Product:** "**Enquiry** — we only promote to **Draft claim** once there's
> at least a suburb. Below that, there's no claim to draft."
>
> **Engineer:** "And once an **Operator** assigns a **Contractor**, the
> **Claim** becomes a **Job** — do we still call the record a claim in the
> CRM?"
>
> **Product:** "The Prisma row stays `Claim`. The **Job** is a linked row
> with a `contractorId` and a lifecycle of its own. The word **Job** only
> appears once dispatch has happened."
>
> **Engineer:** "The Brisbane insurer's preferred panel — that's a
> **Contractor**, right, not a **Partner**?"
>
> **Product:** "Correct. **Partner** is for Equipped and insurer panels
> themselves (capital-P brands we sign paper with). Individual panel firms
> are **Contractors**. If you see 'partner contractor' anywhere in copy,
> that's a bug — flag it."

## B11 resolutions (locked 2026-05-01)

Source-of-truth docs:
`docs/audits/b11-ubiquitous-language-resolutions-2026-04-30.md`
(B11 audit) + `docs/prd/loops/2026-05-01-dr-rename/` (the ASIC
trading-name lock, which overrode the audit's Option A on
ambiguity #1).

### 1. Brand naming — two names only (per ASIC trading-name lock)

The B11 audit originally proposed Option A (three names with
distinct roles). The 2026-05-01 ASIC rebrand loop overrode that:
the trading name registered with ASIC is plain **"Disaster
Recovery"** (no "Australia" suffix). B11 lands on **Option B**
from the audit — two names only.

| Term                                                            | Refers to                      | Used in                                                                                                |
| --------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| **"Disaster Recovery"**                                         | Consumer brand AND GBP listing | Public copy, page titles, voice agent, client emails, Schema.org Organization, Google Business Profile |
| **"NRPG" / "National Restoration Professionals Group Pty Ltd"** | Legal entity                   | Membership agreement, contractor-facing legal docs, contractor-side invoices                           |

`src/lib/constants.ts` `NAP` constant carries these. The
brand-name guard hook in `scripts/check-brand-name.ts` actively
blocks the previous "Disaster Recovery + Australia" form in
operational paths; historical references stay allowlisted via
`ALLOWED_PATHS_REGEX`.

### 2. Platform fee — canonical term for the contractor → DR fee

**"Platform fee"** is canonical across:

| Surface                              | Wording                                              |
| ------------------------------------ | ---------------------------------------------------- |
| Stripe Checkout statement descriptor | `NRPG ONBOARDING` (already deployed; see PR #260)    |
| Membership agreement                 | "Platform Fee" (defined term, capitalised)           |
| Footer / public copy                 | "platform fee" (lowercase, unless paragraph-leading) |
| Contractor invoices                  | "Platform Fee — [period]"                            |

**NOT to be confused with** the consumer-facing **minimum service
fee** ($2,200) that the contractor charges the client — that's a
separate concept handled by the contractor under the customer
contract. "Platform fee" is the contractor → DR side; "service fee"
(or "minimum callout") is the contractor → client side.

`PLATFORM_FEE` constant in `app/api/claims/submit/route.ts` carries
this convention.

### 3. Urgency tiers — two-way split

**"Emergency"** and **"Urgent"** only. Drop "immediate" — the
network can't reliably commit to sub-hour response, and "immediate"
is puffery-adjacent per `.claude/rules/compliance.md` §1.

| Term            | Replaces                 | SLA                               |
| --------------- | ------------------------ | --------------------------------- |
| **emergency**   | "emergency", "immediate" | Within 24h where possible         |
| **urgent**      | unchanged                | 2–3 business days                 |
| (no third tier) | —                        | Routine = scheduled by contractor |

The Zod `claimSubmitSchema.urgencyLevel` enum already excludes
"immediate" (`['emergency', 'urgent', 'standard']`). Public-copy
puffery cleanup (`description: '...immediate response nationwide'`
patterns in `app/emergency/*/page.tsx`) tracked in the same B11 PR.

---

_Attribution: format from Matt Pocock's `ubiquitous-language` skill (MIT).
See `.claude/skills/LICENSE`._
