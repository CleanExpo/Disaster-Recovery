/**
 * Analytics Engine
 *
 * Comprehensive analytics tracking and aggregation system
 */

import { EventEmitter } from 'events';

export type AnalyticsEventType =
  | 'message:sent'
  | 'message:deleted'
  | 'message:edited'
  | 'message:reacted'
  | 'message:threaded'
  | 'call:initiated'
  | 'call:completed'
  | 'call:failed'
  | 'call:recorded'
  | 'file:uploaded'
  | 'file:downloaded'
  | 'file:deleted'
  | 'search:executed'
  | 'user:login'
  | 'user:logout'
  | 'room:created'
  | 'room:archived'
  | 'user:invited'
  | 'presence:online'
  | 'presence:offline';

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  userId: string;
  roomId?: string;
  timestamp: Date;
  data: Record<string, any>;
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    duration?: number;
    status?: 'success' | 'failure';
  };
}

export interface AnalyticsMetrics {
  totalEvents: number;
  eventsByType: Record<AnalyticsEventType, number>;
  activeUsers: number;
  uniqueUsers: Set<string>;
  sessionDuration: {
    min: number;
    max: number;
    avg: number;
  };
  peakHours: Record<number, number>;
  dailyStats: Record<string, DailyStats>;
}

export interface DailyStats {
  date: string;
  totalEvents: number;
  activeUsers: number;
  messagesSent: number;
  callsDuration: number;
  filesUploaded: number;
  filesDownloaded: number;
  searchQueries: number;
  topUsers: Array<{ userId: string; eventCount: number }>;
  topRooms: Array<{ roomId: string; eventCount: number }>;
}

export interface UserAnalytics {
  userId: string;
  totalEvents: number;
  messagesSent: number;
  callsInitiated: number;
  callDuration: number;
  filesUploaded: number;
  filesDownloaded: number;
  lastActive: Date;
  firstSeen: Date;
  mostActiveHours: number[];
  mostActiveRooms: string[];
}

export interface RoomAnalytics {
  roomId: string;
  totalEvents: number;
  messagesSent: number;
  callsInitiated: number;
  callDuration: number;
  filesUploaded: number;
  activeMembers: number;
  avgMessagesPerDay: number;
  createdAt: Date;
  topContributors: Array<{ userId: string; messageCount: number }>;
}

export interface PeriodAnalytics {
  period: 'day' | 'week' | 'month' | 'year';
  startDate: Date;
  endDate: Date;
  totalEvents: number;
  activeUsers: number;
  messagesSent: number;
  callsDuration: number;
  filesUploaded: number;
  filesDownloaded: number;
  growthRate: number;
  topEvents: Array<{ type: AnalyticsEventType; count: number }>;
}

/**
 * Analytics Engine - Tracks and aggregates user activity
 */
export class AnalyticsEngine extends EventEmitter {
  private events: AnalyticsEvent[] = [];
  private eventMap: Map<string, AnalyticsEvent> = new Map();
  private userSessions: Map<string, { loginTime: Date; logoutTime?: Date }> = new Map();
  private readonly maxEvents = 10000; // Keep last 10k events in memory

  /**
   * Track an analytics event
   */
  trackEvent(
    type: AnalyticsEventType,
    userId: string,
    data: Record<string, any> = {},
    metadata: AnalyticsEvent['metadata'] = {}
  ): AnalyticsEvent {
    const event: AnalyticsEvent = {
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      userId,
      timestamp: new Date(),
      data,
      metadata,
    };

    this.events.push(event);
    this.eventMap.set(event.id, event);

    // Maintain max events size
    if (this.events.length > this.maxEvents) {
      const removed = this.events.shift();
      if (removed) {
        this.eventMap.delete(removed.id);
      }
    }

    this.emit('event', event);
    return event;
  }

  /**
   * Track user session
   */
  trackSession(userId: string, action: 'login' | 'logout') {
    if (action === 'login') {
      this.userSessions.set(userId, { loginTime: new Date() });
      this.trackEvent('user:login', userId);
    } else {
      const session = this.userSessions.get(userId);
      if (session) {
        session.logoutTime = new Date();
        this.trackEvent('user:logout', userId, {
          duration: session.logoutTime.getTime() - session.loginTime.getTime(),
        });
      }
    }
  }

