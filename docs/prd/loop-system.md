# PRD — Disaster Recovery Session Loop System

**Version:** 1.0 (2026-04-25)
**Owner:** Phill McGurk + Claude Code 1M-context agent
**Status:** Adopted for all remaining Disaster Recovery + NRPG + Equipped work
**NOT LEGAL ADVICE.**

## 1. Purpose

Define a repeatable multi-phase loop that keeps each session **small, focused,
token-efficient, and independently resumable**, so Phill can hand a loop off to
a fresh session (new operator, new context window, new agent) and it can finish
the loop without reading the entire repo history.

## 2. Why this exists

| Pain observed 2026-04-24 → 25 | Why a loop fixes it |
| ------------------------------ | ------------------- |
| Single 20+ PR session ran against context ceiling | Each loop is bounded to ≤1 logical feature |
| Background agents duplicating each other's work | Loop owns file territory; others boycott |
| Hard to resume after /clear or new session | Handoff file is the only input required |
| Scope creep mid-session | Exit criteria are declared before implementation starts |
| Skills (grill-me, tdd, design-an-interface) invoked ad-hoc | Skill invocation is a mandatory phase gate |

## 3. The seven phases

Every loop walks these phases in order. No skipping.

```
 (0) Intake           (5) Test
      ↓                    ↓
 (1) Grill Me        (6) Review
      ↓                    ↓
 (2) Design-an-     (7) Handoff → next loop / close
     Interface
      ↓
 (3) Plan
      ↓
 (4) Implement ──────────→ (back to 5)
```

### Phase 0 — Intake

- **Input:** Phill's one-sentence ask, or the handoff file from the prior loop.
- **Output:** `loops/<id>/00-intake.md` — ≤100 words restating the request +
  linking any related PRs/docs.
- **Skills invoked:** none.
- **Exit gate:** Phill confirms the restated ask matches intent. Literal "yes"
  or a correction.

### Phase 1 — Grill Me (Exploratory)

- **Input:** `00-intake.md`.
- **Output:** `loops/<id>/01-grill-me.md` — the full Pocock `grill-me`
  Socratic dialogue, producing a sharpened problem statement + open questions.
- **Skills invoked:** `ubiquitous-language`, `grill-me`.
- **Exit gate:** zero open questions OR every open question has a "decide
  later" tag with an explicit owner.

### Phase 2 — Design an Interface

- **Input:** `01-grill-me.md`.
- **Output:** `loops/<id>/02-interface.md` — the public contract
  (function signatures, HTTP endpoints, Zod schemas, UI affordances,
  Prisma models). No implementation yet.
- **Skills invoked:** `design-an-interface`, `ubiquitous-language`.
- **Exit gate:** a colleague unfamiliar with the loop can read the interface
  doc and predict behaviour ≥80% of the time. Self-check: can you write the
  smoke test from this doc alone?

### Phase 3 — Plan

- **Input:** `02-interface.md`.
- **Output:** `loops/<id>/03-plan.md` — ≤10 numbered steps, each with:
  - What changes
  - Files touched
  - Success signal (the green check)
  - Estimated token + time budget
- **Skills invoked:** `improve-codebase-architecture` (for gnarly refactors).
- **Exit gate:** plan total ≤8 hours of focused work OR is split into two
  loops.

### Phase 4 — Implement

- **Input:** `03-plan.md`.
- **Output:** Actual code. Commits reference the loop ID (`loop(<id>):`).
- **Skills invoked:** `tdd` (default on), `frontend-design` (if UI).
- **Exit gate:** local build green, `tsc --noEmit` clean, vitest green.

### Phase 5 — Test

- **Input:** the new code.
- **Output:** `loops/<id>/05-test-results.md` — test matrix (unit, integration,
  manual smoke), screenshots if UI, compliance checks (`.claude/rules/*`).
- **Skills invoked:** none explicit.
- **Exit gate:** every success signal from `03-plan.md` is ticked.

### Phase 6 — Review

- **Input:** the diff.
- **Output:** `loops/<id>/06-review.md` — concerns, residual debt, ADRs
  needed, follow-up loops to spawn.
- **Skills invoked:** `improve-codebase-architecture`.
- **Exit gate:** either zero blocking concerns OR every blocker has a
  decided path (fix here / spawn follow-up loop / accept debt).

### Phase 7 — Handoff

- **Input:** everything above.
- **Output:** `loops/<id>/07-handoff.md` — the **only** file the next session
  must read to resume. ≤300 words. Format:
  ```
  ## Done
  - <one-line-per-outcome>

  ## Residual debt (tracked)
  - <ADR / follow-up loop / linear ticket>

  ## Next session bootstrap
  /clear
  Read: docs/prd/loop-system.md
  Read: docs/prd/loops/<next-loop-id>/00-intake.md
  ```
- **Skills invoked:** none.
- **Exit gate:** PR merged + Linear ticket state updated + handoff file in main.

## 4. Skill invocation matrix

