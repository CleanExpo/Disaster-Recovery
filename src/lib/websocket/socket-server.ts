import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { NotificationService } from '@/lib/notifications/notification-service';
import { MessageService } from '@/lib/chat/message-service';
import { BookingStatusHandler } from '@/lib/realtime/booking-status';
import { ClaimStatusHandler } from '@/lib/realtime/claim-status';
import {
  SocketEvent,
  SocketData,
  ServerToClientEvents,
  ClientToServerEvents,
  Notification,
  BookingStatusChangePayload,
  ClaimStatusChangePayload,
  ChatMessage,
  ChatMessagePayload,
  TypingIndicatorPayload,
} from './events';

export class SocketServer {
  private static instance: SocketIOServer<ClientToServerEvents, ServerToClientEvents>;
  private static redisClient: ReturnType<typeof createClient>;
  private static redisSubscriber: ReturnType<typeof createClient>;

  /**
   * Initialize Socket.io server with Redis adapter
   */
  static async initialize(httpServer: HttpServer): Promise<SocketIOServer> {
    if (this.instance) {
      return this.instance;
    }

    try {
      // Initialize Socket.io
      this.instance = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(
        httpServer,
        {
          cors: {
            origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
          },
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5,
        }
      );

      // Setup Redis adapter for distributed pub/sub
      await this.setupRedisAdapter();

      // Setup authentication middleware
      this.setupAuthMiddleware();

      // Setup connection handlers
      this.setupConnectionHandlers();

      console.log('Socket.io server initialized');
      return this.instance;
    } catch (error) {
      console.error('Failed to initialize Socket.io server:', error);
      throw error;
    }
  }

  /**
   * Setup Redis adapter for clustering and pub/sub
   */
  private static async setupRedisAdapter(): Promise<void> {
    try {
      const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

      // Main client
      this.redisClient = createClient({ url: redisUrl });
      await this.redisClient.connect();

      // Subscriber for pub/sub
      this.redisSubscriber = this.redisClient.duplicate();
      await this.redisSubscriber.connect();

      // Attach Redis adapter
      this.instance!.adapter(createAdapter(this.redisClient, this.redisSubscriber));

      console.log('Redis adapter configured');
    } catch (error) {
      console.error('Failed to setup Redis adapter:', error);
      // Fallback to in-memory adapter if Redis unavailable
      console.warn('Using in-memory adapter - clustering not available');
    }
  }

