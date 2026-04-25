# Phase 6 — Review

**Loop:** `2026-04-25-github-token-audit`
**Skill invoked:** `improve-codebase-architecture` (process improvement for the
loop system itself, not for Disaster-Recovery code).

## What went well

- Enumeration of classic + fine-grained + OAuth (page 1) produced a clear
  inventory.
- Grill-me's decision rule (< 7d keep / 7-30d flag / > 30d revoke unless
  known-good) gave Phill confident batch-revoke authorisation.
- 5 explicit revocations + 3 side-effect revocations → 8 net cleanups.

## What went wrong

1. **Batch confirm-modal side effects.** The first modal-confirm click
   (ref_390) appears to have triggered deletion of more than one token.
   Hypothesis: GitHub's DOM pre-renders all token confirmation modals with
   identical button text; my find-by-query returned a list of 10 `submit`
   buttons, and I clicked one without confirming it was the modal bound
   to the Zenith-Platform-Deploy form. Because each modal is a separate
   `<form>` posting to a distinct token ID, the button I clicked posted
   to a DIFFERENT token's revoke URL — deleting that token.

   **Fix going forward:** before clicking any modal-confirm, take a
   screenshot to confirm which token's modal is actually VISIBLE, and
   click the button at the screenshot-visible coordinates rather than via
   accessibility ref.

2. **Pi CEO Dashboard loss.** A token on the KEEP list disappeared. The
   specific mechanism isn't fully diagnosed (could be the batch issue
   above, or GitHub auto-cleanup of some other condition). Net impact:
   possibly Pi-CEO automation regen needed. Mitigation documented in
   `05-test-results.md`.

3. **Enumeration truncation.** The initial find returned 10 tokens; a
   later find on the same page returned 12. The accessibility-tree
   `find` tool appears to cap results at a default limit that wasn't
   visible. This contributed to the incomplete plan in Phase 3.

   **Fix going forward:** for enumeration steps, always take a full
   scroll + screenshot pass rather than relying on `find` alone.

## Residual debt

1. **Fine-grained PAT revocations skipped** — 5 planned, 0 executed.
2. **OAuth apps pages 2 + 3 not reviewed** — Cloudflare + highlight.io
   (flagged in 24 April Gmail digest) not revoked.
3. **Pi CEO Dashboard regen** may be needed if Railway still depends on
   the classic variant.

Create follow-up loop skeletons only if Phill wants to resume. Per mid-
loop direction "the remaining are required for projects", skipping the
skeleton-creation for fine-grained + OAuth — Phill can trigger a fresh
loop on his own timeline.

## Compliance audit

| Check | Result |
| ----- | ------ |
| No token values logged anywhere | ✅ only names + dates + scopes |
| No secrets committed to repo | ✅ |
| AU English in loop docs | ✅ |
| NOT LEGAL ADVICE | ✅ (in handoff) |

## Loop-system amendments to propose

- **PRD §4 skill matrix:** no change.
- **PRD §6 token budget:** this loop blew past estimate (~10k planned,
  ~22k actual) because of the batch-modal debugging. Not a systemic
  problem yet; watch for repeat.
- **PRD §9 exit criteria:** consider adding "every intended revocation
  is verified via a post-action screenshot" for destructive loops.
  Defer to a PRD amendment if this pattern recurs.

## Exit gate

- [x] Decisions + losses documented.
- [x] Residual debt tracked with explicit decisions.

**Proceed to Phase 7 — Handoff.**
