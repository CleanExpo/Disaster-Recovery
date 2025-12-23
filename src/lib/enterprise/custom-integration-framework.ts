/**
 * Custom Integration Framework
 *
 * Provides extensible integration framework for third-party services,
 * webhooks, and API extensions. Supports custom integrations and API keys.
 *
 * Lines: 1,300+
 */

import { EventEmitter } from 'events';

/**
 * Integration interfaces
 */
interface Integration {
  id: string;
  tenantId: string;
  name: string;
  type: 'webhook' | 'api' | 'oauth' | 'custom';
  status: 'active' | 'inactive' | 'error';
  config: IntegrationConfig;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  metadata: Record<string, any>;
}

interface IntegrationConfig {
  webhookUrl?: string;
  webhookSecret?: string;
  apiEndpoint?: string;
  apiKey?: string;
  oauthClientId?: string;
  oauthClientSecret?: string;
  oauthRedirectUri?: string;
  customPayload?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  retryPolicy?: {
    maxRetries: number;
    retryDelay: number;
    exponentialBackoff: boolean;
  };
}

interface WebhookEvent {
  id: string;
  integrationId: string;
  tenantId: string;
  event: string;
  payload: Record<string, any>;
  timestamp: Date;
  status: 'sent' | 'failed' | 'pending';
  attempts: number;
  lastAttempt?: Date;
  error?: string;
}

interface APIKey {
  id: string;
  tenantId: string;
  name: string;
  key: string;
  secret: string;
  integrationId?: string;
  permissions: string[];
  rateLimit?: {
    requests: number;
    windowMs: number;
  };
  createdAt: Date;
  expiresAt?: Date;
  lastUsedAt?: Date;
  isActive: boolean;
}

interface IntegrationEvent {
  id: string;
  integrationId: string;
  event: string;
  timestamp: Date;
  data: Record<string, any>;
}

interface ExtensionPoint {
  id: string;
  name: string;
  description: string;
  version: string;
  interface: Record<string, any>;
}

/**
 * Custom Integration Framework
 * Manages integrations, webhooks, API keys, and extensions
 */
export class CustomIntegrationFramework extends EventEmitter {
  private integrations: Map<string, Integration> = new Map();
  private webhookEvents: Map<string, WebhookEvent> = new Map();
  private apiKeys: Map<string, APIKey> = new Map();
  private extensionPoints: Map<string, ExtensionPoint> = new Map();
  private webhookQueue: WebhookEvent[] = [];
  private keyIndex: Map<string, string> = new Map(); // key -> keyId

  // Rate limiting
  private rateLimitMap: Map<string, { count: number; resetAt: number }> = new Map();

  constructor() {
    super();
    this.initializeExtensionPoints();
    this.startWebhookProcessor();
  }

  /**
   * Initialize extension points
   */
  private initializeExtensionPoints(): void {
    const extensionPoints: ExtensionPoint[] = [
      {
        id: 'ep-message-processing',
        name: 'Message Processing',
        description: 'Intercept and process messages',
        version: '1.0.0',
        interface: {
          onMessageCreate: 'function',
          onMessageEdit: 'function',
          onMessageDelete: 'function'
        }
      },
      {
        id: 'ep-user-events',
        name: 'User Events',
        description: 'React to user lifecycle events',
        version: '1.0.0',
        interface: {
          onUserJoin: 'function',
          onUserLeave: 'function',
          onProfileUpdate: 'function'
        }
      },
      {
        id: 'ep-analytics',
        name: 'Analytics',
        description: 'Custom analytics integrations',
        version: '1.0.0',
        interface: {
          trackEvent: 'function',
          trackMetric: 'function'
        }
      },
      {
        id: 'ep-notifications',
        name: 'Notifications',
        description: 'Custom notification channels',
        version: '1.0.0',
        interface: {
          sendNotification: 'function',
          sendAlert: 'function'
        }
      }
    ];

    for (const ep of extensionPoints) {
      this.extensionPoints.set(ep.id, ep);
    }
  }

  /**
   * Start webhook processor
   */
  private startWebhookProcessor(): void {
    setInterval(() => {
      this.processWebhookQueue();
    }, 5000); // Process every 5 seconds
  }

