<!--
DR-native worked example for the `ubiquitous-language` skill.
Uses terms drawn from the v1 seed of UBIQUITOUS_LANGUAGE.md at repo root.
-->

# Ubiquitous Language — DR Worked Example

A concrete example of running the `ubiquitous-language` skill against a typical
Disaster Recovery intake/dispatch conversation.

## Input conversation (condensed)

> **Ops lead:** "We had three leads come through voice last night. Two were
> full claims, one was just an enquiry — no property address."
>
> **Engineer:** "So the enquiry didn't hit the CRM as a job?"
>
> **Ops lead:** "No — it's just a lead. The contractor hasn't been assigned
> yet. Once we score it and assign, it becomes a proper job. The other two
> are already make-safe dispatched, scope-of-works to follow."
>
> **Engineer:** "And the member the insurer prefers for the Brisbane one?"
>
> **Ops lead:** "That's a contractor — 'member' is only the word in the
> membership agreement PDF. Externally, we say contractor."

## Extracted glossary (what the skill writes)

### Claim lifecycle

| Term               | Definition                                                                            | Aliases to avoid                   |
| ------------------ | ------------------------------------------------------------------------------------- | ---------------------------------- |
| **Enquiry**        | Light-touch contact form submission — no property committed yet.                      | Lead (when unscored)               |
| **Lead**           | An enquiry that ops has scored and assigned to a team for follow-up.                  | Prospect, opportunity              |
| **Claim**          | A completed claim-intake submission with property + damage + insurance details.       | Job (that's downstream), case      |
| **Draft claim**    | Partially completed claim data (voice intake, mid-flow form) not yet finalised.       | Incomplete claim, stub             |
| **Job**            | An accepted, dispatched piece of restoration work.                                    | Service call, contract, work order |
| **Make-safe**      | Emergency stabilisation (board-up, tarp, water extraction) distinct from remediation. | Emergency response (ambiguous)     |
| **Remediation**    | The main restoration work (drying, mould removal, reconstruction).                    | Cleanup, repair                    |
| **Restoration**    | Umbrella term covering make-safe + remediation + reconstruction.                      | Works, project                     |
| **Scope of works** | The costed plan produced at assessment.                                               | Quote, estimate (too generic)      |

### Parties

| Term              | Definition                                                     | Aliases to avoid            |
| ----------------- | -------------------------------------------------------------- | --------------------------- |
| **Client**        | The end consumer filing a claim.                               | Customer, user, insured     |
| **Contractor**    | A network-approved business providing restoration services.    | Supplier, vendor, partner   |
| **Applicant**     | A contractor mid-onboarding; becomes a Contractor on approval. | Candidate                   |
| **Member**        | Explicit B2B term used in the membership agreement only.       | (never in user-facing copy) |
| **Partner**       | External capitalised partners only (Equipped, insurer panels). | (never for contractors)     |
| **Loss adjuster** | The insurer's appointed assessor.                              | Assessor (too generic)      |
| **Operator**      | DR internal staff handling a claim.                            | Agent, admin                |

## Relationships

- An **Enquiry** becomes a **Lead** when an **Operator** scores it.
- A **Lead** becomes a **Claim** when a **Client** completes claim-intake.
- A **Claim** becomes a **Job** when a **Contractor** is assigned.
- A **Job** is sequenced: **Make-safe** -> **Scope of works** -> **Remediation**.
- A **Contractor** is a **Member** (in the membership agreement only).
- A **Partner** is NEVER a **Contractor**.

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

## Flagged ambiguities (carry-overs)

- "Emergency" vs "urgent" vs "immediate" — the voice agent currently uses a
  3-way urgency split. Confirm with ops which of these is the canonical term
  and which are aliases.
- "Platform fee" vs "service fee" vs "booking fee" — pick one for the Stripe
  Checkout surface before DR-586 ships.
- "Brand" vs "tradename" vs "operating name" — DR trades as Disaster Recovery
  Australia; the entity is NRPG Pty Ltd. Which term wins where?
