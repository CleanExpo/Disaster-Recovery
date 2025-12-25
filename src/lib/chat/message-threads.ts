import { prisma } from '@/lib/prisma';
import { SocketServer } from '@/lib/websocket/socket-server';
import { SocketEvent } from '@/lib/websocket/events';
import { NotificationService } from '@/lib/notifications/notification-service';

/**
 * Message thread types and interfaces
 */
export interface ThreadReply {
  id: string;
  parentMessageId: string;
  content: string;
  senderId: string;
  senderName: string;
  createdAt: Date;
  editedAt?: Date;
  attachments?: Array<{
    url: string;
    type: string;
    name: string;
  }>;
}

export interface ThreadSummary {
  parentMessageId: string;
  replyCount: number;
  participants: Array<{
    id: string;
    name: string;
  }>;
  lastReplyAt: Date;
  unreadCount?: number;
}

export interface ThreadPayload {
  parentMessageId: string;
  roomId: string;
  userId: string;
  userName: string;
  content: string;
  attachments?: any[];
  timestamp: Date;
  type: 'thread_reply_added';
}

export class MessageThreadService {
  /**
   * Create a thread reply
   */
  static async createThreadReply(
    parentMessageId: string,
    roomId: string,
    senderId: string,
    senderName: string,
    content: string,
    attachments?: any[]
  ): Promise<ThreadPayload> {
    try {
      // Verify parent message exists
      const parentMessage = await prisma.message.findUnique({
        where: { id: parentMessageId },
        include: { sender: true },
      });

      if (!parentMessage) {
        throw new Error('Parent message not found');
      }

      // Verify room exists
      const room = await prisma.chatRoom.findUnique({
        where: { id: roomId },
      });

      if (!room) {
        throw new Error('Room not found');
      }

      // Create thread reply
      const reply = await prisma.message.create({
        data: {
          roomId,
          parentMessageId,
          content,
          senderId,
          attachments: attachments || [],
          isThreadReply: true,
        },
        include: {
          sender: true,
        },
      });

      // Update parent message reply count
      await prisma.message.update({
        where: { id: parentMessageId },
        data: {
          replyCount: {
            increment: 1,
          },
        },
      });

      // Get thread participants for notification
      const threadParticipants = await this.getThreadParticipants(parentMessageId);
      const participantIds = threadParticipants
        .map((p) => p.id)
        .filter((id) => id !== senderId);

      // Notify thread participants (except sender)
      for (const participantId of participantIds) {
        await NotificationService.notifySystem(
          participantId,
          'New Reply in Thread',
          `${senderName} replied to a thread you're in`,
          { parentMessageId, roomId }
        );
      }

      // Also notify the original message sender
      if (parentMessage.senderId !== senderId) {
        await NotificationService.notifySystem(
          parentMessage.senderId,
          'New Reply to Your Message',
          `${senderName} replied to your message`,
          { parentMessageId, roomId }
        );
      }

      const payload: ThreadPayload = {
        parentMessageId,
        roomId,
        userId: senderId,
        userName: senderName,
        content,
        attachments,
        timestamp: reply.createdAt,
        type: 'thread_reply_added',
      };

      // Emit to room
      SocketServer.emitToRoom(roomId, SocketEvent.CHAT_MESSAGE_RECEIVED, payload);

      return payload;
    } catch (error) {
      console.error('Failed to create thread reply:', error);
      throw error;
    }
  }

