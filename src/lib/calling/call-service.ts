'use server';

import { prisma } from '@/lib/prisma';

/**
 * Call Service
 *
 * Manages voice and video calls with WebRTC signaling
 * - Call initiation and management
 * - Call state tracking
 * - Participant management
 * - Call recording metadata
 * - Call history and analytics
 */

export type CallType = 'voice' | 'video';
export type CallStatus = 'initiated' | 'ringing' | 'accepted' | 'active' | 'ended' | 'rejected' | 'missed';

export interface Call {
  id: string;
  type: CallType;
  status: CallStatus;
  initiatorId: string;
  recipientId: string;
  roomId?: string;
  startTime?: Date;
  endTime?: Date;
  duration?: number; // seconds
  recordingUrl?: string;
  recordingDuration?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CallParticipant {
  userId: string;
  userName: string;
  joinedAt: Date;
  leftAt?: Date;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface CallMetrics {
  callId: string;
  duration: number;
  participantCount: number;
  averageLatency: number;
  packetLoss: number;
  videoFrameRate: number;
  audioQuality: 'excellent' | 'good' | 'fair' | 'poor';
}

class CallService {
  private activeCalls = new Map<string, Call>();
  private callParticipants = new Map<string, CallParticipant[]>();
  private callMetrics = new Map<string, CallMetrics>();

  /**
   * Initiate a call
   */
  async initiateCall(
    initiatorId: string,
    recipientId: string,
    type: CallType = 'voice',
    roomId?: string
  ): Promise<Call> {
    try {
      const call: Call = {
        id: this.generateCallId(),
        type,
        status: 'initiated',
        initiatorId,
        recipientId,
        roomId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.activeCalls.set(call.id, call);
      this.callParticipants.set(call.id, [
        {
          userId: initiatorId,
          userName: (await this.getUserName(initiatorId)) || 'Unknown',
          joinedAt: new Date(),
          isAudioEnabled: true,
          isVideoEnabled: type === 'video',
          connectionQuality: 'excellent',
        },
      ]);

      return call;
    } catch (error) {
      console.error('Error initiating call:', error);
      throw error;
    }
  }

  /**
   * Accept a call
   */
  async acceptCall(callId: string, userId: string): Promise<Call> {
    try {
      const call = this.activeCalls.get(callId);
      if (!call) {
        throw new Error('Call not found');
      }

      // Add recipient as participant
      const participants = this.callParticipants.get(callId) || [];
      participants.push({
        userId,
        userName: (await this.getUserName(userId)) || 'Unknown',
        joinedAt: new Date(),
        isAudioEnabled: true,
        isVideoEnabled: call.type === 'video',
        connectionQuality: 'excellent',
      });
      this.callParticipants.set(callId, participants);

      // Update call status
      call.status = 'accepted';
      call.startTime = new Date();
      call.updatedAt = new Date();
      this.activeCalls.set(callId, call);

      return call;
    } catch (error) {
      console.error('Error accepting call:', error);
      throw error;
    }
  }

  /**
   * End a call
   */
  async endCall(callId: string): Promise<Call> {
    try {
      const call = this.activeCalls.get(callId);
      if (!call) {
        throw new Error('Call not found');
      }

      call.status = 'ended';
      call.endTime = new Date();
      if (call.startTime) {
        call.duration = Math.floor((call.endTime.getTime() - call.startTime.getTime()) / 1000);
      }
      call.updatedAt = new Date();

      this.activeCalls.set(callId, call);

      // Record call history
      await this.recordCallHistory(call);

      // Cleanup after delay
      setTimeout(() => {
        this.activeCalls.delete(callId);
        this.callParticipants.delete(callId);
        this.callMetrics.delete(callId);
      }, 30000); // Keep for 30s for final retrieval

      return call;
    } catch (error) {
      console.error('Error ending call:', error);
      throw error;
    }
  }

  /**
   * Reject a call
   */
  async rejectCall(callId: string): Promise<Call> {
    try {
      const call = this.activeCalls.get(callId);
      if (!call) {
        throw new Error('Call not found');
      }

      call.status = 'rejected';
      call.endTime = new Date();
      call.updatedAt = new Date();

      this.activeCalls.set(callId, call);
      this.activeCalls.delete(callId);

      return call;
    } catch (error) {
      console.error('Error rejecting call:', error);
      throw error;
    }
  }

  /**
   * Mark call as missed
   */
  async markCallAsMissed(callId: string): Promise<Call> {
    try {
      const call = this.activeCalls.get(callId);
      if (!call) {
        throw new Error('Call not found');
      }

      call.status = 'missed';
      call.endTime = new Date();
      call.updatedAt = new Date();

      this.activeCalls.set(callId, call);

      // Record as missed call
      await this.recordMissedCall(call);
      this.activeCalls.delete(callId);

      return call;
    } catch (error) {
      console.error('Error marking call as missed:', error);
      throw error;
    }
  }

  /**
   * Toggle audio on/off
   */
  async toggleAudio(callId: string, userId: string, enabled: boolean): Promise<boolean> {
    try {
      const participants = this.callParticipants.get(callId);
      if (!participants) return false;

      const participant = participants.find((p) => p.userId === userId);
      if (participant) {
        participant.isAudioEnabled = enabled;
      }

      return true;
    } catch (error) {
      console.error('Error toggling audio:', error);
      return false;
    }
  }

  /**
   * Toggle video on/off
   */
  async toggleVideo(callId: string, userId: string, enabled: boolean): Promise<boolean> {
    try {
      const participants = this.callParticipants.get(callId);
      if (!participants) return false;

      const participant = participants.find((p) => p.userId === userId);
      if (participant) {
        participant.isVideoEnabled = enabled;
      }

      return true;
    } catch (error) {
      console.error('Error toggling video:', error);
      return false;
    }
  }

  /**
   * Update connection quality
   */
  async updateConnectionQuality(
    callId: string,
    userId: string,
    quality: 'excellent' | 'good' | 'fair' | 'poor'
  ): Promise<boolean> {
    try {
      const participants = this.callParticipants.get(callId);
      if (!participants) return false;

      const participant = participants.find((p) => p.userId === userId);
      if (participant) {
        participant.connectionQuality = quality;
      }

      return true;
    } catch (error) {
      console.error('Error updating connection quality:', error);
      return false;
    }
  }

  /**
   * Get active call
   */
  getCall(callId: string): Call | null {
    return this.activeCalls.get(callId) || null;
  }

  /**
   * Get call participants
   */
  getCallParticipants(callId: string): CallParticipant[] {
    return this.callParticipants.get(callId) || [];
  }

  /**
   * Get user's active calls
   */
  getUserActiveCalls(userId: string): Call[] {
    const calls: Call[] = [];

    for (const call of this.activeCalls.values()) {
      if (call.initiatorId === userId || call.recipientId === userId) {
        calls.push(call);
      }
    }

    return calls;
  }

  /**
   * Record call metrics
   */
  async recordCallMetrics(
    callId: string,
    metrics: Omit<CallMetrics, 'callId'>
  ): Promise<void> {
    try {
      const fullMetrics: CallMetrics = {
        callId,
        ...metrics,
      };

      this.callMetrics.set(callId, fullMetrics);
    } catch (error) {
      console.error('Error recording call metrics:', error);
    }
  }

  /**
   * Get call metrics
   */
  getCallMetrics(callId: string): CallMetrics | null {
    return this.callMetrics.get(callId) || null;
  }

  /**
   * Get call history for user
   */
  async getCallHistory(userId: string, limit: number = 50): Promise<Call[]> {
    try {
      // In production, fetch from database
      // For now, return empty array as these are stored in DB after call ends
      return [];
    } catch (error) {
      console.error('Error getting call history:', error);
      return [];
    }
  }

  /**
   * Get missed calls for user
   */
  async getMissedCalls(userId: string): Promise<Call[]> {
    try {
      // In production, fetch from database
      return [];
    } catch (error) {
      console.error('Error getting missed calls:', error);
      return [];
    }
  }

  /**
   * Record call history to database
   */
  private async recordCallHistory(call: Call): Promise<void> {
    try {
      // In production, save to database
      console.log(`Call recorded: ${call.id}, Duration: ${call.duration}s`);
    } catch (error) {
      console.error('Error recording call history:', error);
    }
  }

  /**
   * Record missed call
   */
  private async recordMissedCall(call: Call): Promise<void> {
    try {
      // In production, save to database
      console.log(`Missed call recorded: ${call.id}`);
    } catch (error) {
      console.error('Error recording missed call:', error);
    }
  }

  /**
   * Get user name
   */
  private async getUserName(userId: string): Promise<string | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
      });

      return user?.name || null;
    } catch (error) {
      console.error('Error getting user name:', error);
      return null;
    }
  }

  /**
   * Generate unique call ID
   */
  private generateCallId(): string {
    return `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get call statistics
   */
  getCallStats() {
    return {
      activeCallsCount: this.activeCalls.size,
      totalParticipants: Array.from(this.callParticipants.values()).reduce(
        (sum, participants) => sum + participants.length,
        0
      ),
      callMetricsCount: this.callMetrics.size,
    };
  }
}

// Export singleton instance
export const callService = new CallService();
