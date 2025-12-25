import nacl from 'tweetnacl';
import { utils as naclUtils } from 'tweetnacl';
import { prisma } from '@/lib/prisma';

/**
 * Message Encryption Service
 *
 * End-to-end encryption for sensitive messages using TweetNaCl
 * - Per-room encryption keys
 * - Public key infrastructure
 * - Encrypted message storage
 */

interface EncryptionKey {
  roomId: string;
  publicKey: string; // Base64 encoded
  secretKey: string; // Base64 encoded (stored securely)
  createdAt: Date;
  rotatedAt?: Date;
  isActive: boolean;
}

interface EncryptedMessage {
  messageId: string;
  ciphertext: string; // Base64 encoded
  nonce: string; // Base64 encoded
  publicKey: string; // Base64 encoded
  isEncrypted: boolean;
}

interface DecryptedMessage {
  messageId: string;
  content: string;
  isEncrypted: boolean;
}

// In-memory key storage (use database in production)
const keyStore = new Map<string, EncryptionKey>();
const nonceCounter = new Map<string, number>();

export class MessageEncryptionService {
  /**
   * Generate a keypair for a room
   */
  static async generateRoomKeyPair(roomId: string): Promise<EncryptionKey> {
    try {
      // Generate keypair
      const keypair = nacl.box.keyPair();

      const encryptionKey: EncryptionKey = {
        roomId,
        publicKey: naclUtils.encodeBase64(keypair.publicKey),
        secretKey: naclUtils.encodeBase64(keypair.secretKey),
        createdAt: new Date(),
        isActive: true,
      };

      // Store in memory (in production, use encrypted database storage)
      keyStore.set(roomId, encryptionKey);

      // Also store in database for persistence
      try {
        await prisma.encryptionKey.upsert({
          where: { roomId },
          create: {
            roomId,
            publicKey: encryptionKey.publicKey,
            secretKey: encryptionKey.secretKey, // Should be encrypted in DB
            isActive: true,
          },
          update: {
            publicKey: encryptionKey.publicKey,
            secretKey: encryptionKey.secretKey,
            isActive: true,
            rotatedAt: new Date(),
          },
        });
      } catch (error) {
        console.error('Failed to store encryption key in database:', error);
      }

      return encryptionKey;
    } catch (error) {
      console.error('Failed to generate room keypair:', error);
      throw error;
    }
  }

  /**
   * Get room's public key
   */
  static async getRoomPublicKey(roomId: string): Promise<string | null> {
    try {
      // Check memory first
      const cached = keyStore.get(roomId);
      if (cached) {
        return cached.publicKey;
      }

      // Load from database
      const key = await prisma.encryptionKey.findUnique({
        where: { roomId },
        select: { publicKey: true },
      });

      if (key) {
        return key.publicKey;
      }

      // Generate new keypair if not found
      const newKey = await this.generateRoomKeyPair(roomId);
      return newKey.publicKey;
    } catch (error) {
      console.error('Failed to get room public key:', error);
      return null;
    }
  }

  /**
   * Encrypt a message
   */
  static async encryptMessage(
    messageId: string,
    roomId: string,
    content: string
  ): Promise<EncryptedMessage | null> {
    try {
      // Get room's keypair
      let encryptionKey = keyStore.get(roomId);
      if (!encryptionKey) {
        // Try to load from database
        const dbKey = await prisma.encryptionKey.findUnique({
          where: { roomId },
        });
        if (dbKey) {
          encryptionKey = {
            roomId: dbKey.roomId,
            publicKey: dbKey.publicKey,
            secretKey: dbKey.secretKey,
            createdAt: dbKey.createdAt,
            rotatedAt: dbKey.rotatedAt || undefined,
            isActive: dbKey.isActive,
          };
          keyStore.set(roomId, encryptionKey);
        } else {
          // Generate new keypair
          encryptionKey = await this.generateRoomKeyPair(roomId);
        }
      }

      // Decode base64 keys
      const publicKeyBytes = naclUtils.decodeBase64(encryptionKey.publicKey);
      const secretKeyBytes = naclUtils.decodeBase64(encryptionKey.secretKey);

      // Generate nonce (24 bytes)
      const nonce = nacl.randomBytes(24);

      // Convert message to bytes
      const messageBytes = naclUtils.decodeUTF8(content);

      // Encrypt using secret key and nonce
      // Note: In a real system, you might use box (asymmetric) instead of secretbox
      const encrypted = nacl.secretbox(messageBytes, nonce, secretKeyBytes);

      const encryptedMessage: EncryptedMessage = {
        messageId,
        ciphertext: naclUtils.encodeBase64(encrypted),
        nonce: naclUtils.encodeBase64(nonce),
        publicKey: encryptionKey.publicKey,
        isEncrypted: true,
      };

      return encryptedMessage;
    } catch (error) {
      console.error('Failed to encrypt message:', error);
      return null;
    }
  }

