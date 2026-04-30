/**
 * Unit tests for src/lib/encryption.ts
 *
 * Covers the round-trip + invariant guarantees of the AES-256-GCM
 * envelope (encrypt/decrypt), the password-based legacy AES helpers
 * (encryptData/decryptData), the hash + HMAC helpers, and the
 * PII-masking + sanitisation utilities. We do NOT test specific
 * ciphertext bytes — those are non-deterministic by design (random
 * IV / salt). We test that encrypt+decrypt is a round trip and that
 * each encrypt produces a fresh ciphertext.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  isConfigured,
  encrypt,
  decrypt,
  encryptData,
  decryptData,
  hashData,
  verifyHash,
  generateSecureToken,
  maskSensitiveData,
  generateHMAC,
  verifyHMAC,
  sanitizeInput,
  getEncryptionKey,
} from '../encryption';

describe('isConfigured', () => {
  let saved: string | undefined;
  beforeEach(() => {
    saved = process.env.ENCRYPTION_SECRET;
  });
  afterEach(() => {
    if (saved === undefined) delete process.env.ENCRYPTION_SECRET;
    else process.env.ENCRYPTION_SECRET = saved;
  });

  it('returns true when ENCRYPTION_SECRET is set', () => {
    process.env.ENCRYPTION_SECRET = 'a-test-secret-of-sufficient-length-32++';
    expect(isConfigured()).toBe(true);
  });

  it('returns false when ENCRYPTION_SECRET is unset', () => {
    delete process.env.ENCRYPTION_SECRET;
    expect(isConfigured()).toBe(false);
  });
});

describe('encrypt / decrypt — AES envelope', () => {
  let saved: string | undefined;
  beforeEach(() => {
    saved = process.env.ENCRYPTION_SECRET;
    process.env.ENCRYPTION_SECRET = 'test-secret-must-be-at-least-32chars!!';
  });
  afterEach(() => {
    if (saved === undefined) delete process.env.ENCRYPTION_SECRET;
    else process.env.ENCRYPTION_SECRET = saved;
  });

  it('round-trips a plaintext value', async () => {
    const plain = '123 Example Street, Brisbane QLD 4000';
    const ct = await encrypt(plain);
    const back = await decrypt(ct);
    expect(back).toBe(plain);
  });

  it('produces ciphertext with the aes:v1: prefix', async () => {
    const ct = await encrypt('hello');
    expect(ct.startsWith('aes:v1:')).toBe(true);
  });

  it('produces a different ciphertext on every call (random IV)', async () => {
    const a = await encrypt('hello');
    const b = await encrypt('hello');
    expect(a).not.toBe(b);
  });

  it('returns the input unchanged for empty / falsy inputs', async () => {
    expect(await encrypt('')).toBe('');
    expect(await decrypt('')).toBe('');
  });

  it('throws when an aes:v1: blob is decrypted without ENCRYPTION_SECRET', async () => {
    const ct = await encrypt('hello');
    delete process.env.ENCRYPTION_SECRET;
    await expect(decrypt(ct)).rejects.toThrow(/ENCRYPTION_SECRET/);
  });

  it('throws when a legacy kms:v1: blob is decrypted', async () => {
    await expect(decrypt('kms:v1:legacy-blob-base64')).rejects.toThrow(/KMS-encrypted/);
  });
});

describe('encryptData / decryptData — password-based legacy helpers', () => {
  it('round-trips a payload with a password', () => {
    const data = JSON.stringify({ abn: '85 151 794 142', email: 'a@b.com' });
    const password = 'a-strong-password-32-characters-long';
    const ct = encryptData(data, password);
    expect(ct).not.toBe(data);
    const back = decryptData(ct, password);
    expect(back).toBe(data);
  });

  it('produces a different ciphertext on every call (random salt + IV)', () => {
    const password = 'pw';
    const a = encryptData('x', password);
    const b = encryptData('x', password);
    expect(a).not.toBe(b);
  });
});

describe('hashData / verifyHash', () => {
  it('verifyHash returns true for the original input', () => {
    const hashed = hashData('mySecretToken');
    expect(verifyHash('mySecretToken', hashed)).toBe(true);
  });

  it('verifyHash returns false for a different input', () => {
    const hashed = hashData('mySecretToken');
    expect(verifyHash('not-the-same', hashed)).toBe(false);
  });

  it('hashData with the same explicit salt produces stable output', () => {
    const a = hashData('x', 'fixedsalt');
    const b = hashData('x', 'fixedsalt');
    expect(a).toBe(b);
  });
});

describe('generateSecureToken', () => {
  it('default length yields 64 hex characters (32 bytes)', () => {
    expect(generateSecureToken()).toMatch(/^[a-f0-9]{64}$/);
  });

  it('honours an explicit byte length', () => {
    expect(generateSecureToken(16)).toMatch(/^[a-f0-9]{32}$/);
  });

  it('every call returns a fresh value', () => {
    expect(generateSecureToken()).not.toBe(generateSecureToken());
  });
});

describe('maskSensitiveData', () => {
  it('masks an email keeping the first 2 username chars + domain', () => {
    expect(maskSensitiveData('phill.mcgurk@example.com', 'email')).toBe('ph***@example.com');
  });

  it('returns *** when an email has no domain', () => {
    expect(maskSensitiveData('no-at-sign', 'email')).toBe('***');
  });

  it('masks an id keeping only the last 4 chars', () => {
    expect(maskSensitiveData('CLAIM-2026-12345', 'id')).toBe('***2345');
  });

  it('default custom mask shows first 2 + last 2', () => {
    expect(maskSensitiveData('1234567890')).toBe('12***90');
  });

  it('returns *** for short custom inputs (≤4 chars)', () => {
    expect(maskSensitiveData('abc')).toBe('***');
  });

  it('returns empty string for empty input', () => {
    expect(maskSensitiveData('')).toBe('');
  });
});

describe('generateHMAC / verifyHMAC', () => {
  it('verifyHMAC returns true for a matching secret', () => {
    const data = '{"event":"payment.succeeded"}';
    const sig = generateHMAC(data, 'my-secret');
    expect(verifyHMAC(data, sig, 'my-secret')).toBe(true);
  });

  it('verifyHMAC returns false for a tampered body', () => {
    const sig = generateHMAC('original-body', 'my-secret');
    expect(verifyHMAC('tampered-body', sig, 'my-secret')).toBe(false);
  });

  it('verifyHMAC returns false for a wrong secret', () => {
    const data = 'body';
    const sig = generateHMAC(data, 'right-secret');
    expect(verifyHMAC(data, sig, 'wrong-secret')).toBe(false);
  });
});

describe('sanitizeInput', () => {
  it('strips angle brackets', () => {
    expect(sanitizeInput('<script>alert(1)</script>')).toBe('scriptalert(1)/script');
  });

  it('strips control characters', () => {
    expect(sanitizeInput('hello\x00\x1Fworld')).toBe('helloworld');
  });

  it('trims leading and trailing whitespace', () => {
    expect(sanitizeInput('  spaced  ')).toBe('spaced');
  });
});

describe('getEncryptionKey', () => {
  let savedSecret: string | undefined;
  let savedKey: string | undefined;
  beforeEach(() => {
    savedSecret = process.env.ENCRYPTION_SECRET;
    savedKey = process.env.ENCRYPTION_KEY;
  });
  afterEach(() => {
    if (savedSecret === undefined) delete process.env.ENCRYPTION_SECRET;
    else process.env.ENCRYPTION_SECRET = savedSecret;
    if (savedKey === undefined) delete process.env.ENCRYPTION_KEY;
    else process.env.ENCRYPTION_KEY = savedKey;
  });

  it('throws when neither ENCRYPTION_SECRET nor ENCRYPTION_KEY is set', () => {
    delete process.env.ENCRYPTION_SECRET;
    delete process.env.ENCRYPTION_KEY;
    expect(() => getEncryptionKey()).toThrow(/ENCRYPTION_SECRET/);
  });

  it('throws when the secret is shorter than 32 characters', () => {
    process.env.ENCRYPTION_SECRET = 'short';
    expect(() => getEncryptionKey()).toThrow(/at least 32/);
  });

  it('returns the secret when valid', () => {
    process.env.ENCRYPTION_SECRET = 'a'.repeat(32);
    expect(getEncryptionKey()).toBe('a'.repeat(32));
  });
});
