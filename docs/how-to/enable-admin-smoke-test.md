# How to enable the `/admin` redirect smoke test

_Last fixme remaining in `tests/smoke/critical-paths.spec.ts` after
DR-804 closed Skip 2 (`/api/log-error`). Skip 1 (`/admin`) is
**environmental** — it needs two env vars in Vercel Preview that
aren't set today._

## What the test asserts

`Tier 3: Auth Safety > /admin redirects unauthenticated users` —
checks that an anonymous request to `/admin` returns one of
`[301, 302, 303, 307, 308, 401, 403]`, never 200. The route is
gated by `app/admin/layout.tsx`, which calls
`getServerSession(authOptions)` and then `redirect('/login?...')`
when the session is null.

## Why it's fixme'd today

In Vercel **Preview** deploys (the URL the smoke test hits),
`NEXTAUTH_SECRET` and `NEXTAUTH_URL` are not set. Without those
two vars:

- `getServerSession()` throws inside the layout
- The thrown error skips the `redirect()` call entirely
- Next.js error boundary catches the throw → returns **500**, not
  a redirect → smoke test fails

In production both vars are set so the redirect fires correctly.
The behaviour is right; only the preview surface is unconfigured.

## Re-enable steps

### 1. Set the two env vars in Vercel Preview

Vercel dashboard → **disaster-recovery** project → **Settings** →
**Environment Variables** → add to the **Preview** environment
(NOT Production — those are already set).

| Variable          | Value                      | Notes                                                                                                                                                            |
| ----------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXTAUTH_SECRET` | _same value as Production_ | Use the existing Production value so JWTs encode/decode the same way. Found at: Settings → Environment Variables → filter "Production" → copy `NEXTAUTH_SECRET`. |
| `NEXTAUTH_URL`    | `$VERCEL_URL`              | Vercel auto-injects the per-deploy preview URL. Use the literal string `$VERCEL_URL` so each preview gets the right value.                                       |

### 2. Trigger a fresh preview deploy

Either push a no-op commit to a PR branch, or open the PR and
click **Redeploy** from the latest preview deployment. The new
preview should pick up the env vars.

### 3. Curl-verify (optional)

```bash
curl -I -L --max-redirs 0 https://<preview-url>.vercel.app/admin
# expect: HTTP/2 307 (redirect to /login) — NOT 500
```

### 4. Remove the `test.fixme` wrapper

Edit `tests/smoke/critical-paths.spec.ts` Tier 3 block:

```diff
   for (const route of protectedRoutes) {
-    // /admin specifically is fixme'd — Vercel preview deploys don't have
-    // NEXTAUTH_* env vars, so getServerSession() throws before the
-    // redirect() can fire and the layout 500s. Re-enable conditions in
-    // docs/audits/smoke-test-known-skips-2026-04-30.md.
-    const isAdminRoot = route === '/admin';
-    const runner = isAdminRoot ? test.fixme : test;
-    runner(`${route} redirects unauthenticated users`, async ({ request }) => {
+    test(`${route} redirects unauthenticated users`, async ({ request }) => {
       const response = await request.get(route, { maxRedirects: 0 });
       const status = response.status();
       expect(
         [301, 302, 303, 307, 308, 401, 403],
         `${route} must not be publicly accessible`,
       ).toContain(status);
     });
   }
```

### 5. Update the skips-tracking doc

Mark Skip 1 as **CLOSED** in
`docs/audits/smoke-test-known-skips-2026-04-30.md`, mirroring how
Skip 2 was closed in PR #333.

## Scope note — auth provider list

`src/lib/auth.ts` only configures **CredentialsProvider** (email +
password). No OAuth providers (Google / GitHub / etc.) so no extra
client-id / client-secret env vars are needed. Just the two above.

If a future PR adds an OAuth provider, the corresponding
`*_CLIENT_ID` + `*_CLIENT_SECRET` will need to be set in Preview
too — same pattern.

## Cross-references

- `docs/audits/smoke-test-known-skips-2026-04-30.md` — original
  fixme tracking
- `tests/smoke/critical-paths.spec.ts` — the test
- `src/lib/auth.ts` — `authOptions` definition
- `app/admin/layout.tsx` — the redirect gate
- `.env.example` — documents all expected env vars (Production set
  already covers `NEXTAUTH_SECRET` + `NEXTAUTH_URL`)

## Owner

Phill (env config) → next agent (test + doc cleanup once env is
populated).
