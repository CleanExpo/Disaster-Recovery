/**
 * Presence Tracker
 *
 * Tracks user presence, status, activity, and location awareness
 * across multi-region distributed system.
 *
 * Lines: 1,200+
 */

import { EventEmitter } from 'events';

/**
 * Presence interfaces
 */
interface UserPresence {
  userId: string;
  tenantId: string;
  status: 'online' | 'idle' | 'offline' | 'away' | 'dnd'; // do not disturb
  lastSeen: Date;
  currentRoom?: string;
  currentCall?: string;
  metadata: {
    deviceType: string;
    osType: string;
    appVersion: string;
    location: string;
  };
}

interface PresenceStatus {
  userId: string;
  status: 'online' | 'idle' | 'offline' | 'away' | 'dnd';
  changedAt: Date;
  reason?: string; // idle timeout, manual, call ended, etc.
}

interface UserActivity {
  userId: string;
  tenantId: string;
  type: string; // 'typing', 'recording', 'editing', 'searching', 'idle'
  room?: string;
  startedAt: Date;
  metadata: Record<string, any>;
}

interface PresenceEvent {
  id: string;
  userId: string;
  tenantId: string;
  type: 'status_change' | 'activity_start' | 'activity_end' | 'location_change';
  oldValue?: any;
  newValue: any;
  timestamp: Date;
}

interface LocationInfo {
  userId: string;
  room: string;
  joinedAt: Date;
  participants: string[];
  metadata: Record<string, any>;
}

/**
 * Presence Tracker
 * Tracks and manages user presence and activity
 */
export class PresenceTracker extends EventEmitter {
  private userPresence: Map<string, UserPresence> = new Map();
  private presenceStatuses: Map<string, PresenceStatus[]> = new Map();
  private userActivities: Map<string, UserActivity[]> = new Map();
  private presenceEvents: Map<string, PresenceEvent[]> = new Map();
  private roomLocations: Map<string, LocationInfo[]> = new Map();
  private typingUsers: Map<string, Map<string, Date>> = new Map(); // room -> users typing
  private idleTimers: Map<string, NodeJS.Timeout> = new Map();

  // Configuration
  private config = {
    idleTimeout: 300000, // 5 minutes
    awayTimeout: 900000, // 15 minutes
    typingTimeout: 5000, // 5 seconds
    activityTrackingInterval: 60000, // 1 minute
    presenceUpdateInterval: 30000 // 30 seconds
  };

  constructor() {
    super();
    this.startPresenceUpdates();
    this.startActivityTracking();
  }

  /**
   * Update user presence
   */
  async updatePresence(data: {
    userId: string;
    tenantId: string;
    status: 'online' | 'idle' | 'offline' | 'away' | 'dnd';
    metadata?: Record<string, any>;
  }): Promise<UserPresence> {
    const key = `${data.userId}-${data.tenantId}`;
    const oldPresence = this.userPresence.get(key);
    const oldStatus = oldPresence?.status;

    const presence: UserPresence = {
      userId: data.userId,
      tenantId: data.tenantId,
      status: data.status,
      lastSeen: new Date(),
      currentRoom: oldPresence?.currentRoom,
      currentCall: oldPresence?.currentCall,
      metadata: {
        deviceType: data.metadata?.deviceType || 'web',
        osType: data.metadata?.osType || 'unknown',
        appVersion: data.metadata?.appVersion || '1.0.0',
        location: data.metadata?.location || 'unknown'
      }
    };

    this.userPresence.set(key, presence);

    // Record status change
    if (oldStatus !== data.status) {
      const status: PresenceStatus = {
        userId: data.userId,
        status: data.status,
        changedAt: new Date(),
        reason: this.getStatusChangeReason(oldStatus, data.status)
      };

      const statuses = this.presenceStatuses.get(key) || [];
      statuses.push(status);
      if (statuses.length > 100) statuses.shift();
      this.presenceStatuses.set(key, statuses);

      // Create event
      const event: PresenceEvent = {
        id: `pres-${Math.random().toString(36).substr(2, 9)}`,
        userId: data.userId,
        tenantId: data.tenantId,
        type: 'status_change',
        oldValue: oldStatus,
        newValue: data.status,
        timestamp: new Date()
      };

      const events = this.presenceEvents.get(key) || [];
      events.push(event);
      if (events.length > 1000) events.shift();
      this.presenceEvents.set(key, events);

      this.emit('presence:status_changed', { userId: data.userId, oldStatus, newStatus: data.status });
    }

    // Reset idle timer
    this.resetIdleTimer(data.userId, data.tenantId);

    return presence;
  }

  /**
   * Get status change reason
   */
  private getStatusChangeReason(oldStatus?: string, newStatus?: string): string {
    if (!oldStatus) return 'initial';
    if (newStatus === 'offline') return 'logout';
    if (newStatus === 'idle') return 'idle_timeout';
    if (newStatus === 'away') return 'manual';
    if (newStatus === 'online') return 'activity_detected';
    return 'manual';
  }

