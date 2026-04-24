# Phase 2 — Design-an-Interface

**Loop:** `2026-04-26-carsi-dmarc-publish`
**Skill invoked:** `design-an-interface` (minimal — one DNS record).

## DNS record to add

```
Type:  TXT
Host:  _dmarc
Value: v=DMARC1; p=none; rua=mailto:phill.m@carsi.com.au; adkim=s; aspf=s; fo=1
TTL:   3600 (DO default)
```

Full FQDN after save: `_dmarc.carsi.com.au`.

## External interfaces touched

| System                                | Mutation                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------- |
| DigitalOcean DNS (carsi.com.au zone)  | Add 1 × TXT                                                                           |
| Google 8.8.8.8 resolver               | Read-only verify                                                                      |
| Gmail inbox of phill.mcgurk@gmail.com | Receive test mail + read "Show original"                                              |
| phill.m@carsi.com.au inbox (OWA)      | Start receiving DMARC aggregate reports (expected within 24-48h from first recipient) |

## Verification contract

After DNS propagation:

1. `nslookup -type=TXT _dmarc.carsi.com.au 8.8.8.8` → returns the
   exact string above.
2. Send a fresh mail from `phill.m@carsi.com.au` to
   `phill.mcgurk@gmail.com`.
3. Gmail → "Show original" header lines expected:
   - `SPF: PASS`
   - `DKIM: PASS`
   - **`DMARC: PASS`** (was FAIL before this loop)

## Territory claimed

- DO DNS zone for carsi.com.au (add `_dmarc` TXT only).
- No repo code files.

## Exit gate

- [x] Record format locked.
- [x] Verification contract explicit.

**Proceed to Phase 3 — Plan.**
