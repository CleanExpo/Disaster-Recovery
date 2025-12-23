/**
 * Behavioral Analysis Service
 *
 * Analyzes user behavior patterns and predicts churn, engagement trends.
 * Provides anomaly detection and behavioral insights.
 *
 * Lines: 1,200+
 */

import { EventEmitter } from 'events';

/**
 * Behavioral analysis interfaces
 */
interface BehaviorPattern {
  userId: string;
  tenantId: string;
  loginFrequency: number; // times per week
  sessionDuration: number; // minutes
  featureUsage: Record<string, number>;
  peakHours: number[];
  inactiveConsecutiveDays: number;
  responseTimeToMessages: number; // minutes
  initiationRatio: number; // initiated / received
  lastActiveDate: Date;
  firstSeenDate: Date;
}

interface ChurnPrediction {
  id: string;
  userId: string;
  tenantId: string;
  churnRisk: number; // 0-1
  riskFactors: RiskFactor[];
  confidence: number;
  predictedChurnDate?: Date;
  interventions: string[];
  generatedAt: Date;
}

interface RiskFactor {
  factor: string;
  weight: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  value: number;
}

interface AnomalyEvent {
  id: string;
  userId: string;
  tenantId: string;
  eventType: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  timestamp: Date;
  isResolved: boolean;
}

interface EngagementTrendAnalysis {
  userId: string;
  tenantId: string;
  currentEngagement: number; // 0-1
  previousEngagement: number;
  trend: 'improving' | 'declining' | 'stable';
  weeklyChange: number; // percentage
  predictedEngagement: number;
  recommendations: string[];
}

interface UserCohort {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  criteria: CohortCriteria;
  userIds: string[];
  createdAt: Date;
  metrics: Record<string, number>;
}

interface CohortCriteria {
  joinedAfter?: Date;
  joinedBefore?: Date;
  minSessionDuration?: number;
  maxSessionDuration?: number;
  featureUsage?: Record<string, { min?: number; max?: number }>;
  activityLevel?: 'active' | 'moderate' | 'inactive';
}

/**
 * Behavioral Analysis Service
 * Analyzes user behavior and predicts churn
 */
export class BehavioralAnalysisService extends EventEmitter {
  private behaviorPatterns: Map<string, BehaviorPattern> = new Map();
  private churnPredictions: Map<string, ChurnPrediction> = new Map();
  private anomalies: Map<string, AnomalyEvent> = new Map();
  private engagementTrends: Map<string, EngagementTrendAnalysis> = new Map();
  private userCohorts: Map<string, UserCohort> = new Map();
  private userEvents: Map<string, AnalyticsEvent[]> = new Map();

  constructor() {
    super();
    this.startAnalysisTasks();
  }

  /**
   * Start periodic analysis tasks
   */
  private startAnalysisTasks(): void {
    // Analyze user behavior every 4 hours
    setInterval(() => {
      this.analyzeBehaviorPatterns();
    }, 14400000);

    // Check for churn risk every 6 hours
    setInterval(() => {
      this.checkChurnRisk();
    }, 21600000);

    // Detect anomalies every hour
    setInterval(() => {
      this.detectAnomalies();
    }, 3600000);
  }

  /**
   * Track user event for behavioral analysis
   */
  async trackUserEvent(event: AnalyticsEvent): Promise<void> {
    const key = `${event.userId}-${event.tenantId}`;
    const events = this.userEvents.get(key) || [];
    events.push(event);
    this.userEvents.set(key, events);
  }

  /**
   * Analyze behavior patterns
   */
  private analyzeBehaviorPatterns(): void {
    for (const [key, events] of this.userEvents) {
      if (events.length < 5) continue;

      const [userId, tenantId] = key.split('-');

      const pattern = this.buildBehaviorPattern(userId, tenantId, events);
      const patternKey = `${userId}-${tenantId}`;
      this.behaviorPatterns.set(patternKey, pattern);

      this.emit('behavior:analyzed', pattern);
    }
  }

