# Loop — carsi.com.au DMARC publish

**Loop id:** `2026-04-26-carsi-dmarc-publish`
**Created:** 2026-04-25
**Owner:** Phill McGurk
**Priority:** Low — deliverability polish, not blocking mail flow.

## The ask

> Loop L3 (`2026-04-25-m365-dkim-enable`) achieved DKIM PASS for
> carsi.com.au, but Gmail reports `DMARC: FAIL` because there is no DMARC
> TXT record published. Publish a DMARC record so recipients see
> `DMARC: PASS`.

## Restated in my words

Add a DMARC policy to DigitalOcean DNS for carsi.com.au. Start at
`p=none` with reporting enabled so we can see any alignment failures in
aggregate reports before tightening to `p=quarantine` → `p=reject`.

## Context links

- Loop L3 handoff: `docs/prd/loops/2026-04-25-m365-dkim-enable/07-handoff.md`
- Microsoft DMARC guide:
  `https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dmarc-configure`
- DMARC record format:
  `_dmarc.carsi.com.au TXT "v=DMARC1; p=none; rua=mailto:dmarc@carsi.com.au; adkim=s; aspf=s;"`

## Exit criteria

- [ ] `_dmarc.carsi.com.au` TXT record exists in DO.
- [ ] `nslookup -type=TXT _dmarc.carsi.com.au 8.8.8.8` returns the policy.
- [ ] Test mail from phill.m@carsi.com.au → Gmail shows
      `dmarc=pass` in "Show original".
- [ ] Decision recorded for the aggregate-report inbox (can be
      `phill.m@carsi.com.au` initially; rotate to a dedicated address
      later if volume grows).

## Blockers / prerequisites

- None. Straight DNS add.

## Out of scope

- Tightening `p=none` → `p=quarantine` / `p=reject`. Do that in a future
  loop once reports confirm alignment is clean for 2-4 weeks.
- DMARC on disasterrecovery.com.au — separate loop if Phill wants it.
- BIMI (brand indicator logos). Separate loop.

## Notes for Phase 1 (grill-me)

- Which address should receive aggregate (`rua=`) and forensic (`ruf=`)
  reports? Start with `dmarc@carsi.com.au` if it exists, else
  `phill.m@carsi.com.au`. Forensic reports are noisy — consider omitting
  `ruf=` initially.
- `sp=` (subdomain policy) — default matches `p=` if omitted. For Phase 1
  keep it omitted to inherit.
- `adkim=s` (strict DKIM alignment) requires `d=carsi.com.au` on the
  DKIM signature — which we already have (verified in L3).
- `aspf=s` (strict SPF alignment) requires `From:` domain to match
  `Return-Path:` — Microsoft uses `smtp.mailfrom=carsi.com.au` so this
  should pass. If it fails after publish, switch to `aspf=r` (relaxed).
