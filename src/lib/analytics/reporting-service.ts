/**
 * Reporting Service
 *
 * Advanced reporting and data analysis
 */

import { analyticsEngine, AnalyticsMetrics, DailyStats, UserAnalytics } from './analytics-engine';

export interface Report {
  id: string;
  name: string;
  type: 'executive' | 'detailed' | 'user' | 'room' | 'performance' | 'custom';
  period: 'day' | 'week' | 'month' | 'year';
  generatedAt: Date;
  data: Record<string, any>;
  filters?: Record<string, any>;
}

export interface ExecutiveSummary {
  period: string;
  totalEvents: number;
  activeUsers: number;
  growthTrend: 'up' | 'down' | 'stable';
  growthPercent: number;
  keyMetrics: Array<{
    label: string;
    value: number | string;
    trend: 'up' | 'down' | 'stable';
    change: number;
  }>;
  topActivities: Array<{
    activity: string;
    count: number;
    percentage: number;
  }>;
  recommendations: string[];
}

export interface PerformanceReport {
  period: string;
  avgResponseTime: number;
  errorRate: number;
  uptime: number;
  peakHour: number;
  peakHourTraffic: number;
  avgSessionDuration: number;
  concurrentUsers: number;
  systemHealth: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface UserReport {
  userId: string;
  username: string;
  joinDate: Date;
  lastActive: Date;
  totalActivity: number;
  messagesSent: number;
  callsInitiated: number;
  callsDuration: number;
  filesShared: number;
  engagementScore: number; // 0-100
  roleInCommunity: 'active' | 'moderate' | 'light' | 'inactive';
  topRooms: string[];
  trends: {
    activityTrend: 'increasing' | 'decreasing' | 'stable';
    engagementTrend: 'increasing' | 'decreasing' | 'stable';
  };
}

export interface RoomReport {
  roomId: string;
  roomName: string;
  createdAt: Date;
  memberCount: number;
  totalMessages: number;
  callsInitiated: number;
  filesShared: number;
  healthScore: number; // 0-100
  activityStatus: 'thriving' | 'active' | 'moderate' | 'declining';
  topContributors: Array<{ userId: string; contribution: number }>;
  engagementTrend: 'up' | 'down' | 'stable';
}

/**
 * Reporting Service - Generate comprehensive reports
 */
export class ReportingService {
  private reports: Map<string, Report> = new Map();

  /**
   * Generate executive summary report
   */
  generateExecutiveSummary(period: 'day' | 'week' | 'month' | 'year'): ExecutiveSummary {
    const metrics = analyticsEngine.getMetrics();
    const periodAnalytics = analyticsEngine.getPeriodAnalytics(period);

    // Calculate growth trend
    const growthPercent = periodAnalytics.growthRate;
    let growthTrend: 'up' | 'down' | 'stable' = 'stable';
    if (growthPercent > 10) growthTrend = 'up';
    if (growthPercent < -10) growthTrend = 'down';

    // Key metrics
    const keyMetrics = [
      {
        label: 'Total Messages',
        value: periodAnalytics.messagesSent,
        trend: growthTrend,
        change: growthPercent,
      },
      {
        label: 'Active Users',
        value: periodAnalytics.activeUsers,
        trend: growthTrend,
        change: growthPercent,
      },
      {
        label: 'Total Calls',
        value: (metrics.eventsByType['call:completed'] || 0) + (metrics.eventsByType['call:initiated'] || 0),
        trend: growthTrend,
        change: growthPercent,
      },
      {
        label: 'Files Shared',
        value: periodAnalytics.filesUploaded,
        trend: growthTrend,
        change: growthPercent,
      },
    ];

    // Top activities
    const topActivities = periodAnalytics.topEvents.map((event) => ({
      activity: this.formatEventType(event.type),
      count: event.count,
      percentage: (event.count / periodAnalytics.totalEvents) * 100,
    }));

    // Recommendations
    const recommendations: string[] = [];

    if (growthPercent < -20) {
      recommendations.push('Activity is declining. Consider engagement initiatives.');
    }
    if (periodAnalytics.activeUsers < 5) {
      recommendations.push('Low user engagement. Review room activity and content.');
    }
    if (periodAnalytics.messagesSent > 1000) {
      recommendations.push('High messaging volume. Ensure infrastructure can handle load.');
    }
    if (metrics.eventsByType['call:failed'] > metrics.eventsByType['call:completed'] / 2) {
      recommendations.push('High call failure rate. Check network and codec settings.');
    }

    return {
      period: this.formatPeriod(period),
      totalEvents: periodAnalytics.totalEvents,
      activeUsers: periodAnalytics.activeUsers,
      growthTrend,
      growthPercent: Math.round(growthPercent * 100) / 100,
      keyMetrics,
      topActivities,
      recommendations,
    };
  }

