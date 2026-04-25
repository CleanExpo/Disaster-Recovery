# Phase 3 — Plan

**Loop:** `2026-04-26-carsi-dmarc-publish`

## Numbered steps

1. **Navigate DO to carsi.com.au zone** (Chrome).
   - Success: domain records page loads.

2. **Open Create a record form.**
   - Success: modal with Record Type dropdown.

3. **Select TXT.**
   - Success: form shows Hostname + Value fields.

4. **Fill:**
   - Hostname: `_dmarc`
   - Value: `v=DMARC1; p=none; rua=mailto:phill.m@carsi.com.au; adkim=s; aspf=s; fo=1`
   - TTL: 3600 (default)
   - Success: Create Record button enabled.

5. **Submit + verify toast.**
   - Success: green "Domain record created successfully".

6. **Wait for propagation + nslookup.**
   - Success: `nslookup -type=TXT _dmarc.carsi.com.au 8.8.8.8` returns
     the exact TXT string.

7. **Send test email** phill.m@carsi.com.au → phill.mcgurk@gmail.com.
   - Success: email delivered.

8. **Gmail "Show original" verification.**
   - Success: `DMARC: PASS` at the top summary.

9. **Write loop artefacts** (05-test-results.md, 06-review.md,
   07-handoff.md).

10. **Commit + PR + merge** on `loop/2026-04-26-carsi-dmarc-publish`.

## Token budget

~8k — smallest loop yet (one DNS record + verification).

## File territory

- Loop artefacts only. No repo code.

**Proceed to Phase 4 — Implement.**
