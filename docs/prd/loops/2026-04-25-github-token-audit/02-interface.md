# Phase 2 — Design-an-Interface

**Loop:** `2026-04-25-github-token-audit`
**Skill invoked:** `design-an-interface` (minimal — ops loop, no code).

## External interfaces

| System | Mutation |
| ------ | -------- |
| GitHub personal access tokens page | Enumerate + revoke per decision |
| GitHub OAuth applications page | Enumerate + revoke per decision |
| GitHub installed apps page | Enumerate (rarely revoked) |
| `07-handoff.md` | Write decision log (no secret values, just names + dates) |
| Vercel env vars / GitHub Actions secrets | Rotate if any revoked token is used there |

## Decision log schema

Tokens table:

```
| Token name | Kind | Scopes | Last used | Age | Decision | Notes |
| ---------- | ---- | ------ | --------- | --- | -------- | ----- |
```

OAuth apps table:

```
| App name | Scopes | Added | Decision | Notes |
| -------- | ------ | ----- | -------- | ----- |
```

Each row's `Decision` is one of: `KEEP`, `REVOKE`, `ROTATE` (new token
issued, old one killed).

## Territory

- Phill's personal GitHub account settings only.
- No repo files changed (loop is ops, not code).

## Exit gate

- [x] Enumeration procedure defined.
- [x] Decision log schema fixed.
- [x] Rotation path documented (Vercel + GHA secrets).

**Proceed to Phase 3 — Plan.**
