# DR `.claude/skills/` — Foundation skills inventory

Skills here are adapted from Matt Pocock's open-source skills framework at
[github.com/mattpocock/skills](https://github.com/mattpocock/skills) (MIT
Licence, 17.2k stars, updated 2026-04-23). See `LICENSE` in this folder for
the attribution and MIT pass-through.

## Why these skills

Matt's AI Engineer Summit April 2026 talk — *"Claude Code for real engineers"* —
argues that software fundamentals (deep modules from Ousterhout, ubiquitous
language from DDD, TDD, and forcing-function design interviews) matter more
in the AI age, not less. Specs-to-code produces entropy; skills inject
design discipline *before* code lands.

The DR Foundation Audit (see `C:/Users/Phill/.claude/plans/` + the
DR-Sandbox `proposals/foundation-skills-matt-pocock/board-synthesis.md`)
identified four gaps that these skills directly address:

| DR audit gap                                   | Skill that addresses it            |
| ---------------------------------------------- | ---------------------------------- |
| God components (Step5HealthSafety 1210 lines) | `improve-codebase-architecture`    |
| Schema duplication + term drift                | `ubiquitous-language`              |
| 63 TS errors + advisory-only CI                | `tdd`                              |
| No ADRs / design decisions captured            | `grill-me`                         |
| First-shot API designs                         | `design-an-interface`              |

## Skills shipped (5 repo-scoped)

| Skill                           | What it does                                                                  | DR adaptations                                                      |
| ------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `grill-me`                      | Relentless design-tree interview (Fred Brooks)                                | Appended: write decisions to `UBIQUITOUS_LANGUAGE.md` or `docs/adr/` |
| `ubiquitous-language`           | DDD glossary generator, flags ambiguities                                     | en-AU pass + `EXAMPLES.md` with DR-native worked example             |
| `improve-codebase-architecture` | Shallow-to-deep module refactor; 3+ parallel sub-agents                       | `REFERENCE.md` uses Prisma + SQLite / `prisma-fabbrica`; RSC port note |
| `design-an-interface`           | Divergent-constraint interface design via sub-agents                          | Added Agent 5 constraint for Next.js server/client boundaries       |
| `tdd`                           | Vertical-slice red-green-refactor                                             | en-AU; bundled upstream sibling files; note about cohort content    |

## One skill installed globally (NOT in this repo)

`git-guardrails-claude-code` — installed to `C:/Users/Phill/.claude/skills/`.
It's global because its job is to protect every project from destructive git
commands, not just this one. The bundled PreToolUse hook script
(`block-dangerous-git.sh`) is copied into place but **not** wired into
`settings.json` — Phill decides whether to activate it.

## First DR glossary

Running `ubiquitous-language` against the DR domain produced a v1 glossary at
the repo root: [`UBIQUITOUS_LANGUAGE.md`](../../UBIQUITOUS_LANGUAGE.md).
It covers claim-lifecycle terms (Enquiry / Lead / Claim / Draft claim / Job /
Make-safe / Remediation / Restoration / Scope of works), party terms (Client
/ Contractor / Applicant / Member / Partner / Loss adjuster / Operator), and
compliance terms (IICRC-certified / APP / NDB / CGA / FTA / IPP / Reg 25),
plus three flagged ambiguities for the next session.

## Attribution

All skill SKILL.md + sibling .md files in this tree include a header
comment pointing at the upstream Matt Pocock file. The original repo is MIT
and these derivative works are also MIT. If you fork this folder, keep the
attribution headers.