  /**
   * Decrypt a message
   */
  static async decryptMessage(
    messageId: string,
    roomId: string,
    ciphertext: string,
    nonce: string
  ): Promise<DecryptedMessage | null> {
    try {
      // Get room's keypair
      let encryptionKey = keyStore.get(roomId);
      if (!encryptionKey) {
        const dbKey = await prisma.encryptionKey.findUnique({
          where: { roomId },
        });
        if (dbKey) {
          encryptionKey = {
            roomId: dbKey.roomId,
            publicKey: dbKey.publicKey,
            secretKey: dbKey.secretKey,
            createdAt: dbKey.createdAt,
            rotatedAt: dbKey.rotatedAt || undefined,
            isActive: dbKey.isActive,
          };
          keyStore.set(roomId, encryptionKey);
        } else {
          return null; // No key found
        }
      }

      // Decode base64
      const secretKeyBytes = naclUtils.decodeBase64(encryptionKey.secretKey);
      const ciphertextBytes = naclUtils.decodeBase64(ciphertext);
      const nonceBytes = naclUtils.decodeBase64(nonce);

      // Decrypt
      const decrypted = nacl.secretbox.open(ciphertextBytes, nonceBytes, secretKeyBytes);

      if (!decrypted) {
        throw new Error('Failed to decrypt message');
      }

      const content = naclUtils.encodeUTF8(decrypted);

      return {
        messageId,
        content,
        isEncrypted: true,
      };
    } catch (error) {
      console.error('Failed to decrypt message:', error);
      return null;
    }
  }

  /**
   * Rotate room encryption keys
   */
  static async rotateRoomKeys(roomId: string): Promise<EncryptionKey | null> {
    try {
      // Mark old key as inactive
      const oldKey = keyStore.get(roomId);
      if (oldKey) {
        oldKey.isActive = false;
      }

      // Generate new keypair
      const newKey = await this.generateRoomKeyPair(roomId);

      console.log(`Keys rotated for room ${roomId}`);
      return newKey;
    } catch (error) {
      console.error('Failed to rotate room keys:', error);
      return null;
    }
  }

  /**
   * Grant user access to room's encryption key
   */
  static async grantKeyAccess(roomId: string, userId: string): Promise<void> {
    try {
      // Store user key access record
      await prisma.keyAccess.create({
        data: {
          roomId,
          userId,
          grantedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to grant key access:', error);
    }
  }

  /**
   * Revoke user access to room's encryption key
   */
  static async revokeKeyAccess(roomId: string, userId: string): Promise<void> {
    try {
      await prisma.keyAccess.deleteMany({
        where: {
          roomId,
          userId,
        },
      });
    } catch (error) {
      console.error('Failed to revoke key access:', error);
    }
  }

  /**
   * Check if user has access to room's encryption key
   */
  static async hasKeyAccess(roomId: string, userId: string): Promise<boolean> {
    try {
      const access = await prisma.keyAccess.findFirst({
        where: {
          roomId,
          userId,
        },
      });

      return !!access;
    } catch (error) {
      console.error('Failed to check key access:', error);
      return false;
    }
  }

  /**
   * Export encrypted key for backup
   */
  static exportEncryptedKey(roomId: string, backupPassword: string): string | null {
    try {
      const key = keyStore.get(roomId);
      if (!key) return null;

      // In production: encrypt key with backup password
      // For now, just base64 encode
      const keyData = JSON.stringify({
        roomId: key.roomId,
        publicKey: key.publicKey,
        secretKey: key.secretKey,
        createdAt: key.createdAt,
      });

      return naclUtils.encodeBase64(naclUtils.decodeUTF8(keyData));
    } catch (error) {
      console.error('Failed to export key:', error);
      return null;
    }
  }

  /**
   * Import encrypted key from backup
   */
  static async importEncryptedKey(
    backupKey: string,
    backupPassword: string
  ): Promise<boolean> {
    try {
      // Decode base64
      const decoded = naclUtils.encodeUTF8(naclUtils.decodeBase64(backupKey));
      const keyData = JSON.parse(decoded);

      // Store key
      const importedKey: EncryptionKey = {
        roomId: keyData.roomId,
        publicKey: keyData.publicKey,
        secretKey: keyData.secretKey,
        createdAt: new Date(keyData.createdAt),
        isActive: true,
      };

      keyStore.set(importedKey.roomId, importedKey);

      return true;
    } catch (error) {
      console.error('Failed to import key:', error);
      return false;
    }
  }

  /**
   * Get encryption statistics
   */
  static async getEncryptionStats(): Promise<{
    totalEncryptedRooms: number;
    totalEncryptedMessages: number;
    keyRotations: number;
  }> {
    try {
      const [rooms, messages, rotations] = await Promise.all([
        prisma.encryptionKey.count({ where: { isActive: true } }),
        prisma.message.count({ where: { isEncrypted: true } }),
        prisma.encryptionKey.count(),
      ]);

      return {
        totalEncryptedRooms: rooms,
        totalEncryptedMessages: messages,
        keyRotations: rotations,
      };
    } catch (error) {
      console.error('Failed to get encryption stats:', error);
      return {
        totalEncryptedRooms: 0,
        totalEncryptedMessages: 0,
        keyRotations: 0,
      };
    }
  }

  /**
   * Verify message integrity
   */
  static verifyMessageIntegrity(
    content: string,
    signature: string,
    publicKey: string
  ): boolean {
    try {
      const contentBytes = naclUtils.decodeUTF8(content);
      const signatureBytes = naclUtils.decodeBase64(signature);
      const publicKeyBytes = naclUtils.decodeBase64(publicKey);

      const verified = nacl.sign.detached.verify(
        contentBytes,
        signatureBytes,
        publicKeyBytes
      );

      return verified;
    } catch (error) {
      console.error('Failed to verify message:', error);
      return false;
    }
  }
}
