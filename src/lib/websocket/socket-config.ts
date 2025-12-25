/**
 * Socket.io Configuration
 *
 * Centralized configuration for Socket.io server and client
 */

export const SOCKET_CONFIG = {
  // Server configuration
  server: {
    port: parseInt(process.env.SOCKET_PORT || '3001'),
    host: process.env.SOCKET_HOST || 'localhost',
    cors: {
      origin: (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').split(','),
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    maxHttpBufferSize: 1e6, // 1 MB
  },

  // Redis configuration
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    retryStrategy: (times: number) => Math.min(times * 50, 2000),
  },

  // Client configuration
  client: {
    url: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001',
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ['websocket', 'polling'],
  },

  // Event configuration
  events: {
    // Notification events
    notificationRead: 'notification:read',
    notificationDelete: 'notification:delete',

    // Chat events
    chatMessageSend: 'chat:message:send',
    chatMessageReceived: 'chat:message:received',
    chatTyping: 'chat:typing',
    chatTypingStop: 'chat:typing:stop',
    chatRoomJoin: 'chat:room:join',
    chatRoomLeave: 'chat:room:leave',

    // Booking events
    bookingCreated: 'booking:created',
    bookingStatusChanged: 'booking:status_changed',
    bookingAssigned: 'booking:assigned',
    bookingCancelled: 'booking:cancelled',

    // Claim events
    claimSubmitted: 'claim:submitted',
    claimStatusChanged: 'claim:status_changed',
    claimApproved: 'claim:approved',
    claimRejected: 'claim:rejected',

    // Presence events
    userOnline: 'user:online',
    userOffline: 'user:offline',

    // Subscription events
    subscribe: 'subscribe',
    unsubscribe: 'unsubscribe',

    // System events
    ping: 'ping',
    pong: 'pong',
  },

  // Timeouts and limits
  timeouts: {
    pingInterval: 25000, // 25 seconds
    pingTimeout: 60000, // 60 seconds
    messageTimeout: 5000, // 5 seconds for message delivery
    typingDebounce: 300, // 300ms for typing indicators
  },

  // Channel naming patterns
  channels: {
    user: (userId: string) => `user:${userId}`,
    booking: (bookingId: string) => `booking:${bookingId}`,
    claim: (claimId: string) => `claim:${claimId}`,
    chatRoom: (roomId: string) => `room:${roomId}`,
    admin: () => 'admin',
    contractors: () => 'contractors',
    customers: () => 'customers',
  },
};

export const isProductionMode = process.env.NODE_ENV === 'production';
export const isDevelopmentMode = process.env.NODE_ENV === 'development';
export const isTestMode = process.env.NODE_ENV === 'test';
