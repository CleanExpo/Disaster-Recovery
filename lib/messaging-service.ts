import { prisma } from '@/lib/prisma';

export interface MessageData {
  senderId: string;
  receiverId: string;
  subject?: string;
  content: string;
  messageType: 'GENERAL' | 'MATCH_NOTIFICATION' | 'PROJECT_UPDATE' | 'PAYMENT_REMINDER' | 'SYSTEM_NOTIFICATION';
  requestId?: string;
}

export class MessagingService {
  /**
   * Send a message
   */
  static async sendMessage(messageData: MessageData) {
    try {
      const message = await prisma.message.create({
        data: {
          senderId: messageData.senderId,
          receiverId: messageData.receiverId,
          subject: messageData.subject,
          content: messageData.content,
          messageType: messageData.messageType,
          requestId: messageData.requestId
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          },
          receiver: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          }
        }
      });

      return message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  /**
   * Send automated match notification
   */
  static async sendMatchNotification(
    contractorId: string,
    clientId: string,
    requestId: string,
    matchScore: number
  ) {
    const subject = 'New Service Request Match';
    const content = `You have been matched with a new service request! Match score: ${matchScore}%. Please review the request details and respond.`;

    return this.sendMessage({
      senderId: 'system', // System message
      receiverId: contractorId,
      subject,
      content,
      messageType: 'MATCH_NOTIFICATION',
      requestId
    });
  }

  /**
   * Send project update notification
   */
  static async sendProjectUpdate(
    senderId: string,
    receiverId: string,
    requestId: string,
    update: string
  ) {
    const subject = 'Project Update';
    const content = `Project update: ${update}`;

    return this.sendMessage({
      senderId,
      receiverId,
      subject,
      content,
      messageType: 'PROJECT_UPDATE',
      requestId
    });
  }

  /**
   * Send payment reminder
   */
  static async sendPaymentReminder(
    clientId: string,
    requestId: string,
    amount: number
  ) {
    const subject = 'Payment Reminder';
    const content = `This is a reminder that payment of $${amount} is due for your service request. Please process payment to continue with your project.`;

    return this.sendMessage({
      senderId: 'system',
      receiverId: clientId,
      subject,
      content,
      messageType: 'PAYMENT_REMINDER',
      requestId
    });
  }

  /**
   * Send system notification
   */
  static async sendSystemNotification(
    userId: string,
    title: string,
    message: string,
    requestId?: string
  ) {
    return this.sendMessage({
      senderId: 'system',
      receiverId: userId,
      subject: title,
      content: message,
      messageType: 'SYSTEM_NOTIFICATION',
      requestId
    });
  }

  /**
   * Get messages for a user
   */
  static async getUserMessages(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ) {
    try {
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId },
            { receiverId: userId }
          ]
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          },
          receiver: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: limit,
        skip: offset
      });

      return messages;
    } catch (error) {
      console.error('Error getting user messages:', error);
      throw new Error('Failed to get user messages');
    }
  }

  /**
   * Get unread message count for a user
   */
  static async getUnreadCount(userId: string) {
    try {
      return await prisma.message.count({
        where: {
          receiverId: userId,
          isRead: false
        }
      });
    } catch (error) {
      console.error('Error getting unread count:', error);
      throw new Error('Failed to get unread count');
    }
  }

  /**
   * Mark message as read
   */
  static async markAsRead(messageId: string, userId: string) {
    try {
      return await prisma.message.updateMany({
        where: {
          id: messageId,
          receiverId: userId
        },
        data: {
          isRead: true
        }
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw new Error('Failed to mark message as read');
    }
  }

  /**
   * Mark all messages as read for a user
   */
  static async markAllAsRead(userId: string) {
    try {
      return await prisma.message.updateMany({
        where: {
          receiverId: userId,
          isRead: false
        },
        data: {
          isRead: true
        }
      });
    } catch (error) {
      console.error('Error marking all messages as read:', error);
      throw new Error('Failed to mark all messages as read');
    }
  }

  /**
   * Get conversation between two users
   */
  static async getConversation(
    user1Id: string,
    user2Id: string,
    requestId?: string,
    limit: number = 50
  ) {
    try {
      const whereClause: any = {
        OR: [
          {
            senderId: user1Id,
            receiverId: user2Id
          },
          {
            senderId: user2Id,
            receiverId: user1Id
          }
        ]
      };

      if (requestId) {
        whereClause.requestId = requestId;
      }

      const messages = await prisma.message.findMany({
        where: whereClause,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          },
          receiver: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          }
        },
        orderBy: {
          createdAt: 'asc'
        },
        take: limit
      });

      return messages;
    } catch (error) {
      console.error('Error getting conversation:', error);
      throw new Error('Failed to get conversation');
    }
  }

  /**
   * Delete a message
   */
  static async deleteMessage(messageId: string, userId: string) {
    try {
      // Only allow sender or receiver to delete
      const message = await prisma.message.findFirst({
        where: {
          id: messageId,
          OR: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      });

      if (!message) {
        throw new Error('Message not found or access denied');
      }

      return await prisma.message.delete({
        where: { id: messageId }
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      throw new Error('Failed to delete message');
    }
  }
}
