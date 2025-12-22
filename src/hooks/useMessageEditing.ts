'use client';

import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export interface MessageEdit {
  id: string;
  messageId: string;
  previousContent: string;
  newContent: string;
  editedBy: string;
  editedAt: Date;
}

/**
 * useMessageEditing Hook
 *
 * Manage message editing with API integration
 */
export function useMessageEditing(messageId: string, roomId: string) {
  const { data: session } = useSession();
  const [editHistory, setEditHistory] = useState<MessageEdit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [editCount, setEditCount] = useState(0);

  // Fetch edit history
  const fetchEditHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/chat/messages/${messageId}/edit?limit=50`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch edit history');
      }

      const data = await response.json();
      setEditHistory(data.editHistory);
      setEditCount(data.editHistory.length);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [messageId]);

  // Edit message
  const editMessage = useCallback(
    async (newContent: string): Promise<boolean> => {
      if (!session?.user?.id) {
        return false;
      }

      try {
        setIsSaving(true);
        const response = await fetch(
          `/api/chat/messages/${messageId}/edit`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newContent, roomId }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to edit message');
        }

        // Refetch edit history
        await fetchEditHistory();
        setError(null);
        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        console.error('Failed to edit message:', error);
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [messageId, roomId, session?.user?.id, fetchEditHistory]
  );

  // Delete message
  const deleteMessage = useCallback(
    async (soft: boolean = true): Promise<boolean> => {
      if (!session?.user?.id) {
        return false;
      }

      try {
        setIsSaving(true);
        const response = await fetch(
          `/api/chat/messages/${messageId}/edit`,
          {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomId, soft }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete message');
        }

        setError(null);
        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        console.error('Failed to delete message:', error);
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [messageId, roomId, session?.user?.id]
  );

  // Check if message can be edited (15 minute limit is server-side)
  const canEdit = useCallback((createdAt: Date): boolean => {
    const timeSinceCreation = Date.now() - new Date(createdAt).getTime();
    const fifteenMinutes = 15 * 60 * 1000;
    return timeSinceCreation < fifteenMinutes;
  }, []);

  return {
    editHistory,
    editCount,
    isLoading,
    isSaving,
    error,
    fetchEditHistory,
    editMessage,
    deleteMessage,
    canEdit,
  };
}
