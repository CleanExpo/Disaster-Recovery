/**
 * Two-Factor Authentication Service
 * NRP Disaster Recovery Platform
 * 
 * Implements TOTP (Time-based One-Time Password) and SMS-based 2FA
 */

import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

// Types
export interface TwoFactorSecret {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface VerificationResult {
  verified: boolean;
  message: string;
  remainingAttempts?: number;
}

export interface TwoFactorSettings {
  enabled: boolean;
  method: '2fa_app' | '2fa_sms' | '2fa_email';
  phoneNumber?: string;
  email?: string;
  lastVerified?: Date;
  backupCodesUsed: number;
}

/**
 * Two-Factor Authentication Service
 */
export class TwoFactorAuthService {
  private readonly maxAttempts = 3;
  private readonly lockoutDuration = 15 * 60 * 1000; // 15 minutes
  private readonly tokenExpiry = 5 * 60 * 1000; // 5 minutes for SMS/Email tokens
  private readonly appName = 'NRP Disaster Recovery';

  /**
   * Generate TOTP secret and QR code
   */
  async generateSecret(userId: string, userEmail: string): Promise<TwoFactorSecret> {
    try {
      // Generate secret
      const secret = speakeasy.generateSecret({
        name: `${this.appName} (${userEmail})`,
        issuer: this.appName,
        length: 32
      });

      // Generate QR code
      const otpauthUrl = speakeasy.otpauthURL({
        secret: secret.ascii,
        label: userEmail,
        issuer: this.appName,
        encoding: 'ascii'
      });

      const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);

      // Generate backup codes
      const backupCodes = this.generateBackupCodes();

      // Store encrypted secret in database
      await this.storeSecret(userId, secret.base32, backupCodes);

      return {
        secret: secret.base32,
        qrCodeUrl,
        backupCodes
      };
    } catch (error) {
      console.error('Failed to generate 2FA secret:', error);
      throw new Error('Failed to generate 2FA secret');
    }
  }

  /**
   * Verify TOTP token
   */
  async verifyTOTP(userId: string, token: string): Promise<VerificationResult> {
    try {
      // Check if user is locked out
      const lockout = await this.checkLockout(userId);
      if (lockout.isLocked) {
        return {
          verified: false,
          message: `Account locked. Try again in ${lockout.remainingMinutes} minutes.`
        };
      }

      // Get user's secret
      const user = await prisma.contractor.findUnique({
        where: { id: userId },
        select: { twoFactorSecret: true }
      });

      if (!user?.twoFactorSecret) {
        return {
          verified: false,
          message: '2FA not enabled for this account'
        };
      }

      // Decrypt secret
      const secret = this.decryptSecret(user.twoFactorSecret);

      // Verify token
      const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token,
        window: 2 // Allow 2 time steps before/after
      });