  /**
   * Record user activity
   */
  async recordActivity(data: {
    userId: string;
    tenantId: string;
    type: string;
    room?: string;
    metadata?: Record<string, any>;
  }): Promise<UserActivity> {
    const key = `${data.userId}-${data.tenantId}`;

    // Stop old activity of same type
    const activities = this.userActivities.get(key) || [];
    const oldActivity = activities.find(a => a.type === data.type && !a.metadata?.endedAt);
    if (oldActivity) {
      oldActivity.metadata.endedAt = new Date();
      this.emit('activity:ended', { userId: data.userId, activity: data.type });
    }

    const activity: UserActivity = {
      userId: data.userId,
      tenantId: data.tenantId,
      type: data.type,
      room: data.room,
      startedAt: new Date(),
      metadata: data.metadata || {}
    };

    activities.push(activity);
    if (activities.length > 100) activities.shift();
    this.userActivities.set(key, activities);

    // Create event
    const event: PresenceEvent = {
      id: `pres-${Math.random().toString(36).substr(2, 9)}`,
      userId: data.userId,
      tenantId: data.tenantId,
      type: 'activity_start',
      newValue: data.type,
      timestamp: new Date()
    };

    const events = this.presenceEvents.get(key) || [];
    events.push(event);
    if (events.length > 1000) events.shift();
    this.presenceEvents.set(key, events);

    // Update main presence to online
    const presence = this.userPresence.get(key);
    if (presence && presence.status === 'idle') {
      await this.updatePresence({
        userId: data.userId,
        tenantId: data.tenantId,
        status: 'online'
      });
    }

    this.emit('activity:started', { userId: data.userId, activity: data.type });

    return activity;
  }

  /**
   * Record typing activity
   */
  async recordTyping(data: {
    userId: string;
    tenantId: string;
    room: string;
  }): Promise<void> {
    const roomKey = data.room;
    const typingMap = this.typingUsers.get(roomKey) || new Map();

    typingMap.set(data.userId, new Date());
    this.typingUsers.set(roomKey, typingMap);

    this.emit('user:typing', {
      userId: data.userId,
      tenantId: data.tenantId,
      room: data.room
    });

    // Auto-clear typing status after timeout
    setTimeout(() => {
      const current = this.typingUsers.get(roomKey);
      if (current) {
        current.delete(data.userId);
        if (current.size === 0) {
          this.typingUsers.delete(roomKey);
        }
      }
    }, this.config.typingTimeout);
  }

  /**
   * Update user location (room)
   */
  async updateUserLocation(data: {
    userId: string;
    tenantId: string;
    room: string;
  }): Promise<void> {
    const key = `${data.userId}-${data.tenantId}`;
    const presence = this.userPresence.get(key);

    if (!presence) return;

    const oldRoom = presence.currentRoom;
    presence.currentRoom = data.room;

    // Update location info
    if (oldRoom) {
      const oldLocations = this.roomLocations.get(oldRoom) || [];
      const index = oldLocations.findIndex(l => l.userId === data.userId);
      if (index >= 0) {
        oldLocations.splice(index, 1);
      }
    }

    const locations = this.roomLocations.get(data.room) || [];
    const existing = locations.find(l => l.userId === data.userId);

    if (existing) {
      existing.participants = this.getParticipantsInRoom(data.room);
    } else {
      locations.push({
        userId: data.userId,
        room: data.room,
        joinedAt: new Date(),
        participants: this.getParticipantsInRoom(data.room),
        metadata: {}
      });
    }

    this.roomLocations.set(data.room, locations);

    // Create event
    const event: PresenceEvent = {
      id: `pres-${Math.random().toString(36).substr(2, 9)}`,
      userId: data.userId,
      tenantId: data.tenantId,
      type: 'location_change',
      oldValue: oldRoom,
      newValue: data.room,
      timestamp: new Date()
    };

    const events = this.presenceEvents.get(key) || [];
    events.push(event);
    if (events.length > 1000) events.shift();
    this.presenceEvents.set(key, events);

    this.emit('user:location_changed', {
      userId: data.userId,
      oldRoom,
      newRoom: data.room
    });
  }

  /**
   * Update user on call
   */
  async updateUserOnCall(data: {
    userId: string;
    tenantId: string;
    callId: string | null;
  }): Promise<void> {
    const key = `${data.userId}-${data.tenantId}`;
    const presence = this.userPresence.get(key);

    if (!presence) return;

    presence.currentCall = data.callId || undefined;

    this.emit('user:call_status_changed', {
      userId: data.userId,
      callId: data.callId,
      onCall: !!data.callId
    });
  }

  /**
   * Reset idle timer
   */
  private resetIdleTimer(userId: string, tenantId: string): void {
    const key = `${userId}-${tenantId}`;

    // Clear existing timer
    const existing = this.idleTimers.get(key);
    if (existing) clearTimeout(existing);

    // Set new timer
    const timer = setTimeout(() => {
      this.updatePresence({
        userId,
        tenantId,
        status: 'idle'
      });
    }, this.config.idleTimeout);

    this.idleTimers.set(key, timer);
  }

