import { prisma } from '@/lib/prisma';
import { SocketServer } from '@/lib/websocket/socket-server';
import { SocketEvent } from '@/lib/websocket/events';

/**
 * Message reaction types and interfaces
 */
export interface MessageReaction {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
  createdAt: Date;
}

export interface AggregatedReaction {
  emoji: string;
  count: number;
  users: Array<{
    id: string;
    name: string;
  }>;
  userReacted: boolean; // Did current user react with this emoji
}

export interface ReactionPayload {
  messageId: string;
  roomId: string;
  userId: string;
  userName: string;
  emoji: string;
  timestamp: Date;
  type: 'added' | 'removed';
}

// Valid emoji set (common reactions)
const VALID_EMOJIS = new Set([
  '👍', '👎', '😂', '😢', '😡', '😮', '❤️', '🎉', '🚀', '💯',
  '🤔', '👏', '🙏', '✨', '💪', '🔥', '👀', '😍', '🥳', '😎',
  '🤓', '😴', '🤐', '🤮', '🤪', '🥰', '😘', '🤩', '😳', '😤',
  '😩', '🥵', '🥶', '😱', '😵', '😷', '🤒', '🤕', '🤑', '🤠',
  '🥸', '🤥', '😕', '😟', '🙁', '☹️', '😮‍💨', '😬', '🤐', '😶',
]);

const MAX_REACTIONS_PER_MESSAGE = 10;
const MAX_REACTIONS_PER_USER = 5; // Max same emoji count per message
const EMOJI_PATTERN = /[\p{Extended_Pictographic}\p{Emoji}]/gu;

