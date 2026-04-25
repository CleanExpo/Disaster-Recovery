# PRD — pointer

For the Disaster Recovery session loop system (how we run the remaining
work), see:

**`docs/prd/loop-system.md`**

Active loop instances live under `docs/prd/loops/<id>/`. Three ready to
start:

- **L1** — `2026-04-25-equipped-phase1-pdf-fill` (blocked on Phill
  downloading 2 PDFs from Gmail)
- **L2** — `2026-04-25-github-token-audit` (ready, no blocker)
- **L3** — `2026-04-25-m365-dkim-enable` (ready once DO DNS propagates
  ~30 min from 2026-04-24 add)

Six more are queued in the PRD; their `00-intake.md` will be generated
on demand via the bootstrap script in PRD §12.

**To start a loop in a fresh session**, use the bootstrap prompt in PRD
§11.
