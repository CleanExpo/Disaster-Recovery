# Phase 1 — Grill Me

**Loop:** `2026-04-26-carsi-dmarc-publish`
**Skill invoked:** `grill-me`.

## Q1 — What policy level? p=none / p=quarantine / p=reject?

**A:** `p=none`. Rationale:

- First DMARC record ever on carsi.com.au → unknown how well SPF + DKIM
  align in practice (ARC chains, forwarders, list expansion, etc.).
- `p=none` is pure observability — doesn't instruct recipients to
  quarantine or reject. If alignment breaks, mail still flows.
- Collect aggregate reports for 2-4 weeks → review → tighten to
  `p=quarantine pct=10%` gradually, eventually `p=reject`.

## Q2 — Where do aggregate (`rua=`) reports go?

**A:** Candidates:

- `dmarc@carsi.com.au` — dedicated; doesn't exist yet; requires creating
  a mailbox (paid seat on GoDaddy Email Essentials).
- `phill.m@carsi.com.au` — exists; volume could clutter his inbox.
- `admin@disasterrecovery.com.au` — exists; different domain → per
  DMARC RFC 7489, reports to OTHER domains require a verification
  record on that domain (more DNS work).

**Decision:** start with `phill.m@carsi.com.au`. Simple. No extra
mailbox cost. If volume becomes noisy, rotate to `dmarc@carsi.com.au`
or pipe through a third-party service like dmarcian / Postmark /
EasyDMARC.

## Q3 — Include forensic (`ruf=`)?

**A:** No for Phase 1. Forensic reports include full failing-message
headers (+ sometimes body fragments), which:

- Can leak customer PII if an authorised sender's mail fails.
- Usually dwarfs aggregate volume.
- Most providers default to aggregate-only anyway.

Omit `ruf=` from the initial record. Revisit if aggregate reports
point at a specific failing sender.

## Q4 — Alignment mode: strict or relaxed?

**A:** `adkim=s aspf=s` (strict). Rationale:

- L3 already verified DKIM signs with `d=carsi.com.au` exactly matching
  `From:` domain — strict DKIM passes.
- Microsoft's SPF pass path is `smtp.mailfrom=carsi.com.au`, exactly
  matching. Strict SPF passes.
- Strict is the more secure default; if we find a legit sender failing
  strict alignment, we loosen it at that point (relaxed = `r`).

## Q5 — Subdomain policy `sp=`?

**A:** Omit. When omitted, `sp=` inherits from `p=`, so subdomain mail
gets the same `p=none` observability. No subdomains currently send
mail as far as Phill is aware — if any appear in reports, revisit.

## Q6 — Percentage `pct=`?

**A:** Omit (= 100, DMARC default). With `p=none` the percentage is
moot anyway — "0% of 0% gets rejected" either way. `pct=` only bites
when tightening to quarantine/reject.

## Q7 — What's the final record string?

**A:**

```
Type:  TXT
Host:  _dmarc
Value: v=DMARC1; p=none; rua=mailto:phill.m@carsi.com.au; adkim=s; aspf=s; fo=1
```

Notes:

- `fo=1` requests forensic reports on ANY (SPF or DKIM) alignment
  failure, not just both. Useful diagnostic WITHOUT actually
  receiving forensics (we have no `ruf=`). Won't trigger anything
  by itself — it's a flag to report generators.
- TTL: use DO default (3600s). Short enough to iterate.

## Open questions at exit gate

None.

## Decisions recorded

All above. No ADR needed — DNS ops, not architectural.

**Proceed to Phase 2 — Design-an-Interface.**
