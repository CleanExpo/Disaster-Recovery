# Australian English — Disaster Recovery Australia

> The rule is en-AU. Everywhere. Code comments, docs, commits, UI copy,
> CRM labels, emails, Slack, commit messages. No exceptions.
>
> Linked from @CLAUDE.md §0.

*Last updated: 2026-04-24 (Foundation Sprint Day 10).*

---

## 1. The rule

Write Australian English. The `~ize / ~ization` forms are US; DR uses
`~ise / ~isation`. If you would write it as a US English speaker, you
are writing it wrong for this project.

When in doubt, the Macquarie Dictionary is the tie-breaker.

---

## 2. Spelling deltas (common offenders)

| US English (DO NOT use)   | Australian English (use this) |
| ------------------------- | ----------------------------- |
| organize, organization    | organise, organisation        |
| recognize                 | recognise                     |
| specialize, specialization| specialise, specialisation    |
| authorize, authorization  | authorise, authorisation      |
| prioritize                | prioritise                    |
| analyze                   | analyse                       |
| color                     | colour                        |
| favor, favorite           | favour, favourite             |
| behavior                  | behaviour                     |
| neighbor, neighborhood    | neighbour, neighbourhood      |
| harbor                    | harbour                       |
| center, centered          | centre, centred               |
| meter (distance)          | metre                         |
| liter                     | litre                         |
| theater                   | theatre                       |
| fiber                     | fibre                         |
| defense                   | defence                       |
| license (verb + noun)     | licence (noun), license (verb)|
| practice (verb + noun)    | practise (verb), practice (noun) |
| program (software OK)     | programme (broadcast/event)   |
| traveled, traveling       | travelled, travelling         |
| catalog                   | catalogue                     |
| dialog (software UI OK)   | dialogue (conversation)       |
| gray                      | grey                          |
| jewelry                   | jewellery                     |
| airplane                  | aeroplane                     |
| aluminum                  | aluminium                     |
| mom                       | mum                           |

**Noun / verb trap:** `licence`/`practice` are NOUNS; `license`/`practise`
are VERBS. Get this wrong and it looks like a typo.

**Programming caveat:** `program` is accepted as the noun for software
("the program runs"). `programme` is for broadcasts and events. CSS
class names, HTML IDs, and npm package names keep their US spellings
(Tailwind uses `text-gray-400` — don't rename it).

---

## 3. Dates

- **Format:** `DD/MM/YYYY` (not `MM/DD/YYYY`).
- **Written long form:** "24 April 2026" (day first, no comma).
- **ISO 8601 OK in code / logs / filenames:** `2026-04-24`.
- **Fiscal year:** AU FY = 1 July to 30 June. Written `FY26` =
  July 2025-June 2026.

## 4. Currency

- **Australia:** `$` prefix, AUD implied. E.g. `$1,200`. Only disambiguate
  to `AUD 1,200` when on a page that ALSO shows NZD or USD.
- **New Zealand:** `NZ$` prefix on NZ pages.
- **Never use `A$`** — not Australian usage.
- **GST inclusive** unless explicitly stated otherwise. "inc GST" or
  "ex GST" — never "plus tax".

## 5. Units

- Metric throughout. `km`, `kg`, `°C`, `m²`. Never `miles`, `lb`, `°F`,
  `sq ft`.
- Decimal separator: `.` (not `,`). Thousand separator: `,` (not ` ` or `.`).
  E.g. `1,234.56`.

## 6. Time + time zones

- 24-hour format in internal UI / logs: `14:30`.
- 12-hour format acceptable in public copy: `2:30pm` (lowercase, no space).
- **AEST** = UTC+10 (winter). **AEDT** = UTC+11 (summer, roughly Oct-Apr).
- **NZST** = UTC+12. **NZDT** = UTC+13.
- When scheduling copy, use the zone name: "9am AEST" not "9am PT".

## 7. Phone numbers

- **Australia:** `(07) 5555 5555` or `+61 7 5555 5555`. Mobile:
  `0400 000 000` or `+61 400 000 000`. No hyphens inside the number.
- **New Zealand:** `(09) 555 5555` or `+64 9 555 5555`.

## 8. Addresses

- **Australian format:**
  ```
  123 Example Street
  Brisbane QLD 4000
  Australia
  ```
  Suburb + state + postcode on one line. State abbreviations are the
  canonical two-letter codes: NSW, VIC, QLD, SA, WA, TAS, NT, ACT.
- Never use "province" or "county" — Australia has states and territories.

## 9. Words to prefer (AUS voice)

- "mobile" (not "cell phone")
- "lift" (not "elevator")
- "rubbish" / "bin" (not "trash" / "trashcan")
- "torch" (not "flashlight")
- "capsicum" (not "bell pepper")
- "prawn" (not "shrimp")
- "boot" / "bonnet" (of a car — not "trunk" / "hood")
- "biscuit" (sweet; "cookie" is OK for large US-style)
- "chips" (both hot + packet; "fries" is OK in restaurant context)
- "university" / "uni" (not "college" — which means secondary school here)

## 10. Tone

- Conservative. Evidence-based. Never "world-class", "best-in-class",
  "revolutionary". These trip ACL s18/s29 (see
  @.claude/rules/compliance.md).
- "Mate" is fine in Slack between humans, never in user-facing copy.
- Plain English. Year 9 reading level target for public pages.

## 11. Exceptions (keep US spelling)

- Third-party code, package names, API field names shipped by external
  libraries (`tailwind.config.js`, `color` CSS property, `center` in
  flexbox docs).
- CSS class tokens where changing them breaks bundler output.
- Quotes from other authors — preserve their original spelling.

## 12. CI / lint

- Prettier doesn't catch spelling. Commit-time lint doesn't either.
  Spelling is a reviewer responsibility.
- If you ship a US spelling into a rendered page, it's a bug — fix in
  the same commit that caught it.

---

## References

- @CLAUDE.md §5 (prohibitions)
- Macquarie Dictionary (tie-breaker)
- Global rule: Phill's `~/.claude/CLAUDE.md` — "Australian English.
  Concise. No unsolicited explanations."
