# Onboarding SPM Walkthrough — DR Platform
**Date:** 8 April 2026
**Prepared for:** DR-357
**Scope:** Client claim intake flow and contractor onboarding curriculum — code-level research and gap analysis

---

## 1. Executive Summary

The Disaster Recovery platform has two distinct onboarding journeys: the **client claim intake flow** (landing to claim submission to contractor assignment) and the **contractor onboarding flow** (application to vetting to activation and training). Both flows have meaningful implementation in the codebase, but both also carry significant gaps between what is built and what a production-ready, conversion-optimised, and operationally reliable system requires.

The client flow is functional end-to-end but has UX friction in its multi-step form design, lacks email confirmation and real-time status communication, and has no document upload in the primary claim form. The contractor flow has a well-designed 14-day curriculum data model and a detailed application form, but the post-application activation journey, the dashboard tabs, and the vetting pipeline are largely stubs. The data model (Prisma schema) does not have a dedicated Claim model — claims are stored as `Lead` records linked to `Partner` records, which limits auditability and status tracking.

---

## 2. Client Onboarding Flow

### 2.1 Entry Points and Routes

The client enters through one of two routes:

| Route | Component | Purpose |
|---|---|---|
| `/claim/start` | `ClaimStartClient.tsx` | Legacy/demo entry — single-page form, no API call, simulates submission via `alert()` |
| `/claim` | `ClaimFormClient.tsx` | Primary production form — 4-step multi-step wizard, POSTs to `/api/claims/submit` |

There is also a deep-link path from the **cost estimator tool**, which passes URL parameters (`estimateLow`, `estimateHigh`, `damageType`, `urgency`, `propertyType`) that pre-fill the claim form. This is implemented in `ClaimFormClient.tsx` via dual `useEffect` hooks that read both `useSearchParams` and `window.location.search` to handle both server-side navigation and client-side navigation. The mechanism works but is fragile — a race condition exists between the two hooks.

### 2.2 Step-by-Step Client Journey

**Step 1 — Property and Damage Information**

Required fields: full name, phone, email, property address, suburb, state, postcode, property type, damage type(s) (multi-select checkboxes), damage date, urgency level, damage description. Optional: access instructions, hazards (multi-select checkboxes).

The `step1Complete` guard checks all required fields before enabling the "Next Step" button. Damage types include: Water/Flood Damage, Fire/Smoke Damage, Storm/Wind Damage, Mould Growth, Sewage Overflow, Structural Damage, Asbestos Exposure, Biohazard Contamination. The damage type list in `/claim/start` is shorter (Water, Fire, Storm, Mould, Flood, Other) and inconsistent with the primary form.

**Step 2 — Insurance and Documentation**

Insurance section is conditionally rendered behind a checkbox (`hasInsurance`). If insured: insurance company, policy number, claim number, excess amount, assessor details. Documentation section is a single checkbox ("I have photos/videos") with an informational note that the contractor will collect them directly — no upload is implemented.

**Step 3 — Authorisations and Terms**

Three work authorisation checkboxes: property access, insurance liaison, work commencement. Four understanding/agreement checkboxes: platform role, contractor communication, terms of service, and the APP 5 Privacy Collection Notice. All four must be checked to proceed.

**Step 4 — Final Review and Submit**

Summary view of submitted data + a submit button. On success, the API returns a `claimId` and the form advances to Step 5 (success state). The success screen shows the claim ID, a "What Happens Next" list (contractor calls within 60 minutes), and a "Track Your Claim" button linking to `/track/${claimId}`.

**Post-submission** — the client is directed to `/track/${claimId}`. The platform's post-submission communication is entirely dependent on the contractor calling within 60 minutes. There is no automated email confirmation, no SMS acknowledgement, and no real-time status page confirmed to be functional.

### 2.3 Data Model — Claim Records

The Prisma schema does not include a dedicated `Claim` model. Submitted claims are stored as `Lead` records:

```
model Lead {
  status    String  @default("NEW") // NEW, ASSIGNED, ACCEPTED, REJECTED, COMPLETED
  partnerId String?
  partner   Partner? @relation(...)
  assignedAt  DateTime?
  acceptedAt  DateTime?
}
```