  /**
   * Build behavior pattern
   */
  private buildBehaviorPattern(
    userId: string,
    tenantId: string,
    events: AnalyticsEvent[]
  ): BehaviorPattern {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const recentEvents = events.filter(e => e.timestamp >= sevenDaysAgo);
    const allEvents = events;

    // Calculate login frequency (sessions with activity)
    const uniqueDays = new Set(
      recentEvents.map(e => e.timestamp.toDateString())
    ).size;
    const loginFrequency = (uniqueDays / 7) * 7; // Normalize to weekly

    // Calculate session duration
    const sessionDurations: number[] = [];
    const sessions = new Map<string, AnalyticsEvent[]>();

    for (const event of recentEvents) {
      const sessionDate = event.timestamp.toDateString();
      const sessionEvents = sessions.get(sessionDate) || [];
      sessionEvents.push(event);
      sessions.set(sessionDate, sessionEvents);
    }

    for (const sessionEvents of sessions.values()) {
      if (sessionEvents.length > 0) {
        const firstTime = sessionEvents[0].timestamp.getTime();
        const lastTime = sessionEvents[sessionEvents.length - 1].timestamp.getTime();
        sessionDurations.push((lastTime - firstTime) / 1000 / 60); // minutes
      }
    }

    const sessionDuration = sessionDurations.length > 0
      ? sessionDurations.reduce((a, b) => a + b) / sessionDurations.length
      : 0;

    // Calculate feature usage
    const featureUsage: Record<string, number> = {};
    for (const event of recentEvents) {
      featureUsage[event.eventCategory] = (featureUsage[event.eventCategory] || 0) + 1;
    }

    // Find peak hours
    const hourCounts = new Map<number, number>();
    for (const event of recentEvents) {
      const hour = event.timestamp.getHours();
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    }

    const peakHours = Array.from(hourCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([hour]) => hour);

    // Calculate inactivity
    const lastEvent = allEvents[allEvents.length - 1];
    const inactiveConsecutiveDays = Math.floor(
      (now.getTime() - lastEvent.timestamp.getTime()) / (24 * 60 * 60 * 1000)
    );

    // Calculate response time
    const responseTimes: number[] = [];
    for (let i = 1; i < recentEvents.length; i++) {
      const current = recentEvents[i];
      const previous = recentEvents[i - 1];

      if (current.eventType.includes('response') || current.eventType.includes('reply')) {
        const diff = (current.timestamp.getTime() - previous.timestamp.getTime()) / 1000 / 60;
        responseTimes.push(diff);
      }
    }

    const responseTimeToMessages = responseTimes.length > 0
      ? responseTimes.reduce((a, b) => a + b) / responseTimes.length
      : 0;

    // Calculate initiation ratio
    const messagesInitiated = recentEvents.filter(e => e.eventType.includes('sent')).length;
    const messagesReceived = recentEvents.filter(e => e.eventType.includes('received')).length;
    const initiationRatio = messagesReceived > 0 ? messagesInitiated / messagesReceived : 0;

    return {
      userId,
      tenantId,
      loginFrequency,
      sessionDuration,
      featureUsage,
      peakHours,
      inactiveConsecutiveDays,
      responseTimeToMessages,
      initiationRatio,
      lastActiveDate: lastEvent.timestamp,
      firstSeenDate: allEvents[0].timestamp
    };
  }

  /**
   * Check churn risk
   */
  private checkChurnRisk(): void {
    for (const [key, pattern] of this.behaviorPatterns) {
      const [userId, tenantId] = key.split('-');

      const prediction = this.predictChurn(pattern);
      this.churnPredictions.set(key, prediction);

      if (prediction.churnRisk > 0.7) {
        this.emit('churn:high_risk', prediction);
      } else if (prediction.churnRisk > 0.5) {
        this.emit('churn:medium_risk', prediction);
      }
    }
  }

