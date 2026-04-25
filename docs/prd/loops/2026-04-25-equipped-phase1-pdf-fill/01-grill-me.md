# Phase 1 — Grill Me

**Loop:** `2026-04-25-equipped-phase1-pdf-fill`
**Skill invoked:** `grill-me` (Pocock, ported).

## Q1 — ACL vs ACR: which applies to Equipped?

**A:** Both. Equipped Commercial Finance (SME Consulting Group Pty Ltd) is a
**Corporate Credit Representative (ACR 544113)** of **Straw Financial Services
Pty Ltd (ACL 504512)**.

**Display implication:** the page must name BOTH entities. Previous copy
("Equipped holds the relevant Australian Credit Licence or acts as an
authorised credit representative") was hedged because we didn't know which
was true. Now resolved — **not a licensee**, is an ACR.

**Decision:** display as two lines:

- Licensee: Straw Financial Services Pty Ltd, ACL 504512
- Credit Representative: SME Consulting Group Pty Ltd T/as Equipped
  Commercial Finance (ABN 53 662 478 408), Credit Representative 544113

## Q2 — AFCA number format?

**A:** `#94533` per Credit Guide V17 p.2. Display exactly as
"AFCA membership #94533" to match the guide's wording.

## Q3 — Which address should be public-facing?

**A:** The Credit Guide uses Suite 801, Level 8, 84 Pitt Street, Sydney NSW
2000. The Privacy Disclosure uses 75-85 O'Riordan Street, Alexandria NSW
2015. Pitt Street is the ACR/broker address (matches SME Consulting Group on
both docs), so that's the correct public address for the finance page.

## Q4 — Should there be a shared licensing block component, or inline on both pages?

**A:** Shared component. Two pages duplicating 5 fields will drift — the V17
value will update (V18 in the future), and a shared component enforces single
source of truth. Component path:
`src/components/finance/EquippedLicensingBlock.tsx`.

## Q5 — Does Reg 25 dictate any specific layout / prominence?

**A:** Reg 25 of the NCCP Regulations 2010 (Cth) requires the referrer to
disclose the identity of the credit licensee at point of referral. Prominence
is not prescribed but "clearly visible" is the regulator guidance. A
dedicated section with a heading "Licensing" is sufficient. The existing
PR #140 / PR #142 layout already does this.

## Q6 — Does the consent corpus need a version bump?

**A:** The `EQUIPPED_CONSENT_VERSION` constant used by `EquippedConsentForm`
should match (Credit Guide V17, Privacy Disclosure V2). Check
`src/components/finance/EquippedConsentForm.tsx` for the current value. If
set to something older, bump to `v17-2023-07` (matches the Credit Guide
revision).

## Q7 — Does the RecoveryCapital v1/(1) version difference matter?

**A:** The updated `RecoveryCapital _ Base44 (1).pdf` supersedes the prior
copy. Replace the existing `docs/partners/equipped/recoverycapital-base44.pdf`
with the (1) version for internal use. This document remains internal —
NOT copied to `public/finance/`.

## Open questions at exit gate

**None remaining.** Proceed to Phase 2.

## Decisions to record in `UBIQUITOUS_LANGUAGE.md` / ADR

- `UBIQUITOUS_LANGUAGE.md` already names "Partner" — no new term needed.
- No new ADR required; this is a content fill, not an architectural change.
