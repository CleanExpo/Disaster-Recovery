# ADR-005: Vercel-native observability (swap Sentry scaffold)

- **Status:** Accepted
- **Date:** 2026-04-24
- **Context:** Foundation Sprint Polish 4

## Context

Day 9 (PR #107) shipped a Sentry scaffold at `src/lib/observability/sentry.ts`
behind a `SENTRY_DSN` flag. Polish 2 (PR #110) then added ~44 `captureException`
call sites across `app/api/**` routes, all calling into that stub.

The project is hosted on Vercel and does not have a Sentry account. Phill
corrected: "We don't use Sentry, we are using Vercel." Provisioning Sentry
adds an account dependency, a paid tier for retention, and an outbound DSN
for every request — when Vercel already ships first-class observability for
anything deployed to its runtime.

## Decision

Swap the Sentry scaffold for a Vercel-native implementation with the same
public API:

- **Traces + errors:** `@vercel/otel` + `@opentelemetry/api`. The `register()`
  hook in `instrumentation.ts` calls `registerOTel({ serviceName })` so every
  request gets an active OTel span. `captureException()` records onto the
  active span via `span.recordException()` + `span.setStatus({ code: ERROR })`.
- **Core Web Vitals:** `@vercel/speed-insights` mounted in the root layout
  reports LCP, CLS, INP, FCP, TTFB to Vercel Monitoring.
- **User analytics:** `@vercel/analytics` mounted in the root layout.
- **Log surface:** Everything flows into Vercel's Observability tab and any
  configured Log Drain (Datadog, S3, HTTPS collector) — no DSN, no third-party
  auth, authenticated at build time via the Vercel project token.

The public API of `src/lib/observability` is unchanged — `captureException`,
`captureMessage`, `setUser`, `setTag` — so the 44 Polish 2 call sites need
no modification. The barrel at `src/lib/observability/index.ts` re-exports
from `./vercel` instead of `./sentry`.

On local dev (no OTel exporter), calls degrade to structured JSON console
logs — identical UX to the old Sentry stub in unconfigured state.

## Consequences

**Positive:**
- Zero account/vendor dependencies beyond Vercel itself.
- No DSN to rotate, no quota to breach, no per-request PII leaving Vercel.
- `@vercel/speed-insights` picks up INP (March 2024 Core Web Vital) automatically.
- Log Drains give a clean escape hatch if the team ever wants Datadog / BetterStack.

**Negative:**
- No error grouping / alerting UI out of the box — Vercel Monitoring shows
  traces + logs, not error-group dashboards. If that becomes a requirement,
  pipe via Log Drain to a dedicated tool rather than re-adopting Sentry.
- OTel span API is less ergonomic than Sentry's fluent API for deep
  instrumentation. Current call sites (tags/user/extra) map cleanly; complex
  scopes would need revisiting.

**Neutral:**
- `SENTRY_DSN` and related env vars removed from `.env.example`.
- No `@sentry/*` packages installed anywhere in the tree.

## References

- Foundation Sprint Polish 4 PR
- `src/lib/observability/vercel.ts`
- `instrumentation.ts`
- https://vercel.com/docs/observability/otel-overview
