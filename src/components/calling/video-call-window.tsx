'use client';

import { useState, useRef, useEffect } from 'react';
import { useCall } from '@/hooks/useCall';
import { useWebRTC } from '@/hooks/useWebRTC';

interface VideoCallWindowProps {
  callId: string;
  recipientName: string;
  callType: 'video' | 'voice';
}

/**
 * VideoCallWindow Component
 *
 * Main video call interface with local/remote video streams and controls
 */
export function VideoCallWindow({ callId, recipientName, callType }: VideoCallWindowProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const { call, audioEnabled, videoEnabled, toggleAudio, toggleVideo, endCall } =
    useCall(callId);
  const { localStream, remoteStreams } = useWebRTC({
    enableAudio: true,
    enableVideo: callType === 'video',
  });

  // Set local stream to video element
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Set remote stream to video element
  useEffect(() => {
    if (remoteVideoRef.current && remoteStreams.length > 0) {
      const [, remoteStream] = remoteStreams[0];
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStreams]);

  const handleEndCall = async () => {
    await endCall(callId);
  };

  const handleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        setIsScreenSharing(false);
        return;
      }

      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: false,
      });

      setIsScreenSharing(true);
      // In a real implementation, replace video track with screen track
      // This is simplified for demonstration
    } catch (err) {
      console.error('Failed to share screen:', err);
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 w-32 h-24 bg-gray-900 rounded-lg border-2 border-blue-600 hover:border-blue-700 cursor-pointer shadow-lg z-40"
      >
        <div className="w-full h-full flex items-center justify-center text-white text-xs text-center">
          <span>Call with {recipientName}</span>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-white font-semibold">{recipientName}</h2>
          <p className="text-gray-400 text-sm">
            {call?.status === 'active' ? 'Connected' : 'Connecting...'}
          </p>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative bg-gray-950 overflow-hidden">
        {/* Remote Video */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Local Video (Picture in Picture) */}
        <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-700 shadow-lg">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!videoEnabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            </div>
          )}
        </div>

        {/* Connection Quality Indicator */}
        {call?.metrics && (
          <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-75 text-white px-3 py-2 rounded text-xs">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  call.metrics.quality === 'high'
                    ? 'bg-green-500'
                    : call.metrics.quality === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
              />
              <span className="capitalize">{call.metrics.quality || 'N/A'}</span>
              <span className="text-gray-400">
                {call.metrics.bitrate ? `${Math.round(call.metrics.bitrate / 1000)}kbps` : 'N/A'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4 flex items-center justify-center gap-4">
        {/* Microphone Toggle */}
        <button
          onClick={() => toggleAudio(callId, !audioEnabled)}
          className={`p-4 rounded-full transition-all ${
            audioEnabled
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={audioEnabled ? 'Mute' : 'Unmute'}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            {audioEnabled ? (
              <path d="M10 2a4 4 0 00-4 4v6a4 4 0 008 0V6a4 4 0 00-4-4z" />
            ) : (
              <path d="M10 2a4 4 0 00-4 4v6a4 4 0 008 0V6a4 4 0 00-4-4zm-8 8a1 1 0 011-1h.01a1 1 0 110 2H3a1 1 0 01-1-1z" />
            )}
          </svg>
        </button>

        {/* Video Toggle (only for video calls) */}
        {callType === 'video' && (
          <button
            onClick={() => toggleVideo(callId, !videoEnabled)}
            className={`p-4 rounded-full transition-all ${
              videoEnabled
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={videoEnabled ? 'Stop video' : 'Start video'}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              {videoEnabled ? (
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              ) : (
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6z" />
              )}
            </svg>
          </button>
        )}

        {/* Screen Share */}
        <button
          onClick={handleScreenShare}
          className={`p-4 rounded-full transition-all ${
            isScreenSharing
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
          title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
          </svg>
        </button>

        {/* End Call */}
        <button
          onClick={handleEndCall}
          className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all"
          title="End call"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
