/**
 * Push Notification Manager - Multi-Channel Notification System
 *
 * Handles push notifications across iOS (APNs), Android (FCM),
 * with local fallback and rich media support.
 *
 * @module PushNotificationManager
 */

import { EventEmitter } from 'events';
import { Logger } from '../logging/logger';
import { MetricsCollector } from '../monitoring/metrics-collector';
import { NativeBridge } from './native-bridge';

interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  metadata: {
    priority: 'high' | 'normal' | 'low';
    expiry: number;
    badge?: number;
    sound?: string;
    category?: string;
  };
  timestamp: number;
}

interface NotificationToken {
  platform: 'iOS' | 'Android';
  token: string;
  registeredAt: number;
  lastUsed: number;
}

interface NotificationConfig {
  enableLocalNotifications: boolean;
  enableRemoteNotifications: boolean;
  fcmServerKey?: string;
  apnsCertPath?: string;
  displayNotificationsWhenActive: boolean;
}

export class PushNotificationManager extends EventEmitter {
  private config: NotificationConfig;
  private logger: Logger;
  private metrics: MetricsCollector;
  private nativeBridge: NativeBridge;
  private notificationTokens = new Map<string, NotificationToken>();
  private pendingNotifications: PushNotification[] = [];
  private notificationHandlers = new Map<string, (notification: PushNotification) => void>();

  constructor(config: NotificationConfig, nativeBridge: NativeBridge) {
    super();
    this.config = config;
    this.nativeBridge = nativeBridge;
    this.logger = new Logger('PushNotificationManager');
    this.metrics = new MetricsCollector('push_notifications');
  }

  /**
   * Initialize push notifications
   */
  async initialize(): Promise<void> {
    try {
      this.logger.info('Initializing push notification manager');

      if (this.config.enableRemoteNotifications) {
        await this.registerForRemoteNotifications();
      }

      if (this.config.enableLocalNotifications) {
        this.setupLocalNotifications();
      }

      this.setupNotificationListeners();

      this.logger.info('Push notification manager initialized');
    } catch (error) {
      this.logger.error('Failed to initialize push notifications', { error });
      throw error;
    }
  }

  /**
   * Register for remote push notifications
   */
  private async registerForRemoteNotifications(): Promise<void> {
    try {
      const result = await this.nativeBridge.invokeMethod('PushNotification', 'register', {
        platform: process.env.PLATFORM || 'iOS'
      });

      if (result?.token) {
        const token: NotificationToken = {
          platform: result.platform,
          token: result.token,
          registeredAt: Date.now(),
          lastUsed: Date.now()
        };

        this.notificationTokens.set(result.token, token);

        this.logger.info('Registered for remote notifications', {
          platform: result.platform,
          tokenLength: result.token.length
        });

        this.emit('tokenRegistered', token);
      }
    } catch (error) {
      this.logger.error('Failed to register for remote notifications', { error });
      throw error;
    }
  }

  /**
   * Setup local notification support
   */
  private setupLocalNotifications(): void {
    this.logger.debug('Setting up local notifications');

    // Request notification permissions
    this.nativeBridge.invokeMethod('Notification', 'requestPermission', {
      alert: true,
      badge: true,
      sound: true
    }).catch(error => {
      this.logger.warn('Failed to request notification permissions', { error });
    });
  }

  /**
   * Setup notification event listeners
   */
  private setupNotificationListeners(): void {
    // Listen for incoming notifications
    this.nativeBridge.onNativeEvent('PushNotification', 'received', (notification) => {
      this.handleNotificationReceived(notification);
    });

    // Listen for notification taps
    this.nativeBridge.onNativeEvent('PushNotification', 'tapped', (notification) => {
      this.handleNotificationTapped(notification);
    });

    // Listen for token refresh
    this.nativeBridge.onNativeEvent('PushNotification', 'tokenRefreshed', (data) => {
      this.handleTokenRefreshed(data);
    });
  }

  /**
   * Send a push notification to a user
   */
  async sendNotification(
    userId: string,
    notification: Omit<PushNotification, 'id' | 'timestamp'>
  ): Promise<string> {
    const notifId = `notif_${Date.now()}_${Math.random()}`;

    const fullNotif: PushNotification = {
      id: notifId,
      ...notification,
      timestamp: Date.now()
    };

    try {
      // Get user's notification tokens
      const tokens = await this.getUserNotificationTokens(userId);

      if (tokens.length === 0) {
        this.logger.warn('No notification tokens found for user', { userId });
        return notifId;
      }

      // Send to all registered devices
      const results = await Promise.allSettled(
        tokens.map(token => this.sendToDevice(token.token, fullNotif))
      );

      const successCount = results.filter(r => r.status === 'fulfilled').length;

      this.metrics.recordMetric('notification_sent', {
        userId,
        deviceCount: tokens.length,
        successCount,
        priority: notification.metadata.priority
      });

      this.logger.debug('Notification sent', {
        notifId,
        userId,
        deviceCount: tokens.length,
        successCount
      });

      this.emit('notificationSent', { notifId, userId, successCount });

      return notifId;
    } catch (error) {
      this.logger.error('Failed to send notification', { error, userId, notifId });
      this.metrics.recordMetric('notification_error', {
        userId,
        errorType: (error as Error).name
      });
      throw error;
    }
  }

  /**
   * Send push notification to a specific device token
   */
  private async sendToDevice(token: string, notification: PushNotification): Promise<void> {
    const notifToken = this.notificationTokens.get(token);

    if (!notifToken) {
      throw new Error(`Invalid notification token: ${token}`);
    }

    if (notifToken.platform === 'iOS') {
      await this.sendToAPNs(token, notification);
    } else if (notifToken.platform === 'Android') {
      await this.sendToFCM(token, notification);
    }

    // Update last used timestamp
    notifToken.lastUsed = Date.now();
  }

