'use client';

import { useEffect, useCallback, useRef } from 'react';
import {
  callNotifications,
  CallNotificationManager,
  CallNotification,
  CallEventType,
} from '@/lib/realtime/call-notifications';

interface UseCallNotificationsOptions {
  userId: string;
  autoConnect?: boolean;
  onNotification?: (notification: CallNotification) => void;
}

/**
 * useCallNotifications Hook
 *
 * Manage real-time call notifications and events
 */
export function useCallNotifications({
  userId,
  autoConnect = true,
  onNotification,
}: UseCallNotificationsOptions) {
  const managerRef = useRef<CallNotificationManager | null>(null);
  const isConnectedRef = useRef(false);

  // Connect to notifications service
  useEffect(() => {
    if (!autoConnect || isConnectedRef.current) return;

    const connect = async () => {
      try {
        await callNotifications.connect({ userId });
        isConnectedRef.current = true;
      } catch (error) {
        console.error('Failed to connect to call notifications:', error);
        isConnectedRef.current = false;
      }
    };

    connect();

    return () => {
      // Don't disconnect on unmount to keep receiving notifications
      // Users can manually disconnect if needed
    };
  }, [userId, autoConnect]);

  // Initialize notification manager
  useEffect(() => {
    managerRef.current = new CallNotificationManager();

    return () => {
      managerRef.current?.unsubscribeAll();
    };
  }, []);

  /**
   * Subscribe to specific call events
   */
  const subscribe = useCallback(
    (events: { [K in CallEventType]?: (notification: CallNotification) => void }) => {
      if (!managerRef.current) return;

      const eventsWithGlobalHandler = { ...events };

      // Add global handler if provided
      if (onNotification) {
        const eventTypes: CallEventType[] = [
          'call:initiated',
          'call:ringing',
          'call:accepted',
          'call:rejected',
          'call:ended',
          'call:missed',
          'call:audio-toggled',
          'call:video-toggled',
          'call:quality-changed',
          'call:participant-joined',
          'call:participant-left',
          'call:recording-started',
          'call:recording-stopped',
        ];

        eventTypes.forEach((type) => {
          const existingHandler = eventsWithGlobalHandler[type];
          eventsWithGlobalHandler[type] = (notification) => {
            onNotification(notification);
            existingHandler?.(notification);
          };
        });
      }

      managerRef.current.subscribe(eventsWithGlobalHandler);
    },
    [onNotification]
  );

  /**
   * Emit call event
   */
  const emit = useCallback((eventType: CallEventType, data: Omit<CallNotification, 'type'>) => {
    callNotifications.emit(eventType, data);
  }, []);

  /**
   * Check connection status
   */
  const isConnected = callNotifications.getIsConnected();

  /**
   * Manually disconnect
   */
  const disconnect = useCallback(() => {
    callNotifications.disconnect();
    isConnectedRef.current = false;
  }, []);

  return {
    isConnected,
    subscribe,
    emit,
    disconnect,
  };
}

/**
 * Specialized hook for incoming call notifications
 */
export function useIncomingCallNotifications(userId: string) {
  const [incomingCall, setIncomingCall] = useCallback((call: CallNotification | null) => {
    // State management handled by parent
    return null;
  }, []);

  const { subscribe } = useCallNotifications({
    userId,
    onNotification: (notification) => {
      if (notification.type === 'call:ringing' || notification.type === 'call:initiated') {
        setIncomingCall(notification);
      }
    },
  });

  useEffect(() => {
    subscribe({
      'call:ringing': (notification) => {
        setIncomingCall(notification);
      },
      'call:accepted': () => {
        setIncomingCall(null);
      },
      'call:rejected': () => {
        setIncomingCall(null);
      },
      'call:missed': () => {
        setIncomingCall(null);
      },
    });
  }, [subscribe, setIncomingCall]);

  return { incomingCall };
}

/**
 * Specialized hook for call status updates
 */
export function useCallStatusNotifications(callId: string, userId: string) {
  const [callStatus, setCallStatus] = useCallback(
    (status: 'ringing' | 'accepted' | 'active' | 'ended' | 'missed' | 'rejected' | null) => {
      // State management
      return null;
    },
    []
  );

  const { subscribe } = useCallNotifications({
    userId,
    onNotification: (notification) => {
      if (notification.callId === callId) {
        switch (notification.type) {
          case 'call:ringing':
            setCallStatus('ringing');
            break;
          case 'call:accepted':
            setCallStatus('accepted');
            break;
          case 'call:ended':
            setCallStatus('ended');
            break;
          case 'call:missed':
            setCallStatus('missed');
            break;
          case 'call:rejected':
            setCallStatus('rejected');
            break;
        }
      }
    },
  });

  useEffect(() => {
    subscribe({
      'call:ringing': (notification) => {
        if (notification.callId === callId) setCallStatus('ringing');
      },
      'call:accepted': (notification) => {
        if (notification.callId === callId) setCallStatus('accepted');
      },
      'call:ended': (notification) => {
        if (notification.callId === callId) setCallStatus('ended');
      },
      'call:missed': (notification) => {
        if (notification.callId === callId) setCallStatus('missed');
      },
      'call:rejected': (notification) => {
        if (notification.callId === callId) setCallStatus('rejected');
      },
    });
  }, [callId, subscribe, setCallStatus]);

  return { callStatus };
}

/**
 * Specialized hook for participant updates
 */
export function useCallParticipantNotifications(
  callId: string,
  userId: string,
  onParticipantJoined?: (data: CallNotification) => void,
  onParticipantLeft?: (data: CallNotification) => void
) {
  const { subscribe } = useCallNotifications({
    userId,
  });

  useEffect(() => {
    subscribe({
      'call:participant-joined': (notification) => {
        if (notification.callId === callId) {
          onParticipantJoined?.(notification);
        }
      },
      'call:participant-left': (notification) => {
        if (notification.callId === callId) {
          onParticipantLeft?.(notification);
        }
      },
    });
  }, [callId, subscribe, onParticipantJoined, onParticipantLeft]);
}

/**
 * Specialized hook for media state changes
 */
export function useCallMediaNotifications(
  callId: string,
  userId: string,
  onAudioToggled?: (data: CallNotification) => void,
  onVideoToggled?: (data: CallNotification) => void
) {
  const { subscribe } = useCallNotifications({
    userId,
  });

  useEffect(() => {
    subscribe({
      'call:audio-toggled': (notification) => {
        if (notification.callId === callId) {
          onAudioToggled?.(notification);
        }
      },
      'call:video-toggled': (notification) => {
        if (notification.callId === callId) {
          onVideoToggled?.(notification);
        }
      },
    });
  }, [callId, subscribe, onAudioToggled, onVideoToggled]);
}
