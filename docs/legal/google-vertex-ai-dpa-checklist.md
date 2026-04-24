# Google Vertex AI — Data Processing Agreement Checklist

**Status:** PENDING CEO/LEGAL SIGN-OFF
**Deadline:** 15 April 2026 (before Gemma 4 Phase 2 / DR-430 goes live)
**Responsible:** CEO + Legal
**Reference:** [Google Cloud Data Processing Addendum](https://cloud.google.com/terms/data-processing-addendum)

---

## Why This DPA Is Required

Phase 2 of the Gemma 4 multilingual translation feature (DR-430) routes UI strings through
Google Vertex AI (`gemma-3-27b-it`). Under the Australian Privacy Act 1988 and APP 8
(cross-border disclosure), a signed DPA with Google is required before any personal data —
even minimised — is processed by a Google Cloud service outside Australia.

Phase 1 (`gemini-1.5-flash` via Google Generative AI API) is live and operates under the
existing Google API Terms of Service. Phase 2 requires the full Vertex AI DPA.

---

## DPA Checklist

### 1. Parties and Scope

- [ ] Confirm contracting entity is "Disaster Recovery Pty Ltd" (or correct legal name)
- [ ] Confirm scope covers Vertex AI (not just Google Cloud in general)
- [ ] Confirm the DPA covers server-side inference requests (not just data storage)

### 2. Data Processing Details

- [ ] Document the categories of personal data that _could_ reach Vertex AI
  - Note: `minimisePII()` layer strips names, emails, phone numbers before translation
  - Residual risk: free-text fields (disaster description, address fragments) may remain
- [ ] Document the purpose: UI string translation for CALD community accessibility
- [ ] Specify data retention: Google's default model inference retention policy (confirm ≤ 30 days or zero retention)
- [ ] Confirm no training data use: Vertex AI enterprise terms prohibit use of customer data for model training — verify this clause is present

### 3. Sub-processors

- [ ] Obtain Google's current sub-processor list for Vertex AI
- [ ] Confirm all sub-processors are in jurisdictions acceptable under APP 8
- [ ] Document notification mechanism for sub-processor changes

### 4. Security Measures

- [ ] Confirm Google's ISO 27001 / SOC 2 Type II certifications are current
- [ ] Confirm data is encrypted in transit (TLS 1.2+) and at rest (AES-256)
- [ ] Confirm our API calls use a dedicated service account with least-privilege IAM

### 5. Data Subject Rights

- [ ] Confirm mechanism for honouring erasure requests (minimal — inference data not stored by us)
- [ ] Confirm Google's obligations for data subject requests passed through from DRA

### 6. Cross-Border Transfer Mechanism

- [ ] Confirm Standard Contractual Clauses (SCCs) or equivalent are included for AU→US transfer
- [ ] Note: Google Cloud has an australia-southeast1 region — consider requesting region lock

### 7. Breach Notification

- [ ] Confirm Google's obligation to notify DRA within 72 hours of a data breach
- [ ] Confirm DRA's internal escalation path from Google notification → CEO → OAIC

### 8. Termination and Return of Data

- [ ] Confirm data deletion timeline on contract termination
- [ ] Confirm no copies retained by Google after deletion

---

## Sign-Off Process

1. Legal reviews the Google Cloud DPA at https://cloud.google.com/terms/data-processing-addendum
2. Legal confirms the above checklist items are covered (or flags gaps to Google account team)
3. CEO reviews and signs
4. Signed DPA stored in: `docs/legal/signed/` (to be created on completion)
5. Update Linear issue DR-383 to Done

---

## Post-Signing Action (Engineering)

After the DPA is signed, update the `TRANSLATION_MODEL` environment variable in Vercel:

```
TRANSLATION_MODEL=gemma-3-27b-it
```

Set for: Production, Preview, Development

This activates Phase 2 of the multilingual translation feature (ADR-001).

See also: `docs/adr/ADR-001-gemma4-multilingual.md`
