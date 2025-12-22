/**
 * Performance Metrics Service
 *
 * Prometheus-compatible metrics collection for monitoring
 * - Response time histograms
 * - Request counters
 * - Error rates
 * - Custom business metrics
 */

interface MetricValue {
  value: number;
  timestamp: Date;
  labels?: Record<string, string>;
}

interface Histogram {
  name: string;
  buckets: number[];
  values: number[];
}

interface Counter {
  name: string;
  value: number;
  labels?: Record<string, string>;
}

interface Gauge {
  name: string;
  value: number;
  labels?: Record<string, string>;
}

class PerformanceMetricsCollector {
  private counters = new Map<string, number>();
  private gauges = new Map<string, number>();
  private histograms = new Map<string, number[]>();
  private labels = new Map<string, Record<string, string>>();

  /**
   * Increment a counter
   */
  incrementCounter(name: string, value: number = 1, labels?: Record<string, string>): void {
    const key = this.getLabelKey(name, labels);
    this.counters.set(key, (this.counters.get(key) || 0) + value);
    if (labels) this.labels.set(key, labels);
  }

  /**
   * Set gauge value
   */
  setGauge(name: string, value: number, labels?: Record<string, string>): void {
    const key = this.getLabelKey(name, labels);
    this.gauges.set(key, value);
    if (labels) this.labels.set(key, labels);
  }

  /**
   * Record histogram value
   */
  recordHistogram(name: string, value: number, labels?: Record<string, string>): void {
    const key = this.getLabelKey(name, labels);
    if (!this.histograms.has(key)) {
      this.histograms.set(key, []);
    }
    this.histograms.get(key)!.push(value);

    // Keep only last 1000 values
    const values = this.histograms.get(key)!;
    if (values.length > 1000) {
      values.shift();
    }

    if (labels) this.labels.set(key, labels);
  }

  /**
   * Get counter value
   */
  getCounter(name: string, labels?: Record<string, string>): number {
    const key = this.getLabelKey(name, labels);
    return this.counters.get(key) || 0;
  }

  /**
   * Get gauge value
   */
  getGauge(name: string, labels?: Record<string, string>): number {
    const key = this.getLabelKey(name, labels);
    return this.gauges.get(key) || 0;
  }

  /**
   * Get histogram statistics
   */
  getHistogramStats(name: string, labels?: Record<string, string>): {
    count: number;
    sum: number;
    mean: number;
    min: number;
    max: number;
    p50: number;
    p95: number;
    p99: number;
  } {
    const key = this.getLabelKey(name, labels);
    const values = this.histograms.get(key) || [];

    if (values.length === 0) {
      return { count: 0, sum: 0, mean: 0, min: 0, max: 0, p50: 0, p95: 0, p99: 0 };
    }

    const sorted = [...values].sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a + b, 0);
    const mean = sum / sorted.length;

    return {
      count: sorted.length,
      sum,
      mean,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p50: this.percentile(sorted, 50),
      p95: this.percentile(sorted, 95),
      p99: this.percentile(sorted, 99),
    };
  }

  /**
   * Export metrics in Prometheus format
   */
  exportPrometheus(): string {
    let output = '';

    // Export counters
    for (const [key, value] of this.counters) {
      const [name, labels] = this.parseKey(key);
      output += `# HELP ${name} Counter\n`;
      output += `# TYPE ${name} counter\n`;
      if (labels) {
        output += `${name}${labels} ${value}\n`;
      } else {
        output += `${name} ${value}\n`;
      }
    }

    // Export gauges
    for (const [key, value] of this.gauges) {
      const [name, labels] = this.parseKey(key);
      output += `# HELP ${name} Gauge\n`;
      output += `# TYPE ${name} gauge\n`;
      if (labels) {
        output += `${name}${labels} ${value}\n`;
      } else {
        output += `${name} ${value}\n`;
      }
    }

    // Export histograms
    for (const [key, values] of this.histograms) {
      const [name, labels] = this.parseKey(key);
      const stats = this.getHistogramStats(key);

      output += `# HELP ${name} Histogram\n`;
      output += `# TYPE ${name} histogram\n`;

      const buckets = [10, 50, 100, 250, 500, 1000, 2500, 5000];
      for (const bucket of buckets) {
        const count = values.filter((v) => v <= bucket).length;
        if (labels) {
          output += `${name}_bucket{le="${bucket}"${labels.substring(0, labels.length - 1)}} ${count}\n`;
        } else {
          output += `${name}_bucket{le="${bucket}"} ${count}\n`;
        }
      }

      if (labels) {
        output += `${name}_sum${labels} ${stats.sum}\n`;
        output += `${name}_count${labels} ${stats.count}\n`;
      } else {
        output += `${name}_sum ${stats.sum}\n`;
        output += `${name}_count ${stats.count}\n`;
      }
    }

    return output;
  }

  /**
   * Export metrics as JSON
   */
  exportJSON(): Record<string, any> {
    const metrics: Record<string, any> = {
      counters: {},
      gauges: {},
      histograms: {},
    };

    for (const [key, value] of this.counters) {
      const [name] = this.parseKey(key);
      metrics.counters[key] = { name, value };
    }

    for (const [key, value] of this.gauges) {
      const [name] = this.parseKey(key);
      metrics.gauges[key] = { name, value };
    }

    for (const [key] of this.histograms) {
      const [name] = this.parseKey(key);
      metrics.histograms[key] = { name, ...this.getHistogramStats(key) };
    }

    return metrics;
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.counters.clear();
    this.gauges.clear();
    this.histograms.clear();
    this.labels.clear();
  }

  /**
   * Helper: Create label key
   */
  private getLabelKey(
    name: string,
    labels?: Record<string, string>
  ): string {
    if (!labels || Object.keys(labels).length === 0) {
      return name;
    }

    const labelStr = Object.entries(labels)
      .map(([k, v]) => `${k}="${v}"`)
      .join(',');

    return `${name}{${labelStr}}`;
  }

  /**
   * Helper: Parse label key
   */
  private parseKey(key: string): [string, string | null] {
    const match = key.match(/^([^{]+)(\{.+\})?$/);
    if (!match) return [key, null];
    return [match[1], match[2] || null];
  }

  /**
   * Helper: Calculate percentile
   */
  private percentile(sorted: number[], p: number): number {
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
  }
}