| Skill | Phases it may appear in | Required in |
| ----- | ------------------------ | ----------- |
| `ubiquitous-language` | 1, 2, 6 | every loop that introduces domain terms |
| `grill-me` | 1 | every loop |
| `design-an-interface` | 2 | every loop that changes an interface |
| `tdd` | 4 | every loop that ships code (not docs-only) |
| `improve-codebase-architecture` | 3, 6 | loops touching >3 files |
| `frontend-design` | 4 | loops shipping UI |
| `pr-test-analyzer` | 5 | loops shipping code + tests |

## 5. Handoff artifact templates

Every loop uses the same file layout under `docs/prd/loops/<id>/`:

```
docs/prd/loops/<id>/
├── 00-intake.md
├── 01-grill-me.md
├── 02-interface.md
├── 03-plan.md
├── 04-implement.md  (optional notes; commits are the real output)
├── 05-test-results.md
├── 06-review.md
└── 07-handoff.md
```

`<id>` format: `<YYYY-MM-DD>-<kebab-short-title>`. Example:
`2026-04-25-equipped-phase1-pdf-fill`.

## 6. Token budget per phase

Defaults. Override in the loop's `03-plan.md` when justified.

| Phase | Budget | Notes |
| ----- | ------ | ----- |
| 0 Intake | 500 tokens | Restate ask + link context |
| 1 Grill Me | 8k tokens | Cap at ~12 back-and-forth exchanges |
| 2 Interface | 4k tokens | Spec only, no code |
| 3 Plan | 3k tokens | Numbered list, terse |
| 4 Implement | 40k tokens | Biggest; where code actually lands |
| 5 Test | 5k tokens | Only failures get detail |
| 6 Review | 4k tokens | Only real concerns |
| 7 Handoff | 1k tokens | Short, crisp |

**Total budget per loop:** ≤70k tokens (~35% of a 200k window, or 7% of a 1M
window). Two concurrent loops fit comfortably in one 1M session.

## 7. Session boundary discipline

- Every phase ends with `/compact` or a fresh agent spawn.
- Before compacting, the current phase's output file is written to disk.
- After compact, agent reads only the current phase's input file(s) + this PRD.
- Handoff file is the session-boundary artefact.
- Loops can be run **concurrently** via background agents when their file
  territories don't overlap. See § 8.

## 8. Concurrency rules

- Two loops may run concurrently **only if**:
  1. Their implementation phases touch disjoint file sets, and
  2. Neither loop modifies `src/lib/validation/schemas.ts`,
     `prisma/schema.prisma`, or `app/layout.tsx` (the high-conflict files).
- Violating loops must serialise.
- Document contended territory in `03-plan.md` with `territory: [<paths>]`.

## 9. Exit criteria per loop

A loop closes when:

- [ ] `07-handoff.md` exists in main.
- [ ] PR merged (or explicit "no code this loop, docs only").
- [ ] `npx tsc --noEmit` clean on main.
- [ ] `npx vitest run` green on main.
- [ ] Linear ticket state transitioned (if one exists).
- [ ] Any follow-up loops listed in `06-review.md` have been created as
      skeletons (`00-intake.md` at minimum) OR consciously declined with a
      one-line "decided not to" note.

## 10. Queue of remaining loops (2026-04-25)

Ordered by importance (Phill can reorder). Each has a skeleton `00-intake.md`
ready. Loops marked ▶ are ready to start; others are blocked on prerequisites.

### ▶ Loop L1 — Equipped Phase 1 content fill

- **id:** `2026-04-25-equipped-phase1-pdf-fill`
- **Blocks on:** Phill downloading 2 PDFs from Gmail.
- **Outcome:** `/finance` + `/contractor/equipment-finance` disclosure links
  resolve, ACL/ACR/AFCA numbers replace TODO placeholders.
- **Est budget:** 15k tokens (light — pure content fill + tsc/vitest gate).

### ▶ Loop L2 — GitHub token + OAuth audit

- **id:** `2026-04-25-github-token-audit`
- **Blocks on:** nothing — Phill-driven with my coordination.
- **Outcome:** prune unused PATs + revoke untrusted OAuth apps surfaced in
  the 24 April Gmail digest.
- **Est budget:** 10k tokens (browser driving + revocation confirmation loop).

### ▶ Loop L3 — M365 DKIM signing enable

- **id:** `2026-04-25-m365-dkim-enable`
- **Blocks on:** DO CNAME propagation (~30 min after 24 April add).
- **Outcome:** outbound mail from phill.m@ and support@carsi.com.au signs
  correctly (verified via `mail-tester.com`).
- **Est budget:** 8k tokens (Microsoft admin centre nav + verification).

### Loop L4 — PST manual recovery

- **id:** `2026-04-25-carsi-pst-recovery`
- **Blocks on:** Phill opening Outlook desktop (local).
- **Outcome:** historical `@carsi.com.au` mail in phill.m@ inbox.
- **Est budget:** 12k tokens.

