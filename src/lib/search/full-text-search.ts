'use server';

import { prisma } from '@/lib/prisma';

/**
 * Full-Text Search Service
 *
 * Implements efficient full-text search for messages, users, rooms
 * - PostgreSQL full-text search
 * - Fuzzy matching for typos
 * - Relevance ranking
 * - Search history tracking
 * - Query optimization
 */

export interface SearchResult {
  id: string;
  type: 'message' | 'user' | 'room';
  title: string;
  description?: string;
  preview?: string;
  relevance: number;
  highlights?: string[];
  metadata?: Record<string, any>;
}

export interface SearchOptions {
  query: string;
  type?: 'message' | 'user' | 'room' | 'all';
  limit?: number;
  offset?: number;
  filters?: {
    userId?: string;
    roomId?: string;
    dateFrom?: Date;
    dateTo?: Date;
    sender?: string;
  };
  sortBy?: 'relevance' | 'date' | 'popularity';
}

export interface SearchStats {
  query: string;
  results: number;
  responseTime: number;
  timestamp: Date;
  userId?: string;
}

class FullTextSearchService {
  private searchHistory: SearchStats[] = [];
  private readonly MAX_HISTORY = 1000;

  /**
   * Search messages by full-text query
   */
  async searchMessages(
    query: string,
    limit: number = 20,
    offset: number = 0,
    filters?: {
      roomId?: string;
      userId?: string;
      dateFrom?: Date;
      dateTo?: Date;
    }
  ): Promise<SearchResult[]> {
    try {
      const startTime = Date.now();

      // Build search query with filters
      let whereClause: any = {
        OR: [
          {
            content: {
              search: this.sanitizeQuery(query),
            },
          },
        ],
      };

      if (filters?.roomId) {
        whereClause.roomId = filters.roomId;
      }

      if (filters?.userId) {
        whereClause.senderId = filters.userId;
      }

      if (filters?.dateFrom || filters?.dateTo) {
        whereClause.createdAt = {};
        if (filters.dateFrom) {
          whereClause.createdAt.gte = filters.dateFrom;
        }
        if (filters.dateTo) {
          whereClause.createdAt.lte = filters.dateTo;
        }
      }

      const messages = await prisma.message.findMany({
        where: whereClause,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          room: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: {
          _relevance: {
            fields: ['content'],
            search: this.sanitizeQuery(query),
            sort: 'desc',
          },
        },
      });

      const responseTime = Date.now() - startTime;

      return messages.map((message) => ({
        id: message.id,
        type: 'message' as const,
        title: `Message by ${message.sender.name}`,
        description: message.content.substring(0, 200),
        preview: this.highlightMatches(message.content, query),
        relevance: this.calculateRelevance(message.content, query),
        metadata: {
          sender: message.sender,
          room: message.room,
          createdAt: message.createdAt,
        },
      }));
    } catch (error) {
      console.error('Error searching messages:', error);
      return [];
    }
  }

  /**
   * Search users by full-text query
   */
  async searchUsers(
    query: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<SearchResult[]> {
    try {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
        take: limit,
        skip: offset,
      });

      return users.map((user) => ({
        id: user.id,
        type: 'user' as const,
        title: user.name || 'Unknown',
        description: user.email,
        relevance: this.calculateRelevance(`${user.name} ${user.email}`, query),
        metadata: {
          email: user.email,
        },
      }));
    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  }

