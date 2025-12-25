import { prisma } from '@/lib/prisma';
import { SocketServer } from '@/lib/websocket/socket-server';

/**
 * Read Receipts Service
 *
 * Track message read status per user
 * - Single check (sent)
 * - Double check (delivered/read)
 * - Read at timestamp
 * - Aggregate read count
 * - Read status updates
 */

export type ReceiptStatus = 'sent' | 'delivered' | 'read';

export interface MessageReceipt {
  messageId: string;
  userId: string;
  status: ReceiptStatus;
  readAt: Date;
  deliveredAt?: Date;
}

export interface AggregateReceipt {
  messageId: string;
  sent: number;
  delivered: number;
  read: number;
  readers: Array<{
    userId: string;
    userName: string;
    status: ReceiptStatus;
    readAt: Date;
  }>;
}

export class ReadReceiptService {
  /**
   * Mark message as sent (single check)
   */
  static async markAsSent(messageId: string, userId: string): Promise<MessageReceipt | null> {
    try {
      const receipt = await prisma.messageReceipt.upsert({
        where: {
          messageId_userId: {
            messageId,
            userId,
          },
        },
        create: {
          messageId,
          userId,
          status: 'sent',
          sentAt: new Date(),
        },
        update: {
          status: 'sent',
          sentAt: new Date(),
        },
      });

      return {
        messageId: receipt.messageId,
        userId: receipt.userId,
        status: receipt.status as ReceiptStatus,
        readAt: receipt.readAt,
        deliveredAt: receipt.deliveredAt || undefined,
      };
    } catch (error) {
      console.error('Failed to mark as sent:', error);
      return null;
    }
  }

  /**
   * Mark message as delivered (double check - no circle)
   */
  static async markAsDelivered(messageId: string, userId: string): Promise<MessageReceipt | null> {
    try {
      const receipt = await prisma.messageReceipt.upsert({
        where: {
          messageId_userId: {
            messageId,
            userId,
          },
        },
        create: {
          messageId,
          userId,
          status: 'delivered',
          deliveredAt: new Date(),
        },
        update: {
          status: 'delivered',
          deliveredAt: new Date(),
        },
      });

      return {
        messageId: receipt.messageId,
        userId: receipt.userId,
        status: receipt.status as ReceiptStatus,
        readAt: receipt.readAt,
        deliveredAt: receipt.deliveredAt || undefined,
      };
    } catch (error) {
      console.error('Failed to mark as delivered:', error);
      return null;
    }
  }

  /**
   * Mark message as read (double check - with circle)
   */
  static async markAsRead(
    messageId: string,
    userId: string,
    roomId: string
  ): Promise<MessageReceipt | null> {
    try {
      const receipt = await prisma.messageReceipt.upsert({
        where: {
          messageId_userId: {
            messageId,
            userId,
          },
        },
        create: {
          messageId,
          userId,
          status: 'read',
          readAt: new Date(),
          deliveredAt: new Date(),
        },
        update: {
          status: 'read',
          readAt: new Date(),
          deliveredAt: new Date(),
        },
      });

      // Broadcast read status to room
      await this.broadcastReadStatus(messageId, userId, roomId, 'read');

      return {
        messageId: receipt.messageId,
        userId: receipt.userId,
        status: receipt.status as ReceiptStatus,
        readAt: receipt.readAt,
        deliveredAt: receipt.deliveredAt || undefined,
      };
    } catch (error) {
      console.error('Failed to mark as read:', error);
      return null;
    }
  }

  /**
   * Get message receipts
   */
  static async getReceipts(messageId: string): Promise<AggregateReceipt | null> {
    try {
      const receipts = await prisma.messageReceipt.findMany({
        where: { messageId },
        include: {
          user: {
            select: { id: true, name: true },
          },
        },
      });

      if (receipts.length === 0) {
        return null;
      }

      const sent = receipts.filter((r) => r.status === 'sent').length;
      const delivered = receipts.filter((r) => r.status === 'delivered').length;
      const read = receipts.filter((r) => r.status === 'read').length;

      const readers = receipts
        .filter((r) => r.status === 'read')
        .map((r) => ({
          userId: r.userId,
          userName: r.user?.name || 'Unknown',
          status: 'read' as ReceiptStatus,
          readAt: r.readAt,
        }));

      return {
        messageId,
        sent,
        delivered,
        read,
        readers,
      };
    } catch (error) {
      console.error('Failed to get receipts:', error);
      return null;
    }
  }

