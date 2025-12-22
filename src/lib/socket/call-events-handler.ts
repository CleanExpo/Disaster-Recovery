/**
 * Call Events Handler
 *
 * Socket.io event handlers for call notifications and real-time updates
 */

import { Server, Socket } from 'socket.io';
import { callService } from '@/lib/calling/call-service';
import { webrtcSignaling } from '@/lib/calling/webrtc-signaling';

interface CallEventPayload {
  callId: string;
  userId: string;
  participantId?: string;
  data?: Record<string, any>;
}

interface CallRoomData {
  callId: string;
  participantIds: Set<string>;
  createdAt: Date;
}

/**
 * Initialize call event handlers
 */
export function initializeCallEventHandlers(io: Server) {
  const callRooms = new Map<string, CallRoomData>();

  io.on('connection', (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;

    console.log(`User ${userId} connected for call notifications`);

    // Join user's personal room for notifications
    socket.join(`user:${userId}`);

    /**
     * Handle call initiated event
     */
    socket.on('call:initiated', async (payload: CallEventPayload) => {
      try {
        const { callId, participantId } = payload;

        if (!callId || !participantId) {
          socket.emit('error', { message: 'Missing callId or participantId' });
          return;
        }

        // Create call room
        if (!callRooms.has(callId)) {
          callRooms.set(callId, {
            callId,
            participantIds: new Set([userId, participantId]),
            createdAt: new Date(),
          });
        }

        // Add participants to call room
        socket.join(`call:${callId}`);

        // Notify recipient
        io.to(`user:${participantId}`).emit('call:initiated', {
          type: 'call:initiated',
          callId,
          userId,
          timestamp: new Date().toISOString(),
          data: payload.data,
        });

        console.log(`Call ${callId} initiated by ${userId} to ${participantId}`);
      } catch (error) {
        console.error('Error handling call:initiated:', error);
        socket.emit('error', { message: 'Failed to initiate call' });
      }
    });

    /**
     * Handle call ringing event
     */
    socket.on('call:ringing', async (payload: CallEventPayload) => {
      try {
        const { callId } = payload;

        // Notify initiator
        io.to(`call:${callId}`).emit('call:ringing', {
          type: 'call:ringing',
          callId,
          userId,
          timestamp: new Date().toISOString(),
        });

        console.log(`Call ${callId} is ringing for user ${userId}`);
      } catch (error) {
        console.error('Error handling call:ringing:', error);
        socket.emit('error', { message: 'Failed to ring' });
      }
    });

    /**
     * Handle call accepted event
     */
    socket.on('call:accepted', async (payload: CallEventPayload) => {
      try {
        const { callId } = payload;

        // Update call status in database
        const call = callService.getCall(callId);
        if (call) {
          await callService.acceptCall(callId, userId);
        }

        // Notify all participants
        io.to(`call:${callId}`).emit('call:accepted', {
          type: 'call:accepted',
          callId,
          userId,
          timestamp: new Date().toISOString(),
        });

        console.log(`Call ${callId} accepted by user ${userId}`);
      } catch (error) {
        console.error('Error handling call:accepted:', error);
        socket.emit('error', { message: 'Failed to accept call' });
      }
    });

    /**
     * Handle call rejected event
     */
    socket.on('call:rejected', async (payload: CallEventPayload) => {
      try {
        const { callId } = payload;

        // Update call status
        const call = callService.getCall(callId);
        if (call) {
          await callService.rejectCall(callId);
        }

        // Notify all participants
        io.to(`call:${callId}`).emit('call:rejected', {
          type: 'call:rejected',
          callId,
          userId,
          timestamp: new Date().toISOString(),
          data: payload.data,
        });

        // Clean up call room
        callRooms.delete(callId);
        socket.leave(`call:${callId}`);

        console.log(`Call ${callId} rejected by user ${userId}`);
      } catch (error) {
        console.error('Error handling call:rejected:', error);
        socket.emit('error', { message: 'Failed to reject call' });
      }
    });

    /**
     * Handle call ended event
     */
    socket.on('call:ended', async (payload: CallEventPayload) => {
      try {
        const { callId } = payload;

        // Update call status
        const call = callService.getCall(callId);
        if (call) {
          await callService.endCall(callId);
        }

        // Notify all participants
        io.to(`call:${callId}`).emit('call:ended', {
          type: 'call:ended',
          callId,
          userId,
          timestamp: new Date().toISOString(),
        });

        // Clean up
        callRooms.delete(callId);
        io.socketsLeave(`call:${callId}`);

        console.log(`Call ${callId} ended by user ${userId}`);
      } catch (error) {
        console.error('Error handling call:ended:', error);
        socket.emit('error', { message: 'Failed to end call' });
      }
    });

    /**
     * Handle call missed event
     */
    socket.on('call:missed', async (payload: CallEventPayload) => {
      try {
        const { callId } = payload;

        // Update call status
        const call = callService.getCall(callId);
        if (call) {
          await callService.markCallAsMissed(callId);
        }

        // Notify all participants
        io.to(`call:${callId}`).emit('call:missed', {
          type: 'call:missed',
          callId,
          userId,
          timestamp: new Date().toISOString(),
        });

        // Clean up
        callRooms.delete(callId);
        io.socketsLeave(`call:${callId}`);

        console.log(`Call ${callId} marked as missed for user ${userId}`);
      } catch (error) {
        console.error('Error handling call:missed:', error);
        socket.emit('error', { message: 'Failed to mark call as missed' });
      }
    });

    /**
     * Handle audio toggle event
     */
    socket.on('call:audio-toggled', async (payload: CallEventPayload) => {
      try {
        const { callId, data } = payload;
        const audioEnabled = data?.audioEnabled ?? false;

        // Update call status
        await callService.toggleAudio(callId, userId, audioEnabled);

        // Notify all participants in call
        io.to(`call:${callId}`).emit('call:audio-toggled', {
          type: 'call:audio-toggled',
          callId,
          userId,
          timestamp: new Date().toISOString(),
          data: { audioEnabled },
        });

        console.log(`Audio toggled to ${audioEnabled} for user ${userId} in call ${callId}`);
      } catch (error) {
        console.error('Error handling call:audio-toggled:', error);
        socket.emit('error', { message: 'Failed to toggle audio' });
      }
    });

    /**
     * Handle video toggle event
     */
    socket.on('call:video-toggled', async (payload: CallEventPayload) => {
      try {
        const { callId, data } = payload;
        const videoEnabled = data?.videoEnabled ?? false;

        // Update call status
        await callService.toggleVideo(callId, userId, videoEnabled);

        // Notify all participants in call
        io.to(`call:${callId}`).emit('call:video-toggled', {
          type: 'call:video-toggled',
          callId,
          userId,
          timestamp: new Date().toISOString(),
          data: { videoEnabled },
        });

        console.log(`Video toggled to ${videoEnabled} for user ${userId} in call ${callId}`);
      } catch (error) {
        console.error('Error handling call:video-toggled:', error);
        socket.emit('error', { message: 'Failed to toggle video' });
      }
    });

    /**
     * Handle quality changed event
     */
    socket.on('call:quality-changed', async (payload: CallEventPayload) => {
      try {
        const { callId, data } = payload;
        const quality = data?.quality ?? 'medium';

        // Update connection quality
        await callService.updateConnectionQuality(callId, userId, quality);

        // Notify all participants
        io.to(`call:${callId}`).emit('call:quality-changed', {
          type: 'call:quality-changed',
          callId,
          userId,
          timestamp: new Date().toISOString(),
          data: { quality },
        });

        console.log(`Connection quality changed to ${quality} for user ${userId}`);
      } catch (error) {
        console.error('Error handling call:quality-changed:', error);
        socket.emit('error', { message: 'Failed to update quality' });
      }
    });

    /**
     * Handle participant joined
     */
    socket.on('call:participant-joined', async (payload: CallEventPayload) => {
      try {
        const { callId } = payload;
        const roomData = callRooms.get(callId);

        if (roomData) {
          roomData.participantIds.add(userId);
        }

        // Notify all participants
        io.to(`call:${callId}`).emit('call:participant-joined', {
          type: 'call:participant-joined',
          callId,
          userId,
          timestamp: new Date().toISOString(),
          data: {
            participantCount: roomData?.participantIds.size ?? 2,
          },
        });

        console.log(`Participant ${userId} joined call ${callId}`);
      } catch (error) {
        console.error('Error handling call:participant-joined:', error);
        socket.emit('error', { message: 'Failed to join call' });
      }
    });

    /**
     * Handle participant left
     */
    socket.on('call:participant-left', async (payload: CallEventPayload) => {
      try {
        const { callId } = payload;
        const roomData = callRooms.get(callId);

        if (roomData) {
          roomData.participantIds.delete(userId);

          // End call if no participants left
          if (roomData.participantIds.size === 0) {
            await callService.endCall(callId);
            callRooms.delete(callId);
            io.socketsLeave(`call:${callId}`);
          }
        }

        // Notify remaining participants
        io.to(`call:${callId}`).emit('call:participant-left', {
          type: 'call:participant-left',
          callId,
          userId,
          timestamp: new Date().toISOString(),
          data: {
            participantCount: roomData?.participantIds.size ?? 0,
          },
        });

        console.log(`Participant ${userId} left call ${callId}`);
      } catch (error) {
        console.error('Error handling call:participant-left:', error);
        socket.emit('error', { message: 'Failed to handle participant leaving' });
      }
    });

    /**
     * Handle recording started
     */
    socket.on('call:recording-started', async (payload: CallEventPayload) => {
      try {
        const { callId, data } = payload;
        const recordingId = data?.recordingId;

        // Notify all participants
        io.to(`call:${callId}`).emit('call:recording-started', {
          type: 'call:recording-started',
          callId,
          userId,
          timestamp: new Date().toISOString(),
          data: { recordingId },
        });

        console.log(`Recording started for call ${callId} by user ${userId}`);
      } catch (error) {
        console.error('Error handling call:recording-started:', error);
        socket.emit('error', { message: 'Failed to start recording' });
      }
    });

    /**
     * Handle recording stopped
     */
    socket.on('call:recording-stopped', async (payload: CallEventPayload) => {
      try {
        const { callId, data } = payload;
        const recordingId = data?.recordingId;

        // Notify all participants
        io.to(`call:${callId}`).emit('call:recording-stopped', {
          type: 'call:recording-stopped',
          callId,
          userId,
          timestamp: new Date().toISOString(),
          data: { recordingId },
        });

        console.log(`Recording stopped for call ${callId} by user ${userId}`);
      } catch (error) {
        console.error('Error handling call:recording-stopped:', error);
        socket.emit('error', { message: 'Failed to stop recording' });
      }
    });

    /**
     * Handle disconnect
     */
    socket.on('disconnect', () => {
      console.log(`User ${userId} disconnected`);

      // Leave all call rooms
      socket.rooms.forEach((room) => {
        if (room.startsWith('call:')) {
          const callId = room.replace('call:', '');
          const roomData = callRooms.get(callId);

          if (roomData) {
            roomData.participantIds.delete(userId);

            // Notify remaining participants
            io.to(`call:${callId}`).emit('call:participant-left', {
              type: 'call:participant-left',
              callId,
              userId,
              timestamp: new Date().toISOString(),
              data: {
                participantCount: roomData.participantIds.size,
              },
            });

            // Clean up if no participants left
            if (roomData.participantIds.size === 0) {
              callService.endCall(callId).catch((err) => {
                console.error('Error ending call after disconnect:', err);
              });
              callRooms.delete(callId);
            }
          }
        }
      });
    });
  });
}