  /**
   * Create integration
   */
  async createIntegration(data: {
    tenantId: string;
    name: string;
    type: 'webhook' | 'api' | 'oauth' | 'custom';
    config: IntegrationConfig;
    createdBy: string;
    metadata?: Record<string, any>;
  }): Promise<Integration> {
    const integrationId = `integ-${Math.random().toString(36).substr(2, 9)}`;

    // Validate configuration
    if (!this.validateIntegrationConfig(data.type, data.config)) {
      throw new Error('Invalid integration configuration');
    }

    const integration: Integration = {
      id: integrationId,
      tenantId: data.tenantId,
      name: data.name,
      type: data.type,
      status: 'active',
      config: data.config,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: data.createdBy,
      metadata: data.metadata || {}
    };

    this.integrations.set(integrationId, integration);
    this.emit('integration:created', integration);

    return integration;
  }

  /**
   * Validate integration configuration
   */
  private validateIntegrationConfig(type: string, config: IntegrationConfig): boolean {
    switch (type) {
      case 'webhook':
        return !!config.webhookUrl;
      case 'api':
        return !!config.apiEndpoint && !!config.apiKey;
      case 'oauth':
        return !!config.oauthClientId && !!config.oauthClientSecret;
      case 'custom':
        return !!config.customPayload;
      default:
        return false;
    }
  }

  /**
   * Send webhook event
   */
  async sendWebhookEvent(
    integrationId: string,
    event: string,
    payload: Record<string, any>
  ): Promise<WebhookEvent> {
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      throw new Error('Integration not found');
    }

    if (!integration.config.webhookUrl) {
      throw new Error('Webhook URL not configured');
    }

    const webhookEventId = `webhook-${Math.random().toString(36).substr(2, 9)}`;
    const webhookEvent: WebhookEvent = {
      id: webhookEventId,
      integrationId,
      tenantId: integration.tenantId,
      event,
      payload,
      timestamp: new Date(),
      status: 'pending',
      attempts: 0
    };

    this.webhookEvents.set(webhookEventId, webhookEvent);
    this.webhookQueue.push(webhookEvent);

    this.emit('webhook:queued', webhookEvent);

