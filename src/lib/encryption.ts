import crypto from 'crypto';
import { clientLogger } from '@/lib/observability/client-logger';

// =============================================================================
// DR-390 / DR-491 — AES-256-GCM envelope encryption for property access PII
// =============================================================================
//
// Encryption backend: AES-256-GCM with ENCRYPTION_SECRET env var.
// AWS KMS dependency removed — ENCRYPTION_SECRET set in Vercel Production env.
//
// Required env var:
//   • ENCRYPTION_SECRET  — 32+ char high-entropy random string (set in Vercel)
//
// Priority:
//   1. AES-256-GCM  — if ENCRYPTION_SECRET is set (production / staging)
//   2. Dev passthrough — plaintext with console.warn (development only)
// =============================================================================

const AES_PREFIX   = 'aes:v1:';
const PLAIN_PREFIX = 'plain:v1:';

// AES-256-GCM constants
const IV_BYTES  = 12; // 96-bit IV recommended for GCM
const TAG_BYTES = 16;

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Returns true when the encryption backend is configured.
 * Property access routes should refuse to store PII when this returns false
 * in non-development environments.
 */
export function isConfigured(): boolean {
  return Boolean(process.env.ENCRYPTION_SECRET);
}

/**
 * Encrypts a plaintext string using AES-256-GCM.
 * Returns a prefixed base64 blob safe to store in the database.
 *
 * Layout (aes:v1:): iv (12) | tag (16) | ciphertext (variable)
 */
export async function encrypt(plaintext: string): Promise<string> {
  if (!plaintext) return plaintext;

  // ── AES-256-GCM path ──────────────────────────────────────────────────────
  if (process.env.ENCRYPTION_SECRET) {
    const key = deriveFixedKey(process.env.ENCRYPTION_SECRET);
    const iv  = crypto.randomBytes(IV_BYTES);

    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const enc    = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const tag    = cipher.getAuthTag();

    const blob = Buffer.concat([iv, tag, enc]).toString('base64');
    return `${AES_PREFIX}${blob}`;
  }

  // ── Dev passthrough ───────────────────────────────────────────────────────
  clientLogger.warn('[encryption] WARNING: ENCRYPTION_SECRET is not configured. ' +
    'Property access data is stored as plaintext. This must not happen in production.', { source: 'lib/encryption' });
  return `${PLAIN_PREFIX}${Buffer.from(plaintext, 'utf8').toString('base64')}`;
}

/**
 * Decrypts a value produced by encrypt().
 * Handles aes:v1:, plain:v1:, and legacy kms:v1: prefixes.
 * Legacy kms:v1: blobs cannot be decrypted without AWS credentials — throws.
 */
export async function decrypt(ciphertext: string): Promise<string> {
  if (!ciphertext) return ciphertext;

  // ── AES blob ──────────────────────────────────────────────────────────────
  if (ciphertext.startsWith(AES_PREFIX)) {
    if (!process.env.ENCRYPTION_SECRET) {
      throw new Error('[encryption] AES-encrypted value found but ENCRYPTION_SECRET env var is not set.');
    }
    const key = deriveFixedKey(process.env.ENCRYPTION_SECRET);
    const buf = Buffer.from(ciphertext.slice(AES_PREFIX.length), 'base64');
    const iv  = buf.subarray(0, IV_BYTES);
    const tag = buf.subarray(IV_BYTES, IV_BYTES + TAG_BYTES);
    const enc = buf.subarray(IV_BYTES + TAG_BYTES);

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(enc), decipher.final()]).toString('utf8');
  }

  // ── Dev passthrough blob ──────────────────────────────────────────────────
  if (ciphertext.startsWith(PLAIN_PREFIX)) {
    return Buffer.from(ciphertext.slice(PLAIN_PREFIX.length), 'base64').toString('utf8');
  }

  // ── Legacy KMS blob — not decryptable without AWS ─────────────────────────
  if (ciphertext.startsWith('kms:v1:')) {
    throw new Error(
      '[encryption] KMS-encrypted value found (kms:v1: prefix). ' +
      'AWS KMS has been removed — these values cannot be decrypted. ' +
      'If you have existing kms:v1: values in the database, contact support.'
    );
  }

  // ── Legacy / unencrypted value ────────────────────────────────────────────
  clientLogger.warn('[encryption] decrypt() received a value with no recognised prefix — returning as-is.', { source: 'lib/encryption' });
  return ciphertext;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Derives a stable 32-byte key from ENCRYPTION_SECRET using SHA-256.
 * The secret is expected to be a high-entropy random value (min 32 chars).
 */
