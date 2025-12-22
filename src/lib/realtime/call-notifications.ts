/**
 * Call Notifications Service
 *
 * Real-time call status updates and notifications via WebSocket
 */

import { io, Socket } from 'socket.io-client';

export type CallEventType =
  | 'call:initiated'
  | 'call:ringing'
  | 'call:accepted'
  | 'call:rejected'
  | 'call:ended'
  | 'call:missed'
  | 'call:audio-toggled'
  | 'call:video-toggled'
  | 'call:quality-changed'
  | 'call:participant-joined'
  | 'call:participant-left'
  | 'call:recording-started'
  | 'call:recording-stopped';

export interface CallNotification {
  type: CallEventType;
  callId: string;
  userId: string;
  participantId?: string;
  timestamp: string;
  data?: {
    reason?: string;
    audioEnabled?: boolean;
    videoEnabled?: boolean;
    quality?: 'low' | 'medium' | 'high';
    participantCount?: number;
    recordingId?: string;
  };
}

interface CallNotificationListener {
  (notification: CallNotification): void;
}

interface CallNotificationOptions {
  userId: string;
  reconnection?: boolean;
  reconnectionDelay?: number;
  reconnectionDelayMax?: number;
  reconnectionAttempts?: number;
}

/**
 * CallNotificationsService
 *
 * Manages WebSocket connection for real-time call events
 */
class CallNotificationsService {
  private socket: Socket | null = null;
  private listeners = new Map<CallEventType, Set<CallNotificationListener>>();
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private userId: string | null = null;

  constructor() {
    // Initialize empty listener map
    const eventTypes: CallEventType[] = [
      'call:initiated',
      'call:ringing',
      'call:accepted',
      'call:rejected',
      'call:ended',
      'call:missed',
      'call:audio-toggled',
      'call:video-toggled',
      'call:quality-changed',
      'call:participant-joined',
      'call:participant-left',
      'call:recording-started',
      'call:recording-stopped',
    ];

    eventTypes.forEach((type) => {
      this.listeners.set(type, new Set());
    });
  }

  /**
   * Connect to WebSocket server
   */
  async connect(options: CallNotificationOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.userId = options.userId;

        // Initialize Socket.io connection
        this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
          reconnection: options.reconnection ?? true,
          reconnectionDelay: options.reconnectionDelay ?? 1000,
          reconnectionDelayMax: options.reconnectionDelayMax ?? 5000,
          reconnectionAttempts: options.reconnectionAttempts ?? 5,
          query: {
            userId: options.userId,
            type: 'call-notifications',
          },
        });

        // Connection handlers
        this.socket.on('connect', () => {
          this.isConnected = true;
          this.reconnectAttempts = 0;
          console.log('Call notifications connected');
          resolve();
        });

        this.socket.on('connect_error', (error) => {
          console.error('Call notifications connection error:', error);
          reject(error);
        });

        this.socket.on('disconnect', (reason) => {
          this.isConnected = false;
          console.log('Call notifications disconnected:', reason);
        });

        this.socket.on('reconnect_attempt', () => {
          this.reconnectAttempts++;
          console.log(`Call notifications reconnect attempt ${this.reconnectAttempts}`);
        });

        // Event listeners
        this.registerEventListeners();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  /**
   * Register Socket.io event listeners
   */
  private registerEventListeners(): void {
    if (!this.socket) return;

    const eventTypes: CallEventType[] = [
      'call:initiated',
      'call:ringing',
      'call:accepted',
      'call:rejected',
      'call:ended',
      'call:missed',
      'call:audio-toggled',
      'call:video-toggled',
      'call:quality-changed',
      'call:participant-joined',
      'call:participant-left',
      'call:recording-started',
      'call:recording-stopped',
    ];

    eventTypes.forEach((eventType) => {
      this.socket!.on(eventType, (notification: CallNotification) => {
        this.handleNotification(eventType, notification);
      });
    });
  }

  /**
   * Handle incoming notification and dispatch to listeners
   */
  private handleNotification(eventType: CallEventType, notification: CallNotification): void {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.forEach((listener) => {
        try {
          listener(notification);
        } catch (error) {
          console.error(`Error in call notification listener for ${eventType}:`, error);
        }
      });
    }
  }

  /**
   * Subscribe to call events
   */
  on(eventType: CallEventType, listener: CallNotificationListener): void {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.add(listener);
    }
  }

  /**
   * Unsubscribe from call events
   */
  off(eventType: CallEventType, listener: CallNotificationListener): void {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.delete(listener);
    }
  }

  /**
   * Emit call event to server
   */
  emit(eventType: CallEventType, data: Omit<CallNotification, 'type'>): void {
    if (!this.socket || !this.isConnected) {
      console.warn(`Socket not connected, cannot emit ${eventType}`);
      return;
    }

    this.socket.emit(eventType, {
      type: eventType,
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Check if connected to server
   */
  getIsConnected(): boolean {
    return this.isConnected;
  }

  /**
   * Get current user ID
   */
  getUserId(): string | null {
    return this.userId;
  }
}

// Export singleton instance
export const callNotifications = new CallNotificationsService();

/**
 * Hook-friendly notification manager for component use
 */
export class CallNotificationManager {
  private unsubscribers: Array<() => void> = [];

  /**
   * Subscribe to multiple event types
   */
  subscribe(events: { [K in CallEventType]?: CallNotificationListener }): void {
    Object.entries(events).forEach(([eventType, listener]) => {
      if (listener) {
        callNotifications.on(eventType as CallEventType, listener);

        // Add unsubscriber
        this.unsubscribers.push(() => {
          callNotifications.off(eventType as CallEventType, listener);
        });
      }
    });
  }

  /**
   * Unsubscribe from all events
   */
  unsubscribeAll(): void {
    this.unsubscribers.forEach((unsub) => unsub());
    this.unsubscribers = [];
  }
}
