/**
 * Typing Indicator Service
 * Handles typing indicators for real-time chat
 */

export interface TypingIndicator {
  userId: string;
  roomId: string;
  isTyping: boolean;
  timestamp: Date;
}

class TypingIndicatorService {
  async setTyping(roomId: string, userId: string, isTyping: boolean): Promise<void> {
    // Stub implementation
  }

  async getTypingUsers(roomId: string): Promise<string[]> {
    return [];
  }
}

export const typingIndicatorService = new TypingIndicatorService();
