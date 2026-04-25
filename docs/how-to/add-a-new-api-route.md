# How-to: Add a new API route

> **NOT LEGAL ADVICE.** If your route touches consent, compliance events,
> or overseas data disclosure, consult `/legal/**` and counsel before
> shipping. This playbook covers engineering mechanics only.

Step-by-step playbook for adding a new Next.js App Router API handler.
Works for human contributors and agents. Follow it in order.

## 1. Branch

```bash
git checkout main
git pull --ff-only
git checkout -b feat/DR-NNN-short-description
```

Branch + commit conventions live in `CONTRIBUTING.md`.

## 2. Place the route file

```
app/api/<resource>/<action>/route.ts
```

Rules:

- One handler per file. Export named HTTP verbs (`GET`, `POST`, etc.).
- `<resource>` is a noun, plural. `<action>` is a verb or a sub-resource.
- Example: `app/api/claims/submit/route.ts`, `app/api/contractors/[id]/suspend/route.ts`.

## 3. Add the Zod schema

Open `src/lib/validation/schemas.ts`. Add the request + response shapes
at the bottom, grouped by resource. **Never inline Zod schemas in the
route file.** See ADR-008 on `design-an-interface`.

```ts
// src/lib/validation/schemas.ts
export const SubmitClaimRequest = z.object({
  clientId: z.string().uuid(),
  incidentType: z.enum(['water', 'fire', 'storm', 'mould', 'biohazard', 'other']),
  lossAddress: z.string().min(5).max(200),
  consentAPP3: z.literal(true),
});
export type SubmitClaimRequest = z.infer<typeof SubmitClaimRequest>;

export const SubmitClaimResponse = z.object({
  claimId: z.string().uuid(),
  status: z.literal('submitted'),
});
export type SubmitClaimResponse = z.infer<typeof SubmitClaimResponse>;
```

## 4. Wire observability

Import from the barrel, not the implementation file.

```ts
import { captureException, requestLogger } from '@/lib/observability';
```

`requestLogger` produces a logger scoped to this request with a
correlation ID; `captureException` records onto the active OTel span
(see ADR-005).

## 5. Route template

```ts
// app/api/claims/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { captureException, requestLogger } from '@/lib/observability';
import { SubmitClaimRequest, SubmitClaimResponse } from '@/lib/validation/schemas';
import { prisma } from '@/lib/prisma';
import { writeComplianceEvent } from '@/lib/compliance/events';

export async function POST(req: NextRequest) {
  const log = requestLogger(req, { route: 'claims.submit' });

  try {
    const body = await req.json();
    const parsed = SubmitClaimRequest.safeParse(body);

    if (!parsed.success) {
      log.warn('validation_failed', { issues: parsed.error.issues });
      return NextResponse.json(
        { error: 'validation_failed', issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const claim = await prisma.insuranceClaimAU.create({
      data: {
        clientId: parsed.data.clientId,
        incidentType: parsed.data.incidentType,
        lossAddress: parsed.data.lossAddress,
        status: 'submitted',
        consentAPP3: parsed.data.consentAPP3,
      },
    });

    // State mutation → compliance event
    await writeComplianceEvent({
      type: 'claim.submitted',
      subjectType: 'claim',
      subjectId: claim.id,
      actorType: 'client',
      actorId: parsed.data.clientId,
      metadata: { incidentType: parsed.data.incidentType },
    });

    log.info('claim_submitted', { claimId: claim.id });

    const response: SubmitClaimResponse = {
      claimId: claim.id,
      status: 'submitted',
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    captureException(error, { route: 'claims.submit' });
    log.error('unhandled_error', { error: String(error) });
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
```

## 6. Log compliance events at state mutations

Every state transition that creates, updates, or discloses
subject-relevant data writes an entry via `writeComplianceEvent`. The
writer is feature-flagged (see DR-624). Rules of thumb:

- New claim, new contractor, new consent: always log.
- Status transitions on existing entities: log the `from` and `to`
  status.
- Read operations: do **not** log unless the read is an APP 12 access
  request, in which case use the dedicated helper.

## 7. Write unit tests

Co-locate under `__tests__/`:

```
app/api/claims/submit/__tests__/route.test.ts
```

Use Vitest. Cover:

- Happy path (valid body → 201 + claim persisted).
- Validation failure (invalid body → 400 with issues).
- Observability hit (mocked `captureException` called on thrown error).
- Compliance event written (mocked `writeComplianceEvent` called).

See Polish 6 for reference patterns in `src/lib/validation/__tests__/`
and `src/lib/observability/__tests__/`.

## 8. Run the full local gate

```bash
npm test
npx tsc --noEmit
npm run lint
npx prettier --check .
```

All four must pass. The pre-commit hook runs the fast subset
automatically; CI runs all four as hard gates (see ADR-007).

## 9. Commit

```bash
git add app/api/claims/submit/ src/lib/validation/schemas.ts
git commit -m "feat(api): DR-NNN add POST /api/claims/submit

Adds validated claim submission endpoint with compliance event
logging on state mutation.

Refs DR-NNN"
```

## 10. Open the PR

```bash
git push -u origin feat/DR-NNN-short-description
gh pr create --title "DR-NNN: add POST /api/claims/submit" --body "..."
```

Fill the PR body with:

- **Summary** — what the route does in one sentence.
- **Schema reference** — link to the added Zod schemas.
- **Compliance events** — what state mutations log, if any.
- **Test plan** — checklist of what reviewers can run.

## Checklist

- [ ] Branch from `main`.
- [ ] Route under `app/api/<resource>/<action>/route.ts`.
- [ ] Zod schema in `src/lib/validation/schemas.ts`, not inline.
- [ ] `requestLogger` + `captureException` imported from
      `@/lib/observability`.
- [ ] Handler wrapped in `try { ... } catch { captureException; 500 }`.
- [ ] State mutations write compliance events.
- [ ] Unit tests under `__tests__/`.
- [ ] `npm test && npx tsc --noEmit && npm run lint && npx prettier
      --check .` all green.
- [ ] Commit message follows Conventional Commits with `DR-NNN` ref.
- [ ] PR opened with filled template.

## References

- ADR-005 — observability surface.
- ADR-007 — CI discipline.
- ADR-008 — Pocock `design-an-interface` skill.
- `.context/domain-models.md` — concept → Prisma model mapping.
- `CONTRIBUTING.md` — branch and commit conventions.
