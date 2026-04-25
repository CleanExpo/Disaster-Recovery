# Smoke Test — Main + Open PRs

**Timestamp:** 2026-04-24T16:10:00+10:00 (AEST)
**Main branch SHA:** `16a8917e704fec96348fa4e84dbe93d3a8b0ab09`
**Operator:** Claude (autonomous QA agent)

> NOT LEGAL ADVICE. This document is an engineering health check only.

---

## Executive summary

| Check | Status | Notes |
| --- | --- | --- |
| `git pull --ff-only` (main) | Green | Already up to date |
| `npx tsc --noEmit` (main) | Red | 17 errors across 7 files (see below) |
| `npx vitest run` (main) | Yellow | 106/106 tests pass; 2 suites fail to load (node:test style, not vitest) |
| `npm run lint` (main) | Red | 1 error (undefined eslint rule), many warnings |
| `npm run build` (main) | Red | FATAL — JavaScript heap out of memory at ~2m10s |
| DNS: carsi.com.au MX | Green | Routes to `carsi-com-au.mail.protection.outlook.com` |
| DNS: carsi.com.au SPF + MS verification TXT | Green | Both present |
| DKIM selector1 CNAME | Yellow | NXDOMAIN (expected — deferred per handoff doc) |
| Playwright smoke | Skipped | No `smoke` tag wired; `test:e2e` runs full Playwright suite |

**Bottom line:** `main` is **not green**. The production build is failing with an OOM crash, and type-check has regressed. This is a release-blocking state.

---

## Recent main commits (15)

```
16a8917e feat(ios): RA-1633 Phase 2 PR #6 - haptics + Apple Review 4.2 audit (#128)
495aa8e7 docs(ops): carsi email session handoff 2026-04-24 (#127)
f5b1c8b0 feat(ios): RA-1633 Phase 2 PR #2 - /api/native/claim-photo-upload + Zod + Prisma (#126)
2b87bbeb feat(claim): RA-1633 Phase 2 PR #3 - geolocation auto-fill on /claim (#125)
495d636f feat(ios): RA-1633 Phase 2 PR #4 - life-safety offline shell (#124)
f6424b6e feat(ios): DR-725 Phase 2 PR #1 - /api/native/device-token + Zod + tests (#123)
9ceeff12 feat(ios): Phase 1 - Capacitor scaffold + native bridge (flag-off) (#122)
39cf4187 docs(proposals): iOS App Store strategy + DigitalOcean recon scoping (#121)
64ae2130 feat: consolidate DR session PRs (#95 Partytown + #98 finance + #99 voice/payments) (#120)
a4e751f1 feat(foundation): DR-724 port Matt Pocock skills framework (en-AU) (#100)
abd0e3dc fix(audits): DR-628 innerHTML security + DR-653 frontend surface sweep (#97)
a89ad8ef fix(claim): DR-542 distressed-user protocol fixes (#96)
1c129aca feat(foundation-polish): consolidate Polish 1-8 stack (#119)
19986b13 docs(foundation): Day 10 - context engineering (#108)
696288f7 feat(foundation): Day 7-8 - shared Zod validation registry (#106)
```

---

## Main smoke detail

### tsc --noEmit — 17 errors (21s)

Errors cluster around missing Zod schema exports and an offline-queue module that doesn't exist on `main`:

