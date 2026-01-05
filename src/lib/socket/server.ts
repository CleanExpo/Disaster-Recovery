/**
 * Socket.io Server Configuration
 *
 * Real-time communication server for notifications, messaging, and calls
 */

import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { initializeCallEventHandlers } from './call-events-handler';
import { logInfo, logError, logWarn, logConnection, logDebug } from '@/lib/logger/helpers';

interface SocketServerOptions {
  port?: number;
  cors?: {
    origin: string | string[];
    methods: string[];
    credentials: boolean;
  };
}

let ioInstance: Server | null = null;

/**
 * Create and configure Socket.io server
 */
export function createSocketServer(options: SocketServerOptions = {}): Server {
  if (ioInstance) {
    return ioInstance;
  }

  const httpServer = createServer();

  const defaultCors = {
    origin: process.env.NEXT_PUBLIC_SOCKET_CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  };

  const io = new Server(httpServer, {
    cors: options.cors || defaultCors,
    transports: ['websocket', 'polling'],
    path: '/socket.io',
    pingInterval: 25000,
    pingTimeout: 60000,
    serveClient: false,
    maxHttpBufferSize: 1e6,
  });

  // Middleware for authentication
  io.use((socket: Socket, next) => {
    const userId = socket.handshake.query.userId;

    if (!userId) {
      return next(new Error('Authentication error: userId required'));
    }

    // Store userId in socket data
    socket.data.userId = userId;

    next();
  });

  // Error handling middleware
  io.use((socket: Socket, next) => {
    socket.on('error', (error) => {
      logError(error, { context: 'socket_error', userId: socket.data.userId, socketId: socket.id });
    });

    next();
  });

  // Initialize event handlers
  initializeCallEventHandlers(io);

  // Global connection handler
  io.on('connection', (socket: Socket) => {
    const userId = socket.data.userId;

    logConnection('user_connected', { userId, socketId: socket.id });

    // Send connection acknowledgment
    socket.emit('connected', {
      socketId: socket.id,
      userId,
      timestamp: new Date().toISOString(),
    });

    // Handle test message
    socket.on('test', (data) => {
      logDebug('Socket test message received', { userId, data });
      socket.emit('test:response', { success: true });
    });

    // Handle reconnection
    socket.on('reconnect_setup', (data) => {
      logConnection('user_reconnected', { userId, data });
      socket.emit('reconnect_ready', { timestamp: new Date().toISOString() });
    });
  });

  // Store instance for later retrieval
  ioInstance = io;

  return io;
}

/**
 * Get Socket.io server instance
 */
export function getSocketServer(): Server | null {
  return ioInstance;
}

/**
 * Start Socket.io server
 */
export async function startSocketServer(port: number = 3001): Promise<Server> {
  const io = createSocketServer();
  const httpServer = io.httpServer!;

  return new Promise((resolve, reject) => {
    try {
      httpServer.listen(port, () => {
        logInfo('Socket.io server started', { port, transport: 'socket.io' });
        resolve(io);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Broadcast message to specific user
 */
export function broadcastToUser(userId: string, event: string, data: any): void {
  if (!ioInstance) {
    logWarn('Socket.io server not initialized for broadcast', { userId, event });
    return;
  }

  ioInstance.to(`user:${userId}`).emit(event, data);
}

/**
 * Broadcast message to call participants
 */
export function broadcastToCall(callId: string, event: string, data: any): void {
  if (!ioInstance) {
    logWarn('Socket.io server not initialized for call broadcast', { callId, event });
    return;
  }

  ioInstance.to(`call:${callId}`).emit(event, data);
}

/**
 * Get connected sockets for user
 */
export function getUserSockets(userId: string): Socket[] {
  if (!ioInstance) {
    return [];
  }

  const sockets: Socket[] = [];
  ioInstance.sockets.sockets.forEach((socket) => {
    if (socket.data.userId === userId) {
      sockets.push(socket);
    }
  });

  return sockets;
}

/**
 * Check if user is online
 */
export function isUserOnline(userId: string): boolean {
  return getUserSockets(userId).length > 0;
}

/**
 * Get all connected users
 */
export function getConnectedUsers(): string[] {
  if (!ioInstance) {
    return [];
  }

  const users = new Set<string>();
  ioInstance.sockets.sockets.forEach((socket) => {
    if (socket.data.userId) {
      users.add(socket.data.userId);
    }
  });

  return Array.from(users);
}

/**
 * Get connection statistics
 */
export function getConnectionStats(): {
  totalConnections: number;
  uniqueUsers: number;
  connectedUsers: string[];
} {
  const connectedUsers = getConnectedUsers();

  return {
    totalConnections: ioInstance?.engine.clientsCount ?? 0,
    uniqueUsers: connectedUsers.length,
    connectedUsers,
  };
}

/**
 * Disconnect user from server
 */
export function disconnectUser(userId: string): void {
  const sockets = getUserSockets(userId);
  sockets.forEach((socket) => {
    socket.disconnect(true);
  });
}

/**
 * Disconnect all users
 */
export function disconnectAll(): void {
  if (ioInstance) {
    ioInstance.disconnectSockets();
  }
}

/**
 * Gracefully shutdown Socket.io server
 */
export async function shutdownSocketServer(): Promise<void> {
  return new Promise((resolve) => {
    if (ioInstance) {
      ioInstance.close(() => {
        logInfo('Socket.io server shut down', { graceful: true });
        ioInstance = null;
        resolve();
      });
    } else {
      resolve();
    }
  });
}
