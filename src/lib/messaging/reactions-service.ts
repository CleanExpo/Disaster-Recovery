/**
 * Reactions Service
 * Handles emoji reactions on messages
 */

export interface Reaction {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
  createdAt: Date;
}

export interface AddReactionOptions {
  messageId: string;
  userId: string;
  emoji: string;
}

class ReactionsService {
  async addReaction(options: AddReactionOptions): Promise<Reaction> {
    const reaction: Reaction = {
      id: `reaction_${Date.now()}`,
      messageId: options.messageId,
      userId: options.userId,
      emoji: options.emoji,
      createdAt: new Date(),
    };

    return reaction;
  }

  async removeReaction(reactionId: string): Promise<void> {
    // Stub implementation
  }

  async getReactionsByMessage(messageId: string): Promise<Reaction[]> {
    // Stub implementation
    return [];
  }

  async getReactionsByUser(userId: string): Promise<Reaction[]> {
    // Stub implementation
    return [];
  }

  async listReactions(messageId: string): Promise<Reaction[]> {
    return this.getReactionsByMessage(messageId);
  }
}

export const reactionsService = new ReactionsService();
