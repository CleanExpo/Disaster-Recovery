# ADR-008: Adopt Matt Pocock's five skills as the DR development pattern

- **Status:** Accepted
- **Date:** 2026-04-24
- **Deciders:** Phill, Claude (Opus 4.7 1M)
- **Context:** Foundation Sprint Polish + DR-724 port

## Context

The Foundation Sprint surfaced that "how we start a piece of work" was
inconsistent. Some tickets opened with a schema change and worked
outward; others started with a component and retrofit a contract later.
Agents (LLMs in particular) defaulted to implementing from the
imperative verb in the prompt, skipping design. The result was
rework — contracts invented mid-implementation, unsurfaced assumptions
discovered at code review, and tests written after shipping because
no one knew what success looked like.

Matt Pocock's public "five skills for LLM-assisted engineering" framework
offered a clean mental model:

1. **`grill-me`** — adversarial requirement elicitation. Agent interrogates
   the human until the shape of the problem is stable.
2. **`ubiquitous-language`** — name the domain nouns + verbs before code.
   One vocabulary across engineering, product, legal, compliance.
3. **`improve-codebase-architecture`** — architectural critique of the
   current tree before adding to it.
4. **`design-an-interface`** — write the type signature, the Zod schema,
   or the route contract **first**. Implementation is a downstream
   derivation.
5. **`tdd`** — write the failing test, then the code that makes it pass.

The framework is opinionated and sequential, which matched the
Foundation Sprint's bias toward tightening invariants.

## Decision

Adopt the five skills as the DR development pattern, with en-AU and
DR-specific adaptations, captured in DR-724.

### Adaptations

- **en-AU spelling + locale.** Every skill prompt uses Australian English
  (organisation, colour, recognise, prioritise, centre, behaviour). Date
  formatting DD/MM/YYYY. Currency AUD. Time zones AEST/AEDT. All
  examples are AUS or NZ — never US.
- **Prisma-first data modelling.** `design-an-interface` runs against
  `prisma/schema.prisma` first — any new concept lands as a model
  (or an explicit "no persistent model yet" note in
  `.context/domain-models.md`) before code references it.
- **Next.js App Router contract surface.** Route handlers under
  `app/api/**/route.ts` are the primary interface. `design-an-interface`
  writes the Zod schema into `src/lib/validation/schemas.ts` before the
  handler body exists.
- **Compliance-aware `ubiquitous-language`.** DR terms carry legal
  weight (ACL "consumer guarantee", APP 8 "overseas disclosure",
  IICRC S500/S520 standards). `UBIQUITOUS_LANGUAGE.md` marks which terms
  are compliance-load-bearing and which are internal.

### When to open with `grill-me`

Mandatory before coding:

- Any new `/claim/*` flow step or modification to the claim state
  machine.
- Any new API route under `app/api/**`.
- Any `prisma/schema.prisma` change (new model, new enum, new relation,
  new index).
- Any change that touches consent, compliance events, voice pipeline,
  or the finance referral flow.

Optional but encouraged:

- UI-only changes when the component already exists.
- Content-only edits (guides, location pages) — but still apply
  `ubiquitous-language` to verify naming.

### Anti-patterns

- Opening `tdd` before `design-an-interface`. Tests need a contract to
  assert against.
- Running `grill-me` and then ignoring its output because "we already
  know what we want". If grill-me surfaced a question, answer it in the
  PR body.
- Using the skills ceremonially — running each one for three lines then
  moving to code. The skill ran if and only if its output changed what
  followed.

## Consequences

**Positive.**

- Claim-flow rework dropped sharply. Four of the last five `/claim`
  modifications shipped without mid-implementation contract changes.
- Schema changes now arrive with ADR-worthy context. Review comments
  focus on "should this be nullable?" not "what is this?".
- LLM agents with access to the skill files produce proportional output
  to the task — small change, small grill; large change, large grill.

**Negative.**

- Longer time-to-first-commit on greenfield work. A ticket that used to
  start coding in five minutes now spends 20–40 minutes on grill +
  language + interface design.
- Skills are long-form and bloat prompt tokens when loaded in full. The
  agent prompt enhancer at `.claude/scripts/enhance_prompt.py` selects
  which skills to inline based on the ticket's Linear labels.

**Neutral.**

- Not every ticket needs all five. A typo fix runs zero skills. A new
  API route runs four (skip `improve-codebase-architecture`).

## References

- DR-724 — original port ticket.
- `.claude/skills/` — port of Pocock's five skills with DR adaptations.
- `UBIQUITOUS_LANGUAGE.md` at repo root — canonical term list (29 terms
  as of 2026-04-24).
- `.context/domain-models.md` — domain concepts + Prisma mappings.
- `src/lib/validation/schemas.ts` — Zod contract surface that
  `design-an-interface` writes into.
- ADR-006 — Foundation Sprint outcomes.
- Matt Pocock, "Five Skills for LLM-Assisted Engineering" (public talk,
  2026-Q1).
