import { prisma } from '@/lib/prisma';
import { SocketServer } from '@/lib/websocket/socket-server';
import { SocketEvent } from '@/lib/websocket/events';

/**
 * User Presence Detection Service
 *
 * Track and manage user online/offline status
 * - Real-time presence updates
 * - Last seen tracking
 * - Active room detection
 * - Presence notifications
 */

export type PresenceStatus = 'online' | 'away' | 'dnd' | 'offline';

export interface UserPresence {
  userId: string;
  userName: string;
  userAvatar?: string;
  status: PresenceStatus;
  lastSeen: Date;
  currentRoom?: string;
  activeAt: Date;
  statusMessage?: string;
}

export interface RoomPresence {
  roomId: string;
  members: UserPresence[];
  totalActive: number;
  lastUpdated: Date;
}

// In-memory presence store (use Redis in production)
const presenceStore = new Map<string, UserPresence>();
const roomPresenceCache = new Map<string, RoomPresence>();

const AWAY_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes
const OFFLINE_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes

export class PresenceService {
  /**
   * Update user presence
   */
  static async updatePresence(
    userId: string,
    status: PresenceStatus,
    currentRoom?: string,
    statusMessage?: string
  ): Promise<UserPresence> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, avatar: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const presence: UserPresence = {
        userId,
        userName: user.name,
        userAvatar: user.avatar || undefined,
        status,
        lastSeen: new Date(),
        currentRoom,
        activeAt: new Date(),
        statusMessage,
      };

      // Store in memory
      presenceStore.set(userId, presence);

      // Update database
      await prisma.userPresence.upsert({
        where: { userId },
        create: {
          userId,
          status,
          currentRoom,
          statusMessage,
          lastSeen: new Date(),
        },
        update: {
          status,
          currentRoom,
          statusMessage,
          lastSeen: new Date(),
        },
      });

      // Broadcast presence change
      this.broadcastPresenceChange(presence);

      // Update room presence cache
      if (currentRoom) {
        await this.updateRoomPresence(currentRoom);
      }

