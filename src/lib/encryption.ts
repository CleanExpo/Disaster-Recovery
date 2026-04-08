import crypto from 'crypto';
import {
  KMSClient,
  GenerateDataKeyCommand,
  DecryptCommand,
} from '@aws-sdk/client-kms';

// =============================================================================
// DR-390 — AWS KMS / AES-256-GCM envelope encryption for property access PII
// =============================================================================
//
// Priority order:
//   1. AWS KMS   — if KMS_KEY_ID env var is set (production)
//   2. AES-256-GCM — if ENCRYPTION_SECRET env var is set (staging / fallback)
//   3. Dev passthrough — plaintext with console.warn (development only)
//
// Required env vars for KMS (provision in Vercel — April 12 deadline):
//   • AWS_ACCESS_KEY_ID       — IAM user / role access key
//   • AWS_SECRET_ACCESS_KEY   — IAM user / role secret
//   • AWS_REGION              — e.g. ap-southeast-2
//   • KMS_KEY_ID              — ARN of the Customer Managed Key (CMK)
//
// The CMK policy must grant: Encrypt + Decrypt + GenerateDataKey
// to the IAM identity used by the Vercel Lambda runtime.
// =============================================================================

const KMS_PREFIX   = 'kms:v1:';
const AES_PREFIX   = 'aes:v1:';
const PLAIN_PREFIX = 'plain:v1:';

// AES-256-GCM constants
const IV_BYTES  = 12; // 96-bit IV recommended for GCM
const TAG_BYTES = 16;
// 4-byte big-endian prefix stores the encrypted data key length in KMS blobs
const EDKEY_LEN_BYTES = 4;

