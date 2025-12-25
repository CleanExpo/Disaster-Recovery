'use client';

import { useState } from 'react';
import { useCall } from '@/hooks/useCall';

interface CallControlsProps {
  callId: string;
  callType: 'video' | 'voice';
  compact?: boolean;
}

/**
 * CallControls Component
 *
 * Reusable call control buttons for audio/video/screen sharing/recording
 */
export function CallControls({ callId, callType, compact = false }: CallControlsProps) {
  const { audioEnabled, videoEnabled, toggleAudio, toggleVideo, endCall } =
    useCall(callId);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

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
    } catch (err) {
      console.error('Failed to share screen:', err);
      setIsScreenSharing(false);
    }
  };

  const handleRecording = async () => {
    try {
      if (isRecording) {
        setIsRecording(false);
        // Stop recording
        return;
      }

      setIsRecording(true);
      // Start recording
    } catch (err) {
      console.error('Failed to start recording:', err);
      setIsRecording(false);
    }
  };

  const handleEndCall = async () => {
    await endCall(callId);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleAudio(callId, !audioEnabled)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          title={audioEnabled ? 'Mute' : 'Unmute'}
        >
          <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
            {audioEnabled ? (
              <path d="M10 2a4 4 0 00-4 4v6a4 4 0 008 0V6a4 4 0 00-4-4z" />
            ) : (
              <path d="M10 2a4 4 0 00-4 4v6a4 4 0 008 0V6a4 4 0 00-4-4zm-8 8a1 1 0 011-1h.01a1 1 0 110 2H3a1 1 0 01-1-1z" />
            )}
          </svg>
        </button>

        {callType === 'video' && (
          <button
            onClick={() => toggleVideo(callId, !videoEnabled)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            title={videoEnabled ? 'Stop video' : 'Start video'}
          >
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              {videoEnabled ? (
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              ) : (
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6z" />
              )}
            </svg>
          </button>
        )}

        <button
          onClick={handleEndCall}
          className="p-2 rounded-full bg-red-200 hover:bg-red-300 transition-colors"
          title="End call"
        >
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Microphone */}
      <div className="relative group">
        <button
          onClick={() => toggleAudio(callId, !audioEnabled)}
          className={`p-3 rounded-full transition-all ${
            audioEnabled
              ? 'bg-gray-600 hover:bg-gray-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={audioEnabled ? 'Mute microphone' : 'Unmute microphone'}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            {audioEnabled ? (
              <path d="M10 2a4 4 0 00-4 4v6a4 4 0 008 0V6a4 4 0 00-4-4z" />
            ) : (
              <path d="M10 2a4 4 0 00-4 4v6a4 4 0 008 0V6a4 4 0 00-4-4zm-8 8a1 1 0 011-1h.01a1 1 0 110 2H3a1 1 0 01-1-1z" />
            )}
          </svg>
        </button>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {audioEnabled ? 'Mute' : 'Unmute'}
        </span>
      </div>

      {/* Video (only for video calls) */}
      {callType === 'video' && (
        <div className="relative group">
          <button
            onClick={() => toggleVideo(callId, !videoEnabled)}
            className={`p-3 rounded-full transition-all ${
              videoEnabled
                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={videoEnabled ? 'Stop video' : 'Start video'}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              {videoEnabled ? (
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              ) : (
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6z" />
              )}
            </svg>
          </button>
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {videoEnabled ? 'Stop video' : 'Start video'}
          </span>
        </div>
      )}

      {/* Screen Share */}
      <div className="relative group">
        <button
          onClick={handleScreenShare}
          className={`p-3 rounded-full transition-all ${
            isScreenSharing
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
          title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
          </svg>
        </button>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {isScreenSharing ? 'Stop sharing' : 'Share screen'}
        </span>
      </div>

      {/* Recording */}
      <div className="relative group">
        <button
          onClick={handleRecording}
          className={`p-3 rounded-full transition-all ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
          title={isRecording ? 'Stop recording' : 'Start recording'}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="3" />
          </svg>
        </button>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {isRecording ? 'Stop recording' : 'Start recording'}
        </span>
      </div>

      {/* End Call */}
      <div className="relative group">
        <button
          onClick={handleEndCall}
          className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all"
          title="End call"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6z" />
          </svg>
        </button>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          End call
        </span>
      </div>
    </div>
  );
}
