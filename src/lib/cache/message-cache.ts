import { prisma } from '@/lib/prisma';
import NodeCache from 'node-cache';

/**
 * Message Cache Service
 *
 * In-memory caching for frequently accessed messages with TTL
 */

interface CachedMessage {
  id: string;
  roomId: string;
  content: string;
  senderId: string;
  senderName: string;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  isPinned: boolean;
  replyCount: number;
  reactions?: Array<{ emoji: string; count: number }>;
}

const MESSAGE_CACHE_TTL = 3600; // 1 hour in seconds
const ROOM_MESSAGES_CACHE_TTL = 1800; // 30 minutes

// Initialize cache with TTL
const messageCache = new NodeCache({ stdTTL: MESSAGE_CACHE_TTL });
const roomMessagesCache = new NodeCache({ stdTTL: ROOM_MESSAGES_CACHE_TTL });

export class MessageCacheService {
  /**
   * Get message from cache or database
   */
  static async getMessage(messageId: string): Promise<CachedMessage | null> {
    try {
      // Check cache first
      const cached = messageCache.get<CachedMessage>(`msg:${messageId}`);
      if (cached) {
        return cached;
      }

      // Fetch from database
      const message = await prisma.message.findUnique({
        where: { id: messageId },
        include: {
          sender: { select: { id: true, name: true } },
        },
      });

      if (!message) {
        return null;
      }

      const cached_message: CachedMessage = {
        id: message.id,
        roomId: message.roomId,
        content: message.content,
        senderId: message.senderId,
        senderName: message.sender?.name || 'Unknown',
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
        isEdited: message.updatedAt > message.createdAt,
        isPinned: message.isPinned || false,
        replyCount: message.replyCount || 0,
      };

      // Cache the message
      messageCache.set(`msg:${messageId}`, cached_message);

      return cached_message;
    } catch (error) {
      console.error('Failed to get message from cache:', error);
      return null;
    }
  }

