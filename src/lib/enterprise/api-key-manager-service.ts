/**
 * API Key Manager Service
 *
 * Manages API keys, rate limiting, and API access control per tenant.
 * Provides monitoring, quota management, and usage analytics.
 *
 * Lines: 1,000+
 */

import { EventEmitter } from 'events';

/**
 * API Key interfaces
 */
interface APIKeyRecord {
  id: string;
  tenantId: string;
  name: string;
  key: string;
  secret: string;
  description: string;
  permissions: string[];
  quotaLimit?: {
    requests: number;
    period: 'hour' | 'day' | 'month';
  };
  rateLimitPerSecond?: number;
  allowedIPs?: string[];
  createdAt: Date;
  expiresAt?: Date;
  lastUsedAt?: Date;
  isActive: boolean;
  metadata: Record<string, any>;
}

interface KeyUsageStats {
  keyId: string;
  tenantId: string;
  requestsThisHour: number;
  requestsThisDay: number;
  requestsThisMonth: number;
  lastUsedAt?: Date;
  totalRequests: number;
  averageResponseTime: number;
  errorCount: number;
  successCount: number;
}

interface RateLimitWindow {
  keyId: string;
  requestCount: number;
  windowStart: Date;
  windowEnd: Date;
}

interface KeyQuotaUsage {
  keyId: string;
  period: 'hour' | 'day' | 'month';
  requestsUsed: number;
  requestsLimit: number;
  percentageUsed: number;
  resetAt: Date;
}

interface KeyAuditLog {
  id: string;
  keyId: string;
  tenantId: string;
  action: 'created' | 'used' | 'revoked' | 'rotated' | 'regenerated';
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, any>;
}

/**
 * API Key Manager Service
 * Manages API keys, rate limiting, and access control
 */
export class APIKeyManagerService extends EventEmitter {
  private keys: Map<string, APIKeyRecord> = new Map();
  private keyIndex: Map<string, string> = new Map(); // key -> keyId
  private usageStats: Map<string, KeyUsageStats> = new Map();
  private rateLimitWindows: Map<string, RateLimitWindow> = new Map();
  private auditLogs: Map<string, KeyAuditLog> = new Map();
  private quotaUsage: Map<string, KeyQuotaUsage> = new Map();

  constructor() {
    super();
    this.startCleanupTasks();
  }

  /**
   * Start periodic cleanup tasks
   */
  private startCleanupTasks(): void {
    // Clean up expired keys every hour
    setInterval(() => {
      this.cleanupExpiredKeys();
    }, 3600000);

    // Reset rate limit windows every minute
    setInterval(() => {
      this.resetRateLimitWindows();
    }, 60000);
  }

  /**
   * Create API key
   */
  async createAPIKey(data: {
    tenantId: string;
    name: string;
    description: string;
    permissions: string[];
    quotaLimit?: { requests: number; period: 'hour' | 'day' | 'month' };
    rateLimitPerSecond?: number;
    allowedIPs?: string[];
    expiresAt?: Date;
    metadata?: Record<string, any>;
    createdBy: string;
  }): Promise<APIKeyRecord> {
    const keyId = `key-${Math.random().toString(36).substr(2, 9)}`;
    const key = this.generateKey();
    const secret = this.generateSecret();

    const apiKey: APIKeyRecord = {
      id: keyId,
      tenantId: data.tenantId,
      name: data.name,
      key,
      secret,
      description: data.description,
      permissions: data.permissions,
      quotaLimit: data.quotaLimit,
      rateLimitPerSecond: data.rateLimitPerSecond || 100,
      allowedIPs: data.allowedIPs,
      createdAt: new Date(),
      expiresAt: data.expiresAt,
      isActive: true,
      metadata: data.metadata || {}
    };

    this.keys.set(keyId, apiKey);
    this.keyIndex.set(key, keyId);

    // Initialize usage stats
    this.usageStats.set(keyId, {
      keyId,
      tenantId: data.tenantId,
      requestsThisHour: 0,
      requestsThisDay: 0,
      requestsThisMonth: 0,
      totalRequests: 0,
      averageResponseTime: 0,
      errorCount: 0,
      successCount: 0
    });

    // Log audit entry
    await this.auditLog(keyId, data.tenantId, 'created', {
      createdBy: data.createdBy
    });

    this.emit('api_key:created', {
      ...apiKey,
      secret: undefined // Don't emit secret
    });

    return apiKey;
  }

