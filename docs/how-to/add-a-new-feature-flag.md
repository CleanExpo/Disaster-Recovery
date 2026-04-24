# How-to: Add a new feature flag

Feature flags are the kill-switch and the rollout mechanism. Ship flag-off
to production, flip flag-on per environment, roll back by flipping flag-off.
Every non-trivial feature gets one.

## 1. Naming

Format: `NEXT_PUBLIC_<FEATURE>_ENABLED`

Rules:

- `NEXT_PUBLIC_` prefix only if the flag is read in client-side code.
  Server-only flags drop the prefix: `<FEATURE>_ENABLED`.
- `<FEATURE>` is SCREAMING_SNAKE_CASE, specific enough that future
  contributors can tell what it toggles.
  - Good: `NEXT_PUBLIC_VOICE_PIPELINE_ENABLED`,
    `FINANCE_REFERRAL_WRITER_ENABLED`.
  - Bad: `NEW_FEATURE`, `FLAG_A`.
- Suffix `_ENABLED` for boolean on/off. Use `_MODE` (`"off" | "shadow"
  | "on"`) for three-way rollouts; document in `.env.example`.

## 2. Default

`false`. Always.

A flag that defaults to `true` is not a flag; it is a configuration
value that happens to have two options. If you need the feature on by
default, either (a) ship without a flag and accept the blast radius, or
(b) name it as a disable flag (`<FEATURE>_DISABLED`) and default it
false so new environments are safe.

## 3. Add to `.env.example`

Place the flag in the correct section (voice, finance, compliance,
observability, etc.) with a comment explaining what it does and what
happens when it flips true.

```bash
# ───── Voice pipeline (DR-708 / DR-715) ─────

# When true: ElevenLabs voice pipeline is active, accepts inbound calls,
# writes transcripts via DR-714 redaction cron.
# When false (default): pipeline returns 503 for all voice endpoints,
# transcript cron is a no-op.
# Rollback: flip false in Vercel; change is live on next cold invocation.
NEXT_PUBLIC_VOICE_PIPELINE_ENABLED=false
```

## 4. Gate every code path

Server-side:

```ts
const voiceEnabled = process.env.VOICE_PIPELINE_ENABLED === 'true';
if (!voiceEnabled) {
  return NextResponse.json({ error: 'feature_disabled' }, { status: 503 });
}
```

Client-side:

```tsx
const voiceEnabled = process.env.NEXT_PUBLIC_VOICE_PIPELINE_ENABLED === 'true';
if (!voiceEnabled) return null;
```

Rules:

- Every code path that reads the flag checks it at the entry point,
  not deep inside a helper. An unreached branch is easier to reason
  about than a branch that runs halfway and then bails.
- `process.env.<NAME> === 'true'` is the only comparison. Not
  `Boolean(process.env.<NAME>)`, not `!!process.env.<NAME>` — both
  evaluate truthy for the string `"false"`, which is a silent footgun.
- In TypeScript, prefer a narrow helper if the flag is read in more
  than two places:

  ```ts
  // src/lib/flags.ts
  export const isVoiceEnabled = () => process.env.VOICE_PIPELINE_ENABLED === 'true';
  ```

## 5. Document the rollback plan

Every flag-gated feature has a one-paragraph rollback plan in the PR
body or in the feature's ADR. Flipping `false` in Vercel is instant —
the next cold invocation picks up the new value. Warm invocations keep
the old value until the Lambda recycles (typically <15 min).

Rollback plan template:

```
To disable: set <FLAG_NAME>=false in Vercel → Production.
Propagation: <15 min for warm, immediate for cold invocations.
Blast radius if flipped mid-request: <describe what happens to an
in-flight user>.
Dependencies: <list other flags or infra that must also revert>.
```

## 6. Add an ADR if non-trivial

A flag is non-trivial if any of:

- It gates a new persistent data surface.
- It gates a compliance-sensitive flow (consent, disclosure,
  retention).
- It gates a paid external dependency (ElevenLabs, Equipped, Stripe
  premium tiers).
- It will stay flag-gated for more than one sprint.

Trivial flags (feature polish, UI A/B) do not need an ADR; the PR body
is enough.

## 7. Verify off in production before shipping code

Sequence:

1. Add the flag to `.env.example` with default `false`.
2. Push the flag-gated code. CI green. PR merged.
3. **Before** flipping the flag true in any environment, check Vercel
   env vars: the flag should either be absent (reads undefined →
   false) or explicitly set to `"false"`.
4. Flip staging/preview first. Smoke test.
5. Flip production. Monitor observability for ~30 min.

If you skip step 3, you can merge code that runs a half-built feature
against real users because the flag defaulted unset in CI but was
previously set true in production for an unrelated test.

## Checklist

- [ ] Flag named `NEXT_PUBLIC_<FEATURE>_ENABLED` (or without prefix
      for server-only).
- [ ] Default `false`.
- [ ] Entry in `.env.example` with clear comment.
- [ ] Every code path reading the flag uses
      `process.env.<NAME> === 'true'`.
- [ ] Rollback plan in PR body or ADR.
- [ ] ADR opened if feature is non-trivial.
- [ ] Flag verified off in production env vars before shipping.
- [ ] Flag flipped in staging first, production second, with observability
      watched for ≥30 min.

## References

- `.env.example` — current flag list and comments.
- ADR-005 — observability for monitoring flag flips.
- DR-715 — voice pipeline kill-switch (5-layer reference).
- ADR-006 — Foundation Sprint context (Day 8 was the flag hygiene
  sweep).