export class MessageReactionService {
  /**
   * Add reaction to message
   */
  static async addReaction(
    messageId: string,
    userId: string,
    emoji: string,
    roomId: string
  ): Promise<ReactionPayload | null> {
    try {
      // Validate emoji
      if (!this.isValidEmoji(emoji)) {
        throw new Error('Invalid emoji');
      }

      // Get message to verify it exists
      const message = await prisma.message.findUnique({
        where: { id: messageId },
        include: { sender: true },
      });

      if (!message) {
        throw new Error('Message not found');
      }

      // Check if user already reacted with this emoji
      const existingReaction = await prisma.messageReaction.findUnique({
        where: {
          messageId_userId_emoji: {
            messageId,
            userId,
            emoji,
          },
        },
      });

      if (existingReaction) {
        // Already reacted with this emoji, remove instead
        return await this.removeReaction(messageId, userId, emoji, roomId);
      }

      // Check max reactions limit
      const reactionCount = await prisma.messageReaction.count({
        where: { messageId },
      });

      if (reactionCount >= MAX_REACTIONS_PER_MESSAGE) {
        throw new Error('Maximum reactions per message reached');
      }

      // Check user reaction limit per emoji
      const userReactionCount = await prisma.messageReaction.count({
        where: {
          messageId,
          userId,
          emoji,
        },
      });

      if (userReactionCount >= MAX_REACTIONS_PER_USER) {
        throw new Error('Too many reactions with this emoji');
      }

      // Create reaction
      const reaction = await prisma.messageReaction.create({
        data: {
          messageId,
          userId,
          emoji,
        },
      });

      // Get user info for payload
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true },
      });

      const payload: ReactionPayload = {
        messageId,
        roomId,
        userId,
        userName: user?.name || 'Unknown',
        emoji,
        timestamp: reaction.createdAt,
        type: 'added',
      };

      // Emit to room
      SocketServer.emitToRoom(roomId, SocketEvent.CHAT_MESSAGE_RECEIVED, {
        type: 'reaction_added',
        ...payload,
      });

      return payload;
    } catch (error) {
      console.error('Failed to add reaction:', error);
      throw error;
    }
  }

  /**
   * Remove reaction from message
   */
  static async removeReaction(
    messageId: string,
    userId: string,
    emoji: string,
    roomId: string
  ): Promise<ReactionPayload | null> {
    try {
      // Delete reaction
      const reaction = await prisma.messageReaction.deleteMany({
        where: {
          messageId,
          userId,
          emoji,
        },
      });

      if (reaction.count === 0) {
        return null; // No reaction to remove
      }

      // Get user info for payload
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true },
      });

      const payload: ReactionPayload = {
        messageId,
        roomId,
        userId,
        userName: user?.name || 'Unknown',
        emoji,
        timestamp: new Date(),
        type: 'removed',
      };

      // Emit to room
      SocketServer.emitToRoom(roomId, SocketEvent.CHAT_MESSAGE_RECEIVED, {
        type: 'reaction_removed',
        ...payload,
      });

      return payload;
    } catch (error) {
      console.error('Failed to remove reaction:', error);
      throw error;
    }
  }

  /**
   * Get aggregated reactions for a message
   */
  static async getReactions(
    messageId: string,
    currentUserId?: string
  ): Promise<AggregatedReaction[]> {
    try {
      const reactions = await prisma.messageReaction.findMany({
        where: { messageId },
        include: {
          user: {
            select: { id: true, name: true },
          },
        },
      });

      // Group by emoji
      const grouped = new Map<string, Array<{ id: string; name: string }>>();
      for (const reaction of reactions) {
        if (!grouped.has(reaction.emoji)) {
          grouped.set(reaction.emoji, []);
        }
        grouped.get(reaction.emoji)!.push({
          id: reaction.userId,
          name: reaction.user?.name || 'Unknown',
        });
      }

      // Convert to aggregated format
      const aggregated: AggregatedReaction[] = Array.from(grouped.entries()).map(
        ([emoji, users]) => ({
          emoji,
          count: users.length,
          users: users.slice(0, 5), // Show first 5 users
          userReacted: currentUserId ? users.some((u) => u.id === currentUserId) : false,
        })
      );

      // Sort by count (most popular first)
      return aggregated.sort((a, b) => b.count - a.count);
    } catch (error) {
      console.error('Failed to get reactions:', error);
      throw error;
    }
  }

  /**
   * Get message reactions summary for list view
   */
  static async getReactionsSummary(
    messageIds: string[],
    currentUserId?: string
  ): Promise<Map<string, AggregatedReaction[]>> {
    try {
      const reactions = await prisma.messageReaction.findMany({
        where: {
          messageId: { in: messageIds },
        },
        include: {
          user: {
            select: { id: true, name: true },
          },
        },
      });

      const result = new Map<string, AggregatedReaction[]>();

      // Group by message
      for (const messageId of messageIds) {
        const messageReactions = reactions.filter((r) => r.messageId === messageId);

        // Group by emoji
        const grouped = new Map<string, Array<{ id: string; name: string }>>();
        for (const reaction of messageReactions) {
          if (!grouped.has(reaction.emoji)) {
            grouped.set(reaction.emoji, []);
          }
          grouped.get(reaction.emoji)!.push({
            id: reaction.userId,
            name: reaction.user?.name || 'Unknown',
          });
        }

        // Convert to aggregated format
        const aggregated: AggregatedReaction[] = Array.from(grouped.entries()).map(
          ([emoji, users]) => ({
            emoji,
            count: users.length,
            users: users.slice(0, 5),
            userReacted: currentUserId ? users.some((u) => u.id === currentUserId) : false,
          })
        );

        result.set(
          messageId,
          aggregated.sort((a, b) => b.count - a.count)
        );
      }

      return result;
    } catch (error) {
      console.error('Failed to get reactions summary:', error);
      throw error;
    }
  }

  /**
   * Get top reactions for a room
   */
  static async getTopReactions(roomId: string, limit: number = 10) {
    try {
      const reactions = await prisma.messageReaction.findMany({
        where: {
          message: { roomId },
        },
      });

      // Count by emoji
      const emojiCounts = new Map<string, number>();
      for (const reaction of reactions) {
        emojiCounts.set(reaction.emoji, (emojiCounts.get(reaction.emoji) ?? 0) + 1);
      }

      // Sort and return
      return Array.from(emojiCounts.entries())
        .map(([emoji, count]) => ({ emoji, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
    } catch (error) {
      console.error('Failed to get top reactions:', error);
      throw error;
    }
  }

  /**
   * Validate emoji
   */
  private static isValidEmoji(emoji: string): boolean {
    // Check if it's in our valid set or matches emoji pattern
    if (VALID_EMOJIS.has(emoji)) {
      return true;
    }

    // Additional pattern check for emojis not in predefined set
    const matches = emoji.match(EMOJI_PATTERN);
    return matches !== null && matches.length > 0;
  }

  /**
   * Get reaction statistics for analytics
   */
  static async getReactionStats(
    startDate: Date,
    endDate: Date
  ): Promise<{
    totalReactions: number;
    uniqueEmojis: number;
    topEmojis: Array<{ emoji: string; count: number }>;
    averageReactionsPerMessage: number;
  }> {
    try {
      const reactions = await prisma.messageReaction.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      const emojiCounts = new Map<string, number>();
      const messageIds = new Set<string>();

      for (const reaction of reactions) {
        emojiCounts.set(reaction.emoji, (emojiCounts.get(reaction.emoji) ?? 0) + 1);
        messageIds.add(reaction.messageId);
      }

      const topEmojis = Array.from(emojiCounts.entries())
        .map(([emoji, count]) => ({ emoji, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return {
        totalReactions: reactions.length,
        uniqueEmojis: emojiCounts.size,
        topEmojis,
        averageReactionsPerMessage:
          messageIds.size > 0 ? reactions.length / messageIds.size : 0,
      };
    } catch (error) {
      console.error('Failed to get reaction stats:', error);
      throw error;
    }
  }

  /**
   * Clear all reactions on a message (admin action)
   */
  static async clearMessageReactions(messageId: string): Promise<number> {
    try {
      const result = await prisma.messageReaction.deleteMany({
        where: { messageId },
      });

      return result.count;
    } catch (error) {
      console.error('Failed to clear message reactions:', error);
      throw error;
    }
  }
}
