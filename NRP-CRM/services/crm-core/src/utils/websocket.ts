import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { JWTPayload, WebSocketEventPayload } from '@/types';
import logger from '@/config/logger';
import cache from '@/utils/cache';
import prisma from '@/config/database';

interface AuthenticatedSocket extends Socket {
  user?: JWTPayload;
}

export class WebSocketService {
  private io: SocketIOServer;
  private connectedUsers: Map<string, Set<string>> = new Map(); // userId -> Set of socket IDs
  private socketToUser: Map<string, string> = new Map(); // socketId -> userId

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.WS_CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true,
      },
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    this.initializeSocketHandlers();
    logger.info('WebSocket service initialized');
  }

  private initializeSocketHandlers(): void {
    this.io.use(this.authenticateSocket);

    this.io.on('connection', (socket: AuthenticatedSocket) => {
      this.handleConnection(socket);
    });
  }

  /**
   * Authenticate socket connection
   */
  private authenticateSocket = async (
    socket: AuthenticatedSocket,
    next: (err?: Error) => void
  ): Promise<void> => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        next(new Error('Authentication token required'));
        return;
      }

      // Check if token is blacklisted
      const isBlacklisted = await cache.exists(`blacklist:${token}`);
      if (isBlacklisted) {
        next(new Error('Token has been revoked'));
        return;
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

      // Check if user exists and is active
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          role: true,
          active: true,
          contractor: {
            select: { id: true },
          },
        },
      });

      if (!user || !user.active) {
        next(new Error('User not found or inactive'));
        return;
      }

      socket.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        contractorId: user.contractor?.id,
      };

      next();
    } catch (error) {
      logger.error('WebSocket authentication error:', error);
      next(new Error('Authentication failed'));
    }
  };

  /**
   * Handle new socket connection
   */
  private handleConnection(socket: AuthenticatedSocket): void {
    if (!socket.user) return;

    const userId = socket.user.id;
    const socketId = socket.id;

    // Track connected users
    if (!this.connectedUsers.has(userId)) {
      this.connectedUsers.set(userId, new Set());
    }
    this.connectedUsers.get(userId)!.add(socketId);
    this.socketToUser.set(socketId, userId);

    logger.info('WebSocket connection established', {
      userId,
      socketId,
      userRole: socket.user.role,
    });

    // Join user-specific room
    socket.join(`user:${userId}`);

    // Join contractor-specific room if applicable
    if (socket.user.contractorId) {
      socket.join(`contractor:${socket.user.contractorId}`);
    }

    // Join role-specific room
    socket.join(`role:${socket.user.role.toLowerCase()}`);

    // Send welcome message
    socket.emit('connected', {
      message: 'Connected to NRP CRM Core',
      timestamp: new Date(),
    });

    // Handle custom events
    this.setupEventHandlers(socket);

    // Handle disconnection
    socket.on('disconnect', () => {
      this.handleDisconnection(socket);
    });
  }

  /**
   * Setup custom event handlers
   */
  private setupEventHandlers(socket: AuthenticatedSocket): void {
    // Ping/Pong for connection health
    socket.on('ping', () => {
      socket.emit('pong', { timestamp: new Date() });
    });

    // Subscribe to notifications
    socket.on('subscribe', (data: { channels: string[] }) => {
      if (!socket.user) return;

      for (const channel of data.channels) {
        // Validate channel access
        if (this.canAccessChannel(socket.user, channel)) {
          socket.join(channel);
          logger.debug('User subscribed to channel', {
            userId: socket.user.id,
            channel,
          });
        } else {
          socket.emit('error', {
            message: `Access denied to channel: ${channel}`,
            timestamp: new Date(),
          });
        }
      }
    });

    // Unsubscribe from notifications
    socket.on('unsubscribe', (data: { channels: string[] }) => {
      for (const channel of data.channels) {
        socket.leave(channel);
        logger.debug('User unsubscribed from channel', {
          userId: socket.user?.id,
          channel,
        });
      }
    });

    // Handle real-time updates requests
    socket.on('requestUpdate', (data: { resource: string; resourceId: string }) => {
      this.handleUpdateRequest(socket, data);
    });

    // Handle status updates (e.g., user going online/offline)
    socket.on('statusUpdate', (data: { status: 'online' | 'away' | 'busy' }) => {
      this.broadcastUserStatus(socket, data.status);
    });
  }

  /**
   * Handle socket disconnection
   */
  private handleDisconnection(socket: AuthenticatedSocket): void {
    const socketId = socket.id;
    const userId = this.socketToUser.get(socketId);

    if (userId) {
      const userSockets = this.connectedUsers.get(userId);
      if (userSockets) {
        userSockets.delete(socketId);
        if (userSockets.size === 0) {
          this.connectedUsers.delete(userId);
          // Broadcast user offline status
          this.broadcastUserStatus(socket, 'offline');
        }
      }
      this.socketToUser.delete(socketId);
    }

    logger.info('WebSocket connection closed', {
      userId,
      socketId,
    });
  }

  /**
   * Check if user can access a specific channel
   */
  private canAccessChannel(user: JWTPayload, channel: string): boolean {
    // Public channels
    if (channel.startsWith('public:')) return true;

    // User-specific channels
    if (channel === `user:${user.id}`) return true;

    // Contractor-specific channels
    if (user.contractorId && channel === `contractor:${user.contractorId}`) return true;

    // Role-based channels
    if (channel === `role:${user.role.toLowerCase()}`) return true;

    // Admin channels
    if (user.role === 'ADMIN' && channel.startsWith('admin:')) return true;

    // Manager channels
    if (['ADMIN', 'MANAGER'].includes(user.role) && channel.startsWith('manager:')) return true;

    return false;
  }

  /**
   * Handle update requests
   */
  private async handleUpdateRequest(socket: AuthenticatedSocket, data: { resource: string; resourceId: string }): Promise<void> {
    try {
      // Implementation would fetch the latest data and send it back
      // This is a placeholder for the actual implementation
      socket.emit('updateResponse', {
        resource: data.resource,
        resourceId: data.resourceId,
        timestamp: new Date(),
        // data: actualData
      });
    } catch (error) {
      logger.error('Error handling update request:', error);
      socket.emit('error', {
        message: 'Failed to fetch update',
        timestamp: new Date(),
      });
    }
  }

  /**
   * Broadcast user status
   */
  private broadcastUserStatus(socket: AuthenticatedSocket, status: string): void {
    if (!socket.user) return;

    const statusUpdate = {
      userId: socket.user.id,
      status,
      timestamp: new Date(),
    };

    // Broadcast to relevant rooms
    socket.broadcast.emit('userStatusUpdate', statusUpdate);
    
    // Cache user status
    cache.set(`user_status:${socket.user.id}`, status, 300); // 5 minutes
  }

  /**
   * Send notification to specific user
   */
  public async sendToUser(userId: string, event: string, payload: WebSocketEventPayload): Promise<boolean> {
    try {
      const userSockets = this.connectedUsers.get(userId);
      
      if (!userSockets || userSockets.size === 0) {
        // User not connected, could save for later delivery
        logger.debug('User not connected for real-time notification', { userId, event });
        return false;
      }

      this.io.to(`user:${userId}`).emit(event, {
        ...payload,
        timestamp: new Date(),
      });

      logger.debug('Notification sent to user', { userId, event });
      return true;
    } catch (error) {
      logger.error('Error sending notification to user:', error);
      return false;
    }
  }

  /**
   * Send notification to specific contractor
   */
  public async sendToContractor(contractorId: string, event: string, payload: WebSocketEventPayload): Promise<boolean> {
    try {
      const room = `contractor:${contractorId}`;
      const socketsInRoom = await this.io.in(room).fetchSockets();
      
      if (socketsInRoom.length === 0) {
        logger.debug('No contractor sockets found for notification', { contractorId, event });
        return false;
      }

      this.io.to(room).emit(event, {
        ...payload,
        timestamp: new Date(),
      });

      logger.debug('Notification sent to contractor', { contractorId, event });
      return true;
    } catch (error) {
      logger.error('Error sending notification to contractor:', error);
      return false;
    }
  }

  /**
   * Broadcast to all users with specific role
   */
  public async broadcastToRole(role: string, event: string, payload: WebSocketEventPayload): Promise<void> {
    try {
      this.io.to(`role:${role.toLowerCase()}`).emit(event, {
        ...payload,
        timestamp: new Date(),
      });

      logger.debug('Broadcast sent to role', { role, event });
    } catch (error) {
      logger.error('Error broadcasting to role:', error);
    }
  }

  /**
   * Broadcast to all connected users
   */
  public async broadcast(event: string, payload: WebSocketEventPayload): Promise<void> {
    try {
      this.io.emit(event, {
        ...payload,
        timestamp: new Date(),
      });

      logger.debug('Broadcast sent to all users', { event });
    } catch (error) {
      logger.error('Error broadcasting to all users:', error);
    }
  }

  /**
   * Get connected users count
   */
  public getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }

  /**
   * Get connected users for specific contractor
   */
  public async getContractorConnectionsCount(contractorId: string): Promise<number> {
    try {
      const room = `contractor:${contractorId}`;
      const socketsInRoom = await this.io.in(room).fetchSockets();
      return socketsInRoom.length;
    } catch (error) {
      logger.error('Error getting contractor connections count:', error);
      return 0;
    }
  }

  /**
   * Check if user is online
   */
  public isUserOnline(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  /**
   * Get WebSocket server instance
   */
  public getIOInstance(): SocketIOServer {
    return this.io;
  }

  /**
   * Graceful shutdown
   */
  public async shutdown(): Promise<void> {
    logger.info('Shutting down WebSocket service...');
    
    // Notify all connected clients
    this.io.emit('serverShutdown', {
      message: 'Server is shutting down',
      timestamp: new Date(),
    });

    // Close all connections
    this.io.close();
    
    logger.info('WebSocket service shut down complete');
  }
}

export default WebSocketService;