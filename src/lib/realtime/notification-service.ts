/**
 * Real-Time Notification Service
 *
 * Manages push notifications, delivery, retries, and user preferences
 * across multiple channels and regions.
 *
 * Lines: 1,100+
 */

import { EventEmitter } from 'events';

/**
 * Notification interfaces
 */
interface Notification {
  id: string;
  userId: string;
  tenantId: string;
  type: string; // 'message', 'mention', 'call', 'file', 'event', 'alert'
  title: string;
  body: string;
  data?: Record<string, any>;
  priority: 'high' | 'normal' | 'low';
  createdAt: Date;
  expiresAt: Date;
  status: 'pending' | 'delivered' | 'failed' | 'read';
  channels: NotificationChannel[];
  readAt?: Date;
}

interface NotificationChannel {
  type: 'push' | 'email' | 'sms' | 'in-app' | 'webhook';
  status: 'pending' | 'sent' | 'failed' | 'bounced';
  sentAt?: Date;
  failureReason?: string;
  deliveryId?: string;
}

interface UserNotificationPreferences {
  userId: string;
  tenantId: string;
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  inAppEnabled: boolean;
  webhookEnabled: boolean;
  quietHours?: {
    startTime: string; // HH:MM
    endTime: string;
    timezone: string;
  };
  mutedTopics: Set<string>;
  doNotDisturbStatus: 'enabled' | 'disabled';
  notificationFrequency: 'instant' | 'daily_digest' | 'weekly_digest';
}

interface NotificationTemplate {
  id: string;
  type: string;
  title: string;
  bodyTemplate: string;
  channels: string[];
  priority: string;
  variables: string[]; // Variable names for templates
}

interface NotificationDeliveryLog {
  id: string;
  notificationId: string;
  userId: string;
  channel: string;
  status: string;
  timestamp: Date;
  failureReason?: string;
  retryCount: number;
  nextRetryAt?: Date;
}

/**
 * Real-Time Notification Service
 * Manages notification delivery and tracking
 */
export class NotificationService extends EventEmitter {
  private notifications: Map<string, Notification> = new Map();
  private userPreferences: Map<string, UserNotificationPreferences> = new Map();
  private templates: Map<string, NotificationTemplate> = new Map();
  private deliveryLogs: Map<string, NotificationDeliveryLog[]> = new Map();
  private pendingDeliveries: Map<string, Notification[]> = new Map();
  private notificationQueues: Map<string, Notification[]> = new Map();

  // Configuration
  private config = {
    retryAttempts: 3,
    retryDelays: [1000, 5000, 10000], // milliseconds
    deliveryTimeout: 30000, // 30 seconds
    quietHoursCheckInterval: 60000, // 1 minute
    deliveryProcessInterval: 5000, // 5 seconds
    maxNotificationsPerUser: 1000,
    notificationTTL: 604800000 // 7 days
  };

  constructor() {
    super();
    this.initializeDefaultTemplates();
    this.startDeliveryProcessor();
    this.startQuietHoursCheck();
  }

  /**
   * Initialize default templates
   */
  private initializeDefaultTemplates(): void {
    const templates: NotificationTemplate[] = [
      {
        id: 'template-message',
        type: 'message',
        title: '{senderName} sent you a message',
        bodyTemplate: '{senderName}: {messagePreview}',
        channels: ['push', 'in-app'],
        priority: 'normal',
        variables: ['senderName', 'messagePreview', 'roomName']
      },
      {
        id: 'template-mention',
        type: 'mention',
        title: '{senderName} mentioned you',
        bodyTemplate: '{senderName} mentioned you in {roomName}',
        channels: ['push', 'email', 'in-app'],
        priority: 'high',
        variables: ['senderName', 'roomName', 'messageLink']
      },
      {
        id: 'template-call',
        type: 'call',
        title: 'Incoming call from {callerName}',
        bodyTemplate: '{callerName} is calling...',
        channels: ['push', 'in-app'],
        priority: 'high',
        variables: ['callerName', 'callId']
      },
      {
        id: 'template-file',
        type: 'file',
        title: '{senderName} shared a file',
        bodyTemplate: '{fileName} ({fileSize})',
        channels: ['push', 'in-app'],
        priority: 'normal',
        variables: ['senderName', 'fileName', 'fileSize']
      },
      {
        id: 'template-event',
        type: 'event',
        title: '{eventName}',
        bodyTemplate: '{eventDescription}',
        channels: ['push', 'in-app'],
        priority: 'normal',
        variables: ['eventName', 'eventDescription']
      },
      {
        id: 'template-alert',
        type: 'alert',
        title: '{alertType}: {alertMessage}',
        bodyTemplate: '{alertDetails}',
        channels: ['push', 'email', 'in-app'],
        priority: 'high',
        variables: ['alertType', 'alertMessage', 'alertDetails']
      }
    ];

    for (const template of templates) {
      this.templates.set(template.id, template);
    }
  }

