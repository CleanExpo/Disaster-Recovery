# DR-653 — DR Frontend Surface-Treatment Sweep

**Date:** 2026-04-23
**Scope:** `app/`, `src/components/`, `components/` — public-facing pages
**Method:** Pattern scans for eight common surface defects

## Defect categories scanned

1. Hardcoded light-mode colours on dark backgrounds (`text-gray-[6-9]00` on
   `bg-slate-900` / `bg-gradient-to-br from-blue-[789]00` / similar)
2. Broken heading hierarchy (h1 → h3 skipping h2)
3. Duplicate / missing React list keys
4. `onClick` on non-button elements without `role="button"`
5. `<img>` without `alt`
6. External links (`target="_blank"`) without `rel="noopener"` / `rel="noreferrer"`
7. Inline `!important` hacks
8. `disabled` buttons without `aria-disabled`

## Summary

| Category | Findings | Severity | Fixed in PR | Deferred |
|---|---|---|---|---|
| 1. Dark-mode contrast | 0 new | — | — | — |
| 2. Heading hierarchy (h1→h3) | 6 (all authenticated `/portal/training`) | LOW | 0 | 6 |
| 3. Duplicate/missing keys | 0 | — | — | — |
| 4. onClick on non-button | 0 on public pages | — | — | — |
| 5. `<img>` without alt | 0 | — | — | — |
| 6. External link rel=noopener | 0 missing | — | — | — |
| 7. Inline `!important` | 2 (both legitimate) | — | — | — |
| 8. Disabled without aria-disabled | 0 on `app/` | — | — | — |

**Total high-severity findings:** 0.
**Fixes applied in this PR:** 0 (none at HIGH severity).
**Deferred to backlog:** 6 (LOW severity, authenticated portal only).

## Details

### 1. Dark-mode contrast — clean

The MEMORY.md history shows extensive prior work (commits `2480e7cf`,
`0e0c3ee5`, `612c19a9` and others) that already fixed the
`text-gray-600` invisible-on-slate-900 patterns across public pages.
Fresh regex scans for `bg-slate-900` adjacent to `text-gray-[6-9]00`, and
`bg-blue-[789]00` adjacent to `text-blue-[789]00`, return **zero matches**.
`text-gray-[6-9]00` occurrences (~349) are all on light backgrounds (forms,
client-portal cards, admin surfaces).

### 2. Heading hierarchy — 6 LOW findings

Training modules under `app/portal/training/modules/day-9/`, `day-10/`,
`day-11/`, `day-12/`, `day-13/`, `day-14/` contain `<h1>` followed by
`<h3>` without intervening `<h2>`. All are behind the contractor portal
auth boundary and not public-facing. Deferred to backlog.

### 3. Duplicate / missing keys — clean

No `.map()` renders found with missing `key=` or obvious index-only keys
under `app/**/page.tsx`. (Index-only keys in stable never-reordered lists
such as hero cards are acceptable and not flagged.)

### 4. onClick on non-button — clean

No `<div onClick=...>` found under `app/` on public pages. All interactive
handlers are attached to `<button>` or `<a>` elements.

### 5. `<img>` without alt — clean

All raw `<img>` tags in `app/` and `src/components/` carry an `alt`
attribute (some are `alt=""` on decorative Hero backgrounds — correct per
WCAG). The majority of imagery uses `next/image`.

### 6. External links without rel=noopener — clean

264 `target="_blank"` occurrences across `app/` + `src/components/` +
`components/`. Every spot-checked multi-line JSX pair (`DisasterEventPage`,
`SupportClient`, contractor registration steps `Step1Account` /
`Step3Compliance` / `Step6Agreements`, `ClaimFormClient`,
`emergency-make-safe-sections`) includes `rel="noopener noreferrer"` on
the adjacent line. Single-line occurrences (grep-confirmed) all carry
`rel=` on the same line.

### 7. Inline `!important` — legitimate uses only

Two occurrences:
- `src/components/notifications/EmailTemplates.tsx:172` — inside an
  email-template `<style>` block (`.urgent { background-colour: #ef4444
  !important; }`). Legitimate — email clients require `!important` on
  inline styles to override Gmail/Outlook resets.
- `app/resources/fuel-surcharge-guide-2026/page.tsx:564` — print styles
  (`nav, footer { display: none !important; }`). Legitimate.

### 8. Disabled buttons without aria-disabled — clean

No offending patterns found under `app/`.

## Fixes applied in this PR

None at HIGH severity. The six LOW-severity heading-hierarchy defects are
behind auth and deferred.

## Backlog

- [ ] DR-653-a: Add `<h2>` section headers to training modules
  `app/portal/training/modules/day-{9..14}/page.tsx` so screen-reader
  heading outlines are linear.
- [ ] DR-653-b: Consider migrating remaining raw `<img>` tags in
  `src/components/ui/Hero.jsx`, `Navigation.jsx`, `Card.jsx` to
  `next/image` for automatic LCP / responsive handling. (Medium — not
  a defect, just a quality upgrade.)
- [ ] DR-653-c: Add a CI lint rule (e.g. `eslint-plugin-jsx-a11y`
  `heading-has-content` / `no-static-element-interactions`) so future
  regressions are blocked in review.
