'use client';

import { useState, useEffect } from 'react';
import { useCallNotifications } from '@/hooks/useCallNotifications';
import { IncomingCallDialog } from './incoming-call-dialog';
import type { CallNotification } from '@/lib/realtime/call-notifications';

interface CallNotificationManagerProps {
  userId: string;
  onIncomingCall?: (call: CallNotification) => void;
  onCallEnded?: (call: CallNotification) => void;
}

/**
 * CallNotificationManager Component
 *
 * Manages incoming call notifications and displays call dialogs
 */
export function CallNotificationManager({
  userId,
  onIncomingCall,
  onCallEnded,
}: CallNotificationManagerProps) {
  const [incomingCall, setIncomingCall] = useState<CallNotification | null>(null);
  const [callNotifications, setCallNotifications] = useState<CallNotification[]>([]);
  const [hideDialog, setHideDialog] = useState(false);

  const { isConnected, subscribe } = useCallNotifications({
    userId,
    autoConnect: true,
  });

  // Subscribe to call events
  useEffect(() => {
    subscribe({
      'call:initiated': (notification) => {
        setIncomingCall(notification);
        onIncomingCall?.(notification);

        // Add to notification log
        setCallNotifications((prev) => [notification, ...prev]);

        // Auto-hide after 30 seconds
        const timeout = setTimeout(() => {
          setHideDialog(true);
        }, 30000);

        return () => clearTimeout(timeout);
      },

      'call:ringing': (notification) => {
        setIncomingCall(notification);

        // Auto-hide after 30 seconds
        const timeout = setTimeout(() => {
          setHideDialog(true);
        }, 30000);

        return () => clearTimeout(timeout);
      },

      'call:accepted': (notification) => {
        // Call was accepted, close dialog
        setIncomingCall(null);
        setHideDialog(false);
      },

      'call:rejected': (notification) => {
        // Call was rejected
        setIncomingCall(null);
        setHideDialog(false);
      },

      'call:ended': (notification) => {
        // Call ended
        setIncomingCall(null);
        setHideDialog(false);
        onCallEnded?.(notification);
      },

      'call:missed': (notification) => {
        // Call was missed
        setIncomingCall(null);
        setHideDialog(false);
      },
    });
  }, [subscribe, onIncomingCall, onCallEnded]);

  if (!isConnected || !incomingCall || hideDialog) {
    return null;
  }

  return (
    <IncomingCallDialog
      callId={incomingCall.callId}
      callerId={incomingCall.userId}
      callerName={incomingCall.data?.callerName || 'Unknown'}
      callerAvatar={incomingCall.data?.callerAvatar}
      callType={incomingCall.data?.callType || 'voice'}
      onClose={() => {
        setIncomingCall(null);
        setHideDialog(false);
      }}
    />
  );
}

interface CallStatusNotificationProps {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

/**
 * Call Status Notification Component
 *
 * Toast-like notification for call status updates
 */
export function CallStatusNotification({
  message,
  type,
  duration = 4000,
}: CallStatusNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration]);

  if (!isVisible) return null;

  const bgColor = {
    info: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200',
  }[type];

  const textColor = {
    info: 'text-blue-800',
    success: 'text-green-800',
    warning: 'text-yellow-800',
    error: 'text-red-800',
  }[type];

  const iconColor = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  }[type];

  const icons = {
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg border ${bgColor} ${textColor} shadow-lg animate-fade-in-up`}
    >
      <div className={`flex-shrink-0 ${iconColor}`}>{icons[type]}</div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