  /**
   * Search chat rooms by full-text query
   */
  async searchRooms(
    query: string,
    limit: number = 10,
    offset: number = 0,
    userId?: string
  ): Promise<SearchResult[]> {
    try {
      let whereClause: any = {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      };

      // Filter to rooms user has access to
      if (userId) {
        whereClause.members = {
          some: {
            id: userId,
          },
        };
      }

      const rooms = await prisma.chatRoom.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          description: true,
          _count: {
            select: {
              messages: true,
              members: true,
            },
          },
        },
        take: limit,
        skip: offset,
      });

      return rooms.map((room) => ({
        id: room.id,
        type: 'room' as const,
        title: room.name,
        description: room.description || undefined,
        relevance: this.calculateRelevance(`${room.name} ${room.description}`, query),
        metadata: {
          messageCount: room._count.messages,
          memberCount: room._count.members,
        },
      }));
    } catch (error) {
      console.error('Error searching rooms:', error);
      return [];
    }
  }

  /**
   * Unified search across all types
   */
  async search(options: SearchOptions): Promise<SearchResult[]> {
    try {
      const { query, type = 'all', limit = 20, offset = 0, filters } = options;

      const results: SearchResult[] = [];

      if (type === 'all' || type === 'message') {
        const messageResults = await this.searchMessages(
          query,
          Math.ceil(limit / 3),
          offset,
          filters
        );
        results.push(...messageResults);
      }

      if (type === 'all' || type === 'user') {
        const userResults = await this.searchUsers(
          query,
          Math.ceil(limit / 3),
          offset
        );
        results.push(...userResults);
      }

      if (type === 'all' || type === 'room') {
        const roomResults = await this.searchRooms(
          query,
          Math.ceil(limit / 3),
          offset,
          filters?.userId
        );
        results.push(...roomResults);
      }

      // Sort by relevance
      results.sort((a, b) => b.relevance - a.relevance);

      // Apply limit
      return results.slice(0, limit);
    } catch (error) {
      console.error('Error performing search:', error);
      return [];
    }
  }

  /**
   * Get search suggestions/autocomplete
   */
  async getSuggestions(
    query: string,
    limit: number = 5
  ): Promise<Array<{ text: string; type: 'recent' | 'popular' | 'user' | 'room' }>> {
    try {
      const suggestions: Array<{ text: string; type: 'recent' | 'popular' | 'user' | 'room' }> = [];

      // Recent searches
      const recentSearches = this.searchHistory
        .filter((s) => s.query.includes(query))
        .slice(-3)
        .map((s) => ({ text: s.query, type: 'recent' as const }));

      suggestions.push(...recentSearches);

      // Users matching query
      const users = await prisma.user.findMany({
        where: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        select: { name: true },
        take: 2,
      });

      suggestions.push(...users.map((u) => ({ text: u.name, type: 'user' as const })));

      // Rooms matching query
      const rooms = await prisma.chatRoom.findMany({
        where: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        select: { name: true },
        take: 2,
      });

      suggestions.push(...rooms.map((r) => ({ text: r.name, type: 'room' as const })));

      return suggestions.slice(0, limit);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      return [];
    }
  }

  /**
   * Track search query for analytics
   */
  trackSearch(stats: SearchStats): void {
    this.searchHistory.push(stats);

    // Keep only last N searches
    if (this.searchHistory.length > this.MAX_HISTORY) {
      this.searchHistory.shift();
    }
  }

  /**
   * Get popular search queries
   */
  getPopularQueries(limit: number = 10): Array<{ query: string; count: number }> {
    const queryMap = new Map<string, number>();

    for (const stat of this.searchHistory) {
      queryMap.set(stat.query, (queryMap.get(stat.query) || 0) + 1);
    }

    return Array.from(queryMap.entries())
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  /**
   * Sanitize search query for security
   */
  private sanitizeQuery(query: string): string {
    return query
      .trim()
      .replace(/[^\w\s]/g, '') // Remove special characters
      .substring(0, 500); // Limit length
  }

  /**
   * Calculate relevance score (0-1)
   */
  private calculateRelevance(text: string, query: string): number {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    // Exact match
    if (lowerText === lowerQuery) return 1.0;

    // Starts with match
    if (lowerText.startsWith(lowerQuery)) return 0.9;

    // Contains match
    if (lowerText.includes(lowerQuery)) return 0.7;

    // Word boundary match
    const queryWords = lowerQuery.split(/\s+/);
    const textWords = lowerText.split(/\s+/);
    const matches = queryWords.filter((qw) => textWords.some((tw) => tw.includes(qw)));

    return Math.min(matches.length / queryWords.length, 0.6);
  }

  /**
   * Highlight matching query terms in text
   */
  private highlightMatches(text: string, query: string): string {
    const sanitized = this.sanitizeQuery(query);
    const words = sanitized.split(/\s+/);

    let highlighted = text;
    for (const word of words) {
      const regex = new RegExp(`(${word})`, 'gi');
      highlighted = highlighted.replace(regex, '**$1**');
    }

    return highlighted.substring(0, 300);
  }

  /**
   * Get search statistics
   */
  getSearchStats() {
    return {
      totalSearches: this.searchHistory.length,
      popularQueries: this.getPopularQueries(10),
      averageResponseTime:
        this.searchHistory.length > 0
          ? this.searchHistory.reduce((sum, s) => sum + s.responseTime, 0) /
            this.searchHistory.length
          : 0,
      lastSearch: this.searchHistory[this.searchHistory.length - 1] || null,
    };
  }
}

// Export singleton instance
export const fullTextSearch = new FullTextSearchService();
