/**
 * Unit tests for src/lib/finance/jwt-handoff.ts (L6 Phase 2).
 */

import { describe, expect, it } from 'vitest';
import { SignJWT } from 'jose';
import {
  signEquippedHandoffToken,
  verifyEquippedHandoffToken,
  type EquippedHandoffClaims,
} from '../jwt-handoff';

const SECRET = 'unit-test-secret-min-32-chars-long-please-aaaaaa';
const OTHER_SECRET = 'wrong-secret-min-32-chars-long-please-aaaaaaaa';

const baseClaims: EquippedHandoffClaims = {
  ref: '11111111-1111-4111-8111-111111111111',
  email: 'test@example.com.au',
  mobile: '0400000000',
  name: 'Test User',
  amt: '25-50k',
  typ: 'business',
  src: 'disasterrecovery.com.au',
};

describe('signEquippedHandoffToken / verifyEquippedHandoffToken', () => {
  it('round-trips a valid token', async () => {
    const token = await signEquippedHandoffToken({ claims: baseClaims, secret: SECRET });
    const result = await verifyEquippedHandoffToken({ token, secret: SECRET });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.claims.ref).toBe(baseClaims.ref);
      expect(result.claims.email).toBe(baseClaims.email);
      expect(result.claims.amt).toBe(baseClaims.amt);
      expect(typeof result.claims.exp).toBe('number');
      expect(typeof result.claims.iat).toBe('number');
    }
  });

  it('returns wrong-issuer when iss does not match', async () => {
    const token = await signEquippedHandoffToken({
      claims: baseClaims,
      secret: SECRET,
      issuer: 'wrong-issuer.example.com',
    });
    const result = await verifyEquippedHandoffToken({ token, secret: SECRET });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe('wrong-issuer');
  });

  it('returns wrong-audience when aud does not match', async () => {
    const token = await signEquippedHandoffToken({
      claims: baseClaims,
      secret: SECRET,
      audience: 'wrong-audience.example.com',
    });
    const result = await verifyEquippedHandoffToken({ token, secret: SECRET });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe('wrong-audience');
  });

  it('returns bad-signature when the secret is wrong', async () => {
    const token = await signEquippedHandoffToken({ claims: baseClaims, secret: SECRET });
    const result = await verifyEquippedHandoffToken({ token, secret: OTHER_SECRET });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe('bad-signature');
  });

  it('returns expired when the token has elapsed', async () => {
    // Sign a token with `exp` already in the past via low-level jose.
    const past = Math.floor(Date.now() / 1000) - 60;
    const expired = await new SignJWT({ ...baseClaims })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuer('disasterrecovery.com.au')
      .setAudience('equippedcf.com.au')
      .setIssuedAt(past - 60)
      .setExpirationTime(past)
      .sign(new TextEncoder().encode(SECRET));

    const result = await verifyEquippedHandoffToken({ token: expired, secret: SECRET });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe('expired');
  });

  it('returns malformed for non-JWT input', async () => {
    const result = await verifyEquippedHandoffToken({ token: 'not-a-jwt', secret: SECRET });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe('malformed');
  });

  it('round-trips the kid header claim when supplied', async () => {
    const token = await signEquippedHandoffToken({
      claims: baseClaims,
      secret: SECRET,
      kid: 'dr-2026-04',
    });
    const result = await verifyEquippedHandoffToken({ token, secret: SECRET });

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.claims.kid).toBe('dr-2026-04');
  });
});
