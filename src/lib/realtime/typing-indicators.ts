/**
 * Typing Indicators Service
 *
 * Real-time typing status with debouncing and timeout
 * - Show who is typing in a room
 * - Automatic timeout
 * - Network-efficient broadcasting
 * - Multiple users typing support
 */

export interface TypingUser {
  userId: string;
  userName: string;
  startedAt: Date;
  lastUpdateAt: Date;
}

export interface RoomTypingStatus {
  roomId: string;
  typingUsers: TypingUser[];
  lastUpdate: Date;
}

// In-memory typing status store
const typingStore = new Map<string, Map<string, TypingUser>>();

const TYPING_TIMEOUT_MS = 3000; // 3 seconds before timeout
const TYPING_DEBOUNCE_MS = 300; // 300ms debounce

// Cleanup intervals
const cleanupIntervals = new Map<string, NodeJS.Timeout>();

export class TypingIndicatorService {
  /**
   * Mark user as typing in a room
   */
  static setTyping(roomId: string, userId: string, userName: string): void {
    try {
      // Get or create room typing status
      if (!typingStore.has(roomId)) {
        typingStore.set(roomId, new Map());
      }

      const roomTyping = typingStore.get(roomId)!;

      // Update or create user typing status
      const now = new Date();
      roomTyping.set(userId, {
        userId,
        userName,
        startedAt: roomTyping.has(userId) ? roomTyping.get(userId)!.startedAt : now,
        lastUpdateAt: now,
      });

      // Set timeout to remove user from typing list
      this.setTypingTimeout(roomId, userId);
    } catch (error) {
      console.error('Failed to set typing:', error);
    }
  }

  /**
   * Mark user as not typing
   */
  static stopTyping(roomId: string, userId: string): void {
    try {
      const roomTyping = typingStore.get(roomId);
      if (roomTyping) {
        roomTyping.delete(userId);

        // Cleanup room if no one is typing
        if (roomTyping.size === 0) {
          typingStore.delete(roomId);
          this.clearTypingTimeout(roomId);
        }
      }
    } catch (error) {
      console.error('Failed to stop typing:', error);
    }
  }

  /**
   * Get typing users in a room
   */
  static getTypingUsers(roomId: string): TypingUser[] {
    try {
      const roomTyping = typingStore.get(roomId);
      if (!roomTyping) {
        return [];
      }

      const now = new Date();
      const typingUsers: TypingUser[] = [];

      // Filter out users who have timed out
      for (const [userId, typingUser] of roomTyping) {
        const timeSinceLastUpdate = now.getTime() - typingUser.lastUpdateAt.getTime();
        if (timeSinceLastUpdate < TYPING_TIMEOUT_MS) {
          typingUsers.push(typingUser);
        } else {
          roomTyping.delete(userId);
        }
      }

      return typingUsers;
    } catch (error) {
      console.error('Failed to get typing users:', error);
      return [];
    }
  }

  /**
   * Get typing status for a room
   */
  static getRoomTypingStatus(roomId: string): RoomTypingStatus {
    const typingUsers = this.getTypingUsers(roomId);

    return {
      roomId,
      typingUsers,
      lastUpdate: new Date(),
    };
  }

  /**
   * Check if a specific user is typing
   */
  static isUserTyping(roomId: string, userId: string): boolean {
    const typingUsers = this.getTypingUsers(roomId);
    return typingUsers.some((u) => u.userId === userId);
  }

  /**
   * Get typing count in room
   */
  static getTypingCount(roomId: string): number {
    return this.getTypingUsers(roomId).length;
  }

  /**
   * Get typing users display text
   */
  static getTypingDisplayText(roomId: string): string {
    const typingUsers = this.getTypingUsers(roomId);

    if (typingUsers.length === 0) {
      return '';
    }

    if (typingUsers.length === 1) {
      return `${typingUsers[0].userName} is typing...`;
    }

    if (typingUsers.length === 2) {
      return `${typingUsers[0].userName} and ${typingUsers[1].userName} are typing...`;
    }

    return `${typingUsers
      .slice(0, 2)
      .map((u) => u.userName)
      .join(', ')} and ${typingUsers.length - 2} more are typing...`;
  }

  /**
   * Clear all typing users from a room (e.g., room deleted)
   */
  static clearRoomTyping(roomId: string): void {
    try {
      typingStore.delete(roomId);
      this.clearTypingTimeout(roomId);
    } catch (error) {
      console.error('Failed to clear room typing:', error);
    }
  }

