'use server';

import { prisma } from '@/lib/prisma';

/**
 * Search Indexing Service
 *
 * Maintains search indices for fast query performance
 * - Message indexing
 * - User indexing
 * - Room indexing
 * - Index rebuild
 * - Index maintenance
 */

export interface IndexStats {
  indexName: string;
  documentCount: number;
  indexSize: number; // bytes
  lastIndexed: Date;
  indexHealth: 'healthy' | 'degraded' | 'unhealthy';
}

export interface IndexDocument {
  id: string;
  type: 'message' | 'user' | 'room';
  content: string;
  metadata: Record<string, any>;
  timestamp: Date;
  indexed: boolean;
}

class SearchIndexingService {
  private indexCache = new Map<string, IndexDocument[]>();
  private indexStats = new Map<string, IndexStats>();
  private lastIndexTime = new Map<string, Date>();

  /**
   * Create/update message index
   */
  async indexMessage(messageId: string): Promise<boolean> {
    try {
      const message = await prisma.message.findUnique({
        where: { id: messageId },
        include: {
          sender: { select: { id: true, name: true } },
          room: { select: { id: true, name: true } },
        },
      });

      if (!message) return false;

      const indexDoc: IndexDocument = {
        id: messageId,
        type: 'message',
        content: message.content,
        metadata: {
          sender: message.sender,
          room: message.room,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        },
        timestamp: new Date(),
        indexed: true,
      };

      // Add to cache
      const key = `messages:${message.roomId}`;
      if (!this.indexCache.has(key)) {
        this.indexCache.set(key, []);
      }

      const cache = this.indexCache.get(key)!;
      const existingIndex = cache.findIndex((doc) => doc.id === messageId);

      if (existingIndex >= 0) {
        cache[existingIndex] = indexDoc;
      } else {
        cache.push(indexDoc);
      }

      this.updateIndexStats('messages', cache);
      return true;
    } catch (error) {
      console.error('Error indexing message:', error);
      return false;
    }
  }

  /**
   * Create/update user index
   */
  async indexUser(userId: string): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (!user) return false;

      const indexDoc: IndexDocument = {
        id: userId,
        type: 'user',
        content: `${user.name} ${user.email}`,
        metadata: {
          name: user.name,
          email: user.email,
        },
        timestamp: new Date(),
        indexed: true,
      };

      const key = 'users';
      if (!this.indexCache.has(key)) {
        this.indexCache.set(key, []);
      }

      const cache = this.indexCache.get(key)!;
      const existingIndex = cache.findIndex((doc) => doc.id === userId);

      if (existingIndex >= 0) {
        cache[existingIndex] = indexDoc;
      } else {
        cache.push(indexDoc);
      }

