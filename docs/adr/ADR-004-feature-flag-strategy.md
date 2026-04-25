# ADR-004: Feature Flag Strategy

**Status:** Accepted
**Date:** 2026-04-24
**Deciders:** Foundation Sprint Day 10 — codifies convention already
used across DR-586 / DR-691 / DR-692 / DR-706 / DR-710 / DR-712 / DR-724.
**Related:** @.claude/rules/dev-environment.md §5, @docs/adr/ADR-003-voice-agent-consent-and-data-boundary-model.md,
@CLAUDE.md §5.3

---

## Context

Over the past year, features have been shipped to `main` under various
gating schemes — ad-hoc booleans, URL flags, user-role gates, inline
`if (process.env.NODE_ENV === 'production') return null`, and a
handful of `NEXT_PUBLIC_*_ENABLED` flags. The inconsistency caused two
real incidents:

1. A feature that was intended off in prod turned on because a build
   defaulted `undefined` to truthy.
2. A flag toggle that should have been a zero-redeploy rollback
   required a full Vercel redeploy because the check was on import
   side-effects.

Kill switches (the voice-agent 5-layer set — see ADR-003) were also
frequently confused with feature flags during review. They are not the
same thing.

## Decision

### 1. Naming

All feature flags follow the convention:

```
NEXT_PUBLIC_<FEATURE>_ENABLED
```

- `NEXT_PUBLIC_` prefix so the check can evaluate both server-side and
  client-side without a second server gate.
- `<FEATURE>` is the canonical, SCREAMING_SNAKE feature name.
- `_ENABLED` suffix — no other verb. (No `_ON`, `_ACTIVE`, `_ROLLOUT`.)

### 2. Evaluation

A feature flag is ON if and only if the env var reads the exact string
`'true'`:

```ts
const enabled = process.env.NEXT_PUBLIC_X_ENABLED === 'true';
```

Do NOT use `Boolean(process.env.NEXT_PUBLIC_X_ENABLED)` (non-empty
strings are truthy — `'false'` would evaluate to `true`).

### 3. Default posture

- **Default is OFF.** A missing env var = feature off.
- Opt-in rollouts only — there is no "on everywhere unless X" flag.
- New features ship behind a flag that is off in prod until
  deliberately flipped.

### 4. Zero-impact-when-off rule

When the flag is OFF, the flag-gated code MUST have **no runtime
footprint**:

- No extra HTTP calls (client or server).
- No extra bundles shipped (use dynamic `import()` behind the gate).
- No altered UI (conditional render at the gate — do not render and
  hide).
- No `console.*` calls, no Sentry breadcrumbs.
- No side-effects at module-load time. The check MUST run inside the
  component / handler body, not at the top of the file.

Concretely: `export default dynamic(() => import('./Feature'),
{ ssr: false })` gated by the flag at the call site is the preferred
pattern.

### 5. Rollback

Rollback is **flip the env var in Vercel + redeploy the SAME commit**.
No code revert. No `git revert`. This requires:

- The gate is a hot check (point 4 above).
- Database migrations gated behind a feature are additive only (never
  destructive), so turning the flag off doesn't strand writes.
- Analytics / `compliance_events` writes from a flag-gated path are
  tagged with the feature name so post-mortem can distinguish.

### 6. Feature flags are NOT kill switches

| Property              | Feature flag             | Kill switch                         |
| --------------------- | ------------------------ | ----------------------------------- |
| Purpose               | Roll out new feature.    | Stop an active feature NOW.         |
| Lifetime              | Weeks → months, then removed. | Permanent infrastructure.        |
| Default               | OFF                      | Always active.                      |
| Number per feature    | 1                        | Often multiple (Sarah = 5).         |
| Example               | `NEXT_PUBLIC_VOICE_AGENT_ENABLED` | HMAC signature check, output filter, consent gate. |

A kill switch is a SAFETY LAYER that exists even when the feature is
at 100% rollout. A feature flag is a ROLLOUT TOOL that disappears once
the feature is permanent.

See @docs/adr/ADR-003-voice-agent-consent-and-data-boundary-model.md for
the canonical worked example (Sarah has 1 feature flag + 5 kill
switches).

### 7. Lifecycle + cleanup

- When a feature reaches 100% rollout and has been stable for 30 days,
  REMOVE the flag (delete the gate, delete the env var). Stale flags
  are a liability.
- Removal is a separate PR from the feature PR.
- Document the removal in a brief commit message — no ADR needed.

### 8. Documentation

- Every flag is registered in @.claude/rules/dev-environment.md §5
  (or a flags.md if the list outgrows its current size).
- Every flag in `src/` is introduced with a comment pointing to the
  Linear ticket that owns it.

## Consequences

**Enables:**
- Rollback in <30 seconds (env var flip) for every flag-gated feature.
- Preview-deploy testing without affecting prod.
- Red-team testing of closed-world features (e.g. Sarah) by toggling
  the flag on in a staging env.

**Locks us into:**
- Every new user-facing feature must be designed for zero-impact-when-
  off. This rules out features whose side-effects are load-bearing
  on app boot.
- Database changes accompanying a flag must be additive-only.
- Kill switches for high-risk features (voice, payments) must live OUTSIDE
  the flag so that "feature on" doesn't bypass a safety layer.

**Follow-up debt:**
- One-time audit: grep `src/` for all `NEXT_PUBLIC_*_ENABLED` uses,
  verify each is hot-checked (not import-time).
- Decide policy for server-only flags (`<FEATURE>_ENABLED` without the
  `NEXT_PUBLIC_` prefix) — for features that must never reach the
  client bundle.

## References

- @CLAUDE.md §5.3 (feature flag summary).
- @.claude/rules/dev-environment.md §5 (naming + rollback).
- @.claude/rules/privacy.md §4 (voice kill switch — the NOT-a-feature-
  flag example).
- @docs/adr/ADR-003-voice-agent-consent-and-data-boundary-model.md
  (Sarah as the canonical example).
- PRs #101-107 + DR-Sandbox PR #28 (Foundation Sprint — every feature
  gated per this convention).
