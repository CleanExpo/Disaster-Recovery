'use server';

import { prisma } from '@/lib/prisma';

/**
 * Graceful Degradation Service
 *
 * Provides fallback mechanisms when critical services fail
 * - Cache fallback when database is slow
 * - Read-only mode when database is unavailable
 * - In-memory queuing when message queue is down
 * - Partial functionality when external services fail
 */

export interface ServiceStatus {
  name: string;
  healthy: boolean;
  lastChecked: Date;
  downtime?: number; // milliseconds
}

export interface DegradationLevel {
  level: 'full' | 'degraded' | 'minimal';
  reason: string;
  disabledFeatures: string[];
  cacheEnabled: boolean;
  readOnlyMode: boolean;
  queuedOperations: number;
}

class GracefulDegradationService {
  private serviceStatuses = new Map<string, ServiceStatus>();
  private degradationLevel: DegradationLevel = {
    level: 'full',
    reason: 'All systems operational',
    disabledFeatures: [],
    cacheEnabled: false,
    readOnlyMode: false,
    queuedOperations: 0,
  };
  private queuedOperations: any[] = [];
  private lastHealthCheck = 0;
  private HEALTH_CHECK_INTERVAL = 30000; // 30 seconds

  /**
   * Initialize services as healthy
   */
  initializeServices(serviceNames: string[]): void {
    for (const name of serviceNames) {
      this.serviceStatuses.set(name, {
        name,
        healthy: true,
        lastChecked: new Date(),
      });
    }
  }

  /**
   * Mark a service as failed
   */
  markServiceDown(serviceName: string, downtime?: number): void {
    const now = new Date();
    this.serviceStatuses.set(serviceName, {
      name: serviceName,
      healthy: false,
      lastChecked: now,
      downtime,
    });

    this.updateDegradationLevel();
  }

  /**
   * Mark a service as recovered
   */
  markServiceUp(serviceName: string): void {
    const status = this.serviceStatuses.get(serviceName);
    if (status) {
      this.serviceStatuses.set(serviceName, {
        ...status,
        healthy: true,
        lastChecked: new Date(),
        downtime: undefined,
      });
    }

    this.updateDegradationLevel();
  }

  /**
   * Update degradation level based on service status
   */
  private updateDegradationLevel(): void {
    const statuses = Array.from(this.serviceStatuses.values());
    const unhealthyCount = statuses.filter((s) => !s.healthy).length;
    const totalServices = statuses.length;

    if (unhealthyCount === 0) {
      this.degradationLevel = {
        level: 'full',
        reason: 'All systems operational',
        disabledFeatures: [],
        cacheEnabled: false,
        readOnlyMode: false,
        queuedOperations: this.queuedOperations.length,
      };
    } else if (unhealthyCount <= Math.ceil(totalServices * 0.3)) {
      // 30% or less services down = degraded
      this.degradationLevel = {
        level: 'degraded',
        reason: `${unhealthyCount} service(s) unavailable`,
        disabledFeatures: this.getDisabledFeatures(statuses),
        cacheEnabled: true,
        readOnlyMode: false,
        queuedOperations: this.queuedOperations.length,
      };
    } else {
      // More than 30% down = minimal functionality
      this.degradationLevel = {
        level: 'minimal',
        reason: `${unhealthyCount}/${totalServices} services unavailable`,
        disabledFeatures: this.getDisabledFeatures(statuses),
        cacheEnabled: true,
        readOnlyMode: true,
        queuedOperations: this.queuedOperations.length,
      };
    }
  }

  /**
   * Get list of disabled features based on service status
   */
  private getDisabledFeatures(statuses: ServiceStatus[]): string[] {
    const features: string[] = [];

    const serviceMap = new Map(statuses.map((s) => [s.name, s.healthy]));

    if (!serviceMap.get('database')) {
      features.push('real-time-updates', 'persistence', 'user-operations');
    }

    if (!serviceMap.get('redis')) {
      features.push('caching', 'sessions', 'rate-limiting');
    }

    if (!serviceMap.get('socket-io')) {
      features.push('real-time-notifications', 'live-presence');
    }

    if (!serviceMap.get('message-queue')) {
      features.push('async-operations', 'email-notifications');
    }

    if (!serviceMap.get('file-storage')) {
      features.push('file-uploads', 'media-operations');
    }

    return features;
  }

  /**
   * Queue operation for retry when service is down
   */
  queueOperation(operation: {
    type: string;
    payload: any;
    priority: 'high' | 'normal' | 'low';
    createdAt: Date;
    retries: number;
  }): boolean {
    if (this.queuedOperations.length >= 10000) {
      console.error('Operation queue full, discarding operation');
      return false;
    }

    this.queuedOperations.push(operation);
    this.degradationLevel.queuedOperations = this.queuedOperations.length;

    return true;
  }

  /**
   * Process queued operations when service recovers
   */
  async processQueuedOperations(
    operationHandlers: Record<string, (payload: any) => Promise<void>>
  ): Promise<{ processed: number; failed: number }> {
    let processed = 0;
    let failed = 0;

    const remainingOps: any[] = [];

    for (const op of this.queuedOperations) {
      const handler = operationHandlers[op.type];

      if (!handler) {
        console.error(`No handler for operation type: ${op.type}`);
        failed++;
        continue;
      }

      try {
        await handler(op.payload);
        processed++;
      } catch (error) {
        console.error(`Failed to process operation: ${op.type}`, error);

        // Retry failed operations up to 3 times
        if (op.retries < 3) {
          op.retries++;
          remainingOps.push(op);
        } else {
          failed++;
        }
      }
    }

    this.queuedOperations = remainingOps;
    this.degradationLevel.queuedOperations = this.queuedOperations.length;

    return { processed, failed };
  }

  /**
   * Get current degradation level
   */
  getDegradationLevel(): DegradationLevel {
    return this.degradationLevel;
  }

  /**
   * Get all service statuses
   */
  getServiceStatuses(): ServiceStatus[] {
    return Array.from(this.serviceStatuses.values());
  }

  /**
   * Check if a feature is available
   */
  isFeatureAvailable(feature: string): boolean {
    return !this.degradationLevel.disabledFeatures.includes(feature);
  }

  /**
   * Get fallback data from cache or database
   */
  async getFallbackData(key: string, fallbackFn: () => Promise<any>): Promise<any> {
    try {
      // Try primary data source
      return await fallbackFn();
    } catch (error) {
      if (this.degradationLevel.cacheEnabled) {
        console.warn(`Falling back to cache for key: ${key}`);
        // In production, retrieve from cache here
        return null;
      }

      throw error;
    }
  }

  /**
   * Get system health report
   */
  getHealthReport() {
    const statuses = this.getServiceStatuses();
    const healthyCount = statuses.filter((s) => s.healthy).length;

    return {
      timestamp: new Date(),
      degradationLevel: this.degradationLevel,
      services: statuses,
      summary: {
        total: statuses.length,
        healthy: healthyCount,
        unhealthy: statuses.length - healthyCount,
        healthPercentage: Math.round((healthyCount / statuses.length) * 100),
      },
      queuedOperations: this.queuedOperations.length,
      maxQueuedOperations: 10000,
    };
  }
}

// Export singleton instance
export const gracefulDegradation = new GracefulDegradationService();
