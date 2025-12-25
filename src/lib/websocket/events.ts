// WebSocket Event Types and Interfaces

export enum SocketEvent {
  // Connection Events
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CONNECT_ERROR = 'connect_error',
  RECONNECT_ATTEMPT = 'reconnect_attempt',

  // Notification Events
  NOTIFICATION_SEND = 'notification:send',
  NOTIFICATION_RECEIVED = 'notification:received',
  NOTIFICATION_READ = 'notification:read',
  NOTIFICATION_DELETE = 'notification:delete',

  // Booking Status Events
  BOOKING_CREATED = 'booking:created',
  BOOKING_UPDATED = 'booking:updated',
  BOOKING_STATUS_CHANGED = 'booking:status_changed',
  BOOKING_ASSIGNED = 'booking:assigned',
  BOOKING_CANCELLED = 'booking:cancelled',

  // Claim Status Events
  CLAIM_SUBMITTED = 'claim:submitted',
  CLAIM_UPDATED = 'claim:updated',
  CLAIM_STATUS_CHANGED = 'claim:status_changed',
  CLAIM_APPROVED = 'claim:approved',
  CLAIM_REJECTED = 'claim:rejected',

  // Contractor Status Events
  CONTRACTOR_AVAILABLE = 'contractor:available',
  CONTRACTOR_UNAVAILABLE = 'contractor:unavailable',
  CONTRACTOR_STATUS_CHANGED = 'contractor:status_changed',

  // Chat Events
  CHAT_MESSAGE_SEND = 'chat:message:send',
  CHAT_MESSAGE_RECEIVED = 'chat:message:received',
  CHAT_TYPING = 'chat:typing',
  CHAT_TYPING_STOP = 'chat:typing:stop',
  CHAT_ROOM_JOIN = 'chat:room:join',
  CHAT_ROOM_LEAVE = 'chat:room:leave',

  // Activity Events
  USER_ONLINE = 'user:online',
  USER_OFFLINE = 'user:offline',
  ACTIVITY_UPDATE = 'activity:update',

  // System Events
  PING = 'ping',
  PONG = 'pong',
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
  ERROR = 'error',
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'claim' | 'contractor' | 'system' | 'chat';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
  channels: ('in-app' | 'email' | 'sms')[];
}

export interface NotificationPayload {
  userId: string;
  type: Notification['type'];
  title: string;
  message: string;
  data?: Record<string, any>;
  channels?: Notification['channels'];
}

// Booking Status Events
export interface BookingStatusChangePayload {
  bookingId: string;
  previousStatus: string;
  newStatus: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  contractorId?: string;
  customerId: string;
  timestamp: Date;
  details?: string;
}

export interface BookingCreatedPayload {
  bookingId: string;
  customerId: string;
  serviceType: string;
  location: string;
  timestamp: Date;
}

export interface BookingAssignedPayload {
  bookingId: string;
  contractorId: string;
  customerId: string;
  contractorName: string;
  estimatedArrival?: string;
  timestamp: Date;
}

// Claim Status Events
export interface ClaimStatusChangePayload {
  claimId: string;
  previousStatus: string;
  newStatus: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'paid';
  customerId: string;
  amount: number;
  timestamp: Date;
  details?: string;
}

export interface ClaimApprovedPayload {
  claimId: string;
  customerId: string;
  amount: number;
  approvedAt: Date;
  paymentDate?: Date;
}

export interface ClaimRejectedPayload {
  claimId: string;
  customerId: string;
  reason: string;
  rejectedAt: Date;
  appealDeadline: Date;
}

// Contractor Status Events
export interface ContractorStatusChangePayload {
  contractorId: string;
  previousStatus: string;
  newStatus: 'available' | 'unavailable' | 'busy' | 'offline';
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface ContractorAvailabilityPayload {
  contractorId: string;
  available: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
  availableUntil?: Date;
  timestamp: Date;
}

// Chat Events
export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  attachments?: Array<{
    url: string;
    type: string;
    name: string;
  }>;
  readBy: string[];
  createdAt: Date;
}

export interface ChatMessagePayload {
  roomId: string;
  content: string;
  attachments?: ChatMessage['attachments'];
}

export interface TypingIndicatorPayload {
  roomId: string;
  userId: string;
  userName: string;
  isTyping: boolean;
}

export interface ChatRoomJoinPayload {
  roomId: string;
  userId: string;
  userName: string;
  timestamp: Date;
}

// Activity Events
export interface ActivityUpdate {
  id: string;
  userId: string;
  action: string;
  subject: string;
  timestamp: Date;
  data?: Record<string, any>;
}

export interface ActivityPayload {
  action: string;
  subject: string;
  data?: Record<string, any>;
}

// User Presence
export interface UserPresence {
  userId: string;
  userName: string;
  status: 'online' | 'away' | 'offline';
  lastSeen: Date;
  currentRoom?: string;
}

export interface UserStatusPayload {
  userId: string;
  status: 'online' | 'offline' | 'away';
  timestamp: Date;
}

// Server to Client Events
export interface ServerToClientEvents {
  [SocketEvent.NOTIFICATION_RECEIVED]: (notification: Notification) => void;
  [SocketEvent.BOOKING_STATUS_CHANGED]: (payload: BookingStatusChangePayload) => void;
  [SocketEvent.BOOKING_ASSIGNED]: (payload: BookingAssignedPayload) => void;
  [SocketEvent.BOOKING_CREATED]: (payload: BookingCreatedPayload) => void;
  [SocketEvent.CLAIM_STATUS_CHANGED]: (payload: ClaimStatusChangePayload) => void;
  [SocketEvent.CLAIM_APPROVED]: (payload: ClaimApprovedPayload) => void;
  [SocketEvent.CLAIM_REJECTED]: (payload: ClaimRejectedPayload) => void;
  [SocketEvent.CONTRACTOR_STATUS_CHANGED]: (payload: ContractorStatusChangePayload) => void;
  [SocketEvent.CHAT_MESSAGE_RECEIVED]: (message: ChatMessage) => void;
  [SocketEvent.CHAT_TYPING]: (payload: TypingIndicatorPayload) => void;
  [SocketEvent.CHAT_TYPING_STOP]: (payload: TypingIndicatorPayload) => void;
  [SocketEvent.USER_ONLINE]: (presence: UserPresence) => void;
  [SocketEvent.USER_OFFLINE]: (presence: UserPresence) => void;
  [SocketEvent.ACTIVITY_UPDATE]: (activity: ActivityUpdate) => void;
  [SocketEvent.PONG]: () => void;
  [SocketEvent.ERROR]: (error: { message: string; code?: string }) => void;
}

// Client to Server Events
export interface ClientToServerEvents {
  [SocketEvent.NOTIFICATION_READ]: (notificationId: string, callback?: () => void) => void;
  [SocketEvent.CHAT_MESSAGE_SEND]: (payload: ChatMessagePayload, callback?: (error: Error | null) => void) => void;
  [SocketEvent.CHAT_TYPING]: (payload: TypingIndicatorPayload) => void;
  [SocketEvent.CHAT_TYPING_STOP]: (roomId: string) => void;
  [SocketEvent.SUBSCRIBE]: (channels: string[]) => void;
  [SocketEvent.UNSUBSCRIBE]: (channels: string[]) => void;
  [SocketEvent.PING]: (callback: () => void) => void;
}

// Socket Data (stored on socket instance)
export interface SocketData {
  userId: string;
  userName: string;
  userRole: 'customer' | 'contractor' | 'admin';
  email: string;
  connectedAt: Date;
  subscriptions: Set<string>;
  currentRoom?: string;
}