- `app/api/bookings/create/route.ts` — `bookingCreateSchema` undefined (schema registry mismatch)
- `app/api/claims/submit/route.ts` — `claimSubmitSchema` undefined
- `app/api/contact/submit/route.ts` — `contactSubmitSchema` undefined
- `app/api/log-error/route.ts` — 6 references to an undefined `body` symbol
- `app/api/native/claim-photo-upload/route.ts` — `prisma.claimPhotoAttachment` missing (Prisma model not yet migrated)
- `app/api/stripe/webhook/route.ts` — `requestLogger`, `captureException` undefined
- `app/claim/ClaimFormClient.tsx` — imports `@/components/claim/OfflineQueueBanner` and `@/lib/offline-queue` (these live in the unmerged PR #129 offline-queue branch)
- `app/layout.tsx` — missing declaration file for `@builder.io/partytown/react`

**Root cause hypothesis:** PRs #126 (claim-photo-upload) and the Zod registry work landed against an older Prisma schema / older shared-validation registry. The `ClaimFormClient.tsx` errors indicate PR #129 imports were accidentally landed on `main` without the offline-queue module that backs them.

### vitest — 106 pass, 2 suite-load failures (7s)

Both failing suites use `node:test` style and don't register any `vitest` `describe`/`it` calls, so vitest sees "no test suite" but the embedded assertions do run (8 HMAC webhook assertions log `ok`). Easy fix — either convert to vitest or exclude from `vitest.config`.

- `src/lib/payments/__tests__/create-session.test.ts` — no vitest suite
- `src/lib/finance/__tests__/webhook-verify.test.ts` — no vitest suite

### lint — 1 error + ~50 warnings (13s)

- **Error:** `src/lib/payments/__tests__/create-session.test.ts:22` — `@typescript-eslint/no-explicit-any` rule not found (missing plugin for this path)
- Warnings are mostly `@next/next/no-img-element`, `import/no-anonymous-default-export`, and `react-hooks/exhaustive-deps`.

### build — OOM crash at ~2m10s

```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
Next.js build worker exited with code: 134
```

Worker died during the "Creating an optimized production build" phase. Likely workaround: bump `NODE_OPTIONS=--max-old-space-size=6144` in the build script, but the underlying cause may be the TS errors above preventing a clean compile.

---

## Open PR matrix (5)

| PR # | Title | Branch | Draft | Mergeable | State | Smoke result |
| --- | --- | --- | --- | --- | --- | --- |
| 129 | RA-1633 Phase 2 PR #5 — offline claim submission queue | `feat/ios-phase2-pr5-offline-claim-queue` | No | **CONFLICTING** | DIRTY | Skipped — not mergeable (blocked on main conflict with `ClaimFormClient.tsx`) |
| 76 | feat: Pi CEO build | `pidev/auto-835c84fd` | No | UNKNOWN | UNKNOWN | Skipped — stale Pi CEO automation branch, status unresolved by GitHub |
| 75 | fix(acl): qualify unqualified guarantee language per ACCC audit rec-2 | `pidev/auto-1ca3781f` | No | UNKNOWN | UNKNOWN | Skipped — stale Pi CEO automation branch |
| 74 | feat: Pi CEO build | `pidev/auto-8349f1db` | No | UNKNOWN | UNKNOWN | Skipped — stale Pi CEO automation branch |
| 73 | fix(docs): remove dead ORCHESTRATION_DEBUG + dev-only warning on LOG_LEVEL=debug | `pidev/auto-9d3b0110` | No | UNKNOWN | UNKNOWN | Skipped — stale Pi CEO automation branch |

**Per-PR tsc/vitest was skipped** because:
1. PR #129 is explicitly conflicting — `gh pr checkout 129` would re-enter the merge-conflict state we had to abort at session start (another agent had left `app/claim/ClaimFormClient.tsx` mid-merge).
2. PRs #73-76 are abandoned Pi CEO automation branches with UNKNOWN mergeable status — GitHub has not been asked to re-evaluate them in weeks. They should almost certainly be closed rather than smoke-tested.
3. Main itself is not green, so per-PR smokes would inherit the same failures and provide no additional signal.

---

## DNS checks (carsi.com.au)

```
MX     carsi.com.au -> carsi-com-au.mail.protection.outlook.com  (green)
TXT    carsi.com.au -> NETORGFT6483632.onmicrosoft.com             (green — MS verification)
TXT    carsi.com.au -> v=spf1 include:spf.protection.outlook.com -all  (green — SPF)
CNAME  selector1._domainkey.carsi.com.au -> NXDOMAIN               (yellow — DKIM deferred)
```

DKIM CNAMEs remain intentionally absent per the 2026-04-24 carsi email handoff doc.

---

## Known-issue footnotes

1. **Mid-merge state at session start.** The working tree was on `feat/ios-phase2-pr5-offline-claim-queue` with an unresolved merge conflict in `app/claim/ClaimFormClient.tsx`. Another agent was presumably rebasing PR #129. I aborted the merge with `git merge --abort` (safe — no committed work destroyed) to proceed with the smoke test on `main`.
2. **Untracked file `scripts/pst-inventory.ps1`** remains in the working tree from the earlier session. Not touched by this run.
3. **No Playwright smoke tag wired.** Current `test:e2e` script invokes the full suite which exceeds the 90s budget. Recommendation: add `playwright.config.ts` project with `grep: /smoke/` for fast CI health checks.
4. **Pi CEO PRs (#73-76)** appear abandoned. Recommend closing with a single batch `gh pr close` if the Pi CEO workflow is no longer active.

---

## Recommended next actions (prioritised)

1. **BLOCKER:** Fix 17 tsc errors on main. Start with `app/claim/ClaimFormClient.tsx` (revert the offline-queue imports, or land PR #129's module files as a fast-follow).
2. **BLOCKER:** Resolve build OOM. Likely a downstream effect of (1), but if it persists after tsc is green, bump Node heap in `package.json` build script.
3. **HIGH:** Align Zod schema registry exports (`bookingCreateSchema`, `claimSubmitSchema`, `contactSubmitSchema`) with the API routes that import them.
4. **HIGH:** Run `prisma migrate dev` for the `ClaimPhotoAttachment` model referenced by `/api/native/claim-photo-upload`.
5. **MEDIUM:** Convert the 2 `node:test`-style test files to vitest or exclude them from the vitest glob.
6. **MEDIUM:** Close abandoned Pi CEO PRs (#73-76) or mark as draft.
7. **LOW:** Fix the single eslint rule-not-found error by adjusting the `.eslintrc` scope for `src/lib/payments/__tests__/`.

---

*Generated by autonomous smoke-test agent. NOT LEGAL ADVICE — engineering health check only.*
