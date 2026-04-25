# Phase 2 — Design-an-Interface

**Loop:** `2026-05-01-dr-rename`

## Public contracts (unchanged)

| Surface                | Change                                                           |
| ---------------------- | ---------------------------------------------------------------- |
| All URLs               | None                                                             |
| API responses          | None                                                             |
| Prisma schema          | None                                                             |
| `legalName` in JSON-LD | None — stays `National Restoration Professionals Group Pty Ltd`  |
| `name` in JSON-LD      | None — already `Disaster Recovery` in `src/lib/constants.ts` NAP |

## Visible-copy changes

Every rendered page that previously said "Disaster Recovery Australia"
now says "Disaster Recovery". This includes:

- `<title>` and `<meta description>` tags
- Hero copy on landing page, location pages, service pages
- Privacy notice (APP 5 collection statement)
- About / Careers / Investors pages
- Voice agent consent prompt (Sarah)
- Equipped finance consent form chrome
- Footer and breadcrumb labels
- All 49 guide pages
- All 1,152 location pages (via shared template)
- All ~129 service pages (via shared template)

## Replacement strategy

Single literal string replace via `find … -exec sed -i …`. No regex,
no case-folding, no partial-word matching.

## Files explicitly preserved

Listed in `00-intake.md` "Out of scope". Historical/audit docs only.

## Verification contract

- `npx tsc --noEmit` — zero new errors.
- `grep -rn "Disaster Recovery Australia"` (operational paths only) —
  zero residual.
- `grep -rn "Disaster Recovery"` (operational paths) — many matches
  (the brand should appear everywhere).
- Husky pre-commit gates pass.

## Exit gate

- [x] Public contracts confirmed unchanged.
- [x] Visible-copy scope enumerated.
- [x] Strategy is single literal string replace.

**Proceed to Phase 3 — Plan.**
