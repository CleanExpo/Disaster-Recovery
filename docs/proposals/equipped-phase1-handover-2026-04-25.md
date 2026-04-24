# Equipped Commercial Finance — Phase 1 handover

*Drafted 24/04/2026. Targets George Steele email of 22/04/2026,
"Disaster Recovery × Equipped Commercial Finance — Phase 1 referral
platform ready for review".*

**NOT LEGAL ADVICE.** This document is an engineering handover. All
compliance wording, licence numbers and Equipped-side policy belong to
Equipped / SME Consulting Group Pty Ltd and to counsel, not to this
repo.

---

## 1. What shipped in this branch

Branch: `feat/equipped-phase1-finance-page-update`.

1. **`/finance` page** (`app/finance/page.tsx`)
   - New **Equipped Commercial Finance — licensing** section (trust
     markers). Placeholder ACL / ACR / AFCA numbers; see §3 below.
   - Expanded **Disclosures** section with:
     - Reg 25 NCCP Regulations 2010 reminder.
     - Link to `Credit Guide (Equipped Commercial Finance, V17)` →
       `/finance/credit-guide-equipped-v17-202307.pdf`.
     - Link to `Privacy Disclosure Statement (Equipped Commercial
       Finance)` → `/finance/privacy-disclosure-statement-equippedcf-v2.pdf`.
     - NOT LEGAL ADVICE header disclaimer.
   - Primary CTA still points at `/finance/referral` (Base44 URL not
     yet extracted — see §3).
   - Copy reviewed against `.claude/rules/compliance.md` banned
     phrases: no rate quotes, no "approved", no "guaranteed", no
     credit-licensee language.

2. **`EquippedConsentForm`** (`src/components/finance/EquippedConsentForm.tsx`)
   - Consent checkbox now links `/finance/privacy-disclosure-statement-equippedcf-v2.pdf`
     so the consumer acknowledges the Privacy Disclosure Statement in
     the same act as consenting to the handoff.
   - `EQUIPPED_CONSENT_VERSION` unchanged (`v1.0-2026-04-23`) — the
     consent copy string itself is unchanged; only the surrounding
     checkbox label UI gained the PDF link. If counsel treats the PDF
     reference as part of the consent corpus, bump the version in a
     follow-up.

3. **`/public/finance/` directory + README**
   - Directory created with a README listing the three expected PDFs
     and noting the blocked download.

---

## 2. What Phill still needs to do

1. **Drop the three PDFs into `public/finance/`** (see §3).
2. **Reply to George** confirming Phase 1 go-live readiness once the
   PDFs are live. Phill to send — the agent was instructed not to
   reply to George.
3. **Flag for Legal review** — the consent-copy version
   (`v1.0-2026-04-23`) does not currently include the Privacy
   Disclosure Statement filename inside the hashed copy string. If
   counsel wants the PDF URL to be part of the hashed consent corpus,
   bump `EQUIPPED_CONSENT_VERSION` and extend `EQUIPPED_CONSENT_COPY`
   in a follow-up PR.
4. **Populate licensing numbers** in `app/finance/page.tsx` once the
   Credit Guide is reviewed (`TODO(equipped-phase1)` comment marks the
   spot).
5. **Decide the Base44 CTA strategy** — either point the `/finance`
   CTA directly at the Base44 URL, or keep the internal
   `/finance/referral` form and link Base44 from there.

---

## 3. Blocked in this run — attachments + URL extraction

The agent could not access the Gmail thread via the browser extension
(no host permission for `mail.google.com`) and the Gmail MCP tool was
not connected. Consequently:

- The three PDFs are NOT yet committed to `public/finance/`.
- The Base44 landing URL could not be extracted from
  `recoverycapital-base44.pdf`.
- Equipped's ACL / ACR / AFCA / ABN could not be extracted from
  `Credit Guide - Version 17 202307.pdf`. The page currently shows
  "SME Consulting Group Pty Ltd (ABN 53 662 478 408)" — that ABN was
  already in `EquippedConsentForm.tsx`. Licence numbers read "see
  Credit Guide" until the PDF lands.

### Recommended follow-up

1. Phill downloads the three PDFs from Gmail manually and commits
   them under `public/finance/` using the filenames listed in
   `public/finance/README.md`.
2. Phill (or a follow-up agent run with a working PDF extractor) pulls
   the ACL / ACR / AFCA / ABN from the Credit Guide and the Base44
   URL from the RecoveryCapital PDF.
3. Follow-up PR wires the Base44 URL into `/finance`'s primary CTA
   and fills the licensing numbers.

---

## 4. Compliance guard-rail check

Reviewed the new copy against `.claude/rules/compliance.md` §1 banned
phrases. None present. Specifically:

- No rate or repayment quote.
- No use of "approved", "guaranteed", "insurance approved",
  "guaranteed approval".
- Disaster Recovery positioning is consistently "referrer under
  reg 25", not "lender", "broker" or "credit adviser".
- Reg 25 and AFCA references are factual and link to Equipped's own
  documents for detail.

Any further copy changes must be checked against the same rule file.

---

## 5. Related tickets / PRs

- PR #77 — original Blue Fire → Equipped partner switch.
- PR #120 — Reg 25 referral flow + consent form scaffold (DR-688 /
  DR-689).
- `docs/adr/` — no new ADR in this change. If counsel's Legal review
  forces a consent-version bump or a change of licensing surface, that
  would warrant one.