  /**
   * Generate detailed analytics report
   */
  generateDetailedReport(period: 'day' | 'week' | 'month' | 'year'): Report {
    const metrics = analyticsEngine.getMetrics();
    const periodAnalytics = analyticsEngine.getPeriodAnalytics(period);

    const report: Report = {
      id: `report-${Date.now()}`,
      name: `Detailed Report - ${this.formatPeriod(period)}`,
      type: 'detailed',
      period,
      generatedAt: new Date(),
      data: {
        period: this.formatPeriod(period),
        metrics,
        periodAnalytics,
        eventDistribution: this.calculateEventDistribution(metrics),
        hourlyDistribution: this.calculateHourlyDistribution(metrics),
      },
    };

    this.reports.set(report.id, report);
    return report;
  }

  /**
   * Generate user report
   */
  generateUserReport(userId: string): UserReport {
    const userAnalytics = analyticsEngine.getUserAnalytics(userId);
    const metrics = analyticsEngine.getMetrics();

    // Calculate engagement score
    const engagementScore = Math.min(
      100,
      (userAnalytics.messagesSent +
        userAnalytics.callsInitiated * 5 +
        userAnalytics.filesUploaded * 2) /
        10
    );

    // Determine role
    let roleInCommunity: 'active' | 'moderate' | 'light' | 'inactive' = 'inactive';
    if (engagementScore > 70) roleInCommunity = 'active';
    else if (engagementScore > 40) roleInCommunity = 'moderate';
    else if (engagementScore > 10) roleInCommunity = 'light';

    return {
      userId,
      username: `User-${userId.substring(0, 8)}`,
      joinDate: userAnalytics.firstSeen,
      lastActive: userAnalytics.lastActive,
      totalActivity: userAnalytics.totalEvents,
      messagesSent: userAnalytics.messagesSent,
      callsInitiated: userAnalytics.callsInitiated,
      callsDuration: userAnalytics.callDuration,
      filesShared: userAnalytics.filesUploaded,
      engagementScore: Math.round(engagementScore),
      roleInCommunity,
      topRooms: userAnalytics.mostActiveRooms,
      trends: {
        activityTrend: 'stable',
        engagementTrend: 'stable',
      },
    };
  }

  /**
   * Generate room report
   */
  generateRoomReport(roomId: string): RoomReport {
    const roomAnalytics = analyticsEngine.getRoomAnalytics(roomId);

    // Calculate health score
    const healthScore = Math.min(
      100,
      Math.round(
        (roomAnalytics.avgMessagesPerDay * 5 +
          roomAnalytics.activeMembers * 10 +
          Math.min(roomAnalytics.totalEvents, 100)) /
          2
      )
    );

    // Determine activity status
    let activityStatus: 'thriving' | 'active' | 'moderate' | 'declining' = 'declining';
    if (healthScore > 75) activityStatus = 'thriving';
    else if (healthScore > 50) activityStatus = 'active';
    else if (healthScore > 25) activityStatus = 'moderate';

    return {
      roomId,
      roomName: `Room-${roomId.substring(0, 8)}`,
      createdAt: roomAnalytics.createdAt,
      memberCount: roomAnalytics.activeMembers,
      totalMessages: roomAnalytics.messagesSent,
      callsInitiated: roomAnalytics.callsInitiated,
      filesShared: roomAnalytics.filesUploaded,
      healthScore,
      activityStatus,
      topContributors: roomAnalytics.topContributors,
      engagementTrend: 'stable',
    };
  }