  /**
   * Setup authentication middleware
   */
  private static setupAuthMiddleware(): void {
    this.instance!.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        const userId = socket.handshake.auth.userId;
        const userName = socket.handshake.auth.userName;
        const userRole = socket.handshake.auth.userRole;
        const email = socket.handshake.auth.email;

        if (!userId || !token) {
          return next(new Error('Authentication failed'));
        }

        // Store user data on socket
        (socket.data as SocketData) = {
          userId,
          userName,
          userRole,
          email,
          connectedAt: new Date(),
          subscriptions: new Set(),
          currentRoom: undefined,
        };

        next();
      } catch (error) {
        console.error('Auth middleware error:', error);
        next(new Error('Authentication error'));
      }
    });
  }

  /**
   * Setup connection and event handlers
   */
  private static setupConnectionHandlers(): void {
    this.instance!.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
      const userData = socket.data as SocketData;
      console.log(`User connected: ${userData.userId} (${socket.id})`);

      // Broadcast user online status
      this.instance!.emit(SocketEvent.USER_ONLINE, {
        userId: userData.userId,
        userName: userData.userName,
        status: 'online',
        lastSeen: new Date(),
        currentRoom: userData.currentRoom,
      });

      // Setup event listeners
      this.setupNotificationHandlers(socket);
      this.setupChatHandlers(socket);
      this.setupBookingHandlers(socket);
      this.setupClaimHandlers(socket);
      this.setupPresenceHandlers(socket);
      this.setupSubscriptionHandlers(socket);
      this.setupSystemHandlers(socket);

      // Handle disconnect
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${userData.userId}`);
        this.instance!.emit(SocketEvent.USER_OFFLINE, {
          userId: userData.userId,
          userName: userData.userName,
          status: 'offline',
          lastSeen: new Date(),
        });
      });
    });
  }

  /**
   * Setup notification event handlers
   */
  private static setupNotificationHandlers(
    socket: Socket<ClientToServerEvents, ServerToClientEvents>
  ): void {
    const userData = socket.data as SocketData;

    // Mark notification as read
    socket.on(SocketEvent.NOTIFICATION_READ, async (notificationId: string, callback) => {
      try {
        await NotificationService.markAsRead(notificationId, userData.userId);
        callback?.();
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
        callback?.();
      }
    });
  }

  /**
   * Setup chat event handlers
   */
  private static setupChatHandlers(
    socket: Socket<ClientToServerEvents, ServerToClientEvents>
  ): void {
    const userData = socket.data as SocketData;

    // Send chat message
    socket.on(
      SocketEvent.CHAT_MESSAGE_SEND,
      async (payload: ChatMessagePayload, callback) => {
        try {
          const message = await MessageService.sendMessage(
            payload.roomId,
            userData.userId,
            payload
          );

          // Emit to room
          this.instance!.to(payload.roomId).emit(SocketEvent.CHAT_MESSAGE_RECEIVED, message);

          callback?.(null);
        } catch (error) {
          console.error('Failed to send message:', error);
          callback?.(error as Error);
        }
      }
    );

    // Typing indicator
    socket.on(SocketEvent.CHAT_TYPING, (payload: TypingIndicatorPayload) => {
      socket.to(payload.roomId).emit(SocketEvent.CHAT_TYPING, {
        ...payload,
        userId: userData.userId,
      });
    });

    // Stop typing
    socket.on(SocketEvent.CHAT_TYPING_STOP, (roomId: string) => {
      socket.to(roomId).emit(SocketEvent.CHAT_TYPING_STOP, {
        roomId,
        userId: userData.userId,
        userName: userData.userName,
        isTyping: false,
      });
    });
  }

  /**
   * Setup booking status handlers
   */
  private static setupBookingHandlers(
    socket: Socket<ClientToServerEvents, ServerToClientEvents>
  ): void {
    // Note: Booking status changes are emitted from the backend
    // This handler is for client-side subscriptions to booking events
    socket.on(SocketEvent.SUBSCRIBE, (channels: string[]) => {
      const userData = socket.data as SocketData;
      channels.forEach((channel) => {
        if (channel.startsWith('booking:')) {
          socket.join(channel);
          userData.subscriptions.add(channel);
        }
      });
    });
  }

  /**
   * Setup claim status handlers
   */
  private static setupClaimHandlers(
    socket: Socket<ClientToServerEvents, ServerToClientEvents>
  ): void {
    // Note: Claim status changes are emitted from the backend
    socket.on(SocketEvent.SUBSCRIBE, (channels: string[]) => {
      const userData = socket.data as SocketData;
      channels.forEach((channel) => {
        if (channel.startsWith('claim:')) {
          socket.join(channel);
          userData.subscriptions.add(channel);
        }
      });
    });
  }

  /**
   * Setup presence/user online status handlers
   */
  private static setupPresenceHandlers(
    socket: Socket<ClientToServerEvents, ServerToClientEvents>
  ): void {
    const userData = socket.data as SocketData;

    socket.on(SocketEvent.USER_ONLINE, () => {
      socket.broadcast.emit(SocketEvent.USER_ONLINE, {
        userId: userData.userId,
        userName: userData.userName,
        status: 'online',
        lastSeen: new Date(),
        currentRoom: userData.currentRoom,
      });
    });
  }

  /**
   * Setup subscription management handlers
   */
  private static setupSubscriptionHandlers(
    socket: Socket<ClientToServerEvents, ServerToClientEvents>
  ): void {
    const userData = socket.data as SocketData;

    // Subscribe to channels
    socket.on(SocketEvent.SUBSCRIBE, (channels: string[]) => {
      channels.forEach((channel) => {
        socket.join(channel);
        userData.subscriptions.add(channel);
      });
    });

    // Unsubscribe from channels
    socket.on(SocketEvent.UNSUBSCRIBE, (channels: string[]) => {
      channels.forEach((channel) => {
        socket.leave(channel);
        userData.subscriptions.delete(channel);
      });
    });
  }

  /**
   * Setup system/ping handlers
   */
  private static setupSystemHandlers(
    socket: Socket<ClientToServerEvents, ServerToClientEvents>
  ): void {
    // Ping/pong for keepalive
    socket.on(SocketEvent.PING, (callback) => {
      callback();
      socket.emit(SocketEvent.PONG);
    });
  }

  /**
   * Emit booking status change to relevant clients
   */
  static emitBookingStatusChange(
    payload: BookingStatusChangePayload,
    customerId: string,
    contractorId?: string
  ): void {
    // Emit to customer
    this.instance?.to(`user:${customerId}`).emit(SocketEvent.BOOKING_STATUS_CHANGED, payload);

    // Emit to contractor if assigned
    if (contractorId) {
      this.instance?.to(`user:${contractorId}`).emit(SocketEvent.BOOKING_STATUS_CHANGED, payload);
    }

    // Emit to booking subscription channel
    this.instance?.to(`booking:${payload.bookingId}`).emit(SocketEvent.BOOKING_STATUS_CHANGED, payload);
  }

  /**
   * Emit claim status change to relevant clients
   */
  static emitClaimStatusChange(payload: ClaimStatusChangePayload, customerId: string): void {
    // Emit to customer
    this.instance?.to(`user:${customerId}`).emit(SocketEvent.CLAIM_STATUS_CHANGED, payload);

    // Emit to claim subscription channel
    this.instance?.to(`claim:${payload.claimId}`).emit(SocketEvent.CLAIM_STATUS_CHANGED, payload);
  }

  /**
   * Emit notification to user
   */
  static emitNotification(notification: Notification): void {
    this.instance?.to(`user:${notification.userId}`).emit(SocketEvent.NOTIFICATION_RECEIVED, notification);
  }

  /**
   * Emit to specific user room
   */
  static emitToUser(userId: string, event: string, data: any): void {
    this.instance?.to(`user:${userId}`).emit(event as any, data);
  }

  /**
   * Emit to specific room
   */
  static emitToRoom(roomId: string, event: string, data: any): void {
    this.instance?.to(roomId).emit(event as any, data);
  }

  /**
   * Get connected users count
   */
  static async getConnectedUsersCount(): Promise<number> {
    if (!this.instance) return 0;
    const sockets = await this.instance.fetchSockets();
    return sockets.length;
  }

  /**
   * Get connected users
   */
  static async getConnectedUsers(): Promise<SocketData[]> {
    if (!this.instance) return [];
    const sockets = await this.instance.fetchSockets();
    return sockets.map((socket) => socket.data as SocketData);
  }

  /**
   * Disconnect a user
   */
  static disconnectUser(userId: string): void {
    if (!this.instance) return;
    const sockets = this.instance.sockets.sockets;
    sockets.forEach((socket) => {
      if ((socket.data as SocketData).userId === userId) {
        socket.disconnect(true);
      }
    });
  }

  /**
   * Get server instance
   */
  static getInstance(): SocketIOServer<ClientToServerEvents, ServerToClientEvents> | null {
    return this.instance || null;
  }

  /**
   * Shutdown socket server
   */
  static async shutdown(): Promise<void> {
    try {
      if (this.instance) {
        this.instance.close();
      }
      if (this.redisClient) {
        await this.redisClient.disconnect();
      }
      if (this.redisSubscriber) {
        await this.redisSubscriber.disconnect();
      }
      console.log('Socket server shutdown complete');
    } catch (error) {
      console.error('Error during socket server shutdown:', error);
    }
  }
}

/**
 * Export server instance for use in API routes
 */
export { SocketEvent } from './events';
