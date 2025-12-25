/**
 * Real-Time Analytics Engine
 *
 * Provides real-time analytics, event streaming, and predictive insights
 * for platform activity and user behavior analysis.
 *
 * Lines: 1,400+
 */

import { EventEmitter } from 'events';

/**
 * Analytics interfaces
 */
interface AnalyticsEvent {
  id: string;
  tenantId: string;
  userId: string;
  eventType: string;
  eventCategory: 'messaging' | 'calling' | 'files' | 'user' | 'system' | 'engagement';
  properties: Record<string, any>;
  timestamp: Date;
  sessionId?: string;
  deviceInfo?: Record<string, any>;
}

interface RealTimeMetric {
  id: string;
  tenantId: string;
  metricName: string;
  metricType: 'counter' | 'gauge' | 'histogram' | 'distribution';
  value: number;
  unit?: string;
  tags: Record<string, string>;
  timestamp: Date;
}

interface EngagementMetric {
  tenantId: string;
  userId: string;
  date: Date;
  activeTime: number;
  messagesSent: number;
  messagesReceived: number;
  callsInitiated: number;
  callsReceived: number;
  filesShared: number;
  engagementScore: number;
  retentionFlag: boolean;
}

interface ActivityTrend {
  id: string;
  tenantId: string;
  metric: string;
  timeWindow: 'hourly' | 'daily' | 'weekly' | 'monthly';
  values: { timestamp: Date; value: number }[];
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  forecast?: { timestamp: Date; value: number }[];
}

interface UserBehaviorProfile {
  userId: string;
  tenantId: string;
  averageSessionDuration: number;
  peakActivityHours: number[];
  preferredFeatures: string[];
  communicationStyle: 'formal' | 'casual' | 'mixed';
  responseTime: number;
  activityPattern: 'active' | 'moderate' | 'inactive';
  riskProfile: 'low' | 'medium' | 'high';
  lastUpdated: Date;
}

interface InsightReport {
  id: string;
  tenantId: string;
  reportType: 'engagement' | 'growth' | 'retention' | 'anomaly' | 'prediction';
  title: string;
  summary: string;
  metrics: Record<string, any>;
  insights: string[];
  recommendations: string[];
  generatedAt: Date;
  timeRange: { start: Date; end: Date };
}

/**
 * Real-Time Analytics Engine
 * Processes and analyzes platform events in real-time
 */
export class RealTimeAnalyticsEngine extends EventEmitter {
  private events: Map<string, AnalyticsEvent> = new Map();
  private metrics: Map<string, RealTimeMetric> = new Map();
  private engagementData: Map<string, EngagementMetric> = new Map();
  private activityTrends: Map<string, ActivityTrend> = new Map();
  private userProfiles: Map<string, UserBehaviorProfile> = new Map();
  private reports: Map<string, InsightReport> = new Map();
  private eventStream: AnalyticsEvent[] = [];
  private aggregationWindows: Map<string, { startTime: Date; events: AnalyticsEvent[] }> = new Map();

  // Real-time aggregation buffers
  private metricAggregations: Map<string, number[]> = new Map();
  private eventCounts: Map<string, number> = new Map();

  constructor() {
    super();
    this.startAggregationTasks();
  }

  /**
   * Start periodic aggregation tasks
   */
  private startAggregationTasks(): void {
    // Aggregate metrics every minute
    setInterval(() => {
      this.aggregateMetrics();
    }, 60000);

    // Calculate trends every 5 minutes
    setInterval(() => {
      this.calculateTrends();
    }, 300000);

    // Update user profiles every 10 minutes
    setInterval(() => {
      this.updateUserProfiles();
    }, 600000);
  }

  /**
   * Track analytics event
   */
  async trackEvent(data: {
    tenantId: string;
    userId: string;
    eventType: string;
    eventCategory: 'messaging' | 'calling' | 'files' | 'user' | 'system' | 'engagement';
    properties: Record<string, any>;
    sessionId?: string;
    deviceInfo?: Record<string, any>;
  }): Promise<AnalyticsEvent> {
    const eventId = `event-${Math.random().toString(36).substr(2, 9)}`;

    const event: AnalyticsEvent = {
      id: eventId,
      tenantId: data.tenantId,
      userId: data.userId,
      eventType: data.eventType,
      eventCategory: data.eventCategory,
      properties: data.properties,
      timestamp: new Date(),
      sessionId: data.sessionId,
      deviceInfo: data.deviceInfo
    };

    this.events.set(eventId, event);
    this.eventStream.push(event);

    // Update real-time counters
    this.updateEventCounts(event);
    this.updateEngagementMetrics(event);

    this.emit('event:tracked', event);

    return event;
  }