      this.updateIndexStats('users', cache);
      return true;
    } catch (error) {
      console.error('Error indexing user:', error);
      return false;
    }
  }

  /**
   * Create/update room index
   */
  async indexRoom(roomId: string): Promise<boolean> {
    try {
      const room = await prisma.chatRoom.findUnique({
        where: { id: roomId },
        select: {
          id: true,
          name: true,
          description: true,
        },
      });

      if (!room) return false;

      const indexDoc: IndexDocument = {
        id: roomId,
        type: 'room',
        content: `${room.name} ${room.description || ''}`,
        metadata: {
          name: room.name,
          description: room.description,
        },
        timestamp: new Date(),
        indexed: true,
      };

      const key = 'rooms';
      if (!this.indexCache.has(key)) {
        this.indexCache.set(key, []);
      }

      const cache = this.indexCache.get(key)!;
      const existingIndex = cache.findIndex((doc) => doc.id === roomId);

      if (existingIndex >= 0) {
        cache[existingIndex] = indexDoc;
      } else {
        cache.push(indexDoc);
      }

      this.updateIndexStats('rooms', cache);
      return true;
    } catch (error) {
      console.error('Error indexing room:', error);
      return false;
    }
  }

  /**
   * Rebuild all indices
   */
  async rebuildAllIndices(): Promise<{ success: number; failed: number }> {
    try {
      console.log('Starting index rebuild...');

      const startTime = Date.now();
      let success = 0;
      let failed = 0;

      // Clear existing indices
      this.indexCache.clear();

      // Rebuild user index
      const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true },
        take: 10000,
      });

      for (const user of users) {
        if (await this.indexUser(user.id)) {
          success++;
        } else {
          failed++;
        }
      }

      // Rebuild room index
      const rooms = await prisma.chatRoom.findMany({
        select: { id: true, name: true, description: true },
        take: 10000,
      });

      for (const room of rooms) {
        if (await this.indexRoom(room.id)) {
          success++;
        } else {
          failed++;
        }
      }

      // Rebuild message index (by room)
      const messageRooms = await prisma.chatRoom.findMany({
        select: { id: true },
        take: 1000,
      });

      for (const room of messageRooms) {
        const messages = await prisma.message.findMany({
          where: { roomId: room.id },
          select: { id: true },
          take: 1000,
        });

        for (const message of messages) {
          if (await this.indexMessage(message.id)) {
            success++;
          } else {
            failed++;
          }
        }
      }

      const duration = Date.now() - startTime;
      console.log(`Index rebuild complete: ${success} succeeded, ${failed} failed in ${duration}ms`);

      return { success, failed };
    } catch (error) {
      console.error('Error rebuilding indices:', error);
      return { success: 0, failed: 0 };
    }
  }

  /**
   * Remove document from index
   */
  async removeFromIndex(id: string, type: string): Promise<boolean> {
    try {
      let removed = false;

      // Try removing from all possible cache locations
      const keys = Array.from(this.indexCache.keys());

      for (const key of keys) {
        const cache = this.indexCache.get(key)!;
        const index = cache.findIndex((doc) => doc.id === id);

        if (index >= 0) {
          cache.splice(index, 1);
          removed = true;
          this.updateIndexStats(key, cache);
        }
      }

      return removed;
    } catch (error) {
      console.error('Error removing from index:', error);
      return false;
    }
  }

  /**
   * Get index statistics
   */
  getIndexStats(indexName?: string): IndexStats | IndexStats[] {
    if (indexName) {
      return (
        this.indexStats.get(indexName) || {
          indexName,
          documentCount: 0,
          indexSize: 0,
          lastIndexed: new Date(),
          indexHealth: 'unhealthy',
        }
      );
    }

    return Array.from(this.indexStats.values());
  }

  /**
   * Get index health
   */
  getIndexHealth(): {
    healthy: string[];
    degraded: string[];
    unhealthy: string[];
  } {
    const result = {
      healthy: [] as string[],
      degraded: [] as string[],
      unhealthy: [] as string[],
    };

    for (const [name, stats] of this.indexStats.entries()) {
      result[stats.indexHealth].push(name);
    }

    return result;
  }

  /**
   * Verify index integrity
   */
  async verifyIndexIntegrity(): Promise<boolean> {
    try {
      // Verify message indices
      const rooms = await prisma.chatRoom.findMany({ select: { id: true } });

      for (const room of rooms) {
        const messageCount = await prisma.message.count({
          where: { roomId: room.id },
        });

        const cacheKey = `messages:${room.id}`;
        const cachedCount = this.indexCache.get(cacheKey)?.length || 0;

        if (messageCount !== cachedCount) {
          console.warn(
            `Index mismatch for room ${room.id}: db has ${messageCount}, cache has ${cachedCount}`
          );
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error verifying index integrity:', error);
      return false;
    }
  }

  /**
   * Warm up indices by preloading frequently accessed data
   */
  async warmupIndices(limit: number = 100): Promise<number> {
    try {
      let indexed = 0;

      // Preload recent messages from popular rooms
      const popularRooms = await prisma.chatRoom.findMany({
        take: limit,
        orderBy: {
          messages: {
            _count: 'desc',
          },
        },
        select: { id: true },
      });

      for (const room of popularRooms) {
        const recentMessages = await prisma.message.findMany({
          where: { roomId: room.id },
          orderBy: { createdAt: 'desc' },
          take: 50,
          select: { id: true },
        });

        for (const message of recentMessages) {
          if (await this.indexMessage(message.id)) {
            indexed++;
          }
        }
      }

      // Preload all users
      const users = await prisma.user.findMany({
        select: { id: true },
        take: limit,
      });

      for (const user of users) {
        if (await this.indexUser(user.id)) {
          indexed++;
        }
      }

      return indexed;
    } catch (error) {
      console.error('Error warming up indices:', error);
      return 0;
    }
  }

  /**
   * Update index statistics
   */
  private updateIndexStats(indexName: string, cache: IndexDocument[]): void {
    const size = JSON.stringify(cache).length; // Approximate size

    const health =
      cache.length > 0 && size < 100 * 1024 * 1024 // 100MB limit
        ? 'healthy'
        : cache.length > 0
          ? 'degraded'
          : 'unhealthy';

    this.indexStats.set(indexName, {
      indexName,
      documentCount: cache.length,
      indexSize: size,
      lastIndexed: new Date(),
      indexHealth: health,
    });

    this.lastIndexTime.set(indexName, new Date());
  }

  /**
   * Get last index time
   */
  getLastIndexTime(indexName: string): Date | null {
    return this.lastIndexTime.get(indexName) || null;
  }

  /**
   * Clear all indices (use with caution)
   */
  clearAllIndices(): void {
    this.indexCache.clear();
    this.indexStats.clear();
    this.lastIndexTime.clear();
    console.log('All indices cleared');
  }
}

// Export singleton instance
export const searchIndexing = new SearchIndexingService();
