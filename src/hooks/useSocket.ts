'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEvent,
  Notification,
  BookingStatusChangePayload,
  ClaimStatusChangePayload,
  ChatMessage,
} from '@/lib/websocket/events';

/**
 * useSocket Hook
 *
 * Provides easy access to Socket.io client for real-time communication.
 * Handles connection lifecycle, authentication, and event listeners.
 *
 * Usage:
 * ```
 * const { socket, isConnected, subscribe, unsubscribe } = useSocket();
 *
 * useEffect(() => {
 *   if (!socket) return;
 *
 *   socket.on('booking:status_changed', (payload) => {
 *     console.log('Booking updated:', payload);
 *   });
 * }, [socket]);
 * ```
 */
export function useSocket() {
  const { data: session } = useSession();
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    if (!session?.user) {
      if (socketRef.current?.connected) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    // Avoid duplicate connections
    if (socketRef.current?.connected) {
      return;
    }

    setIsConnecting(true);

    try {
      const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

      const socket = io(socketUrl, {
        auth: {
          token: session.user.id,
          userId: session.user.id,
          userName: session.user.name || '',
          userRole: (session.user as any).role || 'customer',
          email: session.user.email || '',
        },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        transports: ['websocket', 'polling'],
      });

      // Connection events
      socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
        setIsConnected(true);
        setIsConnecting(false);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });

      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setIsConnecting(false);
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      socketRef.current = socket;
    } catch (error) {
      console.error('Failed to initialize socket:', error);
      setIsConnecting(false);
    }

    return () => {
      if (socketRef.current?.connected) {
        socketRef.current.disconnect();
      }
    };
  }, [session?.user]);

  /**
   * Subscribe to specific channels
   */
  const subscribe = useCallback((channels: string[]) => {
    if (!socketRef.current?.connected) {
      console.warn('Socket not connected, cannot subscribe');
      return;
    }

    socketRef.current.emit(SocketEvent.SUBSCRIBE, channels);
  }, []);

  /**
   * Unsubscribe from specific channels
   */
  const unsubscribe = useCallback((channels: string[]) => {
    if (!socketRef.current?.connected) {
      console.warn('Socket not connected, cannot unsubscribe');
      return;
    }

    socketRef.current.emit(SocketEvent.UNSUBSCRIBE, channels);
  }, []);

  /**
   * Send notification read event
   */
  const markNotificationAsRead = useCallback((notificationId: string) => {
    if (!socketRef.current?.connected) {
      return;
    }

    socketRef.current.emit(SocketEvent.NOTIFICATION_READ, notificationId, () => {
      console.log('Notification marked as read');
    });
  }, []);

  /**
   * Send chat message
   */
  const sendMessage = useCallback(
    (roomId: string, content: string, attachments?: any[]) => {
      if (!socketRef.current?.connected) {
        console.error('Socket not connected');
        return Promise.reject(new Error('Socket not connected'));
      }

      return new Promise<void>((resolve, reject) => {
        socketRef.current!.emit(
          SocketEvent.CHAT_MESSAGE_SEND,
          { roomId, content, attachments },
          (error: Error | null) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });
    },
    []
  );

  /**
   * Send typing indicator
   */
  const sendTypingIndicator = useCallback((roomId: string, userName: string) => {
    if (!socketRef.current?.connected) {
      return;
    }

    socketRef.current.emit(SocketEvent.CHAT_TYPING, {
      roomId,
      userId: session?.user?.id || '',
      userName,
      isTyping: true,
    });
  }, [session?.user?.id]);

  /**
   * Stop typing indicator
   */
  const stopTypingIndicator = useCallback((roomId: string) => {
    if (!socketRef.current?.connected) {
      return;
    }

    socketRef.current.emit(SocketEvent.CHAT_TYPING_STOP, roomId);
  }, []);

  /**
   * Listen to notification events
   */
  const onNotification = useCallback(
    (callback: (notification: Notification) => void) => {
      if (!socketRef.current) return;

      socketRef.current.on(SocketEvent.NOTIFICATION_RECEIVED, callback);

      return () => {
        socketRef.current?.off(SocketEvent.NOTIFICATION_RECEIVED, callback);
      };
    },
    []
  );

  /**
   * Listen to booking status changes
   */
  const onBookingStatusChange = useCallback(
    (callback: (payload: BookingStatusChangePayload) => void) => {
      if (!socketRef.current) return;

      socketRef.current.on(SocketEvent.BOOKING_STATUS_CHANGED, callback);

      return () => {
        socketRef.current?.off(SocketEvent.BOOKING_STATUS_CHANGED, callback);
      };
    },
    []
  );

  /**
   * Listen to claim status changes
   */
  const onClaimStatusChange = useCallback(
    (callback: (payload: ClaimStatusChangePayload) => void) => {
      if (!socketRef.current) return;

      socketRef.current.on(SocketEvent.CLAIM_STATUS_CHANGED, callback);

      return () => {
        socketRef.current?.off(SocketEvent.CLAIM_STATUS_CHANGED, callback);
      };
    },
    []
  );

  /**
   * Listen to chat messages
   */
  const onChatMessage = useCallback((callback: (message: ChatMessage) => void) => {
    if (!socketRef.current) return;

    socketRef.current.on(SocketEvent.CHAT_MESSAGE_RECEIVED, callback);

    return () => {
      socketRef.current?.off(SocketEvent.CHAT_MESSAGE_RECEIVED, callback);
    };
  }, []);

  /**
   * Listen to typing indicators
   */
  const onTypingIndicator = useCallback(
    (callback: (userId: string, userName: string, isTyping: boolean) => void) => {
      if (!socketRef.current) return;

      const handleTyping = (payload: any) => {
        callback(payload.userId, payload.userName, payload.isTyping);
      };

      const handleStopTyping = (payload: any) => {
        callback(payload.userId, payload.userName, false);
      };

      socketRef.current.on(SocketEvent.CHAT_TYPING, handleTyping);
      socketRef.current.on(SocketEvent.CHAT_TYPING_STOP, handleStopTyping);

      return () => {
        socketRef.current?.off(SocketEvent.CHAT_TYPING, handleTyping);
        socketRef.current?.off(SocketEvent.CHAT_TYPING_STOP, handleStopTyping);
      };
    },
    []
  );

  return {
    socket: socketRef.current,
    isConnected,
    isConnecting,
    subscribe,
    unsubscribe,
    markNotificationAsRead,
    sendMessage,
    sendTypingIndicator,
    stopTypingIndicator,
    onNotification,
    onBookingStatusChange,
    onClaimStatusChange,
    onChatMessage,
    onTypingIndicator,
  };
}
