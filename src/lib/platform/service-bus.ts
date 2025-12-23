/**
 * Service Communication Bus
 *
 * Central event-driven communication layer for cross-service interaction
 * Enables loose coupling between all platform services
 */

import { EventEmitter } from 'events';

export type ServiceEvent =
  | 'message:created' | 'message:updated' | 'message:deleted'
  | 'user:created' | 'user:updated' | 'user:deleted'
  | 'room:created' | 'room:updated' | 'room:deleted'
  | 'call:started' | 'call:ended' | 'call:failed'
  | 'file:uploaded' | 'file:processed' | 'file:deleted'
  | 'analytics:event' | 'analytics:metric' | 'analytics:report'
  | 'alert:triggered' | 'alert:acknowledged' | 'alert:resolved'
  | 'deployment:started' | 'deployment:completed' | 'deployment:failed' | 'deployment:rolled_back'
  | 'health:check' | 'health:degraded' | 'health:critical'
  | 'security:access_denied' | 'security:audit_event'
  | 'system:error' | 'system:warning' | 'system:info';

export interface ServiceMessage {
  id: string;
  type: ServiceEvent;
  timestamp: number;
  source: string; // Service that emitted event
  payload: any;
  metadata?: {
    userId?: string;
    roomId?: string;
    correlationId?: string;
    priority?: 'low' | 'normal' | 'high' | 'critical';
    retryCount?: number;
  };
}

export interface ServiceSubscription {
  id: string;
  service: string;
  eventType: ServiceEvent | ServiceEvent[];
  handler: (message: ServiceMessage) => Promise<void>;
  active: boolean;
}

export interface ServiceCircuitBreaker {
  service: string;
  state: 'closed' | 'open' | 'half-open';
  failureCount: number;
  lastFailureTime?: number;
  successCount: number;
}

export class ServiceBus extends EventEmitter {
  private subscriptions: Map<string, ServiceSubscription> = new Map();
  private messageHistory: ServiceMessage[] = [];
  private circuitBreakers: Map<string, ServiceCircuitBreaker> = new Map();
  private deadLetterQueue: ServiceMessage[] = [];
  private maxMessageHistory = 10000;
  private maxDLQSize = 1000;
  private failureThreshold = 5;
  private recoveryTimeout = 60000; // 1 minute

  constructor() {
    super();
    this.initializeDefaultCircuitBreakers();
  }

  /**
   * Initialize circuit breakers for all services
   */
  private initializeDefaultCircuitBreakers() {
    const services = [
      'messaging', 'search', 'communication', 'media', 'analytics',
      'ai', 'reporting', 'predictive', 'security', 'deployment'
    ];

    services.forEach(service => {
      this.circuitBreakers.set(service, {
        service,
        state: 'closed',
        failureCount: 0,
        successCount: 0
      });
    });
  }