  /**
   * Remove user from all rooms (e.g., user disconnected)
   */
  static clearUserTyping(userId: string): void {
    try {
      for (const [roomId, roomTyping] of typingStore) {
        if (roomTyping.has(userId)) {
          roomTyping.delete(userId);

          // Cleanup room if empty
          if (roomTyping.size === 0) {
            typingStore.delete(roomId);
            this.clearTypingTimeout(roomId);
          }
        }
      }
    } catch (error) {
      console.error('Failed to clear user typing:', error);
    }
  }

  /**
   * Get all rooms with active typing
   */
  static getRoomsWithTyping(): string[] {
    const rooms: string[] = [];

    for (const [roomId, roomTyping] of typingStore) {
      if (roomTyping.size > 0) {
        rooms.push(roomId);
      }
    }

    return rooms;
  }

  /**
   * Get typing statistics
   */
  static getTypingStats(): {
    totalRooms: number;
    totalUsers: number;
    averageTypingDuration: number;
  } {
    let totalUsers = 0;
    let totalDuration = 0;
    const now = new Date();

    for (const roomTyping of typingStore.values()) {
      for (const typingUser of roomTyping.values()) {
        totalUsers++;
        const duration = now.getTime() - typingUser.startedAt.getTime();
        totalDuration += duration;
      }
    }

    return {
      totalRooms: typingStore.size,
      totalUsers,
      averageTypingDuration: totalUsers > 0 ? totalDuration / totalUsers : 0,
    };
  }

  /**
   * Set timeout for removing user from typing list
   */
  private static setTypingTimeout(roomId: string, userId: string): void {
    try {
      // Clear existing timeout for this user if any
      const timeoutKey = `${roomId}:${userId}`;

      // Timeout will be handled by getTypingUsers() checking lastUpdateAt
      // This is a simpler approach that doesn't require individual timeouts
    } catch (error) {
      console.error('Failed to set typing timeout:', error);
    }
  }

  /**
   * Clear typing timeout for room
   */
  private static clearTypingTimeout(roomId: string): void {
    try {
      const interval = cleanupIntervals.get(roomId);
      if (interval) {
        clearInterval(interval);
        cleanupIntervals.delete(roomId);
      }
    } catch (error) {
      console.error('Failed to clear typing timeout:', error);
    }
  }

  /**
   * Start global typing cleanup (periodic cleanup of stale entries)
   */
  static startGlobalCleanup(intervalMs: number = 5000): void {
    try {
      setInterval(() => {
        const now = new Date();

        for (const [roomId, roomTyping] of typingStore) {
          let hasChanges = false;

          for (const [userId, typingUser] of roomTyping) {
            const timeSinceLastUpdate = now.getTime() - typingUser.lastUpdateAt.getTime();
            if (timeSinceLastUpdate > TYPING_TIMEOUT_MS) {
              roomTyping.delete(userId);
              hasChanges = true;
            }
          }

          // Cleanup empty rooms
          if (roomTyping.size === 0) {
            typingStore.delete(roomId);
            this.clearTypingTimeout(roomId);
          }
        }
      }, intervalMs);

      console.log('Global typing cleanup started');
    } catch (error) {
      console.error('Failed to start global cleanup:', error);
    }
  }

  /**
   * Check debounce - avoid sending too many typing updates
   */
  static shouldSendTypingUpdate(roomId: string, userId: string): boolean {
    try {
      const roomTyping = typingStore.get(roomId);
      if (!roomTyping || !roomTyping.has(userId)) {
        return true; // First time typing
      }

      const typingUser = roomTyping.get(userId)!;
      const timeSinceLastUpdate = Date.now() - typingUser.lastUpdateAt.getTime();

      return timeSinceLastUpdate >= TYPING_DEBOUNCE_MS;
    } catch (error) {
      console.error('Failed to check debounce:', error);
      return true;
    }
  }

  /**
   * Get memory usage
   */
  static getMemoryUsage(): {
    totalRooms: number;
    totalUsers: number;
    estimatedBytes: number;
  } {
    let totalUsers = 0;

    for (const roomTyping of typingStore.values()) {
      totalUsers += roomTyping.size;
    }

    // Rough estimate: ~500 bytes per typing user
    const estimatedBytes = totalUsers * 500;

    return {
      totalRooms: typingStore.size,
      totalUsers,
      estimatedBytes,
    };
  }
}

// Start global cleanup on module load
TypingIndicatorService.startGlobalCleanup();
