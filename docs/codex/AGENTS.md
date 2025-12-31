# AGENTS.md Guide (Codex)

This repository uses `AGENTS.md` files to provide persistent instructions to Codex.

## How Codex loads instructions

Codex builds an instruction chain at startup:

1. **Global scope** (your Codex home):
   - Reads `AGENTS.override.md` if present, otherwise `AGENTS.md`.
2. **Project scope** (this repository):
   - Walks from repo root to the current working directory.
   - In each directory, reads at most one file in this order: `AGENTS.override.md`, then `AGENTS.md`.
3. **Precedence**
   - Files closer to your current directory override earlier guidance because they appear later in the merged prompt.

Codex skips empty files and stops once the combined instructions exceed the configured byte limit (default: 32 KiB).

## Recommended setup

### Global defaults (per user)

Create a global file so every repository starts with consistent preferences:

- Create `~/.codex/AGENTS.md` (or `%USERPROFILE%\.codex\AGENTS.md` on Windows).
- Put reusable working agreements there (testing, formatting, dependency policy).

### Repository defaults (this repo)

- This repo’s root instructions live in `AGENTS.md`.
- For specialised areas, add nested overrides, for example:
  - `app/api/AGENTS.md` for API-only rules
  - `src/lib/AGENTS.override.md` for stricter service-layer conventions

## Verify what Codex loaded

From the repo root:

- `codex --ask-for-approval never "Summarise the current instructions."`

From a subdirectory:

- `codex --cd app/api --ask-for-approval never "Show which instruction files are active."`

