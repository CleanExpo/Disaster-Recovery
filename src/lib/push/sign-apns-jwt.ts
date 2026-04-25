/**
 * APNs provider-token JWT signer.
 *
 * RA-1633 iOS epic — Phase 3b. Native Node `crypto` only — no push
 * library dependencies.
 *
 * Apple requires an ES256 JWT whose `iat` is less than an hour old.
 * We cache a single signed token in-memory for up to 50 minutes and
 * re-sign on demand. No persistence — a cold server re-signs on its
 * first push.
 *
 * The private key never appears in logs or error messages.
 */

import { createPrivateKey, createSign } from 'node:crypto';

const TOKEN_TTL_MS = 50 * 60 * 1000; // 50 min — Apple cap is 60.

interface Cached {
  jwt: string;
  issuedAt: number;
  keyIdFingerprint: string;
}

let cached: Cached | null = null;

export interface ApnsSigningInput {
  keyId: string;
  teamId: string;
  /** base64-encoded .p8 file contents (PEM-wrapped EC private key). */
  p8Base64: string;
}

function base64UrlEncode(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input) : input;
  return buf.toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Simple fingerprint so the cache invalidates if the signing key
 * rotates (different keyId) without ever exposing the private bytes.
 */
function fingerprint(input: ApnsSigningInput): string {
  return `${input.keyId}:${input.teamId}:${input.p8Base64.length}`;
}

/**
 * Get a valid APNs provider token, signing a new one if the cached
 * token is missing, expired, or was signed with different credentials.
 */
export function getApnsJwt(input: ApnsSigningInput): string {
  const now = Date.now();
  const fp = fingerprint(input);

  if (cached && cached.keyIdFingerprint === fp && now - cached.issuedAt < TOKEN_TTL_MS) {
    return cached.jwt;
  }

  const header = { alg: 'ES256', kid: input.keyId, typ: 'JWT' };
  const payload = { iss: input.teamId, iat: Math.floor(now / 1000) };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const pem = Buffer.from(input.p8Base64, 'base64').toString('utf8');
  const keyObject = createPrivateKey({ key: pem, format: 'pem' });

  const signer = createSign('SHA256');
  signer.update(signingInput);
  signer.end();
  // Apple requires IEEE P1363 (r||s concat), not the DER encoding Node
  // emits by default.
  const signature = signer.sign({ key: keyObject, dsaEncoding: 'ieee-p1363' });
  const encodedSignature = base64UrlEncode(signature);

  const jwt = `${signingInput}.${encodedSignature}`;
  cached = { jwt, issuedAt: now, keyIdFingerprint: fp };
  return jwt;
}

/** Test hook — never called in production. */
export function __resetApnsJwtCacheForTests(): void {
  cached = null;
}