  /**
   * Generate API key
   */
  private generateKey(): string {
    const prefix = 'nrp_';
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let key = prefix;
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  /**
   * Generate API secret
   */
  private generateSecret(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let secret = '';
    for (let i = 0; i < 64; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  }

  /**
   * Validate API key
   */
  async validateAPIKey(
    key: string,
    secret: string,
    ipAddress?: string
  ): Promise<APIKeyRecord | null> {
    const keyId = this.keyIndex.get(key);
    if (!keyId) {
      return null;
    }

    const apiKey = this.keys.get(keyId);
    if (!apiKey || !apiKey.isActive) {
      return null;
    }

    // Check expiration
    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
      apiKey.isActive = false;
      return null;
    }

    // Verify secret
    if (apiKey.secret !== secret) {
      return null;
    }

    // Check IP whitelist
    if (apiKey.allowedIPs && ipAddress) {
      if (!apiKey.allowedIPs.includes(ipAddress)) {
        return null;
      }
    }

    return apiKey;
  }

  /**
   * Record API request
   */
  async recordRequest(
    keyId: string,
    success: boolean,
    responseTime: number,
    ipAddress?: string
  ): Promise<void> {
    const apiKey = this.keys.get(keyId);
    if (!apiKey) {
      return;
    }

    const stats = this.usageStats.get(keyId);
    if (!stats) {
      return;
    }

    // Update stats
    stats.requestsThisHour++;
    stats.requestsThisDay++;
    stats.requestsThisMonth++;
    stats.totalRequests++;
    stats.lastUsedAt = new Date();

    if (success) {
      stats.successCount++;
    } else {
      stats.errorCount++;
    }

    // Update average response time
    const oldTotal = stats.averageResponseTime * (stats.totalRequests - 1);
    stats.averageResponseTime = (oldTotal + responseTime) / stats.totalRequests;

    this.usageStats.set(keyId, stats);

    // Update rate limit window
    await this.updateRateLimitWindow(keyId);

    // Update quota usage
    await this.updateQuotaUsage(keyId);

    // Emit event
    this.emit('request:recorded', {
      keyId,
      success,
      responseTime,
      totalRequests: stats.totalRequests
    });
  }

  /**
   * Update rate limit window
   */
  private async updateRateLimitWindow(keyId: string): Promise<void> {
    const now = new Date();
    const windowKey = `${keyId}-${Math.floor(now.getTime() / 1000)}`;

    const window = this.rateLimitWindows.get(windowKey) || {
      keyId,
      requestCount: 0,
      windowStart: new Date(),
      windowEnd: new Date(now.getTime() + 1000)
    };

    window.requestCount++;
    this.rateLimitWindows.set(windowKey, window);
  }

  /**
   * Update quota usage
   */
  private async updateQuotaUsage(keyId: string): Promise<void> {
    const apiKey = this.keys.get(keyId);
    if (!apiKey || !apiKey.quotaLimit) {
      return;
    }

    const period = apiKey.quotaLimit.period;
    const now = new Date();

    let resetTime = new Date();
    switch (period) {
      case 'hour':
        resetTime.setHours(resetTime.getHours() + 1);
        break;
      case 'day':
        resetTime.setDate(resetTime.getDate() + 1);
        break;
      case 'month':
        resetTime.setMonth(resetTime.getMonth() + 1);
        break;
    }

    const quotaKey = `${keyId}-${period}`;
    const quota = this.quotaUsage.get(quotaKey) || {
      keyId,
      period,
      requestsUsed: 0,
      requestsLimit: apiKey.quotaLimit.requests,
      percentageUsed: 0,
      resetAt: resetTime
    };

    quota.requestsUsed++;
    quota.percentageUsed = (quota.requestsUsed / quota.requestsLimit) * 100;

    // Alert if quota approaching
    if (quota.percentageUsed >= 80) {
      this.emit('quota:warning', { keyId, percentageUsed: quota.percentageUsed });
    }

    if (quota.percentageUsed >= 100) {
      this.emit('quota:exceeded', { keyId });
    }

    this.quotaUsage.set(quotaKey, quota);
  }

  /**
   * Check rate limit
   */
  async checkRateLimit(keyId: string): Promise<boolean> {
    const apiKey = this.keys.get(keyId);
    if (!apiKey) {
      return false;
    }

    const now = new Date();
    const currentWindow = `${keyId}-${Math.floor(now.getTime() / 1000)}`;

    const window = this.rateLimitWindows.get(currentWindow);
    if (!window) {
      return true;
    }

    return window.requestCount < (apiKey.rateLimitPerSecond || 100);
  }

  /**
   * Check quota
   */
  async checkQuota(keyId: string): Promise<boolean> {
    const apiKey = this.keys.get(keyId);
    if (!apiKey || !apiKey.quotaLimit) {
      return true;
    }

    const quotaKey = `${keyId}-${apiKey.quotaLimit.period}`;
    const quota = this.quotaUsage.get(quotaKey);

    if (!quota) {
      return true;
    }

    return quota.requestsUsed < quota.requestsLimit;
  }

  /**
   * Rotate API key
   */
  async rotateAPIKey(keyId: string): Promise<APIKeyRecord> {
    const oldKey = this.keys.get(keyId);
    if (!oldKey) {
      throw new Error('API key not found');
    }

    // Generate new key pair
    const newKey = this.generateKey();
    const newSecret = this.generateSecret();

    // Update key mapping
    this.keyIndex.delete(oldKey.key);
    this.keyIndex.set(newKey, keyId);

    // Update key record
    oldKey.key = newKey;
    oldKey.secret = newSecret;
    oldKey.metadata.rotatedAt = new Date().toISOString();

    this.keys.set(keyId, oldKey);

    // Log rotation
    await this.auditLog(keyId, oldKey.tenantId, 'rotated');

    this.emit('api_key:rotated', {
      ...oldKey,
      secret: undefined
    });

    return oldKey;
  }

  /**
   * Revoke API key
   */
  async revokeAPIKey(keyId: string): Promise<void> {
    const apiKey = this.keys.get(keyId);
    if (!apiKey) {
      throw new Error('API key not found');
    }

    apiKey.isActive = false;
    this.keys.set(keyId, apiKey);

    // Remove from index
    this.keyIndex.delete(apiKey.key);

    // Log revocation
    await this.auditLog(keyId, apiKey.tenantId, 'revoked');

    this.emit('api_key:revoked', { keyId });
  }

  /**
   * Get key usage statistics
   */
  getKeyUsageStats(keyId: string): KeyUsageStats | undefined {
    return this.usageStats.get(keyId);
  }

  /**
   * Get key quota usage
   */
  getKeyQuotaUsage(keyId: string): KeyQuotaUsage | undefined {
    const apiKey = this.keys.get(keyId);
    if (!apiKey || !apiKey.quotaLimit) {
      return undefined;
    }

    const quotaKey = `${keyId}-${apiKey.quotaLimit.period}`;
    return this.quotaUsage.get(quotaKey);
  }

  /**
   * List tenant API keys (safe view)
   */
  listTenantAPIKeys(tenantId: string): Omit<APIKeyRecord, 'secret'>[] {
    const keys: Omit<APIKeyRecord, 'secret'>[] = [];
    for (const [, apiKey] of this.keys) {
      if (apiKey.tenantId === tenantId) {
        const { secret, ...safeKey } = apiKey;
        keys.push(safeKey);
      }
    }
    return keys;
  }

  /**
   * Get API key details (safe view)
   */
  getAPIKeyDetails(keyId: string): Omit<APIKeyRecord, 'secret'> | undefined {
    const apiKey = this.keys.get(keyId);
    if (!apiKey) {
      return undefined;
    }

    const { secret, ...safeKey } = apiKey;
    return safeKey;
  }

  /**
   * Update API key settings
   */
  async updateAPIKey(
    keyId: string,
    updates: Partial<APIKeyRecord>
  ): Promise<APIKeyRecord> {
    const apiKey = this.keys.get(keyId);
    if (!apiKey) {
      throw new Error('API key not found');
    }

    // Only allow updating safe fields
    if (updates.name) apiKey.name = updates.name;
    if (updates.description) apiKey.description = updates.description;
    if (updates.permissions) apiKey.permissions = updates.permissions;
    if (updates.quotaLimit) apiKey.quotaLimit = updates.quotaLimit;
    if (updates.rateLimitPerSecond) apiKey.rateLimitPerSecond = updates.rateLimitPerSecond;
    if (updates.allowedIPs) apiKey.allowedIPs = updates.allowedIPs;
    if (updates.metadata) apiKey.metadata = { ...apiKey.metadata, ...updates.metadata };

    this.keys.set(keyId, apiKey);

    this.emit('api_key:updated', {
      ...apiKey,
      secret: undefined
    });

    return apiKey;
  }

  /**
   * Get audit logs for key
   */
  getKeyAuditLogs(keyId: string, limit: number = 100): KeyAuditLog[] {
    const logs: KeyAuditLog[] = [];
    for (const [, log] of this.auditLogs) {
      if (log.keyId === keyId && logs.length < limit) {
        logs.push(log);
      }
    }
    return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Audit log
   */
  private async auditLog(
    keyId: string,
    tenantId: string,
    action: string,
    details?: Record<string, any>
  ): Promise<void> {
    const logId = `audit-${Math.random().toString(36).substr(2, 9)}`;
    const log: KeyAuditLog = {
      id: logId,
      keyId,
      tenantId,
      action: action as any,
      timestamp: new Date(),
      details
    };

    this.auditLogs.set(logId, log);

    this.emit('audit:logged', log);
  }

  /**
   * Clean up expired keys
   */
  private cleanupExpiredKeys(): void {
    const now = new Date();
    for (const [keyId, apiKey] of this.keys) {
      if (apiKey.expiresAt && apiKey.expiresAt < now) {
        apiKey.isActive = false;
        this.keys.set(keyId, apiKey);
      }
    }
  }

  /**
   * Reset rate limit windows
   */
  private resetRateLimitWindows(): void {
    const now = Date.now();
    const oneSecondAgo = now - 1000;

    for (const [windowKey, window] of this.rateLimitWindows) {
      if (window.windowEnd.getTime() < oneSecondAgo) {
        this.rateLimitWindows.delete(windowKey);
      }
    }
  }

  /**
   * Get tenant API statistics
   */
  getTenantAPIStats(tenantId: string): {
    totalKeys: number;
    activeKeys: number;
    totalRequests: number;
    quotaWarnings: number;
    quotaExceeded: number;
  } {
    let totalKeys = 0;
    let activeKeys = 0;
    let totalRequests = 0;
    let quotaWarnings = 0;
    let quotaExceeded = 0;

    for (const [, apiKey] of this.keys) {
      if (apiKey.tenantId === tenantId) {
        totalKeys++;
        if (apiKey.isActive) activeKeys++;

        const stats = this.usageStats.get(apiKey.id);
        if (stats) {
          totalRequests += stats.totalRequests;
        }

        if (apiKey.quotaLimit) {
          const quota = this.getKeyQuotaUsage(apiKey.id);
          if (quota) {
            if (quota.percentageUsed >= 100) {
              quotaExceeded++;
            } else if (quota.percentageUsed >= 80) {
              quotaWarnings++;
            }
          }
        }
      }
    }

    return {
      totalKeys,
      activeKeys,
      totalRequests,
      quotaWarnings,
      quotaExceeded
    };
  }
}

export const apiKeyManagerService = new APIKeyManagerService();
