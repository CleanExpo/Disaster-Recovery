'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

export interface WebRTCConfig {
  iceServers?: RTCIceServer[];
  enableAudio?: boolean;
  enableVideo?: boolean;
}

/**
 * useWebRTC Hook
 *
 * Manage WebRTC peer connections and media streams
 */
export function useWebRTC(config: WebRTCConfig = {}) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());
  const [peerConnections, setPeerConnections] = useState<Map<string, RTCPeerConnection>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());

  const {
    iceServers = [
      { urls: ['stun:stun.l.google.com:19302'] },
      { urls: ['stun:stun1.l.google.com:19302'] },
    ],
    enableAudio = true,
    enableVideo = true,
  } = config;

  // Get local media stream
  const getLocalStream = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: enableAudio,
        video: enableVideo
          ? {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              frameRate: { ideal: 30 },
            }
          : false,
      });

      localStreamRef.current = stream;
      setLocalStream(stream);
      return stream;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get media stream';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [enableAudio, enableVideo]);

  // Stop local stream
  const stopLocalStream = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
    }
  }, []);

  // Create peer connection
  const createPeerConnection = useCallback(
    (peerId: string): RTCPeerConnection | null => {
      try {
        const peerConnection = new RTCPeerConnection({
          iceServers,
        });

        // Add local stream tracks
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStreamRef.current!);
          });
        }

        // Handle remote tracks
        peerConnection.ontrack = (event) => {
          const remoteStream = event.streams[0];
          setRemoteStreams((prev) => new Map(prev).set(peerId, remoteStream));
        };

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            // Send ICE candidate to signaling server
            console.log('ICE candidate:', event.candidate);
          }
        };

        // Handle connection state changes
        peerConnection.onconnectionstatechange = () => {
          console.log('Connection state:', peerConnection.connectionState);
        };

        peerConnectionsRef.current.set(peerId, peerConnection);
        setPeerConnections(new Map(peerConnectionsRef.current));

        return peerConnection;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create peer connection';
        setError(message);
        return null;
      }
    },
    [iceServers]
  );

  // Create offer
  const createOffer = useCallback(async (peerId: string): Promise<RTCSessionDescriptionInit | null> => {
    try {
      let peerConnection = peerConnectionsRef.current.get(peerId);

      if (!peerConnection) {
        peerConnection = createPeerConnection(peerId);
      }

      if (!peerConnection) {
        return null;
      }

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      return offer;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create offer';
      setError(message);
      return null;
    }
  }, [createPeerConnection]);

  // Create answer
  const createAnswer = useCallback(
    async (peerId: string, offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | null> => {
      try {
        let peerConnection = peerConnectionsRef.current.get(peerId);

        if (!peerConnection) {
          peerConnection = createPeerConnection(peerId);
        }

        if (!peerConnection) {
          return null;
        }

        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        return answer;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create answer';
        setError(message);
        return null;
      }
    },
    [createPeerConnection]
  );

  // Add ICE candidate
  const addICECandidate = useCallback(
    async (peerId: string, candidate: RTCIceCandidateInit): Promise<boolean> => {
      try {
        const peerConnection = peerConnectionsRef.current.get(peerId);
        if (!peerConnection) {
          return false;
        }

        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        return true;
      } catch (err) {
        console.error('Failed to add ICE candidate:', err);
        return false;
      }
    },
    []
  );

  // Set remote description
  const setRemoteDescription = useCallback(
    async (peerId: string, description: RTCSessionDescriptionInit): Promise<boolean> => {
      try {
        let peerConnection = peerConnectionsRef.current.get(peerId);

        if (!peerConnection) {
          peerConnection = createPeerConnection(peerId);
        }

        if (!peerConnection) {
          return false;
        }

        await peerConnection.setRemoteDescription(new RTCSessionDescription(description));
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to set remote description';
        setError(message);
        return false;
      }
    },
    [createPeerConnection]
  );

  // Close peer connection
  const closePeerConnection = useCallback((peerId: string) => {
    const peerConnection = peerConnectionsRef.current.get(peerId);
    if (peerConnection) {
      peerConnection.close();
      peerConnectionsRef.current.delete(peerId);
      setPeerConnections(new Map(peerConnectionsRef.current));

      // Remove remote stream
      setRemoteStreams((prev) => {
        const updated = new Map(prev);
        updated.delete(peerId);
        return updated;
      });
    }
  }, []);

  // Close all connections
  const closeAllConnections = useCallback(() => {
    for (const peerConnection of peerConnectionsRef.current.values()) {
      peerConnection.close();
    }
    peerConnectionsRef.current.clear();
    setPeerConnections(new Map());
    setRemoteStreams(new Map());
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLocalStream();
      closeAllConnections();
    };
  }, [stopLocalStream, closeAllConnections]);

  return {
    localStream,
    remoteStreams: Array.from(remoteStreams.entries()),
    isLoading,
    error,
    getLocalStream,
    stopLocalStream,
    createPeerConnection,
    createOffer,
    createAnswer,
    addICECandidate,
    setRemoteDescription,
    closePeerConnection,
    closeAllConnections,
  };
}
