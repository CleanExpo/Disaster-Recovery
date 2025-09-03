/**
 * WebSocket Provider - Stub Implementation
 */

import React, { createContext, useContext, useEffect, useState } from 'react';

interface WebSocketContextType {
  socket: any | null;
  connected: boolean;
  send: (event: string, data: any) => void;
  emit: (event: string, data?: any) => void;
  on: (event: string, handler: (data: any) => void) => void;
  off: (event: string, handler: (data: any) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  connected: false,
  send: () => {},
  emit: () => {},
  on: () => {},
  off: () => {},
});

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // Stub implementation - would connect to WebSocket in production
    setConnected(false);
    
    return () => {
      // Cleanup
    };
  }, []);

  const send = (event: string, data: any) => {
    console.log('WebSocket send:', event, data);
  };

  const emit = (event: string, data?: any) => {
    console.log('WebSocket emit:', event, data);
  };

  const on = (event: string, handler: (data: any) => void) => {
    console.log('WebSocket on:', event);
  };

  const off = (event: string, handler: (data: any) => void) => {
    console.log('WebSocket off:', event);
  };

  return (
    <WebSocketContext.Provider value={{ socket, connected, send, emit, on, off }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}