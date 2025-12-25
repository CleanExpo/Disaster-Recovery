import { prisma } from '@/lib/prisma';
import { ChatMessage, ChatMessagePayload } from '@/lib/websocket/events';

export class MessageService {
  /**
   * Send a message in a chat room
   */
  static async sendMessage(
    roomId: string,
    senderId: string,
    payload: ChatMessagePayload
  ): Promise<ChatMessage> {
    try {
      // Verify user is member of room
      const membership = await prisma.chatRoomMember.findFirst({
        where: {
          roomId,
          userId: senderId,
        },
      });

      if (!membership) {
        throw new Error('User is not a member of this chat room');
      }

      // Get sender info
      const sender = await prisma.user.findUnique({
        where: { id: senderId },
        select: { firstName: true, lastName: true, avatar: true },
      });

      if (!sender) {
        throw new Error('Sender not found');
      }

      // Create message
      const message = await prisma.chatMessage.create({
        data: {
          roomId,
          senderId,
          content: payload.content,
          attachments: payload.attachments || [],
          readBy: [senderId], // Sender has automatically read their own message
        },
      });

      // Notify other members
      await this.notifyNewMessage(roomId, senderId, message.id, payload.content);

      return {
        id: message.id,
        roomId: message.roomId,
        senderId: message.senderId,
        senderName: `${sender.firstName} ${sender.lastName}`,
        senderAvatar: sender.avatar || undefined,
        content: message.content,
        attachments: message.attachments as any,
        readBy: message.readBy as string[],
        createdAt: message.createdAt,
      };
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  /**
   * Get messages in a chat room with pagination
   */
  static async getMessages(
    roomId: string,
    options: {
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<ChatMessage[]> {
    const { limit = 50, offset = 0 } = options;

    try {
      const messages = await prisma.chatMessage.findMany({
        where: { roomId },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: 'asc' },
        take: limit,
        skip: offset,
      });

      return messages.map((msg) => ({
        id: msg.id,
        roomId: msg.roomId,
        senderId: msg.senderId,
        senderName: `${msg.sender.firstName} ${msg.sender.lastName}`,
        senderAvatar: msg.sender.avatar || undefined,
        content: msg.content,
        attachments: msg.attachments as any,
        readBy: msg.readBy as string[],
        createdAt: msg.createdAt,
      }));
    } catch (error) {
      console.error('Failed to get messages:', error);
      throw error;
    }
  }

  /**
   * Mark messages as read
   */
  static async markAsRead(roomId: string, userId: string): Promise<void> {
    try {
      // Get all unread messages in room
      const messages = await prisma.chatMessage.findMany({
        where: {
          roomId,
          readBy: {
            not: {
              has: userId,
            },
          },
        },
        select: { id: true, readBy: true },
      });

      // Update each message to include this user as reader
      for (const message of messages) {
        await prisma.chatMessage.update({
          where: { id: message.id },
          data: {
            readBy: [...message.readBy, userId],
          },
        });
      }
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
      throw error;
    }
  }

  /**
   * Search messages in a room
   */
  static async searchMessages(
    roomId: string,
    query: string,
    options: {
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<ChatMessage[]> {
    const { limit = 20, offset = 0 } = options;

    try {
      const messages = await prisma.chatMessage.findMany({
        where: {
          roomId,
          content: {
            contains: query,
            mode: 'insensitive',
          },
        },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      });

      return messages.map((msg) => ({
        id: msg.id,
        roomId: msg.roomId,
        senderId: msg.senderId,
        senderName: `${msg.sender.firstName} ${msg.sender.lastName}`,
        senderAvatar: msg.sender.avatar || undefined,
        content: msg.content,
        attachments: msg.attachments as any,
        readBy: msg.readBy as string[],
        createdAt: msg.createdAt,
      }));
    } catch (error) {
      console.error('Failed to search messages:', error);
      throw error;
    }
  }

  /**
   * Delete a message (soft delete)
   */
  static async deleteMessage(messageId: string, userId: string): Promise<void> {
    try {
      const message = await prisma.chatMessage.findUnique({
        where: { id: messageId },
      });

      if (!message) {
        throw new Error('Message not found');
      }

      if (message.senderId !== userId) {
        throw new Error('You can only delete your own messages');
      }

      // Soft delete
      await prisma.chatMessage.update({
        where: { id: messageId },
        data: {
          content: '[Message deleted]',
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw error;
    }
  }

  /**
   * Edit a message
   */
  static async editMessage(
    messageId: string,
    userId: string,
    newContent: string
  ): Promise<ChatMessage> {
    try {
      const message = await prisma.chatMessage.findUnique({
        where: { id: messageId },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
      });

      if (!message) {
        throw new Error('Message not found');
      }

      if (message.senderId !== userId) {
        throw new Error('You can only edit your own messages');
      }

      // Only allow editing within 1 hour
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      if (message.createdAt < oneHourAgo) {
        throw new Error('Messages can only be edited within 1 hour of creation');
      }

      const updated = await prisma.chatMessage.update({
        where: { id: messageId },
        data: {
          content: newContent,
          editedAt: new Date(),
        },
      });

      return {
        id: updated.id,
        roomId: updated.roomId,
        senderId: updated.senderId,
        senderName: `${message.sender.firstName} ${message.sender.lastName}`,
        senderAvatar: message.sender.avatar || undefined,
        content: updated.content,
        attachments: updated.attachments as any,
        readBy: updated.readBy as string[],
        createdAt: updated.createdAt,
      };
    } catch (error) {
      console.error('Failed to edit message:', error);
      throw error;
    }
  }

  /**
   * Get message count in room
   */
  static async getMessageCount(roomId: string): Promise<number> {
    try {
      return await prisma.chatMessage.count({
        where: { roomId },
      });
    } catch (error) {
      console.error('Failed to get message count:', error);
      throw error;
    }
  }

  /**
   * Get unread message count for user in room
   */
  static async getUnreadCount(roomId: string, userId: string): Promise<number> {
    try {
      return await prisma.chatMessage.count({
        where: {
          roomId,
          readBy: {
            not: {
              has: userId,
            },
          },
        },
      });
    } catch (error) {
      console.error('Failed to get unread count:', error);
      throw error;
    }
  }

  /**
   * Notify members about new message
   */
  private static async notifyNewMessage(
    roomId: string,
    senderId: string,
    messageId: string,
    content: string
  ): Promise<void> {
    try {
      // Get room members
      const members = await prisma.chatRoomMember.findMany({
        where: {
          roomId,
          userId: {
            not: senderId,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      // Emit notification for each member
      // This will be integrated with WebSocket server
      for (const member of members) {
        // Track unread messages
        await prisma.chatMessage.updateMany({
          where: { id: messageId },
          data: {
            readBy: {
              push: senderId,
            },
          },
        });
      }
    } catch (error) {
      console.error('Failed to notify members:', error);
      // Don't throw - notification failure shouldn't prevent message delivery
    }
  }

  /**
   * Get conversation history between two users
   */
  static async getDirectMessageHistory(
    userId1: string,
    userId2: string,
    options: {
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<ChatMessage[]> {
    const { limit = 50, offset = 0 } = options;

    try {
      // Find or create direct message room
      let room = await prisma.chatRoom.findFirst({
        where: {
          isDirect: true,
          members: {
            every: {
              userId: {
                in: [userId1, userId2],
              },
            },
          },
        },
      });

      if (!room) {
        // Return empty array if room doesn't exist
        return [];
      }

      return await this.getMessages(room.id, { limit, offset });
    } catch (error) {
      console.error('Failed to get direct message history:', error);
      throw error;
    }
  }

  /**
   * Export chat history
   */
  static async exportChatHistory(
    roomId: string,
    format: 'json' | 'csv' = 'json'
  ): Promise<string> {
    try {
      const messages = await this.getMessages(roomId, { limit: 10000 });

      if (format === 'json') {
        return JSON.stringify(messages, null, 2);
      } else {
        // CSV format
        const headers = ['Timestamp', 'Sender', 'Message'];
        const rows = messages.map((m) => [
          m.createdAt.toISOString(),
          m.senderName,
          m.content.replace(/"/g, '""'), // Escape quotes
        ]);

        const csv = [
          headers.join(','),
          ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
        ].join('\n');

        return csv;
      }
    } catch (error) {
      console.error('Failed to export chat history:', error);
      throw error;
    }
  }
}
