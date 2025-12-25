/**
 * Call Analytics Service
 *
 * Track and analyze call metrics, patterns, and statistics
 */

export interface CallMetrics {
  callId: string;
  userId: string;
  participantId: string;
  callType: 'voice' | 'video';
  direction: 'incoming' | 'outgoing';
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  status: 'completed' | 'missed' | 'rejected';
  audioQuality: 'low' | 'medium' | 'high';
  videoQuality?: 'low' | 'medium' | 'high';
  averageBitrate: number; // in kbps
  packetLoss: number; // percentage
  latency: number; // in ms
  jitter: number; // in ms
  bandwidth: {
    incoming: number; // kbps
    outgoing: number; // kbps
  };
}

export interface DailyCallStats {
  date: Date;
  totalCalls: number;
  incomingCalls: number;
  outgoingCalls: number;
  missedCalls: number;
  rejectedCalls: number;
  totalDuration: number; // in seconds
  averageCallDuration: number;
  videoCallCount: number;
  voiceCallCount: number;
}

export interface UserCallStats {
  userId: string;
  totalCalls: number;
  incomingCalls: number;
  outgoingCalls: number;
  missedCalls: number;
  rejectedCalls: number;
  totalCallDuration: number; // in seconds
  averageCallDuration: number;
  videoCallCount: number;
  voiceCallCount: number;
  mostFrequentContacts: Array<{ userId: string; callCount: number }>;
  callQualityAverage: 'low' | 'medium' | 'high';
  lastCallTime?: Date;
}

export interface CallQualityMetrics {
  callId: string;
  avgBitrate: number;
  packetLoss: number;
  latency: number;
  jitter: number;
  audioQuality: string;
  videoQuality?: string;
  qualityScore: number; // 0-100
}

interface CallAnalyticsCache {
  metrics: Map<string, CallMetrics>;
  dailyStats: Map<string, DailyCallStats>;
  userStats: Map<string, UserCallStats>;
}

/**
 * CallAnalyticsService
 *
 * Collects and analyzes call metrics for performance monitoring
 */
class CallAnalyticsService {
  private cache: CallAnalyticsCache;
  private readonly MAX_CACHE_SIZE = 10000;

  constructor() {
    this.cache = {
      metrics: new Map(),
      dailyStats: new Map(),
      userStats: new Map(),
    };
  }

  /**
   * Record call metrics
   */
  recordCallMetrics(metrics: CallMetrics): void {
    // Check cache size and evict old entries if needed
    if (this.cache.metrics.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.cache.metrics.keys().next().value;
      if (firstKey) {
        this.cache.metrics.delete(firstKey);
      }
    }

    this.cache.metrics.set(metrics.callId, metrics);

    // Update daily stats
    this.updateDailyStats(metrics);

    // Update user stats
    this.updateUserStats(metrics);
  }

  /**
   * Get call metrics by ID
   */
  getCallMetrics(callId: string): CallMetrics | undefined {
    return this.cache.metrics.get(callId);
  }

  /**
   * Get all metrics for user
   */
  getUserMetrics(userId: string): CallMetrics[] {
    return Array.from(this.cache.metrics.values()).filter(
      (m) => m.userId === userId || m.participantId === userId
    );
  }

  /**
   * Get daily statistics
   */
  getDailyStats(date: Date): DailyCallStats | undefined {
    const key = date.toISOString().split('T')[0];
    return this.cache.dailyStats.get(key);
  }

  /**
   * Get daily stats for date range
   */
  getDailyStatsRange(startDate: Date, endDate: Date): DailyCallStats[] {
    const stats: DailyCallStats[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      const key = current.toISOString().split('T')[0];
      const stat = this.cache.dailyStats.get(key);

      if (stat) {
        stats.push(stat);
      }

      current.setDate(current.getDate() + 1);
    }

    return stats;
  }

  /**
   * Get user call statistics
   */
  getUserStats(userId: string): UserCallStats | undefined {
    return this.cache.userStats.get(userId);
  }

  /**
   * Get call quality metrics
   */
  getCallQualityMetrics(callId: string): CallQualityMetrics | null {
    const metrics = this.cache.metrics.get(callId);
    if (!metrics) return null;

    const qualityScore = this.calculateQualityScore(metrics);

    return {
      callId,
      avgBitrate: metrics.averageBitrate,
      packetLoss: metrics.packetLoss,
      latency: metrics.latency,
      jitter: metrics.jitter,
      audioQuality: metrics.audioQuality,
      videoQuality: metrics.videoQuality,
      qualityScore,
    };
  }