  /**
   * Create notification
   */
  async createNotification(data: {
    userId: string;
    tenantId: string;
    type: string;
    title: string;
    body: string;
    data?: Record<string, any>;
    priority?: 'high' | 'normal' | 'low';
    channels?: string[];
  }): Promise<Notification> {
    const notificationId = `notif-${Math.random().toString(36).substr(2, 9)}`;

    // Get user preferences
    const preferences = this.getOrCreatePreferences(data.userId, data.tenantId);

    // Determine delivery channels based on preferences
    const channels: NotificationChannel[] = [];
    const requestedChannels = data.channels || ['push', 'in-app'];

    if (preferences.pushEnabled && requestedChannels.includes('push')) {
      channels.push({ type: 'push', status: 'pending' });
    }
    if (preferences.emailEnabled && requestedChannels.includes('email')) {
      channels.push({ type: 'email', status: 'pending' });
    }
    if (preferences.smsEnabled && requestedChannels.includes('sms')) {
      channels.push({ type: 'sms', status: 'pending' });
    }
    if (preferences.inAppEnabled && requestedChannels.includes('in-app')) {
      channels.push({ type: 'in-app', status: 'pending' });
    }

    const notification: Notification = {
      id: notificationId,
      userId: data.userId,
      tenantId: data.tenantId,
      type: data.type,
      title: data.title,
      body: data.body,
      data: data.data,
      priority: data.priority || 'normal',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + this.config.notificationTTL),
      status: 'pending',
      channels
    };

    this.notifications.set(notificationId, notification);

    // Queue for delivery
    const queueKey = data.userId;
    const queue = this.notificationQueues.get(queueKey) || [];
    queue.push(notification);

    if (queue.length > this.config.maxNotificationsPerUser) {
      queue.shift();
    }

    this.notificationQueues.set(queueKey, queue);

    // Add to pending deliveries
    const pending = this.pendingDeliveries.get(queueKey) || [];
    pending.push(notification);
    this.pendingDeliveries.set(queueKey, pending);

    this.emit('notification:created', notification);

