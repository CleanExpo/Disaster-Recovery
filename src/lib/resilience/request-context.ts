'use server';

/**
 * Request Context Service
 *
 * Manages request-scoped data for error handling and resilience
 * - Correlation IDs for distributed tracing
 * - Timeout management
 * - Resource cleanup
 * - Context propagation across async calls
 */

export interface RequestContext {
  correlationId: string;
  userId?: string;
  requestPath: string;
  method: string;
  startTime: Date;
  timeout: number;
  retryCount: number;
  metadata: Map<string, any>;
}

class RequestContextService {
  private contexts = new Map<string, RequestContext>();
  private contextStack: RequestContext[] = [];

  /**
   * Create new request context
   */
  createContext(
    method: string,
    path: string,
    timeout: number = 30000,
    userId?: string
  ): RequestContext {
    const correlationId = this.generateCorrelationId();

    const context: RequestContext = {
      correlationId,
      userId,
      requestPath: path,
      method,
      startTime: new Date(),
      timeout,
      retryCount: 0,
      metadata: new Map(),
    };

    this.contexts.set(correlationId, context);

    return context;
  }

  /**
   * Get current context
   */
  getCurrentContext(): RequestContext | null {
    return this.contextStack[this.contextStack.length - 1] || null;
  }

  /**
   * Get context by correlation ID
   */
  getContext(correlationId: string): RequestContext | null {
    return this.contexts.get(correlationId) || null;
  }

  /**
   * Push context to stack
   */
  pushContext(context: RequestContext): void {
    this.contextStack.push(context);
  }

  /**
   * Pop context from stack
   */
  popContext(): RequestContext | undefined {
    return this.contextStack.pop();
  }

  /**
   * Set context metadata
   */
  setMetadata(key: string, value: any): void {
    const context = this.getCurrentContext();
    if (context) {
      context.metadata.set(key, value);
    }
  }

  /**
   * Get context metadata
   */
  getMetadata(key: string): any {
    const context = this.getCurrentContext();
    return context?.metadata.get(key) || null;
  }

  /**
   * Increment retry count
   */
  incrementRetryCount(): void {
    const context = this.getCurrentContext();
    if (context) {
      context.retryCount++;
    }
  }

  /**
   * Check if context has timed out
   */
  hasTimedOut(): boolean {
    const context = this.getCurrentContext();
    if (!context) {
      return false;
    }

    const elapsed = Date.now() - context.startTime.getTime();
    return elapsed > context.timeout;
  }

  /**
   * Get remaining timeout
   */
  getRemainingTimeout(): number {
    const context = this.getCurrentContext();
    if (!context) {
      return 0;
    }

    const elapsed = Date.now() - context.startTime.getTime();
    return Math.max(0, context.timeout - elapsed);
  }

  /**
   * Get context duration
   */
  getDuration(): number {
    const context = this.getCurrentContext();
    if (!context) {
      return 0;
    }

    return Date.now() - context.startTime.getTime();
  }

  /**
   * Clean up context
   */
  cleanupContext(correlationId: string): void {
    this.contexts.delete(correlationId);
  }

  /**
   * Get context summary
   */
  getContextSummary(): {
    correlationId: string;
    duration: number;
    retries: number;
    timedOut: boolean;
    userId?: string;
  } | null {
    const context = this.getCurrentContext();
    if (!context) {
      return null;
    }

    return {
      correlationId: context.correlationId,
      duration: this.getDuration(),
      retries: context.retryCount,
      timedOut: this.hasTimedOut(),
      userId: context.userId,
    };
  }

  /**
   * Execute operation with context timeout
   */
  async executeWithTimeout<T>(operation: () => Promise<T>): Promise<T> {
    const context = this.getCurrentContext();
    if (!context) {
      return operation();
    }

    const timeout = this.getRemainingTimeout();

    if (timeout <= 0) {
      throw new Error('Request context timeout');
    }

    return Promise.race<T>([
      operation(),
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error('Operation timeout')), timeout)
      ),
    ]);
  }

  /**
   * Generate correlation ID
   */
  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get all active contexts
   */
  getActiveContexts(): RequestContext[] {
    return Array.from(this.contexts.values());
  }

  /**
   * Get context count
   */
  getContextCount(): number {
    return this.contexts.size;
  }

  /**
   * Clear all contexts
   */
  clearAllContexts(): void {
    this.contexts.clear();
    this.contextStack = [];
  }
}

// Export singleton instance
export const requestContext = new RequestContextService();
