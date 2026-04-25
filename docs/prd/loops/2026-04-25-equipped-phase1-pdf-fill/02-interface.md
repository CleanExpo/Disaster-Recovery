# Phase 2 — Design-an-Interface

**Loop:** `2026-04-25-equipped-phase1-pdf-fill`
**Skill invoked:** `design-an-interface`, `ubiquitous-language`.

## Contract: new component

```tsx
// src/components/finance/EquippedLicensingBlock.tsx

export interface EquippedLicensingBlockProps {
  /**
   * Visual variant. Both variants render identical licensing facts;
   * the variant only affects tone of the short introductory sentence
   * above the facts. Defaults to 'commercial'.
   */
  variant?: 'commercial' | 'contractor';
}

/**
 * Authoritative Equipped Commercial Finance licensing block.
 *
 * Sourced from Credit Guide V17 202307. Do not hand-edit the numbers
 * below — update the Credit Guide file under public/finance/ and bump
 * the values here in ONE commit.
 *
 * Data class: PUBLIC. Safe to publish on the consumer site.
 */
export default function EquippedLicensingBlock(
  props: EquippedLicensingBlockProps,
): JSX.Element;
```

## Facts rendered (from Credit Guide V17)

- **Australian Credit Licensee:** Straw Financial Services Pty Ltd
- **ACL Number:** 504512
- **Credit Representative (broker):** SME Consulting Group Pty Ltd
  T/as Equipped Commercial Finance
- **Credit Representative Number:** 544113
- **ABN:** 53 662 478 408
- **Address:** Suite 801, Level 8, 84 Pitt Street, Sydney NSW 2000
- **Phone:** 1300 293 747
- **Email:** admin@equippedcf.com.au
- **AFCA membership:** #94533

## HTML structure

```tsx
<section>
  <h3>Equipped Commercial Finance — licensing</h3>
  <p>{variantIntroSentence}</p>
  <dl>
    <dt>Licensee</dt>
    <dd>Straw Financial Services Pty Ltd, Australian Credit Licence 504512</dd>

    <dt>Credit Representative</dt>
    <dd>SME Consulting Group Pty Ltd T/as Equipped Commercial Finance (ABN 53 662 478 408), Credit Representative 544113</dd>

    <dt>AFCA membership</dt>
    <dd>#94533</dd>

    <dt>Contact</dt>
    <dd>1300 293 747 · admin@equippedcf.com.au</dd>
  </dl>
</section>
```

## Page integration

Both `app/finance/page.tsx` and `app/contractor/equipment-finance/page.tsx`
replace their existing "Equipped Commercial Finance — licensing" section's
body with `<EquippedLicensingBlock variant={...} />`.

- `/finance` → `variant="commercial"`
- `/contractor/equipment-finance` → `variant="contractor"`

Intro sentence per variant:

- commercial: "Equipped Commercial Finance is the trading name of SME
  Consulting Group Pty Ltd, acting as a Credit Representative of Straw
  Financial Services Pty Ltd for commercial-purpose credit."
- contractor: "Contractor equipment finance referrals flow to Equipped
  Commercial Finance (SME Consulting Group Pty Ltd), which acts as a
  Credit Representative of Straw Financial Services Pty Ltd."

## Consent version bump

`src/components/finance/EquippedConsentForm.tsx`:

- Old: `export const EQUIPPED_CONSENT_VERSION = 'v1.0-2026-04-23';`
- New: `export const EQUIPPED_CONSENT_VERSION = 'v1.1-2026-04-25';`

Reason: the disclosure PDFs are now publicly linked and their contents are
part of the consent corpus. Bumping the version ensures the hashed
`FinanceReferral.payloadHash` + `consentVersion` fields clearly delineate
pre- and post-PDF-publication referrals in audit.

## PDFs committed to disk

| Source in `~/Downloads` | Destination | Classification |
|---|---|---|
| `Credit Guide - Version 17   202307.pdf` | `public/finance/credit-guide-equipped-v17-202307.pdf` | PUBLIC |
| `Privacy Disclosure Statement_EquippedCF_V2.pdf` | `public/finance/privacy-disclosure-statement-equippedcf-v2.pdf` | PUBLIC |
| `RecoveryCapital _ Base44 (1).pdf` | `docs/partners/equipped/recoverycapital-base44.pdf` (**overwrite existing**) | INTERNAL |

RecoveryCapital v(1) overwrites the prior `.pdf` under `docs/partners/` — it's
the newer version George sent. NOT published to `public/`.

## Territory claimed by this loop

Territory (no other agent may touch during implementation):

- `public/finance/*.pdf` (new files)
- `docs/partners/equipped/recoverycapital-base44.pdf` (overwrite)
- `src/components/finance/EquippedLicensingBlock.tsx` (new)
- `src/components/finance/EquippedConsentForm.tsx` (version bump line only)
- `app/finance/page.tsx` (licensing section body only)
- `app/contractor/equipment-finance/page.tsx` (licensing section body only)

Excluded (do NOT touch):

- `src/lib/validation/schemas.ts` (per PRD high-conflict list)
- `prisma/schema.prisma`
- anything under `app/contractor/` outside the equipment-finance page.

## Exit gate

- [x] Public contract documented.
- [x] Facts to render listed verbatim from Credit Guide V17.
- [x] Territory claimed.
- [x] Version bump rationale documented.

**Proceed to Phase 3 — Plan.**
