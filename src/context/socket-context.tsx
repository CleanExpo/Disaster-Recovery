'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useSocket } from '@/hooks/useSocket';

/**
 * Socket Context
 *
 * Provides Socket.io client instance to all child components
 * through React Context API.
 */

interface SocketContextType {
  socket: any;
  isConnected: boolean;
  isConnecting: boolean;
  subscribe: (channels: string[]) => void;
  unsubscribe: (channels: string[]) => void;
  markNotificationAsRead: (notificationId: string) => void;
  sendMessage: (roomId: string, content: string, attachments?: any[]) => Promise<void>;
  sendTypingIndicator: (roomId: string, userName: string) => void;
  stopTypingIndicator: (roomId: string) => void;
  onNotification: (callback: (notification: any) => void) => (() => void) | undefined;
  onBookingStatusChange: (callback: (payload: any) => void) => (() => void) | undefined;
  onClaimStatusChange: (callback: (payload: any) => void) => (() => void) | undefined;
  onChatMessage: (callback: (message: any) => void) => (() => void) | undefined;
  onTypingIndicator: (
    callback: (userId: string, userName: string, isTyping: boolean) => void
  ) => (() => void) | undefined;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

/**
 * Socket Context Provider
 *
 * Wraps the app with Socket.io functionality
 */
export function SocketProvider({ children }: { children: ReactNode }) {
  const socketData = useSocket();

  return (
    <SocketContext.Provider value={socketData as SocketContextType}>
      {children}
    </SocketContext.Provider>
  );
}

/**
 * Hook to use Socket context
 *
 * Usage:
 * ```
 * const { socket, isConnected, sendMessage } = useSocketContext();
 * ```
 */
export function useSocketContext(): SocketContextType {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
}
