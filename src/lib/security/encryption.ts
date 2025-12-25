/**
 * Encryption & Data Protection Service
 *
 * End-to-end encryption and secure data handling
 */

import crypto from 'crypto';

interface EncryptedData {
  ciphertext: string;
  iv: string;
  algorithm: string;
  tag: string;
  keyId: string;
}

interface EncryptionKey {
  id: string;
  key: string;
  algorithm: string;
  createdAt: string;
  rotatedAt?: string;
  isActive: boolean;
}

interface SecureHash {
  hash: string;
  salt: string;
  algorithm: string;
}

export class EncryptionService {
  private encryptionKeys: Map<string, EncryptionKey> = new Map();
  private algorithm = 'aes-256-gcm';
  private hashAlgorithm = 'sha256';

  constructor() {
    // Initialize with a default key (should be loaded from env in production)
    this.generateEncryptionKey('default');
  }

  /**
   * Generate encryption key
   */
  generateEncryptionKey(keyId: string): EncryptionKey {
    const key = crypto.randomBytes(32).toString('hex');

    const encKey: EncryptionKey = {
      id: keyId,
      key,
      algorithm: this.algorithm,
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    this.encryptionKeys.set(keyId, encKey);
    return encKey;
  }

  /**
   * Rotate encryption key
   */
  rotateEncryptionKey(keyId: string): EncryptionKey | null {
    const oldKey = this.encryptionKeys.get(keyId);
    if (!oldKey) return null;

    // Create new key with same ID but updated timestamp
    const newKey: EncryptionKey = {
      id: keyId,
      key: crypto.randomBytes(32).toString('hex'),
      algorithm: this.algorithm,
      createdAt: new Date().toISOString(),
      rotatedAt: new Date().toISOString(),
      isActive: true,
    };

    this.encryptionKeys.set(keyId, newKey);
    return newKey;
  }

  /**
   * Encrypt data
   */
  encrypt(plaintext: string, keyId: string = 'default'): EncryptedData | null {
    const encKey = this.encryptionKeys.get(keyId);
    if (!encKey) return null;

    try {
      const iv = crypto.randomBytes(12);
      const key = Buffer.from(encKey.key, 'hex');

      const cipher = crypto.createCipheriv(this.algorithm, key, iv);
      const encrypted = Buffer.concat([
        cipher.update(plaintext, 'utf8'),
        cipher.final(),
      ]);

      const tag = cipher.getAuthTag();

      return {
        ciphertext: encrypted.toString('hex'),
        iv: iv.toString('hex'),
        algorithm: this.algorithm,
        tag: tag.toString('hex'),
        keyId,
      };
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  }

  /**
   * Decrypt data
   */
  decrypt(encryptedData: EncryptedData): string | null {
    const encKey = this.encryptionKeys.get(encryptedData.keyId);
    if (!encKey) return null;

    try {
      const key = Buffer.from(encKey.key, 'hex');
      const iv = Buffer.from(encryptedData.iv, 'hex');
      const ciphertext = Buffer.from(encryptedData.ciphertext, 'hex');
      const tag = Buffer.from(encryptedData.tag, 'hex');

      const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
      decipher.setAuthTag(tag);

      const decrypted = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final(),
      ]);

      return decrypted.toString('utf8');
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  }

  /**
   * Hash password
   */
  hashPassword(password: string, salt?: string): SecureHash {
    const hashSalt = salt || crypto.randomBytes(16).toString('hex');

    const hash = crypto
      .pbkdf2Sync(password, hashSalt, 100000, 64, 'sha512')
      .toString('hex');

    return {
      hash,
      salt: hashSalt,
      algorithm: 'pbkdf2',
    };
  }

  /**
   * Verify password
   */
  verifyPassword(password: string, hash: SecureHash): boolean {
    const computed = this.hashPassword(password, hash.salt);
    return crypto.timingSafeEqual(
      Buffer.from(computed.hash),
      Buffer.from(hash.hash)
    );
  }

  /**
   * Hash data (one-way)
   */
  hashData(data: string, algorithm: string = 'sha256'): string {
    return crypto.createHash(algorithm).update(data).digest('hex');
  }

  /**
   * Generate secure token
   */
  generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Generate HMAC
   */
  generateHMAC(data: string, secret: string, algorithm: string = 'sha256'): string {
    return crypto
      .createHmac(algorithm, secret)
      .update(data)
      .digest('hex');
  }

  /**
   * Verify HMAC
   */
  verifyHMAC(data: string, signature: string, secret: string, algorithm: string = 'sha256'): boolean {
    const computed = this.generateHMAC(data, secret, algorithm);
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(computed)
    );
  }