  /**
   * Publish event to service bus
   */
  async publishEvent(message: Omit<ServiceMessage, 'id' | 'timestamp'>): Promise<string> {
    const eventMessage: ServiceMessage = {
      ...message,
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    // Store message
    this.messageHistory.push(eventMessage);
    if (this.messageHistory.length > this.maxMessageHistory) {
      this.messageHistory.shift();
    }

    // Check circuit breaker
    const cb = this.circuitBreakers.get(message.source);
    if (cb && cb.state === 'open') {
      this.addToDeadLetterQueue(eventMessage, 'Circuit breaker open');
      this.emit('bus:message_rejected', eventMessage);
      return eventMessage.id;
    }

    // Publish to subscribers
    try {
      const relevantSubs = Array.from(this.subscriptions.values()).filter(
        sub =>
          sub.active &&
          (Array.isArray(sub.eventType) ? sub.eventType.includes(message.type) : sub.eventType === message.type) &&
          sub.service !== message.source // Don't send to source service
      );

      const results = await Promise.allSettled(
        relevantSubs.map(sub => this.executeSubscription(sub, eventMessage))
      );

      // Track success/failure for circuit breaker
      if (cb) {
        const failureCount = results.filter(r => r.status === 'rejected').length;
        if (failureCount > 0) {
          cb.failureCount++;
          cb.lastFailureTime = Date.now();
          if (cb.failureCount >= this.failureThreshold) {
            cb.state = 'open';
            this.emit('bus:circuit_breaker_opened', { service: message.source });
          }
        } else {
          cb.successCount++;
          if (cb.successCount >= 3 && cb.state === 'half-open') {
            cb.state = 'closed';
            cb.failureCount = 0;
            cb.successCount = 0;
            this.emit('bus:circuit_breaker_closed', { service: message.source });
          }
        }
      }

      this.emit('bus:message_published', eventMessage);
    } catch (error: any) {
      this.addToDeadLetterQueue(eventMessage, error.message);
      this.emit('bus:message_failed', { message: eventMessage, error });
    }

    return eventMessage.id;
  }

  /**
   * Subscribe to events
   */
  subscribe(
    service: string,
    eventType: ServiceEvent | ServiceEvent[],
    handler: (message: ServiceMessage) => Promise<void>
  ): string {
    const subscriptionId = `sub_${service}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const subscription: ServiceSubscription = {
      id: subscriptionId,
      service,
      eventType,
      handler,
      active: true
    };

    this.subscriptions.set(subscriptionId, subscription);
    this.emit('bus:subscription_created', { subscriptionId, service, eventType });

    return subscriptionId;
  }

  /**
   * Unsubscribe from events
   */
  unsubscribe(subscriptionId: string): boolean {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription) return false;

    this.subscriptions.delete(subscriptionId);
    this.emit('bus:subscription_deleted', { subscriptionId });
    return true;
  }

  /**
   * Execute subscription handler with error handling
   */
  private async executeSubscription(
    subscription: ServiceSubscription,
    message: ServiceMessage
  ): Promise<void> {
    try {
      await subscription.handler(message);
    } catch (error: any) {
      const cb = this.circuitBreakers.get(subscription.service);
      if (cb) {
        cb.failureCount++;
        if (cb.failureCount >= this.failureThreshold) {
          cb.state = 'open';
          this.emit('bus:circuit_breaker_opened', { service: subscription.service });
        }
      }

      throw error;
    }
  }

  /**
   * Add message to dead letter queue
   */
  private addToDeadLetterQueue(message: ServiceMessage, reason: string) {
    this.deadLetterQueue.push(message);
    if (this.deadLetterQueue.length > this.maxDLQSize) {
      this.deadLetterQueue.shift();
    }

    this.emit('bus:dlq_added', { messageId: message.id, reason });
  }

  /**
   * Get circuit breaker status
   */
  getCircuitBreakerStatus(service?: string) {
    if (service) {
      return this.circuitBreakers.get(service) || null;
    }

    return Array.from(this.circuitBreakers.values());
  }

  /**
   * Attempt to recover circuit breaker
   */
  attemptRecovery(service: string): boolean {
    const cb = this.circuitBreakers.get(service);
    if (!cb || cb.state !== 'open') return false;

    cb.state = 'half-open';
    cb.failureCount = 0;
    cb.successCount = 0;

    // Auto-close after timeout if no failures
    setTimeout(() => {
      const current = this.circuitBreakers.get(service);
      if (current && current.state === 'half-open' && current.failureCount === 0) {
        current.state = 'closed';
        this.emit('bus:circuit_breaker_closed', { service });
      }
    }, this.recoveryTimeout);

    this.emit('bus:circuit_breaker_recovery_started', { service });
    return true;
  }

  /**
   * Get message history
   */
  getMessageHistory(filters?: {
    type?: ServiceEvent;
    source?: string;
    since?: number;
    limit?: number;
  }): ServiceMessage[] {
    let history = [...this.messageHistory];

    if (filters?.type) {
      history = history.filter(m => m.type === filters.type);
    }
    if (filters?.source) {
      history = history.filter(m => m.source === filters.source);
    }
    if (filters?.since) {
      history = history.filter(m => m.timestamp >= filters.since!);
    }

    const limit = filters?.limit || 100;
    return history.slice(-limit);
  }

  /**
   * Get dead letter queue messages
   */
  getDeadLetterQueue(limit: number = 100): ServiceMessage[] {
    return this.deadLetterQueue.slice(-limit);
  }

  /**
   * Retry message from dead letter queue
   */
  async retryDeadLetterMessage(messageId: string): Promise<boolean> {
    const index = this.deadLetterQueue.findIndex(m => m.id === messageId);
    if (index === -1) return false;

    const message = this.deadLetterQueue[index];
    this.deadLetterQueue.splice(index, 1);

    try {
      await this.publishEvent({
        type: message.type,
        source: message.source,
        payload: message.payload,
        metadata: {
          ...message.metadata,
          retryCount: (message.metadata?.retryCount || 0) + 1
        }
      });
      return true;
    } catch (error) {
      this.addToDeadLetterQueue(message, 'Retry failed');
      return false;
    }
  }

  /**
   * Get service bus statistics
   */
  getStatistics() {
    const eventCounts: Record<ServiceEvent, number> = {} as any;
    const sourceCounts: Record<string, number> = {};

    this.messageHistory.forEach(msg => {
      eventCounts[msg.type] = (eventCounts[msg.type] || 0) + 1;
      sourceCounts[msg.source] = (sourceCounts[msg.source] || 0) + 1;
    });

    const circuitBreakerStatus = Array.from(this.circuitBreakers.values()).reduce(
      (acc, cb) => {
        acc[cb.state] = (acc[cb.state] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      totalMessages: this.messageHistory.length,
      subscriptionCount: this.subscriptions.size,
      activeSubscriptions: Array.from(this.subscriptions.values()).filter(s => s.active).length,
      eventCounts,
      sourceCounts,
      circuitBreakers: Array.from(this.circuitBreakers.values()),
      circuitBreakerStatus,
      deadLetterQueueSize: this.deadLetterQueue.length,
      timestamp: Date.now()
    };
  }

  /**
   * Clear message history (for maintenance)
   */
  clearMessageHistory(): void {
    this.messageHistory = [];
    this.emit('bus:history_cleared');
  }

  /**
   * Clear dead letter queue (for maintenance)
   */
  clearDeadLetterQueue(): void {
    this.deadLetterQueue = [];
    this.emit('bus:dlq_cleared');
  }
}

// Export singleton instance
export const serviceBus = new ServiceBus();
