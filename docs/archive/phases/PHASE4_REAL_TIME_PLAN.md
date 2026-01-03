# Phase 4: Real-time Features & Notifications - PLAN

**Status**: Planning
**Estimated Duration**: 3-4 weeks
**Target Lines of Code**: 1,500-2,000+
**Branch**: Disaster-Recovery

---

## 📋 Phase 4 Overview

Phase 4 implements real-time capabilities for the Disaster Recovery NRP platform, enabling:
- Live booking status updates
- Instant notifications for users
- Real-time chat/messaging between contractors and customers
- Claim processing status streaming
- Contractor availability updates

---

## 🏗️ Architecture Overview

### WebSocket Infrastructure
```
Client (Browser)
    ↓
Next.js API Route (/api/socket)
    ↓
Socket.io Server (WebSocket Handler)
    ↓
Redis Pub/Sub (Message Broadcasting)
    ↓
Database (Prisma)
```

### Data Flow
1. **Client connects** via WebSocket to `/api/socket`
2. **Server authenticates** using JWT from NextAuth
3. **Client emits events** (subscribe, send message, etc.)
4. **Server broadcasts** updates via Redis
5. **All clients receive** real-time updates

---

## 📦 Components to Build

### 1. WebSocket Server Setup (300-400 lines)

#### `lib/websocket/socket-server.ts`
- Socket.io server initialization
- Connection handling
- Authentication middleware
- Event listeners registration
- Error handling

#### `lib/websocket/events.ts`
- Event type definitions
- TypeScript interfaces for all event payloads
- Event constants

#### `lib/websocket/redis-adapter.ts`
- Redis connection
- Pub/Sub message handling
- Room management

#### `api/socket/route.ts`
- Next.js API route handler
- WebSocket upgrade
- Fallback HTTP polling

### 2. Notification System (400-500 lines)

#### `lib/notifications/notification-service.ts`
- In-app notification creation
- Email notification triggers
- SMS alerts (optional)
- Notification persistence

#### `lib/notifications/email-service.ts`
- Email templating
- Nodemailer integration
- Email queue management
- Retry logic

#### `lib/notifications/notification-types.ts`
- Notification type definitions
- Template mappings
- Channel preferences

#### `components/notifications/notification-center.tsx`
- Toast notifications UI
- Notification history
- Mark as read functionality
- Notification preferences button

### 3. Real-time Status Updates (400-500 lines)

#### `lib/realtime/booking-status.ts`
- Booking status change handlers
- Event emission logic
- Status validation rules

#### `lib/realtime/claim-status.ts`
- Claim update handlers
- Status tracking
- Document notifications

#### `lib/realtime/contractor-availability.ts`
- Availability change handlers
- Broadcasting to affected users
- Conflict detection

#### `components/realtime/live-status-indicator.tsx`
- Live status display
- Auto-refresh capability
- Connection status indicator

### 4. Chat/Messaging System (500-600 lines)

#### `lib/chat/message-service.ts`
- Message creation and storage
- Chat history retrieval
- Message search

#### `lib/chat/chat-room.ts`
- Room management
- Participant handling
- Message pagination

#### `components/chat/chat-widget.tsx`
- Chat UI component
- Message input
- Message display
- Auto-scroll functionality

#### `components/chat/message-list.tsx`
- Message rendering
- Timestamp formatting
- User avatars
- Read receipts

#### `components/chat/message-input.tsx`
- Input field with formatting
- File upload support
- Typing indicator

### 5. Real-time UI Components (300-400 lines)

#### `components/realtime/connection-status.tsx`
- Online/offline indicator
- Reconnection status
- Latency display

#### `components/realtime/live-updates.tsx`
- Auto-updating data displays
- Real-time counters
- Activity feeds

#### `components/realtime/activity-feed.tsx`
- Live activity streaming
- User action notifications
- Timestamp display

#### `components/realtime/notification-badge.tsx`
- Badge with count
- Unread indicator
- Click to open notification center

### 6. Notification Preferences (250-300 lines)

#### `components/notifications/preferences-modal.tsx`
- Channel selection (In-app, Email, SMS)
- Notification type toggles
- Quiet hours setting
- Frequency preferences

#### `lib/notifications/preference-service.ts`
- Save user preferences
- Retrieve preferences
- Default preferences

---

## 📊 Implementation Order

### Week 1: WebSocket & Connection Management
1. **Days 1-2**: WebSocket server setup
   - Socket.io installation & configuration
   - Authentication middleware
   - Event type definitions
   - API route handler

2. **Days 3-4**: Redis integration
   - Redis adapter for socket.io
   - Room management
   - Message broadcasting

3. **Days 5-7**: Connection reliability
   - Reconnection logic
   - Heartbeat/ping-pong
   - Connection state management
   - Error handling

### Week 2: Notifications & UI
1. **Days 1-2**: Notification service
   - In-app notifications
   - Email notifications
   - Notification persistence
   - Notification types

2. **Days 3-4**: Notification UI
   - Toast component
   - Notification center
   - Notification badge
   - Mark as read

3. **Days 5-7**: Notification preferences
   - Preferences modal
   - User preferences persistence
   - Default preferences
   - Frequency management

### Week 3: Real-time Status Updates
1. **Days 1-2**: Booking status streaming
   - Status change detection
   - Event emission
   - Status validation

2. **Days 3-4**: Claim & contractor status
   - Claim updates
   - Availability changes
   - Status indicators