  /**
   * Encrypt JSON object
   */
  encryptJSON(data: any, keyId: string = 'default'): EncryptedData | null {
    const json = JSON.stringify(data);
    return this.encrypt(json, keyId);
  }

  /**
   * Decrypt to JSON object
   */
  decryptJSON(encryptedData: EncryptedData): any | null {
    const plaintext = this.decrypt(encryptedData);
    if (!plaintext) return null;

    try {
      return JSON.parse(plaintext);
    } catch (error) {
      console.error('JSON parse error:', error);
      return null;
    }
  }

  /**
   * Secure string comparison (timing-safe)
   */
  secureCompare(a: string, b: string): boolean {
    try {
      return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
    } catch {
      return false;
    }
  }

  /**
   * Generate API key
   */
  generateAPIKey(userId: string): {
    key: string;
    keyHash: string;
  } {
    const key = `sk_${crypto.randomBytes(24).toString('hex')}`;
    const keyHash = this.hashData(key);

    return { key, keyHash };
  }

  /**
   * Sanitize sensitive data from logs
   */
  sanitizeForLogging(data: any, sensitiveFields: string[] = []): any {
    const defaultSensitiveFields = [
      'password',
      'token',
      'apiKey',
      'secret',
      'creditCard',
      'ssn',
      'privateKey',
    ];

    const allSensitiveFields = [
      ...defaultSensitiveFields,
      ...sensitiveFields,
    ];

    const sanitized = JSON.parse(JSON.stringify(data));

    const sanitizeObject = (obj: any) => {
      for (const key in obj) {
        if (allSensitiveFields.some(f => key.toLowerCase().includes(f.toLowerCase()))) {
          obj[key] = '[REDACTED]';
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
        }
      }
    };

    if (typeof sanitized === 'object' && sanitized !== null) {
      sanitizeObject(sanitized);
    }

    return sanitized;
  }

  /**
   * Validate password strength
   */
  validatePasswordStrength(password: string): {
    isStrong: boolean;
    score: number; // 0-100
    issues: string[];
  } {
    const issues: string[] = [];
    let score = 0;

    // Length checks
    if (password.length >= 8) score += 20;
    else issues.push('Password must be at least 8 characters');

    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;

    // Character variety
    if (/[a-z]/.test(password)) score += 15;
    else issues.push('Must contain lowercase letters');

    if (/[A-Z]/.test(password)) score += 15;
    else issues.push('Must contain uppercase letters');

    if (/[0-9]/.test(password)) score += 15;
    else issues.push('Must contain numbers');

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 15;
    else issues.push('Must contain special characters');

    // Common patterns
    if (!/(.)\1{2,}/.test(password)) score += 5;
    else issues.push('Avoid repeating characters');

    if (!/^(.)(\1){2,}/.test(password)) score += 5;
    else issues.push('Avoid sequential patterns');

    return {
      isStrong: score >= 60 && issues.length === 0,
      score: Math.min(100, score),
      issues,
    };
  }

  /**
   * Anonymize data
   */
  anonymizeData(data: any, fields: string[]): any {
    const anonymized = JSON.parse(JSON.stringify(data));

    const anonymizeObject = (obj: any) => {
      for (const key in obj) {
        if (fields.includes(key)) {
          if (typeof obj[key] === 'string' && obj[key].includes('@')) {
            // Email-like
            obj[key] = `${obj[key].substring(0, 2)}***@***`;
          } else if (typeof obj[key] === 'string') {
            // Generic string
            obj[key] = `${obj[key].substring(0, 2)}***`;
          } else if (typeof obj[key] === 'number') {
            // Number
            obj[key] = '***';
          }
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          anonymizeObject(obj[key]);
        }
      }
    };

    if (typeof anonymized === 'object' && anonymized !== null) {
      anonymizeObject(anonymized);
    }

    return anonymized;
  }

  /**
   * Generate certificate fingerprint
   */
  generateFingerprint(data: string, algorithm: string = 'sha256'): string {
    const hash = crypto.createHash(algorithm).update(data).digest('hex');
    return hash.match(/.{1,2}/g)?.join(':') || hash;
  }

  /**
   * Constant-time string comparison
   */
  constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) return false;

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }
}

// Export singleton instance
export const encryptionService = new EncryptionService();
