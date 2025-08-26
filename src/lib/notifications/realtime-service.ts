// Real-time Notification Service
// Handles WebSocket connections for instant notifications

import { Notification, NotificationType, NotificationPriority } from '@/types/notifications';

export interface RealtimeConfig {
  wsUrl?: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
}

export interface RealtimeMessage {
  type: 'notification' | 'heartbeat' | 'ack' | 'error';
  payload?: any;
  timestamp: Date;
}

export interface NotificationListener {
  id: string;
  callback: (notification: Notification) => void;
  filter?: {
    types?: NotificationType[];
    priorities?: NotificationPriority[];
  };
}

class RealtimeNotificationService {
  private ws: WebSocket | null = null;
  private config: RealtimeConfig;
  private listeners: Map<string, NotificationListener> = new Map();
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private isConnected = false;
  private messageQueue: RealtimeMessage[] = [];
  private connectionPromise: Promise<void> | null = null;

  constructor(config: RealtimeConfig = {}) {
    this.config = {
      wsUrl: config.wsUrl || (typeof window !== 'undefined' ? `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws/notifications` : ''),
      reconnectInterval: config.reconnectInterval || 5000,
      maxReconnectAttempts: config.maxReconnectAttempts || 10,
      heartbeatInterval: config.heartbeatInterval || 30000
    };
  }

  // Connect to WebSocket server
  async connect(userId: string, token: string): Promise<void> {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = this._connect(userId, token);
    return this.connectionPromise;
  }

  private async _connect(userId: string, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Close existing connection
        if (this.ws) {
          this.disconnect();
        }

        // For development, use mock connection
        if (typeof window === 'undefined' || !this.config.wsUrl) {
          this.mockConnection();
          resolve();
          return;
        }

        // Create WebSocket connection with auth
        const wsUrl = `${this.config.wsUrl}?userId=${userId}&token=${token}`;
        this.ws = new WebSocket(wsUrl);

        // Connection opened
        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.connectionPromise = null;
          
          // Start heartbeat
          this.startHeartbeat();
          
          // Process queued messages
          this.processMessageQueue();
          
          // Send initial sync request
          this.sendMessage({
            type: 'sync',
            payload: { userId },
            timestamp: new Date()
          });
          
          resolve();
        };

