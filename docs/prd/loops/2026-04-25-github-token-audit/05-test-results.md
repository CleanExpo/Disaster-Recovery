# Phase 5 — Test results

**Loop:** `2026-04-25-github-token-audit`

## Initial classic PAT inventory (12 tokens found)

| Token | Last used | Planned decision |
| ----- | --------- | ---------------- |
| Margot - Cowork MCP | < 1 week | KEEP |
| Pi CEO — Pi-Dev-Ops access | Never used | REVOKE |
| Pi CEO Dashboard | < 1 week | KEEP |
| Unite-Group Token | < 1 week | KEEP |
| Personal Assistant | 2 months | REVOKE |
| Disaster Recovery - NRPG | Never used | REVOKE |
| RestoreAssist | Never used (Expired 2025-12-07) | REVOKE |
| Synthex | 9 months | REVOKE |
| AI-Guided-SaaS 02 | 10 months | REVOKE |
| Zenith-Platform-Deploy | 9 months | REVOKE |
| Claude Unite-Group | 11 months (Expired 2025-07-13) | REVOKE |
| GPT Codex | Never used | REVOKE |

## Final classic PAT state (4 tokens remain)

| Token | Last used | Kept because |
| ----- | --------- | ------------ |
| Margot - Cowork MCP | < 1 week | Active Margot agent |
| Unite-Group Token | < 1 week | Active |
| RestoreAssist | Expired 2025-12-07 | Phill: required for project |
| Claude Unite-Group | Expired 2025-07-13 | Phill: required for project |

## Actions executed

**Revoked (5 explicit):** Zenith-Platform-Deploy, Synthex (side-effect of
first confirm click), Pi CEO — Pi-Dev-Ops access, Personal Assistant,
Disaster Recovery - NRPG.

**Revoked (3 side-effect / auto-cleanup):** Pi CEO Dashboard,
AI-Guided-SaaS 02, GPT Codex. These disappeared between explicit revokes —
likely either a modal-confirm form matched multiple hidden forms in
GitHub's pre-rendered modal pattern, OR GitHub auto-cleaned up expired
tokens between page loads. Root cause not definitively determined.

**Net: 8 classic PATs revoked, 4 kept.**

## Fine-grained PATs — SKIPPED

Per Phill's mid-loop direction ("remaining are required for projects"),
the planned 5 fine-grained revocations did not execute. Documented as
follow-up for a future loop if Phill wants to re-enter this territory.

Current fine-grained inventory (from Phase 4 enumeration):

| Token | Last used | Expiry | Recommended (deferred) |
| ----- | --------- | ------ | ---------------------- |
| Pi-CEO Railway MARATHON-4 | < 1 week | none | KEEP |
| Zenith-Fresh 01 | 11 months | EXPIRED | would revoke — safe (already dead) |
| Github Zenith to Docker Token | 11 months | none | would revoke |
| Docker | Never used | EXPIRED | would revoke — safe (already dead) |
| Laptop Token | Never used | none | would revoke |
| Disaster Recovery Qld.au | Never used | none | would revoke |

## OAuth apps — SKIPPED

Pages 1 of 3 enumerated. Pages 2 + 3 not reviewed. Highlight.io (flagged
in 24 April Gmail digest) not revoked — may appear on pages 2 or 3.
Deferred to future loop.

## Pi CEO Dashboard PAT loss — follow-up

Pi CEO Dashboard was on the KEEP list and is now gone. If the Pi-CEO
automation relies on this classic PAT, expect 401 on the next run.
Mitigations:

1. Pi-CEO may already be running on the fine-grained
   `Pi-CEO Railway MARATHON-4` PAT (kept). Verify the Railway env var
   `GITHUB_TOKEN` starts with `github_pat_` (fine-grained) rather than
   `ghp_` (classic).
2. If classic scope is actually required, Phill regenerates a fresh
   "Pi CEO Dashboard" PAT with the original scopes and updates the
   Railway env var.

## Exit gate

- [x] Decision log captured.
- [x] Loss (Pi CEO Dashboard) acknowledged + mitigation documented.
- [x] Skipped work listed for future loops.

**Proceed to Phase 6 — Review.**