// Lazy KMS client — created on first use to avoid cold-start overhead
let _kmsClient: KMSClient | null = null;
function getKMSClient(): KMSClient {
  if (!_kmsClient) {
    _kmsClient = new KMSClient({
      region: process.env.AWS_REGION ?? 'ap-southeast-2',
    });
  }
  return _kmsClient;
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Returns true when at least one encryption backend is configured.
 * Property access routes should refuse to store data when this returns false
 * in non-development environments.
 */
export function isConfigured(): boolean {
  return Boolean(process.env.KMS_KEY_ID || process.env.ENCRYPTION_SECRET);
}

/**
 * Encrypts a plaintext string using KMS envelope encryption (preferred) or
 * AES-256-GCM (fallback). Returns a prefixed base64 blob safe to store in DB.
 *
 * KMS blob layout (kms:v1:):
 *   4 bytes (big-endian uint32) — encrypted data key length
 *   N bytes                    — encrypted data key (KMS ciphertext blob)
 *   12 bytes                   — AES-GCM IV
 *   16 bytes                   — AES-GCM auth tag
 *   remainder                  — AES-256-GCM ciphertext
 */
export async function encrypt(plaintext: string): Promise<string> {
  if (!plaintext) return plaintext;

  // ── 1. KMS envelope encryption ──────────────────────────────────────────
  if (process.env.KMS_KEY_ID) {
    const kms = getKMSClient();

    // Generate a one-time 256-bit data key from KMS
    const genResult = await kms.send(new GenerateDataKeyCommand({
      KeyId: process.env.KMS_KEY_ID,
      KeySpec: 'AES_256',
    }));

    if (!genResult.Plaintext || !genResult.CiphertextBlob) {
      throw new Error('[encryption] KMS GenerateDataKey returned empty key material.');
    }

    const dataKey      = Buffer.from(genResult.Plaintext);
    const encDataKey   = Buffer.from(genResult.CiphertextBlob);
    const iv           = crypto.randomBytes(IV_BYTES);

    // Encrypt the plaintext locally with the data key
    const cipher = crypto.createCipheriv('aes-256-gcm', dataKey, iv);
    const enc    = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const tag    = cipher.getAuthTag();

    // Zero the in-memory data key
    dataKey.fill(0);

    // Pack: [edkey_len (4)] [encDataKey] [iv (12)] [tag (16)] [ciphertext]
    const lenBuf = Buffer.allocUnsafe(EDKEY_LEN_BYTES);
    lenBuf.writeUInt32BE(encDataKey.length, 0);
    const blob = Buffer.concat([lenBuf, encDataKey, iv, tag, enc]).toString('base64');
    return `${KMS_PREFIX}${blob}`;
  }

  // ── 2. AES-256-GCM path ─────────────────────────────────────────────────
  if (process.env.ENCRYPTION_SECRET) {
    const key = deriveFixedKey(process.env.ENCRYPTION_SECRET);
    const iv  = crypto.randomBytes(IV_BYTES);

    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const enc    = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const tag    = cipher.getAuthTag();

    // Layout: iv (12) | tag (16) | ciphertext (variable)
    const blob = Buffer.concat([iv, tag, enc]).toString('base64');
    return `${AES_PREFIX}${blob}`;
  }

  // ── 3. Dev passthrough ───────────────────────────────────────────────────
  console.warn(
    '[encryption] WARNING: Neither KMS_KEY_ID nor ENCRYPTION_SECRET is configured. ' +
    'Property access data is stored as plaintext. This must not happen in production.'
  );
  return `${PLAIN_PREFIX}${Buffer.from(plaintext, 'utf8').toString('base64')}`;
}

/**
 * Decrypts a value produced by encrypt().
 * Handles all prefix variants (kms:v1:, aes:v1:, plain:v1:, or legacy unencrypted strings).
 */
export async function decrypt(ciphertext: string): Promise<string> {
  if (!ciphertext) return ciphertext;

  // ── KMS blob ─────────────────────────────────────────────────────────────
  if (ciphertext.startsWith(KMS_PREFIX)) {
    const kms = getKMSClient();
    const buf = Buffer.from(ciphertext.slice(KMS_PREFIX.length), 'base64');

    // Unpack: [edkey_len (4)] [encDataKey] [iv (12)] [tag (16)] [ciphertext]
    const edkeyLen  = buf.readUInt32BE(0);
    const encDataKey = buf.subarray(EDKEY_LEN_BYTES, EDKEY_LEN_BYTES + edkeyLen);
    const offset     = EDKEY_LEN_BYTES + edkeyLen;
    const iv         = buf.subarray(offset, offset + IV_BYTES);
    const tag        = buf.subarray(offset + IV_BYTES, offset + IV_BYTES + TAG_BYTES);
    const enc        = buf.subarray(offset + IV_BYTES + TAG_BYTES);

    // Recover the data key from KMS
    const decResult = await kms.send(new DecryptCommand({
      CiphertextBlob: encDataKey,
      KeyId: process.env.KMS_KEY_ID,
    }));

    if (!decResult.Plaintext) {
      throw new Error('[encryption] KMS Decrypt returned empty key material.');
    }

    const dataKey = Buffer.from(decResult.Plaintext);
    const decipher = crypto.createDecipheriv('aes-256-gcm', dataKey, iv);
    decipher.setAuthTag(tag);
    const result = Buffer.concat([decipher.update(enc), decipher.final()]).toString('utf8');
    dataKey.fill(0);
    return result;
  }

  // ── AES blob ─────────────────────────────────────────────────────────────
  if (ciphertext.startsWith(AES_PREFIX)) {
    if (!process.env.ENCRYPTION_SECRET) {
      throw new Error('[encryption] AES-encrypted value found but ENCRYPTION_SECRET env var is not set.');
    }
    const key     = deriveFixedKey(process.env.ENCRYPTION_SECRET);
    const buf     = Buffer.from(ciphertext.slice(AES_PREFIX.length), 'base64');
    const iv      = buf.subarray(0, IV_BYTES);
    const tag     = buf.subarray(IV_BYTES, IV_BYTES + TAG_BYTES);
    const enc     = buf.subarray(IV_BYTES + TAG_BYTES);

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(enc), decipher.final()]).toString('utf8');
  }

  // ── Dev passthrough blob ─────────────────────────────────────────────────
  if (ciphertext.startsWith(PLAIN_PREFIX)) {
    return Buffer.from(ciphertext.slice(PLAIN_PREFIX.length), 'base64').toString('utf8');
  }

  // ── Legacy / unencrypted value — return as-is with a warning ────────────
  console.warn('[encryption] decrypt() received a value with no recognised prefix — returning as-is. This may be a legacy plaintext value.');
  return ciphertext;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Derives a stable 32-byte key from the ENCRYPTION_SECRET env var using SHA-256.
 * PBKDF2 is not used here because the secret is already expected to be a
 * high-entropy random value (min 32 chars enforced at startup).
 */
