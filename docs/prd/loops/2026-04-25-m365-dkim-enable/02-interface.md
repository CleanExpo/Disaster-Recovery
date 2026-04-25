# Phase 2 — Design-an-Interface

**Loop:** `2026-04-25-m365-dkim-enable`
**Skill invoked:** `design-an-interface` (minimal — non-code loop).

## External interfaces touched

| System | Mutation |
| ------ | -------- |
| DigitalOcean DNS (carsi.com.au zone) | Add 1 × CNAME (selector2) |
| Microsoft 365 Defender (carsi tenant) | Toggle DKIM signing on for carsi.com.au |
| DNS resolvers (Google 8.8.8.8) | Read-only verification |
| Gmail (phill.mcgurk@gmail.com) | Read-only — "Show original" |
| `mail-tester.com` | Read-only — single test email score |

## DNS record to add

```
Type:     CNAME
Hostname: selector2._domainkey
Value:    selector2-carsi-com-au._domainkey.NETORGFT6483632.onmicrosoft.com
TTL:      3600 (default)
```

## M365 Defender toggle

Path: `https://security.microsoft.com/dkimv2` → Domains → `carsi.com.au`
→ **Enable** (applies to both selectors simultaneously).

Prerequisite: both CNAMEs resolve. If either missing, Defender returns
"No CNAME record found for this configuration" and refuses.

## Verification contract

`07-handoff.md` must contain:
- nslookup evidence for both selectors
- mail-tester.com score URL
- Screenshot of Gmail "Show original" showing `dkim=pass`

## Territory claimed

- DO DNS zone for `carsi.com.au` (add selector2 only; no other records touched)
- No repo files (loop is non-code except for the loop artefact docs)

## Exit gate

- [x] External interfaces mapped
- [x] DNS record structured
- [x] Verification contract explicit

**Proceed to Phase 3 — Plan.**
