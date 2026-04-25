# Phase 3 — Plan

**Loop:** `2026-04-25-equipped-phase1-pdf-fill`
**Skill invoked:** none (loop is not a gnarly refactor).

## Numbered steps

1. **Copy the 2 public PDFs to `public/finance/`** with kebab-case names.
   - Success: `ls public/finance/` shows both PDFs + README.

2. **Overwrite the internal RecoveryCapital PDF** with the `(1)` version
   from Phill's Downloads.
   - Success: `docs/partners/equipped/recoverycapital-base44.pdf` has the
     new byte size.

3. **Create `src/components/finance/EquippedLicensingBlock.tsx`** per the
   interface in `02-interface.md`.
   - Success: file exports a default React component accepting
     `{variant?: 'commercial' | 'contractor'}`.

4. **Update `app/finance/page.tsx`** — replace the existing "licensing"
   section body (lines ~106-118) with `<EquippedLicensingBlock variant="commercial" />`.
   Remove the `TODO(equipped-phase1)` marker.
   - Success: `grep -n "TODO(equipped-phase1)" app/finance/page.tsx` returns nothing.

5. **Update `app/contractor/equipment-finance/page.tsx`** — same treatment,
   `variant="contractor"`.
   - Success: same grep check on that file.

6. **Bump `EQUIPPED_CONSENT_VERSION`** from `v1.0-2026-04-23` to
   `v1.1-2026-04-25` in `src/components/finance/EquippedConsentForm.tsx`.
   - Success: `grep -n "EQUIPPED_CONSENT_VERSION" src/components/finance/EquippedConsentForm.tsx`
     shows the new string.

7. **Run `npx tsc --noEmit`** — must exit 0.

8. **Run `npx vitest run`** — must stay green (109 tests or more).

9. **Local dev smoke test** — `npm run dev`, then `curl -I http://localhost:3000/finance/credit-guide-equipped-v17-202307.pdf`
   returns HTTP 200. Same for the privacy PDF.
   (Skipped if dev server not started; HTTP 404→200 is obvious post-commit.)

10. **Commit on branch `loop/2026-04-25-equipped-phase1-pdf-fill`**, push,
    PR, squash-merge with `--admin --delete-branch`.
    - Success: `gh pr view <N>` shows merged.

## Token budget

Estimated 15k tokens end-to-end. Below the PRD default.

## File territory

(Copied from `02-interface.md` for explicitness.)

- `public/finance/*.pdf` (new)
- `docs/partners/equipped/recoverycapital-base44.pdf` (overwrite)
- `src/components/finance/EquippedLicensingBlock.tsx` (new)
- `src/components/finance/EquippedConsentForm.tsx` (version bump line)
- `app/finance/page.tsx` (licensing section)
- `app/contractor/equipment-finance/page.tsx` (licensing section)

## Exit gate

- [x] Numbered steps ≤10.
- [x] Each step has a success signal.
- [x] Budget under 8 focused hours.

**Proceed to Phase 4 — Implement.**
