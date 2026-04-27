# TypeScript Phase 2 — Cluster Analysis

**Companion to:** `docs/plans/2026-04-27-d1-d5-recommendation.md` (D4)
**Date:** 27 April 2026 (AEST)
**Author:** Senior PM (Claude orchestrator)
**Status:** scaffold — pick up in a fresh session and ship per cluster.

---

## Audit numbers — current truth

Counted 27 April 2026 via `grep -rn 'as any' src/ app/`:

- **171 total `as any` casts**
- **76 files**
- Original audit (2026-04-26) called out 173. Net delta: −2. The
  health-check sprint cleared a couple in passing.

The CI hard gate (`next.config.mjs typescript.ignoreBuildErrors`)
stays OFF until this number reaches zero. Estimated 3-4 weeks at the
current cadence.

---

## Cluster strategy

Three risk tiers. D4 first wave targets **HIGH-RISK only.** That is
40-50 casts on the highest blast-radius paths. Each cluster ships as
its own PR so review surface stays small.

### Tier 1 — HIGH-RISK (D4 first wave)

Pay these off first. A silent runtime cast here is a customer-facing
or compliance incident.

| Cluster                                      | Files                                                                                                                                                                                                                             | Casts | Why high-risk                                                                                                |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------ |
| **A. Payments (Stripe)**                     | `src/lib/stripe.ts`, `app/api/payments/refund/route.ts`, `app/api/payments/create-booking/route.ts`                                                                                                                               | 5     | Touches `paymentIntents`, `subscriptions`, `refunds`. A wrong cast on `metadata` or `amount` is a money bug. |
| **B. Auth + middleware**                     | `src/lib/auth-middleware.ts`                                                                                                                                                                                                      | 1     | Single cast — fix it on sight.                                                                               |
| **C. API request handlers**                  | `app/api/search/route.ts`, `app/api/contractor/register/route.ts`                                                                                                                                                                 | 4     | Public endpoints. Type drift here yields 500s under unexpected payloads.                                     |
| **D. Contractor onboarding step components** | `app/contractor/apply/ApplyClient.tsx`, `src/components/contractor/registration/steps/Step2Company.tsx`, `Step7ReviewSubmit.tsx`, `CertificationVerification.tsx`, `ProofOfWorkSubmission.tsx`                                    | 17    | 7-step onboarding writes `ContractorApplication`. Cast errors corrupt the application row.                   |
| **E. Admin dashboards**                      | `src/components/admin/AdminDashboardChartsInner.tsx`, `src/components/contractor/dashboard/PremiumDashboard.tsx`, `ContractorDashboard.tsx`, `app/admin/{leads,proof-of-work,fraud-detection}/Charts.tsx`, `app/rates/Charts.tsx` | 11    | Operator-facing data; wrong cast surfaces wrong numbers to the team that bills.                              |
| **F. Compliance / audit components**         | `src/components/audit/AuditTrailLogger.tsx`, `src/components/audit/ComplianceMonitoringDashboard.tsx`                                                                                                                             | 2     | Compliance read paths. Misread = breach false-negative.                                                      |
| **G. Top-level analytics surface**           | `app/analytics.tsx`                                                                                                                                                                                                               | 10    | High-frequency client surface. Cast errors yield silent analytics drops.                                     |

**Tier 1 total: 50 casts across 17 files.**

D4 first-wave plan: ship Cluster A (Payments) + Cluster B (Auth) + Cluster C (API handlers) + Cluster G (analytics surface) on day 1. That is ~20 casts and four small PRs. Defer D, E, F to the second wave (D4 + D5).

### Tier 2 — MEDIUM-RISK (D4 second wave / D5 parallel)

Important but not customer-incident-class.

| Cluster                                  | Files                                                                                                                                                                                                                                                                                                                                                                                          | Casts | Notes                                                                               |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ----------------------------------------------------------------------------------- |
| **H. Marketing / communications**        | `src/components/marketing/ContractorReportingDashboard.tsx`, `src/components/clean-claims/ClientCommunicationWorkflow.tsx`                                                                                                                                                                                                                                                                     | 6     | Operator-facing copy + email previews.                                              |
| **I. Contractor billing + estimates**    | `src/components/billing/ContractorPriceUpload.tsx`, `src/components/estimates/ClientApprovalWorkflow.tsx`                                                                                                                                                                                                                                                                                      | 6     | Billing-adjacent. Worth typing strictly even if not money path.                     |
| **J. Documents + KPI + workload**        | `src/components/documents/DocumentRepository.tsx`, `DocumentExpiryTracker.tsx`, `src/components/analytics/KPIPerformanceDashboard.tsx`, `src/components/workload/{Weighted,Geographic,LoadBalancing}*`                                                                                                                                                                                         | 8     | Operational reads.                                                                  |
| **K. Performance + audio + interactive** | `src/components/performance-monitor.tsx`, `src/components/audio/AudioSystem.tsx`, `src/components/interactive/PerformanceOptimizer.tsx`, `src/utils/performance-monitor.ts`, `src/hooks/useThrottledMouse.ts`                                                                                                                                                                                  | 12    | Component infra. Some are window/document casts that may be hard to remove cleanly. |
| **L. Schedule + page client surfaces**   | `app/schedule/ScheduleClient.tsx`, `app/contractor/login/page.tsx`, `app/locations/[city]/[...slug]/page.tsx`, `app/events/cyclone-alfred-fnq-2026/page.tsx`, `app/wa/carnarvon-cyclone-narelle-claims/page.tsx`, `app/guides/water-damage/page.tsx`, `app/guides/biohazard/sewage-backup-health-risks/page.tsx`, `app/portal/training/modules/day-2/page.tsx`, `app/image-optimizer/page.tsx` | 14    | Generated pages + a couple of client surfaces.                                      |
| **M. Search component**                  | `src/components/search.tsx`, `src/components/sections/PremiumServicesGrid.tsx`                                                                                                                                                                                                                                                                                                                 | 2     | Two single-cast files.                                                              |

