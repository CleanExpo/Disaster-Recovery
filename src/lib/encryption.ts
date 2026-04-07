import crypto from 'crypto';

// =============================================================================
// DR-390 — AWS KMS / AES-256-GCM envelope encryption for property access PII
// =============================================================================
//
// Priority order:
//   1. AWS KMS   — if KMS_KEY_ID env var is set
//   2. AES-256-GCM — if ENCRYPTION_SECRET env var is set (min 32 chars)
//   3. Dev passthrough — plaintext with console.warn (never for production)
//
// TODO (DR-390): Provision AWS KMS credentials before go-live:
//   • AWS_ACCESS_KEY_ID       — IAM user / role access key
//   • AWS_SECRET_ACCESS_KEY   — IAM user / role secret
//   • AWS_REGION              — e.g. ap-southeast-2
//   • KMS_KEY_ID              — ARN of the Customer Managed Key (CMK)
//   The CMK policy must grant Encrypt + Decrypt + GenerateDataKey to the
//   IAM identity used by the Next.js server / Lambda runtime.
//
// NOTE: @aws-sdk/client-kms is NOT currently in package.json.
//   When the team provisions KMS:
//     npm install @aws-sdk/client-kms
//   Then replace the KMS stub block below with real SDK calls.
// =============================================================================

const KMS_PREFIX   = 'kms:v1:';
const AES_PREFIX   = 'aes:v1:';
const PLAIN_PREFIX = 'plain:v1:';

// AES-256-GCM constants
const IV_BYTES  = 12; // 96-bit IV recommended for GCM
const TAG_BYTES = 16;

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
 * Encrypts a plaintext string.
 * Returns a prefixed base64 blob that is safe to store in a standard String DB column.
 * In dev mode (no env vars), returns the value prefixed with 'plain:v1:' and logs a warning.
 */
export async function encrypt(plaintext: string): Promise<string> {
  if (!plaintext) return plaintext;

  // ── 1. KMS path ─────────────────────────────────────────────────────────
  if (process.env.KMS_KEY_ID) {
    // TODO (DR-390): Replace this stub with real @aws-sdk/client-kms calls:
    //
    //   import { KMSClient, GenerateDataKeyCommand, EncryptCommand } from '@aws-sdk/client-kms';
    //   const kms = new KMSClient({ region: process.env.AWS_REGION ?? 'ap-southeast-2' });
    //
    //   Envelope encrypt pattern:
    //   1. GenerateDataKeyCommand({ KeyId: process.env.KMS_KEY_ID, KeySpec: 'AES_256' })
    //      → { Plaintext: dataKey, CiphertextBlob: encryptedDataKey }
    //   2. Use dataKey with aes-256-gcm to encrypt plaintext locally
    //   3. Store: base64(encryptedDataKey_length_4bytes + encryptedDataKey + iv + tag + ciphertext)
    //   4. On decrypt: split blob, call DecryptCommand to recover dataKey, then AES-GCM decrypt
    //
    // For now fall through to AES path so the code is functional while KMS is unprovisioned.
    console.warn('[encryption] KMS_KEY_ID is set but @aws-sdk/client-kms is not installed. Falling back to AES-256-GCM. Install @aws-sdk/client-kms and replace the stub in src/lib/encryption.ts.');
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
    // TODO (DR-390): Implement real KMS decryption using @aws-sdk/client-kms.
    // Until the SDK is installed and the CMK is provisioned this path is unreachable
    // because encrypt() never produces kms:v1: blobs.
    throw new Error('[encryption] KMS decrypt is not yet implemented. Install @aws-sdk/client-kms and implement decrypt in src/lib/encryption.ts.');
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