# Phase 6 — Review

**Loop:** `2026-05-01-dr-rename`
**Skill invoked:** `improve-codebase-architecture`.

## What went well

- Single-pass `sed` replace was the right tool. No regex, no
  case-folding, no partial-word matches — boring and correct.
- Skip-list captured the right historical paths up-front; the residual
  count after pass 1 (33) was already mostly intentional.
- A scrappy second pass picked up 8 operational doc files the
  conservative skip-list excluded (e.g. `.gitleaks.toml` title,
  `mobile-pwa-spec.md`, `google-vertex-ai-dpa-checklist.md`).
- Zero TypeScript regressions.

## What went wrong

1. **First-pass skip-list was too broad.** Excluded all of
   `docs/specs/`, `docs/legal/`, `docs/review-*`, `docs/section-*`,
   `docs/gbp-*`, etc. Some of these are operational; second pass
   picked them up but it would have been cleaner to allowlist
   instead of denylist.

   **Fix going forward:** for the next bulk rename, build the file
   list from `Grep "old phrase"` output minus a tight historical
   denylist, rather than a pre-emptive denylist that risks over-
   skipping.

2. **No automated regression test for "operational paths must not
   contain old phrase".** A pre-commit hook or CI lint that reruns
   the grep with the loop's denylist would catch any future agent
   reintroducing "Disaster Recovery Australia".

   **Fix going forward:** consider adding a `scripts/check-brand-name.ts`
   that runs in CI. Not in scope for this loop.

## Residual debt

1. **L11 — ASIC business name registration** still required for the
   privacy notice to be legally accurate.
2. **Brand-name regression guard** — none yet.
3. **Historical docs not reverted** — by design; document any future
   policy if Phill wants those updated too.

## Compliance audit

| Check                        | Result            |
| ---------------------------- | ----------------- |
| Legal entity name preserved  | ✅ NRPG Pty Ltd   |
| ABN preserved                | ✅ 85 151 794 142 |
| Voice consent script updated | ✅                |
| Privacy notice copy updated  | ✅                |
| AU English                   | ✅                |
| No banned phrases introduced | ✅                |
| No PII added                 | ✅                |

## Loop-system amendments to propose

- None required. The slice-vs-bulk pattern (L9 sliced, L10 bulk) shows
  PRD §3 is already flexible enough.

## Exit gate

- [x] Decisions documented.
- [x] Residual debt enumerated.

**Proceed to Phase 7 — Handoff.**
