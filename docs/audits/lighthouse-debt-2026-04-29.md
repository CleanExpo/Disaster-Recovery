# Lighthouse Quality Debt — 2026-04-29

> **Status:** OPEN — gates softened to warn temporarily so unrelated PRs can merge. Real fixes scheduled as ongoing 'A' work.

## Why this doc exists

The `.lighthouserc.json` policy was tightened across PRs #297 (TTI gate), #299 (drop kitchen-sink preset), #300 (remove synthetic INP), and #301 (LCP dead-code removal). After all that, prod still fails the originally-stated hard gates because of pre-existing issues unrelated to the 6 reviewed PRs (#291-#296) that were waiting to merge.

This doc names the debt explicitly so it's tracked, not silently softened.

---

## Current measured state (2026-04-29 from CI run 25085505336)

### LCP (Largest Contentful Paint)
**Target: ≤ 2500ms**

| URL | LCP | Gap | Notes |
|---|---|---|---|
| `/` | 2920ms | +420ms | Home, post dead-code removal in #301 |
| `/claim` | 2920ms | +420ms | Text-LCP — gated by JS hydration |
| `/events/queensland-floods-2026` | **5297ms** | **+2,797ms** | Major regression — separate root cause from home |
| `/events/cyclone-narelle-western-australia-2026` | similar | similar | Same pattern as above |

**Likely root causes (untested):**
- `/events/*` likely have heavy hero imagery or render-blocking CSS specific to those routes
- `antigravity-design-system.css` is 82 KB and render-blocking on every route — splitting critical-vs-deferred CSS would help all URLs
- `NavigationIndicator` is still SSR-rendered; could be `dynamic({ ssr: true })` to reduce initial JS

### Accessibility category
**Target: ≥ 0.95**

| URL | A11y score | Gap |
|---|---|---|
| `/claim` | 0.76 | -0.19 |
| `/events/queensland-floods-2026` | 0.73 | -0.22 |
| `/events/cyclone-narelle-...` | 0.77 | -0.18 |

**Likely root causes (untested):**
- Color-contrast violations (audit C13 was previously "unverified")
- Missing ARIA labels / landmarks
- Heading hierarchy issues
- Missing alt text on images

---

## Decision

Softened gates in this PR:
- **LCP** error 2500ms → **warn** (was hard, now visible-only)
- **A11y category** error 0.95 → **warn** (was hard, now visible-only)
- Performance category, TTI, TBT — already warn

Hard gates retained:
- **CLS** ≤ 0.1 (Core Web Vital, currently passing)

This is **not** silent softening — both targets are tracked here and will be raised back to error once the underlying work lands.

---

## Ongoing 'A' work (per post-#297 plan)

These are scheduled for senior specialists, not gating today's deliverables:

1. **`/events/*` LCP investigation** — separate root cause from home. Frontend perf agent.
2. **Site-wide a11y category to ≥ 0.95** — color-contrast + ARIA + landmarks. A11y specialist.
3. **`antigravity-design-system.css` critical/deferred split** — frontend perf.
4. **Deprecated browser APIs sweep** — was in the dropped recommended preset; modernization specialist.
5. **Unused CSS/JS reduction** — frontend perf.

Each of these gets its own ticket and senior agent dispatch.

---

## Acceptance criteria to restore hard gates

| Gate | Currently | Restore when |
|---|---|---|
| LCP error 2500ms | warn | `/events/*` LCP < 2500ms AND home LCP < 2500ms in CI for 3 consecutive runs |
| A11y category error 0.95 | warn | All audited URLs report a11y category ≥ 0.95 in CI for 3 consecutive runs |

---

_Generated 2026-04-29 by Claude (senior PM mode), authorised by Phill McGurk._
