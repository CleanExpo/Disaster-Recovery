import { prisma } from '@/lib/prisma';
import { Notification, NotificationPayload } from '@/lib/websocket/events';

export class NotificationService {
  /**
   * Create and send a notification
   */
  static async sendNotification(payload: NotificationPayload): Promise<Notification> {
    try {
      // Create notification in database
      const notification = await prisma.notification.create({
        data: {
          userId: payload.userId,
          type: payload.type,
          title: payload.title,
          message: payload.message,
          data: payload.data || {},
          read: false,
          channels: payload.channels || ['in-app'],
        },
      });

      // Emit WebSocket event for real-time delivery
      // This will be handled by the socket server
      return {
        id: notification.id,
        userId: notification.userId,
        type: notification.type as any,
        title: notification.title,
        message: notification.message,
        data: notification.data as any,
        read: notification.read,
        createdAt: notification.createdAt,
        channels: notification.channels as any,
      };
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw error;
    }
  }

  /**
   * Get notifications for a user
   */
  static async getUserNotifications(
    userId: string,
    options: {
      limit?: number;
      offset?: number;
      unreadOnly?: boolean;
    } = {}
  ): Promise<Notification[]> {
    const { limit = 20, offset = 0, unreadOnly = false } = options;

    try {
      const notifications = await prisma.notification.findMany({
        where: {
          userId,
          ...(unreadOnly && { read: false }),
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
      });

      return notifications.map((n) => ({
        id: n.id,
        userId: n.userId,
        type: n.type as any,
        title: n.title,
        message: n.message,
        data: n.data as any,
        read: n.read,
        createdAt: n.createdAt,
        channels: n.channels as any,
      }));
    } catch (error) {
      console.error('Failed to get user notifications:', error);
      throw error;
    }
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string, userId: string): Promise<void> {
    try {
      await prisma.notification.updateMany({
        where: {
          id: notificationId,
          userId,
        },
        data: {
          read: true,
        },
      });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      throw error;
    }
  }

  /**
   * Mark all notifications as read
   */
  static async markAllAsRead(userId: string): Promise<void> {
    try {
      await prisma.notification.updateMany({
        where: {
          userId,
          read: false,
        },
        data: {
          read: true,
        },
      });
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      throw error;
    }
  }

  /**
   * Delete a notification
   */
  static async deleteNotification(notificationId: string, userId: string): Promise<void> {
    try {
      await prisma.notification.deleteMany({
        where: {
          id: notificationId,
          userId,
        },
      });
    } catch (error) {
      console.error('Failed to delete notification:', error);
      throw error;
    }
  }

  /**
   * Delete all notifications for a user
   */
  static async deleteAllNotifications(userId: string): Promise<void> {
    try {
      await prisma.notification.deleteMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.error('Failed to delete all notifications:', error);
      throw error;
    }
  }

  /**
   * Get unread notification count
   */
  static async getUnreadCount(userId: string): Promise<number> {
    try {
      const count = await prisma.notification.count({
        where: {
          userId,
          read: false,
        },
      });
      return count;
    } catch (error) {
      console.error('Failed to get unread count:', error);
      throw error;
    }
  }

  /**
   * Create booking notification
   */
  static async notifyBookingCreated(
    bookingId: string,
    customerId: string,
    serviceType: string,
    location: string
  ): Promise<void> {
    await this.sendNotification({
      userId: customerId,
      type: 'booking',
      title: 'Booking Created',
      message: `Your ${serviceType} booking at ${location} has been created successfully.`,
      data: { bookingId, serviceType, location },
      channels: ['in-app', 'email'],
    });
  }

  /**
   * Create booking assigned notification
   */
  static async notifyBookingAssigned(
    bookingId: string,
    customerId: string,
    contractorId: string,
    contractorName: string
  ): Promise<void> {
    // Notify customer
    await this.sendNotification({
      userId: customerId,
      type: 'booking',
      title: 'Contractor Assigned',
      message: `${contractorName} has been assigned to your booking.`,
      data: { bookingId, contractorId, contractorName },
      channels: ['in-app', 'email'],
    });

    // Notify contractor
    await this.sendNotification({
      userId: contractorId,
      type: 'booking',
      title: 'New Job Assignment',
      message: 'You have been assigned a new job.',
      data: { bookingId },
      channels: ['in-app', 'email'],
    });
  }

  /**
   * Create claim submitted notification
   */
  static async notifyClaimSubmitted(
    claimId: string,
    customerId: string,
    amount: number
  ): Promise<void> {
    await this.sendNotification({
      userId: customerId,
      type: 'claim',
      title: 'Claim Submitted',
      message: `Your insurance claim for $${amount.toFixed(2)} AUD has been submitted.`,
      data: { claimId, amount },
      channels: ['in-app', 'email'],
    });
  }

  /**
   * Create claim approved notification
   */
  static async notifyClaimApproved(
    claimId: string,
    customerId: string,
    amount: number,
    paymentDate?: Date
  ): Promise<void> {
    const message = paymentDate
      ? `Your claim for $${amount.toFixed(2)} AUD has been approved. Payment will be processed on ${paymentDate.toLocaleDateString()}.`
      : `Your claim for $${amount.toFixed(2)} AUD has been approved.`;

    await this.sendNotification({
      userId: customerId,
      type: 'claim',
      title: 'Claim Approved',
      message,
      data: { claimId, amount, paymentDate },
      channels: ['in-app', 'email'],
    });
  }

  /**
   * Create claim rejected notification
   */
  static async notifyClaimRejected(
    claimId: string,
    customerId: string,
    reason: string,
    appealDeadline: Date
  ): Promise<void> {
    await this.sendNotification({
      userId: customerId,
      type: 'claim',
      title: 'Claim Rejected',
      message: `Your claim has been rejected. Reason: ${reason}. You can appeal until ${appealDeadline.toLocaleDateString()}.`,
      data: { claimId, reason, appealDeadline },
      channels: ['in-app', 'email'],
    });
  }

  /**
   * Create contractor verification notification
   */
  static async notifyContractorVerified(
    contractorId: string,
    contractorName: string
  ): Promise<void> {
    await this.sendNotification({
      userId: contractorId,
      type: 'contractor',
      title: 'Verification Complete',
      message: 'Congratulations! Your profile has been verified and approved.',
      data: { contractorName },
      channels: ['in-app', 'email'],
    });
  }

  /**
   * Create chat message notification
   */
  static async notifyNewMessage(
    userId: string,
    senderName: string,
    message: string,
    roomId: string
  ): Promise<void> {
    await this.sendNotification({
      userId,
      type: 'chat',
      title: `Message from ${senderName}`,
      message,
      data: { senderName, roomId },
      channels: ['in-app'],
    });
  }

  /**
   * Create system notification
   */
  static async notifySystem(
    userId: string,
    title: string,
    message: string,
    data?: Record<string, any>
  ): Promise<void> {
    await this.sendNotification({
      userId,
      type: 'system',
      title,
      message,
      data,
      channels: ['in-app'],
    });
  }
}
