/**
 * Root-level middleware shim.
 *
 * Next.js looks for `middleware.ts` at the project root when the `app/`
 * directory is also at the project root (which is the case here). It does
 * NOT pick up `src/middleware.ts` in this layout — that path is only used
 * when `app/` lives under `src/app/`.
 *
 * Without this shim, the middleware at `src/middleware.ts` was silently
 * skipped: rate limiting, CORS, and the RBAC redirect for /admin and
 * /contractor never ran. Unauthenticated GETs to /admin returned a 200
 * (RSC-streamed loading shell) instead of a 307 to /login, which broke
 * the `/admin must not be publicly accessible` smoke test and was a
 * latent security issue.
 *
 * This file re-exports the existing middleware + matcher so we don't
 * duplicate logic. All edits should still happen in `src/middleware.ts`.
 */

export { middleware, config } from './src/middleware';
