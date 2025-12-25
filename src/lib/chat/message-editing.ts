import { prisma } from '@/lib/prisma';
import { SocketServer } from '@/lib/websocket/socket-server';
import { SocketEvent } from '@/lib/websocket/events';

/**
 * Message edit types and interfaces
 */
export interface MessageEdit {
  id: string;
  messageId: string;
  previousContent: string;
  newContent: string;
  editedBy: string;
  editedAt: Date;
}

export interface EditableMessage {
  id: string;
  content: string;
  isEdited: boolean;
  editHistory?: MessageEdit[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageEditPayload {
  messageId: string;
  roomId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  editCount: number;
  type: 'message_edited';
}

const EDIT_TIME_LIMIT_MS = 15 * 60 * 1000; // 15 minutes
const MAX_EDIT_HISTORY = 50;

export class MessageEditingService {
  /**
   * Edit a message
   */
  static async editMessage(
    messageId: string,
    userId: string,
    newContent: string,
    roomId: string
  ): Promise<MessageEditPayload> {
    try {
      // Get the message
      const message = await prisma.message.findUnique({
        where: { id: messageId },
      });

      if (!message) {
        throw new Error('Message not found');
      }

      // Verify user is the sender
      if (message.senderId !== userId) {
        throw new Error('Not authorized to edit this message');
      }

      // Check edit time limit
      const timeSinceCreation = Date.now() - message.createdAt.getTime();
      if (timeSinceCreation > EDIT_TIME_LIMIT_MS) {
        throw new Error('Message is too old to edit (15 minute limit)');
      }

      // Validate new content
      if (!newContent || newContent.trim().length === 0) {
        throw new Error('Message content cannot be empty');
      }

      if (newContent.length > 4000) {
        throw new Error('Message content is too long (max 4000 characters)');
      }

      // Prevent spam edits (same content)
      if (newContent === message.content) {
        throw new Error('New content must be different from current content');
      }

      // Save edit history
      await prisma.messageEditHistory.create({
        data: {
          messageId,
          previousContent: message.content,
          newContent,
          editedBy: userId,
        },
      });

      // Update message
      const updatedMessage = await prisma.message.update({
        where: { id: messageId },
        data: {
          content: newContent,
          updatedAt: new Date(),
        },
        include: {
          sender: true,
        },
      });

      // Count edits
      const editCount = await prisma.messageEditHistory.count({
        where: { messageId },
      });

      const payload: MessageEditPayload = {
        messageId,
        roomId,
        userId,
        userName: updatedMessage.sender?.name || 'Unknown',
        content: newContent,
        timestamp: updatedMessage.updatedAt,
        editCount,
        type: 'message_edited',
      };

      // Emit to room
      SocketServer.emitToRoom(roomId, SocketEvent.CHAT_MESSAGE_RECEIVED, payload);

      return payload;
    } catch (error) {
      console.error('Failed to edit message:', error);
      throw error;
    }
  }

  /**
   * Delete a message
   */
  static async deleteMessage(
    messageId: string,
    userId: string,
    roomId: string,
    soft: boolean = true // soft delete = mark as deleted, hard delete = remove from DB
  ): Promise<boolean> {
    try {
      // Get the message
      const message = await prisma.message.findUnique({
        where: { id: messageId },
      });

      if (!message) {
        throw new Error('Message not found');
      }

      // Verify user is the sender or admin
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      const isAdmin = user?.role === 'admin';
      if (message.senderId !== userId && !isAdmin) {
        throw new Error('Not authorized to delete this message');
      }

      if (soft) {
        // Soft delete: mark as deleted
        await prisma.message.update({
          where: { id: messageId },
          data: {
            content: '[Message deleted]',
            isDeleted: true,
            updatedAt: new Date(),
          },
        });

        // Clear edit history for deleted messages
        await prisma.messageEditHistory.deleteMany({
          where: { messageId },
        });

        // Emit deletion event
        SocketServer.emitToRoom(roomId, SocketEvent.CHAT_MESSAGE_RECEIVED, {
          type: 'message_deleted',
          messageId,
          roomId,
          timestamp: new Date(),
        });
      } else {
        // Hard delete: remove completely (admin only)
        if (!isAdmin) {
          throw new Error('Only admins can permanently delete messages');
        }

        // Delete related data
        await prisma.messageReaction.deleteMany({
          where: { messageId },
        });

        await prisma.messageEditHistory.deleteMany({
          where: { messageId },
        });

        await prisma.threadReadStatus.deleteMany({
          where: { messageId },
        });

        // Delete the message
        await prisma.message.delete({
          where: { id: messageId },
        });

        // Emit hard deletion event
        SocketServer.emitToRoom(roomId, SocketEvent.CHAT_MESSAGE_RECEIVED, {
          type: 'message_permanently_deleted',
          messageId,
          roomId,
          timestamp: new Date(),
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw error;
    }
  }

  /**
   * Get message edit history
   */
  static async getEditHistory(
    messageId: string,
    limit: number = 50
  ): Promise<MessageEdit[]> {
    try {
      const edits = await prisma.messageEditHistory.findMany({
        where: { messageId },
        take: limit,
        orderBy: { editedAt: 'desc' },
      });

      return edits.map((edit) => ({
        id: edit.id,
        messageId: edit.messageId,
        previousContent: edit.previousContent,
        newContent: edit.newContent,
        editedBy: edit.editedBy,
        editedAt: edit.editedAt,
      }));
    } catch (error) {
      console.error('Failed to get edit history:', error);
      throw error;
    }
  }

  /**
   * Get complete message with edit info
   */
  static async getMessageWithEditInfo(
    messageId: string,
    includeHistory: boolean = false
  ): Promise<EditableMessage | null> {
    try {
      const message = await prisma.message.findUnique({
        where: { id: messageId },
      });

      if (!message) {
        return null;
      }

      const editCount = await prisma.messageEditHistory.count({
        where: { messageId },
      });

      const editHistory = includeHistory
        ? await this.getEditHistory(messageId)
        : undefined;

      return {
        id: message.id,
        content: message.content,
        isEdited: editCount > 0,
        editHistory,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      };
    } catch (error) {
      console.error('Failed to get message with edit info:', error);
      throw error;
    }
  }

  /**
   * Restore message from edit history
   */
  static async restoreMessageVersion(
    messageId: string,
    userId: string,
    roomId: string,
    versionIndex: number = 0
  ): Promise<MessageEditPayload | null> {
    try {
      // Get the message
      const message = await prisma.message.findUnique({
        where: { id: messageId },
      });

      if (!message) {
        throw new Error('Message not found');
      }

      // Verify user is admin or message owner
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (message.senderId !== userId && user?.role !== 'admin') {
        throw new Error('Not authorized to restore this message');
      }

      // Get edit history
      const edits = await prisma.messageEditHistory.findMany({
        where: { messageId },
        orderBy: { editedAt: 'desc' },
        skip: versionIndex,
        take: 1,
      });

      if (edits.length === 0) {
        return null; // No version at that index
      }

      const edit = edits[0];

      // Restore to previous version
      return await this.editMessage(messageId, userId, edit.previousContent, roomId);
    } catch (error) {
      console.error('Failed to restore message version:', error);
      throw error;
    }
  }

  /**
   * Get messages with edit status for list view
   */
  static async getMessagesWithEditStatus(
    messageIds: string[]
  ): Promise<Map<string, { isEdited: boolean; editCount: number }>> {
    try {
      const edits = await prisma.messageEditHistory.findMany({
        where: { messageId: { in: messageIds } },
      });

      const result = new Map<string, { isEdited: boolean; editCount: number }>();

      // Initialize all messages
      for (const messageId of messageIds) {
        result.set(messageId, { isEdited: false, editCount: 0 });
      }

      // Count edits per message
      const editCounts = new Map<string, number>();
      for (const edit of edits) {
        editCounts.set(edit.messageId, (editCounts.get(edit.messageId) ?? 0) + 1);
      }

      // Update results
      for (const [messageId, count] of editCounts.entries()) {
        result.set(messageId, { isEdited: true, editCount: count });
      }

      return result;
    } catch (error) {
      console.error('Failed to get messages with edit status:', error);
      throw error;
    }
  }

  /**
   * Cleanup old edit history (retention policy)
   */
  static async cleanupOldEditHistory(
    daysToKeep: number = 90
  ): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      const result = await prisma.messageEditHistory.deleteMany({
        where: {
          editedAt: {
            lt: cutoffDate,
          },
        },
      });

      console.log(`Cleaned up ${result.count} old edit history records`);
      return result.count;
    } catch (error) {
      console.error('Failed to cleanup old edit history:', error);
      throw error;
    }
  }

  /**
   * Get editing statistics
   */
  static async getEditingStats(
    startDate: Date,
    endDate: Date
  ): Promise<{
    totalEdits: number;
    uniqueMessagesEdited: number;
    averageEditsPerMessage: number;
    topEditedMessages: Array<{ messageId: string; editCount: number }>;
    totalDeletes: number;
  }> {
    try {
      const edits = await prisma.messageEditHistory.findMany({
        where: {
          editedAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      const deletedMessages = await prisma.message.count({
        where: {
          isDeleted: true,
          updatedAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      // Count edits per message
      const editCounts = new Map<string, number>();
      for (const edit of edits) {
        editCounts.set(edit.messageId, (editCounts.get(edit.messageId) ?? 0) + 1);
      }

      const topEditedMessages = Array.from(editCounts.entries())
        .map(([messageId, count]) => ({ messageId, editCount: count }))
        .sort((a, b) => b.editCount - a.editCount)
        .slice(0, 10);

      return {
        totalEdits: edits.length,
        uniqueMessagesEdited: editCounts.size,
        averageEditsPerMessage: editCounts.size > 0 ? edits.length / editCounts.size : 0,
        topEditedMessages,
        totalDeletes: deletedMessages,
      };
    } catch (error) {
      console.error('Failed to get editing stats:', error);
      throw error;
    }
  }
}
