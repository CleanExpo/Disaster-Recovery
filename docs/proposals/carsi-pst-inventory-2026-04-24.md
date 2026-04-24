# Carsi.com.au PST Recovery Inventory — 24/04/2026

**File inspected:** `C:\Users\Phill\OneDrive - Disaster Recovery\Documents\Outlook Files\archive.pst`
**Size:** 1,259,111,424 bytes (~1.20 GB)
**Last modified:** 30/10/2025
**PST format:** Valid Unicode PST (header magic `!BDN` confirmed)
**Inspection date:** 24/04/2026 (AEST)

> **NOT LEGAL ADVICE.** This is a technical inventory for personal records recovery. Decisions about email retention, evidentiary use, or third-party disclosure require independent legal counsel.

## Verdict

**INCONCLUSIVE — manual Outlook desktop inspection required.**

Two automated approaches were attempted and both failed for environmental reasons unrelated to the PST itself. The PST file is structurally intact but its contents could not be enumerated programmatically from this session.

## What was attempted

### 1. Outlook COM automation (PowerShell)

Two scripts (`scripts/pst-inventory.ps1`, `scripts/pst-inventory-v2.ps1`) tried to:

- Instantiate `Outlook.Application` COM object
- Open MAPI namespace and add the PST as a temporary store via `Session.AddStore()`
- Walk every folder, count messages, and extract sender/recipient SMTP addresses
- Cleanly call `Session.RemoveStore()` on completion

**Result:** Both runs failed at the `Namespace.Logon()` step with COM error:

```
Cannot complete the operation. You are not connected.
```

The default Outlook profile (`HKCU\Software\Microsoft\Office\16.0\Outlook\Profiles\Outlook`) is in a disconnected state — likely a side effect of the GoDaddy/M365 mailbox re-provisioning on 23/04/2026. Outlook needs to complete an interactive sign-in or profile repair before COM automation will work. The Outlook process started but stalled with no working set growth and never advanced past namespace logon.

### 2. Pure-Python PST parsing

Tried `libratom`, `libpff-python`, `pypff`, `pypff-python`, `pypff-windows`, `pst-utils` — all either lack precompiled wheels for Python 3.13.5 or require a local C build that fails on `setuptools.build_meta` resolution. No usable PST parser is installable without a downgrade to Python 3.11.

### 3. Read-only binary scan (fallback evidence)

A streaming byte-level scan (`scripts/pst-scan.py`, `scripts/pst-sanity.py`) read all 1.2 GB of the PST searching for `carsi.com.au` in both ASCII and UTF-16LE encodings.

| Metric                              | Result                                  |
| ----------------------------------- | --------------------------------------- |
| `carsi.com.au` ASCII byte matches   | **0**                                   |
| `carsi.com.au` UTF-16LE matches     | **0**                                   |
| Plausible email-like patterns total | 3 (all garbage: `e.fz`, `e.tv`, `h.rb`) |

**Caveat:** This negative result is **not authoritative.** Modern Unicode PSTs store message bodies and many header fields in proprietary internal encodings (NDB / permutative byte-permutation page-level compression). Plain-text byte scans cannot see addresses inside those structures. The fact that the scan also found essentially zero readable email addresses anywhere in the file confirms that PST internal encoding is in effect — **a true negative cannot be inferred from this scan**.

## Recommended next steps (manual, ~15 min)

1. **Repair the Outlook profile** — open Outlook, complete the sign-in / profile repair flow when prompted. Once Outlook can launch normally, the COM scripts in `scripts/pst-inventory-v2.ps1` will run end-to-end (≈5–10 min for a 1.2 GB PST) and produce `scripts/pst-inventory-result.json` with full sender breakdown.
2. **Or** open the PST directly in Outlook (File → Open & Export → Open Outlook Data File) and use Outlook search for `from:@carsi.com.au` and `to:@carsi.com.au`. Filter the result list by date for earliest/latest.
3. **Or** install Python 3.11 locally (`winget install Python.Python.3.11`), then `pip install libratom`, then re-run a Python-based inventory script.

## Files produced this session

- `scripts/pst-inventory.ps1` — COM inventory (v1, full enumeration)
- `scripts/pst-inventory-v2.ps1` — COM inventory with explicit `Logon` (v2)
- `scripts/pst-scan.py` — read-only `carsi.com.au` byte-string scanner
- `scripts/pst-sanity.py` — methodology validator (proved PST is internally encoded)

## Confidentiality

The PST was opened **read-only** at all times. No content was transmitted off-machine, no Outlook store was added persistently (both COM attempts failed before any store was registered), and no email was sent or modified. The PST file timestamp and size are unchanged from pre-inspection.
