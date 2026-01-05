'use client'

import { useState, useRef, useEffect } from 'react'
import { FeatureGate } from './FeatureGate'
import { useJobCall, type JobCall } from '@/hooks/useJobCall'
import type { CallType, CallInitiatedEvent } from '@/lib/supabase/types'

interface JobCallButtonProps {
  jobId: string
  recipientName: string
  recipientAvatar?: string
  onCallStateChange?: (isInCall: boolean) => void
}

export function JobCallButton({
  jobId,
  recipientName,
  recipientAvatar,
  onCallStateChange,
}: JobCallButtonProps) {
  return (
    <FeatureGate
      jobId={jobId}
      requiredTier="ENTERPRISE"
      feature="videoCalls"
      showBetaBadge
    >
      <JobCallButtonInner
        jobId={jobId}
        recipientName={recipientName}
        recipientAvatar={recipientAvatar}
        onCallStateChange={onCallStateChange}
      />
    </FeatureGate>
  )
}

function JobCallButtonInner({
  jobId,
  recipientName,
  recipientAvatar,
  onCallStateChange,
}: JobCallButtonProps) {
  const [showCallOptions, setShowCallOptions] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const {
    call,
    localStream,
    remoteStream,
    isLoading,
    error,
    audioEnabled,
    videoEnabled,
    initiateCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleAudio,
    toggleVideo,
    handleIncomingCall,
    handleSDPOffer,
    handleSDPAnswer,
    handleICECandidate,
  } = useJobCall({ jobId })

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const [isMinimized, setIsMinimized] = useState(false)

  // Notify parent of call state changes
  useEffect(() => {
    onCallStateChange?.(!!call && call.status === 'active')
  }, [call, onCallStateChange])

  // Set local stream to video element
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])

  // Set remote stream to video element
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCallOptions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInitiateCall = async (type: CallType) => {
    setShowCallOptions(false)
    await initiateCall(type)
  }

  const handleAccept = async () => {
    if (call) {
      await acceptCall(call.id)
    }
  }

  const handleReject = async () => {
    if (call) {
      await rejectCall(call.id, 'User rejected')
    }
  }

  const handleEndCall = async () => {
    await endCall()
  }

  // If there's an active call, show the call window
  if (call && call.status === 'active') {
    if (isMinimized) {
      return (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-20 right-4 w-40 h-28 bg-gray-900 rounded-lg border-2 border-teal-600 hover:border-teal-500 cursor-pointer shadow-lg z-40 overflow-hidden"
        >
          {remoteStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-xs text-center p-2">
              <span>Call with {recipientName}</span>
            </div>
          )}
          <div className="absolute bottom-1 left-1 right-1 text-center">
            <span className="text-xs text-white bg-black/50 px-2 py-0.5 rounded">
              Tap to expand
            </span>
          </div>
        </button>
      )
    }

    return (
      <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold">{recipientName}</h2>
            <p className="text-teal-400 text-sm">Connected</p>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative bg-gray-950 overflow-hidden">
          {/* Remote Video */}
          {call.callType === 'video' ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              {recipientAvatar ? (
                <img
                  src={recipientAvatar}
                  alt={recipientName}
                  className="w-32 h-32 rounded-full border-4 border-gray-700 mb-4"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-teal-600 flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
              )}
              <p className="text-white text-xl font-medium">{recipientName}</p>
              <p className="text-gray-400 text-sm">Voice call in progress</p>
            </div>
          )}

          {/* Local Video (Picture in Picture) */}
          {call.callType === 'video' && (
            <div className="absolute bottom-4 right-4 w-36 h-28 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-700 shadow-lg">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {!videoEnabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/75">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-gray-800 border-t border-gray-700 px-6 py-4 flex items-center justify-center gap-4">
          {/* Microphone Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full transition-all ${
              audioEnabled ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={audioEnabled ? 'Mute' : 'Unmute'}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              {audioEnabled ? (
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              ) : (
                <>
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  <path d="M3 3l14 14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>

          {/* Video Toggle (only for video calls) */}
          {call.callType === 'video' && (
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full transition-all ${
                videoEnabled ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              title={videoEnabled ? 'Stop video' : 'Start video'}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                {videoEnabled ? (
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                ) : (
                  <>
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    <path d="M3 3l14 14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          )}

          {/* End Call */}
          <button
            onClick={handleEndCall}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all"
            title="End call"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  // If there's an incoming call, show the incoming call dialog
  if (call && (call.status === 'initiated' || call.status === 'ringing')) {
    return (
      <IncomingCallDialog
        call={call}
        callerName={recipientName}
        callerAvatar={recipientAvatar}
        onAccept={handleAccept}
        onReject={handleReject}
        isLoading={isLoading}
      />
    )
  }

  // Default: Show call button
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowCallOptions(!showCallOptions)}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        )}
        <span className="font-medium">Call</span>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {showCallOptions && (
        <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10">
          <button
            onClick={() => handleInitiateCall('voice')}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>Voice Call</span>
          </button>
          <button
            onClick={() => handleInitiateCall('video')}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            <span>Video Call</span>
          </button>
        </div>
      )}

      {error && (
        <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  )
}

// Inline incoming call dialog for job calls
interface IncomingCallDialogProps {
  call: JobCall
  callerName: string
  callerAvatar?: string
  onAccept: () => void
  onReject: () => void
  isLoading: boolean
}

function IncomingCallDialog({
  call,
  callerName,
  callerAvatar,
  onAccept,
  onReject,
  isLoading,
}: IncomingCallDialogProps) {
  const [ringCount, setRingCount] = useState(0)

  // Ring animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRingCount((prev) => (prev + 1) % 4)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-teal-600 px-6 py-8 text-center relative overflow-hidden">
          {/* Animated ring effect */}
          <div className="absolute inset-0">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-white/30 rounded-full"
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
                <img
                  src={callerAvatar}
                  alt={callerName}
                  className="w-20 h-20 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-4 border-white bg-purple-500 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Caller Info */}
            <h2 className="text-white text-2xl font-bold mb-2">{callerName}</h2>
            <p className="text-purple-100 text-sm">
              Incoming {call.callType === 'video' ? 'video' : 'voice'} call
            </p>
          </div>
        </div>

        {/* Call Type Badge */}
        <div className="flex justify-center px-6 pt-6">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              call.callType === 'video' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {call.callType === 'video' ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <span className="text-sm font-medium">Video Call</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
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
            onClick={onReject}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Reject</span>
          </button>

          {/* Accept Button */}
          <button
            onClick={onAccept}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            )}
            <span>Accept</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Export type for external use
export type { JobCallButtonProps }