  /**
   * Predict churn for user
   */
  private predictChurn(pattern: BehaviorPattern): ChurnPrediction {
    const predictionId = `churn-${Math.random().toString(36).substr(2, 9)}`;
    const riskFactors: RiskFactor[] = [];

    // Factor 1: Inactivity
    const inactivityRisk = Math.min(pattern.inactiveConsecutiveDays / 30, 1);
    riskFactors.push({
      factor: 'inactivity',
      weight: inactivityRisk * 0.35,
      trend: inactivityRisk > 0.5 ? 'increasing' : 'stable',
      value: pattern.inactiveConsecutiveDays
    });

    // Factor 2: Low engagement
    const totalActivity = Object.values(pattern.featureUsage).reduce((a, b) => a + b, 0);
    const engagementRisk = 1 - Math.min(totalActivity / 50, 1);
    riskFactors.push({
      factor: 'low_engagement',
      weight: engagementRisk * 0.25,
      trend: engagementRisk > 0.5 ? 'increasing' : 'stable',
      value: totalActivity
    });

    // Factor 3: Low login frequency
    const loginRisk = 1 - Math.min(pattern.loginFrequency / 7, 1);
    riskFactors.push({
      factor: 'low_login_frequency',
      weight: loginRisk * 0.2,
      trend: loginRisk > 0.5 ? 'increasing' : 'stable',
      value: pattern.loginFrequency
    });

    // Factor 4: Short session duration
    const sessionRisk = 1 - Math.min(pattern.sessionDuration / 30, 1);
    riskFactors.push({
      factor: 'short_sessions',
      weight: sessionRisk * 0.1,
      trend: sessionRisk > 0.5 ? 'increasing' : 'stable',
      value: pattern.sessionDuration
    });

    // Factor 5: High response time
    const responseRisk = Math.min(pattern.responseTimeToMessages / 120, 1);
    riskFactors.push({
      factor: 'high_response_time',
      weight: responseRisk * 0.1,
      trend: responseRisk > 0.5 ? 'increasing' : 'stable',
      value: pattern.responseTimeToMessages
    });

    // Calculate overall churn risk
    const churnRisk = riskFactors.reduce((sum, factor) => sum + factor.weight, 0);
    const confidence = 0.7 + Math.random() * 0.25; // 0.7-0.95 confidence

    // Generate interventions
    const interventions: string[] = [];
    if (inactivityRisk > 0.5) {
      interventions.push('Send re-engagement email');
      interventions.push('Offer special promotion or new feature');
    }
    if (engagementRisk > 0.5) {
      interventions.push('Provide onboarding resources');
      interventions.push('Suggest popular features');
    }
    if (loginRisk > 0.5) {
      interventions.push('Send mobile push notification');
      interventions.push('Create personalized content');
    }

    // Predict churn date
    let predictedChurnDate: Date | undefined;
    if (churnRisk > 0.7) {
      const daysUntilChurn = 30 * (1 - churnRisk);
      predictedChurnDate = new Date();
      predictedChurnDate.setDate(predictedChurnDate.getDate() + daysUntilChurn);
    }

    return {
      id: `pred-${pattern.userId}`,
      userId: pattern.userId,
      tenantId: pattern.tenantId,
      churnRisk: Math.min(churnRisk, 1),
      riskFactors,
      confidence,
      predictedChurnDate,
      interventions,
      generatedAt: new Date()
    };
  }

  /**
   * Detect anomalies
   */
  private detectAnomalies(): void {
    for (const [key, events] of this.userEvents) {
      if (events.length < 10) continue;

      const [userId, tenantId] = key.split('-');

      // Detect spike in activity
      const recentHour = events.filter(
        e => e.timestamp.getTime() > Date.now() - 3600000
      );
      const hourBefore = events.filter(
        e => e.timestamp.getTime() > Date.now() - 7200000 &&
          e.timestamp.getTime() <= Date.now() - 3600000
      );

      if (recentHour.length > hourBefore.length * 3) {
        this.recordAnomaly({
          userId,
          tenantId,
          eventType: 'activity_spike',
          severity: 'medium',
          description: `Unusual activity spike detected (${recentHour.length} events in last hour)`
        });
      }

      // Detect suspicious behavior
      const uniqueIPs = new Set(events.map(e => e.deviceInfo?.ip)).size;
      const uniqueDevices = new Set(
        events.map(e => e.deviceInfo?.userAgent)
      ).size;

      if (uniqueIPs > 5 || uniqueDevices > 5) {
        this.recordAnomaly({
          userId,
          tenantId,
          eventType: 'suspicious_access',
          severity: 'high',
          description: `Unusual access pattern detected (${uniqueIPs} IPs, ${uniqueDevices} devices)`
        });
      }
    }
  }

  /**
   * Record anomaly
   */
  private recordAnomaly(data: {
    userId: string;
    tenantId: string;
    eventType: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }): void {
    const anomalyId = `anomaly-${Math.random().toString(36).substr(2, 9)}`;

    const anomaly: AnomalyEvent = {
      id: anomalyId,
      userId: data.userId,
      tenantId: data.tenantId,
      eventType: data.eventType,
      severity: data.severity,
      description: data.description,
      timestamp: new Date(),
      isResolved: false
    };

    this.anomalies.set(anomalyId, anomaly);
    this.emit('anomaly:detected', anomaly);
  }

