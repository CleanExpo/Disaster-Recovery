---
name: grill-me
description: Interview the user relentlessly about a plan or design until reaching shared understanding, resolving each branch of the decision tree. Use when user wants to stress-test a plan, get grilled on their design, or mentions "grill me".
---

<!--
Ported from https://github.com/mattpocock/skills/tree/main/grill-me
Original (c) 2026 Matt Pocock — MIT Licence.
This derivative work is also MIT-licensed. See .Codex/skills/LICENSE.
en-AU adaptation: none required (file is already neutral).
-->

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time.

If a question can be answered by exploring the codebase, explore the codebase instead.

When reaching a decision, write it to `UBIQUITOUS_LANGUAGE.md` or the relevant ADR under `docs/adr/` before asking the next question.