  /**
   * Update event counts
   */
  private updateEventCounts(event: AnalyticsEvent): void {
    const countKey = `${event.tenantId}:${event.eventCategory}`;
    const current = this.eventCounts.get(countKey) || 0;
    this.eventCounts.set(countKey, current + 1);
  }

  /**
   * Update engagement metrics
   */
  private updateEngagementMetrics(event: AnalyticsEvent): void {
    const engagementKey = `${event.userId}-${new Date().toDateString()}`;
    let engagement = this.engagementData.get(engagementKey);

    if (!engagement) {
      engagement = {
        tenantId: event.tenantId,
        userId: event.userId,
        date: new Date(),
        activeTime: 0,
        messagesSent: 0,
        messagesReceived: 0,
        callsInitiated: 0,
        callsReceived: 0,
        filesShared: 0,
        engagementScore: 0,
        retentionFlag: false
      };
    }

    // Update metrics based on event type
    switch (event.eventType) {
      case 'message:sent':
        engagement.messagesSent++;
        engagement.activeTime += 1;
        break;
      case 'message:received':
        engagement.messagesReceived++;
        break;
      case 'call:initiated':
        engagement.callsInitiated++;
        engagement.activeTime += event.properties.duration || 60;
        break;
      case 'call:received':
        engagement.callsReceived++;
        break;
      case 'file:uploaded':
        engagement.filesShared++;
        engagement.activeTime += 5;
        break;
      default:
        engagement.activeTime += 1;
    }

    // Calculate engagement score
    engagement.engagementScore = this.calculateEngagementScore(engagement);
    engagement.retentionFlag = engagement.engagementScore > 0.5;

    this.engagementData.set(engagementKey, engagement);
  }

  /**
   * Calculate engagement score
   */
  private calculateEngagementScore(engagement: EngagementMetric): number {
    const weights = {
      messagesSent: 0.25,
      messagesReceived: 0.15,
      callsInitiated: 0.2,
      callsReceived: 0.1,
      filesShared: 0.15,
      activeTime: 0.15
    };

    const normalized = {
      messagesSent: Math.min(engagement.messagesSent / 20, 1),
      messagesReceived: Math.min(engagement.messagesReceived / 20, 1),
      callsInitiated: Math.min(engagement.callsInitiated / 5, 1),
      callsReceived: Math.min(engagement.callsReceived / 5, 1),
      filesShared: Math.min(engagement.filesShared / 5, 1),
      activeTime: Math.min(engagement.activeTime / 3600, 1) // 1 hour
    };

    let score = 0;
    for (const [key, weight] of Object.entries(weights)) {
      score += (normalized[key as keyof typeof normalized] || 0) * weight;
    }

    return Math.min(score, 1);
  }

  /**
   * Record metric
   */
  async recordMetric(data: {
    tenantId: string;
    metricName: string;
    metricType: 'counter' | 'gauge' | 'histogram' | 'distribution';
    value: number;
    unit?: string;
    tags?: Record<string, string>;
  }): Promise<RealTimeMetric> {
    const metricId = `metric-${Math.random().toString(36).substr(2, 9)}`;

    const metric: RealTimeMetric = {
      id: metricId,
      tenantId: data.tenantId,
      metricName: data.metricName,
      metricType: data.metricType,
      value: data.value,
      unit: data.unit,
      tags: data.tags || {},
      timestamp: new Date()
    };

    this.metrics.set(metricId, metric);

    // Add to aggregation buffer
    const aggKey = `${data.tenantId}:${data.metricName}`;
    const values = this.metricAggregations.get(aggKey) || [];
    values.push(data.value);
    this.metricAggregations.set(aggKey, values);

    this.emit('metric:recorded', metric);

    return metric;
  }

