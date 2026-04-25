# Phase 3 — Plan

**Loop:** `2026-04-25-github-token-audit`

## Numbered steps

1. **Navigate to classic PAT list** (`https://github.com/settings/tokens`).
   - Success: page shows the list of classic PATs.

2. **Enumerate classic PATs** — capture name, scopes, last-used, age for
   each. Push this into the `07-handoff.md` tokens table.
   - Success: every row in the GitHub list appears in the log.

3. **Navigate to fine-grained PAT tab** (same URL, different selector).
   - Success: fine-grained list visible.

4. **Enumerate fine-grained PATs** — same capture.
   - Success: every row logged.

5. **Apply the decision rule** per `01-grill-me.md` Q1:
   - Last used > 30 days + not in the known-good list → REVOKE.
   - 7-30 days → KEEP but flag for next audit.
   - < 7 days → KEEP (active work).
   Phill confirms each REVOKE before click.

6. **For each REVOKE decision:** click Delete → confirm in the
   modal. Record the revocation timestamp in the log.
   - Success: token no longer in the list.

7. **Navigate to OAuth applications** (`https://github.com/settings/applications`).
   - Success: OAuth apps list visible.

8. **Enumerate OAuth apps** — push each to the OAuth table with decisions:
   - Known-good (Vercel, Linear, CodeRabbit, bolt.new) → KEEP.
   - Suspect (Cloudflare, highlight.io if not recognised) → Phill
     confirms REVOKE.

9. **For each REVOKE:** click Revoke → confirm.
   - Success: app no longer authorised.

10. **Post-revocation sanity check:** if any revoked token name contained
    "Vercel", "Railway", or matched a known CI worker → check Vercel
    project env vars + GitHub Actions secrets for matching names. Rotate
    if needed. (Likely zero in this sweep; decision-rule keeps the
    known-good automation PATs.)

11. **Write `07-handoff.md`** with the full decision log.

12. **Commit + PR + merge** on branch `loop/2026-04-25-github-token-audit`.
    The PR is doc-only (the decision log); no code changes.

## Token budget

Estimated 12k. Under PRD default for an ops loop.

## File territory

- `docs/prd/loops/2026-04-25-github-token-audit/*.md` only.
- No code touched.

## Exit gate

- [x] Steps numbered.
- [x] Success signals clear.
- [x] Decision rule defined.

**Proceed to Phase 4 — Implement.**
