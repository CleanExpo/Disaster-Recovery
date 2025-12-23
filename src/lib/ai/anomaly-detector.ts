/**
 * Anomaly Detector
 *
 * Detect unusual patterns and anomalies in user behavior and system metrics
 */

import { analyticsEngine } from '@/lib/analytics/analytics-engine';

export type AnomalyType =
  | 'unusual_activity'
  | 'abnormal_pattern'
  | 'sudden_spike'
  | 'sudden_drop'
  | 'user_change'
  | 'spam_detection'
  | 'security_concern';

export interface Anomaly {
  id: string;
  type: AnomalyType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  detectedAt: Date;
  affectedEntity: {
    type: 'user' | 'room' | 'system';
    id: string;
  };
  metrics: Record<string, number>;
  recommendation?: string;
}

export interface AnomalyScore {
  userId: string;
  overallScore: number; // 0-100, where 100 is most anomalous
  riskLevel: 'low' | 'medium' | 'high';
  anomalies: Anomaly[];
  lastCheck: Date;
}

/**
 * Anomaly Detector - Detect unusual patterns
 */
export class AnomalyDetector {
  private userBaselines: Map<string, { avgActivity: number; avgMessagesPerDay: number; activeHours: number[] }> =
    new Map();
  private detectedAnomalies: Map<string, Anomaly[]> = new Map();
  private readonly ANOMALY_THRESHOLD = 2.0; // Standard deviations

  /**
   * Establish baseline for user
   */
  establishBaseline(userId: string): void {
    const analytics = analyticsEngine.getUserAnalytics(userId);

    const baseline = {
      avgActivity: analytics.totalEvents > 0 ? analytics.totalEvents / 30 : 5, // Average per day
      avgMessagesPerDay: analytics.messagesSent > 0 ? analytics.messagesSent / 30 : 2,
      activeHours: analytics.mostActiveHours,
    };

    this.userBaselines.set(userId, baseline);
  }

  /**
   * Detect anomalies for user
   */
  detectUserAnomalies(userId: string): AnomalyScore {
    const baseline = this.userBaselines.get(userId) || this.establishBaseline(userId) || { avgActivity: 5, avgMessagesPerDay: 2, activeHours: [] };
    const analytics = analyticsEngine.getUserAnalytics(userId);
    const anomalies: Anomaly[] = [];

    // Check for unusual activity levels
    const currentActivity = analytics.totalEvents;
    const expectedActivity = baseline.avgActivity;
    const activityDeviation = Math.abs(currentActivity - expectedActivity) / Math.max(expectedActivity, 1);

    if (activityDeviation > this.ANOMALY_THRESHOLD) {
      const anomalyType = currentActivity > expectedActivity ? 'sudden_spike' : 'sudden_drop';
      anomalies.push({
        id: `anom-${userId}-${Date.now()}`,
        type: anomalyType,
        severity: activityDeviation > 3 ? 'high' : 'medium',
        title: `${anomalyType === 'sudden_spike' ? 'Unusual spike' : 'Unusual drop'} in activity`,
        description: `User activity is ${anomalyType === 'sudden_spike' ? 'significantly higher' : 'significantly lower'} than normal`,
        detectedAt: new Date(),
        affectedEntity: { type: 'user', id: userId },
        metrics: { deviation: activityDeviation, currentActivity, expectedActivity },
        recommendation:
          anomalyType === 'sudden_spike'
            ? 'Monitor for potential spam or automated activity'
            : 'Check if user is on vacation or experiencing issues',
      });
    }

    // Check for unusual timing
    const currentHour = new Date().getHours();
    if (baseline.activeHours.length > 0 && !baseline.activeHours.includes(currentHour)) {
      if (currentActivity > expectedActivity * 0.5) {
        anomalies.push({
          id: `anom-${userId}-timing-${Date.now()}`,
          type: 'user_change',
          severity: 'low',
          title: 'Activity outside usual hours',
          description: 'User is active at an unusual time compared to their pattern',
          detectedAt: new Date(),
          affectedEntity: { type: 'user', id: userId },
          metrics: { currentHour, expectedHours: baseline.activeHours },
          recommendation: 'Check if user is working overtime or in a different timezone',
        });
      }
    }

    // Check for potential spam
    const messageRate = analytics.messagesSent / Math.max(analytics.callsDuration / 60, 1);
    if (messageRate > 10) {
      // More than 10 messages per minute of calls
      anomalies.push({
        id: `anom-${userId}-spam-${Date.now()}`,
        type: 'spam_detection',
        severity: 'medium',
        title: 'Potential spam activity detected',
        description: 'User message rate is unusually high',
        detectedAt: new Date(),
        affectedEntity: { type: 'user', id: userId },
        metrics: { messageRate, threshold: 10 },
        recommendation: 'Review user messages for spam or automated activity',
      });
    }

    // Calculate overall anomaly score
    const overallScore = Math.min(100, anomalies.reduce((sum, anom) => sum + (anom.severity === 'critical' ? 30 : anom.severity === 'high' ? 20 : 10), 0));
    const riskLevel: 'low' | 'medium' | 'high' = overallScore > 60 ? 'high' : overallScore > 30 ? 'medium' : 'low';

    this.detectedAnomalies.set(userId, anomalies);

    return {
      userId,
      overallScore,
      riskLevel,
      anomalies,
      lastCheck: new Date(),
    };
  }