  /**
   * Get analytics metrics
   */
  getMetrics(): AnalyticsMetrics {
    const metrics: AnalyticsMetrics = {
      totalEvents: this.events.length,
      eventsByType: {} as Record<AnalyticsEventType, number>,
      activeUsers: 0,
      uniqueUsers: new Set(),
      sessionDuration: { min: 0, max: 0, avg: 0 },
      peakHours: {},
      dailyStats: {},
    };

    // Initialize event type counts
    const eventTypes: AnalyticsEventType[] = [
      'message:sent',
      'message:deleted',
      'message:edited',
      'message:reacted',
      'message:threaded',
      'call:initiated',
      'call:completed',
      'call:failed',
      'call:recorded',
      'file:uploaded',
      'file:downloaded',
      'file:deleted',
      'search:executed',
      'user:login',
      'user:logout',
      'room:created',
      'room:archived',
      'user:invited',
      'presence:online',
      'presence:offline',
    ];

    eventTypes.forEach((type) => {
      metrics.eventsByType[type] = 0;
    });

    // Process events
    const sessionDurations: number[] = [];

    this.events.forEach((event) => {
      metrics.eventsByType[event.type]++;
      metrics.uniqueUsers.add(event.userId);

      // Track peak hours
      const hour = event.timestamp.getHours();
      metrics.peakHours[hour] = (metrics.peakHours[hour] || 0) + 1;

      // Track daily stats
      const date = event.timestamp.toISOString().split('T')[0];
      if (!metrics.dailyStats[date]) {
        metrics.dailyStats[date] = {
          date,
          totalEvents: 0,
          activeUsers: new Set<string>(),
          messagesSent: 0,
          callsDuration: 0,
          filesUploaded: 0,
          filesDownloaded: 0,
          searchQueries: 0,
          topUsers: [],
          topRooms: [],
        } as any;
      }

      const daily = metrics.dailyStats[date];
      daily.totalEvents++;
      (daily.activeUsers as any).add(event.userId);

      if (event.type === 'message:sent') daily.messagesSent++;
      if (event.type === 'file:uploaded') daily.filesUploaded++;
      if (event.type === 'file:downloaded') daily.filesDownloaded++;
      if (event.type === 'search:executed') daily.searchQueries++;
      if (event.type === 'call:completed' && event.metadata.duration) {
        daily.callsDuration += event.metadata.duration;
      }
    });

    // Calculate active users
    metrics.activeUsers = metrics.uniqueUsers.size;

    // Calculate session durations
    this.userSessions.forEach((session) => {
      const end = session.logoutTime || new Date();
      const duration = end.getTime() - session.loginTime.getTime();
      sessionDurations.push(duration);
    });

    if (sessionDurations.length > 0) {
      metrics.sessionDuration.min = Math.min(...sessionDurations);
      metrics.sessionDuration.max = Math.max(...sessionDurations);
      metrics.sessionDuration.avg =
        sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length;
    }

    // Convert Set to count in dailyStats
    Object.values(metrics.dailyStats).forEach((daily: any) => {
      if (daily.activeUsers instanceof Set) {
        daily.activeUsers = daily.activeUsers.size;
      }
    });

    return metrics;
  }

  /**
   * Get user analytics
   */
  getUserAnalytics(userId: string): UserAnalytics {
    const userEvents = this.events.filter((e) => e.userId === userId);

    if (userEvents.length === 0) {
      return {
        userId,
        totalEvents: 0,
        messagesSent: 0,
        callsInitiated: 0,
        callDuration: 0,
        filesUploaded: 0,
        filesDownloaded: 0,
        lastActive: new Date(0),
        firstSeen: new Date(0),
        mostActiveHours: [],
        mostActiveRooms: [],
      };
    }

    const hourCounts: Record<number, number> = {};
    const roomCounts: Record<string, number> = {};

    let messagesSent = 0;
    let callsInitiated = 0;
    let callDuration = 0;
    let filesUploaded = 0;
    let filesDownloaded = 0;

    userEvents.forEach((event) => {
      const hour = event.timestamp.getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;

      if (event.roomId) {
        roomCounts[event.roomId] = (roomCounts[event.roomId] || 0) + 1;
      }

      if (event.type === 'message:sent') messagesSent++;
      if (event.type === 'call:initiated') callsInitiated++;
      if (event.type === 'call:completed' && event.metadata.duration) {
        callDuration += event.metadata.duration;
      }
      if (event.type === 'file:uploaded') filesUploaded++;
      if (event.type === 'file:downloaded') filesDownloaded++;
    });

    const mostActiveHours = Object.entries(hourCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([hour]) => parseInt(hour));

    const mostActiveRooms = Object.entries(roomCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([roomId]) => roomId);

    return {
      userId,
      totalEvents: userEvents.length,
      messagesSent,
      callsInitiated,
      callDuration,
      filesUploaded,
      filesDownloaded,
      lastActive: userEvents[userEvents.length - 1].timestamp,
      firstSeen: userEvents[0].timestamp,
      mostActiveHours,
      mostActiveRooms,
    };
  }

