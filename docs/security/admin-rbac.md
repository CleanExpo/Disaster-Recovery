# Admin RBAC — Defence-in-Depth

_Last updated: 2026-04-26 (audit A11 verification)._

## Three layers of admin authorisation

DR enforces admin role checks at THREE independent layers. An attacker
would need to bypass ALL THREE to reach admin functionality.

### Layer 1 — Edge middleware

**File:** `src/middleware.ts:148-180`

Runs on every request matching `/admin/*` or `/contractor/*`. Resolves
the NextAuth JWT, redirects unauthenticated requests to `/login`, and
redirects authenticated-but-non-admin requests to `/?error=AccessDenied`.

Fail-closed: if `NEXTAUTH_SECRET` is missing or the token is malformed,
the middleware treats the request as unauthenticated rather than
returning a 500.

### Layer 2 — Admin layout

**File:** `app/admin/layout.tsx:48-66`

Server component layout that wraps every page under `app/admin/*`.
Uses `getServerSession(authOptions)` to resolve the session at render
time, then checks `isAdminRole(session.user.role)`. Non-admins are
redirected to `/dashboard`; unauthenticated users to `/login` with a
`reason=session_expired` query so the login page can show context.

This layer protects against scenarios where the middleware is bypassed
(e.g. a Next.js routing edge case, a direct render in dev tools, a
server-side redirect that skips middleware).

### Layer 3 — API route guards

Two patterns, both valid:

**Session-based** — `src/lib/admin-auth.ts`:

```typescript
import { requireAdmin } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const sessionOrError = await requireAdmin();
  if (sessionOrError instanceof NextResponse) return sessionOrError;
  // ... handler with session.user available
}
```

Used by 6 of 8 admin API routes (contractor-applications, leads, etc.).

**JWT-based** — direct `getToken()`:

```typescript
import { getToken } from 'next-auth/jwt';
import { isAdminRole } from '@/lib/admin-constants';

const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
if (!token) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
if (!isAdminRole(token.role as string | undefined)) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

Used by `app/api/admin/users/route.ts`. The JWT path skips the session
DB lookup, which is fine for stateless API calls.

### Bearer-token ops routes (separate auth model)

The voice kill-switch and status routes use a different auth model —
`KILL_SWITCH_ADMIN_SECRET` bearer token rather than NextAuth session.
This is deliberate per DR-715 so ops automation (cron jobs, oncall
scripts) can call them without a human-in-browser session.

**Files:**

- `app/api/admin/voice/kill-switch/route.ts`
- `app/api/admin/voice/status/route.ts`

These are NOT admin-RBAC routes in the human-permission sense; they're
shared-secret ops surfaces. Don't conflate the two.

## What this means in practice

To reach admin functionality, a request must pass:

1. Edge middleware (path-level redirect)
2. Layout (page-level render guard)
3. API handler (data-level access guard)

Each layer is independently sufficient. The defence-in-depth is real:
breaking any one layer (or even two) does not expose admin data.

## Constants + role definitions

- **Canonical role names:** `src/lib/admin-constants.ts` — `isAdminRole()`
  returns true for `admin`, `ADMIN`, `super_admin`, `MANAGER`. Add new
  admin role names here, never inline a string check.
- **Auth options:** `src/lib/auth.ts` — NextAuth config (Supabase
  - custom contractor adapter).

## Audit posture

- **A11 (audit finding):** "Per-admin-page RBAC (defence-in-depth
  beyond middleware)" — **resolved by this 3-layer architecture**.
  Adding per-page guards inside `app/admin/*` would be redundant
  (the layout already checks).
- **A1 + A14:** secret rotation + CORS tightening — done in earlier
  PRs.

## When to add a 4th layer

Per-page guards inside `app/admin/*` are NOT generally necessary. Add
a per-page guard only when:

1. A page renders data from a different data class than the rest
   of the admin tree (e.g. a SECRET-class contractor commission
   view that should require a stronger role like `super_admin`).
2. A page has its own audit-trail requirement that can't be satisfied
   by the layout guard.

In those cases, the per-page guard MUST be additive — it should call
the same `isAdminRole()` helper plus its stronger condition, never
replace the layer-2 check.

## References

- `src/middleware.ts` — Layer 1
- `app/admin/layout.tsx` — Layer 2
- `src/lib/admin-auth.ts` — Layer 3 helper
- `src/lib/admin-constants.ts` — canonical role names
- `.claude/rules/privacy.md §1` — data-class taxonomy
- DR-715 — voice kill-switch ops auth model