  /**
   * Get receipts for multiple messages
   */
  static async getReceiptsBatch(
    messageIds: string[]
  ): Promise<Map<string, AggregateReceipt>> {
    try {
      const result = new Map<string, AggregateReceipt>();

      const receipts = await prisma.messageReceipt.findMany({
        where: { messageId: { in: messageIds } },
        include: {
          user: {
            select: { id: true, name: true },
          },
        },
      });

      // Group by message
      const grouped = new Map<string, typeof receipts>();
      for (const receipt of receipts) {
        if (!grouped.has(receipt.messageId)) {
          grouped.set(receipt.messageId, []);
        }
        grouped.get(receipt.messageId)!.push(receipt);
      }

      // Build aggregates
      for (const [messageId, msgReceipts] of grouped) {
        const sent = msgReceipts.filter((r) => r.status === 'sent').length;
        const delivered = msgReceipts.filter((r) => r.status === 'delivered').length;
        const read = msgReceipts.filter((r) => r.status === 'read').length;

        const readers = msgReceipts
          .filter((r) => r.status === 'read')
          .map((r) => ({
            userId: r.userId,
            userName: r.user?.name || 'Unknown',
            status: 'read' as ReceiptStatus,
            readAt: r.readAt,
          }));

        result.set(messageId, {
          messageId,
          sent,
          delivered,
          read,
          readers,
        });
      }

      return result;
    } catch (error) {
      console.error('Failed to get receipts batch:', error);
      return new Map();
    }
  }

  /**
   * Get user's read status for a message
   */
  static async getUserReceiptStatus(
    messageId: string,
    userId: string
  ): Promise<ReceiptStatus | null> {
    try {
      const receipt = await prisma.messageReceipt.findUnique({
        where: {
          messageId_userId: {
            messageId,
            userId,
          },
        },
      });

      return (receipt?.status as ReceiptStatus) || null;
    } catch (error) {
      console.error('Failed to get user receipt status:', error);
      return null;
    }
  }

  /**
   * Mark room messages as read
   */
  static async markRoomAsRead(roomId: string, userId: string): Promise<number> {
    try {
      // Get unread messages in room
      const messages = await prisma.message.findMany({
        where: { roomId },
        select: { id: true },
      });

      let readCount = 0;

      for (const message of messages) {
        const receipt = await this.markAsRead(message.id, userId, roomId);
        if (receipt) readCount++;
      }

      return readCount;
    } catch (error) {
      console.error('Failed to mark room as read:', error);
      return 0;
    }
  }

  /**
   * Get user's unread count in room
   */
  static async getUnreadCountInRoom(roomId: string, userId: string): Promise<number> {
    try {
      // Count messages without read receipt
      const unread = await prisma.message.count({
        where: {
          roomId,
          receipts: {
            none: {
              userId,
              status: 'read',
            },
          },
        },
      });

      return unread;
    } catch (error) {
      console.error('Failed to get unread count:', error);
      return 0;
    }
  }

  /**
   * Get read statistics for a message
   */
  static async getReadStats(messageId: string): Promise<{
    total: number;
    sent: number;
    delivered: number;
    read: number;
    readPercentage: number;
  }> {
    try {
      const aggregate = await this.getReceipts(messageId);

      if (!aggregate) {
        return {
          total: 0,
          sent: 0,
          delivered: 0,
          read: 0,
          readPercentage: 0,
        };
      }

      const total = aggregate.sent + aggregate.delivered + aggregate.read;
      const readPercentage = total > 0 ? (aggregate.read / total) * 100 : 0;

      return {
        total,
        sent: aggregate.sent,
        delivered: aggregate.delivered,
        read: aggregate.read,
        readPercentage,
      };
    } catch (error) {
      console.error('Failed to get read stats:', error);
      return { total: 0, sent: 0, delivered: 0, read: 0, readPercentage: 0 };
    }
  }

  /**
   * Broadcast read status to room
   */
  private static async broadcastReadStatus(
    messageId: string,
    userId: string,
    roomId: string,
    status: ReceiptStatus
  ): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true },
      });

      if (!user) return;

      SocketServer.emitToRoom(roomId, 'message:read', {
        messageId,
        userId,
        userName: user.name,
        status,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Failed to broadcast read status:', error);
    }
  }

  /**
   * Cleanup old receipts
   */
  static async cleanupOldReceipts(daysToKeep: number = 90): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      // Only delete read receipts for old messages
      const result = await prisma.messageReceipt.deleteMany({
        where: {
          message: {
            createdAt: { lt: cutoffDate },
          },
          status: 'read',
        },
      });

      return result.count;
    } catch (error) {
      console.error('Failed to cleanup old receipts:', error);
      return 0;
    }
  }
}
