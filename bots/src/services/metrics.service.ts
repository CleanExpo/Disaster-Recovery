/**
 * Metrics Service - Performance and Usage Tracking
 */

import { PrismaClient } from '@prisma/client';

export class MetricsService {
  private metrics: Map<string, any> = new Map();
  private intervals: NodeJS.Timeout[] = [];
  
  constructor(private prisma: PrismaClient) {}
  
  // Start collecting metrics
  startCollection(): void {
    // Collect metrics every minute
    const interval = setInterval(() => {
      this.collectAndStore();
    }, 60000);
    
    this.intervals.push(interval);
    
    console.log('✅ Metrics collection started');
  }
  
  // Stop collection
  stopCollection(): void {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
    console.log('Metrics collection stopped');
  }
  
  // Record request
  recordRequest(method: string, path: string, duration: number): void {
    const key = `request:${method}:${path}`;
    
    if (!this.metrics.has(key)) {
      this.metrics.set(key, {
        count: 0,
        totalDuration: 0,
        avgDuration: 0,
        minDuration: Infinity,
        maxDuration: 0
      });
    }
    
    const metric = this.metrics.get(key);
    metric.count++;
    metric.totalDuration += duration;
    metric.avgDuration = metric.totalDuration / metric.count;
    metric.minDuration = Math.min(metric.minDuration, duration);
    metric.maxDuration = Math.max(metric.maxDuration, duration);
  }
  
  // Record error
  recordError(type: string, message?: string): void {
    const key = `error:${type}`;
    
    if (!this.metrics.has(key)) {
      this.metrics.set(key, {
        count: 0,
        messages: []
      });
    }
    
    const metric = this.metrics.get(key);
    metric.count++;
    
    if (message && metric.messages.length < 100) {
      metric.messages.push({
        message,
        timestamp: new Date()
      });
    }
  }
  
  // Record WebSocket event
  recordWebSocketEvent(event: string): void {
    const key = `ws:${event}`;
    
    if (!this.metrics.has(key)) {
      this.metrics.set(key, 0);
    }
    
    this.metrics.set(key, this.metrics.get(key) + 1);
  }
  
  // Record queue event
  recordQueueEvent(queue: string, event: string): void {
    const key = `queue:${queue}:${event}`;
    
    if (!this.metrics.has(key)) {
      this.metrics.set(key, 0);
    }
    
    this.metrics.set(key, this.metrics.get(key) + 1);
  }
  
  // Record cache hit/miss
  recordCacheEvent(hit: boolean): void {
    const key = hit ? 'cache:hit' : 'cache:miss';
    
    if (!this.metrics.has(key)) {
      this.metrics.set(key, 0);
    }
    
    this.metrics.set(key, this.metrics.get(key) + 1);
  }
  
  // Get current metrics
  getCurrentMetrics(): any {
    const metrics: any = {
      requests: {},
      errors: {},
      websocket: {},
      queue: {},
      cache: {},
      timestamp: new Date()
    };
    
    this.metrics.forEach((value, key) => {
      const [category, ...parts] = key.split(':');
      
      switch (category) {
        case 'request':
          const [method, ...pathParts] = parts;
          const path = pathParts.join(':');
          if (!metrics.requests[method]) {
            metrics.requests[method] = {};
          }
          metrics.requests[method][path] = value;
          break;
          
        case 'error':
          metrics.errors[parts.join(':')] = value;
          break;
          
        case 'ws':
          metrics.websocket[parts.join(':')] = value;
          break;
          
        case 'queue':
          const [queueName, event] = parts;
          if (!metrics.queue[queueName]) {
            metrics.queue[queueName] = {};
          }
          metrics.queue[queueName][event] = value;
          break;
          
        case 'cache':
          metrics.cache[parts.join(':')] = value;
          break;
      }
    });
    
    // Calculate cache hit rate
    const cacheHits = this.metrics.get('cache:hit') || 0;
    const cacheMisses = this.metrics.get('cache:miss') || 0;
    const totalCache = cacheHits + cacheMisses;
    
    if (totalCache > 0) {
      metrics.cache.hitRate = (cacheHits / totalCache) * 100;
    }
    
    return metrics;
  }
  
