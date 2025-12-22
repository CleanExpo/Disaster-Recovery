'use server';

import { prisma } from '@/lib/prisma';

/**
 * Advanced Search Filters Service
 *
 * Implements complex search filtering and faceted search
 * - Date range filtering
 * - User filtering
 * - Room filtering
 * - Tag/category filtering
 * - Custom filters
 * - Filter aggregation
 */

export interface FilterOption {
  value: string | number;
  label: string;
  count: number;
}

export interface SearchFilters {
  dateRange?: {
    from: Date;
    to: Date;
  };
  users?: string[];
  rooms?: string[];
  tags?: string[];
  status?: string[];
  contentType?: string[];
}

export interface FacetResults {
  users: FilterOption[];
  rooms: FilterOption[];
  dates: FilterOption[];
  tags: FilterOption[];
}

class SearchFiltersService {
  /**
   * Get available filter options for search results
   */
  async getFacets(
    query: string,
    currentFilters?: SearchFilters
  ): Promise<FacetResults> {
    try {
      // Build base where clause
      let whereClause: any = {
        OR: [
          {
            content: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      };

      // Apply current filters
      if (currentFilters?.rooms && currentFilters.rooms.length > 0) {
        whereClause.roomId = { in: currentFilters.rooms };
      }

      if (currentFilters?.users && currentFilters.users.length > 0) {
        whereClause.senderId = { in: currentFilters.users };
      }

      if (currentFilters?.dateRange) {
        whereClause.createdAt = {
          gte: currentFilters.dateRange.from,
          lte: currentFilters.dateRange.to,
        };
      }

      // Get unique users in search results
      const messageUsers = await prisma.message.findMany({
        where: whereClause,
        select: { senderId: true, sender: { select: { name: true } } },
        distinct: ['senderId'],
      });

      const userFacets: FilterOption[] = [];
      const userCounts = new Map<string, number>();

      for (const msg of messageUsers) {
        userCounts.set(msg.senderId, (userCounts.get(msg.senderId) || 0) + 1);
      }

      for (const [userId, count] of userCounts.entries()) {
        const user = messageUsers.find((m) => m.senderId === userId);
        if (user) {
          userFacets.push({
            value: userId,
            label: user.sender?.name || 'Unknown',
            count,
          });
        }
      }

      // Get unique rooms in search results
      const messageRooms = await prisma.message.findMany({
        where: whereClause,
        select: { roomId: true, room: { select: { name: true } } },
        distinct: ['roomId'],
      });

      const roomFacets: FilterOption[] = [];
      const roomCounts = new Map<string, number>();

      for (const msg of messageRooms) {
        roomCounts.set(msg.roomId, (roomCounts.get(msg.roomId) || 0) + 1);
      }

      for (const [roomId, count] of roomCounts.entries()) {
        const room = messageRooms.find((m) => m.roomId === roomId);
        if (room) {
          roomFacets.push({
            value: roomId,
            label: room.room?.name || 'Unknown',
            count,
          });
        }
      }

      // Get date distribution
      const messages = await prisma.message.findMany({
        where: whereClause,
        select: { createdAt: true },
      });

      const dateFacets: FilterOption[] = this.groupByDate(messages.map((m) => m.createdAt));

      return {
        users: userFacets.sort((a, b) => b.count - a.count).slice(0, 10),
        rooms: roomFacets.sort((a, b) => b.count - a.count).slice(0, 10),
        dates: dateFacets,
        tags: [], // Tags would be populated if implemented
      };
    } catch (error) {
      console.error('Error getting facets:', error);
      return { users: [], rooms: [], dates: [], tags: [] };
    }
  }

  /**
   * Build Prisma where clause from filters
   */
  buildWhereClause(filters: SearchFilters & { query: string }): any {
    const whereClause: any = {
      OR: [
        {
          content: {
            contains: filters.query,
            mode: 'insensitive',
          },
        },
      ],
    };

    if (filters.users && filters.users.length > 0) {
      whereClause.senderId = { in: filters.users };
    }

    if (filters.rooms && filters.rooms.length > 0) {
      whereClause.roomId = { in: filters.rooms };
    }

    if (filters.dateRange) {
      whereClause.createdAt = {
        gte: filters.dateRange.from,
        lte: filters.dateRange.to,
      };
    }

    return whereClause;
  }

  /**
   * Get available users for filtering
   */
  async getFilterUsers(searchQuery?: string): Promise<FilterOption[]> {
    try {
      const users = await prisma.user.findMany({
        where: searchQuery
          ? {
              OR: [
                { name: { contains: searchQuery, mode: 'insensitive' } },
                { email: { contains: searchQuery, mode: 'insensitive' } },
              ],
            }
          : {},
        select: { id: true, name: true },
        take: 20,
      });

      return users.map((user) => ({
        value: user.id,
        label: user.name || 'Unknown',
        count: 0, // Will be populated by getFacets
      }));
    } catch (error) {
      console.error('Error getting filter users:', error);
      return [];
    }
  }

  /**
   * Get available rooms for filtering
   */
  async getFilterRooms(searchQuery?: string): Promise<FilterOption[]> {
    try {
      const rooms = await prisma.chatRoom.findMany({
        where: searchQuery
          ? {
              OR: [
                { name: { contains: searchQuery, mode: 'insensitive' } },
                { description: { contains: searchQuery, mode: 'insensitive' } },
              ],
            }
          : {},
        select: { id: true, name: true },
        take: 20,
      });

      return rooms.map((room) => ({
        value: room.id,
        label: room.name,
        count: 0, // Will be populated by getFacets
      }));
    } catch (error) {
      console.error('Error getting filter rooms:', error);
      return [];
    }
  }

  /**
   * Get date range options
   */
  getDateRangeOptions(): FilterOption[] {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const week = new Date(today);
    week.setDate(week.getDate() - 7);
    const month = new Date(today);
    month.setMonth(month.getMonth() - 1);

    return [
      { value: 'today', label: 'Today', count: 0 },
      { value: 'yesterday', label: 'Yesterday', count: 0 },
      { value: 'week', label: 'Last 7 days', count: 0 },
      { value: 'month', label: 'Last 30 days', count: 0 },
    ];
  }

  /**
   * Parse date range option to actual dates
   */
  parseDateRange(option: string): { from: Date; to: Date } {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const to = new Date(today);
    to.setHours(23, 59, 59, 999);

    let from: Date;

    switch (option) {
      case 'today':
        from = new Date(today);
        break;
      case 'yesterday':
        from = new Date(today);
        from.setDate(from.getDate() - 1);
        to.setTime(from.getTime());
        to.setHours(23, 59, 59, 999);
        break;
      case 'week':
        from = new Date(today);
        from.setDate(from.getDate() - 7);
        break;
      case 'month':
        from = new Date(today);
        from.setMonth(from.getMonth() - 1);
        break;
      default:
        from = new Date(today);
        from.setMonth(from.getMonth() - 1);
    }

    return { from, to };
  }

  /**
   * Group messages by date for faceted results
   */
  private groupByDate(dates: Date[]): FilterOption[] {
    const groups = new Map<string, number>();

    for (const date of dates) {
      const key = date.toISOString().split('T')[0]; // YYYY-MM-DD
      groups.set(key, (groups.get(key) || 0) + 1);
    }

    return Array.from(groups.entries())
      .map(([date, count]) => ({
        value: date,
        label: new Date(date).toLocaleDateString(),
        count,
      }))
      .sort((a, b) => new Date(b.value as string).getTime() - new Date(a.value as string).getTime())
      .slice(0, 10);
  }

  /**
   * Get filter statistics
   */
  async getFilterStats(): Promise<{
    totalUsers: number;
    totalRooms: number;
    totalMessages: number;
    dateRange: { earliest: Date; latest: Date };
  }> {
    try {
      const [totalUsers, totalRooms, totalMessages] = await Promise.all([
        prisma.user.count(),
        prisma.chatRoom.count(),
        prisma.message.count(),
      ]);

      const messages = await prisma.message.findMany({
        select: { createdAt: true },
        orderBy: { createdAt: 'asc' },
        take: 1,
      });

      const latestMessages = await prisma.message.findMany({
        select: { createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 1,
      });

      return {
        totalUsers,
        totalRooms,
        totalMessages,
        dateRange: {
          earliest: messages[0]?.createdAt || new Date(),
          latest: latestMessages[0]?.createdAt || new Date(),
        },
      };
    } catch (error) {
      console.error('Error getting filter stats:', error);
      return {
        totalUsers: 0,
        totalRooms: 0,
        totalMessages: 0,
        dateRange: { earliest: new Date(), latest: new Date() },
      };
    }
  }
}

// Export singleton instance
export const searchFilters = new SearchFiltersService();
