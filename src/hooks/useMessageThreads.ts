'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export interface ThreadReply {
  id: string;
  parentMessageId: string;
  content: string;
  senderId: string;
  senderName: string;
  createdAt: Date;
  editedAt?: Date;
}

export interface ThreadSummary {
  parentMessageId: string;
  replyCount: number;
  participants: Array<{ id: string; name: string }>;
  lastReplyAt: Date;
}

/**
 * useMessageThreads Hook
 *
 * Manage message threads with API integration
 */
export function useMessageThreads(messageId: string, roomId: string) {
  const { data: session } = useSession();
  const [replies, setReplies] = useState<ThreadReply[]>([]);
  const [summary, setSummary] = useState<ThreadSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [limit] = useState(50);
  const [offset, setOffset] = useState(0);

  // Fetch thread replies
  const fetchReplies = useCallback(
    async (newOffset: number = 0) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/chat/messages/${messageId}/thread?limit=${limit}&offset=${newOffset}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch thread');
        }

        const data = await response.json();
        setReplies(newOffset === 0 ? data.replies : [...replies, ...data.replies]);
        setSummary(data.summary);
        setHasMore(data.hasMore);
        setOffset(newOffset);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    },
    [messageId, limit, replies]
  );

  // Load initial thread
  useEffect(() => {
    fetchReplies(0);
  }, [messageId, fetchReplies]);

  // Add reply
  const addReply = useCallback(
    async (content: string, attachments?: any[]): Promise<boolean> => {
      if (!session?.user?.id) {
        return false;
      }

      try {
        const response = await fetch(
          `/api/chat/messages/${messageId}/thread`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomId, content, attachments }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to add reply');
        }

        // Refetch thread
        await fetchReplies(0);
        return true;
      } catch (err) {
        console.error('Failed to add reply:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        return false;
      }
    },
    [messageId, roomId, session?.user?.id, fetchReplies]
  );

  // Load more replies
  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      fetchReplies(offset + limit);
    }
  }, [hasMore, isLoading, offset, limit, fetchReplies]);

  return {
    replies,
    summary,
    isLoading,
    error,
    hasMore,
    fetchReplies,
    addReply,
    loadMore,
  };
}
