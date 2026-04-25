# Phase 5 — Test results

**Loop:** `2026-04-25-m365-dkim-enable`

## Test matrix

| Signal | Expected | Result |
| ------ | -------- | ------ |
| `nslookup -type=CNAME selector1._domainkey.carsi.com.au 8.8.8.8` | resolves to `selector1-carsi-com-au._domainkey.netorgft6483632.onmicrosoft.com` | ✅ |
| `nslookup -type=CNAME selector2._domainkey.carsi.com.au 8.8.8.8` | resolves (added mid-loop) | ✅ (propagated in ~2 min after add) |
| `nslookup -type=TXT selector1-carsi-com-au._domainkey.netorgft6483632.onmicrosoft.com 8.8.8.8` | real RSA public key published | ✅ `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxjqxYgZrTFiSX6m7...AQAB;` |
| `nslookup -type=TXT selector2-carsi-com-au._domainkey.netorgft6483632.onmicrosoft.com 8.8.8.8` | published (not blocking) | ⚠️ NXDOMAIN — see residual debt |
| Test mail sent from phill.m@carsi.com.au → phill.mcgurk@gmail.com | delivered | ✅ (Phill reports received) |
| Gmail "Show original" SPF | PASS | ✅ PASS with IP `2a01:111:f403:c40d:0:0:0:4` |
| Gmail "Show original" DKIM | PASS on `d=carsi.com.au s=selector1` | ✅ `dkim=pass header.i=@carsi.com.au header.s=selector1 header.b=GzGelyDy` |
| Gmail "Show original" DMARC | FAIL (expected — no DMARC record) | ⚠️ FAIL — follow-up loop |
| `DKIM-Signature` header present on message | yes | ✅ `v=1; a=rsa-sha256; d=carsi.com.au; s=selector1` |

## Summary

DKIM signing is **active** for outbound mail from `phill.m@carsi.com.au`.
Verification at Gmail succeeds. Loop primary objective met.

## Residual (tracked)

1. **selector2 target TXT NXDOMAIN at Microsoft.** Microsoft has not yet
   published the selector2 public key in its `.onmicrosoft.com` zone.
   Impact: when Microsoft's key rotation cycles from selector1 → selector2,
   DKIM verification will temporarily fail until the selector2 key is
   generated. Microsoft auto-publishes selector2 on the next rotation, so
   this self-heals.
   **Decision:** accept as low-risk residual.

2. **DMARC record missing.** Gmail returns `dmarc=fail` because
   `carsi.com.au` has no DMARC TXT record published. SPF + DKIM pass
   individually, so the failure is purely "no policy to enforce" —
   recipient servers still accept the mail.
   **Decision:** spawn a follow-up loop `2026-04-26-carsi-dmarc-publish`
   (p=none initially, monitor via reports, then harden).

3. **mail-tester.com run skipped** because in-session DKIM pass via Gmail
   headers is already the ground truth. mail-tester would add a
   deliverability score but wouldn't change the DKIM verdict.
   **Decision:** optional for Phill to run post-loop if he wants a belt-
   and-braces number.

## Exit gate

- [x] Every primary success signal passes.
- [x] Residual items documented.

**Proceed to Phase 6 — Review.**
