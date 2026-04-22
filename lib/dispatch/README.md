# `lib/dispatch/` — NRPG contractor matching

## What this is

Pure function that matches an incoming claim to the best NRPG contractor based on location, service coverage, home-base proximity, and load.

Ported from DR-Sandbox after a 10-unit-test green run. Linear: DR-627.

## API

```ts
import { dispatch } from "@/lib/dispatch/dispatch";
import type { ClaimIntake, RosterEntry } from "@/lib/dispatch/types";

const decision = dispatch(claim, roster);
// decision.contractorId  | null if no match
// decision.confidence    | 0..1
// decision.escalation    | 'none' | 'ops-review' | 'on-call' | 'human-phone'
// decision.matchSignals  | array of weighted match reasons
// decision.responseSlaMinutes  | 60 (immediate) | 240 (same-day) | null
```

## Scoring weights

| Signal | Weight | Meaning |
|---|---|---|
| postcode-exact | 40 | claim postcode in contractor's postcodes[] |
| suburb-exact | 25 | claim suburb in contractor's suburbs[] |
| service-mix | 15 | contractor covers the claim's service |
| home-city | 10 | claim suburb contains contractor's home-city |
| load-balance | 0-10 | 10 minus contractor's activeJobs count (min 0) |

Confidence = sum / 100, clamped to 1.0.

## Not in this PR (follow-ups)

- `roster.ts` — Supabase loader for the `contractors` table (blocks on DR-635-derived schema migration)
- `app/api/claims/[id]/dispatch/route.ts` — HTTP endpoint that reads the claim row, invokes dispatch, persists the decision
- Inngest/QStash trigger on `claim.created`
- Mobile push-notify (DR-573)
- Multi-contractor fanout on decline

These are documented in the DR-Sandbox port kit at `dr-nrpg-port/README.md`.

## Testing

Tests colocated at `__tests__/dispatch.test.ts`. Run:

```bash
pnpm test lib/dispatch
```

Expected: 10 green. Matches the DR-Sandbox test suite 1:1.

## Provenance

- DR-Sandbox source: `agents/dispatch.ts` (logic) + `voice/types.ts` (types)
- DR-Sandbox tests: `agents/dispatch.test.ts` (10 tests, all green on main)
- DR-Sandbox port kit: `dr-nrpg-port/` (this file's ancestor)
