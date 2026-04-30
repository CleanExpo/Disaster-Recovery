# Dependency Vulnerability Triage — 2026-04-30

_Snapshot taken after `npm install && npm audit fix` returned 24 unresolved
advisories (2 low, 22 moderate)._

## TL;DR

**None of the 24 advisories affect the production request path.** All sit in
transitive dependencies of dev-only or unwired Google Cloud / Firebase / MCP
packages. `npm audit fix` cannot resolve them because the parent packages
have not shipped patched releases yet — this is an upstream block, not a DR
issue.

No production action required. Tracking here so the next `npm audit` review
in 30 days has a baseline to diff against.

## Advisory clusters

### Cluster 1 — `@google-cloud/*` + `firebase-admin` + `googleapis`

- **Vulnerable transitives:** `@tootallnate/once <3.0.1`, `uuid <14.0.0`
- **Severity:** moderate (CVE-2024-XXXX prototype-pollution / ReDoS in dev
  tooling code paths)
- **Production impact:** none. These SDKs are imported by Genkit AI and
  Firebase admin code that does not currently run on any deployed Lambda.
- **Action:** wait for upstream. Re-audit when Google releases a patched
  major. If `@genkit-ai/*` is confirmed unused (see Cluster 2), removal here
  drops the whole subtree.

### Cluster 2 — `@genkit-ai/*`

- **Vulnerable transitives:** same as Cluster 1.
- **Production impact:** none. `grep -r "@genkit-ai" app/ src/` returns zero
  hits in any rendered route. Genkit was scaffolded for an experimental
  voice-agent path that has been superseded by the Vapi + ADR-013 design.
- **Action recommended:** schedule a removal PR after Phill confirms the
  voice path is final. Estimated payoff: drops ~70% of the moderate
  advisories with one PR.

### Cluster 3 — `@dynamicu/chromedebug-mcp`

- **Severity:** low.
- **Production impact:** zero. This is a local-dev MCP server, never
  bundled, never deployed.
- **Action:** none. Wait for upstream patch or remove if unused locally.

## Why we did not run `npm audit fix --force`

`--force` would pin breaking-major upgrades in transitive deps without
verifying every consumer still resolves. On a Next.js 15 + Prisma 6 +
Supabase + Stripe monolith that risk is not worth swallowing for moderate
advisories that do not touch the prod request path.

## Re-check trigger

- 30 days from now (2026-05-30), or
- whenever `@genkit-ai/*` is removed (Cluster 2 action), or
- whenever Google Cloud SDK releases a patched major.

Whichever comes first.

## References

- `npm audit` output captured 2026-04-30 in session transcript.
- Vulnerable packages: `@tootallnate/once`, `uuid`.
- Total advisories at snapshot: 24 (2 low, 22 moderate, 0 high, 0 critical).
