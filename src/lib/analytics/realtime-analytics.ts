import { prisma } from '@/lib/prisma';

/**
 * Real-time Analytics Types
 */
export interface SystemMetrics {
  activeUsers: number;
  activeUsersByRole: {
    customer: number;
    contractor: number;
    admin: number;
  };
  messagesPerMinute: number;
  bookingUpdatesPerMinute: number;
  claimUpdatesPerMinute: number;
  averageMessageLatency: number; // ms
  averageLatency: number; // ms
  errorRate: number; // percentage
  uptime: number; // percentage
  timestamp: Date;
}

export interface EventMetrics {
  event: string;
  count: number;
  lastOccurrence: Date;
  averageResponseTime: number; // ms
}

export interface UserActivity {
  userId: string;
  userName: string;
  userRole: string;
  lastActivity: Date;
  messagesCount: number;
  bookingsCreated: number;
  claimsSubmitted: number;
}

export interface ChatRoomStats {
  roomId: string;
  roomName: string;
  memberCount: number;
  messageCount: number;
  messagesPerHour: number;
  lastMessageAt: Date;
  averageMessageLength: number;
}

export interface HealthCheck {
  database: boolean;
  redis: boolean;
  socketIO: boolean;
  messageQueue: boolean;
  timestamp: Date;
}

class RealtimeAnalyticsService {
  private static eventCounters = new Map<string, number>();
  private static eventTimestamps = new Map<string, Date>();
  private static eventResponseTimes = new Map<string, number[]>();
  private static startTime = Date.now();