  /**
   * Send notification via Apple Push Notification service (APNs)
   */
  private async sendToAPNs(token: string, notification: PushNotification): Promise<void> {
    // In real implementation, would use APNs API
    this.logger.debug('Sending to APNs', {
      token: token.substring(0, 10) + '...',
      title: notification.title
    });

    // Simulated APNs request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.05) { // 95% success rate
          resolve();
        } else {
          reject(new Error('APNs delivery failed'));
        }
      }, 100);
    });
  }

  /**
   * Send notification via Firebase Cloud Messaging (FCM)
   */
  private async sendToFCM(token: string, notification: PushNotification): Promise<void> {
    // In real implementation, would use FCM API
    this.logger.debug('Sending to FCM', {
      token: token.substring(0, 10) + '...',
      title: notification.title
    });

    // Simulated FCM request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.05) { // 95% success rate
          resolve();
        } else {
          reject(new Error('FCM delivery failed'));
        }
      }, 100);
    });
  }

  /**
   * Send local notification (shown on the device immediately)
   */
  async sendLocalNotification(notification: Omit<PushNotification, 'id' | 'timestamp'>): Promise<string> {
    const notifId = `local_${Date.now()}_${Math.random()}`;

    try {
      const result = await this.nativeBridge.invokeMethod('Notification', 'show', {
        id: notifId,
        title: notification.title,
        body: notification.body,
        data: notification.data,
        priority: notification.metadata.priority,
        badge: notification.metadata.badge,
        sound: notification.metadata.sound
      });

      this.logger.debug('Local notification shown', { notifId });

      this.metrics.recordMetric('local_notification_shown', {
        priority: notification.metadata.priority
      });

      return notifId;
    } catch (error) {
      this.logger.error('Failed to show local notification', { error });
      throw error;
    }
  }

  /**
   * Handle incoming notification
   */
  private handleNotificationReceived(data: any): void {
    const notification: PushNotification = {
      id: data.id || `notif_${Date.now()}`,
      title: data.title,
      body: data.body,
      data: data.data,
      metadata: {
        priority: data.priority || 'normal',
        expiry: data.expiry || Date.now() + 86400000,
        badge: data.badge,
        sound: data.sound,
        category: data.category
      },
      timestamp: Date.now()
    };

    this.logger.debug('Notification received', {
      notifId: notification.id,
      title: notification.title
    });

    // Store pending notification
    this.pendingNotifications.push(notification);

    // Show local notification if app is active and configured
    if (this.config.displayNotificationsWhenActive) {
      this.nativeBridge.invokeMethod('Notification', 'show', notification).catch(error => {
        this.logger.warn('Failed to display notification', { error });
      });
    }

    // Call registered handlers
    const handlers = this.notificationHandlers.get(notification.metadata.category || 'default') || [];
    (typeof handlers === 'function' ? [handlers] : []).forEach(handler => {
      try {
        handler(notification);
      } catch (error) {
        this.logger.warn('Notification handler error', { error });
      }
    });

    this.emit('notificationReceived', notification);

    this.metrics.recordMetric('notification_received', {
      priority: notification.metadata.priority,
      category: notification.metadata.category
    });
  }

  /**
   * Handle notification tap
   */
  private handleNotificationTapped(data: any): void {
    this.logger.debug('Notification tapped', { notifId: data.id });

    const notification = this.pendingNotifications.find(n => n.id === data.id);
    if (notification) {
      this.emit('notificationTapped', notification);
    }

    this.metrics.recordMetric('notification_tapped');
  }

  /**
   * Handle notification token refresh
   */
  private handleTokenRefreshed(data: any): void {
    this.logger.info('Notification token refreshed', {
      platform: data.platform,
      newTokenLength: data.token.length
    });

    const token: NotificationToken = {
      platform: data.platform,
      token: data.token,
      registeredAt: Date.now(),
      lastUsed: Date.now()
    };

    this.notificationTokens.set(data.token, token);
    this.emit('tokenRefreshed', token);
  }

  /**
   * Register notification handler
   */
  onNotification(category: string, handler: (notification: PushNotification) => void): () => void {
    this.notificationHandlers.set(category, handler);

    // Return unsubscribe function
    return () => {
      this.notificationHandlers.delete(category);
    };
  }

  /**
   * Get user's notification tokens
   */
  private async getUserNotificationTokens(userId: string): Promise<NotificationToken[]> {
    // In real implementation, would fetch from database
    return Array.from(this.notificationTokens.values());
  }

  /**
   * Get notification statistics
   */
  getStatistics(): {
    registeredTokens: number;
    pendingNotifications: number;
    lastTokenRefresh: number | null;
  } {
    return {
      registeredTokens: this.notificationTokens.size,
      pendingNotifications: this.pendingNotifications.length,
      lastTokenRefresh: this.notificationTokens.size > 0
        ? Math.max(...Array.from(this.notificationTokens.values()).map(t => t.registeredAt))
        : null
    };
  }

  /**
   * Clear pending notifications
   */
  clearPendingNotifications(): void {
    this.pendingNotifications = [];
  }

  /**
   * Cleanup notification manager
   */
  cleanup(): void {
    this.notificationTokens.clear();
    this.notificationHandlers.clear();
    this.pendingNotifications = [];
    this.removeAllListeners();
    this.logger.info('Push notification manager cleanup complete');
  }
}