function deriveFixedKey(secret: string): Buffer {
  return crypto.createHash('sha256').update(secret, 'utf8').digest();
}

// =============================================================================
// Legacy password-based AES-256-GCM helpers (existing codebase usage)
// =============================================================================

const ALGORITHM   = 'aes-256-gcm';
const SALT_LENGTH = 64;
const TAG_LENGTH  = 16;
const IV_LENGTH   = 16;
const KEY_LENGTH  = 32;
const ITERATIONS  = 100000;

function deriveKey(password: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha256');
}

export function encryptData(data: string, password: string): string {
  const salt    = crypto.randomBytes(SALT_LENGTH);
  const iv      = crypto.randomBytes(IV_LENGTH);
  const key     = deriveKey(password, salt);
  const cipher  = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([salt, iv, authTag, encrypted]).toString('base64');
}

export function decryptData(encryptedData: string, password: string): string {
  const combined = Buffer.from(encryptedData, 'base64');
  const salt     = combined.slice(0, SALT_LENGTH);
  const iv       = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const authTag  = combined.slice(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  const encrypted = combined.slice(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  const key      = deriveKey(password, salt);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}

export function hashData(data: string, salt?: string): string {
  const actualSalt = salt || crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(data, actualSalt, 10000, 64, 'sha512').toString('hex');
  return `${actualSalt}:${hash}`;
}

export function verifyHash(data: string, hashedData: string): boolean {
  const [salt, hash] = hashedData.split(':');
  const newHash = crypto.pbkdf2Sync(data, salt, 10000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(newHash, 'hex'));
}

export function generateSecureToken(length = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

export function maskSensitiveData(data: string, type: 'email' | 'id' | 'custom' = 'custom'): string {
  if (!data) return '';
  switch (type) {
    case 'email': {
      const [username, domain] = data.split('@');
      if (!domain) return '***';
      return `${username.substring(0, 2)}***@${domain}`;
    }
    case 'id':
      return '***' + data.substring(data.length - 4);
    default:
      if (data.length <= 4) return '***';
      return data.substring(0, 2) + '***' + data.substring(data.length - 2);
  }
}

export function encryptPII<T extends Record<string, unknown>>(
  obj: T,
  fieldsToEncrypt: string[],
  password: string
): T {
  const encrypted: Record<string, unknown> = { ...obj };
  for (const field of fieldsToEncrypt) {
    if (encrypted[field]) {
      encrypted[field] = encryptData(JSON.stringify(encrypted[field]), password);
    }
  }
  return encrypted as T;
}

export function decryptPII<T extends Record<string, unknown>>(
  obj: T,
  fieldsToDecrypt: string[],
  password: string
): T {
  const decrypted: Record<string, unknown> = { ...obj };
  for (const field of fieldsToDecrypt) {
    if (decrypted[field]) {
      try {
        decrypted[field] = JSON.parse(decryptData(decrypted[field] as string, password));
      } catch {
        // leave as-is if decryption fails
      }
    }
  }
  return decrypted as T;
}

export function getEncryptionKey(): string {
  const key = process.env.ENCRYPTION_SECRET || process.env.ENCRYPTION_KEY;
  if (!key) throw new Error('ENCRYPTION_SECRET environment variable is not set');
  if (key.length < 32) throw new Error('ENCRYPTION_SECRET must be at least 32 characters long');
  return key;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim();
}

export function generateHMAC(data: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

export function verifyHMAC(data: string, hmac: string, secret: string): boolean {
  const calculated = generateHMAC(data, secret);
  return crypto.timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(calculated, 'hex'));
}

export const ENCRYPTION_CONFIG = {
  algorithm: ALGORITHM,
  keyLength: KEY_LENGTH * 8,
  saltLength: SALT_LENGTH * 8,
  iterations: ITERATIONS,
  compliance: ['AES-256', 'OAIC APP', 'GDPR Article 32', 'ISO 27001'],
};
