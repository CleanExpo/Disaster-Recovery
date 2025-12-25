'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export interface Call {
  id: string;
  type: 'voice' | 'video';
  status: 'initiated' | 'ringing' | 'accepted' | 'active' | 'ended' | 'rejected' | 'missed';
  initiatorId: string;
  recipientId: string;
  roomId?: string;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
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

/**
 * useCall Hook
 *
 * Manage voice and video calls
 */
export function useCall() {
  const { data: session } = useSession();
  const [call, setCall] = useState<Call | null>(null);
  const [participants, setParticipants] = useState<CallParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'fair' | 'poor'>('excellent');
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Polling for call updates
  const startPolling = useCallback((callId: string) => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }

    pollIntervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/calls/${callId}`);
        if (response.ok) {
          const data = await response.json();
          setCall(data.call);
          setParticipants(data.participants || []);
        }
      } catch (err) {
        console.error('Failed to get call details:', err);
      }
    }, 1000);
  }, []);

  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  // Initiate a call
  const initiateCall = useCallback(
    async (recipientId: string, type: 'voice' | 'video' = 'voice', roomId?: string) => {
      if (!session?.user?.id) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/calls', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipientId, type, roomId }),
        });

        if (!response.ok) {
          throw new Error('Failed to initiate call');
        }

        const data = await response.json();
        setCall(data.call);
        setVideoEnabled(type === 'video');

        // Start polling for call updates
        startPolling(data.call.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Call initiation failed');
      } finally {
        setIsLoading(false);
      }
    },
    [session?.user?.id, startPolling]
  );

  // Accept a call
  const acceptCall = useCallback(async (callId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/calls/${callId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept call');
      }

      const data = await response.json();
      setCall(data.call);

      // Start polling
      startPolling(callId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Accept failed');
    } finally {
      setIsLoading(false);
    }
  }, [startPolling]);

  // Reject a call
  const rejectCall = useCallback(async (callId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/calls/${callId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject' }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject call');
      }

      setCall(null);
      stopPolling();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reject failed');
    } finally {
      setIsLoading(false);
    }
  }, [stopPolling]);

  // End call
  const endCall = useCallback(async (callId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/calls/${callId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'end' }),
      });

      if (!response.ok) {
        throw new Error('Failed to end call');
      }

      setCall(null);
      setParticipants([]);
      stopPolling();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'End call failed');
    } finally {
      setIsLoading(false);
    }
  }, [stopPolling]);

  // Toggle audio
  const toggleAudio = useCallback(async (callId: string, enabled: boolean) => {
    try {
      const response = await fetch(`/api/calls/${callId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle-audio', enabled }),
      });

      if (response.ok) {
        setAudioEnabled(enabled);
      }
    } catch (err) {
      console.error('Failed to toggle audio:', err);
    }
  }, []);

  // Toggle video
  const toggleVideo = useCallback(async (callId: string, enabled: boolean) => {
    try {
      const response = await fetch(`/api/calls/${callId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle-video', enabled }),
      });

      if (response.ok) {
        setVideoEnabled(enabled);
      }
    } catch (err) {
      console.error('Failed to toggle video:', err);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  return {
    call,
    participants,
    isLoading,
    error,
    audioEnabled,
    videoEnabled,
    connectionQuality,
    initiateCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleAudio,
    toggleVideo,
    stopPolling,
  };
}
