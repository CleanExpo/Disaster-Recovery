# Phase 5 — Test Results

**Loop:** `2026-04-26-carsi-dmarc-publish`

## DNS publish

- **DO DNS zone:** carsi.com.au
- **Record added:** TXT `_dmarc` = `v=DMARC1; p=none; rua=mailto:phill.m@carsi.com.au; adkim=s; aspf=s; fo=1`
- **TTL:** 3600 (DO default)
- **Toast:** "Domain record created successfully" ✅

## Propagation verification

### nslookup against 8.8.8.8

```
> nslookup -type=TXT _dmarc.carsi.com.au 8.8.8.8
_dmarc.carsi.com.au  text = "v=DMARC1; p=none; rua=mailto:phill.m@carsi.com.au; adkim=s; aspf=s; fo=1"
```

Exact string match. ✅

### MXToolbox public validator

- **URL:** `https://mxtoolbox.com/SuperTool.aspx?action=dmarc:carsi.com.au`
- **Result:** "DMARC Record Published" — Status **OK**
- **Parsed record fields:**
  - `v=DMARC1` ✅
  - `p=none` ✅ (expected; observability phase)
  - `rua=mailto:phill.m@carsi.com.au` ✅
  - `adkim=s` ✅
  - `aspf=s` ✅
  - `fo=1` ✅
- **Warnings:** one informational — `p=none` means recipients will not quarantine/reject. Expected per Phase 1 decision.

## End-to-end DMARC=PASS on Gmail headers

**Status:** deferred.

- Pre-DMARC test email (06:39 AEST, before record was live) exists in Gmail and — as expected — shows DMARC=FAIL.
- Post-DMARC verification send from `phill.m@carsi.com.au` blocked at the MUA step: OWA session expired and Claude cannot type passwords per safety rules.
- The DMARC record itself is live, syntactically correct, and validated by an independent third-party tool (MXToolbox). The `DMARC: PASS` header line is a downstream confirmation — not the record's existence.

**Evidence the next organic email from `phill.m@carsi.com.au` will show `DMARC: PASS`:**

1. L3 already verified SPF=PASS and DKIM=PASS (both selectors) on a real send.
2. Alignment: From domain = envelope-from domain = DKIM d= domain = `carsi.com.au`. Strict alignment satisfied.
3. DMARC record now present and parsed OK.

Phill will confirm `DMARC: PASS` on the next real email he sends from the address; if it doesn't pass, open a remediation loop.

## Verification contract — status

| Check                                                                 | Status                           |
| --------------------------------------------------------------------- | -------------------------------- |
| `nslookup -type=TXT _dmarc.carsi.com.au 8.8.8.8` returns exact string | ✅                               |
| MXToolbox "DMARC Record Published" OK                                 | ✅                               |
| Gmail "Show original" shows `DMARC: PASS` on fresh send               | ⏳ deferred to next organic send |

## Exit gate

- [x] Record live and globally resolvable.
- [x] Record syntactically correct (third-party validator).
- [ ] DMARC=PASS confirmed on real Gmail headers (deferred; not blocking).

**Proceed to Phase 6 — Review.**