        // Message received
        this.ws.onmessage = (event) => {
          try {
            const message: RealtimeMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };

        // Connection closed
        this.ws.onclose = (event) => {
          console.log('WebSocket disconnected', event.code, event.reason);
          this.isConnected = false;
          this.stopHeartbeat();
          
          // Attempt reconnection if not intentional
          if (event.code !== 1000 && this.reconnectAttempts < this.config.maxReconnectAttempts!) {
            this.scheduleReconnect(userId, token);
          }
        };

        // Connection error
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

      } catch (error) {
        reject(error);
      }
    });
  }

  // Mock connection for development
  private mockConnection() {
    this.isConnected = true;
    console.log('Mock WebSocket connection established');
    
    // Simulate receiving notifications
    setTimeout(() => {
      this.simulateNotification({
        id: 'mock-1',
        type: 'job',
        priority: 'high',
        title: 'New Emergency Job Available',
        message: 'Water damage restoration needed in Sydney CBD',
        recipientId: 'current-user',
        recipientType: 'contractor',
        channels: ['in_app', 'push'],
        status: 'delivered',
        createdAt: new Date()
      } as Notification);
    }, 2000);
  }

  // Handle incoming messages
  private handleMessage(message: RealtimeMessage) {
    switch (message.type) {
      case 'notification':
        this.handleNotification(message.payload);
        break;
        
      case 'heartbeat':
        // Respond to heartbeat
        this.sendMessage({
          type: 'ack',
          payload: { type: 'heartbeat' },
          timestamp: new Date()
        });
        break;
        
      case 'error':
        console.error('Server error:', message.payload);
        break;
        
      default:
        console.log('Unknown message type:', message.type);
    }
  }

  // Handle notification
  private handleNotification(notification: Notification) {
    // Notify all listeners
    this.listeners.forEach(listener => {
      // Check filters
      if (listener.filter) {
        if (listener.filter.types && !listener.filter.types.includes(notification.type)) {
          return;
        }
        if (listener.filter.priorities && !listener.filter.priorities.includes(notification.priority)) {
          return;
        }
      }
      
      // Call listener
      try {
        listener.callback(notification);
      } catch (error) {
        console.error('Listener error:', error);
      }
    });

    // Send acknowledgment
    this.sendMessage({
      type: 'ack',
      payload: { 
        type: 'notification',
        notificationId: notification.id 
      },
      timestamp: new Date()
    });
  }

  // Send message to server
  private sendMessage(message: RealtimeMessage) {
    if (!this.isConnected) {
      this.messageQueue.push(message);
      return;
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      this.messageQueue.push(message);
    }
  }

  // Process queued messages
  private processMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.sendMessage(message);
      }
    }
  }

  // Start heartbeat
  private startHeartbeat() {
    this.stopHeartbeat();
    
    this.heartbeatTimer = setInterval(() => {
      if (this.isConnected) {
        this.sendMessage({
          type: 'heartbeat',
          timestamp: new Date()
        });
      }
    }, this.config.heartbeatInterval);
  }

  // Stop heartbeat
  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  // Schedule reconnection
  private scheduleReconnect(userId: string, token: string) {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    this.reconnectAttempts++;
    const delay = this.config.reconnectInterval! * Math.pow(2, Math.min(this.reconnectAttempts - 1, 5));
    
    console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.config.maxReconnectAttempts})`);
    
    this.reconnectTimer = setTimeout(() => {
      this.connect(userId, token);
    }, delay);
  }

  // Disconnect from WebSocket
  disconnect() {
    this.isConnected = false;
    this.stopHeartbeat();
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    if (this.ws) {
      this.ws.close(1000, 'Client disconnect');
      this.ws = null;
    }
    
    this.listeners.clear();
    this.messageQueue = [];
  }

  // Add notification listener
  addListener(
    callback: (notification: Notification) => void,
    filter?: NotificationListener['filter']
  ): string {
    const id = `listener-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    this.listeners.set(id, {
      id,
      callback,
      filter
    });
    
    return id;
  }

  // Remove notification listener
  removeListener(id: string) {
    this.listeners.delete(id);
  }

  // Get connection status
  getConnectionStatus(): {
    connected: boolean;
    reconnectAttempts: number;
    queueLength: number;
  } {
    return {
      connected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      queueLength: this.messageQueue.length
    };
  }

  // Simulate notification (for testing)
  simulateNotification(notification: Notification) {
    this.handleNotification(notification);
  }

  // Mark notification as read
  markAsRead(notificationId: string) {
    this.sendMessage({
      type: 'mark_read',
      payload: { notificationId },
      timestamp: new Date()
    });
  }

  // Mark all notifications as read
  markAllAsRead() {
    this.sendMessage({
      type: 'mark_all_read',
      timestamp: new Date()
    });
  }

  // Request notification history
  requestHistory(filter?: {
    types?: NotificationType[];
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }) {
    this.sendMessage({
      type: 'history',
      payload: filter,
      timestamp: new Date()
    });
  }

  // Subscribe to specific notification types
  subscribe(types: NotificationType[]) {
    this.sendMessage({
      type: 'subscribe',
      payload: { types },
      timestamp: new Date()
    });
  }

  // Unsubscribe from notification types
  unsubscribe(types: NotificationType[]) {
    this.sendMessage({
      type: 'unsubscribe',
      payload: { types },
      timestamp: new Date()
    });
  }
}

// Export singleton instance
export const realtimeService = new RealtimeNotificationService();

// React Hook for notifications
export function useRealtimeNotifications(
  onNotification: (notification: Notification) => void,
  filter?: NotificationListener['filter']
) {
  if (typeof window === 'undefined') {
    return {
      connected: false,
      connect: async () => {},
      disconnect: () => {}
    };
  }

  const [connected, setConnected] = React.useState(false);
  const listenerIdRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    // Add listener
    listenerIdRef.current = realtimeService.addListener(onNotification, filter);

    // Update connection status
    const checkStatus = () => {
      const status = realtimeService.getConnectionStatus();
      setConnected(status.connected);
    };

    const interval = setInterval(checkStatus, 1000);
    checkStatus();

    return () => {
      clearInterval(interval);
      if (listenerIdRef.current) {
        realtimeService.removeListener(listenerIdRef.current);
      }
    };
  }, [onNotification, filter]);

  return {
    connected,
    connect: async (userId: string, token: string) => {
      await realtimeService.connect(userId, token);
      setConnected(true);
    },
    disconnect: () => {
      realtimeService.disconnect();
      setConnected(false);
    },
    markAsRead: (id: string) => realtimeService.markAsRead(id),
    markAllAsRead: () => realtimeService.markAllAsRead()
  };
}

// Import React for the hook
import * as React from 'react';