  /**
   * Generate performance report
   */
  generatePerformanceReport(): PerformanceReport {
    const metrics = analyticsEngine.getMetrics();

    // Find peak hour
    let peakHour = 0;
    let peakHourTraffic = 0;
    Object.entries(metrics.peakHours).forEach(([hour, count]) => {
      if (count > peakHourTraffic) {
        peakHour = parseInt(hour);
        peakHourTraffic = count;
      }
    });

    // Calculate system health
    const avgSessionDuration = metrics.sessionDuration.avg || 0;
    let systemHealth: 'excellent' | 'good' | 'fair' | 'poor' = 'good';

    if (avgSessionDuration < 60000) systemHealth = 'poor';
    else if (avgSessionDuration < 300000) systemHealth = 'fair';
    else if (avgSessionDuration > 3600000) systemHealth = 'excellent';

    return {
      period: new Date().toISOString().split('T')[0],
      avgResponseTime: Math.round(Math.random() * 100), // Placeholder
      errorRate: 0.5, // Placeholder
      uptime: 99.9,
      peakHour,
      peakHourTraffic,
      avgSessionDuration: Math.round(avgSessionDuration / 1000),
      concurrentUsers: metrics.activeUsers,
      systemHealth,
    };
  }

  /**
   * Export report
   */
  exportReport(reportId: string, format: 'json' | 'csv' | 'pdf'): string | null {
    const report = this.reports.get(reportId);
    if (!report) return null;

    if (format === 'json') {
      return JSON.stringify(report, null, 2);
    }

    if (format === 'csv') {
      return this.convertToCsv(report.data);
    }

    // PDF would require additional library
    return null;
  }

  /**
   * Calculate event distribution
   */
  private calculateEventDistribution(metrics: AnalyticsMetrics): Record<string, number> {
    const total = Object.values(metrics.eventsByType).reduce((a, b) => a + b, 0);
    const distribution: Record<string, number> = {};

    Object.entries(metrics.eventsByType).forEach(([type, count]) => {
      distribution[type] = Math.round((count / total) * 100 * 100) / 100;
    });

    return distribution;
  }

  /**
   * Calculate hourly distribution
   */
  private calculateHourlyDistribution(metrics: AnalyticsMetrics): Record<string, number> {
    const total = Object.values(metrics.peakHours).reduce((a, b) => a + b, 0);
    const distribution: Record<string, number> = {};

    Object.entries(metrics.peakHours).forEach(([hour, count]) => {
      distribution[`Hour ${hour}`] = Math.round((count / total) * 100 * 100) / 100;
    });

    return distribution;
  }

  /**
   * Format event type for display
   */
  private formatEventType(type: string): string {
    return type.split(':').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  }

  /**
   * Format period for display
   */
  private formatPeriod(period: string): string {
    const map: Record<string, string> = {
      day: 'Daily',
      week: 'Weekly',
      month: 'Monthly',
      year: 'Yearly',
    };
    return map[period] || period;
  }

  /**
   * Convert data to CSV
   */
  private convertToCsv(data: Record<string, any>): string {
    const lines: string[] = [];

    const traverse = (obj: any, prefix = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          traverse(value, prefix ? `${prefix}.${key}` : key);
        } else if (Array.isArray(value)) {
          lines.push(`${prefix}.${key},${value.length}`);
        } else {
          lines.push(`${prefix}.${key},${value}`);
        }
      });
    };

    traverse(data);
    return lines.join('\n');
  }

  /**
   * Get all reports
   */
  getAllReports(): Report[] {
    return Array.from(this.reports.values());
  }

  /**
   * Delete report
   */
  deleteReport(reportId: string): boolean {
    return this.reports.delete(reportId);
  }
}

// Export singleton instance
export const reportingService = new ReportingService();
