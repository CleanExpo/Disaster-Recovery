/**
 * API Key Rotation System
 * NRP Disaster Recovery Platform
 * 
 * Manages automatic rotation of API keys for enhanced security
 */

import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { EventEmitter } from 'events';

// Types
export interface APIKey {
  id: string;
  key: string;
  name: string;
  service: string;
  permissions: string[];
  createdAt: Date;
  lastUsed: Date | null;
  expiresAt: Date;
  rotateAt: Date;
  status: 'active' | 'rotating' | 'expired' | 'revoked';
  version: number;
  metadata?: Record<string, any>;
}

export interface RotationConfig {
  service: string;
  rotationDays: number;
  warningDays: number;
  autoRotate: boolean;
  notificationEmails: string[];
  webhookUrl?: string;
  maxVersions: number;
}

export interface RotationResult {
  success: boolean;
  oldKey: string;
  newKey: string;
  service: string;
  rotatedAt: Date;
  nextRotation: Date;
  error?: string;
}

export interface KeyUsageMetrics {
  keyId: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  lastUsed: Date;
  averageResponseTime: number;
  topEndpoints: Array<{ endpoint: string; count: number }>;
}

/**
 * API Key Rotation Service
 */
export class APIKeyRotationService extends EventEmitter {
  private rotationConfigs: Map<string, RotationConfig> = new Map();
  private rotationTimers: Map<string, NodeJS.Timeout> = new Map();
  private readonly keyPrefix = 'nrp_';
  private readonly keyLength = 32;

  constructor() {
    super();
    this.loadConfigurations();
    this.initializeRotationSchedule();
  }

  /**
   * Generate new API key
   */
  generateAPIKey(service: string): string {
    const randomBytes = crypto.randomBytes(this.keyLength);
    const timestamp = Date.now().toString(36);
    const servicePrefix = service.substring(0, 3).toLowerCase();
    
    return `${this.keyPrefix}${servicePrefix}_${timestamp}_${randomBytes.toString('hex')}`;
  }

