# AML/CTF Tranche 2 + Privacy Act — Written Scope

**Issue:** DR-536 / GAP-065 / P0-H
**Prepared:** 2026-04-12
**Status:** For legal review and sign-off before implementation
**Hard deadline:** 15 April 2026
**Prepared by:** Legal & Compliance persona — Claude Code

> **Important caveat:** This document is a compliance scope assessment prepared for internal planning purposes. It is not a substitute for qualified legal advice. The applicability opinion in Section 1 must be reviewed by NRPG's appointed solicitor before being relied upon.

---

## 1. Applicability Opinion — Is NRPG a Tranche 2 Reporting Entity?

### 1.1 Regulatory background

The *Anti-Money Laundering and Counter-Terrorism Financing Amendment Act 2024* (Cth) extends Australia's AML/CTF regime to "Tranche 2" entities. Phase 1 of Tranche 2 commenced **31 March 2026**. Full reporting-entity obligations apply from **1 July 2026**.

Tranche 2 designated services include:
- Real estate settlement services (solicitors, conveyancers, real estate agents settling property transactions)
- Professional services involving creation or management of legal arrangements (trusts, companies)
- High-value dealers (goods ≥ $10,000 in cash)
- Certain professional services where the firm holds or manages client funds

### 1.2 NRPG's business activities

NRPG (National Restoration Professionals Group) provides **insurance claim advocacy** services to policyholders following natural disaster events. Specifically:
- NRPG reviews policy wording and assesses coverage
- NRPG prepares and lodges dispute submissions to AFCA on behalf of policyholders
- NRPG does **not** handle, hold, or transit client funds — all insurance settlements are paid directly by the insurer to the policyholder
- NRPG does **not** facilitate property settlements or conveyancing
- NRPG does **not** manage trusts or company structures

### 1.3 Applicability conclusion

**Preliminary assessment: NRPG is likely NOT a Tranche 2 reporting entity from 1 July 2026** on the basis that:

1. NRPG does not provide a "designated service" as defined in the draft *AML/CTF Rules* accompanying Tranche 2. Insurance advocacy is not listed as a designated service.
2. NRPG does not hold or transit client funds. The non-funds-handling exclusion is significant — AUSTRAC guidance confirms that advisory-only professional services firms that do not manage client assets are generally outside scope.
3. NRPG's client intake collects personal information (name, contact details, property address, insurance claim number) but does not involve financial transactions subject to AML/CTF obligations.

**Required action before 1 July 2026:**
- Obtain written legal advice from NRPG's appointed solicitor confirming the non-reporting-entity position
- If the solicitor identifies any category of NRPG's services that may constitute a designated service (e.g. future fee structures involving holding client settlement funds), implement a Customer Due Diligence (CDD) procedure for those services specifically

**If NRPG is ultimately determined to be a reporting entity:**
- Enrol with AUSTRAC by 1 July 2026
- Implement an AML/CTF Program (written, risk-based)
- Appoint an AML/CTF Compliance Officer
- File Suspicious Matter Reports (SMR) and Threshold Transaction Reports (TTR) as required

---

## 2. ID Retention Audit — Intake Form Review

### 2.1 Obligation (live since 31 March 2026)

