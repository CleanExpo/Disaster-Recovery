/**
 * NOT LEGAL ADVICE.
 *
 * Equipped Commercial Finance — JWT handoff sign + verify (L6 Phase 2).
 *
 * Issues a short-lived HS256 JWT that authorises the iframe handoff at
 * `/finance/handoff` to prefill an Equipped application. The same module
 * verifies the token server-side before the handoff page mounts the
 * iframe, so a forged URL cannot trigger an iframe postMessage.
 *
 * Pairs with:
 *   - app/api/finance/referral/route.ts (issuer)
 *   - app/finance/handoff/page.tsx (verifier)
 *
 * `kid` claim is supported in the JWT header for forward-compatible key
 * rotation. Today there is one key (env `JWT_SECRET_KEY`); when a second
 * key is needed, swap the secret resolution for a `Record<string, string>`
 * lookup keyed by `kid`.
 */

import { SignJWT, jwtVerify, errors as joseErrors } from 'jose';

export interface EquippedHandoffClaims {
  /** Referral id (uuid v4 from `randomUUID()`). */
  ref: string;
  /** Customer email — PII, refactor candidate (see loop 06-review). */
  email: string;
  /** Customer mobile — PII, refactor candidate. */
  mobile: string;
  /** Customer name — PII, refactor candidate. */
  name: string;
  /** Funding band, e.g. "25-50k". */
  amt?: string;
  /** Customer type, e.g. "business". */
  typ?: string;
  /** Issuer subdomain marker (legacy field, kept for Equipped parity). */
  src: string;
}

const DEFAULT_ISSUER = 'disasterrecovery.com.au';
const DEFAULT_AUDIENCE = 'equippedcf.com.au';
const DEFAULT_EXPIRES_IN_SECS = 900; // 15 minutes

export interface SignOptions {
  claims: EquippedHandoffClaims;
  /** Shared secret. In dev a fallback is acceptable; prod must set JWT_SECRET_KEY. */
  secret: string;
  /** Optional key id for header (`kid`). Forward-compat for rotation. */
  kid?: string;
  expiresInSecs?: number;
  issuer?: string;
  audience?: string;
}

export async function signEquippedHandoffToken(opts: SignOptions): Promise<string> {
  const expSecs = opts.expiresInSecs ?? DEFAULT_EXPIRES_IN_SECS;
  const issuer = opts.issuer ?? DEFAULT_ISSUER;
  const audience = opts.audience ?? DEFAULT_AUDIENCE;

  const header: { alg: 'HS256'; typ: 'JWT'; kid?: string } = {
    alg: 'HS256',
    typ: 'JWT',
  };
  if (opts.kid) header.kid = opts.kid;

  return new SignJWT({ ...opts.claims })
    .setProtectedHeader(header)
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(`${expSecs}s`)
    .sign(new TextEncoder().encode(opts.secret));
}

export interface VerifyOptions {
  token: string;
  secret: string;
  audience?: string;
  issuer?: string;
}

export type VerifyResult =
  | {
      ok: true;
      claims: EquippedHandoffClaims & {
        exp: number;
        iat: number;
        kid?: string;
      };
    }
  | {
      ok: false;
      reason: 'expired' | 'wrong-audience' | 'wrong-issuer' | 'bad-signature' | 'malformed';
    };

export async function verifyEquippedHandoffToken(opts: VerifyOptions): Promise<VerifyResult> {
  const audience = opts.audience ?? DEFAULT_AUDIENCE;
  const issuer = opts.issuer ?? DEFAULT_ISSUER;

  // Cheap pre-check: a JWT must have exactly three dot-separated segments.
  if (typeof opts.token !== 'string' || opts.token.split('.').length !== 3) {
    return { ok: false, reason: 'malformed' };
  }

  try {
    const { payload: claims, protectedHeader } = await jwtVerify<EquippedHandoffClaims>(
      opts.token,
      new TextEncoder().encode(opts.secret),
      {
        algorithms: ['HS256'],
        issuer,
        audience,
      },
    );

    return {
      ok: true,
      claims: {
        ...claims,
        exp: claims.exp as number,
        iat: claims.iat as number,
        kid: typeof protectedHeader.kid === 'string' ? protectedHeader.kid : undefined,
      },
    };
  } catch (err) {
    if (err instanceof joseErrors.JWTExpired) {
      return { ok: false, reason: 'expired' };
    }
    if (err instanceof joseErrors.JWTClaimValidationFailed) {
      // claim_check_failed includes audience + issuer mismatches.
      const claim = (err as joseErrors.JWTClaimValidationFailed).claim;
      if (claim === 'aud') return { ok: false, reason: 'wrong-audience' };
      if (claim === 'iss') return { ok: false, reason: 'wrong-issuer' };
      // Fall through to bad-signature as a conservative default.
      return { ok: false, reason: 'bad-signature' };
    }
    if (err instanceof joseErrors.JWSSignatureVerificationFailed) {
      return { ok: false, reason: 'bad-signature' };
    }
    if (err instanceof joseErrors.JWSInvalid || err instanceof joseErrors.JWTInvalid) {
      return { ok: false, reason: 'malformed' };
    }
    return { ok: false, reason: 'bad-signature' };
  }
}