      if (verified) {
        await this.resetFailedAttempts(userId);
        await this.logVerification(userId, 'totp', true);
        
        return {
          verified: true,
          message: 'Successfully verified'
        };
      } else {
        const remainingAttempts = await this.recordFailedAttempt(userId);
        
        return {
          verified: false,
          message: 'Invalid code',
          remainingAttempts
        };
      }
    } catch (error) {
      console.error('TOTP verification failed:', error);
      return {
        verified: false,
        message: 'Verification failed'
      };
    }
  }

  /**
   * Generate and send SMS token
   */
  async sendSMSToken(userId: string, phoneNumber: string): Promise<{ success: boolean; message: string }> {
    try {
      // Generate 6-digit token
      const token = this.generateNumericToken(6);
      
      // Store token with expiry
      await this.storeTemporaryToken(userId, token, 'sms');

      // Send SMS via Twilio
      await this.sendSMS(phoneNumber, `Your NRP verification code is: ${token}. Valid for 5 minutes.`);

      return {
        success: true,
        message: 'Verification code sent to your phone'
      };
    } catch (error) {
      console.error('Failed to send SMS token:', error);
      return {
        success: false,
        message: 'Failed to send verification code'
      };
    }
  }

  /**
   * Generate and send email token
   */
  async sendEmailToken(userId: string, email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Generate 6-digit token
      const token = this.generateNumericToken(6);
      
      // Store token with expiry
      await this.storeTemporaryToken(userId, token, 'email');

      // Send email
      await this.sendEmail(email, token);

      return {
        success: true,
        message: 'Verification code sent to your email'
      };
    } catch (error) {
      console.error('Failed to send email token:', error);
      return {
        success: false,
        message: 'Failed to send verification code'
      };
    }
  }

  /**
   * Verify SMS or email token
   */
  async verifyToken(userId: string, token: string, type: 'sms' | 'email'): Promise<VerificationResult> {
    try {
      // Check lockout
      const lockout = await this.checkLockout(userId);
      if (lockout.isLocked) {
        return {
          verified: false,
          message: `Account locked. Try again in ${lockout.remainingMinutes} minutes.`
        };
      }

      // Get stored token
      const storedToken = await prisma.twoFactorToken.findFirst({
        where: {
          userId,
          type,
          expiresAt: { gt: new Date() }
        },
        orderBy: { createdAt: 'desc' }
      });

      if (!storedToken) {
        return {
          verified: false,
          message: 'No valid verification code found'
        };
      }

      // Verify token
      const isValid = this.verifyHashedToken(token, storedToken.token);

      if (isValid) {
        // Mark token as used
        await prisma.twoFactorToken.update({
          where: { id: storedToken.id },
          data: { usedAt: new Date() }
        });

        await this.resetFailedAttempts(userId);
        await this.logVerification(userId, type, true);

        return {
          verified: true,
          message: 'Successfully verified'
        };
      } else {
        const remainingAttempts = await this.recordFailedAttempt(userId);
        
        return {
          verified: false,
          message: 'Invalid verification code',
          remainingAttempts
        };
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      return {
        verified: false,
        message: 'Verification failed'
      };
    }
  }

  /**
   * Verify backup code
   */
  async verifyBackupCode(userId: string, code: string): Promise<VerificationResult> {
    try {
      const user = await prisma.contractor.findUnique({
        where: { id: userId },
        select: { backupCodes: true }
      });

      if (!user?.backupCodes || user.backupCodes.length === 0) {
        return {
          verified: false,
          message: 'No backup codes available'
        };
      }

      // Check if code matches any unused backup code
      const hashedCode = this.hashToken(code);
      const codeIndex = user.backupCodes.findIndex(c => c === hashedCode);

      if (codeIndex !== -1) {
        // Remove used backup code
        const updatedCodes = user.backupCodes.filter((_, i) => i !== codeIndex);
        
        await prisma.contractor.update({
          where: { id: userId },
          data: { backupCodes: updatedCodes }
        });

        await this.logVerification(userId, 'backup', true);

        return {
          verified: true,
          message: `Successfully verified. ${updatedCodes.length} backup codes remaining.`
        };
      }

      return {
        verified: false,
        message: 'Invalid backup code'
      };
    } catch (error) {
      console.error('Backup code verification failed:', error);
      return {
        verified: false,
        message: 'Verification failed'
      };
    }
  }

  /**
   * Enable 2FA for user
   */
  async enable2FA(
    userId: string,
    method: '2fa_app' | '2fa_sms' | '2fa_email',
    verificationToken: string,
    contactInfo?: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Verify the token first
      let verified = false;
      
      if (method === '2fa_app') {
        const result = await this.verifyTOTP(userId, verificationToken);
        verified = result.verified;
      } else if (method === '2fa_sms' || method === '2fa_email') {
        const result = await this.verifyToken(userId, verificationToken, method === '2fa_sms' ? 'sms' : 'email');
        verified = result.verified;
      }

      if (!verified) {
        return {
          success: false,
          message: 'Invalid verification code'
        };
      }

      // Update user settings
      await prisma.contractor.update({
        where: { id: userId },
        data: {
          twoFactorEnabled: true,
          twoFactorMethod: method,
          twoFactorPhone: method === '2fa_sms' ? contactInfo : undefined,
          twoFactorEmail: method === '2fa_email' ? contactInfo : undefined,
        }
      });

      await this.logActivity(userId, '2fa_enabled', { method });

      return {
        success: true,
        message: '2FA successfully enabled'
      };
    } catch (error) {
      console.error('Failed to enable 2FA:', error);
      return {
        success: false,
        message: 'Failed to enable 2FA'
      };
    }
  }

  /**
   * Disable 2FA
   */
  async disable2FA(userId: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      // Verify password first
      const passwordValid = await this.verifyPassword(userId, password);
      
      if (!passwordValid) {
        return {
          success: false,
          message: 'Invalid password'
        };
      }

      // Clear 2FA settings
      await prisma.contractor.update({
        where: { id: userId },
        data: {
          twoFactorEnabled: false,
          twoFactorSecret: null,
          twoFactorMethod: null,
          twoFactorPhone: null,
          twoFactorEmail: null,
          backupCodes: [],
        }
      });

      await this.logActivity(userId, '2fa_disabled', {});

      return {
        success: true,
        message: '2FA successfully disabled'
      };
    } catch (error) {
      console.error('Failed to disable 2FA:', error);
      return {
        success: false,
        message: 'Failed to disable 2FA'
      };
    }
  }

  /**
   * Generate new backup codes
   */
  async regenerateBackupCodes(userId: string): Promise<string[]> {
    const backupCodes = this.generateBackupCodes();
    const hashedCodes = backupCodes.map(code => this.hashToken(code));

    await prisma.contractor.update({
      where: { id: userId },
      data: { backupCodes: hashedCodes }
    });

    return backupCodes;
  }

  /**
   * Private helper methods
   */

  private generateBackupCodes(count: number = 10): string[] {
    const codes: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const code = crypto.randomBytes(4).toString('hex').toUpperCase();
      codes.push(`${code.slice(0, 4)}-${code.slice(4)}`);
    }
    
    return codes;
  }

  private generateNumericToken(length: number): string {
    let token = '';
    for (let i = 0; i < length; i++) {
      token += Math.floor(Math.random() * 10).toString();
    }
    return token;
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private verifyHashedToken(token: string, hashedToken: string): boolean {
    const tokenHash = this.hashToken(token);
    return crypto.timingSafeEqual(Buffer.from(tokenHash), Buffer.from(hashedToken));
  }

  private encryptSecret(secret: string): string {
    const algorithm = 'aes-256-gcm';
    const key = Buffer.from(process.env.ENCRYPTION_KEY || 'default-key-32-characters-long!!', 'utf-8');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    let encrypted = cipher.update(secret, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
  }

  private decryptSecret(encryptedSecret: string): string {
    const parts = encryptedSecret.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];
    
    const algorithm = 'aes-256-gcm';
    const key = Buffer.from(process.env.ENCRYPTION_KEY || 'default-key-32-characters-long!!', 'utf-8');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  private async storeSecret(userId: string, secret: string, backupCodes: string[]): Promise<void> {
    const encryptedSecret = this.encryptSecret(secret);
    const hashedBackupCodes = backupCodes.map(code => this.hashToken(code));

    await prisma.contractor.update({
      where: { id: userId },
      data: {
        twoFactorSecret: encryptedSecret,
        backupCodes: hashedBackupCodes
      }
    });
  }

  private async storeTemporaryToken(userId: string, token: string, type: 'sms' | 'email'): Promise<void> {
    const hashedToken = this.hashToken(token);
    const expiresAt = new Date(Date.now() + this.tokenExpiry);

    await prisma.twoFactorToken.create({
      data: {
        userId,
        token: hashedToken,
        type,
        expiresAt
      }
    });
  }

  private async checkLockout(userId: string): Promise<{ isLocked: boolean; remainingMinutes: number }> {
    const lockout = await prisma.accountLockout.findFirst({
      where: {
        userId,
        lockedUntil: { gt: new Date() }
      }
    });

    if (lockout) {
      const remainingMs = lockout.lockedUntil.getTime() - Date.now();
      const remainingMinutes = Math.ceil(remainingMs / 60000);
      
      return {
        isLocked: true,
        remainingMinutes
      };
    }

    return {
      isLocked: false,
      remainingMinutes: 0
    };
  }

  private async recordFailedAttempt(userId: string): Promise<number> {
    const attempts = await prisma.loginAttempt.count({
      where: {
        userId,
        successful: false,
        createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } // Last hour
      }
    });

    await prisma.loginAttempt.create({
      data: {
        userId,
        successful: false,
        ipAddress: '', // Would be filled from request
        userAgent: '' // Would be filled from request
      }
    });

    const remainingAttempts = Math.max(0, this.maxAttempts - (attempts + 1));

    if (remainingAttempts === 0) {
      // Lock account
      await prisma.accountLockout.create({
        data: {
          userId,
          reason: 'Too many failed 2FA attempts',
          lockedUntil: new Date(Date.now() + this.lockoutDuration)
        }
      });
    }

    return remainingAttempts;
  }

  private async resetFailedAttempts(userId: string): Promise<void> {
    await prisma.loginAttempt.deleteMany({
      where: {
        userId,
        successful: false
      }
    });
  }

  private async logVerification(userId: string, method: string, success: boolean): Promise<void> {
    await prisma.auditLog.create({
      data: {
        userId,
        action: '2fa_verification',
        details: {
          method,
          success,
          timestamp: new Date()
        }
      }
    });
  }

  private async logActivity(userId: string, action: string, details: any): Promise<void> {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        details
      }
    });
  }

  private async verifyPassword(userId: string, password: string): Promise<boolean> {
    // This would integrate with your existing password verification
    // For now, returning true for demonstration
    return true;
  }

  private async sendSMS(phoneNumber: string, message: string): Promise<void> {
    // Twilio integration
    const twilio = require('twilio')(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await twilio.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
  }

  private async sendEmail(email: string, token: string): Promise<void> {
    // Email service integration
    const { sendEmail } = require('@/lib/email');
    
    await sendEmail({
      to: email,
      subject: 'Your NRP Verification Code',
      template: '2fa-code',
      data: {
        code: token,
        validMinutes: 5
      }
    });
  }
}

// Export singleton instance
let twoFactorService: TwoFactorAuthService | null = null;

export function getTwoFactorService(): TwoFactorAuthService {
  if (!twoFactorService) {
    twoFactorService = new TwoFactorAuthService();
  }
  return twoFactorService;
}