3. **Days 5-7**: Live update UI
   - Live status displays
   - Auto-refresh components
   - Activity feeds

### Week 4: Chat & Polish
1. **Days 1-3**: Chat system
   - Message service
   - Chat UI components
   - Message history

2. **Days 4-5**: Chat features
   - Typing indicators
   - Read receipts
   - Online presence

3. **Days 6-7**: Testing & integration
   - Feature testing
   - Integration testing
   - Bug fixes
   - Performance optimization

---

## 🔧 Technical Requirements

### Dependencies to Add
```json
{
  "socket.io": "^4.7.x",
  "socket.io-client": "^4.7.x",
  "redis": "^4.6.x",
  "ioredis": "^5.3.x",
  "nodemailer": "^6.9.x",
  "react-hot-toast": "^2.4.x",
  "zustand": "^4.4.x"
}
```

### Environment Variables
```
REDIS_URL=redis://localhost:6379
SOCKET_IO_PORT=3001
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@example.com
SMTP_PASSWORD=...
NOTIFICATIONS_ENABLED=true
EMAIL_NOTIFICATIONS_ENABLED=true
SMS_NOTIFICATIONS_ENABLED=false
```

### Database Schema Additions
- `Notification` model (already exists in Phase 2)
- `NotificationPreference` model (user preferences)
- `ChatMessage` model (chat messages)
- `ChatRoom` model (chat rooms)

---

## 📈 Code Organization

```
src/
├── lib/
│   ├── websocket/
│   │   ├── socket-server.ts
│   │   ├── events.ts
│   │   ├── redis-adapter.ts
│   │   └── connection-manager.ts
│   ├── notifications/
│   │   ├── notification-service.ts
│   │   ├── email-service.ts
│   │   ├── notification-types.ts
│   │   └── preference-service.ts
│   ├── realtime/
│   │   ├── booking-status.ts
│   │   ├── claim-status.ts
│   │   ├── contractor-availability.ts
│   │   └── activity-stream.ts
│   └── chat/
│       ├── message-service.ts
│       ├── chat-room.ts
│       └── chat-manager.ts
├── components/
│   ├── notifications/
│   │   ├── notification-center.tsx
│   │   ├── notification-toast.tsx
│   │   ├── notification-badge.tsx
│   │   └── preferences-modal.tsx
│   ├── realtime/
│   │   ├── live-status-indicator.tsx
│   │   ├── connection-status.tsx
│   │   ├── live-updates.tsx
│   │   ├── activity-feed.tsx
│   │   └── live-counter.tsx
│   └── chat/
│       ├── chat-widget.tsx
│       ├── message-list.tsx
│       ├── message-input.tsx
│       └── typing-indicator.tsx
└── api/
    ├── socket/
    │   └── route.ts
    ├── notifications/
    │   ├── route.ts (mark as read)
    │   ├── preferences/
    │   │   └── route.ts
    │   └── send/
    │       └── route.ts
    └── chat/
        ├── messages/
        │   └── route.ts
        ├── rooms/
        │   └── route.ts
        └── typing/
            └── route.ts
```

---

## ✨ Key Features

### Real-time Updates
- ✅ Instant booking status changes
- ✅ Live claim processing updates
- ✅ Real-time contractor availability
- ✅ Activity stream updates

### Notifications
- ✅ In-app toast notifications
- ✅ Email notifications
- ✅ Notification history
- ✅ User preferences
- ✅ Mark as read/unread

### Chat
- ✅ Real-time messaging
- ✅ Message history
- ✅ Typing indicators
- ✅ Online presence
- ✅ File sharing (optional)

### Connection Management
- ✅ Auto-reconnect logic
- ✅ Connection status display
- ✅ Offline queue (optional)
- ✅ Heartbeat monitoring

---

## 🧪 Testing Strategy

### Unit Tests
- WebSocket event handling
- Notification service
- Chat message service
- Status update logic

### Integration Tests
- Socket.io connection
- Redis message broadcasting
- Database persistence
- Email sending

### E2E Tests
- Complete booking status update flow
- Chat message delivery
- Notification display
- Preferences persistence

---

## 🚀 Success Criteria

- ✅ WebSocket connections stable and reliable
- ✅ Real-time updates < 500ms latency
- ✅ Notifications sent and received correctly
- ✅ Chat system fully functional
- ✅ All components tested and working
- ✅ No memory leaks or connection issues
- ✅ Graceful reconnection on disconnects

---

## 📝 Phase 4 Milestones

| Milestone | Status | Estimated Completion |
|-----------|--------|----------------------|
| WebSocket Server Setup | ⏳ Pending | Week 1, Day 3 |
| Notification System | ⏳ Pending | Week 2, Day 4 |
| Real-time Status Updates | ⏳ Pending | Week 3, Day 4 |
| Chat System | ⏳ Pending | Week 4, Day 3 |
| Testing & Integration | ⏳ Pending | Week 4, Day 7 |
| **Phase 4 Complete** | ⏳ Pending | Week 4, Day 7 |

---

## 🎯 Next Steps

1. **Today**: Review this plan and approve
2. **Next**: Begin WebSocket server implementation
3. **Then**: Notification system integration
4. **Finally**: Chat system and polish

---

**Phase 4 Estimated Duration**: 3-4 weeks
**Target Lines of Code**: 1,500-2,000+
**Status**: Ready to begin implementation