From 31 March 2026, businesses subject to AML/CTF obligations must NOT retain full copies of customer identity documents (passports, driver's licences, birth certificates) for AML/CTF record-keeping purposes. Only extracted data points (name, date of birth, document number) may be retained.

### 2.2 DR website intake form audit

**Audited forms:**
- `/claim` — primary claim intake form (`app/claim/page.tsx`)
- `/claim/start` — intake start page

**Fields collected by the intake form:**
| Field | Category | Retains ID copy? |
|-------|----------|-----------------|
| fullName | Contact info | No |
| phone | Contact info | No |
| email | Contact info | No |
| preferredContact | Preference | No |
| propertyAddress, suburb, state, postcode | Property | No |
| propertyType | Property | No |
| damageTypes, damageDescription | Claim | No |
| damageDate, urgencyLevel | Claim | No |
| hazards, affectedAreas | Claim | No |
| hasInsurance, insuranceCompany | Insurance | No |
| policyNumber, insuranceClaimNumber | Insurance | No |
| excessAmount, assessorDetails | Insurance | No |
| hasPhotos, uploadedDocuments | Documentation | No — photo uploads of damage, not ID |
| authorizePropertyAccess | Authorisation | No |
| authorizeInsuranceLiaison | Authorisation | No |
| authorizeWorkCommencement | Authorisation | No |

**Audit result: COMPLIANT**

The intake form does NOT collect, store, or request copies of identity documents (passports, driver's licences, Medicare cards, or other government-issued ID). The `uploadedDocuments` field accepts damage photos only, not identity documents.

**Ongoing compliance obligation:**
- Any future feature that adds ID document upload to the intake form must undergo legal review before implementation
- The `/api/claims/submit` endpoint should be confirmed to not accept or store base64-encoded ID document images (code review recommended when that API endpoint is fully implemented)

---

## 3. APP 3 Collection Notice — Final Wording

### 3.1 Purpose

APP 3 of the Privacy Act 1988 (Cth) requires organisations to notify individuals of the purposes for which personal information is collected at or before the time of collection.

### 3.2 Final approved wording for intake CTAs

**Standard inline notice** (use on all intake CTAs, event pages, and contact forms):

> Privacy notice (APP 3): NRPG collects your name, contact details, and claim information to provide insurance advocacy services. Information is handled in accordance with the Privacy Act 1988. [Privacy Policy](/privacy)

**Extended notice** (use on the primary `/claim` intake form header, step 1):

> **Privacy Collection Notice (APP 3)**
> National Restoration Professionals Group (NRPG) collects your personal information including name, contact details, property address, and insurance claim information for the purpose of providing independent insurance advocacy and claim dispute services. Your information may be shared with our assessment team, AFCA (if a formal dispute is lodged), and your insurer as required to advocate for your claim. We do not sell your information to third parties. You may request access to or correction of your information at any time. Full details are in our [Privacy Policy](/privacy).

**Event page footer notice** (below sticky mobile CTA and footer CTA buttons):

> Privacy notice (APP 3): NRPG collects your name, contact details, and claim information to provide insurance advocacy services. Information is handled in accordance with the Privacy Act 1988. [Privacy Policy](/privacy)

### 3.3 Implementation status

| Location | Status |
|----------|--------|
| `/events/cyclone-alfred-fnq-2026` | ✅ Implemented (PR #38) |
| `/events/nsw-storms-april-2026` | ✅ Implemented (PR #38) |
| `/claim` intake CTA | ✅ Implemented (PR #35 + PR #38) |
| All other event pages (Maila, etc.) | ✅ Implemented (PR #35) |
| Homepage intake CTA | ⚠️ Review required |
| `/contact` form | ⚠️ Review required |

---

## 4. Privacy Policy Update Recommendations

### 4.1 Current privacy policy deficiencies

The current `app/privacy/page.tsx` has the following gaps relative to AML/CTF Tranche 2 and APP obligations:

| Gap | Priority |
|-----|----------|
| No explicit APP 3 collection notice section | High |
| No mention of insurance advocacy as primary purpose | High |
| Relies on generic "Australian privacy laws" without citing Privacy Act 1988 | Medium |
| Section 4 ("Lead Distribution for Partners") describes lead-gen platform, not advocacy services — outdated | High |
| No AML/CTF identity document non-retention statement | Medium |
| No AFCA disclosure (NRPG shares info with AFCA when lodging disputes) | Medium |
| Small-business exemption language may be relied upon implicitly — must be removed | High |
| No mention of OAIC as complaint body | Medium |

### 4.2 Recommended privacy policy changes

**Section 1 — Information We Collect:** Add APP 3 notice and confirm no ID documents are collected. Add explicit statement: "We do not collect copies of identity documents (passports, driver's licences) as part of our standard intake process."

**Section 2 — How We Use Your Information:** Replace generic list with advocacy-specific purposes: (1) assessing your insurance claim; (2) preparing dispute submissions to AFCA; (3) liaising with your insurer on your behalf; (4) complying with regulatory reporting requirements.

**Section 4 — Lead Distribution:** This section is inconsistent with NRPG's advocacy positioning. Recommend replacing with: "Authorised Disclosures — we may share your information with: AFCA (when lodging a formal dispute), your nominated insurer (for claim advocacy), licensed building assessors (for independent damage reports), and legal representatives (if your dispute requires legal escalation)."

**New section — AML/CTF Statement:** "NRPG has assessed its obligations under the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 and the 2024 Tranche 2 amendments. NRPG does not retain copies of identity documents. [If NRPG is a reporting entity: NRPG complies with applicable Customer Due Diligence requirements.] [If non-reporting: NRPG is not a reporting entity under the AML/CTF Act.]"

**Section 6 — Your Rights:** Add OAIC complaint pathway: "You may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au if you are unsatisfied with our response to a privacy concern."

**Remove:** Any implicit reliance on the small-business exemption from the Privacy Act (turnover < $3M). From 1 July 2026, this exemption does not apply to organisations handling personal information in connection with AML/CTF activities, and NRPG should not rely on it regardless.

### 4.3 Privacy policy update timeline

| Action | Owner | Due date |
|--------|-------|----------|
| Legal review of this scope document | Solicitor | 14 Apr 2026 |
| Draft updated privacy policy | Claude Code | 14 Apr 2026 |
| Legal sign-off on updated privacy policy | Solicitor | 15 Apr 2026 |
| Deploy updated privacy policy to production | Toby | 15 Apr 2026 |
| Confirm APP 3 notices on all intake CTAs | Toby | 15 Apr 2026 |
| Obtain legal advice on reporting-entity status | Solicitor | 30 Jun 2026 |
| AML/CTF Program (if required) | Legal + NRPG | 1 Jul 2026 |

---

## 5. Summary of Immediate Actions

| Action | Priority | Due | Owner |
|--------|----------|-----|-------|
| Obtain legal advice on Tranche 2 reporting-entity status | P0 | 30 Jun 2026 | Phill / Solicitor |
| Legal review this scope document | P0 | 14 Apr 2026 | Solicitor |
| Update privacy policy (4.2 above) | P0 | 15 Apr 2026 | Claude Code + Solicitor |
| Confirm APP 3 on homepage + /contact | High | 15 Apr 2026 | Claude Code |
| Confirm `/api/claims/submit` does not store ID docs | High | 15 Apr 2026 | Code review |

---

*This document is a compliance scope assessment for internal planning. It is not legal advice. All decisions regarding AML/CTF obligations must be confirmed by a qualified Australian legal practitioner.*