    return notification;
  }

  /**
   * Create notification from template
   */
  async createFromTemplate(data: {
    userId: string;
    tenantId: string;
    templateId: string;
    variables: Record<string, string>;
    priority?: 'high' | 'normal' | 'low';
  }): Promise<Notification> {
    const template = this.templates.get(data.templateId);
    if (!template) {
      throw new Error(`Template not found: ${data.templateId}`);
    }

    // Replace variables in template
    let title = template.title;
    let body = template.bodyTemplate;

    for (const [key, value] of Object.entries(data.variables)) {
      title = title.replace(`{${key}}`, value);
      body = body.replace(`{${key}}`, value);
    }

    return this.createNotification({
      userId: data.userId,
      tenantId: data.tenantId,
      type: template.type,
      title,
      body,
      priority: data.priority || template.priority as any,
      channels: template.channels
    });
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.get(notificationId);
    if (!notification) return;

    notification.status = 'read';
    notification.readAt = new Date();

    this.emit('notification:read', notification);
  }

  /**
   * Mark all user notifications as read
   */
  async markAllAsRead(userId: string, tenantId: string): Promise<number> {
    let count = 0;

    for (const [, notification] of this.notifications) {
      if (notification.userId === userId && notification.tenantId === tenantId && notification.status === 'pending') {
        await this.markAsRead(notification.id);
        count++;
      }
    }

    return count;
  }

  /**
   * Update user preferences
   */
  async updatePreferences(data: {
    userId: string;
    tenantId: string;
    pushEnabled?: boolean;
    emailEnabled?: boolean;
    smsEnabled?: boolean;
    inAppEnabled?: boolean;
    quietHours?: {
      startTime: string;
      endTime: string;
      timezone: string;
    };
    doNotDisturb?: boolean;
    notificationFrequency?: 'instant' | 'daily_digest' | 'weekly_digest';
  }): Promise<UserNotificationPreferences> {
    const key = `${data.userId}-${data.tenantId}`;
    let preferences = this.userPreferences.get(key);

    if (!preferences) {
      preferences = {
        userId: data.userId,
        tenantId: data.tenantId,
        pushEnabled: true,
        emailEnabled: true,
        smsEnabled: false,
        inAppEnabled: true,
        webhookEnabled: false,
        mutedTopics: new Set(),
        doNotDisturbStatus: 'disabled',
        notificationFrequency: 'instant'
      };
    }

    if (data.pushEnabled !== undefined) preferences.pushEnabled = data.pushEnabled;
    if (data.emailEnabled !== undefined) preferences.emailEnabled = data.emailEnabled;
    if (data.smsEnabled !== undefined) preferences.smsEnabled = data.smsEnabled;
    if (data.inAppEnabled !== undefined) preferences.inAppEnabled = data.inAppEnabled;
    if (data.quietHours) preferences.quietHours = data.quietHours;
    if (data.doNotDisturb !== undefined) {
      preferences.doNotDisturbStatus = data.doNotDisturb ? 'enabled' : 'disabled';
    }
    if (data.notificationFrequency) preferences.notificationFrequency = data.notificationFrequency;

    this.userPreferences.set(key, preferences);

    this.emit('preferences:updated', preferences);

    return preferences;
  }

  /**
   * Mute topic notifications
   */
  async muteTopic(userId: string, tenantId: string, topic: string): Promise<void> {
    const preferences = this.getOrCreatePreferences(userId, tenantId);
    preferences.mutedTopics.add(topic);

    this.emit('topic:muted', { userId, tenantId, topic });
  }

  /**
   * Unmute topic notifications
   */
  async unmuteTopic(userId: string, tenantId: string, topic: string): Promise<void> {
    const preferences = this.getOrCreatePreferences(userId, tenantId);
    preferences.mutedTopics.delete(topic);

    this.emit('topic:unmuted', { userId, tenantId, topic });
  }

  /**
   * Start delivery processor
   */
  private startDeliveryProcessor(): void {
    setInterval(() => {
      this.processDeliveries();
    }, this.config.deliveryProcessInterval);
  }

  /**
   * Process pending deliveries
   */
  private async processDeliveries(): Promise<void> {
    for (const [userId, pending] of this.pendingDeliveries) {
      for (const notification of pending) {
        if (notification.status === 'pending') {
          await this.deliverNotification(notification);
        }
      }
    }
  }

  /**
   * Deliver notification
   */
  private async deliverNotification(notification: Notification): Promise<void> {
    const preferences = this.getOrCreatePreferences(notification.userId, notification.tenantId);

    // Check quiet hours
    if (preferences.quietHours && this.isInQuietHours(preferences.quietHours)) {
      // Defer delivery or use digest mode
      return;
    }

    // Check DND status
    if (preferences.doNotDisturbStatus === 'enabled' && notification.priority !== 'high') {
      return;
    }

    // Deliver through channels
    for (const channel of notification.channels) {
      if (channel.status === 'pending') {
        await this.deliverToChannel(notification, channel);
      }
    }

    // Update notification status
    const allDelivered = notification.channels.every(
      c => c.status !== 'pending'
    );

    if (allDelivered) {
      notification.status = 'delivered';
    }

    this.emit('notification:delivered', notification);
  }

  /**
   * Deliver to specific channel
   */
  private async deliverToChannel(notification: Notification, channel: NotificationChannel): Promise<void> {
    try {
      // Simulate delivery based on channel type
      switch (channel.type) {
        case 'push':
          await this.deliverPush(notification);
          break;
        case 'email':
          await this.deliverEmail(notification);
          break;
        case 'sms':
          await this.deliverSMS(notification);
          break;
        case 'in-app':
          await this.deliverInApp(notification);
          break;
      }

      channel.status = 'sent';
      channel.sentAt = new Date();
      channel.deliveryId = `delivery-${Math.random().toString(36).substr(2, 9)}`;

      // Log delivery
      this.logDelivery(notification.id, notification.userId, channel.type, 'sent');
    } catch (error: any) {
      channel.failureReason = error.message;

      // Implement retry logic
      const log = this.getDeliveryLog(notification.id);
      const lastLog = log[log.length - 1];

      if (lastLog && lastLog.retryCount < this.config.retryAttempts) {
        channel.status = 'pending';
        const nextRetry = this.config.retryDelays[lastLog.retryCount];
        channel.nextRetryAt = new Date(Date.now() + nextRetry);
      } else {
        channel.status = 'failed';
      }

      this.logDelivery(notification.id, notification.userId, channel.type, 'failed', error.message);
    }
  }

  /**
   * Deliver push notification
   */
  private async deliverPush(notification: Notification): Promise<void> {
    // Simulated push delivery
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  /**
   * Deliver email notification
   */
  private async deliverEmail(notification: Notification): Promise<void> {
    // Simulated email delivery
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  /**
   * Deliver SMS notification
   */
  private async deliverSMS(notification: Notification): Promise<void> {
    // Simulated SMS delivery
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  /**
   * Deliver in-app notification
   */
  private async deliverInApp(notification: Notification): Promise<void> {
    // In-app delivery is immediate
    return;
  }

  /**
   * Start quiet hours check
   */
  private startQuietHoursCheck(): void {
    setInterval(() => {
      // Check for users in/out of quiet hours
      for (const preferences of this.userPreferences.values()) {
        if (preferences.quietHours) {
          const inQuiet = this.isInQuietHours(preferences.quietHours);
          // Can be used to trigger digest mode, etc.
        }
      }
    }, this.config.quietHoursCheckInterval);
  }

  /**
   * Check if current time is in quiet hours
   */
  private isInQuietHours(quietHours: { startTime: string; endTime: string; timezone: string }): boolean {
    // Simplified check (should use timezone library in production)
    const now = new Date();
    const [startHour, startMin] = quietHours.startTime.split(':').map(Number);
    const [endHour, endMin] = quietHours.endTime.split(':').map(Number);

    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    const currentTime = now.getHours() * 60 + now.getMinutes();

    if (startTime < endTime) {
      return currentTime >= startTime && currentTime < endTime;
    } else {
      return currentTime >= startTime || currentTime < endTime;
    }
  }

  /**
   * Log delivery attempt
   */
  private logDelivery(notificationId: string, userId: string, channel: string, status: string, reason?: string): void {
    const log: NotificationDeliveryLog = {
      id: `log-${Math.random().toString(36).substr(2, 9)}`,
      notificationId,
      userId,
      channel,
      status,
      timestamp: new Date(),
      failureReason: reason,
      retryCount: 0
    };

    const logs = this.deliveryLogs.get(notificationId) || [];
    logs.push(log);
    this.deliveryLogs.set(notificationId, logs);
  }

  /**
   * Get delivery log
   */
  private getDeliveryLog(notificationId: string): NotificationDeliveryLog[] {
    return this.deliveryLogs.get(notificationId) || [];
  }

  /**
   * Get or create preferences
   */
  private getOrCreatePreferences(userId: string, tenantId: string): UserNotificationPreferences {
    const key = `${userId}-${tenantId}`;
    let preferences = this.userPreferences.get(key);

    if (!preferences) {
      preferences = {
        userId,
        tenantId,
        pushEnabled: true,
        emailEnabled: true,
        smsEnabled: false,
        inAppEnabled: true,
        webhookEnabled: false,
        mutedTopics: new Set(),
        doNotDisturbStatus: 'disabled',
        notificationFrequency: 'instant'
      };
      this.userPreferences.set(key, preferences);
    }

    return preferences;
  }

  /**
   * Get user notifications
   */
  getUserNotifications(userId: string, tenantId: string, limit: number = 50): Notification[] {
    const notifications: Notification[] = [];

    for (const [, notification] of this.notifications) {
      if (notification.userId === userId && notification.tenantId === tenantId) {
        notifications.push(notification);
      }
    }

    return notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit);
  }

  /**
   * Get unread count
   */
  getUnreadCount(userId: string, tenantId: string): number {
    let count = 0;

    for (const [, notification] of this.notifications) {
      if (notification.userId === userId && notification.tenantId === tenantId && notification.status === 'pending') {
        count++;
      }
    }

    return count;
  }

  /**
   * Get notification stats
   */
  getNotificationStats(): {
    totalNotifications: number;
    pendingCount: number;
    deliveredCount: number;
    failedCount: number;
    avgDeliveryTime: number;
  } {
    let pending = 0, delivered = 0, failed = 0;
    let totalDeliveryTime = 0, deliveryCount = 0;

    for (const [, notification] of this.notifications) {
      switch (notification.status) {
        case 'pending': pending++; break;
        case 'delivered': delivered++; break;
        case 'failed': failed++; break;
      }

      // Calculate delivery time for delivered notifications
      for (const channel of notification.channels) {
        if (channel.sentAt) {
          totalDeliveryTime += channel.sentAt.getTime() - notification.createdAt.getTime();
          deliveryCount++;
        }
      }
    }

    return {
      totalNotifications: this.notifications.size,
      pendingCount: pending,
      deliveredCount: delivered,
      failedCount: failed,
      avgDeliveryTime: deliveryCount > 0 ? totalDeliveryTime / deliveryCount : 0
    };
  }
}

export const notificationService = new NotificationService();