  // Collect and store in database
  private async collectAndStore(): Promise<void> {
    try {
      const current = this.getCurrentMetrics();
      
      // Calculate aggregated metrics
      let totalRequests = 0;
      let totalResponseTime = 0;
      let requestCount = 0;
      
      Object.values(current.requests).forEach((methods: any) => {
        Object.values(methods).forEach((metric: any) => {
          totalRequests += metric.count;
          totalResponseTime += metric.totalDuration;
          requestCount += metric.count;
        });
      });
      
      const avgResponseTime = requestCount > 0 ? totalResponseTime / requestCount : 0;
      
      // Count errors
      let totalErrors = 0;
      let validationErrors = 0;
      let systemErrors = 0;
      
      Object.entries(current.errors).forEach(([type, data]: [string, any]) => {
        totalErrors += data.count;
        
        if (type.includes('validation')) {
          validationErrors += data.count;
        } else {
          systemErrors += data.count;
        }
      });
      
      // Count WebSocket events
      const messagesProcessed = (current.websocket.client_message || 0) + 
                               (current.websocket.contractor_update || 0);
      
      // Store in database
      await this.prisma.botMetrics.create({
        data: {
          date: new Date(),
          totalRequests,
          avgResponseTime,
          successRate: totalErrors > 0 ? ((totalRequests - totalErrors) / totalRequests) * 100 : 100,
          messagesProcessed,
          totalErrors,
          validationErrors,
          systemErrors,
          webRequests: current.websocket.web || 0,
          smsRequests: current.websocket.sms || 0,
          whatsappRequests: current.websocket.whatsapp || 0,
          emailRequests: current.websocket.email || 0
        }
      });
      
      // Reset metrics after storing
      this.resetMetrics();
      
    } catch (error) {
      console.error('Failed to store metrics:', error);
    }
  }
  
  // Reset metrics
  private resetMetrics(): void {
    // Keep only essential metrics, reset counters
    const essentialKeys = ['cache:hit', 'cache:miss'];
    
    this.metrics.forEach((value, key) => {
      if (!essentialKeys.includes(key)) {
        this.metrics.delete(key);
      } else {
        this.metrics.set(key, 0);
      }
    });
  }
  
  // Get system health
  async getSystemHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    metrics: any;
    alerts: string[];
  }> {
    const metrics = this.getCurrentMetrics();
    const alerts: string[] = [];
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    
    // Check error rate
    const errorRate = this.calculateErrorRate();
    if (errorRate > 5) {
      alerts.push(`High error rate: ${errorRate.toFixed(2)}%`);
      status = 'degraded';
    }
    if (errorRate > 10) {
      status = 'unhealthy';
    }
    
    // Check response times
    const avgResponseTime = this.calculateAvgResponseTime();
    if (avgResponseTime > 1000) {
      alerts.push(`Slow response times: ${avgResponseTime.toFixed(0)}ms`);
      status = status === 'unhealthy' ? 'unhealthy' : 'degraded';
    }
    
    // Check cache hit rate
    const cacheHitRate = metrics.cache.hitRate || 0;
    if (cacheHitRate < 50) {
      alerts.push(`Low cache hit rate: ${cacheHitRate.toFixed(2)}%`);
    }
    
    return {
      status,
      metrics: {
        errorRate,
        avgResponseTime,
        cacheHitRate
      },
      alerts
    };
  }
  
  private calculateErrorRate(): number {
    let totalRequests = 0;
    let totalErrors = 0;
    
    this.metrics.forEach((value, key) => {
      if (key.startsWith('request:')) {
        totalRequests += value.count;
      } else if (key.startsWith('error:')) {
        totalErrors += value.count;
      }
    });
    
    return totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;
  }
  
  private calculateAvgResponseTime(): number {
    let totalDuration = 0;
    let totalCount = 0;
    
    this.metrics.forEach((value, key) => {
      if (key.startsWith('request:')) {
        totalDuration += value.totalDuration;
        totalCount += value.count;
      }
    });
    
    return totalCount > 0 ? totalDuration / totalCount : 0;
  }
}