**Tier 2 total: ~48 casts across ~22 files.**

### Tier 3 — LOW-RISK (D5+ or park)

Internal tooling, agent scaffolds, dev-only paths. The cost of leaving
these is low; they exist mostly because the agent libraries deal with
opaque `unknown` payloads. Some of these casts are correct _as a
boundary_ and should be replaced with `unknown` + a Zod parse, not a
typed object.

| Cluster                                   | Files                                                                                                                                                                                                                                                             | Casts | Notes                                                                              |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ---------------------------------------------------------------------------------- |
| **N. Agent libraries (research-planner)** | `src/lib/agents/research-planner/{documentation,ui-designer,shadcn-expert,code-analysis,browser-automation,index}.ts`                                                                                                                                             | ~25   | Agent harness payloads. Replace with `unknown` + Zod boundary parse, not `as any`. |
| **O. UI design agent harness**            | `src/agents/ui-design/agents/{visual-analyzer,responsive-optimizer,dark-mode-specialist,animation-enhancer,accessibility-guardian}.ts`, `src/agents/disaster-recovery-image-agent.ts`                                                                             | ~20   | Same pattern — agent payload boundaries.                                           |
| **P. AI-orchestration**                   | `src/lib/ai-orchestration/{templates/disaster-recovery-orchestrator,monitoring/performance-monitor,config/default-config,index,analysis/multi-agent-orchestration}.ts`, `src/lib/ai-service.ts`, `src/lib/agents/orchestrator/{index,agent-registry}.ts`          | ~15   | Internal scaffolding.                                                              |
| **Q. Mock + dev surfaces**                | `src/lib/services/mock/mockStripe.ts`, `src/lib/visual-generator.ts`, `src/lib/image-generation/generate-images.ts`, `src/lib/ui-system.tsx`, `src/lib/seo/image-seo-agent.ts`, `src/lib/config/elysia-config.ts`, `src/bots/elysia-engine/client-bot-handler.ts` | ~10   | Dev tooling + visuals + bot scaffolds.                                             |

**Tier 3 total: ~70 casts across ~37 files.**

---

## Cast-replacement guidance

For each cast, prefer (in order):

1. **Generic constraint.** If the cast is to access `.foo` on an
   unknown shape, add `<T extends { foo: ... }>` to the surrounding
   function instead.
2. **Type narrowing via predicate.** `function isClaim(x: unknown): x is Claim`. The cast disappears.
3. **Zod boundary parse.** For external payloads (webhooks, fetch
   responses, query results), parse via the existing
   `src/lib/validation/schemas.ts`. The result is correctly typed; no
   cast needed.
4. **`as unknown as T` (last resort).** If the cast is genuinely
   needed (typically third-party libraries with broken types), the
   double-cast is more honest and the lint rules can be configured to
   permit it where `as any` is forbidden.

**Anti-pattern:** replacing `as any` with `as unknown` and continuing
to access properties off the result. That just relocates the unsafety
to the access site.

---

## D4 first-wave shopping list

Pick this list up cold in a fresh session. Each cluster = one PR.

```
Cluster A (Payments) — 5 casts, 3 files:
  src/lib/stripe.ts:1
  app/api/payments/refund/route.ts:2
  app/api/payments/create-booking/route.ts:2

Cluster B (Auth) — 1 cast, 1 file:
  src/lib/auth-middleware.ts:1

Cluster C (API handlers) — 4 casts, 2 files:
  app/api/search/route.ts:3
  app/api/contractor/register/route.ts:1

Cluster G (Analytics surface) — 10 casts, 1 file:
  app/analytics.tsx:10
```

**Total D4 first wave: 20 casts, 7 files, 4 PRs.**

For each PR:

1. Open the file. Read the surrounding context (the function the cast
   is in, what it returns).
2. Pick the right replacement per the guidance above.
3. Run `npx tsc --noEmit` locally before committing — confirm no new
   errors.
4. Run `npm test` if there are tests that exercise the changed file.
5. Commit message: `refactor(types): TS Phase 2 — clear <as any> in <cluster name>`.
6. PR title: `refactor(types): DR-700 TS Phase 2 — Cluster <X> (<n> casts)`.

---

## What "done" looks like

- `grep -rn 'as any' src/ app/` returns 0 matches.
- `next.config.mjs` no longer has `typescript.ignoreBuildErrors: true`.
- `npx tsc --noEmit` exits 0 in CI.
- `MEMORY.md` updated with the close-out date.

---

## References

- `docs/plans/2026-04-27-d1-d5-recommendation.md` §"D4 (Thu)" — when
  this work happens.
- `next.config.mjs` — the gate that flips when this lands.
- `src/lib/validation/schemas.ts` — Zod boundary surface for option 3
  in the guidance above.
- Original audit: `docs/plans/cryptic-fluttering-cray.md` Finding C1.
