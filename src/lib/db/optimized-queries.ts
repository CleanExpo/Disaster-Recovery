import { prisma } from '@/lib/prisma';

/**
 * Optimized Database Queries
 *
 * Best practices for Prisma queries including:
 * - Selective field selection
 * - Batch queries
 * - Pagination defaults
 * - N+1 prevention
 * - Connection pooling
 */

export class OptimizedQueries {
  /**
   * Get user with minimal fields
   */
  static async getUserMinimal(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
      },
    });
  }

  /**
   * Get room with member count (avoid loading all members)
   */
  static async getRoomWithStats(roomId: string) {
    const room = await prisma.chatRoom.findUnique({
      where: { id: roomId },
      select: {
        id: true,
        name: true,
        description: true,
        isDirect: true,
        createdAt: true,
        _count: {
          select: {
            members: true,
            messages: true,
          },
        },
      },
    });

    return room;
  }

  /**
   * Get messages with minimal joins
   */
  static async getMessagesOptimized(roomId: string, limit: number = 50, offset: number = 0) {
    return prisma.message.findMany({
      where: { roomId },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        senderId: true,
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        isPinned: true,
        replyCount: true,
        _count: {
          select: {
            reactions: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  /**
   * Get booking with minimal related data
   */
  static async getBookingOptimized(bookingId: string) {
    return prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        status: true,
        serviceType: true,
        location: true,
        scheduledDate: true,
        customerId: true,
        contractorId: true,
        customer: {
          select: { id: true, name: true, phone: true },
        },
        contractor: {
          select: { id: true, name: true, phone: true },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Get bookings list with pagination
   */
  static async getBookingsOptimized(
    where: any = {},
    limit: number = 20,
    offset: number = 0,
    orderBy: any = { createdAt: 'desc' }
  ) {
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        select: {
          id: true,
          status: true,
          serviceType: true,
          location: true,
          scheduledDate: true,
          customer: { select: { id: true, name: true } },
          contractor: { select: { id: true, name: true } },
          createdAt: true,
        },
        orderBy,
        take: limit,
        skip: offset,
      }),
      prisma.booking.count({ where }),
    ]);

    return {
      data: bookings,
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      hasMore: offset + limit < total,
    };
  }

  /**
   * Get claims with status breakdown
   */
  static async getClaimsOptimized(
    where: any = {},
    limit: number = 20,
    offset: number = 0
  ) {
    const [claims, total] = await Promise.all([
      prisma.claim.findMany({
        where,
        select: {
          id: true,
          status: true,
          claimAmount: true,
          createdAt: true,
          customer: {
            select: { id: true, name: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.claim.count({ where }),
    ]);

    return {
      data: claims,
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      hasMore: offset + limit < total,
    };
  }

  /**
   * Batch fetch users by IDs
   */
  static async getUsersBatch(userIds: string[]) {
    if (userIds.length === 0) return [];

    return prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
      },
    });
  }

  /**
   * Batch fetch messages with reactions
   */
  static async getMessagesWithReactionsBatch(messageIds: string[]) {
    if (messageIds.length === 0) return [];

    const messages = await prisma.message.findMany({
      where: { id: { in: messageIds } },
      select: {
        id: true,
        content: true,
        senderId: true,
        createdAt: true,
        sender: {
          select: { id: true, name: true },
        },
        _count: {
          select: { reactions: true },
        },
      },
    });

    // Batch fetch reactions for all messages
    const reactions = await prisma.messageReaction.findMany({
      where: { messageId: { in: messageIds } },
      select: {
        messageId: true,
        emoji: true,
      },
    });

    // Group reactions by message
    const reactionsMap = new Map<string, string[]>();
    for (const reaction of reactions) {
      if (!reactionsMap.has(reaction.messageId)) {
        reactionsMap.set(reaction.messageId, []);
      }
      reactionsMap.get(reaction.messageId)!.push(reaction.emoji);
    }

    return messages.map((msg) => ({
      ...msg,
      reactions: reactionsMap.get(msg.id) || [],
    }));
  }

  /**
   * Get user dashboard data with single query
   */
  static async getUserDashboard(userId: string) {
    const [user, activeBookings, pendingClaims, unreadMessages] = await Promise.all([
      this.getUserMinimal(userId),
      prisma.booking.count({
        where: {
          customerId: userId,
          status: { in: ['pending', 'assigned', 'in_progress'] },
        },
      }),
      prisma.claim.count({
        where: {
          customerId: userId,
          status: { in: ['submitted', 'under_review'] },
        },
      }),
      prisma.message.count({
        where: {
          // This would need read status tracking
          senderId: { not: userId },
        },
      }),
    ]);

    return {
      user,
      stats: {
        activeBookings,
        pendingClaims,
        unreadMessages,
      },
    };
  }

  /**
   * Get room activity summary
   */
  static async getRoomActivitySummary(roomId: string, daysBack: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    const [messageCount, memberCount, topContributors] = await Promise.all([
      prisma.message.count({
        where: {
          roomId,
          createdAt: { gte: startDate },
        },
      }),
      prisma.chatRoom.findUnique({
        where: { id: roomId },
        select: {
          _count: { select: { members: true } },
        },
      }),
      prisma.message.groupBy({
        by: ['senderId'],
        where: {
          roomId,
          createdAt: { gte: startDate },
        },
        _count: true,
        orderBy: { _count: { _max: 'desc' } },
        take: 5,
      }),
    ]);

    return {
      room: roomId,
      messageCount,
      memberCount: memberCount?._count.members || 0,
      topContributors: topContributors.map((c) => ({
        userId: c.senderId,
        messageCount: c._count,
      })),
      period: `${daysBack} days`,
    };
  }

  /**
   * Get statistics with group by
   */
  static async getClaimStatisticsByStatus() {
    const stats = await prisma.claim.groupBy({
      by: ['status'],
      _count: true,
      _sum: {
        claimAmount: true,
      },
    });

    return stats.map((stat) => ({
      status: stat.status,
      count: stat._count,
      totalAmount: stat._sum.claimAmount || 0,
    }));
  }

  /**
   * Batch update messages
   */
  static async updateMessagesBatch(
    messageIds: string[],
    updates: Record<string, any>
  ) {
    if (messageIds.length === 0) return { count: 0 };

    return prisma.message.updateMany({
      where: { id: { in: messageIds } },
      data: updates,
    });
  }

  /**
   * Get connection pool stats (for monitoring)
   */
  static async getConnectionPoolStats() {
    try {
      // This gives insights into connection usage
      const result = await prisma.$queryRaw`
        SELECT
          count(*) as total_connections,
          count(*) FILTER (WHERE state = 'active') as active_connections
        FROM pg_stat_activity
        WHERE datname = current_database();
      `;
      return result;
    } catch (error) {
      console.error('Failed to get connection pool stats:', error);
      return null;
    }
  }

  /**
   * Query performance tip: Use select to avoid over-fetching
   * Before:
   *   const user = await prisma.user.findUnique({ where: { id } })
   * After:
   *   const user = await prisma.user.findUnique({
   *     where: { id },
   *     select: { id: true, name: true, email: true }
   *   })
   *
   * Query performance tip: Batch queries to reduce round trips
   * Before:
   *   const bookings = await prisma.booking.findMany(...)
   *   for (let b of bookings) {
   *     const customer = await prisma.user.findUnique({ where: { id: b.customerId } })
   *   }
   * After:
   *   const bookings = await prisma.booking.findMany({
   *     include: { customer: { select: { id: true, name: true } } }
   *   })
   */
}