The `Lead` → `Partner` relationship handles assignment. There is no `statusHistory` table, no `ClaimEvent` model, and no fields for contractor notes, work completion dates, or client satisfaction scores. The `damageType` field is a JSON array stored as a string, which is not queryable in SQL. The `Partner` model (which maps to the contractor entity) uses a `status` field with values `PENDING | ACTIVE | SUSPENDED` — there is no `IN_ONBOARDING` or `TRAINING` status.

### 2.4 Friction Points Identified in Code

1. **Dual form implementations with divergent behaviour.** `/claim/start` (demo mode) submits via `alert()` and has no API call. `/claim` (production) has a real API call. Both routes are publicly accessible and there is no redirect from one to the other. Clients landing on `/claim/start` cannot actually submit a claim.

2. **Multi-step form state is not persisted.** If a user navigates away from `/claim` mid-form, all state is lost. There is no `localStorage` save, no draft claim mechanism, and no session recovery. For emergency claimants filling out a long form on mobile under stress, abandonment is likely.

3. **No inline field validation on Step 1.** The "Next Step" button is disabled until all required fields are complete, but there is no field-level error messaging. If the button is disabled, the user does not know which field is missing.

4. **Damage date field has no future-date guard.** The input is `type="date"` with no `max` attribute. A user can enter a future date, which would be invalid for a claim.

5. **Inconsistent damage type taxonomy between `/claim` and `/claim/start`.** The primary form lists 8 damage types; the start form lists 6 with different naming. Any downstream routing or contractor matching that relies on damage type strings will not work correctly if leads come from different entry points.

6. **Step 2 documentation is a checkbox, not an upload.** The form collects a `hasPhotos: boolean` flag and directs the client to provide photos to the contractor later. No file upload is present in the primary claim form (despite a well-implemented upload in `/claim/start`). This is an inconsistency between the two forms.

7. **Payment/fee presentation.** The $2,750 emergency make-safe fee is displayed prominently before Step 1 begins. However, no Stripe payment is triggered at submission — the form submits with `paymentConfirmed: false` and `paymentAmount: 0`. The payment flow is incomplete.

8. **Step progress indicator does not label steps.** The progress indicator shows numbered circles (1, 2, 3, 4) with no labels. On mobile, users cannot understand what step they are on without reading the card heading.

### 2.5 Missing Elements

| Missing Element | Impact |
|---|---|
| Automated email confirmation on submission | Clients have no record of their claim ID or what to expect |
| SMS acknowledgement for emergency claims | High urgency clients may not be monitoring email |
| Functional `/track/${claimId}` page | Success screen directs clients to a tracking page with unknown build status |
| File/photo upload in primary claim form | Clients cannot attach damage evidence at submission |
| Draft save / form abandonment recovery | Incomplete submissions are lost entirely |
| Claim status updates (assigned, contacted, in-progress) | Clients have no visibility after submission |
| Future-date validation on damage date field | Data quality issue |
| Stripe payment integration | Fee is presented but not collected |

---

## 3. Contractor Onboarding Flow

### 3.1 Entry Points and Routes

| Route | Component | Purpose |
|---|---|---|
| `/contractor` | `app/contractor/page.tsx` | Landing page — sign in or apply |
| `/contractor/apply` | `ApplyClient.tsx` | 7-step application wizard |
| `/contractor/onboarding` | `app/contractor/onboarding/page.tsx` | 14-day curriculum dashboard |
| `/contractor/onboarding/day/[day]` | Dynamic route | Individual day content |
| `/contractor-portal` | `app/contractor-portal/page.tsx` | Active contractor dashboard |

### 3.2 Step-by-Step Contractor Journey

**Stage 1 — Application (7 steps)**

The application form (`ApplyClient.tsx`) is broken into 7 steps using imported step components:

| Step | Component | Content |
|---|---|---|
| 1 | `Step1BusinessInfo` | Business name, ABN, contact details |
| 2 | `Step2InsuranceLicensing` | Public liability, professional indemnity, workers comp, licences |
| 3 | `Step3ExperienceReferences` | Work history, major projects (min 3), references (min 2) |
| 4 | `Step4EquipmentResources` | Equipment inventory, team capacity |
| 5 | `Step5HealthSafety` | WHS compliance, SWMS, safety certifications |
| 6 | `Step6BankingPayment` | BSB, account number, payment terms |
| 7 | `Step7ReviewSubmit` | Final review and submission |

