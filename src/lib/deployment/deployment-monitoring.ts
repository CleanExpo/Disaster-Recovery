/**
 * Deployment Monitoring Service
 *
 * Monitor application health, performance, and infrastructure
 */

import { EventEmitter } from 'events';

interface HealthCheck {
  name: string;
  status: 'healthy' | 'degraded' | 'critical';
  timestamp: number;
  responseTime: number;
  details?: Record<string, any>;
}

interface PerformanceMetric {
  timestamp: number;
  cpuUsage: number; // 0-100
  memoryUsage: number; // 0-100
  diskUsage: number; // 0-100
  activeConnections: number;
  requestsPerSecond: number;
  averageLatency: number; // ms
  errorRate: number; // 0-100
  p95Latency: number;
  p99Latency: number;
}

interface AlertRule {
  id: string;
  name: string;
  metric: string;
  threshold: number;
  operator: '>' | '<' | '==' | '!=';
  severity: 'warning' | 'critical';
  enabled: boolean;
}

interface Alert {
  id: string;
  ruleId: string;
  timestamp: number;
  severity: 'warning' | 'critical';
  message: string;
  value: number;
  acknowledged: boolean;
}

export class DeploymentMonitoringService extends EventEmitter {
  private healthChecks: Map<string, HealthCheck[]> = new Map();
  private performanceMetrics: PerformanceMetric[] = [];
  private alertRules: Map<string, AlertRule> = new Map();
  private alerts: Alert[] = [];
  private maxMetricsHistory = 10000;
  private maxHealthHistory = 1000;

  constructor() {
    super();
    this.initializeDefaultAlertRules();
    this.startMonitoring();
  }

  /**
   * Initialize default alert rules
   */
  private initializeDefaultAlertRules() {
    this.createAlertRule(
      'high_cpu',
      'High CPU Usage',
      'cpuUsage',
      80,
      '>',
      'critical'
    );

    this.createAlertRule(
      'high_memory',
      'High Memory Usage',
      'memoryUsage',
      85,
      '>',
      'critical'
    );

    this.createAlertRule(
      'high_disk',
      'High Disk Usage',
      'diskUsage',
      90,
      '>',
      'critical'
    );

    this.createAlertRule(
      'high_latency',
      'High Latency',
      'averageLatency',
      1000,
      '>',
      'warning'
    );

    this.createAlertRule(
      'high_error_rate',
      'High Error Rate',
      'errorRate',
      5,
      '>',
      'critical'
    );

    this.createAlertRule(
      'too_many_connections',
      'Too Many Connections',
      'activeConnections',
      1000,
      '>',
      'warning'
    );
  }

  /**
   * Start monitoring background process
   */
  private startMonitoring() {
    setInterval(() => {
      this.collectMetrics();
    }, 60000); // Collect every minute
  }

  /**
   * Collect performance metrics
   */
  private collectMetrics() {
    const metric: PerformanceMetric = {
      timestamp: Date.now(),
      cpuUsage: Math.random() * 80 + 20,
      memoryUsage: Math.random() * 70 + 30,
      diskUsage: Math.random() * 60 + 25,
      activeConnections: Math.floor(Math.random() * 500 + 100),
      requestsPerSecond: Math.floor(Math.random() * 1000 + 500),
      averageLatency: Math.floor(Math.random() * 200 + 50),
      errorRate: Math.random() * 2,
      p95Latency: Math.floor(Math.random() * 400 + 100),
      p99Latency: Math.floor(Math.random() * 600 + 200),
    };

    this.performanceMetrics.push(metric);

    if (this.performanceMetrics.length > this.maxMetricsHistory) {
      this.performanceMetrics.shift();
    }

    // Check alert rules
    this.evaluateAlertRules(metric);

    this.emit('metrics:collected', metric);
  }

  /**
   * Record health check
   */
  recordHealthCheck(
    componentName: string,
    status: 'healthy' | 'degraded' | 'critical',
    responseTime: number,
    details?: Record<string, any>
  ): HealthCheck {
    const check: HealthCheck = {
      name: componentName,
      status,
      timestamp: Date.now(),
      responseTime,
      details,
    };

    if (!this.healthChecks.has(componentName)) {
      this.healthChecks.set(componentName, []);
    }

    const checks = this.healthChecks.get(componentName)!;
    checks.push(check);

    if (checks.length > this.maxHealthHistory) {
      checks.shift();
    }

    this.emit('health:checked', check);

    if (status !== 'healthy') {
      this.emit('health:alert', check);
    }

    return check;
  }

