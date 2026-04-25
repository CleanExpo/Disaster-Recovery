# Phase 2 — Design-an-Interface

**Loop:** `2026-04-30-equipped-phase2-jwt`

## New module: `src/lib/finance/jwt-handoff.ts`

```ts
export interface EquippedHandoffClaims {
  ref: string; // referral id (uuid)
  email: string;
  mobile: string;
  name: string;
  amt?: string; // funding_band
  typ?: string; // customer_type
  src: string; // issuer subdomain
}

export interface SignOptions {
  claims: EquippedHandoffClaims;
  secret: string;
  kid?: string;
  expiresInSecs?: number; // default 900 (15 min)
  issuer?: string; // default 'disasterrecovery.com.au'
  audience?: string; // default 'equippedcf.com.au'
}

export async function signEquippedHandoffToken(opts: SignOptions): Promise<string>;

export interface VerifyOptions {
  token: string;
  secret: string;
  audience?: string; // default 'equippedcf.com.au'
  issuer?: string; // default 'disasterrecovery.com.au'
}

export type VerifyResult =
  | { ok: true; claims: EquippedHandoffClaims & { exp: number; iat: number; kid?: string } }
  | {
      ok: false;
      reason: 'expired' | 'wrong-audience' | 'wrong-issuer' | 'bad-signature' | 'malformed';
    };

export async function verifyEquippedHandoffToken(opts: VerifyOptions): Promise<VerifyResult>;
```

Signature: HS256 only (matches existing). Audience + issuer enforced.
`exp` claim required and must be future. `kid` claim added to header
when supplied (never to payload). On verify, `kid` extracted from
header into the result for caller telemetry.

## Wiring changes

| File                                   | Change                                                                                                                                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/finance/referral/route.ts`    | Use `signEquippedHandoffToken` instead of inline `new SignJWT(...)`; add `kid` from `EQUIPPED_JWT_KID` env (default `'dr-2026-04'`)                                                                      |
| `app/finance/handoff/page.tsx`         | Server-side `verifyEquippedHandoffToken` before rendering `<HandoffFrame>`; on failure render the existing error UI                                                                                      |
| `app/finance/handoff/HandoffFrame.tsx` | Read `NEXT_PUBLIC_EQUIPPED_EMBED_ORIGIN` env (default `https://equippedcf.com.au`); use that for both iframe target origin AND postMessage `targetOrigin`                                                |
| `app/finance/thank-you/page.tsx`       | NEW — minimal server component for post-completion landing                                                                                                                                               |
| `.env.example`                         | Append Equipped section: `JWT_SECRET_KEY`, `EQUIPPED_JWT_KID`, `EQUIPPED_WEBHOOK_SECRET`, `NEXT_PUBLIC_EQUIPPED_EMBED_URL`, `NEXT_PUBLIC_EQUIPPED_EMBED_ORIGIN`, `NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED` |

## Tests (`src/lib/finance/__tests__/jwt-handoff.test.ts`)

Vitest. Cases:

1. Signed token verifies cleanly, claims round-trip.
2. Expired token returns `{ ok: false, reason: 'expired' }`.
3. Wrong audience returns `{ ok: false, reason: 'wrong-audience' }`.
4. Wrong issuer returns `{ ok: false, reason: 'wrong-issuer' }`.
5. Tampered signature returns `{ ok: false, reason: 'bad-signature' }`.
6. Malformed token (not three segments) returns `{ ok: false, reason: 'malformed' }`.
7. `kid` round-trips when supplied.

## Verification contract

- `npx tsc --noEmit` clean.
- `npx vitest run src/lib/finance/__tests__/jwt-handoff.test.ts` — all tests pass.
- Existing `webhook-verify.test.ts` still green.
- `/finance/handoff?token=junk&id=junk` shows the existing error UI
  (no iframe mount).
- `/finance/handoff?token=<valid signed token>&id=<matching id>`
  shows the iframe (existing happy path).

## Out of scope

- PII in JWT claims (residual debt — Phase 2.5).
- Multi-`kid` rotation map (defer until 2nd key needed).
- Real partner secret values (Phill's call when Equipped provides).

**Proceed to Phase 3 — Plan.**