ABN validation is implemented via `validateABN()` from `@/lib/utils/australian-compliance`. A demo quick-fill function (`getResidentialPresetData()`) pre-populates all 7 steps with consistent test data including padded references and projects to meet minimum field counts.

**Stage 2 — Payment Gate**

After the application is submitted, the contractor reaches `/contractor/onboarding`. The first screen is a payment gate requiring two fees: Application Fee ($275 inc. GST) and Joining Fee ($2,200 inc. GST), totalling $2,475. Subscription pricing is shown: Month 1 free, Month 2 at $198 (60% off), Month 3 at $247.50 (50% off), then $495/month from Month 4.

The "Proceed to Secure Payment" button currently **simulates payment by setting `applicationStatus: 'in_progress'` in `localStorage`**. There is no Stripe integration in the payment gate. The `onboardingState` is stored entirely in `localStorage` — there is no server-side persistence of progress.

**Stage 3 — 14-Day Curriculum**

The onboarding dashboard renders the 14-day curriculum from `ONBOARDING_PROGRAM` (imported from `src/lib/onboarding/14-day-program.ts`). Each module has a status (`locked | available | in_progress | completed`). The "Start" button for each available day routes to `/contractor/onboarding/day/${day}`.

**Stage 4 — Active Portal**

On completion, contractors access the portal at `/contractor-portal`. The portal has 6 tabs: Dashboard, Job Board, Earnings, Training, Vision Board, Resources. The Dashboard tab is implemented with live-looking demo data (hardcoded). The Job Board, Earnings, Training, and Resources tabs show only placeholder text — `{/* Add detailed job board here */}` etc.

### 3.3 The 14-Day Training Curriculum Structure

The curriculum is defined in `src/lib/onboarding/curriculum-index.ts` (`MASTER_CURRICULUM`) and `src/lib/onboarding/14-day-program.ts` (`ONBOARDING_PROGRAM`). The two data structures are separate: the index provides high-level metadata per day; the program provides detailed module content per day.

| Day | Title | Duration | Modules | Assessment Qs | Practical Exercises |
|---|---|---|---|---|---|
| 1 | Foundation and Industry Overview | 8 hrs | 4 | 15 | 8 |
| 2 | Water Damage Restoration Mastery | 8 hrs | 4 | 15 | 10 |
| 3 | Mould Remediation Excellence | 8 hrs | 4 | 12 | 8 |
| 4 | Fire and Smoke Damage Restoration | 8 hrs | 4 | 12 | 9 |
| 5 | Biohazard and Trauma Scene Cleanup | 6 hrs | 3 | 10 | 6 |
| 6 | Advanced Structural Drying | 6 hrs | 3 | 10 | 7 |
| 7 | Contents Processing and Pack-Out | 6 hrs | 3 | 10 | 8 |
| 8 | Documentation and Technology Systems | 8 hrs | 4 | 12 | 10 |
| 9 | Customer Service and Communication | 6 hrs | 3 | 10 | 8 |
| 10 | Business Operations and Management | 6 hrs | 3 | 10 | 7 |
| 11 | Marketing and Business Development | 6 hrs | 3 | 10 | 8 |
| 12 | Advanced Restoration Techniques | 8 hrs | 4 | 12 | 9 |
| 13 | Specialty Services and Niche Markets | 6 hrs | 3 | 10 | 6 |
| 14 | Final Assessment and Certification | 8 hrs | 4 | 50 | 12 |

**Total:** 98 hours, 178 assessment questions, 116 practical exercises.

**Certification requirements:** 90% attendance, 80% minimum on all assessments, 5 practical demonstrations, 100-question final exam (80% pass mark). Certification validity: 2 years with 40 hours of continuing education annually required.

**Delivery modes:** Online self-paced (14–21 days), hybrid online + weekend practical (4 weeks), or intensive 2-week bootcamp.

