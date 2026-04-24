# Phase 1 — Grill Me

**Loop:** `2026-05-01-dr-rename`
**Skill invoked:** `grill-me`, `ubiquitous-language`.

## Q1 — Is this just a rename, or are there compliance implications?

**A:** Both. The rename is mechanically simple, but the compliance
side is real:

- The privacy notice currently says _"National Restoration
  Professionals Group Pty Ltd (ABN 85 151 794 142), trading as Disaster
  Recovery Australia"_. After rename: _"trading as Disaster Recovery"_.
- This wording is what gets shown to users at the moment of consent
  (APP 5 collection notice). For it to be legally accurate, **"Disaster
  Recovery" must actually be a registered ASIC business name attached
  to NRPG Pty Ltd's ABN**.
- That registration is L11 (separate loop, blocked on TKM Accountants'
  direction).

**Decision:** ship the rename now. The privacy-notice wording is now
accurate IF and ONLY IF the ASIC registration completes before
production traffic flips on the new copy. Phill is aware; the loop
ordering is L10 → TKM email → L11 → L5.

If TKM's advice ends up being "register both names" or "register the
brand under a different ABN", we'd need a second pass. Acceptable risk.

## Q2 — What about analogues across the codebase?

**A:** Two close-but-different phrases exist:

- "Disaster Recovery Australia" — the rename target, all operational.
- "National Restoration Professionals Group" — the legal entity, must
  remain unchanged.
- "NRPG" — abbreviation of the legal entity, must remain unchanged.
- "Disaster Recovery Queensland" / "DRQ" — separate Pty Ltd entity
  (ABN 42 633 062 307), must remain unchanged.

The replace targets only the exact string "Disaster Recovery
Australia". No regex, no case-folding. Safe.

## Q3 — Will this break tests?

**A:** Tests that snapshot rendered HTML (Playwright, Vitest snapshot
specs) will need their fixtures updated if any check the literal
"Disaster Recovery Australia" string. Plan: run the rename, run the
test suite, update any snapshot mismatches.

The `public/images/test-results.json` file (60 occurrences) is a
generated test artefact — replacing the strings there matches the
expectation against the post-rename rendered output.

## Q4 — Does it affect SEO?

**A:** Yes — every metadata title/description that contains the old
brand will lose those keywords on the next crawl. Acceptable trade-off:

- Title keyword replacements ship in the same commit as the brand
  rename (atomic).
- The structured-data `legalName` stays "National Restoration
  Professionals Group Pty Ltd"; the `name` stays "Disaster Recovery"
  (already correct in `src/lib/constants.ts` NAP).

A `301`-class redirect isn't required because no URL is changing —
this is page-content rebrand only.

## Q5 — How do agents downstream not re-introduce "Disaster Recovery Australia"?

**A:** Update the agent rule files in the same loop:

- `CLAUDE.md` Project identity section — already updated by sed.
- `UBIQUITOUS_LANGUAGE.md` "Flagged ambiguities" — updated by sed
  (the old phrasing was "DR trades as Disaster Recovery Australia"; now
  reads "DR trades as Disaster Recovery").
- `.claude/rules/compliance.md` (Voice consent script) — updated by
  sed; consent script now says "you've reached Disaster Recovery"
  (was "Disaster Recovery Australia").

The voice-consent change is small but real. The hashed
`EQUIPPED_CONSENT_VERSION` is independent (consent string for the
Equipped finance form, not the voice agent's APP 8 prompt). No version
bump needed for this rename.

## Q6 — `.gitleaks.toml` title rename — anything to flag?

**A:** No. It's a config-file title comment, not a rule pattern. Doesn't
affect secret scanning.

## Open questions

None blocking. Compliance accuracy is contingent on ASIC registration
landing — that's L11, separate loop.

**Proceed to Phase 2 — Design-an-Interface.**
