# Implementation Plan

**Session:** 835c84fd06d8  
**Confidence:** 32%

**Risk notes:** No specific failure description was provided in the brief. All units are based on the inferred stack (Next.js 14+, Prisma, TypeScript, Playwright) and common production failure modes (DB connectivity, env-var misconfiguration, schema drift, broken API routes). Actual root-cause file paths will differ once the real error is identified — units 2-5 list likely candidates only. Confidence is low because the failure symptom, affected route, and recent deploy delta are unknown. Plan should be treated as a diagnostic scaffold, not a definitive fix map. Executor should grep logs or error-monitoring output first, then narrow scope before touching code.

## Unit 1: Reproduce & triage: identify failure surface
**Files:** `instrumentation.ts`, `next.config.mjs`, `package.json`, `prisma/schema.prisma`
**Test scenarios:**
  - happy path: application boots without runtime errors
  - edge case: missing env vars cause graceful error, not silent crash
  - edge case: Prisma client initialises successfully against current schema

## Unit 2: Audit recent changes to app entry points and API routes
**Files:** `app/layout.tsx`, `app/page.tsx`, `app/api`
**Test scenarios:**
  - happy path: root layout renders without throwing
  - edge case: API route returns correct HTTP status on bad input
  - edge case: API route does not expose stack traces in production response

## Unit 3: Check Prisma migration state and DB connectivity
**Files:** `prisma/schema.prisma`, `prisma/migrations`, `lib/prisma.ts`
**Test scenarios:**
  - happy path: PrismaClient connects and resolves a simple query
  - edge case: unapplied migration does not cause silent data corruption
  - edge case: singleton PrismaClient does not leak connections under HMR

## Unit 4: Inspect configuration and environment variable wiring
**Files:** `config`, `next.config.mjs`, `.env.example`
**Test scenarios:**
  - happy path: all required env vars present at build time
  - edge case: undefined env var falls back to safe default, not undefined

## Unit 5: Apply minimal hotfix to confirmed root-cause file(s)
**Files:** `app/api`, `lib/prisma.ts`, `instrumentation.ts`
**Test scenarios:**
  - happy path: affected endpoint returns 200 with correct payload after fix
  - edge case: fix does not regress adjacent routes or middleware
  - edge case: error boundary catches remaining uncaught exceptions

## Unit 6: Smoke-test with Playwright against fixed build
**Files:** `playwright.smoke.config.ts`, `playwright.config.ts`, `scripts`
**Test scenarios:**
  - happy path: smoke suite passes end-to-end against local production build
  - edge case: no regressions detected on critical user journeys

## Unit 7: Commit hotfix with conventional commit message
**Files:** `CLAUDE.md`