### Loop L5 — iOS Phase 3a — Apple Developer wiring

- **id:** `2026-04-25-ios-phase3a-apple-wire`
- **Blocks on:** Phill pasting Apple Team ID, Bundle ID confirmation, APNs
  .p8 path.
- **Outcome:** `npx cap add ios` run, Xcode project in `ios/`, TestFlight
  upload.
- **Est budget:** 30k tokens (Xcode + Apple Developer portal).

### Loop L6 — Equipped Phase 2 — signed JWT hand-off

- **id:** `2026-04-25-equipped-phase2-jwt-handoff`
- **Blocks on:** George supplying Base44 production URL + JWT shared key.
- **Outcome:** `/api/finance/handoff` endpoint + contractor invite UI +
  Base44 status webhook mapped.
- **Est budget:** 50k tokens — largest loop; may split into L6a/L6b/L6c.

### Loop L7 — Siteground GoGeek plan closure

- **id:** `2026-04-25-siteground-cancel`
- **Blocks on:** nothing.
- **Outcome:** plan cancelled or set to non-renew, 2 domains confirmed
  independent.
- **Est budget:** 6k tokens.

### Loop L8 — Step0Eligibility + SubContractorManager god-component decomposition

- **id:** `2026-04-26-god-component-decomposition-wave-2`
- **Blocks on:** nothing (follow-up to ADR-009).
- **Outcome:** two more god components split per the PR #115 / #119 pattern.
- **Est budget:** 45k tokens.

### Loop L9 — Booking / VoiceCall / FinanceReferral persistent Prisma models

- **id:** `2026-04-27-domain-model-persistence`
- **Blocks on:** design decisions from `02-interface.md` phase.
- **Outcome:** replace in-memory FinanceReferral store + add Booking
  + VoiceCall models.
- **Est budget:** 40k tokens.

## 11. Loop bootstrap prompt (copy-paste ready)

At the start of every new loop session, paste this into the fresh session:

```text
System prompt: You are operating the Disaster Recovery loop system per
`docs/prd/loop-system.md`. Loop id: <id>.

Step 1 — Read only these files:
  - docs/prd/loop-system.md
  - docs/prd/loops/<id>/00-intake.md
  - any `Read:` lines inside 00-intake.md

Step 2 — Walk phases 1 → 7 in order. Write each phase's output file BEFORE
advancing. Invoke the skills listed in the matrix.

Step 3 — Do not expand scope. If a concern falls outside the loop, capture
it in 06-review.md as a proposed follow-up loop. Do not implement it here.

Exit when 07-handoff.md is on main, PR merged, tsc + vitest green, Linear
ticket updated.

NOT LEGAL ADVICE.
```

## 12. Loop skeleton generator

To create a new loop on demand:

```bash
id="$(date +%Y-%m-%d)-<kebab-title>"
mkdir -p "docs/prd/loops/$id"
cat > "docs/prd/loops/$id/00-intake.md" <<'EOF'
# <Loop title>

**Loop id:** <id>
**Created:** <date>
**Owner:** Phill McGurk

## The ask (verbatim from Phill)

> <paste>

## Restated in my words

<agent restate; ≤100 words>

## Context links

- Related PR:
- Related doc:
- Related Linear ticket:

## Exit criteria (concrete success signals)

- [ ]
- [ ]
EOF
```

## 13. Success metrics for the loop system

Track over the next 10 loops:

- Median tokens per loop (target: ≤70k)
- % loops that close in a single session (target: ≥70%)
- % handoff files successfully resumed by a fresh session (target: ≥90%)
- % loops where scope matched the original `00-intake.md` (target: ≥85%)

## 14. Compliance + safety guards (every loop inherits)

- Australian English throughout (`.claude/rules/australian-english.md`).
- No banned phrases (`.claude/rules/compliance.md`).
- APP 3/5/6/8 for anything touching PII.
- Reg 25 language for anything touching credit referral.
- Feature flags off by default (`NEXT_PUBLIC_<FEATURE>_ENABLED`).
- No secrets in commits (gitleaks CI).
- No `--amend`, no force-push, no skip-hooks (`--no-verify` only when Phill
  explicitly authorises per CLAUDE.md §5.5).
- NOT LEGAL ADVICE disclaimer on all user-facing / partner-facing docs.

## 15. Amendment process

This PRD is versioned. To amend:

1. Open a PR that bumps `Version:` at the top.
2. Summarise the change in a new `## Changelog` entry at the bottom.
3. Do not silently mutate phase definitions.

## Changelog

- **1.0 (2026-04-25)** — Initial adoption. Defines 7-phase loop, skill
  matrix, handoff artefacts, queue of 9 remaining loops, bootstrap prompt.

---

*This PRD supersedes ad-hoc session discipline in CLAUDE.md §8. CLAUDE.md
retains the one-liner pointer: "for multi-session work, follow the loop
system at docs/prd/loop-system.md".*