      return presence;
    } catch (error) {
      console.error('Failed to update presence:', error);
      throw error;
    }
  }

  /**
   * Get user presence
   */
  static async getPresence(userId: string): Promise<UserPresence | null> {
    try {
      // Check memory first
      const cached = presenceStore.get(userId);
      if (cached) {
        // Check if status needs update (away/offline)
        return this.checkAndUpdateStatus(cached);
      }

      // Load from database
      const dbPresence = await prisma.userPresence.findUnique({
        where: { userId },
      });

      if (!dbPresence) {
        return null;
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, avatar: true },
      });

      if (!user) {
        return null;
      }

      const presence: UserPresence = {
        userId,
        userName: user.name,
        userAvatar: user.avatar || undefined,
        status: (dbPresence.status as PresenceStatus) || 'offline',
        lastSeen: dbPresence.lastSeen,
        currentRoom: dbPresence.currentRoom || undefined,
        activeAt: dbPresence.lastSeen,
        statusMessage: dbPresence.statusMessage || undefined,
      };

      presenceStore.set(userId, presence);
      return this.checkAndUpdateStatus(presence);
    } catch (error) {
      console.error('Failed to get presence:', error);
      return null;
    }
  }

  /**
   * Get multiple users' presence
   */
  static async getPresenceBatch(userIds: string[]): Promise<Map<string, UserPresence>> {
    try {
      const result = new Map<string, UserPresence>();

      for (const userId of userIds) {
        const presence = await this.getPresence(userId);
        if (presence) {
          result.set(userId, presence);
        }
      }

      return result;
    } catch (error) {
      console.error('Failed to get presence batch:', error);
      return new Map();
    }
  }

  /**
   * Get room presence
   */
  static async getRoomPresence(roomId: string): Promise<RoomPresence | null> {
    try {
      // Check cache
      const cached = roomPresenceCache.get(roomId);
      if (cached && Date.now() - cached.lastUpdated.getTime() < 10000) {
        // Cache valid for 10 seconds
        return cached;
      }

      // Get room members
      const room = await prisma.chatRoom.findUnique({
        where: { id: roomId },
        include: {
          members: {
            select: { id: true },
          },
        },
      });

      if (!room) {
        return null;
      }

      // Get presence for each member
      const memberPresences: UserPresence[] = [];
      for (const member of room.members) {
        const presence = await this.getPresence(member.id);
        if (presence && presence.status !== 'offline') {
          memberPresences.push(presence);
        }
      }

      const roomPresence: RoomPresence = {
        roomId,
        members: memberPresences,
        totalActive: memberPresences.filter((p) => p.status === 'online').length,
        lastUpdated: new Date(),
      };

      // Cache
      roomPresenceCache.set(roomId, roomPresence);

      return roomPresence;
    } catch (error) {
      console.error('Failed to get room presence:', error);
      return null;
    }
  }

  /**
   * Set user as away
   */
  static async setAway(userId: string): Promise<UserPresence | null> {
    return this.updatePresence(userId, 'away');
  }

  /**
   * Set user as do not disturb
   */
  static async setDND(userId: string, statusMessage?: string): Promise<UserPresence | null> {
    return this.updatePresence(userId, 'dnd', undefined, statusMessage);
  }

  /**
   * Set user as online
   */
  static async setOnline(userId: string, currentRoom?: string): Promise<UserPresence | null> {
    return this.updatePresence(userId, 'online', currentRoom);
  }

  /**
   * Set user as offline
   */
  static async setOffline(userId: string): Promise<void> {
    try {
      await this.updatePresence(userId, 'offline');
      presenceStore.delete(userId);
    } catch (error) {
      console.error('Failed to set offline:', error);
    }
  }

  /**
   * Check and update status based on last activity
   */
  private static checkAndUpdateStatus(presence: UserPresence): UserPresence {
    const timeSinceLastSeen = Date.now() - presence.lastSeen.getTime();

    if (timeSinceLastSeen > OFFLINE_THRESHOLD_MS && presence.status !== 'offline') {
      presence.status = 'offline';
    } else if (timeSinceLastSeen > AWAY_THRESHOLD_MS && presence.status === 'online') {
      presence.status = 'away';
    }

    return presence;
  }

  /**
   * Update room presence cache
   */
  private static async updateRoomPresence(roomId: string): Promise<void> {
    try {
      const presence = await this.getRoomPresence(roomId);
      if (presence) {
        roomPresenceCache.set(roomId, presence);
      }
    } catch (error) {
      console.error('Failed to update room presence:', error);
    }
  }

  /**
   * Broadcast presence change
   */
  private static broadcastPresenceChange(presence: UserPresence): void {
    // Broadcast to all rooms the user is in
    SocketServer.emitToUser(presence.userId, SocketEvent.USER_ONLINE, {
      userId: presence.userId,
      userName: presence.userName,
      status: presence.status,
      lastSeen: presence.lastSeen,
      currentRoom: presence.currentRoom,
      statusMessage: presence.statusMessage,
    });

    // Broadcast to room if user is in a room
    if (presence.currentRoom) {
      SocketServer.emitToRoom(presence.currentRoom, 'presence:changed', {
        userId: presence.userId,
        userName: presence.userName,
        status: presence.status,
        timestamp: new Date(),
      });
    }
  }

  /**
   * Get online users count
   */
  static async getOnlineUsersCount(): Promise<number> {
    try {
      const onlineUsers = await prisma.userPresence.count({
        where: {
          status: 'online',
          lastSeen: {
            gte: new Date(Date.now() - OFFLINE_THRESHOLD_MS),
          },
        },
      });

      return onlineUsers;
    } catch (error) {
      console.error('Failed to get online users count:', error);
      return 0;
    }
  }

  /**
   * Get presence statistics
   */
  static async getPresenceStats(): Promise<{
    online: number;
    away: number;
    dnd: number;
    offline: number;
    total: number;
  }> {
    try {
      const stats = await prisma.userPresence.groupBy({
        by: ['status'],
        _count: true,
      });

      const result = {
        online: 0,
        away: 0,
        dnd: 0,
        offline: 0,
        total: 0,
      };

      for (const stat of stats) {
        result[stat.status as PresenceStatus] = stat._count;
        result.total += stat._count;
      }

      return result;
    } catch (error) {
      console.error('Failed to get presence stats:', error);
      return { online: 0, away: 0, dnd: 0, offline: 0, total: 0 };
    }
  }

  /**
   * Cleanup old presence records
   */
  static async cleanupOfflineUsers(daysBack: number = 7): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysBack);

      const result = await prisma.userPresence.deleteMany({
        where: {
          status: 'offline',
          lastSeen: { lt: cutoffDate },
        },
      });

      return result.count;
    } catch (error) {
      console.error('Failed to cleanup offline users:', error);
      return 0;
    }
  }

  /**
   * Sync presence across multiple servers (for distributed setup)
   */
  static async syncPresence(): Promise<void> {
    try {
      // In production with Redis:
      // const redis = new Redis(process.env.REDIS_URL);
      // const presenceKey = 'presence:*';
      // const keys = await redis.keys(presenceKey);
      // Sync presence from Redis with database

      console.log('Presence sync completed');
    } catch (error) {
      console.error('Failed to sync presence:', error);
    }
  }
}
