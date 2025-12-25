'use client';

import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export type ReceiptStatus = 'sent' | 'delivered' | 'read';

export interface MessageReceipt {
  messageId: string;
  userId: string;
  status: ReceiptStatus;
  readAt: Date;
}

export interface AggregateReceipt {
  messageId: string;
  sent: number;
  delivered: number;
  read: number;
  readers: Array<{
    userId: string;
    userName: string;
    readAt: Date;
  }>;
}

/**
 * useReadReceipts Hook
 *
 * Manage message read status tracking
 */
export function useReadReceipts(roomId: string) {
  const { data: session } = useSession();
  const [receipts, setReceipts] = useState<Map<string, AggregateReceipt>>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  // Mark message as read
  const markAsRead = useCallback(
    async (messageId: string): Promise<boolean> => {
      if (!session?.user?.id) return false;

      try {
        const response = await fetch(
          `/api/chat/messages/${messageId}/read`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomId }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to mark as read');
        }

        return true;
      } catch (error) {
        console.error('Failed to mark as read:', error);
        return false;
      }
    },
    [session?.user?.id, roomId]
  );

  // Get receipts for a message
  const getReceipts = useCallback(async (messageId: string): Promise<AggregateReceipt | null> => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/chat/messages/${messageId}/receipts`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch receipts');
      }

      const data = await response.json();
      setReceipts((prev) => new Map(prev).set(messageId, data));
      return data;
    } catch (error) {
      console.error('Failed to get receipts:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get receipts for multiple messages
  const getReceiptsBatch = useCallback(
    async (messageIds: string[]): Promise<Map<string, AggregateReceipt>> => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/chat/messages/receipts/batch`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageIds }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch receipts batch');
        }

        const data = await response.json();
        const newReceipts = new Map(receipts);
        for (const [msgId, receipt] of Object.entries(data)) {
          newReceipts.set(msgId, receipt as AggregateReceipt);
        }
        setReceipts(newReceipts);
        return newReceipts;
      } catch (error) {
        console.error('Failed to get receipts batch:', error);
        return new Map();
      } finally {
        setIsLoading(false);
      }
    },
    [receipts]
  );

  // Mark room as read
  const markRoomAsRead = useCallback(async (): Promise<boolean> => {
    if (!session?.user?.id) return false;

    try {
      const response = await fetch(
        `/api/rooms/${roomId}/read`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to mark room as read');
      }

      return true;
    } catch (error) {
      console.error('Failed to mark room as read:', error);
      return false;
    }
  }, [session?.user?.id, roomId]);

  // Get unread count in room
  const getUnreadCount = useCallback(async (): Promise<number> => {
    if (!session?.user?.id) return 0;

    try {
      const response = await fetch(
        `/api/rooms/${roomId}/unread-count`
      );

      if (!response.ok) return 0;

      const data = await response.json();
      return data.unreadCount || 0;
    } catch (error) {
      console.error('Failed to get unread count:', error);
      return 0;
    }
  }, [session?.user?.id, roomId]);

  // Get receipt status for specific message
  const getReceiptStatus = useCallback(
    (messageId: string): ReceiptStatus | null => {
      const receipt = receipts.get(messageId);
      if (!receipt) return null;

      const userReceipt = receipt.readers?.find((r) => r.userId === session?.user?.id);
      if (!userReceipt) return 'sent';

      return receipt.readers?.length > 0 && receipt.readers[0].userId === session?.user?.id
        ? 'read'
        : 'delivered';
    },
    [receipts, session?.user?.id]
  );

  // Get reader list for message
  const getReaderList = useCallback(
    (messageId: string): Array<{ userId: string; userName: string; readAt: Date }> => {
      const receipt = receipts.get(messageId);
      return receipt?.readers || [];
    },
    [receipts]
  );

  return {
    receipts,
    isLoading,
    markAsRead,
    getReceipts,
    getReceiptsBatch,
    markRoomAsRead,
    getUnreadCount,
    getReceiptStatus,
    getReaderList,
  };
}
