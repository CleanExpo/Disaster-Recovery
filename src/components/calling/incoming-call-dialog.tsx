'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCall } from '@/hooks/useCall';

interface IncomingCallDialogProps {
  callId: string;
  callerId: string;
  callerName: string;
  callerAvatar?: string;
  callType: 'video' | 'voice';
  onClose: () => void;
}

/**
 * IncomingCallDialog Component
 *
 * Notification dialog for incoming calls with accept/reject options
 */
export function IncomingCallDialog({
  callId,
  callerId,
  callerName,
  callerAvatar,
  callType,
  onClose,
}: IncomingCallDialogProps) {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const { acceptCall, rejectCall } = useCall(callId);
  const [ringCount, setRingCount] = useState(0);

  // Ring animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRingCount((prev) => (prev + 1) % 4);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async () => {
    try {
      setIsAccepting(true);
      await acceptCall(callId);
      // Dialog will close when component unmounts or call state changes
    } catch (error) {
      console.error('Failed to accept call:', error);
      setIsAccepting(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsRejecting(true);
      await rejectCall(callId);
      onClose();
    } catch (error) {
      console.error('Failed to reject call:', error);
      setIsRejecting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-center relative overflow-hidden">
          {/* Animated ring effect */}
          <div className="absolute inset-0">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-blue-400 rounded-full"
                style={{
                  opacity: Math.max(0, 1 - (ringCount + i) / 3) * 0.5,
                  transform: `scale(${1 + (ringCount + i) * 0.15})`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              {callerAvatar ? (
                <Image
                  src={callerAvatar}
                  alt={callerName}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white object-cover"
                  priority
                  unoptimized={callerAvatar.startsWith('http')}
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-4 border-white bg-blue-500 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Caller Info */}
            <h2 className="text-white text-2xl font-bold mb-2">{callerName}</h2>
            <p className="text-blue-100 text-sm">
              Incoming {callType === 'video' ? 'video' : 'voice'} call
            </p>
          </div>
        </div>

        {/* Call Type Badge */}
        <div className="flex justify-center px-6 pt-6">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              callType === 'video'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {callType === 'video' ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                <span className="text-sm font-medium">Video Call</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.797l.291 2.055a1 1 0 01-.471 1.032l-1.107.554a8.001 8.001 0 006.289 6.289l.554-1.107a1 1 0 011.032-.471l2.055.291a1 1 0 01.797.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm font-medium">Voice Call</span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 px-6 py-6">
          {/* Reject Button */}
          <button
            onClick={handleReject}
            disabled={isRejecting || isAccepting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRejecting ? (
              <>
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                <span>Rejecting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
                <span>Reject</span>
              </>
            )}
          </button>

          {/* Accept Button */}
          <button
            onClick={handleAccept}
            disabled={isAccepting || isRejecting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAccepting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Accepting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.797l.291 2.055a1 1 0 01-.471 1.032l-1.107.554a8.001 8.001 0 006.289 6.289l.554-1.107a1 1 0 011.032-.471l2.055.291a1 1 0 01.797.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Accept</span>
              </>
            )}
          </button>
        </div>

        {/* Auto-reject info */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 text-center">
          <p className="text-xs text-gray-600">
            Call will be rejected automatically in 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