  /**
   * Get room messages from cache or database
   */
  static async getRoomMessages(
    roomId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<CachedMessage[]> {
    try {
      const cacheKey = `room:${roomId}:${limit}:${offset}`;

      // Check cache first
      const cached = roomMessagesCache.get<CachedMessage[]>(cacheKey);
      if (cached) {
        return cached;
      }

      // Fetch from database
      const messages = await prisma.message.findMany({
        where: { roomId },
        include: {
          sender: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      });

      const cachedMessages: CachedMessage[] = messages.map((msg) => ({
        id: msg.id,
        roomId: msg.roomId,
        content: msg.content,
        senderId: msg.senderId,
        senderName: msg.sender?.name || 'Unknown',
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt,
        isEdited: msg.updatedAt > msg.createdAt,
        isPinned: msg.isPinned || false,
        replyCount: msg.replyCount || 0,
      }));

      // Cache the messages
      roomMessagesCache.set(cacheKey, cachedMessages);

      return cachedMessages;
    } catch (error) {
      console.error('Failed to get room messages from cache:', error);
      return [];
    }
  }

  /**
   * Add message to cache
   */
  static addMessageToCache(message: CachedMessage): void {
    try {
      messageCache.set(`msg:${message.id}`, message);
    } catch (error) {
      console.error('Failed to add message to cache:', error);
    }
  }

  /**
   * Invalidate room cache
   */
  static invalidateRoomCache(roomId: string): void {
    try {
      // Get all keys for this room
      const keys = roomMessagesCache.keys();
      for (const key of keys) {
        if (key.startsWith(`room:${roomId}:`)) {
          roomMessagesCache.del(key);
        }
      }
    } catch (error) {
      console.error('Failed to invalidate room cache:', error);
    }
  }

  /**
   * Invalidate message cache
   */
  static invalidateMessageCache(messageId: string): void {
    try {
      messageCache.del(`msg:${messageId}`);
    } catch (error) {
      console.error('Failed to invalidate message cache:', error);
    }
  }

  /**
   * Warm cache for a room (pre-load messages)
   */
  static async warmRoomCache(roomId: string, limit: number = 100): Promise<void> {
    try {
      const messages = await this.getRoomMessages(roomId, limit, 0);
      console.log(`Warmed cache for room ${roomId} with ${messages.length} messages`);
    } catch (error) {
      console.error('Failed to warm room cache:', error);
    }
  }

  /**
   * Get popular messages (most reactions)
   */
  static async getPopularMessages(
    roomId: string,
    limit: number = 10
  ): Promise<CachedMessage[]> {
    try {
      const cacheKey = `popular:${roomId}`;

      // Check cache
      const cached = roomMessagesCache.get<CachedMessage[]>(cacheKey);
      if (cached) {
        return cached;
      }

      // Fetch from database (join with reaction counts)
      const messages = await prisma.message.findMany({
        where: { roomId },
        include: {
          sender: { select: { id: true, name: true } },
          reactions: {
            select: { emoji: true },
          },
        },
        orderBy: {
          reactions: {
            _count: 'desc',
          },
        },
        take: limit,
      });

      const cachedMessages: CachedMessage[] = messages.map((msg) => ({
        id: msg.id,
        roomId: msg.roomId,
        content: msg.content,
        senderId: msg.senderId,
        senderName: msg.sender?.name || 'Unknown',
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt,
        isEdited: msg.updatedAt > msg.createdAt,
        isPinned: msg.isPinned || false,
        replyCount: msg.replyCount || 0,
      }));

      // Cache
      roomMessagesCache.set(cacheKey, cachedMessages);

      return cachedMessages;
    } catch (error) {
      console.error('Failed to get popular messages:', error);
      return [];
    }
  }

  /**
   * Get cache statistics
   */
  static getCacheStats() {
    const messageStats = {
      keys: messageCache.getStats().keys,
      hits: messageCache.getStats().hits,
      misses: messageCache.getStats().misses,
      size: messageCache.getStats().ksize || 0,
    };

    const roomStats = {
      keys: roomMessagesCache.getStats().keys,
      hits: roomMessagesCache.getStats().hits,
      misses: roomMessagesCache.getStats().misses,
      size: roomMessagesCache.getStats().ksize || 0,
    };

    return {
      messages: messageStats,
      roomMessages: roomStats,
      totalSize: (messageStats.size + roomStats.size) / 1024, // KB
    };
  }

  /**
   * Clear all caches
   */
  static clearAllCaches(): void {
    try {
      messageCache.flushAll();
      roomMessagesCache.flushAll();
      console.log('All message caches cleared');
    } catch (error) {
      console.error('Failed to clear caches:', error);
    }
  }

  /**
   * Clear old cache entries
   */
  static cleanupExpiredCache(): number {
    try {
      const messageCount = messageCache.keys().length;
      const roomCount = roomMessagesCache.keys().length;

      // NodeCache automatically removes expired entries
      // This just logs the cleanup
      console.log(
        `Cache cleanup: ${messageCount} message entries, ${roomCount} room entries`
      );

      return messageCount + roomCount;
    } catch (error) {
      console.error('Failed to cleanup cache:', error);
      return 0;
    }
  }

  /**
   * Preload popular messages for a room
   */
  static async preloadPopularMessages(roomId: string): Promise<void> {
    try {
      await this.getPopularMessages(roomId, 20);
    } catch (error) {
      console.error('Failed to preload popular messages:', error);
    }
  }

  /**
   * Update cached message
   */
  static updateCachedMessage(messageId: string, updates: Partial<CachedMessage>): void {
    try {
      const cached = messageCache.get<CachedMessage>(`msg:${messageId}`);
      if (cached) {
        const updated = { ...cached, ...updates };
        messageCache.set(`msg:${messageId}`, updated);
      }
    } catch (error) {
      console.error('Failed to update cached message:', error);
    }
  }
}
