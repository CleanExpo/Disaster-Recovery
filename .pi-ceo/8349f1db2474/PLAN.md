# Implementation Plan

**Session:** 8349f1db2474  
**Confidence:** 42%

**Risk notes:** Brief specifies 'FIX — Feature Build' but does not name the specific feature or broken behaviour. Plan assumes the core domain is incident reporting + recovery-plan management, inferred from the repo name 'Disaster-Recovery' and the Next.js/Prisma stack. Actual feature scope may differ significantly — file paths are best-guess estimates pending inspection of existing app/ and lib/ directories. Authentication strategy (NextAuth, Clerk, custom) is unknown; auth guard in API routes is stubbed. Test framework listed as 'unknown'; Playwright is detected via config files so e2e tests are included, but unit/integration test runner (Jest, Vitest) is unconfirmed. Confidence is low (0.42) due to underspecified brief.

## Unit 1: Prisma schema — add/fix disaster recovery domain models
**Files:** `prisma/schema.prisma`, `prisma/migrations`

## Unit 2: Server-side data layer — repository / service functions for incidents and recovery plans
**Files:** `lib/services/incidents.ts`, `lib/services/recoveryPlans.ts`, `lib/db.ts`
**Test scenarios:**
  - happy path: createIncident stores record and returns typed object
  - edge case: createIncident with missing required fields throws validation error
  - happy path: listRecoveryPlans returns paginated results filtered by status
  - edge case: getIncidentById with unknown id returns null without throwing

## Unit 3: API routes — REST/Next.js route handlers for incidents CRUD and plan association
**Files:** `app/api/incidents/route.ts`, `app/api/incidents/[id]/route.ts`, `app/api/recovery-plans/route.ts`
**Test scenarios:**
  - happy path: POST /api/incidents with valid body returns 201 and persisted entity
  - edge case: POST /api/incidents with invalid body returns 400 with structured error
  - happy path: GET /api/incidents returns 200 with array payload
  - edge case: unauthenticated request returns 401

## Unit 4: UI components — IncidentCard, RecoveryPlanForm, StatusBadge
**Files:** `components/incidents/IncidentCard.tsx`, `components/incidents/StatusBadge.tsx`, `components/recovery/RecoveryPlanForm.tsx`
**Test scenarios:**
  - happy path: IncidentCard renders title, severity and status correctly
  - edge case: IncidentCard with undefined severity falls back to 'unknown' label
  - happy path: RecoveryPlanForm submit calls onSubmit with serialised form values
  - edge case: RecoveryPlanForm blocks submit when required fields are empty

## Unit 5: Feature pages — incidents list page and incident detail/recovery page
**Files:** `app/(dashboard)/incidents/page.tsx`, `app/(dashboard)/incidents/[id]/page.tsx`, `app/(dashboard)/incidents/[id]/recovery/page.tsx`
**Test scenarios:**
  - happy path: incidents list page fetches and renders incident rows
  - edge case: empty incidents list renders empty-state UI, not blank screen
  - happy path: incident detail page renders linked recovery plans
  - edge case: navigating to unknown incident id shows 404 boundary

## Unit 6: Playwright smoke tests — end-to-end critical paths
**Files:** `playwright.smoke.config.ts`, `src/tests/e2e/incidents.spec.ts`, `src/tests/e2e/recovery-plan.spec.ts`
**Test scenarios:**
  - happy path: user can create an incident and see it in the list
  - happy path: user can attach a recovery plan to an incident and mark it resolved
  - edge case: form submission with invalid data shows inline errors without navigation
