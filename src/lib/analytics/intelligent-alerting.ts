/**
 * Intelligent Alerting Service
 *
 * Smart alerts based on anomalies, predictions, and user preferences
 */

import { EventEmitter } from 'events';

interface AlertRule {
  id: string;
  name: string;
  description?: string;
  condition: AlertCondition;
  actions: AlertAction[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AlertCondition {
  type: 'threshold' | 'anomaly' | 'prediction' | 'pattern';
  metric: string;
  operator: '>' | '<' | '=' | '!=' | '>=' | '<=';
  value: number;
  duration?: number; // milliseconds
  window?: number; // lookback window
}

interface AlertAction {
  type: 'email' | 'slack' | 'webhook' | 'in_app';
  target: string; // email, slack channel, webhook URL, user ID
  template?: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

interface Alert {
  id: string;
  ruleId: string;
  timestamp: number;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  data: Record<string, any>;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: number;
  resolvedAt?: number;
}

interface AlertContext {
  userId?: string;
  roomId?: string;
  systemWide?: boolean;
  metric: string;
  value: number;
  threshold: number;
  previousValue: number;
  timestamp: number;
}

export class IntelligentAlertingService extends EventEmitter {
  private rules: Map<string, AlertRule> = new Map();
  private activeAlerts: Map<string, Alert> = new Map();
  private alertHistory: Alert[] = [];
  private suppressionRules: Map<string, { until: number; count: number }> = new Map();
  private maxAlertHistory = 1000;

  constructor() {
    super();
    this.initializeDefaultRules();
  }

  /**
   * Initialize default alert rules
   */
  private initializeDefaultRules() {
    // High CPU usage
    this.createRule({
      id: 'rule_cpu_high',
      name: 'High CPU Usage',
      description: 'Alert when CPU usage exceeds 80%',
      condition: {
        type: 'threshold',
        metric: 'system.cpu',
        operator: '>',
        value: 80,
        duration: 300000, // 5 minutes
      },
      actions: [
        {
          type: 'slack',
          target: 'ops-alerts',
          urgency: 'high',
        },
      ],
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // High error rate
    this.createRule({
      id: 'rule_errors_high',
      name: 'High Error Rate',
      description: 'Alert when error rate exceeds 5%',
      condition: {
        type: 'threshold',
        metric: 'system.errorRate',
        operator: '>',
        value: 5,
        duration: 60000, // 1 minute
      },
      actions: [
        {
          type: 'slack',
          target: 'ops-alerts',
          urgency: 'critical',
        },
        {
          type: 'email',
          target: 'ops@company.com',
          urgency: 'critical',
        },
      ],
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // User churn prediction
    this.createRule({
      id: 'rule_churn_risk',
      name: 'High Churn Risk',
      description: 'Alert for users at high risk of churning',
      condition: {
        type: 'prediction',
        metric: 'user.churnRisk',
        operator: '>',
        value: 0.7,
      },
      actions: [
        {
          type: 'in_app',
          target: 'sales_team',
          urgency: 'high',
        },
      ],
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Anomaly detection
    this.createRule({
      id: 'rule_anomaly_detected',
      name: 'Anomaly Detected',
      description: 'Alert when anomalies are detected',
      condition: {
        type: 'anomaly',
        metric: 'system.anomaly',
        operator: '>',
        value: 0.7,
      },
      actions: [
        {
          type: 'slack',
          target: 'security-alerts',
          urgency: 'high',
        },
      ],
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Unusual message pattern
    this.createRule({
      id: 'rule_message_spike',
      name: 'Message Spike Detection',
      description: 'Alert on unusual message spikes in rooms',
      condition: {
        type: 'pattern',
        metric: 'room.messageRate',
        operator: '>',
        value: 10, // 10x normal rate
      },
      actions: [
        {
          type: 'in_app',
          target: 'moderators',
          urgency: 'medium',
        },
      ],
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  /**
   * Create a custom alert rule
   */
  createRule(rule: AlertRule): AlertRule {
    this.rules.set(rule.id, rule);
    this.emit('rule:created', rule);
    return rule;
  }

  /**
   * Update alert rule
   */
  updateRule(ruleId: string, updates: Partial<AlertRule>): AlertRule | null {
    const rule = this.rules.get(ruleId);
    if (!rule) return null;

    const updated = {
      ...rule,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.rules.set(ruleId, updated);
    this.emit('rule:updated', updated);
    return updated;
  }

  /**
   * Delete alert rule
   */
  deleteRule(ruleId: string): boolean {
    const deleted = this.rules.delete(ruleId);
    if (deleted) {
      this.emit('rule:deleted', ruleId);
    }
    return deleted;
  }

  /**
   * Get all rules
   */
  getRules(): AlertRule[] {
    return Array.from(this.rules.values());
  }

  /**
   * Get rule by ID
   */
  getRule(ruleId: string): AlertRule | null {
    return this.rules.get(ruleId) || null;
  }

  /**
   * Evaluate alert conditions and trigger alerts
   */
  evaluateConditions(context: AlertContext): Alert[] {
    const triggeredAlerts: Alert[] = [];

    for (const rule of this.rules.values()) {
      if (!rule.enabled) continue;

      // Check if condition is met
      const conditionMet = this.checkCondition(rule.condition, context);

      if (conditionMet && !this.isSuppressed(rule.id)) {
        const alert = this.createAlert(rule, context);
        this.activeAlerts.set(alert.id, alert);
        this.alertHistory.push(alert);

        // Maintain history size
        if (this.alertHistory.length > this.maxAlertHistory) {
          this.alertHistory.shift();
        }

        triggeredAlerts.push(alert);
        this.emit('alert:triggered', alert);

        // Execute actions
        this.executeActions(rule, alert);
      }
    }

    return triggeredAlerts;
  }

  /**
   * Check if condition is met
   */
  private checkCondition(condition: AlertCondition, context: AlertContext): boolean {
    const { operator, value } = condition;
    const contextValue = context.value;

    switch (operator) {
      case '>':
        return contextValue > value;
      case '<':
        return contextValue < value;
      case '=':
        return contextValue === value;
      case '!=':
        return contextValue !== value;
      case '>=':
        return contextValue >= value;
      case '<=':
        return contextValue <= value;
      default:
        return false;
    }
  }

  /**
   * Create alert from rule
   */
  private createAlert(rule: AlertRule, context: AlertContext): Alert {
    const severity = context.value > context.threshold * 1.5
      ? 'critical'
      : context.value > context.threshold * 1.2
        ? 'warning'
        : 'info';

    const alert: Alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ruleId: rule.id,
      timestamp: context.timestamp,
      severity,
      title: rule.name,
      message: this.generateAlertMessage(rule, context),
      data: {
        metric: context.metric,
        value: context.value,
        threshold: context.threshold,
        change: ((context.value - context.previousValue) / context.previousValue * 100).toFixed(2),
        userId: context.userId,
        roomId: context.roomId,
      },
      acknowledged: false,
    };

    return alert;
  }

  /**
   * Generate alert message
   */
  private generateAlertMessage(rule: AlertRule, context: AlertContext): string {
    const change = ((context.value - context.previousValue) / context.previousValue * 100).toFixed(1);

    return `${rule.name}: ${context.metric} is ${context.value.toFixed(2)} ` +
      `(threshold: ${context.threshold.toFixed(2)}, change: ${change}%)`;
  }

  /**
   * Execute alert actions
   */
  private executeActions(rule: AlertRule, alert: Alert) {
    for (const action of rule.actions) {
      switch (action.type) {
        case 'email':
          this.sendEmailAlert(action.target, alert);
          break;
        case 'slack':
          this.sendSlackAlert(action.target, alert);
          break;
        case 'webhook':
          this.sendWebhookAlert(action.target, alert);
          break;
        case 'in_app':
          this.createInAppAlert(action.target, alert);
          break;
      }
    }
  }

  /**
   * Send email alert
   */
  private sendEmailAlert(recipient: string, alert: Alert) {
    // In production, integrate with email service
    this.emit('action:email', {
      recipient,
      subject: `Alert: ${alert.title}`,
      message: alert.message,
      severity: alert.severity,
    });
  }

  /**
   * Send Slack alert
   */
  private sendSlackAlert(channel: string, alert: Alert) {
    // In production, integrate with Slack API
    const color = alert.severity === 'critical' ? 'danger' : alert.severity === 'warning' ? 'warning' : 'good';

    this.emit('action:slack', {
      channel,
      message: {
        attachments: [
          {
            color,
            title: alert.title,
            text: alert.message,
            fields: [
              { title: 'Severity', value: alert.severity, short: true },
              { title: 'Time', value: new Date(alert.timestamp).toISOString(), short: true },
            ],
          },
        ],
      },
    });
  }

  /**
   * Send webhook alert
   */
  private sendWebhookAlert(webhookUrl: string, alert: Alert) {
    // In production, make actual webhook call
    this.emit('action:webhook', {
      url: webhookUrl,
      payload: alert,
    });
  }

  /**
   * Create in-app alert
   */
  private createInAppAlert(target: string, alert: Alert) {
    this.emit('action:in_app', {
      target,
      alert,
    });
  }

  /**
   * Acknowledge alert
   */
  acknowledgeAlert(alertId: string, acknowledgedBy: string): Alert | null {
    const alert = this.activeAlerts.get(alertId) || this.alertHistory.find(a => a.id === alertId);
    if (!alert) return null;

    alert.acknowledged = true;
    alert.acknowledgedBy = acknowledgedBy;
    alert.acknowledgedAt = Date.now();

    this.emit('alert:acknowledged', alert);
    return alert;
  }

  /**
   * Resolve alert
   */
  resolveAlert(alertId: string): Alert | null {
    const alert = this.activeAlerts.get(alertId) || this.alertHistory.find(a => a.id === alertId);
    if (!alert) return null;

    alert.resolvedAt = Date.now();
    this.activeAlerts.delete(alertId);

    this.emit('alert:resolved', alert);
    return alert;
  }

  /**
   * Get active alerts
   */
  getActiveAlerts(severity?: string): Alert[] {
    const alerts = Array.from(this.activeAlerts.values());
    if (severity) {
      return alerts.filter(a => a.severity === severity);
    }
    return alerts;
  }

  /**
   * Get alert history
   */
  getAlertHistory(limit: number = 100): Alert[] {
    return this.alertHistory.slice(-limit).reverse();
  }

  /**
   * Suppress alert rule temporarily
   */
  suppressRule(ruleId: string, durationMs: number = 3600000): void {
    const suppression = this.suppressionRules.get(ruleId) || { until: 0, count: 0 };
    suppression.until = Date.now() + durationMs;
    suppression.count++;
    this.suppressionRules.set(ruleId, suppression);

    this.emit('rule:suppressed', { ruleId, duration: durationMs });
  }

  /**
   * Check if rule is suppressed
   */
  private isSuppressed(ruleId: string): boolean {
    const suppression = this.suppressionRules.get(ruleId);
    if (!suppression) return false;

    if (Date.now() > suppression.until) {
      this.suppressionRules.delete(ruleId);
      return false;
    }

    return true;
  }

  /**
   * Get alert statistics
   */
  getAlertStats(): {
    activeCount: number;
    criticalCount: number;
    warningCount: number;
    acknowledgedCount: number;
    totalTriggered: number;
    averageResolutionTime: number;
  } {
    const activeAlerts = Array.from(this.activeAlerts.values());
    const resolvedAlerts = this.alertHistory.filter(a => a.resolvedAt);

    const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;
    const warningCount = activeAlerts.filter(a => a.severity === 'warning').length;
    const acknowledgedCount = activeAlerts.filter(a => a.acknowledged).length;

    const resolutionTimes = resolvedAlerts
      .filter(a => a.resolvedAt && a.timestamp)
      .map(a => (a.resolvedAt! - a.timestamp) / 1000); // in seconds

    const averageResolutionTime = resolutionTimes.length > 0
      ? resolutionTimes.reduce((a, b) => a + b, 0) / resolutionTimes.length
      : 0;

    return {
      activeCount: activeAlerts.length,
      criticalCount,
      warningCount,
      acknowledgedCount,
      totalTriggered: this.alertHistory.length,
      averageResolutionTime,
    };
  }

  /**
   * Get alerts by rule
   */
  getAlertsByRule(ruleId: string): Alert[] {
    return this.alertHistory.filter(a => a.ruleId === ruleId);
  }

  /**
   * Analyze alert patterns
   */
  analyzeAlertPatterns(): {
    mostCommonRules: Array<{ ruleId: string; count: number }>;
    peakAlertTimes: Array<{ hour: number; count: number }>;
    alertTrend: 'increasing' | 'decreasing' | 'stable';
  } {
    // Most common rules
    const ruleCounts = new Map<string, number>();
    for (const alert of this.alertHistory) {
      ruleCounts.set(alert.ruleId, (ruleCounts.get(alert.ruleId) || 0) + 1);
    }
    const mostCommonRules = Array.from(ruleCounts.entries())
      .map(([ruleId, count]) => ({ ruleId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Peak alert times
    const hourCounts = new Map<number, number>();
    for (const alert of this.alertHistory) {
      const hour = new Date(alert.timestamp).getHours();
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    }
    const peakAlertTimes = Array.from(hourCounts.entries())
      .map(([hour, count]) => ({ hour, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Trend analysis
    const recentAlerts = this.alertHistory.slice(-100);
    const olderAlerts = this.alertHistory.slice(-200, -100);
    const recentCount = recentAlerts.length;
    const olderCount = olderAlerts.length;

    let alertTrend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (recentCount > olderCount * 1.2) {
      alertTrend = 'increasing';
    } else if (recentCount < olderCount * 0.8) {
      alertTrend = 'decreasing';
    }

    return {
      mostCommonRules,
      peakAlertTimes,
      alertTrend,
    };
  }
}

// Export singleton instance
export const intelligentAlerting = new IntelligentAlertingService();