**Day 1 content example (from 14-day-program.ts):** 3 mandatory videos (Welcome 45 min, ACL Essentials 90 min, Vulnerable Consumers 60 min), 2 readings from government sources, 2 assignments (ACL compliance self-audit upload and consumer rights quiz), 1 required document upload. Completion requires 95% video watch time, all assignments, and a minimum quiz score of 80%.

### 3.4 Gap Analysis — Curriculum vs. Platform

| Curriculum Feature | Defined in Data | Built in Platform | Gap |
|---|---|---|---|
| Video content for each day | Yes — URLs defined as `/training/videos/...` | No — video player not built | Critical |
| Quiz/assessment engine | Yes — `quizScore` in completionCriteria | No — no quiz component found | Critical |
| Assignment submission and review | Yes — upload type defined | No — no upload handler in onboarding day view | Critical |
| Progress saved to server | No — localStorage only | No | Critical |
| Day-by-day content pages | Route `/contractor/onboarding/day/[day]` exists | Unknown — dynamic route exists but content not reviewed | High |
| Podcast/audio format | Yes — in delivery methods | No implementation found | Medium |
| Certificate generation on completion | Yes — `certificateNumber` in state | No — no certificate generator found | High |
| Post-certification support portal | Defined in ONGOING_SUPPORT | No dedicated section in portal | High |
| Payment gateway for joining fee | UI exists | Simulated via localStorage — no Stripe | Critical |
| Contractor vetting review workflow | Not defined in code | No admin review interface found | Critical |
| Email notifications during onboarding | Referenced in support model | No email triggers found in onboarding flow | High |
| KPI tracking and performance dashboard | `/contractor/kpi-tracking` route exists | Hardcoded demo data only | Medium |

### 3.5 Missing Contractor Portal Features

| Missing Feature | Current State | Priority |
|---|---|---|
| Job board — accept/decline with real data | Stub with placeholder text | Critical |
| Earnings and payout management | Stub with placeholder text | Critical |
| Training tab — linked to curriculum | Stub — no link to onboarding content | High |
| Resources tab — documents, templates | Stub with placeholder text | High |
| Profile and certification management | No page found | High |
| Notification centre | `Notification` model exists in schema, no UI | Medium |
| Dispute and complaint mechanism | Not present | Medium |
| Territory management | Shown in portal header as hardcoded "Brisbane Metro" | Low |

---

## 4. Data Model Assessment

The Prisma schema was designed for a general-purpose agency/client/audit workflow (Agency, User, Client, Audit, Proposal, Invoice) and has been extended with Lead and Partner models for the restoration marketplace. Key observations:

- No dedicated `Claim` model. Incoming client claims are `Lead` records. This conflates lead generation with claim management — a lead is pre-service, a claim is an ongoing service relationship.
- No `ClaimEvent` or `StatusHistory` table. Lead status changes (`NEW → ASSIGNED → ACCEPTED`) are not time-stamped beyond the individual `assignedAt` / `acceptedAt` fields.
- `damageType` is stored as a JSON string, not a relational array. This prevents indexed queries like "all active water damage leads in NSW."
- No `ContractorOnboarding` model. The 14-day training progress is stored in `localStorage` only — it is lost if the contractor changes browsers or devices.
- No `ContractorDocument` model. Insurance certificates, licences, and assignment uploads required during the 7-step application have no defined storage model.
- `Partner.status` has three values (`PENDING | ACTIVE | SUSPENDED`) — there is no `IN_TRAINING` or `AWAITING_VETTING` status, meaning applications in the 14-day curriculum are indistinguishable from pending applications awaiting admin review.

---

## 5. Recommendations

### 5.1 Top 5 Improvements — Client Onboarding Flow

**1. Add email confirmation on claim submission.**
Immediately after the API returns a `claimId`, trigger a transactional email to the client containing: their claim ID, a summary of what they submitted, the "what happens next" messaging, and a link to their tracking page. This is the single highest-impact improvement — without it, clients have no record of their submission and no way to follow up if the contractor does not call.

**2. Implement form state persistence (draft claims).**
Save form state to `localStorage` on every field change and restore it on page load. Display a "Continue your draft" banner if a saved draft is detected. For emergency claimants interrupted mid-form, this dramatically reduces abandonment. A draft expiry of 24 hours is appropriate.