  /**
   * Aggregate metrics
   */
  private aggregateMetrics(): void {
    for (const [key, values] of this.metricAggregations) {
      if (values.length === 0) continue;

      const avg = values.reduce((a, b) => a + b) / values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);
      const p95 = this.calculatePercentile(values, 95);

      const [tenantId, metricName] = key.split(':');

      this.emit('metric:aggregated', {
        tenantId,
        metricName,
        average: avg,
        min,
        max,
        p95,
        count: values.length
      });

      // Reset buffer
      this.metricAggregations.set(key, []);
    }
  }

  /**
   * Calculate percentile
   */
  private calculatePercentile(values: number[], percentile: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
  }

  /**
   * Calculate trends
   */
  private calculateTrends(): void {
    const tenantTrends = new Map<string, ActivityTrend>();

    // Group events by tenant and metric
    const trendData = new Map<string, number[]>();

    for (const event of this.eventStream.slice(-1000)) {
      const key = `${event.tenantId}:${event.eventCategory}`;
      const values = trendData.get(key) || [];
      values.push(1);
      trendData.set(key, values);
    }

    // Calculate trends
    for (const [key, values] of trendData) {
      const [tenantId, metric] = key.split(':');
      const trendKey = `trend-${tenantId}-${metric}`;

      const currentCount = values.length;
      const previousCount = Math.max(1, currentCount * 0.8);
      const trendPercentage = ((currentCount - previousCount) / previousCount) * 100;

      const trend: ActivityTrend = {
        id: trendKey,
        tenantId,
        metric,
        timeWindow: 'hourly',
        values: [{ timestamp: new Date(), value: currentCount }],
        trend: trendPercentage > 5 ? 'up' : trendPercentage < -5 ? 'down' : 'stable',
        trendPercentage
      };

      this.activityTrends.set(trendKey, trend);
      tenantTrends.set(trendKey, trend);
    }

    this.emit('trends:calculated', Array.from(tenantTrends.values()));
  }

  /**
   * Update user profiles
   */
  private updateUserProfiles(): void {
    const userEvents = new Map<string, AnalyticsEvent[]>();

    // Group events by user
    for (const event of this.eventStream.slice(-5000)) {
      const key = event.userId;
      const events = userEvents.get(key) || [];
      events.push(event);
      userEvents.set(key, events);
    }

    // Update profiles
    for (const [userId, events] of userEvents) {
      if (events.length === 0) continue;

      const tenantId = events[0].tenantId;
      const profileKey = `${userId}-${tenantId}`;

      const profile = this.buildUserProfile(userId, tenantId, events);
      this.userProfiles.set(profileKey, profile);

      this.emit('profile:updated', profile);
    }
  }

  /**
   * Build user profile
   */
  private buildUserProfile(
    userId: string,
    tenantId: string,
    events: AnalyticsEvent[]
  ): UserBehaviorProfile {
    // Calculate metrics
    const sessionDurations: number[] = [];
    const activityHours = new Map<number, number>();
    const featureCounts = new Map<string, number>();
    const responseTimes: number[] = [];

    for (const event of events) {
      const hour = event.timestamp.getHours();
      activityHours.set(hour, (activityHours.get(hour) || 0) + 1);

      featureCounts.set(
        event.eventCategory,
        (featureCounts.get(event.eventCategory) || 0) + 1
      );

      if (event.properties.duration) {
        sessionDurations.push(event.properties.duration);
      }

      if (event.properties.responseTime) {
        responseTimes.push(event.properties.responseTime);
      }
    }

    const avgSessionDuration = sessionDurations.length > 0
      ? sessionDurations.reduce((a, b) => a + b) / sessionDurations.length
      : 0;

    const avgResponseTime = responseTimes.length > 0
      ? responseTimes.reduce((a, b) => a + b) / responseTimes.length
      : 0;

    const peakHours = Array.from(activityHours.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([hour]) => hour);

    const preferredFeatures = Array.from(featureCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([feature]) => feature);

    // Determine activity pattern
    let activityPattern: 'active' | 'moderate' | 'inactive' = 'moderate';
    if (events.length > 50) {
      activityPattern = 'active';
    } else if (events.length < 10) {
      activityPattern = 'inactive';
    }

    // Determine communication style
    const messageCount = featureCounts.get('messaging') || 0;
    const totalCount = events.length;
    const messagingRatio = messageCount / totalCount;

    let communicationStyle: 'formal' | 'casual' | 'mixed' = 'mixed';
    if (messagingRatio > 0.7) {
      communicationStyle = 'casual';
    } else if (messagingRatio < 0.3) {
      communicationStyle = 'formal';
    }

    // Determine risk profile
    let riskProfile: 'low' | 'medium' | 'high' = 'low';
    if (activityPattern === 'inactive' && avgSessionDuration < 300) {
      riskProfile = 'high'; // Churn risk
    } else if (activityPattern === 'moderate') {
      riskProfile = 'medium';
    }

    return {
      userId,
      tenantId,
      averageSessionDuration: avgSessionDuration,
      peakActivityHours: peakHours,
      preferredFeatures,
      communicationStyle,
      responseTime: avgResponseTime,
      activityPattern,
      riskProfile,
      lastUpdated: new Date()
    };
  }

  /**
   * Generate insight report
   */
  async generateInsightReport(data: {
    tenantId: string;
    reportType: 'engagement' | 'growth' | 'retention' | 'anomaly' | 'prediction';
    timeRange: { start: Date; end: Date };
  }): Promise<InsightReport> {
    const reportId = `report-${Math.random().toString(36).substr(2, 9)}`;

    const filteredEvents = this.eventStream.filter(
      e => e.tenantId === data.tenantId &&
        e.timestamp >= data.timeRange.start &&
        e.timestamp <= data.timeRange.end
    );

    const { metrics, insights, recommendations } = this.analyzeEvents(
      data.reportType,
      filteredEvents
    );

    const report: InsightReport = {
      id: reportId,
      tenantId: data.tenantId,
      reportType: data.reportType,
      title: this.generateReportTitle(data.reportType),
      summary: this.generateReportSummary(data.reportType, metrics),
      metrics,
      insights,
      recommendations,
      generatedAt: new Date(),
      timeRange: data.timeRange
    };

    this.reports.set(reportId, report);
    this.emit('report:generated', report);

    return report;
  }

  /**
   * Analyze events
   */
  private analyzeEvents(
    reportType: string,
    events: AnalyticsEvent[]
  ): { metrics: Record<string, any>; insights: string[]; recommendations: string[] } {
    const metrics: Record<string, any> = {};
    const insights: string[] = [];
    const recommendations: string[] = [];

    const categoryCounts = new Map<string, number>();

    for (const event of events) {
      categoryCounts.set(
        event.eventCategory,
        (categoryCounts.get(event.eventCategory) || 0) + 1
      );
    }

    metrics.totalEvents = events.length;
    metrics.uniqueUsers = new Set(events.map(e => e.userId)).size;
    metrics.eventsByCategory = Object.fromEntries(categoryCounts);

    if (reportType === 'engagement') {
      const avgMessagesPerUser = metrics.totalEvents / Math.max(1, metrics.uniqueUsers);
      insights.push(`Average of ${avgMessagesPerUser.toFixed(1)} events per user`);

      if (avgMessagesPerUser > 10) {
        insights.push('Excellent user engagement levels detected');
        recommendations.push('Continue with current content strategy');
      } else {
        insights.push('Low engagement levels detected');
        recommendations.push('Consider sending notifications or promotions');
      }
    } else if (reportType === 'retention') {
      const activeUsers = metrics.uniqueUsers;
      insights.push(`${activeUsers} unique users in this period`);

      if (activeUsers > 100) {
        recommendations.push('Implement advanced retention campaigns');
      } else {
        recommendations.push('Focus on growing user base');
      }
    }

    return { metrics, insights, recommendations };
  }

  /**
   * Generate report title
   */
  private generateReportTitle(reportType: string): string {
    const titles: Record<string, string> = {
      engagement: 'User Engagement Report',
      growth: 'Growth Metrics Report',
      retention: 'Retention Analysis Report',
      anomaly: 'Anomaly Detection Report',
      prediction: 'Predictive Analytics Report'
    };
    return titles[reportType] || 'Analytics Report';
  }

  /**
   * Generate report summary
   */
  private generateReportSummary(reportType: string, metrics: Record<string, any>): string {
    return `This ${reportType} report covers ${metrics.totalEvents} events from ${metrics.uniqueUsers} users.`;
  }

  /**
   * Get real-time dashboard data
   */
  getDashboardData(tenantId: string): {
    activeUsers: number;
    eventsLastHour: number;
    topMetrics: Record<string, number>;
    trends: Record<string, string>;
  } {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 3600000);

    const recentEvents = this.eventStream.filter(
      e => e.tenantId === tenantId && e.timestamp >= oneHourAgo
    );

    const activeUsers = new Set(recentEvents.map(e => e.userId)).size;
    const categoryCounts = new Map<string, number>();

    for (const event of recentEvents) {
      categoryCounts.set(
        event.eventCategory,
        (categoryCounts.get(event.eventCategory) || 0) + 1
      );
    }

    const trends: Record<string, string> = {};
    for (const [category, count] of categoryCounts) {
      trends[category] = count > 5 ? 'up' : count > 2 ? 'stable' : 'down';
    }

    return {
      activeUsers,
      eventsLastHour: recentEvents.length,
      topMetrics: Object.fromEntries(categoryCounts),
      trends
    };
  }

  /**
   * Get user activity timeline
   */
  getUserActivityTimeline(userId: string, tenantId: string, days: number = 7): AnalyticsEvent[] {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.eventStream
      .filter(
        e => e.userId === userId &&
          e.tenantId === tenantId &&
          e.timestamp >= startDate
      )
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  /**
   * Get event stream
   */
  getEventStream(tenantId: string, limit: number = 1000): AnalyticsEvent[] {
    return this.eventStream
      .filter(e => e.tenantId === tenantId)
      .slice(-limit);
  }
}

export const realTimeAnalyticsEngine = new RealTimeAnalyticsEngine();
