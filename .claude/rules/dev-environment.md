# Dev Environment — Disaster Recovery

> Build quirks, tooling expectations, and the things that will burn an
> hour if nobody tells you. Linked from @CLAUDE.md §0.

_Last updated: 2026-04-24 (Foundation Sprint Day 10)._

---

## 1. Host OS

- Primary dev host: Windows 11, PowerShell + Git Bash.
- Forward slashes in paths wherever a tool accepts them.
- Use `/dev/null` not `NUL` in scripts — project scripts assume a
  Unix-style shell (git-bash is fine).
- `npm` shims work; `npx` works; Python optional.

## 2. Node + package manager

- **Package manager:** `npm` (not pnpm, not yarn — lockfile is
  `package-lock.json`).
- **Install command:** `npm install --legacy-peer-deps`.
  - Reason: pre-existing peer conflict between `@langchain/community`
    and `openai@5.x`. This is tracked; do not "fix" it by changing
    either version without checking downstream usage.
- **Scripts (`npm run …`):** `dev`, `build`, `start`, `lint`,
  `prisma:generate`, `prisma:migrate`, `db:studio`, `db:deploy`,
  `test:e2e`, `test:e2e:ui`, `test:e2e:report`, `check:scripts`,
  `postinstall`.

## 3. Next.js quirks

- **Redirects evaluate BEFORE filesystem routes.** A catch-all route in
  `next.config.js` (e.g. `/locations/:loc`) will eat real pages unless
  guarded by a negative-lookahead regex.
  - If you add new location pages, update the negative lookahead in
    `next.config.js` (~line 215) AND add the path to `PAGES_WITH_OWN_FAQ`
    in `src/components/seo/GlobalFAQSchema.tsx`.
- **Canonical URLs:** near-100% coverage; dynamic routes use
  `generateMetadata()`. If you add a page, add a canonical.
- **`'use client'` pages + metadata:** client components can't export
  metadata. Wrap in a `layout.tsx` or split into a server parent +
  client child.

## 4. Deployment

- **Vercel is authoritative.** If the local build passes but Vercel
  fails, Vercel wins — investigate there.
- Production branch: `main`. Preview deployments auto-generated for
  every PR.
- **Rollback:** flip the relevant feature flag in Vercel env and
  redeploy the SAME commit — do NOT revert unless code is broken.

## 5. Feature flag convention

- **Name:** `NEXT_PUBLIC_<FEATURE>_ENABLED`.
- **Read as:** string `'true'` only. `if (process.env.NEXT_PUBLIC_X_ENABLED === 'true')`.
- **Default:** OFF.
- **Zero-impact rule:** when the flag is off, the code path MUST have
  no runtime footprint (no extra network calls, no extra bundles, no
  altered UI).
- **Kill switches are SEPARATE** from feature flags (voice-agent 5-layer
  kill switch is the example — see @.claude/rules/privacy.md §4).
- **Rollback = flip the env var + redeploy.** No code change needed.
- See @docs/adr/ADR-004-feature-flag-strategy.md.

## 6. Environment variables

- Secret keys live in Vercel env only (never in `.env` committed to
  git).
- `.env`, `.env.local`, `.env.production`, `.env.*.local` are all in
  `.gitignore` — that is the **only** mechanism preventing secret
  commits. Discipline + `.gitignore` is the contract; do not rely on
  any external scanner that may produce false-positive noise.
- If you need to add a new secret variable, add it to `.env` locally
  AND mirror the variable name (placeholder value) into `.env.example`.
- For production, set the value in Vercel env vars only.

## 7. Git hooks (Husky — DR-Day-6)

Every commit runs:

1. **Prettier** (via `lint-staged`) — formats staged files.
2. **ESLint** (via `next lint`) — catches runtime-risky patterns.
3. **Typecheck** (`tsc --noEmit`) — hard CI gate (DR-Day-4 added
   `useUnknownInCatchVariables`; 227 strict errors still to clear —
   tracked in @MEMORY.md).
4. **Commitlint** — enforces `<type>(<scope>): <subject>`.

Do NOT use `--no-verify` to skip hooks. If a hook fails, FIX the issue
and create a new commit — never `--amend` past a failed hook (see
@CLAUDE.md §5.5).

## 8. Commit message format

```
<type>(<scope>): <subject>

<body — optional, wrap at 72>
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `perf`, `chore`,
`security`, `style`.

Scopes commonly used: `foundation`, `claim`, `voice`, `contractor`,
`seo`, `compliance`, `observability`, `audits`, `finance`, `payments`.

Example:

```
feat(voice): DR-710 HMAC-auth the 5-tool surface
```

## 9. CI pipeline

On every PR to `main`:

- Gitleaks (DR-Day-0).
- Typecheck (DR-Day-4 hard gate).
- Lint.
- Prettier check.
- Playwright smoke (2 remaining failures tracked — see @MEMORY.md).
- Vercel preview deploy.

A merge requires all gates green.

## 10. Prisma workflow

- **Schema:** `prisma/schema.prisma` — source of truth for DB models.
- **Generate client:** `npm run prisma:generate` (also runs at
  `postinstall`).
- **Migrate:** `npm run prisma:migrate` (dev) / `db:deploy` (prod).
- **Studio:** `npm run db:studio` for local inspection.
- **NEVER:** write raw SQL migrations by hand — use Prisma Migrate.
- Supabase is the hosted Postgres; see
  `prisma/supabase-tables-introspection.md` for drift notes.

## 11. Known quirks

- `data/suburbs/*.ts` is git-ignored by `/data/*`. Use `git add -f`
  when adding a new suburb dataset.
- Tailwind classes using US spelling (`text-gray-400`) are KEPT — don't
  rename. See @.claude/rules/australian-english.md §11.
- The old `r6-demo/*` tree has dead files; don't "clean up" them in
  unrelated PRs.
- Some service pages use `AgContentPageTemplate` (supports `heroImage`
  - `ctaImage` props); guide pages use `AgGuidePageTemplate` (auto
    Article + FAQPage JSON-LD when `faqs` prop is passed).

## 12. Recommended editor setup

- TypeScript SDK: project-local (`node_modules/typescript`).
- ESLint + Prettier extensions with "format on save" OFF (let Husky
  handle it — otherwise diff noise).
- `.editorconfig` is respected; don't override line endings.

---

## References

- @CLAUDE.md §3 (commands)
- @CLAUDE.md §5.3 (feature flags)
- @MEMORY.md (known drifts + open debt)
- @docs/adr/ADR-004-feature-flag-strategy.md