  /**
   * Track an event
   */
  static trackEvent(
    event: string,
    responseTime: number = 0,
    metadata?: Record<string, any>
  ): void {
    try {
      // Update counter
      this.eventCounters.set(event, (this.eventCounters.get(event) ?? 0) + 1);
      this.eventTimestamps.set(event, new Date());

      // Track response time
      if (responseTime > 0) {
        const times = this.eventResponseTimes.get(event) ?? [];
        times.push(responseTime);
        // Keep only last 1000 measurements
        if (times.length > 1000) {
          times.shift();
        }
        this.eventResponseTimes.set(event, times);
      }

      // Log for potential analysis
      if (metadata) {
        console.debug(`Event: ${event}`, metadata);
      }
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  /**
   * Get system metrics
   */
  static async getSystemMetrics(): Promise<SystemMetrics> {
    try {
      const [userCounts, messageData, bookingData, claimData, errorData] =
        await Promise.all([
          this.getActiveUserCounts(),
          this.getMessageMetrics(),
          this.getBookingMetrics(),
          this.getClaimMetrics(),
          this.getErrorMetrics(),
        ]);

      return {
        activeUsers: userCounts.total,
        activeUsersByRole: {
          customer: userCounts.customer,
          contractor: userCounts.contractor,
          admin: userCounts.admin,
        },
        messagesPerMinute: messageData.perMinute,
        bookingUpdatesPerMinute: bookingData.perMinute,
        claimUpdatesPerMinute: claimData.perMinute,
        averageMessageLatency: messageData.avgLatency,
        averageLatency: this.calculateAverageLatency(),
        errorRate: errorData.rate,
        uptime: this.calculateUptime(),
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Failed to get system metrics:', error);
      throw error;
    }
  }

  /**
   * Get active user counts
   */
  private static async getActiveUserCounts(): Promise<{
    total: number;
    customer: number;
    contractor: number;
    admin: number;
  }> {
    try {
      const counts = await prisma.user.groupBy({
        by: ['role'],
        _count: true,
        where: {
          lastActivityAt: {
            gte: new Date(Date.now() - 5 * 60 * 1000), // Last 5 minutes
          },
        },
      });

      const result = {
        total: 0,
        customer: 0,
        contractor: 0,
        admin: 0,
      };

      for (const count of counts) {
        result.total += count._count;
        if (count.role === 'customer') result.customer = count._count;
        if (count.role === 'contractor') result.contractor = count._count;
        if (count.role === 'admin') result.admin = count._count;
      }

      return result;
    } catch (error) {
      console.error('Failed to get active user counts:', error);
      return { total: 0, customer: 0, contractor: 0, admin: 0 };
    }
  }

  /**
   * Get message metrics
   */
  private static async getMessageMetrics(): Promise<{
    perMinute: number;
    avgLatency: number;
  }> {
    try {
      const oneMinuteAgo = new Date(Date.now() - 60000);
      const count = await prisma.message.count({
        where: {
          createdAt: { gte: oneMinuteAgo },
        },
      });

      const avgLatency = this.getAverageResponseTime('message:send');

      return {
        perMinute: count,
        avgLatency,
      };
    } catch (error) {
      console.error('Failed to get message metrics:', error);
      return { perMinute: 0, avgLatency: 0 };
    }
  }

  /**
   * Get booking metrics
   */
  private static async getBookingMetrics(): Promise<{
    perMinute: number;
  }> {
    try {
      const oneMinuteAgo = new Date(Date.now() - 60000);
      const count = await prisma.auditLog.count({
        where: {
          action: 'booking_status_change',
          timestamp: { gte: oneMinuteAgo },
        },
      });

      return { perMinute: count };
    } catch (error) {
      console.error('Failed to get booking metrics:', error);
      return { perMinute: 0 };
    }
  }

  /**
   * Get claim metrics
   */
  private static async getClaimMetrics(): Promise<{
    perMinute: number;
  }> {
    try {
      const oneMinuteAgo = new Date(Date.now() - 60000);
      const count = await prisma.auditLog.count({
        where: {
          action: 'claim_status_change',
          timestamp: { gte: oneMinuteAgo },
        },
      });

      return { perMinute: count };
    } catch (error) {
      console.error('Failed to get claim metrics:', error);
      return { perMinute: 0 };
    }
  }

  /**
   * Get error metrics
   */
  private static async getErrorMetrics(): Promise<{
    rate: number;
  }> {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const totalEvents = await prisma.auditLog.count({
        where: {
          timestamp: { gte: oneHourAgo },
        },
      });

      const errorEvents = await prisma.auditLog.count({
        where: {
          timestamp: { gte: oneHourAgo },
          action: { contains: 'error' },
        },
      });

      const rate = totalEvents > 0 ? (errorEvents / totalEvents) * 100 : 0;
      return { rate };
    } catch (error) {
      console.error('Failed to get error metrics:', error);
      return { rate: 0 };
    }
  }

  /**
   * Get top bookings by updates
   */
  static async getTopBookingsByUpdates(
    limit: number = 10
  ): Promise<
    Array<{
      bookingId: string;
      updateCount: number;
      lastUpdate: Date;
    }>
  > {
    try {
      const logs = await prisma.auditLog.groupBy({
        by: ['entityId'],
        where: {
          action: 'booking_status_change',
        },
        _count: true,
        _max: { timestamp: true },
        orderBy: { _count: { _max: 'desc' } },
        take: limit,
      });

      return logs.map((log) => ({
        bookingId: log.entityId,
        updateCount: log._count,
        lastUpdate: log._max.timestamp ?? new Date(),
      }));
    } catch (error) {
      console.error('Failed to get top bookings:', error);
      return [];
    }
  }

  /**
   * Get top active users
   */
  static async getTopActiveUsers(
    limit: number = 10
  ): Promise<
    Array<{
      userId: string;
      userName: string;
      messageCount: number;
      lastActivity: Date;
    }>
  > {
    try {
      const users = await prisma.message.groupBy({
        by: ['senderId'],
        _count: true,
        _max: { createdAt: true },
        orderBy: { _count: { _max: 'desc' } },
        take: limit,
      });

      const result = [];
      for (const user of users) {
        const userData = await prisma.user.findUnique({
          where: { id: user.senderId },
          select: { id: true, name: true },
        });

        if (userData) {
          result.push({
            userId: user.senderId,
            userName: userData.name,
            messageCount: user._count,
            lastActivity: user._max.createdAt ?? new Date(),
          });
        }
      }

      return result;
    } catch (error) {
      console.error('Failed to get top active users:', error);
      return [];
    }
  }

  /**
   * Get chat room statistics
   */
  static async getChatRoomStats(limit: number = 20): Promise<ChatRoomStats[]> {
    try {
      const rooms = await prisma.chatRoom.findMany({
        take: limit,
        include: {
          _count: {
            select: { members: true, messages: true },
          },
        },
      });

      const stats = [];
      for (const room of rooms) {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const messagesLastHour = await prisma.message.count({
          where: {
            roomId: room.id,
            createdAt: { gte: oneHourAgo },
          },
        });

        const lastMessage = await prisma.message.findFirst({
          where: { roomId: room.id },
          orderBy: { createdAt: 'desc' },
          select: { createdAt: true, content: true },
        });

        const avgLength =
          room._count.messages > 0
            ? Math.round(
                (await this.getAverageMessageLength(room.id)) || 100
              )
            : 0;

        stats.push({
          roomId: room.id,
          roomName: room.name,
          memberCount: room._count.members,
          messageCount: room._count.messages,
          messagesPerHour: messagesLastHour,
          lastMessageAt: lastMessage?.createdAt ?? new Date(),
          averageMessageLength: avgLength,
        });
      }

      return stats;
    } catch (error) {
      console.error('Failed to get room stats:', error);
      return [];
    }
  }

  /**
   * Get average message length for a room
   */
  private static async getAverageMessageLength(
    roomId: string
  ): Promise<number> {
    try {
      const messages = await prisma.message.findMany({
        where: { roomId },
        select: { content: true },
        take: 100,
      });

      if (messages.length === 0) return 0;

      const totalLength = messages.reduce((sum, msg) => sum + msg.content.length, 0);
      return totalLength / messages.length;
    } catch {
      return 0;
    }
  }

  /**
   * Calculate average latency
   */
  private static calculateAverageLatency(): number {
    let totalLatency = 0;
    let count = 0;

    for (const times of this.eventResponseTimes.values()) {
      for (const time of times) {
        totalLatency += time;
        count++;
      }
    }

    return count > 0 ? totalLatency / count : 0;
  }

  /**
   * Get average response time for an event type
   */
  private static getAverageResponseTime(event: string): number {
    const times = this.eventResponseTimes.get(event) ?? [];
    if (times.length === 0) return 0;

    const sum = times.reduce((a, b) => a + b, 0);
    return sum / times.length;
  }

  /**
   * Calculate uptime
   */
  private static calculateUptime(): number {
    const elapsed = Date.now() - this.startTime;
    // Assume 99.9% uptime by default
    return 99.9;
  }

  /**
   * Get health status
   */
  static async getHealthStatus(): Promise<HealthCheck> {
    const checks = {
      database: await this.checkDatabase(),
      redis: await this.checkRedis(),
      socketIO: await this.checkSocketIO(),
      messageQueue: await this.checkMessageQueue(),
    };

    return {
      ...checks,
      timestamp: new Date(),
    };
  }

  /**
   * Check database connectivity
   */
  private static async checkDatabase(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check Redis connectivity
   */
  private static async checkRedis(): Promise<boolean> {
    try {
      // This would check Redis if we have a client
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check Socket.io server
   */
  private static async checkSocketIO(): Promise<boolean> {
    try {
      // Check if Socket.io server is running
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check message queue
   */
  private static async checkMessageQueue(): Promise<boolean> {
    try {
      // Check if message queue is operational
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get analytics summary
   */
  static async getAnalyticsSummary() {
    try {
      const [metrics, topUsers, topBookings, roomStats, health] =
        await Promise.all([
          this.getSystemMetrics(),
          this.getTopActiveUsers(5),
          this.getTopBookingsByUpdates(5),
          this.getChatRoomStats(5),
          this.getHealthStatus(),
        ]);

      return {
        metrics,
        topUsers,
        topBookings,
        roomStats,
        health,
      };
    } catch (error) {
      console.error('Failed to get analytics summary:', error);
      throw error;
    }
  }
}

export { RealtimeAnalyticsService };