  /**
   * Detect room anomalies
   */
  detectRoomAnomalies(roomId: string): AnomalyScore {
    const roomAnalytics = analyticsEngine.getRoomAnalytics(roomId);
    const anomalies: Anomaly[] = [];

    // Check for unusual member activity
    if (roomAnalytics.activeMembers === 0 && roomAnalytics.messagesSent > 0) {
      anomalies.push({
        id: `anom-room-${roomId}-members-${Date.now()}`,
        type: 'unusual_activity',
        severity: 'medium',
        title: 'Room activity with no active members',
        description: 'Messages detected but no active members recorded',
        detectedAt: new Date(),
        affectedEntity: { type: 'room', id: roomId },
        metrics: { messagesSent: roomAnalytics.messagesSent, activeMembers: roomAnalytics.activeMembers },
        recommendation: 'Investigate possible data inconsistency or bot activity',
      });
    }

    // Check for sudden traffic changes
    if (roomAnalytics.totalEvents > 1000 && roomAnalytics.avgMessagesPerDay > 100) {
      anomalies.push({
        id: `anom-room-${roomId}-traffic-${Date.now()}`,
        type: 'sudden_spike',
        severity: 'low',
        title: 'High message volume in room',
        description: 'Room is experiencing unusually high message volume',
        detectedAt: new Date(),
        affectedEntity: { type: 'room', id: roomId },
        metrics: { avgMessagesPerDay: roomAnalytics.avgMessagesPerDay, totalEvents: roomAnalytics.totalEvents },
        recommendation: 'Monitor for spam or bot activity',
      });
    }

    // Calculate overall anomaly score
    const overallScore = Math.min(100, anomalies.reduce((sum, anom) => sum + (anom.severity === 'critical' ? 30 : anom.severity === 'high' ? 20 : 10), 0));
    const riskLevel: 'low' | 'medium' | 'high' = overallScore > 60 ? 'high' : overallScore > 30 ? 'medium' : 'low';

    this.detectedAnomalies.set(roomId, anomalies);

    return {
      userId: roomId,
      overallScore,
      riskLevel,
      anomalies,
      lastCheck: new Date(),
    };
  }

  /**
   * Detect system anomalies
   */
  detectSystemAnomalies(): AnomalyScore {
    const metrics = analyticsEngine.getMetrics();
    const anomalies: Anomaly[] = [];

    // Check for unusual peak hours
    const allTraffic = Object.values(metrics.peakHours);
    if (allTraffic.length > 0) {
      const avgTraffic = allTraffic.reduce((a, b) => a + b, 0) / allTraffic.length;
      const maxTraffic = Math.max(...allTraffic);

      if (maxTraffic > avgTraffic * 3) {
        anomalies.push({
          id: `anom-system-traffic-${Date.now()}`,
          type: 'sudden_spike',
          severity: 'medium',
          title: 'Unusual traffic spike detected',
          description: 'System traffic significantly exceeds normal levels',
          detectedAt: new Date(),
          affectedEntity: { type: 'system', id: 'global' },
          metrics: { peakTraffic: maxTraffic, avgTraffic },
          recommendation: 'Check system resources and investigate traffic source',
        });
      }
    }

    // Check for low activity
    if (metrics.activeUsers < 2 && Object.values(metrics.eventsByType).some((count) => count > 100)) {
      anomalies.push({
        id: `anom-system-users-${Date.now()}`,
        type: 'unusual_activity',
        severity: 'low',
        title: 'Low active users despite high event count',
        description: 'Few active users but significant event activity detected',
        detectedAt: new Date(),
        affectedEntity: { type: 'system', id: 'global' },
        metrics: { activeUsers: metrics.activeUsers, totalEvents: metrics.totalEvents },
        recommendation: 'Verify user status and check for bot or automated activity',
      });
    }

    // Calculate overall anomaly score
    const overallScore = Math.min(100, anomalies.reduce((sum, anom) => sum + (anom.severity === 'critical' ? 30 : anom.severity === 'high' ? 20 : 10), 0));
    const riskLevel: 'low' | 'medium' | 'high' = overallScore > 60 ? 'high' : overallScore > 30 ? 'medium' : 'low';

    this.detectedAnomalies.set('system', anomalies);

    return {
      userId: 'system',
      overallScore,
      riskLevel,
      anomalies,
      lastCheck: new Date(),
    };
  }

  /**
   * Get all detected anomalies
   */
  getAllAnomalies(entityType?: 'user' | 'room' | 'system'): Anomaly[] {
    const allAnomalies: Anomaly[] = [];

    this.detectedAnomalies.forEach((anomalies) => {
      anomalies.forEach((anom) => {
        if (!entityType || anom.affectedEntity.type === entityType) {
          allAnomalies.push(anom);
        }
      });
    });

    return allAnomalies.sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });
  }

  /**
   * Clear old anomalies
   */
  clearOldAnomalies(hoursOld: number = 24): number {
    const cutoffTime = new Date(Date.now() - hoursOld * 60 * 60 * 1000);
    let removed = 0;

    this.detectedAnomalies.forEach((anomalies, key) => {
      const filtered = anomalies.filter((anom) => anom.detectedAt > cutoffTime);
      removed += anomalies.length - filtered.length;

      if (filtered.length > 0) {
        this.detectedAnomalies.set(key, filtered);
      } else {
        this.detectedAnomalies.delete(key);
      }
    });

    return removed;
  }
}

// Export singleton instance
export const anomalyDetector = new AnomalyDetector();