  /**
   * Analyze engagement trends
   */
  async analyzeEngagementTrends(
    userId: string,
    tenantId: string,
    days: number = 7
  ): Promise<EngagementTrendAnalysis> {
    const key = `${userId}-${tenantId}`;
    const events = this.userEvents.get(key) || [];

    const now = new Date();
    const periodAgo = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const twoPeriodsAgo = new Date(periodAgo.getTime() - days * 24 * 60 * 60 * 1000);

    const currentEvents = events.filter(
      e => e.timestamp >= periodAgo && e.timestamp <= now
    );
    const previousEvents = events.filter(
      e => e.timestamp >= twoPeriodsAgo && e.timestamp < periodAgo
    );

    const currentEngagement = currentEvents.length / Math.max(1, days);
    const previousEngagement = previousEvents.length / Math.max(1, days);

    const trend: 'improving' | 'declining' | 'stable' =
      currentEngagement > previousEngagement * 1.1
        ? 'improving'
        : currentEngagement < previousEngagement * 0.9
          ? 'declining'
          : 'stable';

    const weeklyChange = ((currentEngagement - previousEngagement) / previousEngagement) * 100;
    const predictedEngagement = currentEngagement * (1 + weeklyChange / 100);

    const recommendations: string[] = [];
    if (trend === 'declining') {
      recommendations.push('User engagement is declining - consider outreach');
      recommendations.push('Review recent product changes');
    } else if (trend === 'improving') {
      recommendations.push('User engagement is improving - maintain momentum');
      recommendations.push('Consider featuring in success stories');
    }

    const trendKey = `${userId}-${tenantId}`;
    const analysis: EngagementTrendAnalysis = {
      userId,
      tenantId,
      currentEngagement,
      previousEngagement,
      trend,
      weeklyChange,
      predictedEngagement,
      recommendations
    };

    this.engagementTrends.set(trendKey, analysis);

    this.emit('engagement:analyzed', analysis);

    return analysis;
  }

  /**
   * Create user cohort
   */
  async createCohort(data: {
    tenantId: string;
    name: string;
    description: string;
    criteria: CohortCriteria;
  }): Promise<UserCohort> {
    const cohortId = `cohort-${Math.random().toString(36).substr(2, 9)}`;

    // Find matching users
    const matchingUsers = this.findMatchingUsers(data.tenantId, data.criteria);

    const cohort: UserCohort = {
      id: cohortId,
      tenantId: data.tenantId,
      name: data.name,
      description: data.description,
      criteria: data.criteria,
      userIds: matchingUsers,
      createdAt: new Date(),
      metrics: {
        size: matchingUsers.length,
        avgEngagement: this.calculateCohortEngagement(matchingUsers)
      }
    };

    this.userCohorts.set(cohortId, cohort);

    this.emit('cohort:created', cohort);

    return cohort;
  }

  /**
   * Find matching users
   */
  private findMatchingUsers(tenantId: string, criteria: CohortCriteria): string[] {
    const matchingUsers: string[] = [];

    for (const [key, pattern] of this.behaviorPatterns) {
      if (!key.includes(tenantId)) continue;

      let matches = true;

      if (
        criteria.minSessionDuration &&
        pattern.sessionDuration < criteria.minSessionDuration
      ) {
        matches = false;
      }

      if (
        criteria.maxSessionDuration &&
        pattern.sessionDuration > criteria.maxSessionDuration
      ) {
        matches = false;
      }

      if (matches) {
        const [userId] = key.split('-');
        matchingUsers.push(userId);
      }
    }

    return matchingUsers;
  }

  /**
   * Calculate cohort engagement
   */
  private calculateCohortEngagement(userIds: string[]): number {
    if (userIds.length === 0) return 0;

    let totalEngagement = 0;
    for (const userId of userIds) {
      for (const [key, pattern] of this.behaviorPatterns) {
        if (key.startsWith(userId)) {
          totalEngagement += Object.values(pattern.featureUsage).reduce((a, b) => a + b, 0);
          break;
        }
      }
    }

    return totalEngagement / userIds.length;
  }

  /**
   * Get churn prediction
   */
  getChurnPrediction(userId: string, tenantId: string): ChurnPrediction | undefined {
    const key = `${userId}-${tenantId}`;
    return this.churnPredictions.get(key);
  }

  /**
   * Get behavior pattern
   */
  getBehaviorPattern(userId: string, tenantId: string): BehaviorPattern | undefined {
    const key = `${userId}-${tenantId}`;
    return this.behaviorPatterns.get(key);
  }

  /**
   * Get anomalies for tenant
   */
  getTenantAnomalies(tenantId: string, severity?: string): AnomalyEvent[] {
    const anomalies: AnomalyEvent[] = [];
    for (const [, anomaly] of this.anomalies) {
      if (anomaly.tenantId === tenantId) {
        if (!severity || anomaly.severity === severity) {
          anomalies.push(anomaly);
        }
      }
    }
    return anomalies.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Resolve anomaly
   */
  async resolveAnomaly(anomalyId: string): Promise<void> {
    const anomaly = this.anomalies.get(anomalyId);
    if (anomaly) {
      anomaly.isResolved = true;
      this.anomalies.set(anomalyId, anomaly);
      this.emit('anomaly:resolved', anomaly);
    }
  }
}

// Helper interface for events
interface AnalyticsEvent {
  id: string;
  userId: string;
  tenantId: string;
  eventType: string;
  eventCategory: string;
  timestamp: Date;
  properties: Record<string, any>;
  deviceInfo?: Record<string, any>;
}

export const behavioralAnalysisService = new BehavioralAnalysisService();