  /**
   * Calculate quality score (0-100)
   */
  private calculateQualityScore(metrics: CallMetrics): number {
    let score = 100;

    // Deduct for packet loss
    score -= metrics.packetLoss * 2; // 0.5% loss = 1 point deduction

    // Deduct for latency
    if (metrics.latency > 150) {
      score -= (metrics.latency - 150) * 0.1; // Over 150ms = deduction
    }

    // Deduct for jitter
    if (metrics.jitter > 30) {
      score -= (metrics.jitter - 30) * 0.5; // Over 30ms = deduction
    }

    // Deduct for low bitrate
    if (metrics.averageBitrate < 100) {
      score -= 10; // Low bitrate = 10 point deduction
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Update daily statistics
   */
  private updateDailyStats(metrics: CallMetrics): void {
    const key = metrics.startTime.toISOString().split('T')[0];
    let stats = this.cache.dailyStats.get(key);

    if (!stats) {
      stats = {
        date: metrics.startTime,
        totalCalls: 0,
        incomingCalls: 0,
        outgoingCalls: 0,
        missedCalls: 0,
        rejectedCalls: 0,
        totalDuration: 0,
        averageCallDuration: 0,
        videoCallCount: 0,
        voiceCallCount: 0,
      };
    }

    stats.totalCalls++;

    if (metrics.direction === 'incoming') {
      stats.incomingCalls++;
    } else {
      stats.outgoingCalls++;
    }

    if (metrics.status === 'missed') {
      stats.missedCalls++;
    } else if (metrics.status === 'rejected') {
      stats.rejectedCalls++;
    }

    stats.totalDuration += metrics.duration;
    stats.averageCallDuration = Math.round(stats.totalDuration / stats.totalCalls);

    if (metrics.callType === 'video') {
      stats.videoCallCount++;
    } else {
      stats.voiceCallCount++;
    }

    this.cache.dailyStats.set(key, stats);
  }

  /**
   * Update user statistics
   */
  private updateUserStats(metrics: CallMetrics): void {
    // Update stats for call initiator
    this.updateUserStatsForUser(metrics.userId, metrics);

    // Update stats for participant
    this.updateUserStatsForUser(metrics.participantId, metrics);
  }

  /**
   * Update stats for specific user
   */
  private updateUserStatsForUser(userId: string, metrics: CallMetrics): void {
    let stats = this.cache.userStats.get(userId);
    const isInitiator = metrics.userId === userId;

    if (!stats) {
      stats = {
        userId,
        totalCalls: 0,
        incomingCalls: 0,
        outgoingCalls: 0,
        missedCalls: 0,
        rejectedCalls: 0,
        totalCallDuration: 0,
        averageCallDuration: 0,
        videoCallCount: 0,
        voiceCallCount: 0,
        mostFrequentContacts: [],
        callQualityAverage: 'medium',
        lastCallTime: metrics.endTime,
      };
    }

    stats.totalCalls++;

    if (isInitiator) {
      stats.outgoingCalls++;
    } else {
      stats.incomingCalls++;
    }

    if (metrics.status === 'missed') {
      stats.missedCalls++;
    } else if (metrics.status === 'rejected') {
      stats.rejectedCalls++;
    }

    stats.totalCallDuration += metrics.duration;
    stats.averageCallDuration = Math.round(stats.totalCallDuration / stats.totalCalls);

    if (metrics.callType === 'video') {
      stats.videoCallCount++;
    } else {
      stats.voiceCallCount++;
    }

    // Update most frequent contacts
    const contactId = isInitiator ? metrics.participantId : metrics.userId;
    const existingContact = stats.mostFrequentContacts.find((c) => c.userId === contactId);

    if (existingContact) {
      existingContact.callCount++;
    } else {
      stats.mostFrequentContacts.push({ userId: contactId, callCount: 1 });
    }

    // Keep only top 10 contacts
    stats.mostFrequentContacts.sort((a, b) => b.callCount - a.callCount);
    stats.mostFrequentContacts = stats.mostFrequentContacts.slice(0, 10);

    // Calculate average quality
    stats.callQualityAverage = this.getQualityLevel(metrics.audioQuality);

    stats.lastCallTime = metrics.endTime;

    this.cache.userStats.set(userId, stats);
  }

  /**
   * Get quality level (low/medium/high)
   */
  private getQualityLevel(quality: string): 'low' | 'medium' | 'high' {
    switch (quality.toLowerCase()) {
      case 'high':
        return 'high';
      case 'low':
        return 'low';
      default:
        return 'medium';
    }
  }

  /**
   * Get analytics summary for dashboard
   */
  getAnalyticsSummary(userId: string, days: number = 30): {
    userStats: UserCallStats | undefined;
    dailyStats: DailyCallStats[];
    totalMetrics: number;
    qualityScore: number;
  } {
    const userStats = this.cache.userStats.get(userId);

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const dailyStats = this.getDailyStatsRange(startDate, endDate);

    const userMetrics = this.getUserMetrics(userId);
    const totalMetrics = userMetrics.length;

    let qualityScore = 0;
    if (totalMetrics > 0) {
      const scores = userMetrics.map((m) => this.calculateQualityScore(m));
      qualityScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }

    return {
      userStats,
      dailyStats,
      totalMetrics,
      qualityScore,
    };
  }

  /**
   * Export metrics as JSON
   */
  exportMetrics(userId: string, format: 'json' | 'csv' = 'json'): string {
    const metrics = this.getUserMetrics(userId);

    if (format === 'json') {
      return JSON.stringify(metrics, null, 2);
    }

    // CSV format
    const headers = [
      'callId',
      'participantId',
      'callType',
      'direction',
      'duration',
      'status',
      'audioQuality',
      'videoQuality',
      'averageBitrate',
      'packetLoss',
      'latency',
      'jitter',
    ];

    const rows = metrics.map((m) => [
      m.callId,
      m.participantId,
      m.callType,
      m.direction,
      m.duration,
      m.status,
      m.audioQuality,
      m.videoQuality || '',
      m.averageBitrate,
      m.packetLoss,
      m.latency,
      m.jitter,
    ]);

    return [headers, ...rows].map((row) => row.join(',')).join('\n');
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.metrics.clear();
    this.cache.dailyStats.clear();
    this.cache.userStats.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    metricsCount: number;
    dailyStatsCount: number;
    userStatsCount: number;
  } {
    return {
      metricsCount: this.cache.metrics.size,
      dailyStatsCount: this.cache.dailyStats.size,
      userStatsCount: this.cache.userStats.size,
    };
  }
}

// Export singleton instance
export const callAnalytics = new CallAnalyticsService();
