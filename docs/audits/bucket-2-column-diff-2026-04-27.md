# Bucket 2 Column-Diff Audit (DR-804 follow-up)

> Generated 2026-04-27 from live Supabase introspection of the
> `lccqasmurmsisnnjqqmr` project (109 public tables) compared against
> `prisma/schema.prisma` on `main` (65 models post-PR-#246).
>
> Companion to `docs/audits/phantom-prisma-models-2026-04-27.md` —
> verifies the Bucket 2 `@@map` candidates the original audit
> classified as HIGH confidence.

## TL;DR

**The audit's "HIGH confidence one-line `@@map` quick wins" are not safe
as one-liners.** Three of the four top candidates have meaningful
column-shape mismatches that would break Prisma `findUnique` /
`create` calls at runtime if mapped without further surgery:

| Prisma Model            | Live Table                | Verdict                                                                    |
| ----------------------- | ------------------------- | -------------------------------------------------------------------------- |
| `ContractorProfile`     | `contractor_profiles`     | **Already mapped** — columns match. No action.                             |
| `User`                  | `users`                   | **Column mismatch** — needs Prisma model rewrite + call-site sweep.        |
| `ContractorApplication` | `contractor_applications` | **Column mismatch** — Prisma has `data: Json`, live has structured fields. |
| `Job`                   | `jobs`                    | **Different concept** — not the same domain entity despite shared name.    |

**Implication:** every `prisma.user.*` and `prisma.contractorApplication.*`
call in `app/` and `src/` is **likely failing at runtime today** when
Prisma issues SQL referencing columns the live tables do not have
(`User.role` vs `users.userType`, `ContractorApplication.data` vs
absent column, etc.). This warrants a follow-up P0 ticket to
instrument these routes and confirm.

---

## 1. `User` ↔ `users`

**Prisma `User` (12 fields):** `id, email, password, name, role,
emailVerified, image, createdAt, updatedAt, agencyId` + relations
(`agency, clients, audits, proposals, notifications`).

**Live `users` (21 columns):** `id, email, name, password, userType,
googleId, avatar, australianPhoneNumber, australianPostcode,
australianState, suburb, streetAddress, isEmailVerified,
emailVerificationToken, emailVerificationTokenExpiry, isActive,
isBlocked, lastLoginAt, tenantId, createdAt, updatedAt`.

### Mismatches

| Prisma                          | Live                                                                                                                                                                                            | Severity                                                                                                                                |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `role: String @default("user")` | `userType: UserType` (enum, default `CLIENT`)                                                                                                                                                   | **P0** — name + type differ; Prisma write of `role: "user"` hits a column that does not exist.                                          |
| `emailVerified: DateTime?`      | `isEmailVerified: Boolean @default(false)`                                                                                                                                                      | **P0** — name + type differ.                                                                                                            |
| `image: String?`                | `avatar: String?`                                                                                                                                                                               | **P1** — name differs.                                                                                                                  |
| `agencyId: String?`             | _(absent)_                                                                                                                                                                                      | **P0** — Prisma writes a column that does not exist; live has no `Agency` relation.                                                     |
| _(absent)_                      | `googleId, australianPhoneNumber, australianPostcode, australianState, suburb, streetAddress, emailVerificationToken, emailVerificationTokenExpiry, isActive, isBlocked, lastLoginAt, tenantId` | **P2** — live has 12 fields Prisma cannot select. INSERT works (all have defaults / nullable) but the Prisma-driven UI never sees them. |

### Remediation sketch

1. Rewrite `User` model in `prisma/schema.prisma`:
   - Drop `role`, add `userType: UserType` enum.
   - Drop `emailVerified: DateTime?`, add `isEmailVerified: Boolean @default(false)`.
   - Rename `image` → `avatar`.
   - Drop `agencyId` + the `agency Agency? @relation(...)`.
   - Add `googleId, australianPhoneNumber, australianPostcode, australianState (enum), suburb, streetAddress, emailVerificationToken, emailVerificationTokenExpiry, isActive, isBlocked, lastLoginAt, tenantId`.
   - Add `@@map("users")`.
   - Define `UserType` and `AustralianState` Prisma enums matching the live `USER-DEFINED` enums.
2. Sweep call sites:
   - `prisma.user.<op>` everywhere `role` is read or written → `userType`.
   - `emailVerified` (DateTime semantics) → `isEmailVerified` (boolean) — every read.
   - `image` → `avatar`.
   - Any code that joins `User.agency` or sets `agencyId` → either remove (if unused) or migrate to a tenant-based pattern.
3. Drop the `Agency` model if `User.agencyId` was its only inbound relation. Verify against `Client.agencyId`, `Audit.agencyId`, etc. first.

**Estimated effort:** M-L (1-2 days). 30+ call sites likely.

---

## 2. `ContractorApplication` ↔ `contractor_applications`

**Prisma (10 fields):** `id, contractorId, businessName?, contactName?, email?, phone?, status, data: Json, createdAt, updatedAt`.

**Live (26 columns):** `id, businessName, contactName, email, phone, abn, certifications[], serviceAreas[], yearsInBusiness, status, reviewedBy?, reviewedAt?, rejectionReason?, notes?, source?, utmSource?, utmMedium?, utmCampaign?, utmContent?, utmTerm?, emailSent, contacted, contactedAt?, convertedContractor?, createdAt, updatedAt`.

### Mismatches

| Prisma                                        | Live                                                                                                                                                                                                                             | Severity                                                                                                           |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `data: Json @required`                        | _(absent)_                                                                                                                                                                                                                       | **P0** — every `prisma.contractorApplication.create({ data: { data: ... } })` writes a column that does not exist. |
| `contractorId: String?`                       | _(absent — closest is `convertedContractor: text`)_                                                                                                                                                                              | **P1** — relation cannot resolve.                                                                                  |
| `businessName?, contactName?, email?, phone?` | _(all NOT NULL on live)_                                                                                                                                                                                                         | **P0** — Prisma allows null but the live INSERT rejects.                                                           |
| _(absent)_                                    | `abn, certifications[], serviceAreas[], yearsInBusiness, reviewedBy, reviewedAt, rejectionReason, notes, source, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, emailSent, contacted, contactedAt, convertedContractor` | **P2** — 18 live fields Prisma cannot read or write.                                                               |

### Remediation sketch

1. Rewrite `ContractorApplication` to mirror the live shape exactly:
   - Drop `data: Json` and `contractorId`.
   - Promote `businessName, contactName, email, phone, abn, yearsInBusiness, status` to non-nullable.
   - Add `certifications: String[]`, `serviceAreas: String[]`, the full UTM block, `emailSent, contacted, contactedAt, reviewedBy, reviewedAt, rejectionReason, notes, source, convertedContractor`.
   - Add `@@map("contractor_applications")`.
2. Sweep call sites:
   - The 7-step onboarding flow currently stores its full payload in `data: Json`. After rewrite, each step's payload lives in dedicated columns. Migration: read the `data` JSON, project it into the new columns. May warrant a backfill SQL once a real `data` column ever existed; verify whether ANY rows in production have a non-null `data` (likely zero, since the column does not exist).
   - `app/contractor/apply/ApplyClient.tsx` and the Step components write into `data` today — re-route writes onto the new fields.

**Estimated effort:** M (1 day) for schema + sweep. Test plan: dispatch one full onboarding flow end-to-end against test contractor.

---

## 3. `Job` ↔ `jobs` — DIFFERENT DOMAIN ENTITIES

**Prisma `Job` (~25 fields):** field-service work order with inline customer contact (`customerName, customerPhone, customerEmail`), inline address (`address, suburb, state, postcode, coordinates`), inline insurance metadata (`insuranceClaim, insurerName, claimNumber, policyNumber`), and status transitions (`assignedAt, acceptedAt, startedAt, completedAt`).

**Live `jobs` (18 columns):** property-based work order pointing to `propertyId`, `clientId`, with `jobNumber, type, status, estimatedCost, actualCost, scheduledDate, completedDate, notes, insuranceClaimId, hoursWorked, materialsUsed, tenantId`.

### Verdict

**These are different domain concepts that share a name.** Mapping
Prisma `Job` to live `jobs` would mismatch on virtually every field
besides `id, contractorId, status, createdAt, updatedAt`.

The current Prisma `Job` is **genuinely phantom** (no backing live
table). All `prisma.job.*` calls in code fail at runtime today.

### Remediation sketch

This is **not** a Bucket 2 mapping problem; it is a Bucket 1
critical-table gap. Two paths:

- **Path X — adopt the live shape.** Delete Prisma `Job`. Build a new
  Prisma model `WorkOrder` (or rename `Job` → `WorkOrder` and rewrite
  fields) that maps to `jobs` with `propertyId, clientId,
estimatedCost, actualCost, scheduledDate`. Update all code that
  currently uses `Job` for the field-service flow to either:
  - migrate to `WorkOrder` (if business need is property-based work
    orders), or
  - keep its own data model under a different name (e.g. `FieldServiceJob`
    with a CREATE TABLE migration on prod).
- **Path Y — keep the field-service flow.** Build a CREATE TABLE
  migration for `field_service_jobs` matching the current Prisma `Job`
  fields. Map `Job → @@map("field_service_jobs")`.

**Recommended:** Path Y short-term (preserves current code paths),
then a separate refactor to clarify which entity wins.

**Estimated effort:** L (1 week). Touches the contractor matching
engine, voice agent draft-claim flow, and the dispatch routes.

---

## 4. `ContractorProfile` ↔ `contractor_profiles` — ALREADY MAPPED ✅

Verified. Schema already contains `@@map("contractor_profiles")` on
line 1247. Column shapes match. Only nuance: Prisma declares
`availability: String @default("AVAILABLE")` vs live
`availability: AvailabilityStatus enum`. Works at runtime as long as
the string values stay within the enum. Defer enum promotion to a
follow-up.

---

## 5. Other observations from the live introspection

The 109-table dump revealed several models the original audit may have
miscategorised:

| Audit said                                  | Reality                                                                                                                                    |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `Booking` has no persistent model           | Live `Booking` table exists (24 cols). Promote to Bucket 2 — `@@map("Booking")` candidate.                                                 |
| `Lead` is Bucket 1 critical                 | Live `lead_captures` (28 cols) exists. Bucket 2 candidate.                                                                                 |
| `Enquiry` is Bucket 1 critical              | No `Enquiry` table; `waitlist_submissions` (16 cols) and `opportunities` (21 cols) are nearest. Stay Bucket 1 — design new table or reuse. |
| `Partner` is Bucket 1 critical              | No `Partner` table found. Stay Bucket 1.                                                                                                   |
| `OnboardingProgress` is Bucket 2            | Live `contractor_onboarding` (12 cols) exists. Confirmed Bucket 2.                                                                         |
| `ModuleProgress` is Bucket 2                | Live `contractor_module_progress` (11 cols) exists. Confirmed Bucket 2.                                                                    |
| `ProofOfWork` is Bucket 1 critical          | No matching live table. Stay Bucket 1 — needs CREATE TABLE migration.                                                                      |
| `OnboardingPayment` is Bucket 1             | No matching live table. Stay Bucket 1.                                                                                                     |
| `JobOutcome` schema maps `job_outcome_logs` | Live `job_outcome_logs` (13 cols) exists. ✅ already correct.                                                                              |
| `Payment` exact match                       | Live `Payment` (25 cols) ✅ confirmed.                                                                                                     |
| `Rating` exact match                        | Live `Rating` (34 cols) ✅ confirmed.                                                                                                      |

---

## 6. Recommended sequencing

1. **P0 — instrument the suspect routes.** Add `captureException`
   wrappers around every `prisma.user.*` and
   `prisma.contractorApplication.*` call in `app/api/**/*.ts` and
   confirm whether they are throwing in production today. If yes, the
   routes are already broken — fixing them is urgent. If no (Prisma
   silently tolerates missing columns at SELECT time), the urgency
   drops to P1.
2. **P1 — User model rewrite.** Largest blast radius (auth + admin +
   most routes). Ship as a single dedicated PR with a full call-site
   sweep + smoke test of the login flow.
3. **P1 — ContractorApplication rewrite.** Smaller blast radius
   (onboarding flow only). Ship with a contractor-apply end-to-end
   smoke test.
4. **P2 — Job vs jobs decision.** Path X vs Path Y in §3. Needs
   product input.
5. **P3 — promote the new Bucket 2 candidates surfaced above**
   (`Booking`, `Lead → lead_captures`, `OnboardingProgress`,
   `ModuleProgress`) once the column shapes are diff'd.

---

## References

- `docs/audits/phantom-prisma-models-2026-04-27.md` — original 3-bucket
  classification (PR #241).
- `prisma/supabase-tables-introspection.md` — live introspection (will
  be refreshed alongside this audit).
- `prisma/schema.prisma` — current Prisma model declarations.
- Live Supabase project: `lccqasmurmsisnnjqqmr` (CleanExpo org —
  introspection done 2026-04-27 via SQL Editor).
