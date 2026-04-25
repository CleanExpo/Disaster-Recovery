# Loop L1 — Equipped Phase 1 PDF fill

**Loop id:** `2026-04-25-equipped-phase1-pdf-fill`
**Created:** 2026-04-25
**Owner:** Phill McGurk
**Priority:** High — unblocks publicly-linked disclosures on both finance
pages.

## The ask (from 2026-04-25 session)

> Drop George Steele's two remaining compliance PDFs (Credit Guide V17 and
> Privacy Disclosure Statement V2) into the repo and replace the
> "see Credit Guide" placeholder on both finance pages with the real ACL /
> ACR / AFCA numbers extracted from the Credit Guide.

## Restated in my words

Fill the two TODO placeholders that PR #140 (commercial clients) and
PR #142 (NRPG contractor) left when the PDFs couldn't be auto-downloaded.
Two disclosure links currently 404. Publish the PDFs + the licensing
numbers so both pages pass a compliance walkthrough.

## Context links

- PR #140 — `/finance` page scaffold (commercial DR clients)
- PR #142 — `/contractor/equipment-finance` page (NRPG contractors)
- PR #141 — `docs/partners/equipped/` internal reference
- `docs/proposals/equipped-phase1-handover-2026-04-25.md`
- George's 22 April email "Disaster Recovery × Equipped Commercial Finance —
  Phase 1 referral platform ready for review" (Gmail, phill.mcgurk@gmail.com)
- Attachments to extract:
  - `Credit Guide - Version 17 202307.pdf`
  - `Privacy Disclosure Statement_EquippedCF_V2.pdf`

## Exit criteria (concrete success signals)

- [ ] `public/finance/credit-guide-equipped-v17-202307.pdf` exists on main.
- [ ] `public/finance/privacy-disclosure-statement-equippedcf-v2.pdf` exists
      on main.
- [ ] `app/finance/page.tsx` — "ACL / ACR number" and "AFCA member number"
      replaced with verified values from Credit Guide (no `TODO(equipped-phase1)`
      marker remains in that file).
- [ ] `app/contractor/equipment-finance/page.tsx` — same values filled.
- [ ] Both `/finance` and `/contractor/equipment-finance` PDF links return
      HTTP 200 in local dev (`curl -I localhost:3000/finance/...`).
- [ ] `npx tsc --noEmit` clean on main.
- [ ] `npx vitest run` green on main.
- [ ] `07-handoff.md` written with a pointer to the next loop.

## Blockers / prerequisites

- Phill must download the 2 PDFs from Gmail and place them in
  `C:\Disaster Recovery\Disaster-Recovery\public\finance\` with the exact
  filenames above. (Chrome extension lacks `mail.google.com` host permission;
  Gmail MCP is not connected.)

## Out of scope (will spawn follow-up loops if needed)

- Base44 production URL wiring (Loop L6 — JWT hand-off).
- New `FinanceReferral` persistent Prisma model (Loop L9).
- Reply to George (Phill-only action).
- XYZ P/L ACL vehicle (Equipped + HLE's internal project, not DR's concern).

## Notes for Phase 1 (grill-me)

Questions to raise in grill-me:

- What if the Credit Guide lists an **ACR number** instead of an ACL? The
  page currently reads "ACL / ACR number: see Credit Guide". The real
  disclosure should pick ONE depending on the Equipped entity's licence
  status. (ACL = they hold the licence directly. ACR = authorised
  representative of another licensee.)
- Is the AFCA member number format `<digits>` or `Case No <digits>`?
- Does Reg 25 require ANY specific layout/prominence for the ACL/ACR
  disclosure, or just that it's "accessible"?
- Do we need a versioned consent corpus (`EQUIPPED_CONSENT_VERSION` bump) if
  the Privacy Disclosure PDF changes?

## Notes for Phase 2 (design-an-interface)

Interface changes:

- Replace the two `TODO(equipped-phase1)` comment blocks with a compact
  `<dl>` listing ACL or ACR number (whichever applies), AFCA member number,
  entity name, ABN.
- Keep the wording factual, one-line per field.
- Reuse the exact same block on both `/finance` and `/contractor/equipment-finance`
  — consider extracting a shared `<EquippedLicensingBlock />` component in
  `src/components/finance/`.

## Notes for Phase 4 (implement)

- Expected files changed: 3-4
  - `public/finance/*.pdf` (2)
  - `app/finance/page.tsx`
  - `app/contractor/equipment-finance/page.tsx`
  - **Optional:** `src/components/finance/EquippedLicensingBlock.tsx` (new) if
    the shared component is cleaner than copy-paste.

- Token budget: 15k (per PRD default, light loop).