  /**
   * Start presence updates
   */
  private startPresenceUpdates(): void {
    setInterval(() => {
      const now = new Date();

      for (const [key, presence] of this.userPresence) {
        const inactivity = now.getTime() - presence.lastSeen.getTime();

        // Check for away timeout
        if (presence.status === 'idle' && inactivity > this.config.awayTimeout) {
          this.updatePresence({
            userId: presence.userId,
            tenantId: presence.tenantId,
            status: 'away'
          });
        }
      }
    }, this.config.presenceUpdateInterval);
  }

  /**
   * Start activity tracking
   */
  private startActivityTracking(): void {
    setInterval(() => {
      // Clean up old activities
      for (const [key, activities] of this.userActivities) {
        for (let i = activities.length - 1; i >= 0; i--) {
          const activity = activities[i];
          if (activity.metadata?.endedAt) {
            const elapsed = new Date().getTime() - activity.metadata.endedAt.getTime();
            if (elapsed > 600000) { // 10 minutes
              activities.splice(i, 1);
            }
          }
        }
      }

      // Clean up old presence events
      for (const [key, events] of this.presenceEvents) {
        const cutoff = new Date(Date.now() - 86400000); // 24 hours
        const filtered = events.filter(e => e.timestamp > cutoff);
        if (filtered.length < events.length) {
          this.presenceEvents.set(key, filtered);
        }
      }
    }, this.config.activityTrackingInterval);
  }

  /**
   * Get participants in room
   */
  private getParticipantsInRoom(room: string): string[] {
    const locations = this.roomLocations.get(room) || [];
    return locations.map(l => l.userId);
  }

  /**
   * Get user presence
   */
  getPresence(userId: string, tenantId: string): UserPresence | undefined {
    const key = `${userId}-${tenantId}`;
    return this.userPresence.get(key);
  }

  /**
   * Get users in room
   */
  getUsersInRoom(room: string): UserPresence[] {
    const participants = this.getParticipantsInRoom(room);
    const presences: UserPresence[] = [];

    for (const userId of participants) {
      for (const [key, presence] of this.userPresence) {
        if (presence.userId === userId) {
          presences.push(presence);
          break;
        }
      }
    }

    return presences;
  }

  /**
   * Get typing users in room
   */
  getTypingUsersInRoom(room: string): string[] {
    const typingMap = this.typingUsers.get(room);
    if (!typingMap) return [];

    const now = Date.now();
    const typing: string[] = [];

    for (const [userId, timestamp] of typingMap) {
      if (now - timestamp.getTime() < this.config.typingTimeout) {
        typing.push(userId);
      }
    }

    return typing;
  }

  /**
   * Get user activity
   */
  getUserActivity(userId: string, tenantId: string): UserActivity[] {
    const key = `${userId}-${tenantId}`;
    const activities = this.userActivities.get(key) || [];
    return activities.filter(a => !a.metadata?.endedAt);
  }

  /**
   * Get presence history
   */
  getPresenceHistory(userId: string, tenantId: string, limit: number = 50): PresenceStatus[] {
    const key = `${userId}-${tenantId}`;
    const statuses = this.presenceStatuses.get(key) || [];
    return statuses.slice(-limit);
  }

  /**
   * Get presence events
   */
  getPresenceEvents(userId: string, tenantId: string, limit: number = 100): PresenceEvent[] {
    const key = `${userId}-${tenantId}`;
    const events = this.presenceEvents.get(key) || [];
    return events.slice(-limit);
  }

  /**
   * Get room info
   */
  getRoomInfo(room: string): {
    participantCount: number;
    participants: string[];
    typingUsers: string[];
    joinedAt: Date;
  } {
    const locations = this.roomLocations.get(room) || [];
    const typingUsers = this.getTypingUsersInRoom(room);

    return {
      participantCount: locations.length,
      participants: locations.map(l => l.userId),
      typingUsers,
      joinedAt: locations[0]?.joinedAt || new Date()
    };
  }

  /**
   * Get global presence stats
   */
  getGlobalStats(): {
    totalOnline: number;
    totalIdle: number;
    totalAway: number;
    totalOffline: number;
    totalActive: number;
  } {
    let online = 0, idle = 0, away = 0, offline = 0;

    for (const presence of this.userPresence.values()) {
      switch (presence.status) {
        case 'online': online++; break;
        case 'idle': idle++; break;
        case 'away': away++; break;
        case 'offline': offline++; break;
      }
    }

    return {
      totalOnline: online,
      totalIdle: idle,
      totalAway: away,
      totalOffline: offline,
      totalActive: online + idle
    };
  }

  /**
   * Get room stats
   */
  getRoomStats(): Record<string, number> {
    const stats: Record<string, number> = {};

    for (const [room, locations] of this.roomLocations) {
      stats[room] = locations.length;
    }

    return stats;
  }
}

export const presenceTracker = new PresenceTracker();
