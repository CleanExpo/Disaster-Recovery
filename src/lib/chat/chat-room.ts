import { prisma } from '@/lib/prisma';
import { NotificationService } from '@/lib/notifications/notification-service';

export class ChatRoomService {
  /**
   * Create a new chat room
   */
  static async createRoom(
    name: string,
    members: string[],
    isDirect: boolean = false,
    description?: string
  ): Promise<string> {
    try {
      const room = await prisma.chatRoom.create({
        data: {
          name,
          description,
          isDirect,
          members: {
            create: members.map((userId) => ({
              userId,
            })),
          },
        },
      });

      return room.id;
    } catch (error) {
      console.error('Failed to create chat room:', error);
      throw error;
    }
  }

  /**
   * Create a direct message room between two users
   */
  static async createDirectMessageRoom(userId1: string, userId2: string): Promise<string> {
    try {
      // Check if room already exists
      const existing = await prisma.chatRoom.findFirst({
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

      if (existing) {
        return existing.id;
      }

      // Create new direct message room
      const user1 = await prisma.user.findUnique({
        where: { id: userId1 },
        select: { firstName: true, lastName: true },
      });

      const user2 = await prisma.user.findUnique({
        where: { id: userId2 },
        select: { firstName: true, lastName: true },
      });

      const roomName = `${user1?.firstName} ${user1?.lastName} - ${user2?.firstName} ${user2?.lastName}`;

      return await this.createRoom(roomName, [userId1, userId2], true);
    } catch (error) {
      console.error('Failed to create direct message room:', error);
      throw error;
    }
  }

  /**
   * Get user's chat rooms
   */
  static async getUserRooms(userId: string): Promise<any[]> {
    try {
      const rooms = await prisma.chatRoom.findMany({
        where: {
          members: {
            some: {
              userId,
            },
          },
        },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  avatar: true,
                },
              },
            },
          },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
              id: true,
              content: true,
              createdAt: true,
              sender: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      // Enhance with unread counts
      const enhanced = await Promise.all(
        rooms.map(async (room) => {
          const unreadCount = await prisma.chatMessage.count({
            where: {
              roomId: room.id,
              readBy: {
                not: {
                  has: userId,
                },
              },
            },
          });

          return {
            ...room,
            unreadCount,
            lastMessage: room.messages[0],
          };
        })
      );

      return enhanced;
    } catch (error) {
      console.error('Failed to get user rooms:', error);
      throw error;
    }
  }

  /**
   * Get room details
   */
  static async getRoomDetails(roomId: string) {
    try {
      const room = await prisma.chatRoom.findUnique({
        where: { id: roomId },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  avatar: true,
                  status: true,
                },
              },
            },
          },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      });

      if (!room) {
        throw new Error('Chat room not found');
      }

      return room;
    } catch (error) {
      console.error('Failed to get room details:', error);
      throw error;
    }
  }

  /**
   * Add member to chat room
   */
  static async addMember(roomId: string, userId: string): Promise<void> {
    try {
      // Check if already a member
      const existing = await prisma.chatRoomMember.findFirst({
        where: {
          roomId,
          userId,
        },
      });

      if (existing) {
        return; // Already a member
      }

      await prisma.chatRoomMember.create({
        data: {
          roomId,
          userId,
        },
      });

      // Get user info for notification
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { firstName: true, lastName: true },
      });

      // Notify other members
      const room = await prisma.chatRoom.findUnique({
        where: { id: roomId },
        select: {
          members: {
            select: { userId: true },
          },
        },
      });

      if (room) {
        for (const member of room.members) {
          if (member.userId !== userId) {
            await NotificationService.notifySystem(
              member.userId,
              'Member Joined',
              `${user?.firstName} ${user?.lastName} has joined the chat.`
            );
          }
        }
      }
    } catch (error) {
      console.error('Failed to add member:', error);
      throw error;
    }
  }

  /**
   * Remove member from chat room
   */
  static async removeMember(roomId: string, userId: string): Promise<void> {
    try {
      await prisma.chatRoomMember.deleteMany({
        where: {
          roomId,
          userId,
        },
      });

      // Get user info for notification
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { firstName: true, lastName: true },
      });

      // Notify other members
      const room = await prisma.chatRoom.findUnique({
        where: { id: roomId },
        select: {
          members: {
            select: { userId: true },
          },
        },
      });

      if (room) {
        for (const member of room.members) {
          await NotificationService.notifySystem(
            member.userId,
            'Member Left',
            `${user?.firstName} ${user?.lastName} has left the chat.`
          );
        }
      }
    } catch (error) {
      console.error('Failed to remove member:', error);
      throw error;
    }
  }

  /**
   * Update room info
   */
  static async updateRoom(
    roomId: string,
    updates: {
      name?: string;
      description?: string;
    }
  ): Promise<void> {
    try {
      await prisma.chatRoom.update({
        where: { id: roomId },
        data: updates,
      });
    } catch (error) {
      console.error('Failed to update room:', error);
      throw error;
    }
  }

  /**
   * Delete a chat room
   */
  static async deleteRoom(roomId: string): Promise<void> {
    try {
      // Delete messages first
      await prisma.chatMessage.deleteMany({
        where: { roomId },
      });

      // Delete members
      await prisma.chatRoomMember.deleteMany({
        where: { roomId },
      });

      // Delete room
      await prisma.chatRoom.delete({
        where: { id: roomId },
      });
    } catch (error) {
      console.error('Failed to delete room:', error);
      throw error;
    }
  }

  /**
   * Archive a chat room
   */
  static async archiveRoom(roomId: string): Promise<void> {
    try {
      await prisma.chatRoom.update({
        where: { id: roomId },
        data: {
          archivedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to archive room:', error);
      throw error;
    }
  }

  /**
   * Get active rooms (not archived)
   */
  static async getActiveRooms(): Promise<any[]> {
    try {
      return await prisma.chatRoom.findMany({
        where: {
          archivedAt: null,
        },
        include: {
          members: {
            select: {
              userId: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error('Failed to get active rooms:', error);
      throw error;
    }
  }

  /**
   * Get room statistics
   */
  static async getRoomStats(roomId: string) {
    try {
      const memberCount = await prisma.chatRoomMember.count({
        where: { roomId },
      });

      const messageCount = await prisma.chatMessage.count({
        where: { roomId },
      });

      const room = await prisma.chatRoom.findUnique({
        where: { id: roomId },
        select: {
          createdAt: true,
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: { createdAt: true },
          },
        },
      });

      return {
        memberCount,
        messageCount,
        createdAt: room?.createdAt,
        lastMessageAt: room?.messages[0]?.createdAt,
      };
    } catch (error) {
      console.error('Failed to get room stats:', error);
      throw error;
    }
  }

  /**
   * Search chat rooms
   */
  static async searchRooms(query: string): Promise<any[]> {
    try {
      return await prisma.chatRoom.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
          archivedAt: null,
        },
        include: {
          members: {
            select: { userId: true },
          },
        },
      });
    } catch (error) {
      console.error('Failed to search rooms:', error);
      throw error;
    }
  }

  /**
   * Get direct message room with specific user
   */
  static async getDirectMessageRoom(userId1: string, userId2: string): Promise<string | null> {
    try {
      const room = await prisma.chatRoom.findFirst({
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
        select: { id: true },
      });

      return room?.id || null;
    } catch (error) {
      console.error('Failed to get direct message room:', error);
      throw error;
    }
  }
}
