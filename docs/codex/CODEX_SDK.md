# Codex SDK (Notes)

Codex can also be driven programmatically for CI/CD and internal tooling.

## TypeScript SDK

The Codex SDK can be used from Node.js (18+):

- Package: `@openai/codex-sdk`

Example (conceptual):

```ts
const codex = new Codex();
const thread = codex.startThread();
const result = await thread.run("Make a plan to diagnose and fix CI failures");
console.log(result);
```

## Suggested uses for NRPG

- CI job that runs Codex in non-interactive mode to summarise failures and propose fixes.
- Internal “runbook assistant” that loads `AGENTS.md` + repo-scoped skills and executes standard checklists.

This repo does not vendor the SDK by default; install it only if you intend to operationalise it.

