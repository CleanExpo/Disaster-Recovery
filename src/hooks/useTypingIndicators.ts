'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

export interface TypingUser {
  userId: string;
  userName: string;
  startedAt: Date;
}

/**
 * useTypingIndicators Hook
 *
 * Manage real-time typing indicators with debouncing
 */
export function useTypingIndicators(roomId: string) {
  const { data: session } = useSession();
  const [typingUsers, setTypingUsers] = useState<Map<string, TypingUser>>(new Map());
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTypingSentRef = useRef<number>(0);
  const DEBOUNCE_MS = 300;
  const TYPING_TIMEOUT_MS = 3000;

  // Stop typing - defined first to avoid circular dependency
  const stopTyping = useCallback(async (): Promise<boolean> => {
    if (!session?.user?.id) return false;

    try {
      setIsTyping(false);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }

      const response = await fetch(
        `/api/rooms/${roomId}/typing`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            isTyping: false,
          }),
        }
      );

      if (!response.ok) {
        return false;
      }

      lastTypingSentRef.current = 0;
      return true;
    } catch (error) {
      console.error('Failed to stop typing:', error);
      return false;
    }
  }, [session?.user?.id, roomId]);

  // Set user as typing with debouncing
  const setTyping = useCallback(async (): Promise<boolean> => {
    if (!session?.user?.id) return false;

    const now = Date.now();
    // Debounce: only send if 300ms has passed since last send
    if (now - lastTypingSentRef.current < DEBOUNCE_MS) {
      return false;
    }

    try {
      setIsTyping(true);
      lastTypingSentRef.current = now;

      const response = await fetch(
        `/api/rooms/${roomId}/typing`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            isTyping: true,
            userName: session.user.name || 'Unknown',
          }),
        }
      );

      if (!response.ok) {
        return false;
      }

      // Reset timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(async () => {
        await stopTyping();
      }, TYPING_TIMEOUT_MS);

      return true;
    } catch (error) {
      console.error('Failed to set typing:', error);
      return false;
    }
  }, [session?.user?.id, session?.user?.name, roomId, stopTyping]);

  // Get current typing users
  const getTypingUsers = useCallback(async (): Promise<TypingUser[]> => {
    try {
      const response = await fetch(`/api/rooms/${roomId}/typing`);

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      const users = data.typingUsers || [];

      const newTypingUsers = new Map<string, TypingUser>();
      for (const user of users) {
        newTypingUsers.set(user.userId, {
          userId: user.userId,
          userName: user.userName,
          startedAt: new Date(user.startedAt),
        });
      }

      setTypingUsers(newTypingUsers);
      return Array.from(newTypingUsers.values());
    } catch (error) {
      console.error('Failed to get typing users:', error);
      return [];
    }
  }, [roomId]);

  // Get typing status text for display
  const getTypingText = useCallback((): string => {
    const users = Array.from(typingUsers.values());

    if (users.length === 0) {
      return '';
    }

    if (users.length === 1) {
      return `${users[0].userName} is typing...`;
    }

    if (users.length === 2) {
      return `${users[0].userName} and ${users[1].userName} are typing...`;
    }

    return `${users[0].userName} and ${users.length - 1} others are typing...`;
  }, [typingUsers]);

  // Check if specific user is typing
  const isUserTyping = useCallback(
    (userId: string): boolean => {
      return typingUsers.has(userId);
    },
    [typingUsers]
  );

  // Get typing user count
  const getTypingCount = useCallback((): number => {
    return typingUsers.size;
  }, [typingUsers]);

  // Clear typing on component unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (isTyping) {
        stopTyping().catch((error) => console.error('Failed to clear typing on unmount:', error));
      }
    };
  }, [isTyping, stopTyping]);

  // Periodic refresh of typing users (every 1 second)
  useEffect(() => {
    const interval = setInterval(() => {
      getTypingUsers().catch((error) => console.error('Failed to refresh typing users:', error));

      // Remove users who have been typing for more than 3 seconds
      const now = Date.now();
      setTypingUsers((prev) => {
        const updated = new Map(prev);
        for (const [userId, user] of updated.entries()) {
          if (now - user.startedAt.getTime() > TYPING_TIMEOUT_MS) {
            updated.delete(userId);
          }
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [getTypingUsers]);

  return {
    typingUsers: Array.from(typingUsers.values()),
    isTyping,
    setTyping,
    stopTyping,
    getTypingUsers,
    getTypingText,
    isUserTyping,
    getTypingCount,
  };
}
