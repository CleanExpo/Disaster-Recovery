'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { toast } from 'sonner';

interface WebSocketContextType {
  socket: Socket | null;
  connected: boolean;
  emit: (event: string, data?: any) => void;
  on: (event: string, handler: (data: any) => void) => void;
  off: (event: string, handler?: (data: any) => void) => void;
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  connected: false,
  emit: () => {},
  on: () => {},
  off: () => {},
  joinRoom: () => {},
  leaveRoom: () => {}
});

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
  userId?: string;
  userType?: 'client' | 'contractor' | 'admin';
  location?: string;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
  userId,
  userType,
  location
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Initialize WebSocket connection
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001';
    const newSocket = io(wsUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection events
    newSocket.on('connect', () => {
      console.log('WebSocket connected');
      setConnected(true);
      
      // Join rooms
      if (userId || userType || location) {
        newSocket.emit('join', { userId, userType, location });
      }
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    // Handle notifications
    newSocket.on('notification:receive', (data) => {
      // Use toast for notifications
      const { type, message, priority } = data;
      
      switch (priority) {
        case 'critical':
          toast.error(message, {
            duration: 10000,
          });
          break;
        case 'high':
          toast.warning?.(message, {
            duration: 7000,
          }) || toast(message);
          break;
        case 'medium':
          toast.info?.(message, {
            duration: 5000,
          }) || toast(message);
          break;
        default:
          toast(message);
      }
    });

    // Handle emergency alerts
    newSocket.on('emergency:alert', (data) => {
      const { type, location, severity } = data;
      toast.error(`🚨 EMERGENCY: ${type} in ${location}`, {
        description: `Severity: ${severity}`,
        duration: 15000,
        action: {
          label: 'View Details',
          onClick: () => window.location.href = `/emergency/${data.id}`
        }
      });
    });

    setSocket(newSocket);

    // Cleanup
    return () => {
      newSocket.close();
    };
  }, [userId, userType, location]);

  const emit = useCallback((event: string, data?: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  }, [socket]);

  const on = useCallback((event: string, handler: (data: any) => void) => {
    if (socket) {
      socket.on(event, handler);
    }
  }, [socket]);

  const off = useCallback((event: string, handler?: (data: any) => void) => {
    if (socket) {
      if (handler) {
        socket.off(event, handler);
      } else {
        socket.off(event);
      }
    }
  }, [socket]);

  const joinRoom = useCallback((room: string) => {
    if (socket) {
      socket.emit('join:room', room);
    }
  }, [socket]);

  const leaveRoom = useCallback((room: string) => {
    if (socket) {
      socket.emit('leave:room', room);
    }
  }, [socket]);

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        connected,
        emit,
        on,
        off,
        joinRoom,
        leaveRoom
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

// WebSocket status indicator component
export const WebSocketStatus: React.FC = () => {
  const { connected } = useWebSocket();
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-colors ${
        connected 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      }`}>
        <div className={`w-2 h-2 rounded-full animate-pulse ${
          connected ? 'bg-green-500' : 'bg-red-500'
        }`} />
        {connected ? 'Connected' : 'Disconnected'}
      </div>
    </div>
  );
};