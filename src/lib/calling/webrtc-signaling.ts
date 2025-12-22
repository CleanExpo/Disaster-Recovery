'use server';

/**
 * WebRTC Signaling Service
 *
 * Handles WebRTC peer-to-peer connection setup
 * - SDP offer/answer exchange
 * - ICE candidate gathering
 * - Peer connection management
 * - Connection state tracking
 */

export interface SDPOffer {
  type: 'offer';
  sdp: string;
}

export interface SDPAnswer {
  type: 'answer';
  sdp: string;
}

export interface ICECandidate {
  candidate: string;
  sdpMLineIndex: number;
  sdpMid: string;
}

export interface PeerConnection {
  callId: string;
  peerId: string;
  state: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
  localDescription?: SDPOffer | SDPAnswer;
  remoteDescription?: SDPOffer | SDPAnswer;
  iceCandidates: ICECandidate[];
  createdAt: Date;
}

class WebRTCSignalingService {
  private peerConnections = new Map<string, PeerConnection>();
  private pendingOffers = new Map<string, SDPOffer>();
  private pendingAnswers = new Map<string, SDPAnswer>();
  private iceCandidatesQueue = new Map<string, ICECandidate[]>();

  /**
   * Create peer connection
   */
  createPeerConnection(callId: string, peerId: string): PeerConnection {
    const connectionId = `${callId}_${peerId}`;

    const peerConnection: PeerConnection = {
      callId,
      peerId,
      state: 'new',
      iceCandidates: [],
      createdAt: new Date(),
    };

    this.peerConnections.set(connectionId, peerConnection);
    this.iceCandidatesQueue.set(connectionId, []);

    return peerConnection;
  }

  /**
   * Set local SDP offer
   */
  async setLocalOffer(callId: string, peerId: string, sdp: string): Promise<SDPOffer> {
    try {
      const connectionId = `${callId}_${peerId}`;
      const offer: SDPOffer = {
        type: 'offer',
        sdp,
      };

      const peerConnection = this.peerConnections.get(connectionId);
      if (peerConnection) {
        peerConnection.localDescription = offer;
        peerConnection.state = 'connecting';
      }

      this.pendingOffers.set(connectionId, offer);

      return offer;
    } catch (error) {
      console.error('Error setting local offer:', error);
      throw error;
    }
  }

  /**
   * Set remote SDP answer
   */
  async setRemoteAnswer(callId: string, peerId: string, sdp: string): Promise<SDPAnswer> {
    try {
      const connectionId = `${callId}_${peerId}`;
      const answer: SDPAnswer = {
        type: 'answer',
        sdp,
      };

      const peerConnection = this.peerConnections.get(connectionId);
      if (peerConnection) {
        peerConnection.remoteDescription = answer;
        peerConnection.state = 'connected';
      }

      this.pendingAnswers.set(connectionId, answer);

      return answer;
    } catch (error) {
      console.error('Error setting remote answer:', error);
      throw error;
    }
  }

  /**
   * Add ICE candidate
   */
  async addICECandidate(
    callId: string,
    peerId: string,
    candidate: ICECandidate
  ): Promise<boolean> {
    try {
      const connectionId = `${callId}_${peerId}`;

      const peerConnection = this.peerConnections.get(connectionId);
      if (peerConnection) {
        peerConnection.iceCandidates.push(candidate);
      }

      const queue = this.iceCandidatesQueue.get(connectionId);
      if (queue) {
        queue.push(candidate);
      }

      return true;
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
      return false;
    }
  }

  /**
   * Get pending ICE candidates
   */
  getPendingICECandidates(callId: string, peerId: string): ICECandidate[] {
    const connectionId = `${callId}_${peerId}`;
    const queue = this.iceCandidatesQueue.get(connectionId) || [];

    // Clear queue after retrieval
    this.iceCandidatesQueue.set(connectionId, []);

    return queue;
  }

  /**
   * Get pending offer
   */
  getPendingOffer(callId: string, peerId: string): SDPOffer | null {
    const connectionId = `${callId}_${peerId}`;
    const offer = this.pendingOffers.get(connectionId);

    if (offer) {
      this.pendingOffers.delete(connectionId);
    }

    return offer || null;
  }

  /**
   * Get pending answer
   */
  getPendingAnswer(callId: string, peerId: string): SDPAnswer | null {
    const connectionId = `${callId}_${peerId}`;
    const answer = this.pendingAnswers.get(connectionId);

    if (answer) {
      this.pendingAnswers.delete(connectionId);
    }

    return answer || null;
  }

  /**
   * Close peer connection
   */
  closePeerConnection(callId: string, peerId: string): void {
    try {
      const connectionId = `${callId}_${peerId}`;

      const peerConnection = this.peerConnections.get(connectionId);
      if (peerConnection) {
        peerConnection.state = 'closed';
      }

      this.peerConnections.delete(connectionId);
      this.iceCandidatesQueue.delete(connectionId);
      this.pendingOffers.delete(connectionId);
      this.pendingAnswers.delete(connectionId);
    } catch (error) {
      console.error('Error closing peer connection:', error);
    }
  }

  /**
   * Get peer connection status
   */
  getPeerConnection(callId: string, peerId: string): PeerConnection | null {
    const connectionId = `${callId}_${peerId}`;
    return this.peerConnections.get(connectionId) || null;
  }

  /**
   * Get all peer connections for call
   */
  getCallPeerConnections(callId: string): PeerConnection[] {
    const connections: PeerConnection[] = [];

    for (const peerConnection of this.peerConnections.values()) {
      if (peerConnection.callId === callId) {
        connections.push(peerConnection);
      }
    }

    return connections;
  }

  /**
   * Update connection state
   */
  updateConnectionState(
    callId: string,
    peerId: string,
    state: PeerConnection['state']
  ): void {
    const connectionId = `${callId}_${peerId}`;
    const peerConnection = this.peerConnections.get(connectionId);

    if (peerConnection) {
      peerConnection.state = state;
    }
  }

  /**
   * Get signaling statistics
   */
  getSignalingStats() {
    let totalConnections = 0;
    let connectedConnections = 0;
    let failedConnections = 0;

    for (const connection of this.peerConnections.values()) {
      totalConnections++;
      if (connection.state === 'connected') {
        connectedConnections++;
      }
      if (connection.state === 'failed') {
        failedConnections++;
      }
    }

    return {
      totalConnections,
      connectedConnections,
      failedConnections,
      pendingOffersCount: this.pendingOffers.size,
      pendingAnswersCount: this.pendingAnswers.size,
    };
  }
}

// Export singleton instance
export const webrtcSignaling = new WebRTCSignalingService();
