'use client';

import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export interface Reaction {
  emoji: string;
  count: number;
  users: Array<{ id: string; name: string }>;
  userReacted: boolean;
}

/**
 * useMessageReactions Hook
 *
 * Manage message reactions with API integration
 */
export function useMessageReactions(messageId: string, roomId: string) {
  const { data: session } = useSession();
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch reactions
  const fetchReactions = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/chat/messages/${messageId}/reactions`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch reactions');
      }

      const data = await response.json();
      setReactions(data.reactions);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [messageId]);

  // Add reaction
  const addReaction = useCallback(
    async (emoji: string): Promise<boolean> => {
      if (!session?.user?.id) {
        return false;
      }

      try {
        const response = await fetch(
          `/api/chat/messages/${messageId}/reactions`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emoji, roomId }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to add reaction');
        }

        // Refetch reactions
        await fetchReactions();
        return true;
      } catch (err) {
        console.error('Failed to add reaction:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        return false;
      }
    },
    [messageId, roomId, session?.user?.id, fetchReactions]
  );

  // Remove reaction
  const removeReaction = useCallback(
    async (emoji: string): Promise<boolean> => {
      if (!session?.user?.id) {
        return false;
      }

      try {
        const response = await fetch(
          `/api/chat/messages/${messageId}/reactions?emoji=${emoji}&roomId=${roomId}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to remove reaction');
        }

        // Refetch reactions
        await fetchReactions();
        return true;
      } catch (err) {
        console.error('Failed to remove reaction:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        return false;
      }
    },
    [messageId, roomId, session?.user?.id, fetchReactions]
  );

  // Toggle reaction
  const toggleReaction = useCallback(
    async (emoji: string): Promise<boolean> => {
      const existingReaction = reactions.find(
        (r) => r.emoji === emoji && r.userReacted
      );

      if (existingReaction) {
        return removeReaction(emoji);
      } else {
        return addReaction(emoji);
      }
    },
    [reactions, addReaction, removeReaction]
  );

  return {
    reactions,
    isLoading,
    error,
    fetchReactions,
    addReaction,
    removeReaction,
    toggleReaction,
  };
}
