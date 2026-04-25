# Phase 3 — Plan

**Loop:** `2026-04-25-m365-dkim-enable`

## Numbered steps

1. **Open DO carsi.com.au zone** in Chrome.
   - Success: page loads showing existing records + the selector1 CNAME
     that was correctly added on 24 April.

2. **Add selector2 CNAME** per the interface in `02-interface.md`.
   - Success: green "Domain record created successfully" toast.

3. **Wait + verify propagation.**
   - Success: `nslookup -type=CNAME selector2._domainkey.carsi.com.au 8.8.8.8`
     returns a CNAME answer pointing at `selector2-carsi-com-au._domainkey.netorgft6483632.onmicrosoft.com`.
   - Typical time: 1-5 min for DO's default TTL of 3600s.

4. **Navigate to DKIM toggle.** Try GoDaddy Email Essentials →
   Advanced Email Security first. If DKIM not surfaced there, fall back to
   `https://security.microsoft.com/dkimv2`.
   - Success: page shows carsi.com.au listed with a DKIM status.

5. **Phill logs in** with carsi tenant admin credentials. Explicit password
   rule: I do not type passwords. Phill enters them.
   - Success: user lands on the DKIM management page.

6. **Toggle DKIM signing ON** for carsi.com.au.
   - Success: confirmation that signing is enabled for both selectors.

7. **Send test email** phill.m@carsi.com.au → phill.mcgurk@gmail.com.
   - Success: email delivered.

8. **"Show original"** in Gmail; grep for `dkim=pass`.
   - Success: header shows `dkim=pass header.i=@carsi.com.au`.

9. **mail-tester.com** — send a fresh mail to a fresh
   `test-<random>@mail-tester.com` address; capture the report URL.
   - Success: score ≥ 8/10.

10. **Write loop artefacts** (`05-test-results.md`, `06-review.md`,
    `07-handoff.md`), commit, PR, merge, sync main.
    - Success: `gh pr view <N>` shows merged.

## Token budget

Estimated 10k tokens. Under PRD default of 8k for a browser-driven loop (the
primary Implement phase is external — most tokens go into documenting, not
instruction).

## File territory

- `docs/prd/loops/2026-04-25-m365-dkim-enable/*.md` (loop artefacts only)
- **No code files touched** by this loop.

## Exit gate

- [x] Steps ≤10.
- [x] Each step has a success signal.
- [x] Budget below cap.

**Proceed to Phase 4 — Implement.**
