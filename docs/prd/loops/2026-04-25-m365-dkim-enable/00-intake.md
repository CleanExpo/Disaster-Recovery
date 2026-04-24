# Loop L3 — Enable DKIM signing in Microsoft 365

**Loop id:** `2026-04-25-m365-dkim-enable`
**Created:** 2026-04-25
**Owner:** Phill McGurk
**Priority:** Medium — improves outbound deliverability from
phill.m@carsi.com.au + support@carsi.com.au.

## The ask

> DKIM CNAMEs were added to DigitalOcean DNS for carsi.com.au on 24 April
> (selector1 + selector2 → NETORGFT6483632.onmicrosoft.com). Microsoft 365
> signing toggle still needs to be enabled in the Defender portal.

## Restated in my words

Verify DO DNS has propagated the two DKIM CNAME records. Log into the
Microsoft 365 Defender portal as a carsi tenant admin. Enable DKIM for
carsi.com.au on both selectors. Verify outbound mail now carries a valid
DKIM-Signature header.

## Context links

- DO DNS records (added 24 April):
  - `selector1._domainkey.carsi.com.au` → `selector1-carsi-com-au._domainkey.NETORGFT6483632.onmicrosoft.com`
  - `selector2._domainkey.carsi.com.au` → `selector2-carsi-com-au._domainkey.NETORGFT6483632.onmicrosoft.com`
- Microsoft Defender DKIM settings:
  `https://security.microsoft.com/dkimv2` (requires carsi tenant admin
  login)
- `docs/proposals/session-wrap-2026-04-24.md` — carsi email session context

## Exit criteria

- [ ] `nslookup -type=CNAME selector1._domainkey.carsi.com.au 8.8.8.8`
      resolves (DNS propagation confirmed).
- [ ] `nslookup -type=CNAME selector2._domainkey.carsi.com.au 8.8.8.8`
      resolves.
- [ ] DKIM signing enabled in Microsoft Defender for carsi.com.au.
- [ ] Test email sent phill.m@carsi.com.au → phill.mcgurk@gmail.com.
- [ ] Gmail "Show original" displays `dkim=pass` on the test message.
- [ ] Run `mail-tester.com` (send a fresh mail) and confirm score ≥ 8/10.

## Blockers / prerequisites

- DNS propagation — ~30 min after the 24 April add.
- Phill logs into Microsoft Defender portal as carsi tenant admin.

## Out of scope

- DMARC record (separate loop if needed — DKIM is the prerequisite).
- SPF update (already correct).
- DKIM on disasterrecovery.com.au mailboxes (different tenant, separate
  loop).

## Notes for Phase 1 (grill-me)

- Does carsi tenant admin access work with phill.m@carsi.com.au, or does
  it require a separate admin UPN?
- If Defender rejects the enable toggle with "CNAME not found", wait
  another 30 min and retry. Don't re-create DNS records.

## Notes for Phase 4 (implement)

- Non-code loop. Browser-driven via Chrome + verification via `nslookup`.
- Output is a short confirmation note in 07-handoff.md + the mail-tester
  score.