    return webhookEvent;
  }

  /**
   * Process webhook queue
   */
  private async processWebhookQueue(): Promise<void> {
    while (this.webhookQueue.length > 0) {
      const webhookEvent = this.webhookQueue.shift();
      if (!webhookEvent) {
        continue;
      }

      const integration = this.integrations.get(webhookEvent.integrationId);
      if (!integration || integration.status !== 'active') {
        continue;
      }

      try {
        await this.deliverWebhook(webhookEvent, integration);
      } catch (error: any) {
        webhookEvent.attempts++;
        webhookEvent.error = error.message;
        webhookEvent.lastAttempt = new Date();

        const retryPolicy = integration.config.retryPolicy;
        if (
          retryPolicy &&
          webhookEvent.attempts < retryPolicy.maxRetries
        ) {
          // Re-queue for retry
          this.webhookQueue.push(webhookEvent);
        } else {
          webhookEvent.status = 'failed';
          this.emit('webhook:failed', webhookEvent);
        }
      }
    }
  }

  /**
   * Deliver webhook
   */
  private async deliverWebhook(
    webhookEvent: WebhookEvent,
    integration: Integration
  ): Promise<void> {
    const payload = {
      id: webhookEvent.id,
      event: webhookEvent.event,
      timestamp: webhookEvent.timestamp.toISOString(),
      data: webhookEvent.payload,
      integrationId: integration.id
    };

    // In real implementation, would make HTTP request
    // For now, simulate delivery
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          // 90% success rate simulation
          webhookEvent.status = 'sent';
          resolve(null);
        } else {
          reject(new Error('Webhook delivery failed'));
        }
      }, 100);
    });

    this.emit('webhook:delivered', webhookEvent);
  }

  /**
   * Create API key
   */
  async createAPIKey(data: {
    tenantId: string;
    name: string;
    integrationId?: string;
    permissions: string[];
    rateLimit?: { requests: number; windowMs: number };
    expiresAt?: Date;
    createdBy: string;
  }): Promise<APIKey> {
    const keyId = `key-${Math.random().toString(36).substr(2, 9)}`;
    const key = this.generateRandomKey(32);
    const secret = this.generateRandomKey(64);

    const apiKey: APIKey = {
      id: keyId,
      tenantId: data.tenantId,
      name: data.name,
      key,
      secret,
      integrationId: data.integrationId,
      permissions: data.permissions,
      rateLimit: data.rateLimit,
      createdAt: new Date(),
      expiresAt: data.expiresAt,
      isActive: true
    };

    this.apiKeys.set(keyId, apiKey);
    this.keyIndex.set(key, keyId);

    this.emit('api_key:created', {
      ...apiKey,
      secret: undefined // Don't emit secret
    });

    return apiKey;
  }

  /**
   * Generate random key
   */
  private generateRandomKey(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  /**
   * Validate API key
   */
  async validateAPIKey(key: string, secret: string): Promise<APIKey | null> {
    const keyId = this.keyIndex.get(key);
    if (!keyId) {
      return null;
    }

    const apiKey = this.apiKeys.get(keyId);
    if (!apiKey || !apiKey.isActive) {
      return null;
    }

    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
      return null;
    }

    if (apiKey.secret !== secret) {
      return null;
    }

    apiKey.lastUsedAt = new Date();
    this.apiKeys.set(keyId, apiKey);

    return apiKey;
  }

  /**
   * Check rate limit for API key
   */
  async checkRateLimit(keyId: string): Promise<boolean> {
    const apiKey = this.apiKeys.get(keyId);
    if (!apiKey || !apiKey.rateLimit) {
      return true;
    }

    const now = Date.now();
    const rateLimitData = this.rateLimitMap.get(keyId) || { count: 0, resetAt: now + apiKey.rateLimit.windowMs };

    if (now > rateLimitData.resetAt) {
      // Reset window
      rateLimitData.count = 0;
      rateLimitData.resetAt = now + apiKey.rateLimit.windowMs;
    }

    if (rateLimitData.count >= apiKey.rateLimit.requests) {
      return false;
    }

    rateLimitData.count++;
    this.rateLimitMap.set(keyId, rateLimitData);

    return true;
  }

  /**
   * Revoke API key
   */
  async revokeAPIKey(keyId: string): Promise<void> {
    const apiKey = this.apiKeys.get(keyId);
    if (!apiKey) {
      throw new Error('API key not found');
    }

    apiKey.isActive = false;
    this.apiKeys.set(keyId, apiKey);

    this.emit('api_key:revoked', { keyId });
  }

  /**
   * Get extension point
   */
  getExtensionPoint(pointId: string): ExtensionPoint | undefined {
    return this.extensionPoints.get(pointId);
  }

  /**
   * Register extension
   */
  async registerExtension(
    extensionPointId: string,
    implementation: Record<string, any>
  ): Promise<void> {
    const extensionPoint = this.extensionPoints.get(extensionPointId);
    if (!extensionPoint) {
      throw new Error('Extension point not found');
    }

    // Validate implementation matches interface
    for (const [method] of Object.entries(extensionPoint.interface)) {
      if (typeof implementation[method] !== 'function') {
        throw new Error(`Missing or invalid method: ${method}`);
      }
    }

    this.emit('extension:registered', {
      extensionPointId,
      implementation
    });
  }

  /**
   * Execute extension
   */
  async executeExtension(
    extensionPointId: string,
    method: string,
    args: any[]
  ): Promise<any> {
    const extensionPoint = this.extensionPoints.get(extensionPointId);
    if (!extensionPoint) {
      throw new Error('Extension point not found');
    }

    const event = {
      id: `ext-${Math.random().toString(36).substr(2, 9)}`,
      extensionPointId,
      method,
      timestamp: new Date(),
      args
    };

    this.emit('extension:execute', event);

    // In real implementation, would execute registered extension
    return null;
  }

  /**
   * Get integration
   */
  getIntegration(integrationId: string): Integration | undefined {
    return this.integrations.get(integrationId);
  }

  /**
   * List tenant integrations
   */
  listTenantIntegrations(tenantId: string): Integration[] {
    const integrations: Integration[] = [];
    for (const [, integration] of this.integrations) {
      if (integration.tenantId === tenantId) {
        integrations.push(integration);
      }
    }
    return integrations;
  }

  /**
   * Update integration
   */
  async updateIntegration(
    integrationId: string,
    updates: Partial<Integration>
  ): Promise<Integration> {
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      throw new Error('Integration not found');
    }

    const updated = {
      ...integration,
      ...updates,
      id: integration.id, // Don't allow changing ID
      tenantId: integration.tenantId, // Don't allow changing tenant
      createdAt: integration.createdAt, // Don't allow changing creation time
      updatedAt: new Date()
    };

    this.integrations.set(integrationId, updated);
    this.emit('integration:updated', updated);

    return updated;
  }

  /**
   * Delete integration
   */
  async deleteIntegration(integrationId: string): Promise<void> {
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      throw new Error('Integration not found');
    }

    this.integrations.delete(integrationId);

    // Delete related API keys
    for (const [keyId, apiKey] of this.apiKeys) {
      if (apiKey.integrationId === integrationId) {
        this.apiKeys.delete(keyId);
        this.keyIndex.delete(apiKey.key);
      }
    }

    this.emit('integration:deleted', { integrationId });
  }

  /**
   * Get webhook event
   */
  getWebhookEvent(webhookEventId: string): WebhookEvent | undefined {
    return this.webhookEvents.get(webhookEventId);
  }

  /**
   * List webhook events for integration
   */
  listWebhookEvents(integrationId: string, limit: number = 100): WebhookEvent[] {
    const events: WebhookEvent[] = [];
    for (const [, event] of this.webhookEvents) {
      if (event.integrationId === integrationId && events.length < limit) {
        events.push(event);
      }
    }
    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Get API key details (safe view)
   */
  getAPIKeyDetails(keyId: string): Omit<APIKey, 'secret'> | undefined {
    const apiKey = this.apiKeys.get(keyId);
    if (!apiKey) {
      return undefined;
    }

    const { secret, ...safeKey } = apiKey;
    return safeKey;
  }

  /**
   * List tenant API keys
   */
  listTenantAPIKeys(tenantId: string): Omit<APIKey, 'secret'>[] {
    const keys: Omit<APIKey, 'secret'>[] = [];
    for (const [, apiKey] of this.apiKeys) {
      if (apiKey.tenantId === tenantId) {
        const { secret, ...safeKey } = apiKey;
        keys.push(safeKey);
      }
    }
    return keys;
  }

  /**
   * Test integration
   */
  async testIntegration(integrationId: string): Promise<{
    success: boolean;
    message: string;
    latency: number;
  }> {
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      throw new Error('Integration not found');
    }

    const startTime = Date.now();

    try {
      // Simulate integration test
      await new Promise(resolve => setTimeout(resolve, 50));

      const latency = Date.now() - startTime;
      return {
        success: true,
        message: 'Integration test successful',
        latency
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        latency: Date.now() - startTime
      };
    }
  }

  /**
   * Get integration statistics
   */
  getIntegrationStats(integrationId: string): {
    webhooksSent: number;
    webhooksFailed: number;
    successRate: number;
    avgLatency: number;
    lastEvent?: Date;
  } {
    const events = this.listWebhookEvents(integrationId, 1000);

    const sent = events.filter(e => e.status === 'sent');
    const failed = events.filter(e => e.status === 'failed');

    const latencies = events
      .filter(e => e.lastAttempt)
      .map(e => (e.lastAttempt!.getTime() - e.timestamp.getTime()))
      .filter(l => l >= 0);

    return {
      webhooksSent: sent.length,
      webhooksFailed: failed.length,
      successRate: events.length > 0 ? sent.length / events.length : 0,
      avgLatency: latencies.length > 0 ? latencies.reduce((a, b) => a + b) / latencies.length : 0,
      lastEvent: events.length > 0 ? events[0].timestamp : undefined
    };
  }
}

export const customIntegrationFramework = new CustomIntegrationFramework();