  /**
   * Create new API key
   */
  async createAPIKey(
    name: string,
    service: string,
    permissions: string[],
    expirationDays: number = 90
  ): Promise<APIKey> {
    try {
      const key = this.generateAPIKey(service);
      const hashedKey = this.hashKey(key);
      const config = this.rotationConfigs.get(service) || this.getDefaultConfig(service);

      const apiKey = await prisma.apiKey.create({
        data: {
          key: hashedKey,
          keyPrefix: key.substring(0, 12), // Store prefix for identification
          name,
          service,
          permissions,
          expiresAt: new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000),
          rotateAt: new Date(Date.now() + config.rotationDays * 24 * 60 * 60 * 1000),
          status: 'active',
          version: 1,
          metadata: {
            createdBy: 'system',
            environment: process.env.NODE_ENV,
          }
        }
      });

      // Schedule rotation
      this.scheduleRotation(apiKey.id, config);

      // Log creation
      await this.logKeyEvent(apiKey.id, 'created', { service, permissions });

      this.emit('key:created', { keyId: apiKey.id, service });

      return {
        ...apiKey,
        key // Return unhashed key only on creation
      };
    } catch (error) {
      console.error('Failed to create API key:', error);
      throw new Error('Failed to create API key');
    }
  }

  /**
   * Rotate API key
   */
  async rotateAPIKey(keyId: string, manual: boolean = false): Promise<RotationResult> {
    try {
      // Get current key
      const currentKey = await prisma.apiKey.findUnique({
        where: { id: keyId }
      });

      if (!currentKey) {
        throw new Error('API key not found');
      }

      if (currentKey.status === 'rotating') {
        throw new Error('Key rotation already in progress');
      }

      // Update current key status
      await prisma.apiKey.update({
        where: { id: keyId },
        data: { status: 'rotating' }
      });

      // Generate new key
      const newKeyValue = this.generateAPIKey(currentKey.service);
      const hashedNewKey = this.hashKey(newKeyValue);
      const config = this.rotationConfigs.get(currentKey.service) || this.getDefaultConfig(currentKey.service);

      // Create new key version
      const newKey = await prisma.apiKey.create({
        data: {
          key: hashedNewKey,
          keyPrefix: newKeyValue.substring(0, 12),
          name: currentKey.name,
          service: currentKey.service,
          permissions: currentKey.permissions,
          expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          rotateAt: new Date(Date.now() + config.rotationDays * 24 * 60 * 60 * 1000),
          status: 'active',
          version: currentKey.version + 1,
          metadata: {
            ...currentKey.metadata,
            rotatedFrom: keyId,
            rotationType: manual ? 'manual' : 'automatic',
            rotatedAt: new Date()
          }
        }
      });

      // Update old key
      await prisma.apiKey.update({
        where: { id: keyId },
        data: {
          status: 'expired',
          metadata: {
            ...currentKey.metadata,
            rotatedTo: newKey.id,
            expiredAt: new Date()
          }
        }
      });

      // Notify about rotation
      await this.notifyKeyRotation(currentKey, newKey, newKeyValue);

      // Update external services
      await this.updateExternalServices(currentKey.service, currentKey.keyPrefix || '', newKeyValue);

      // Schedule next rotation
      this.scheduleRotation(newKey.id, config);

      // Log rotation
      await this.logKeyEvent(newKey.id, 'rotated', {
        fromKeyId: keyId,
        manual,
        version: newKey.version
      });

      this.emit('key:rotated', {
        oldKeyId: keyId,
        newKeyId: newKey.id,
        service: currentKey.service
      });

      return {
        success: true,
        oldKey: currentKey.keyPrefix || '',
        newKey: newKeyValue,
        service: currentKey.service,
        rotatedAt: new Date(),
        nextRotation: newKey.rotateAt
      };

    } catch (error) {
      console.error('API key rotation failed:', error);
      
      // Revert rotation status if failed
      await prisma.apiKey.update({
        where: { id: keyId },
        data: { status: 'active' }
      }).catch(() => {});

      return {
        success: false,
        oldKey: '',
        newKey: '',
        service: '',
        rotatedAt: new Date(),
        nextRotation: new Date(),
        error: error.message
      };
    }
  }

  /**
   * Revoke API key
   */
  async revokeAPIKey(keyId: string, reason: string): Promise<void> {
    try {
      const key = await prisma.apiKey.update({
        where: { id: keyId },
        data: {
          status: 'revoked',
          metadata: {
            revokedAt: new Date(),
            revokedReason: reason
          }
        }
      });

      // Cancel scheduled rotation
      this.cancelRotation(keyId);

      // Log revocation
      await this.logKeyEvent(keyId, 'revoked', { reason });

      // Notify about revocation
      if (key) {
        await this.notifyKeyRevocation(key, reason);
      }

      this.emit('key:revoked', { keyId, reason });

    } catch (error) {
      console.error('Failed to revoke API key:', error);
      throw new Error('Failed to revoke API key');
    }
  }

  /**
   * Validate API key
   */
  async validateAPIKey(apiKey: string): Promise<{
    valid: boolean;
    keyId?: string;
    permissions?: string[];
    service?: string;
    error?: string;
  }> {
    try {
      const hashedKey = this.hashKey(apiKey);
      const keyPrefix = apiKey.substring(0, 12);

      const key = await prisma.apiKey.findFirst({
        where: {
          key: hashedKey,
          keyPrefix,
          status: 'active',
          expiresAt: { gt: new Date() }
        }
      });

      if (!key) {
        return {
          valid: false,
          error: 'Invalid or expired API key'
        };
      }

      // Update last used
      await prisma.apiKey.update({
        where: { id: key.id },
        data: { lastUsed: new Date() }
      });

      // Track usage
      await this.trackKeyUsage(key.id, 'validation', true);

      return {
        valid: true,
        keyId: key.id,
        permissions: key.permissions,
        service: key.service
      };

    } catch (error) {
      console.error('API key validation failed:', error);
      return {
        valid: false,
        error: 'Validation failed'
      };
    }
  }

  /**
   * Get key usage metrics
   */
  async getKeyMetrics(keyId: string): Promise<KeyUsageMetrics> {
    try {
      const metrics = await prisma.apiKeyMetrics.findUnique({
        where: { keyId }
      });

      if (!metrics) {
        return {
          keyId,
          totalRequests: 0,
          successfulRequests: 0,
          failedRequests: 0,
          lastUsed: new Date(),
          averageResponseTime: 0,
          topEndpoints: []
        };
      }

      return {
        keyId,
        totalRequests: metrics.totalRequests,
        successfulRequests: metrics.successfulRequests,
        failedRequests: metrics.failedRequests,
        lastUsed: metrics.lastUsed,
        averageResponseTime: metrics.averageResponseTime,
        topEndpoints: metrics.topEndpoints as any[]
      };

    } catch (error) {
      console.error('Failed to get key metrics:', error);
      throw error;
    }
  }

  /**
   * Check keys expiring soon
   */
  async getExpiringKeys(days: number = 7): Promise<APIKey[]> {
    const expiryDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    return prisma.apiKey.findMany({
      where: {
        status: 'active',
        OR: [
          { expiresAt: { lte: expiryDate } },
          { rotateAt: { lte: expiryDate } }
        ]
      },
      orderBy: { rotateAt: 'asc' }
    });
  }

  /**
   * Configure rotation for a service
   */
  configureRotation(config: RotationConfig): void {
    this.rotationConfigs.set(config.service, config);
    
    // Update existing keys with new rotation schedule
    this.updateRotationSchedules(config.service);
  }

  /**
   * Private helper methods
   */

  private hashKey(key: string): string {
    return crypto.createHash('sha256').update(key).digest('hex');
  }

  private getDefaultConfig(service: string): RotationConfig {
    return {
      service,
      rotationDays: 90,
      warningDays: 7,
      autoRotate: true,
      notificationEmails: [process.env.ADMIN_EMAIL || 'admin@disaster-recovery.com'],
      maxVersions: 3
    };
  }

  private async loadConfigurations(): Promise<void> {
    try {
      const configs = await prisma.rotationConfig.findMany();
      
      configs.forEach(config => {
        this.rotationConfigs.set(config.service, {
          service: config.service,
          rotationDays: config.rotationDays,
          warningDays: config.warningDays,
          autoRotate: config.autoRotate,
          notificationEmails: config.notificationEmails,
          webhookUrl: config.webhookUrl,
          maxVersions: config.maxVersions
        });
      });
    } catch (error) {
      console.error('Failed to load rotation configurations:', error);
    }
  }

  private async initializeRotationSchedule(): Promise<void> {
    try {
      const activeKeys = await prisma.apiKey.findMany({
        where: { status: 'active' }
      });

      activeKeys.forEach(key => {
        const config = this.rotationConfigs.get(key.service) || this.getDefaultConfig(key.service);
        this.scheduleRotation(key.id, config);
      });

      console.log(`Scheduled rotation for ${activeKeys.length} API keys`);
    } catch (error) {
      console.error('Failed to initialize rotation schedule:', error);
    }
  }

  private scheduleRotation(keyId: string, config: RotationConfig): void {
    if (!config.autoRotate) return;

    // Clear existing timer
    this.cancelRotation(keyId);

    // Calculate time until rotation
    prisma.apiKey.findUnique({
      where: { id: keyId }
    }).then(key => {
      if (!key) return;

      const timeUntilRotation = key.rotateAt.getTime() - Date.now();
      const timeUntilWarning = timeUntilRotation - (config.warningDays * 24 * 60 * 60 * 1000);

      // Schedule warning
      if (timeUntilWarning > 0) {
        setTimeout(() => {
          this.sendRotationWarning(keyId, config.warningDays);
        }, timeUntilWarning);
      }

      // Schedule rotation
      if (timeUntilRotation > 0) {
        const timer = setTimeout(() => {
          this.rotateAPIKey(keyId, false);
        }, timeUntilRotation);

        this.rotationTimers.set(keyId, timer);
      }
    });
  }

  private cancelRotation(keyId: string): void {
    const timer = this.rotationTimers.get(keyId);
    if (timer) {
      clearTimeout(timer);
      this.rotationTimers.delete(keyId);
    }
  }

  private async updateRotationSchedules(service: string): Promise<void> {
    const config = this.rotationConfigs.get(service);
    if (!config) return;

    const keys = await prisma.apiKey.findMany({
      where: {
        service,
        status: 'active'
      }
    });

    keys.forEach(key => {
      this.scheduleRotation(key.id, config);
    });
  }

  private async notifyKeyRotation(
    oldKey: any,
    newKey: any,
    newKeyValue: string
  ): Promise<void> {
    const config = this.rotationConfigs.get(oldKey.service);
    if (!config) return;

    // Send email notifications
    for (const email of config.notificationEmails) {
      await sendEmail({
        to: email,
        subject: `API Key Rotated: ${oldKey.service}`,
        template: 'api-key-rotated',
        data: {
          service: oldKey.service,
          oldKeyPrefix: oldKey.keyPrefix,
          newKey: newKeyValue,
          nextRotation: newKey.rotateAt,
          configUrl: `${process.env.NEXT_PUBLIC_APP_URL}/admin/api-keys/${newKey.id}`
        }
      });
    }

    // Send webhook if configured
    if (config.webhookUrl) {
      await this.sendWebhook(config.webhookUrl, {
        event: 'key.rotated',
        service: oldKey.service,
        oldKeyId: oldKey.id,
        newKeyId: newKey.id,
        timestamp: new Date()
      });
    }
  }

  private async notifyKeyRevocation(key: any, reason: string): Promise<void> {
    const config = this.rotationConfigs.get(key.service);
    if (!config) return;

    for (const email of config.notificationEmails) {
      await sendEmail({
        to: email,
        subject: `API Key Revoked: ${key.service}`,
        template: 'api-key-revoked',
        data: {
          service: key.service,
          keyPrefix: key.keyPrefix,
          reason,
          revokedAt: new Date()
        }
      });
    }
  }

  private async sendRotationWarning(keyId: string, daysRemaining: number): Promise<void> {
    const key = await prisma.apiKey.findUnique({
      where: { id: keyId }
    });

    if (!key) return;

    const config = this.rotationConfigs.get(key.service);
    if (!config) return;

    for (const email of config.notificationEmails) {
      await sendEmail({
        to: email,
        subject: `API Key Rotation Warning: ${key.service}`,
        template: 'api-key-rotation-warning',
        data: {
          service: key.service,
          keyPrefix: key.keyPrefix,
          daysRemaining,
          rotationDate: key.rotateAt
        }
      });
    }

    this.emit('key:rotation-warning', {
      keyId,
      service: key.service,
      daysRemaining
    });
  }

  private async updateExternalServices(
    service: string,
    oldKey: string,
    newKey: string
  ): Promise<void> {
    // Update environment variables or external service configurations
    // This would integrate with your deployment system
    
    try {
      // Example: Update Vercel environment variables
      if (process.env.VERCEL_API_TOKEN) {
        await this.updateVercelEnvVar(service, newKey);
      }

      // Example: Update Docker secrets
      if (process.env.DOCKER_HOST) {
        await this.updateDockerSecret(service, newKey);
      }

      console.log(`Updated external services for ${service}`);
    } catch (error) {
      console.error(`Failed to update external services for ${service}:`, error);
      throw error;
    }
  }

  private async updateVercelEnvVar(service: string, newKey: string): Promise<void> {
    // Implementation would use Vercel API
    console.log(`Would update Vercel env var for ${service}`);
  }

  private async updateDockerSecret(service: string, newKey: string): Promise<void> {
    // Implementation would use Docker API
    console.log(`Would update Docker secret for ${service}`);
  }

  private async sendWebhook(url: string, data: any): Promise<void> {
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-NRP-Event': 'api-key-rotation'
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Webhook send failed:', error);
    }
  }

  private async trackKeyUsage(
    keyId: string,
    endpoint: string,
    success: boolean
  ): Promise<void> {
    try {
      await prisma.apiKeyMetrics.upsert({
        where: { keyId },
        create: {
          keyId,
          totalRequests: 1,
          successfulRequests: success ? 1 : 0,
          failedRequests: success ? 0 : 1,
          lastUsed: new Date(),
          averageResponseTime: 0,
          topEndpoints: [{ endpoint, count: 1 }]
        },
        update: {
          totalRequests: { increment: 1 },
          successfulRequests: success ? { increment: 1 } : undefined,
          failedRequests: !success ? { increment: 1 } : undefined,
          lastUsed: new Date()
        }
      });
    } catch (error) {
      console.error('Failed to track key usage:', error);
    }
  }

  private async logKeyEvent(
    keyId: string,
    action: string,
    details: any
  ): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          entityType: 'api_key',
          entityId: keyId,
          action,
          details,
          timestamp: new Date()
        }
      });
    } catch (error) {
      console.error('Failed to log key event:', error);
    }
  }

  /**
   * Cleanup expired keys
   */
  async cleanupExpiredKeys(): Promise<number> {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      
      const result = await prisma.apiKey.deleteMany({
        where: {
          status: 'expired',
          expiresAt: { lt: thirtyDaysAgo }
        }
      });

      console.log(`Cleaned up ${result.count} expired API keys`);
      return result.count;
    } catch (error) {
      console.error('Failed to cleanup expired keys:', error);
      return 0;
    }
  }
}

// Export singleton instance
let apiKeyRotationService: APIKeyRotationService | null = null;

export function getAPIKeyRotationService(): APIKeyRotationService {
  if (!apiKeyRotationService) {
    apiKeyRotationService = new APIKeyRotationService();
  }
  return apiKeyRotationService;
}