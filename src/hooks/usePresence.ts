'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSocketContext } from '@/context/socket-context';

export type PresenceStatus = 'online' | 'away' | 'dnd' | 'offline';

export interface UserPresence {
  userId: string;
  userName: string;
  status: PresenceStatus;
  lastSeen: Date;
  currentRoom?: string;
  statusMessage?: string;
}

/**
 * usePresence Hook
 *
 * Manage user presence and online status
 */
export function usePresence(roomId?: string) {
  const { data: session } = useSession();
  const { socket, onNotification } = useSocketContext();
  const [presence, setPresence] = useState<UserPresence | null>(null);
  const [roomMembers, setRoomMembers] = useState<UserPresence[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Update presence status
  const updatePresence = useCallback(
    async (status: PresenceStatus, statusMessage?: string): Promise<boolean> => {
      if (!session?.user?.id) return false;

      try {
        setIsLoading(true);
        const response = await fetch('/api/presence', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status,
            currentRoom: roomId,
            statusMessage,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update presence');
        }

        const data = await response.json();
        setPresence(data);
        return true;
      } catch (error) {
        console.error('Failed to update presence:', error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [session?.user?.id, roomId]
  );

  // Set online status
  const setOnline = useCallback(() => {
    return updatePresence('online', undefined);
  }, [updatePresence]);

  // Set away status
  const setAway = useCallback(() => {
    return updatePresence('away');
  }, [updatePresence]);

  // Set DND status
  const setDND = useCallback((message?: string) => {
    return updatePresence('dnd', message);
  }, [updatePresence]);

  // Fetch room members
  const fetchRoomMembers = useCallback(async () => {
    if (!roomId) return;

    try {
      const response = await fetch(`/api/rooms/${roomId}/presence`);
      if (!response.ok) throw new Error('Failed to fetch room members');

      const data = await response.json();
      setRoomMembers(data.members || []);
    } catch (error) {
      console.error('Failed to fetch room members:', error);
    }
  }, [roomId]);

  // Listen for presence changes
  useEffect(() => {
    if (!socket) return;

    const unsubscribe = onNotification?.(() => {
      fetchRoomMembers();
    });

    return () => unsubscribe?.();
  }, [socket, fetchRoomMembers, onNotification]);

  // Initial setup - set online and fetch room members
  useEffect(() => {
    if (!session?.user?.id) return;

    setOnline();
    if (roomId) {
      fetchRoomMembers();
    }
  }, [session?.user?.id, roomId, setOnline, fetchRoomMembers]);

  return {
    presence,
    roomMembers,
    isLoading,
    updatePresence,
    setOnline,
    setAway,
    setDND,
    fetchRoomMembers,
  };
}
