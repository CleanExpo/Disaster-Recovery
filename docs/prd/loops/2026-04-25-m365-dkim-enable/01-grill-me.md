# Phase 1 — Grill Me

**Loop:** `2026-04-25-m365-dkim-enable`
**Skill invoked:** `grill-me`.

## Q1 — Has DNS propagated?

**A:** Mixed. Live `nslookup` at phase 1 kickoff:

- `selector1._domainkey.carsi.com.au` → **resolves** to
  `selector1-carsi-com-au._domainkey.netorgft6483632.onmicrosoft.com` ✓
- `selector2._domainkey.carsi.com.au` → **NXDOMAIN** ✗

**Diagnosis:** when the batch-click added both selectors via Chrome yesterday,
the screenshot timed out after the second Create Record click. I could not
verify at the time. nslookup now confirms selector2 did NOT save to
DigitalOcean.

**Decision:** this loop now has an implicit sub-step — create the selector2
CNAME in DO before the M365 enable can proceed.

## Q2 — What does Microsoft need to accept the DKIM toggle?

**A:** Both CNAMEs must resolve end-to-end for Defender's
`publish selector` check to succeed. If only selector1 is present,
Defender will refuse to enable signing (it needs both selectors for key
rotation). We therefore must land selector2 FIRST, wait for propagation,
then flip the toggle.

## Q3 — Which tenant admin account logs into `security.microsoft.com/dkimv2`?

**A:** Unknown. Candidates:
- `phill.m@carsi.com.au` (the renamed mailbox — may not have admin scope)
- A separate carsi tenant global-admin UPN
- The GoDaddy Email Essentials admin view, which has a shortcut to DKIM
  under Advanced Email Security

**Decision:** start with GoDaddy → Email & Office → Advanced Email Security
(we saw "Advanced Email Security" as a sidebar option in the Apr 24
session). That route works from the already-logged-in GoDaddy account
and avoids a separate Microsoft login.

If that path doesn't expose the DKIM toggle, fall back to Microsoft 365
Defender with the carsi tenant admin.

## Q4 — What's the verification test?

**A:**
1. `nslookup -type=CNAME selector1._domainkey.carsi.com.au 8.8.8.8` — CNAME present
2. `nslookup -type=CNAME selector2._domainkey.carsi.com.au 8.8.8.8` — CNAME present
3. Send a test email from phill.m@carsi.com.au → phill.mcgurk@gmail.com
4. In Gmail, click "Show original" on the test message; confirm
   `dkim=pass` appears for `carsi.com.au`
5. Send a fresh mail to `test-<random>@mail-tester.com` and check the
   report; target ≥ 8/10 (DKIM + SPF + DMARC pass; DMARC may still be
   missing — that's a later loop)

## Q5 — What if Defender can enable for only selector1 and rotate to
selector2 later?

**A:** Microsoft supports this as a graceful degradation, but it's not the
recommended setup. The correct posture is "both selectors published + enable
key rotation" — rotation requires the inactive selector to already be
publishable. Given we're adding selector2 anyway, no need to degrade.

## Q6 — Do we need a DMARC record?

**A:** Out of scope for THIS loop. SPF + DKIM alone will drop the
`mail-tester` score by about 1 (missing DMARC is a ~0.5 point deduction, not
blocking the 8/10 target). DMARC is a separate follow-up loop.

## Open questions at exit gate

**None.** Proceed to Phase 2.