  /**
   * Get room analytics
   */
  getRoomAnalytics(roomId: string): RoomAnalytics {
    const roomEvents = this.events.filter((e) => e.roomId === roomId);

    if (roomEvents.length === 0) {
      return {
        roomId,
        totalEvents: 0,
        messagesSent: 0,
        callsInitiated: 0,
        callDuration: 0,
        filesUploaded: 0,
        activeMembers: 0,
        avgMessagesPerDay: 0,
        createdAt: new Date(),
        topContributors: [],
      };
    }

    const userCounts: Record<string, number> = {};
    let messagesSent = 0;
    let callsInitiated = 0;
    let callDuration = 0;
    let filesUploaded = 0;

    roomEvents.forEach((event) => {
      userCounts[event.userId] = (userCounts[event.userId] || 0) + 1;

      if (event.type === 'message:sent') messagesSent++;
      if (event.type === 'call:initiated') callsInitiated++;
      if (event.type === 'call:completed' && event.metadata.duration) {
        callDuration += event.metadata.duration;
      }
      if (event.type === 'file:uploaded') filesUploaded++;
    });

    const topContributors = Object.entries(userCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([userId, messageCount]) => ({ userId, messageCount }));

    // Calculate avg messages per day
    const firstEvent = roomEvents[0];
    const lastEvent = roomEvents[roomEvents.length - 1];
    const daysDiff = Math.max(
      1,
      Math.floor((lastEvent.timestamp.getTime() - firstEvent.timestamp.getTime()) / (1000 * 60 * 60 * 24))
    );
    const avgMessagesPerDay = messagesSent / daysDiff;

    return {
      roomId,
      totalEvents: roomEvents.length,
      messagesSent,
      callsInitiated,
      callDuration,
      filesUploaded,
      activeMembers: Object.keys(userCounts).length,
      avgMessagesPerDay,
      createdAt: firstEvent.timestamp,
      topContributors,
    };
  }

  /**
   * Get period analytics
   */
  getPeriodAnalytics(
    period: 'day' | 'week' | 'month' | 'year',
    endDate: Date = new Date()
  ): PeriodAnalytics {
    let startDate = new Date(endDate);

    switch (period) {
      case 'day':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }

    const periodEvents = this.events.filter((e) => e.timestamp >= startDate && e.timestamp <= endDate);

    const eventTypeCounts: Record<AnalyticsEventType, number> = {} as any;
    const uniqueUsers = new Set<string>();
    let messagesSent = 0;
    let callsDuration = 0;
    let filesUploaded = 0;
    let filesDownloaded = 0;

    periodEvents.forEach((event) => {
      eventTypeCounts[event.type] = (eventTypeCounts[event.type] || 0) + 1;
      uniqueUsers.add(event.userId);

      if (event.type === 'message:sent') messagesSent++;
      if (event.type === 'file:uploaded') filesUploaded++;
      if (event.type === 'file:downloaded') filesDownloaded++;
      if (event.type === 'call:completed' && event.metadata.duration) {
        callsDuration += event.metadata.duration;
      }
    });

    // Calculate growth rate compared to previous period
    const previousPeriodStart = new Date(startDate);
    previousPeriodStart.setDate(previousPeriodStart.getDate() - (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const previousPeriodEvents = this.events.filter(
      (e) => e.timestamp >= previousPeriodStart && e.timestamp < startDate
    );
    const growthRate =
      previousPeriodEvents.length > 0
        ? ((periodEvents.length - previousPeriodEvents.length) / previousPeriodEvents.length) * 100
        : 0;

    const topEvents = Object.entries(eventTypeCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type: type as AnalyticsEventType, count }));

    return {
      period,
      startDate,
      endDate,
      totalEvents: periodEvents.length,
      activeUsers: uniqueUsers.size,
      messagesSent,
      callsDuration,
      filesUploaded,
      filesDownloaded,
      growthRate,
      topEvents,
    };
  }

  /**
   * Export analytics data
   */
  exportData(format: 'json' | 'csv'): string {
    const metrics = this.getMetrics();

    if (format === 'json') {
      return JSON.stringify(metrics, null, 2);
    }

    // CSV format
    const lines: string[] = ['Date,EventType,Count,ActiveUsers'];

    Object.entries(metrics.dailyStats).forEach(([date, daily]) => {
      Object.entries(metrics.eventsByType).forEach(([type, _]) => {
        lines.push(`${date},${type},${daily.totalEvents},${daily.activeUsers}`);
      });
    });

    return lines.join('\n');
  }

  /**
   * Clear old events
   */
  clearOldEvents(daysOld: number): number {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const initialCount = this.events.length;
    this.events = this.events.filter((e) => e.timestamp > cutoffDate);

    // Update eventMap
    this.events.forEach((e) => this.eventMap.set(e.id, e));

    const removed = initialCount - this.events.length;
    return removed;
  }

  /**
   * Get total tracked events
   */
  getEventCount(): number {
    return this.events.length;
  }
}

// Export singleton instance
export const analyticsEngine = new AnalyticsEngine();