// Global metrics instance
const metrics = new PerformanceMetricsCollector();

export class PerformanceMetrics {
  /**
   * Record API request
   */
  static recordAPIRequest(method: string, path: string, statusCode: number, duration: number) {
    metrics.incrementCounter('http_requests_total', 1, {
      method,
      path: this.normalizePath(path),
      status: String(statusCode),
    });

    metrics.recordHistogram('http_request_duration_ms', duration, {
      method,
      path: this.normalizePath(path),
    });
  }

  /**
   * Record database query
   */
  static recordDatabaseQuery(operation: string, duration: number, success: boolean) {
    metrics.incrementCounter('db_queries_total', 1, {
      operation,
      status: success ? 'success' : 'error',
    });

    metrics.recordHistogram('db_query_duration_ms', duration, {
      operation,
    });
  }

  /**
   * Record WebSocket event
   */
  static recordWebSocketEvent(event: string, success: boolean) {
    metrics.incrementCounter('websocket_events_total', 1, {
      event,
      status: success ? 'success' : 'error',
    });
  }

  /**
   * Record cache operation
   */
  static recordCacheOperation(operation: 'hit' | 'miss', key: string) {
    metrics.incrementCounter('cache_operations_total', 1, {
      operation,
    });

    if (operation === 'hit') {
      metrics.incrementCounter('cache_hits_total');
    } else {
      metrics.incrementCounter('cache_misses_total');
    }
  }

  /**
   * Record error
   */
  static recordError(type: string, code?: string) {
    metrics.incrementCounter('errors_total', 1, {
      type,
      code: code || 'unknown',
    });
  }

  /**
   * Set active connections
   */
  static setActiveConnections(count: number) {
    metrics.setGauge('active_connections', count);
  }

  /**
   * Set memory usage
   */
  static setMemoryUsage(bytes: number) {
    metrics.setGauge('memory_usage_bytes', bytes);
  }

  /**
   * Get Prometheus metrics
   */
  static getPrometheus(): string {
    return metrics.exportPrometheus();
  }

  /**
   * Get JSON metrics
   */
  static getJSON(): Record<string, any> {
    return metrics.exportJSON();
  }

  /**
   * Get metric summary
   */
  static getSummary() {
    return {
      requests: metrics.getCounter('http_requests_total'),
      errors: metrics.getCounter('errors_total'),
      activeConnections: metrics.getGauge('active_connections'),
      requestStats: metrics.getHistogramStats('http_request_duration_ms'),
      cacheHits: metrics.getCounter('cache_hits_total'),
      cacheMisses: metrics.getCounter('cache_misses_total'),
      cacheHitRate:
        metrics.getCounter('cache_hits_total') +
        metrics.getCounter('cache_misses_total') >
        0
          ? (
              (metrics.getCounter('cache_hits_total') /
                (metrics.getCounter('cache_hits_total') +
                  metrics.getCounter('cache_misses_total'))) *
              100
            ).toFixed(2)
          : '0',
    };
  }

  /**
   * Normalize path for metrics (remove IDs)
   */
  private static normalizePath(path: string): string {
    return path
      .replace(/\/[0-9a-f]{24}\//g, '/:id/')
      .replace(/\/[0-9a-f-]{36}\//g, '/:id/');
  }
}

export { PerformanceMetricsCollector };
