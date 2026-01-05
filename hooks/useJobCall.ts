'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import type {
  CallType,
  CallInitiatedEvent,
  CallAcceptedEvent,
  CallRejectedEvent,
  CallEndedEvent,
  SDPOfferEvent,
  SDPAnswerEvent,
  ICECandidateEvent,
} from '@/lib/supabase/types'

export interface JobCall {
  id: string
  jobId: string
  initiatorId: string
  initiatorType: 'client' | 'contractor'
  receiverId: string
  receiverType: 'client' | 'contractor'
  callType: CallType
  status: 'initiated' | 'ringing' | 'active' | 'ended' | 'missed' | 'rejected'
  startedAt?: string
  endedAt?: string
  duration?: number
}

interface UseJobCallOptions {
  jobId: string
  onCallInitiated?: (event: CallInitiatedEvent) => void
  onCallAccepted?: (event: CallAcceptedEvent) => void
  onCallRejected?: (event: CallRejectedEvent) => void
  onCallEnded?: (event: CallEndedEvent) => void
  onSDPOffer?: (event: SDPOfferEvent) => void
  onSDPAnswer?: (event: SDPAnswerEvent) => void
  onICECandidate?: (event: ICECandidateEvent) => void
}

interface UseJobCallReturn {
  call: JobCall | null
  localStream: MediaStream | null
  remoteStream: MediaStream | null
  isLoading: boolean
  error: string | null
  audioEnabled: boolean
  videoEnabled: boolean
  initiateCall: (callType: CallType) => Promise<boolean>
  acceptCall: (callId: string) => Promise<boolean>
  rejectCall: (callId: string, reason?: string) => Promise<boolean>
  endCall: () => Promise<boolean>
  toggleAudio: () => void
  toggleVideo: () => void
  handleIncomingCall: (event: CallInitiatedEvent) => void
  handleSDPOffer: (event: SDPOfferEvent) => Promise<void>
  handleSDPAnswer: (event: SDPAnswerEvent) => Promise<void>
  handleICECandidate: (event: ICECandidateEvent) => Promise<void>
}

const ICE_SERVERS: RTCIceServer[] = [
  { urls: ['stun:stun.l.google.com:19302'] },
  { urls: ['stun:stun1.l.google.com:19302'] },
]