function deriveFixedKey(secret: string): Buffer {
  return crypto.createHash('sha256').update(secret, 'utf8').digest();
}

// =============================================================================
// Legacy password-based AES-256-GCM helpers (existing codebase usage)
// =============================================================================

// Encryption configuration
const ALGORITHM = 'aes-256-gcm';
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const IV_LENGTH = 16;
const KEY_LENGTH = 32;
const ITERATIONS = 100000;

/**
 * Derives an encryption key from a password using PBKDF2
 */
function deriveKey(password: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha256');
}

/**
 * Encrypts data using AES-256-GCM
 * Compliant with Australian Privacy Principles and GDPR requirements
 */
export function encryptData(data: string, password: string): string {
  try {
    // Generate random salt and IV
    const salt = crypto.randomBytes(SALT_LENGTH);
    const iv = crypto.randomBytes(IV_LENGTH);
    
    // Derive encryption key
    const key = deriveKey(password, salt);
    
    // Create cipher
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    // Encrypt data
    const encrypted = Buffer.concat([
      cipher.update(data, 'utf8'),
      cipher.final()
    ]);
    
    // Get auth tag
    const authTag = cipher.getAuthTag();
    
    // Combine salt, iv, authTag, and encrypted data
    const combined = Buffer.concat([salt, iv, authTag, encrypted]);
    
    // Return base64 encoded string
    return combined.toString('base64');
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypts data encrypted with encryptData
 */
export function decryptData(encryptedData: string, password: string): string {
  try {
    // Decode from base64
    const combined = Buffer.from(encryptedData, 'base64');
    
    // Extract components
    const salt = combined.slice(0, SALT_LENGTH);
    const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const authTag = combined.slice(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    const encrypted = combined.slice(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    
    // Derive decryption key
    const key = deriveKey(password, salt);
    
    // Create decipher
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    // Decrypt data
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final()
    ]);
    
    return decrypted.toString('utf8');
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Hashes sensitive data for comparison without storing plaintext
 * Used for data like email addresses that need to be searchable
 */
export function hashData(data: string, salt?: string): string {
  const actualSalt = salt || crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(data, actualSalt, 10000, 64, 'sha512').toString('hex');
  return `${actualSalt}:${hash}`;
}

/**
 * Verifies hashed data
 */
export function verifyHash(data: string, hashedData: string): boolean {
  const [salt, hash] = hashedData.split(':');
  const newHash = crypto.pbkdf2Sync(data, salt, 10000, 64, 'sha512').toString('hex');
  return hash === newHash;
}

/**
 * Generates secure random tokens for API keys, session tokens, etc.
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Masks sensitive data for logging/display
 * Compliant with privacy requirements
 */
export function maskSensitiveData(data: string, type: 'email' | 'email' | 'id' | 'custom' = 'custom'): string {
  if (!data) return '';
  
  switch (type) {
    case 'email':
      const [username, domain] = data.split('@');
      if (!domain) return '***';
      const maskedUsername = username.substring(0, 2) + '***';
      return `${maskedUsername}@${domain}`;
      
    case 'email':
      return data.substring(0, 3) + '****' + data.substring(data.length - 2);
      
    case 'id':
      return '***' + data.substring(data.length - 4);
      
    default:
      if (data.length <= 4) return '***';
      return data.substring(0, 2) + '***' + data.substring(data.length - 2);
  }
}

/**
 * Encrypts PII fields in an object
 * Used for storing contractor personal information
 */
export function encryptPII<T extends Record<string, any>>(
  obj: T,
  fieldsToEncrypt: string[],
  password: string
): T {
  const encrypted: Record<string, any> = { ...obj };

  for (const field of fieldsToEncrypt) {
    if (encrypted[field]) {
      encrypted[field] = encryptData(JSON.stringify(encrypted[field]), password);
    }
  }

  return encrypted as T;
}

/**
 * Decrypts PII fields in an object
 */
export function decryptPII<T extends Record<string, any>>(
  obj: T,
  fieldsToDecrypt: string[],
  password: string
): T {
  const decrypted: Record<string, any> = { ...obj };

  for (const field of fieldsToDecrypt) {
    if (decrypted[field]) {
      try {
        decrypted[field] = JSON.parse(decryptData(decrypted[field], password));
      } catch {
        // If decryption fails, leave the field as is
      }
    }
  }

  return decrypted as T;
}

/**
 * Generates encryption key from environment variables
 * Ensures keys are properly rotated as per compliance requirements
 */
export function getEncryptionKey(): string {
  const key = process.env.ENCRYPTION_KEY;
  
  if (!key) {
    throw new Error('ENCRYPTION_KEY environment variable is not set');
  }
  
  // Validate key strength
  if (key.length < 32) {
    throw new Error('ENCRYPTION_KEY must be at least 32 characters long');
  }
  
  return key;
}

/**
 * Sanitizes user input to prevent injection attacks
 * Part of security compliance requirements
 */
export function sanitizeInput(input: string): string {
  // Remove any potentially harmful characters
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .trim();
}

/**
 * Validates data integrity using HMAC
 */
export function generateHMAC(data: string, secret: string): string {
  return crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex');
}

/**
 * Verifies HMAC for data integrity
 */
export function verifyHMAC(data: string, hmac: string, secret: string): boolean {
  const calculatedHMAC = generateHMAC(data, secret);
  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(calculatedHMAC)
  );
}

/**
 * Securely wipes sensitive data from memory
 * Used after processing sensitive information
 */
export function secureClear(data: any): void {
  if (typeof data === 'string') {
    // For strings, we can't directly clear memory in JavaScript
    // But we can at least clear the reference
    data = null;
  } else if (data instanceof Buffer) {
    // For buffers, we can fill with zeros
    data.fill(0);
  } else if (typeof data === 'object' && data !== null) {
    // For objects, recursively clear
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        secureClear(data[key]);
        delete data[key];
      }
    }
  }
}

/**
 * Anonymizes data for analytics and reporting
 * Ensures compliance with privacy regulations
 */
export function anonymizeData(data: any): any {
  const anonymized = { ...data };
  
  // Remove direct identifiers
  const identifiers = ['name', 'email', 'email', 'address', 'abn', 'tfn', 'dob', 'ssn'];
  for (const field of identifiers) {
    if (anonymized[field]) {
      anonymized[field] = hashData(anonymized[field]);
    }
  }
  
  // Generalize quasi-identifiers
  if (anonymized.age) {
    anonymized.ageRange = Math.floor(anonymized.age / 10) * 10 + '-' + (Math.floor(anonymized.age / 10) * 10 + 9);
    delete anonymized.age;
  }
  
  if (anonymized.postcode) {
    anonymized.region = anonymized.postcode.substring(0, 2) + '**';
    delete anonymized.postcode;
  }
  
  return anonymized;
}

// Export encryption configuration for documentation
export const ENCRYPTION_CONFIG = {
  algorithm: ALGORITHM,
  keyLength: KEY_LENGTH * 8, // in bits
  saltLength: SALT_LENGTH * 8, // in bits
  iterations: ITERATIONS,
  compliance: ['AES-256', 'OAIC APP', 'GDPR Article 32', 'ISO 27001']
};