# Ubiquitous Language — Disaster Recovery Australia

*Version 1 seed — generated 2026-04-24 from the DR-724 Foundation Audit.*
*Format follows the `ubiquitous-language` skill (`.claude/skills/ubiquitous-language/SKILL.md`).*

This is the canonical DR domain vocabulary. When code, copy, CRM labels, or
claim-flow wording disagrees with this glossary, **the glossary wins** and the
drift is treated as a bug. Re-run the `ubiquitous-language` skill to update it;
raise an ADR under `docs/adr/` if a term's meaning changes.

## Claim lifecycle

| Term               | Definition                                                                             | Aliases to avoid                                  |
| ------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Enquiry**        | Light-touch contact form submission (no property yet committed).                       | Lead (ambiguous before scoring)                   |
| **Lead**           | An **Enquiry** that Ops has scored and assigned to a team for follow-up.               | Prospect, opportunity                             |
| **Claim**          | A completed claim-intake submission with property + damage + insurance details.        | Job (that's downstream), case, ticket             |
| **Draft claim**    | Claim data captured mid-flow (voice intake, partially completed form), not finalised.  | Incomplete claim, stub claim                      |
| **Job**            | An accepted, dispatched piece of restoration work.                                     | Service call (too narrow), contract (too legal)   |
| **Make-safe**      | Emergency stabilisation (board-up, tarp, water extraction) — distinct from remediation.| Emergency response (ambiguous), first response    |
| **Remediation**    | The main restoration work (drying, mould removal, reconstruction).                     | Cleanup, repair                                   |
| **Restoration**    | Umbrella term covering **Make-safe** + **Remediation** + reconstruction.               | Works, project                                    |
| **Scope of works** | The costed plan of everything the **Contractor** will do, produced at assessment.      | Quote, estimate (too generic), SOW (abbreviation) |

## Parties

| Term              | Definition                                                                    | Aliases to avoid                              |
| ----------------- | ----------------------------------------------------------------------------- | --------------------------------------------- |
| **Client**        | The end consumer filing a **Claim**.                                          | Customer (too commercial), user (too software), insured (varies) |
| **Contractor**    | A network-approved business providing restoration services.                   | Supplier, vendor, partner                     |
| **Applicant**     | A **Contractor** mid-onboarding; becomes a **Contractor** on approval.        | Candidate                                     |
| **Member**        | Explicit B2B term used in the membership agreement only (Contractor = Member there). | (never in user-facing copy)            |
| **Partner**       | External capitalised partners only (Equipped Commercial Finance, insurer panels). | (never used for contractors)              |
| **Loss adjuster** | The insurer's appointed assessor.                                             | Assessor (too generic)                        |
| **Operator**      | DR internal staff handling a **Claim**.                                       | Agent, admin, rep                             |

## Compliance

| Term                 | Definition                                                                          | Aliases to avoid                           |
| -------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------ |
| **IICRC-certified**  | Verified against the IICRC register. Do NOT use "insurance approved" (see DR-535).  | Insurance approved, insurer endorsed       |
| **APP**              | Australian Privacy Principles (Privacy Act 1988 Cth).                               | (spell out on first use)                   |
| **NDB**              | Notifiable Data Breaches scheme (Part IIIC of the Privacy Act).                     | Breach notification scheme                 |
| **CGA**              | Consumer Guarantees Act 1993 (NZ).                                                  | NZ consumer law                            |
| **FTA**              | Fair Trading Act 1986 (NZ).                                                         | NZ fair trading law                        |
| **IPP**              | Information Privacy Principles (NZ Privacy Act 2020).                               | NZ privacy principles                      |
| **Reg 25**           | Regulation 25 of NCCP Regulations 2010 (credit referrer exemption used for Equipped). | Referral reg, credit carve-out           |

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

## Flagged ambiguities (resolve in next `ubiquitous-language` session)

- **"Brand" vs "tradename" vs "operating name"** — DR trades as *Disaster
  Recovery Australia*; the entity is *National Restoration Professionals
  Group Pty Ltd (NRPG)*. Pick one term for each of: the consumer-facing
  brand, the contractual counterparty, and the GBP listing.
- **"Platform fee" vs "service fee" vs "booking fee"** — all three appear
  across Stripe Checkout, footer copy, and the membership agreement. Pick
  one for the Stripe Checkout surface before DR-586 (payment gateway) ships.
- **"Emergency" vs "urgent" vs "immediate"** — the voice agent currently
  uses a 3-way urgency split on intake. Confirm with Ops which is the
  canonical term and whether the other two are aliases or genuine distinct
  urgency levels with different SLAs.

---

*Attribution: format from Matt Pocock's `ubiquitous-language` skill (MIT).
See `.claude/skills/LICENSE`.*