export function useJobCall(options: UseJobCallOptions): UseJobCallReturn {
  const { jobId, onCallInitiated, onCallAccepted, onCallRejected, onCallEnded, onSDPOffer, onSDPAnswer, onICECandidate } = options
  const { data: session } = useSession()

  const [call, setCall] = useState<JobCall | null>(null)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([])

  // Get local media stream
  const getLocalStream = useCallback(async (callType: CallType): Promise<MediaStream | null> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: callType === 'video' ? {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        } : false,
      })
      localStreamRef.current = stream
      setLocalStream(stream)
      setVideoEnabled(callType === 'video')
      return stream
    } catch (err) {
      console.error('Failed to get media stream:', err)
      setError('Failed to access camera/microphone')
      return null
    }
  }, [])

  // Stop local stream
  const stopLocalStream = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop())
      localStreamRef.current = null
      setLocalStream(null)
    }
  }, [])

  // Create peer connection
  const createPeerConnection = useCallback((peerId: string): RTCPeerConnection | null => {
    try {
      const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS })

      // Add local tracks
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => {
          pc.addTrack(track, localStreamRef.current!)
        })
      }

      // Handle remote tracks
      pc.ontrack = (event) => {
        setRemoteStream(event.streams[0])
      }

      // Handle ICE candidates
      pc.onicecandidate = async (event) => {
        if (event.candidate && call) {
          // Send ICE candidate to peer via signaling API
          try {
            await fetch(`/api/realtime/jobs/${jobId}/call/signal`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callId: call.id,
                type: 'ice-candidate',
                candidate: event.candidate.toJSON(),
              }),
            })
          } catch (err) {
            console.error('Failed to send ICE candidate:', err)
          }
        }
      }

      // Handle connection state changes
      pc.onconnectionstatechange = () => {
        console.log('Connection state:', pc.connectionState)
        if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
          // Handle disconnection
        }
      }

      peerConnectionRef.current = pc
      return pc
    } catch (err) {
      console.error('Failed to create peer connection:', err)
      setError('Failed to create connection')
      return null
    }
  }, [call, jobId])

  // Send SDP via signaling API
  const sendSignal = useCallback(async (
    callId: string,
    type: 'offer' | 'answer',
    sdp: RTCSessionDescriptionInit
  ): Promise<boolean> => {
    try {
      const response = await fetch(`/api/realtime/jobs/${jobId}/call/signal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId, type, sdp }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send signal')
      }

      return true
    } catch (err) {
      console.error('Failed to send signal:', err)
      return false
    }
  }, [jobId])

  // Initiate a call
  const initiateCall = useCallback(async (callType: CallType): Promise<boolean> => {
    if (!session?.user?.id) {
      setError('Not authenticated')
      return false
    }

    setIsLoading(true)
    setError(null)

    try {
      // Get local stream first
      const stream = await getLocalStream(callType)
      if (!stream) {
        setIsLoading(false)
        return false
      }

      // Create call via API
      const response = await fetch(`/api/realtime/jobs/${jobId}/call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callType }),
      })

      if (!response.ok) {
        const data = await response.json()
        if (data.upgradeRequired) {
          setError('Video/voice calls require ENTERPRISE tier')
        } else {
          setError(data.error || 'Failed to initiate call')
        }
        stopLocalStream()
        setIsLoading(false)
        return false
      }

      const data = await response.json()
      setCall(data.call)

      // Create peer connection and SDP offer
      const peerId = data.call.receiverId
      const pc = createPeerConnection(peerId)
      if (!pc) {
        stopLocalStream()
        setIsLoading(false)
        return false
      }

      // Create and send offer
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      await sendSignal(data.call.id, 'offer', offer)

      setIsLoading(false)
      return true
    } catch (err) {
      console.error('Failed to initiate call:', err)
      setError('Failed to initiate call')
      stopLocalStream()
      setIsLoading(false)
      return false
    }
  }, [session?.user?.id, jobId, getLocalStream, stopLocalStream, createPeerConnection, sendSignal])

  // Accept a call
  const acceptCall = useCallback(async (callId: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      // Accept via API
      const response = await fetch(`/api/realtime/jobs/${jobId}/call`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId, action: 'accept' }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to accept call')
        setIsLoading(false)
        return false
      }

      const data = await response.json()
      setCall(data.call)

      // Get local stream
      const stream = await getLocalStream(data.call.callType as CallType)
      if (!stream) {
        setIsLoading(false)
        return false
      }

      // Create peer connection (answer will be created when we receive the offer)
      const peerId = data.call.initiatorId
      createPeerConnection(peerId)

      // Process any pending ICE candidates
      for (const candidate of pendingCandidatesRef.current) {
        if (peerConnectionRef.current) {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate))
        }
      }
      pendingCandidatesRef.current = []

      setIsLoading(false)
      return true
    } catch (err) {
      console.error('Failed to accept call:', err)
      setError('Failed to accept call')
      setIsLoading(false)
      return false
    }
  }, [jobId, getLocalStream, createPeerConnection])

  // Reject a call
  const rejectCall = useCallback(async (callId: string, reason?: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/realtime/jobs/${jobId}/call`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId, action: 'reject', reason }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to reject call')
        setIsLoading(false)
        return false
      }

      setCall(null)
      setIsLoading(false)
      return true
    } catch (err) {
      console.error('Failed to reject call:', err)
      setError('Failed to reject call')
      setIsLoading(false)
      return false
    }
  }, [jobId])

  // End call
  const endCall = useCallback(async (): Promise<boolean> => {
    if (!call) return false

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/realtime/jobs/${jobId}/call`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId: call.id, action: 'end' }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to end call')
      }

      // Clean up regardless of API response
      stopLocalStream()
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close()
        peerConnectionRef.current = null
      }
      setRemoteStream(null)
      setCall(null)
      setIsLoading(false)
      return true
    } catch (err) {
      console.error('Failed to end call:', err)
      setError('Failed to end call')
      stopLocalStream()
      setCall(null)
      setIsLoading(false)
      return false
    }
  }, [call, jobId, stopLocalStream])

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setAudioEnabled(audioTrack.enabled)
      }
    }
  }, [])

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setVideoEnabled(videoTrack.enabled)
      }
    }
  }, [])

  // Handle incoming call (from realtime event)
  const handleIncomingCall = useCallback((event: CallInitiatedEvent) => {
    const incomingCall: JobCall = {
      id: event.callId,
      jobId: event.jobId,
      initiatorId: event.senderId,
      initiatorType: event.senderType,
      receiverId: event.receiverId,
      receiverType: event.receiverType,
      callType: event.callType,
      status: 'initiated',
    }
    setCall(incomingCall)
    onCallInitiated?.(event)
  }, [onCallInitiated])

  // Handle SDP offer (from realtime event)
  const handleSDPOffer = useCallback(async (event: SDPOfferEvent) => {
    onSDPOffer?.(event)

    if (!peerConnectionRef.current) {
      // Create peer connection if not exists
      createPeerConnection(event.senderId)
    }

    const pc = peerConnectionRef.current
    if (!pc) return

    try {
      await pc.setRemoteDescription(new RTCSessionDescription(event.sdp))

      // Create and send answer
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)

      if (call) {
        await sendSignal(call.id, 'answer', answer)
      }
    } catch (err) {
      console.error('Failed to handle SDP offer:', err)
    }
  }, [call, createPeerConnection, sendSignal, onSDPOffer])

  // Handle SDP answer (from realtime event)
  const handleSDPAnswer = useCallback(async (event: SDPAnswerEvent) => {
    onSDPAnswer?.(event)

    const pc = peerConnectionRef.current
    if (!pc) return

    try {
      await pc.setRemoteDescription(new RTCSessionDescription(event.sdp))
    } catch (err) {
      console.error('Failed to handle SDP answer:', err)
    }
  }, [onSDPAnswer])

  // Handle ICE candidate (from realtime event)
  const handleICECandidate = useCallback(async (event: ICECandidateEvent) => {
    onICECandidate?.(event)

    const pc = peerConnectionRef.current
    if (!pc) {
      // Queue candidate if peer connection not ready
      pendingCandidatesRef.current.push(event.candidate)
      return
    }

    try {
      await pc.addIceCandidate(new RTCIceCandidate(event.candidate))
    } catch (err) {
      console.error('Failed to add ICE candidate:', err)
    }
  }, [onICECandidate])

  // Handle call accepted event
  useEffect(() => {
    if (onCallAccepted && call?.status === 'active') {
      // Call became active (was accepted)
    }
  }, [call?.status, onCallAccepted])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLocalStream()
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close()
        peerConnectionRef.current = null
      }
    }
  }, [stopLocalStream])

  return {
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
  }
}
