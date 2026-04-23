# Brand + History Archive

> Non-canonical reference. Preserves context that used to sit inside
> CLAUDE.md before the Day 10 reorganisation. If a rule lives here, it
> is HISTORY — the live rule lives in @CLAUDE.md or @.claude/rules/.

*Last updated: 2026-04-24 (Foundation Sprint Day 10).*

---

## 1. Entities + brand names

- **Legal entity:** *National Restoration Professionals Group Pty Ltd*
  (NRPG).
- **Consumer brand:** *Disaster Recovery Australia* (DR). This is what
  the public sees — website, GBP listing, phone greetings, invoices
  from DR.
- **Contractor-facing brand:** NRPG appears in the membership agreement
  and onboarding paperwork. Contractors apply to "the NRPG network" /
  "the Disaster Recovery network" interchangeably — we are tightening
  this (see flagged ambiguity in @.context/domain-models.md).
- **Domain:** `disasterrecovery.com.au` is the current production URL.
  Previous working domains (`disaster-recovery-seven.vercel.app`) are
  superseded and any stale references should be fixed on sight
  (2026-02-27 audit cleared the main ones).

## 2. NRP → NRPG rebrand (2026-02-26)

Scope:

- 94 files changed, 291 `NRP` → `NRPG` replacements.
- Coverage: all user-facing pages, contractor portal, claim form, API
  responses, Stripe billing, knowledge base metadata, onboarding
  curriculum (101 instances), CRM training, R6 legacy components, type
  definitions.

Preserved (intentionally not changed):

- File paths: `/logos/3D NRP Logo.png` — image filenames kept.
- Code variant keys: `'nrp'` — enum keys kept.
- URL paths: `/guides/professional/nrp-best-practices-guide/`.

Verification regex: `\bNRP\b(?!G)` returns zero matches across all
`.tsx/.ts/.js/.jsx/.css/.json` files.

Remaining `.md` references (reference docs, not rendered):
`CORE_Analysis_for_NRP.md`, `NRP_CRM_Architecture_Analysis.md`,
`NRP_Membership_Portal_Specs.md`. Not touched — historical research
artefacts.

Commit: `265f5c1b`.

## 3. "Insurance Approved" cleanup

Two passes:

- **2026-02-25 Conversion Audit Phase 0** (`a2f3584f`): footer, hero,
  pricing template, optimised-page-template.
- **2026-02-27 broader pass** (`6e1783c8`): 92 files, "Insurance
  approved" → "IICRC-certified" across all public-facing pages.

Preserved:

- Educational guide at `/guides/insurance/insurance-approved-contractors/`
  — explains what "insurance approved" means in industry parlance (SEO
  keyword target, not a self-description).
- `/insurance` page retains the keyword in body copy for search-intent
  coverage but not as a self-description.

Remaining (intentional):

- `page-enhanced.tsx` (dead file, scheduled for delete).
- `r6-demo` (excluded tree).
- Guide cross-references that discuss the phrase neutrally.

Live rule: @.claude/rules/compliance.md §1 (banned phrases).

## 4. Design system evolution

- **Phase 1** (pre-2026-02): Antigravity design tokens + core
  components.
- **Phase 2**: SVG background textures, glassmorphism containers.
- **Phase 3** (2026-02-22, commit `2ea58aa4`): v3 CSS alignment + Nano
  Banana Pro visual generation pipeline.
- **Cinematic Materiality standard** (Unite-Group Global Visual
  Framework): reference `visual-framework-v3.md` in user memory.

Live rule: design patterns reference lives in the user-memory file
`design-patterns.md` (Phill's personal memory).

## 5. SEO history snapshot (Feb 2026)

Numbers at the point of the Day 10 rewrite:

- ~1,152 location pages.
- ~129 service pages.
- 55+ guides.
- ~199 redirects + 19 custom headers in `next.config.js`.
- 5 structured-data schemas on every page (Organization, WebSite,
  EmergencyService, Breadcrumb, conditional FAQ via
  `GlobalFAQSchema`).
- GA4: `G-98HWF2NV95`. GSC: verified. Bing: imported.
- Google Business Profile API live via `app/api/rating/route.ts`
  (Place ID `ChIJFTIv0bpOkWsRz_SIAaNI3Lc`, 4.7 stars / 49 reviews at
  audit time, 24h cache).

## 6. Linear conventions

- Tickets: `DR-<number>`, e.g. `DR-724`.
- Foundation Sprint tickets were internal (not Linear) — scope is in
  the DR-Sandbox-starter proposals tree.
- Commit scope field often mirrors the ticket name or subsystem
  (`feat(voice): DR-710 …`, `feat(foundation): Day 9 …`).

## 7. Production deploy state (as of Day 10)

- Vercel project: Disaster-Recovery (CleanExpo org).
- Deploy branch: `main` — auto-deploys prod on push.
- Preview deploys: every PR.
- Authoritative build: **Vercel wins.** Local build parity is a goal,
  not a guarantee.

## 8. Historical rules that moved

For auditability — things that used to be advice inside CLAUDE.md and
where they live now:

| Old CLAUDE.md topic                  | New home                                    |
| ------------------------------------ | ------------------------------------------- |
| Billing model (contractor bills client) | @.claude/rules/business-rules.md §2     |
| Banned phrases (insurance approved)  | @.claude/rules/compliance.md §1             |
| APP 8 consent + voice script         | @.claude/rules/compliance.md §3             |
| Data classes (5-class taxonomy)      | @.claude/rules/privacy.md §1                |
| Feature flag naming convention       | @docs/adr/ADR-004-feature-flag-strategy.md  |
| Package manager quirk (legacy-peer-deps) | @.claude/rules/dev-environment.md §2    |
| Next.js redirect negative-lookahead  | @.claude/rules/dev-environment.md §3        |
| NRP → NRPG rebrand notes             | this file §2                                |
| NAP + GBP constants                  | `src/lib/constants.ts`                      |
| Ubiquitous language (29 terms)       | @UBIQUITOUS_LANGUAGE.md + @.context/domain-models.md |

---

## References

- @CLAUDE.md (live project anchor)
- @MEMORY.md (known drifts + debt)
- @.claude/rules/ (live rule files)
- Phill's user-memory file at
  `~/.claude/projects/C--Disaster-Recovery/memory/MEMORY.md`
  (separate — NOT the same as repo-level MEMORY.md).