  /**
   * Get thread replies for a message
   */
  static async getThreadReplies(
    parentMessageId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<ThreadReply[]> {
    try {
      const replies = await prisma.message.findMany({
        where: { parentMessageId },
        select: {
          id: true,
          parentMessageId: true,
          content: true,
          senderId: true,
          sender: {
            select: { name: true },
          },
          createdAt: true,
          updatedAt: true,
          attachments: true,
        },
        orderBy: { createdAt: 'asc' },
        take: limit,
        skip: offset,
      });

      return replies.map((reply) => ({
        id: reply.id,
        parentMessageId: reply.parentMessageId!,
        content: reply.content,
        senderId: reply.senderId,
        senderName: reply.sender?.name || 'Unknown',
        createdAt: reply.createdAt,
        editedAt: reply.updatedAt !== reply.createdAt ? reply.updatedAt : undefined,
        attachments: reply.attachments as any,
      }));
    } catch (error) {
      console.error('Failed to get thread replies:', error);
      throw error;
    }
  }

  /**
   * Get thread summary for a message
   */
  static async getThreadSummary(
    parentMessageId: string,
    currentUserId?: string
  ): Promise<ThreadSummary | null> {
    try {
      const [replyCount, replies] = await Promise.all([
        prisma.message.count({
          where: { parentMessageId },
        }),
        prisma.message.findMany({
          where: { parentMessageId },
          select: {
            senderId: true,
            sender: { select: { id: true, name: true } },
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
        }),
      ]);

      if (replyCount === 0) {
        return null;
      }

      // Get unique participants
      const participantIds = new Set<string>();
      const participants: Array<{ id: string; name: string }> = [];

      const allReplies = await prisma.message.findMany({
        where: { parentMessageId },
        select: {
          senderId: true,
          sender: { select: { id: true, name: true } },
        },
        distinct: ['senderId'],
        take: 5,
      });

      for (const reply of allReplies) {
        if (!participantIds.has(reply.senderId) && reply.sender) {
          participantIds.add(reply.senderId);
          participants.push({
            id: reply.senderId,
            name: reply.sender.name,
          });
        }
      }

      return {
        parentMessageId,
        replyCount,
        participants,
        lastReplyAt: replies[0]?.createdAt || new Date(),
      };
    } catch (error) {
      console.error('Failed to get thread summary:', error);
      throw error;
    }
  }

  /**
   * Get thread summaries for multiple messages
   */
  static async getThreadSummaries(
    parentMessageIds: string[]
  ): Promise<Map<string, ThreadSummary>> {
    try {
      const result = new Map<string, ThreadSummary>();

      const replies = await prisma.message.findMany({
        where: { parentMessageId: { in: parentMessageIds } },
        select: {
          parentMessageId: true,
          senderId: true,
          sender: { select: { id: true, name: true } },
          createdAt: true,
        },
      });

      // Group by parent message
      const grouped = new Map<string, typeof replies>();
      for (const reply of replies) {
        if (!grouped.has(reply.parentMessageId!)) {
          grouped.set(reply.parentMessageId!, []);
        }
        grouped.get(reply.parentMessageId!)!.push(reply);
      }

      // Build summaries
      for (const parentMessageId of parentMessageIds) {
        const threadReplies = grouped.get(parentMessageId) || [];

        if (threadReplies.length === 0) {
          continue;
        }

        // Get unique participants
        const participants: Array<{ id: string; name: string }> = [];
        const participantIds = new Set<string>();

        for (const reply of threadReplies) {
          if (!participantIds.has(reply.senderId) && reply.sender) {
            participantIds.add(reply.senderId);
            participants.push({
              id: reply.senderId,
              name: reply.sender.name,
            });
          }
        }

        const lastReply = threadReplies.reduce((latest, current) =>
          current.createdAt > latest.createdAt ? current : latest
        );

        result.set(parentMessageId, {
          parentMessageId,
          replyCount: threadReplies.length,
          participants: participants.slice(0, 5),
          lastReplyAt: lastReply.createdAt,
        });
      }

      return result;
    } catch (error) {
      console.error('Failed to get thread summaries:', error);
      throw error;
    }
  }

  /**
   * Mark thread as read by user
   */
  static async markThreadAsRead(
    parentMessageId: string,
    userId: string
  ): Promise<void> {
    try {
      // Create or update thread read status
      await prisma.threadReadStatus.upsert({
        where: {
          userId_messageId: {
            userId,
            messageId: parentMessageId,
          },
        },
        create: {
          userId,
          messageId: parentMessageId,
          readAt: new Date(),
        },
        update: {
          readAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to mark thread as read:', error);
      throw error;
    }
  }

  /**
   * Get unread count for a thread
   */
  static async getUnreadThreadCount(
    parentMessageId: string,
    userId: string
  ): Promise<number> {
    try {
      const readStatus = await prisma.threadReadStatus.findUnique({
        where: {
          userId_messageId: {
            userId,
            messageId: parentMessageId,
          },
        },
      });

      const unreadReplies = await prisma.message.count({
        where: {
          parentMessageId,
          senderId: { not: userId },
          createdAt: {
            gt: readStatus?.readAt || new Date(0),
          },
        },
      });

      return unreadReplies;
    } catch (error) {
      console.error('Failed to get unread thread count:', error);
      return 0;
    }
  }

  /**
   * Get thread participants
   */
  static async getThreadParticipants(
    parentMessageId: string
  ): Promise<Array<{ id: string; name: string }>> {
    try {
      const participants = await prisma.message.findMany({
        where: { parentMessageId },
        select: {
          senderId: true,
          sender: { select: { id: true, name: true } },
        },
        distinct: ['senderId'],
      });

      return participants
        .map((p) => ({
          id: p.senderId,
          name: p.sender?.name || 'Unknown',
        }))
        .filter((p, index, self) => self.findIndex((x) => x.id === p.id) === index);
    } catch (error) {
      console.error('Failed to get thread participants:', error);
      return [];
    }
  }

  /**
   * Get all threads in a room
   */
  static async getRoomThreads(
    roomId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<
    Array<{
      messageId: string;
      content: string;
      senderName: string;
      summary: ThreadSummary;
    }>
  > {
    try {
      const parentMessages = await prisma.message.findMany({
        where: {
          roomId,
          replyCount: { gt: 0 },
        },
        select: {
          id: true,
          content: true,
          sender: { select: { name: true } },
        },
        orderBy: { updatedAt: 'desc' },
        take: limit,
        skip: offset,
      });

      const summaries = await this.getThreadSummaries(
        parentMessages.map((m) => m.id)
      );

      return parentMessages
        .map((msg) => ({
          messageId: msg.id,
          content: msg.content,
          senderName: msg.sender?.name || 'Unknown',
          summary: summaries.get(msg.id)!,
        }))
        .filter((item) => item.summary);
    } catch (error) {
      console.error('Failed to get room threads:', error);
      throw error;
    }
  }

  /**
   * Delete thread reply
   */
  static async deleteThreadReply(
    replyId: string,
    userId: string,
    parentMessageId: string
  ): Promise<boolean> {
    try {
      // Verify user owns the message
      const message = await prisma.message.findUnique({
        where: { id: replyId },
      });

      if (!message || message.senderId !== userId) {
        throw new Error('Not authorized to delete this message');
      }

      // Soft delete (mark as deleted)
      await prisma.message.update({
        where: { id: replyId },
        data: {
          content: '[Message deleted]',
          isDeleted: true,
          updatedAt: new Date(),
        },
      });

      // Update parent message reply count
      await prisma.message.update({
        where: { id: parentMessageId },
        data: {
          replyCount: {
            decrement: 1,
          },
        },
      });

      return true;
    } catch (error) {
      console.error('Failed to delete thread reply:', error);
      throw error;
    }
  }

  /**
   * Edit thread reply
   */
  static async editThreadReply(
    replyId: string,
    userId: string,
    newContent: string
  ): Promise<ThreadReply | null> {
    try {
      // Verify user owns the message
      const message = await prisma.message.findUnique({
        where: { id: replyId },
      });

      if (!message || message.senderId !== userId) {
        throw new Error('Not authorized to edit this message');
      }

      // Update message
      const updated = await prisma.message.update({
        where: { id: replyId },
        data: {
          content: newContent,
          updatedAt: new Date(),
        },
        include: {
          sender: true,
        },
      });

      return {
        id: updated.id,
        parentMessageId: updated.parentMessageId!,
        content: updated.content,
        senderId: updated.senderId,
        senderName: updated.sender?.name || 'Unknown',
        createdAt: updated.createdAt,
        editedAt: updated.updatedAt,
      };
    } catch (error) {
      console.error('Failed to edit thread reply:', error);
      throw error;
    }
  }

  /**
   * Get thread statistics
   */
  static async getThreadStats(
    startDate: Date,
    endDate: Date
  ): Promise<{
    totalThreads: number;
    totalReplies: number;
    averageRepliesPerThread: number;
    topThreads: Array<{ messageId: string; replyCount: number }>;
  }> {
    try {
      const messages = await prisma.message.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          id: true,
          parentMessageId: true,
          replyCount: true,
        },
      });

      const parentMessages = messages.filter((m) => m.replyCount > 0);
      const replies = messages.filter((m) => m.parentMessageId);

      const topThreads = parentMessages
        .map((m) => ({
          messageId: m.id,
          replyCount: m.replyCount,
        }))
        .sort((a, b) => b.replyCount - a.replyCount)
        .slice(0, 10);

      return {
        totalThreads: parentMessages.length,
        totalReplies: replies.length,
        averageRepliesPerThread:
          parentMessages.length > 0 ? replies.length / parentMessages.length : 0,
        topThreads,
      };
    } catch (error) {
      console.error('Failed to get thread stats:', error);
      throw error;
    }
  }
}
