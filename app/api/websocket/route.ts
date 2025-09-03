/**
 * WebSocket API Route for Next.js
 * Handles real-time communication for the main application
 */

import { NextRequest } from 'next/server';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';

// WebSocket server instance (singleton)
let io: SocketIOServer | null = null;

export async function GET(request: NextRequest) {
  // Return WebSocket server status
  return Response.json({
    status: 'WebSocket endpoint ready',
    connections: io ? io.engine.clientsCount : 0,
    endpoint: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'
  });
}

export async function POST(request: NextRequest) {
  // Handle WebSocket events from server-side
  const body = await request.json();
  
  if (!io) {
    return Response.json(
      { error: 'WebSocket server not initialized' },
      { status: 503 }
    );
  }
  
  const { event, data, room } = body;
  
  // Emit event to specific room or broadcast
  if (room) {
    io.to(room).emit(event, data);
  } else {
    io.emit(event, data);
  }
  
  return Response.json({
    success: true,
    event,
    recipients: room ? `room:${room}` : 'broadcast'
  });
}

// Initialize WebSocket server (called once on server start)
export function initializeWebSocket(httpServer: any) {
  if (io) return io;
  
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      methods: ['GET', 'POST']
    },
    transports: ['websocket', 'polling']
  });
  
  // Connection handler
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    
    // Join room based on user type
    socket.on('join', (data) => {
      const { userId, userType, location } = data;
      
      // Join user-specific room
      if (userId) {
        socket.join(`user:${userId}`);
      }
      
      // Join type-specific room
      if (userType) {
        socket.join(`type:${userType}`);
      }
      
      // Join location-specific room
      if (location) {
        socket.join(`location:${location}`);
      }
      
      socket.emit('joined', {
        rooms: Array.from(socket.rooms),
        timestamp: new Date()
      });
    });
    
    // Handle emergency reports
    socket.on('emergency', (data) => {
      const { type, location, severity, details } = data;
      
      // Broadcast to all contractors in the area
      io.to(`location:${location}`).emit('emergency:alert', {
        id: `EMRG-${Date.now()}`,
        type,
        location,
        severity,
        details,
        timestamp: new Date()
      });
      
      // Notify admins
      io.to('type:admin').emit('emergency:new', data);
    });
    
    // Handle job updates
    socket.on('job:update', (data) => {
      const { jobId, status, contractorId, clientId } = data;
      
      // Notify specific client
      if (clientId) {
        io.to(`user:${clientId}`).emit('job:status', {
          jobId,
          status,
          contractorId,
          timestamp: new Date()
        });
      }
      
      // Update dashboard
      io.to('type:admin').emit('dashboard:update', {
        type: 'job',
        data
      });
    });
    
    // Handle notifications
    socket.on('notification:send', (data) => {
      const { userId, type, message, priority } = data;
      
      io.to(`user:${userId}`).emit('notification:receive', {
        id: `NOTIF-${Date.now()}`,
        type,
        message,
        priority,
        timestamp: new Date()
      });
    });
    
    // Handle chat messages
    socket.on('chat:message', (data) => {
      const { from, to, message, sessionId } = data;
      
      // Send to recipient
      io.to(`user:${to}`).emit('chat:receive', {
        from,
        message,
        sessionId,
        timestamp: new Date()
      });
      
      // Confirm to sender
      socket.emit('chat:sent', {
        messageId: `MSG-${Date.now()}`,
        timestamp: new Date()
      });
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
  
  return io;
}