**3. Add inline field validation with error messages.**
Replace the disabled-button approach with field-level validation that shows specific error messages (e.g., "Please enter a valid Australian phone number", "Postcode must be 4 digits"). This is particularly important for the email and postcode fields which have format requirements.

**4. Remove or redirect `/claim/start` to `/claim`.**
The `/claim/start` route submits via `alert()` and has no API integration. Any client landing on this route cannot actually lodge a claim. Either connect it to the same API endpoint as `/claim` or add a canonical redirect to `/claim`. Having two routes with divergent behaviour creates a trust risk — a client who submits via the demo form will never receive a response.

**5. Add real-time SMS notification for emergency claims.**
When `urgencyLevel === 'emergency'`, send an SMS to the submitted phone number immediately on claim receipt, acknowledging the claim and confirming a contractor will call within 60 minutes. This manages expectations for the highest-stakes clients and reduces inbound support load.

### 5.2 Top 5 Improvements — Contractor Onboarding Flow

**1. Implement Stripe payment integration for the joining fee.**
The payment gate UI exists and the fee structure is defined ($2,475 joining), but the "Proceed to Secure Payment" button simulates payment via `localStorage`. No contractor money is being collected. This is a revenue-critical gap. Use the existing `stripe.ts` in `src/lib/` to create a Checkout Session, and update the `Partner.status` to a server-confirmed `ACTIVE` or `IN_TRAINING` state on payment success webhook.

**2. Persist onboarding progress to the database.**
Training progress is currently held in `localStorage`. A contractor who clears their browser, uses a different device, or is assigned a new `contractorId` loses all progress. Add a `ContractorOnboarding` model to the Prisma schema (fields: `partnerId`, `currentDay`, `completedDays` as JSON, `paymentStatus`, `startedAt`, `completedAt`) and sync progress on every day completion.

**3. Build the quiz and assessment engine.**
The curriculum defines quiz score thresholds (80% minimum) and question counts (10–50 per day) but no quiz component exists. Build a reusable `<QuizEngine>` component that: loads questions from the curriculum data, enforces attempt limits (2–3 per assessment), records scores, and blocks progression until the minimum score is met. This is the core enforcement mechanism for the 14-day gate.

**4. Build the job board tab with real lead data.**
The contractor portal Job Board tab is a stub (`{/* Add detailed job board here */}`). This is the primary value proposition for active contractors. Implement a real-time job board that fetches `Lead` records filtered by the contractor's `serviceAreas` and `specializations`, with Accept / Pass / Request Info actions. This is the feature that makes the network operationally functional.

**5. Add an admin vetting workflow for applications.**
There is no admin interface to review, approve, or reject contractor applications. Applications move from `PENDING` to `in_progress` (via payment) without any human review. Build a minimal admin route at `/admin/contractors` that lists pending applications with their uploaded documents, and provides approve/reject/request-more-info actions. Without this, the platform cannot enforce the vetting standards that differentiate NRPG from unvetted directories.

---

## 6. Appendix — Files Reviewed

| File | Purpose |
|---|---|
| `app/claim/ClaimFormClient.tsx` | Primary 4-step client claim form |
| `app/claim/page.tsx` | Server component wrapper for /claim |
| `app/claim/start/ClaimStartClient.tsx` | Legacy demo entry point |
| `app/claim/start/page.tsx` | Server wrapper for /claim/start |
| `app/claim/PrivacyCollectionNotice.tsx` | APP 5 privacy disclosure component |
| `app/contractor/page.tsx` | Contractor portal landing |
| `app/contractor/apply/ApplyClient.tsx` | 7-step contractor application wizard |
| `app/contractor/onboarding/page.tsx` | 14-day curriculum dashboard |
| `app/contractor-portal/page.tsx` | Active contractor dashboard (tabbed) |
| `src/lib/onboarding/curriculum-index.ts` | MASTER_CURRICULUM — day-by-day metadata, certification requirements |
| `src/lib/onboarding/14-day-program.ts` | ONBOARDING_PROGRAM — detailed daily content and completion criteria |
| `prisma/schema.prisma` | Database schema — Lead, Partner, User, Claim models |

---

*Report prepared by Claude Code for DR-357 — Onboarding SPM Walkthrough 2026-04-08*
