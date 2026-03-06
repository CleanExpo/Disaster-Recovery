# Scripts Governance

This directory contains operational automation. To avoid script sprawl, we use a
small trusted core and strict governance checks.

## Script Tiers

- `core`:
  - Production and CI/CD critical.
  - May be referenced by `package.json`, CI workflows, or deployment config.
  - Must be listed in `scripts/_governance/manifest.json`.
- `ops`:
  - Manual operations support scripts.
  - Not auto-run in CI/CD.
- `experimental`:
  - Temporary scripts for investigation or one-off migrations.
  - Must be reviewed and either promoted or archived.
- `archive`:
  - Legacy scripts retained for historical context only.
  - Not referenced by automation.

## Rules

1. Do not add a new `core` script without updating:
   - `scripts/_governance/manifest.json`
   - `scripts/_governance/validate-script-governance.js` checks (if needed)
2. New scripts must include metadata header fields:
   - purpose
   - owner
   - safe environments
3. Build/deploy paths must only use scripts listed as `core`.
4. Run `npm run check:scripts` before opening a PR.

## Validation

`npm run check:scripts` verifies:
- every `scripts/*` reference in `package.json` exists,
- every referenced script is in the manifest,
- every referenced script is marked `core`,
- every manifest `core` script exists.

## New Script Template

Use `scripts/_governance/new-script-template.js` when creating new scripts.