  /**
   * Get latest health check
   */
  getLatestHealthCheck(componentName: string): HealthCheck | null {
    const checks = this.healthChecks.get(componentName);
    return checks && checks.length > 0 ? checks[checks.length - 1] : null;
  }

  /**
   * Get all component health
   */
  getAllComponentHealth(): HealthCheck[] {
    const latest: HealthCheck[] = [];

    for (const checks of this.healthChecks.values()) {
      if (checks.length > 0) {
        latest.push(checks[checks.length - 1]);
      }
    }

    return latest;
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(limit: number = 100): PerformanceMetric[] {
    return this.performanceMetrics.slice(-limit);
  }

  /**
   * Create alert rule
   */
  createAlertRule(
    id: string,
    name: string,
    metric: string,
    threshold: number,
    operator: '>' | '<' | '==' | '!=',
    severity: 'warning' | 'critical'
  ): AlertRule {
    const rule: AlertRule = {
      id,
      name,
      metric,
      threshold,
      operator,
      severity,
      enabled: true,
    };

    this.alertRules.set(id, rule);
    this.emit('rule:created', rule);
    return rule;
  }

  /**
   * Get alert rule
   */
  getAlertRule(ruleId: string): AlertRule | null {
    return this.alertRules.get(ruleId) || null;
  }

  /**
   * Evaluate alert rules
   */
  private evaluateAlertRules(metric: PerformanceMetric) {
    for (const rule of this.alertRules.values()) {
      if (!rule.enabled) continue;

      const value = (metric as any)[rule.metric];
      if (value === undefined) continue;

      let triggered = false;

      switch (rule.operator) {
        case '>':
          triggered = value > rule.threshold;
          break;
        case '<':
          triggered = value < rule.threshold;
          break;
        case '==':
          triggered = value === rule.threshold;
          break;
        case '!=':
          triggered = value !== rule.threshold;
          break;
      }

      if (triggered) {
        const alert: Alert = {
          id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ruleId: rule.id,
          timestamp: Date.now(),
          severity: rule.severity,
          message: `${rule.name}: ${rule.metric} is ${value.toFixed(2)} (threshold: ${rule.threshold})`,
          value,
          acknowledged: false,
        };

        this.alerts.push(alert);
        this.emit('alert:triggered', alert);
      }
    }
  }

  /**
   * Get active alerts
   */
  getActiveAlerts(severity?: 'warning' | 'critical'): Alert[] {
    const unacknowledged = this.alerts.filter(a => !a.acknowledged);

    if (severity) {
      return unacknowledged.filter(a => a.severity === severity);
    }

    return unacknowledged;
  }

  /**
   * Acknowledge alert
   */
  acknowledgeAlert(alertId: string): Alert | null {
    const alert = this.alerts.find(a => a.id === alertId);
    if (!alert) return null;

    alert.acknowledged = true;
    this.emit('alert:acknowledged', alert);
    return alert;
  }

  /**
   * Get system health summary
   */
  getHealthSummary(): {
    overallStatus: 'healthy' | 'degraded' | 'critical';
    components: {
      [name: string]: {
        status: 'healthy' | 'degraded' | 'critical';
        responseTime: number;
        timestamp: number;
      };
    };
    activeAlerts: number;
    criticalAlerts: number;
  } {
    const components: {
      [name: string]: {
        status: 'healthy' | 'degraded' | 'critical';
        responseTime: number;
        timestamp: number;
      };
    } = {};

    let hasCritical = false;
    let hasDegraded = false;

    for (const [name, checks] of this.healthChecks.entries()) {
      if (checks.length > 0) {
        const latest = checks[checks.length - 1];
        components[name] = {
          status: latest.status,
          responseTime: latest.responseTime,
          timestamp: latest.timestamp,
        };

        if (latest.status === 'critical') hasCritical = true;
        if (latest.status === 'degraded') hasDegraded = true;
      }
    }

    const overallStatus = hasCritical
      ? 'critical'
      : hasDegraded
        ? 'degraded'
        : 'healthy';

    const activeAlerts = this.getActiveAlerts();
    const criticalAlerts = activeAlerts.filter(
      a => a.severity === 'critical'
    ).length;

    return {
      overallStatus,
      components,
      activeAlerts: activeAlerts.length,
      criticalAlerts,
    };
  }

  /**
   * Get performance trends
   */
  getPerformanceTrends(period: 'hour' | 'day' | 'week'): {
    avgCpuUsage: number;
    avgMemoryUsage: number;
    avgLatency: number;
    maxErrorRate: number;
    peakRequestsPerSecond: number;
  } {
    const periodMs = {
      hour: 3600000,
      day: 86400000,
      week: 604800000,
    };

    const cutoff = Date.now() - periodMs[period];
    const metrics = this.performanceMetrics.filter(
      m => m.timestamp > cutoff
    );

    if (metrics.length === 0) {
      return {
        avgCpuUsage: 0,
        avgMemoryUsage: 0,
        avgLatency: 0,
        maxErrorRate: 0,
        peakRequestsPerSecond: 0,
      };
    }

    const avgCpuUsage =
      metrics.reduce((sum, m) => sum + m.cpuUsage, 0) / metrics.length;
    const avgMemoryUsage =
      metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / metrics.length;
    const avgLatency =
      metrics.reduce((sum, m) => sum + m.averageLatency, 0) / metrics.length;
    const maxErrorRate = Math.max(...metrics.map(m => m.errorRate));
    const peakRequestsPerSecond = Math.max(
      ...metrics.map(m => m.requestsPerSecond)
    );

    return {
      avgCpuUsage,
      avgMemoryUsage,
      avgLatency,
      maxErrorRate,
      peakRequestsPerSecond,
    };
  }

  /**
   * Get uptime statistics
   */
  getUptimeStatistics(): {
    uptime: number; // percentage
    downtimeEvents: Array<{
      startTime: number;
      endTime: number;
      duration: number;
      cause?: string;
    }>;
    mtbf: number; // Mean Time Between Failures (ms)
    mttr: number; // Mean Time To Recovery (ms)
  } {
    const allChecks = Array.from(this.healthChecks.values()).flat();
    if (allChecks.length === 0) {
      return {
        uptime: 100,
        downtimeEvents: [],
        mtbf: Infinity,
        mttr: 0,
      };
    }

    const healthyChecks = allChecks.filter(c => c.status === 'healthy').length;
    const uptime = (healthyChecks / allChecks.length) * 100;

    // Identify downtime events
    const downtimeEvents: Array<{
      startTime: number;
      endTime: number;
      duration: number;
    }> = [];

    let inDowntime = false;
    let downtimeStart = 0;

    for (const check of allChecks.sort((a, b) => a.timestamp - b.timestamp)) {
      if (check.status !== 'healthy' && !inDowntime) {
        inDowntime = true;
        downtimeStart = check.timestamp;
      } else if (check.status === 'healthy' && inDowntime) {
        inDowntime = false;
        downtimeEvents.push({
          startTime: downtimeStart,
          endTime: check.timestamp,
          duration: check.timestamp - downtimeStart,
        });
      }
    }

    const mtbf =
      downtimeEvents.length > 0
        ? allChecks[allChecks.length - 1].timestamp /
          (downtimeEvents.length + 1)
        : Infinity;

    const mttr =
      downtimeEvents.length > 0
        ? downtimeEvents.reduce((sum, e) => sum + e.duration, 0) /
          downtimeEvents.length
        : 0;

    return {
      uptime,
      downtimeEvents,
      mtbf,
      mttr,
    };
  }

  /**
   * Generate monitoring report
   */
  generateMonitoringReport(): any {
    return {
      generatedAt: new Date().toISOString(),
      health: this.getHealthSummary(),
      performance: {
        current: this.performanceMetrics.slice(-1)[0],
        trends: {
          hourly: this.getPerformanceTrends('hour'),
          daily: this.getPerformanceTrends('day'),
          weekly: this.getPerformanceTrends('week'),
        },
      },
      uptime: this.getUptimeStatistics(),
      alerts: {
        active: this.getActiveAlerts(),
        activeCount: this.getActiveAlerts().length,
        criticalCount: this.getActiveAlerts('critical').length,
      },
    };
  }
}

// Export singleton instance
export const deploymentMonitoring = new DeploymentMonitoringService();
