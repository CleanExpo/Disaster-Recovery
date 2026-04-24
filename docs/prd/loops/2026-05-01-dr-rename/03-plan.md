# Phase 3 — Plan

**Loop:** `2026-05-01-dr-rename`

## Numbered steps

1. **Branch** `loop/2026-05-01-dr-rename`.
2. **Loop dir** `docs/prd/loops/2026-05-01-dr-rename/` + 00–03 artefacts.
3. **Bulk replace** via `find … -exec sed -i 's/Disaster Recovery Australia/Disaster Recovery/g' {} +` across operational paths.
4. **Second pass** on operational docs that the first pass excluded
   by overly-aggressive skip patterns:
   `.gitleaks.toml`, `docs/specs/mobile-pwa-spec.md`,
   `docs/legal/google-vertex-ai-dpa-checklist.md`,
   `docs/review-request-templates.md`,
   `docs/section-8-ceo-vision.md`,
   `docs/gbp-content-ready-to-publish.md`,
   `docs/gbp-posts-tc-maila-fnq.md`,
   `docs/citation-cleanup/monthly-monitoring-checklist.md`.
5. **Verify residual** — only historical/audit paths should retain
   the old phrase.
6. **Typecheck** — `npx tsc --noEmit`, zero new errors.
7. **05/06/07 artefacts**, commit, PR, merge.

## Token budget

~10k.

## File territory

- 127 files renamed in pass 1
- ~8 additional files renamed in pass 2
- ~135 files total touched
- Zero new files (other than loop artefacts)

**Proceed to Phase 4 — Implement.**
