# Video/Voice Calling System Documentation

## Overview

The Disaster Recovery - NRPG platform includes a comprehensive video and voice calling system with real-time communication, advanced features, and performance optimization. This documentation covers the complete calling infrastructure.

## Architecture

### System Stack

```
┌─────────────────────────────────────────────────────┐
│                  Calling UI Components                │
│  VideoCallWindow | IncomingCallDialog | CallControls │
└─────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────┐
│                    React Hooks Layer                 │
│  useCall | useWebRTC | useCallNotifications          │
│  useCallAnalytics | useBandwidthOptimization         │
└─────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────┐
│                  API Routes & WebSocket              │
│  /api/calls/* | Socket.io | Signaling              │
└─────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────┐
│              Service Layer (Backend)                 │
│  CallService | WebRTC-Signaling | MediaStreamMgr    │
│  CallRecording | CallAnalytics | BandwidthManager   │
└─────────────────────────────────────────────────────┘
```

## Core Services

### CallService (`src/lib/calling/call-service.ts`)

Manages the complete call lifecycle.

**Key Methods:**
```typescript
initiateCall(initiatorId, recipientId, type, roomId): Promise<Call>
acceptCall(callId, userId): Promise<Call>
rejectCall(callId): Promise<Call>
endCall(callId): Promise<Call>
markCallAsMissed(callId): Promise<Call>
toggleAudio(callId, userId, enabled): Promise<boolean>
toggleVideo(callId, userId, enabled): Promise<boolean>
updateConnectionQuality(callId, userId, quality): Promise<boolean>
getCall(callId): Call | null
getCallParticipants(callId): CallParticipant[]
getUserActiveCalls(userId): Call[]
getCallHistory(userId, limit): Promise<Call[]>
getMissedCalls(userId): Promise<Call[]>
```

**Call States:**
- `initiated`: Call created, awaiting response
- `ringing`: Recipient notification sent
- `accepted`: Call accepted, media negotiation
- `active`: Call in progress
- `ended`: Call completed normally
- `rejected`: Call declined by recipient
- `missed`: Call not answered

### WebRTC Signaling (`src/lib/calling/webrtc-signaling.ts`)

Handles peer-to-peer connection establishment.

**Key Methods:**
```typescript
createPeerConnection(callId, peerId): PeerConnection
setLocalOffer(callId, peerId, sdp): Promise<SDPOffer>
setRemoteAnswer(callId, peerId, sdp): Promise<SDPAnswer>
addICECandidate(callId, peerId, candidate): Promise<boolean>
getPendingICECandidates(callId, peerId): ICECandidate[]
getPendingOffer(callId, peerId): SDPOffer | null
getPendingAnswer(callId, peerId): SDPAnswer | null
closePeerConnection(callId, peerId): void
```

**Process Flow:**
1. Initiator creates local offer
2. Offer sent to recipient via signaling server
3. Recipient creates local answer
4. Answer sent back to initiator
5. ICE candidates exchanged for connection path discovery
6. Peer connection established

### Media Stream Manager (`src/lib/calling/media-stream-manager.ts`)

Manages audio/video streams and quality profiles.

**Quality Profiles:**
- **HD**: 1280x720 @ 30fps, high bitrate
- **High**: 960x540 @ 30fps, good bitrate
- **Medium**: 640x480 @ 24fps, moderate bitrate
- **Low**: 320x240 @ 15fps, minimal bitrate

**Key Methods:**
```typescript
getConstraints(quality): StreamConstraints
registerStream(streamId, userId, quality): MediaStreamInfo
updateStreamQuality(streamId, quality): boolean
getMediaDevices(): Promise<{audioInputs, audioOutputs, videoInputs}>
selectDevice(deviceId, kind): StreamConstraints
estimateBandwidthUsage(): number
```

### Call Recording (`src/lib/calling/call-recording.ts`)

Records and manages call media.

**Formats:** MP4, WebM, WAV

**Key Methods:**
```typescript
startRecording(callId, participantIds, format, options): Promise<CallRecording>
stopRecording(recordingId, fileUrl, fileSize): Promise<CallRecording>
pauseRecording(recordingId): Promise<boolean>
resumeRecording(recordingId): Promise<boolean>
estimateFileSize(duration, format, videoQuality): number
```

**Bitrate Calculation:**
- Video: 500-5000 kbps (based on quality)
- Audio: 32-128 kbps (based on codec)
- Total file size estimates per minute

### Call Analytics (`src/lib/calling/call-analytics.ts`)

Tracks performance metrics and statistics.

**Metrics Tracked:**
- Call duration and frequency
- Quality metrics (bitrate, packet loss, latency, jitter)
- Call type distribution (video vs voice)
- User call patterns
- Most frequent contacts
- Daily statistics

**Key Methods:**
```typescript
recordCallMetrics(metrics): void
getUserStats(userId): UserCallStats
getDailyStats(date): DailyCallStats
getAnalyticsSummary(userId, days): AnalyticsSummary
exportMetrics(userId, format): string // JSON or CSV
```

### Bandwidth Manager (`src/lib/calling/bandwidth-manager.ts`)

Monitors and optimizes bandwidth usage.

**Quality Presets:**
- **Low**: 300-750 kbps, 320x240 @ 15fps
- **Medium**: 800-2500 kbps, 640x480 @ 24fps
- **High**: 2000-5000 kbps, 1280x720 @ 30fps
- **Auto**: Adaptive quality adjustment

**Evaluation Criteria:**
- Packet loss: <5% (fair), <1% (excellent)
- Latency (RTT): <300ms (fair), <100ms (excellent)
- Jitter: <50ms (fair), <20ms (excellent)
- Available bandwidth: automatic quality scaling

**Quality Score Calculation:**
```
Base: 100 points
Deduction: Packet loss (2 pts per %), Latency (0.1 pt per ms over 150), Jitter (0.5 pt per ms over 30)
Result: 0-100 score
```

### Codec Manager (`src/lib/calling/codec-manager.ts`)

Selects optimal codecs based on network conditions.

**Video Codecs:**
- **VP8**: 1000 kbps, medium quality, medium CPU
- **VP9**: 800 kbps, high quality, high CPU (more efficient)
- **H.264**: 1200 kbps, high quality, low CPU (hardware optimized)

**Audio Codecs:**
- **Opus**: 30 kbps, high quality, variable bitrate
- **AAC**: 48 kbps, medium quality, fixed bitrate
- **G.711**: 64 kbps, low quality, fixed bitrate (legacy)

## React Hooks

### useCall(callId)

Main call management hook.

```typescript
const {
  call,                    // Current call object
  participants,            // Call participants
  audioEnabled,           // Audio state
  videoEnabled,           // Video state
  connectionQuality,      // Connection quality
  error,                  // Error message
  isLoading,             // Loading state
  initiateCall,          // Start call
  acceptCall,            // Accept incoming
  rejectCall,            // Decline call
  endCall,               // End active call
  toggleAudio,           // Toggle microphone
  toggleVideo,           // Toggle camera
  getCallDetails,        // Fetch call info
  stopPolling,           // Stop updates
} = useCall(callId);
```

### useWebRTC(config)

Low-level WebRTC management.

```typescript
const {
  localStream,              // Local media stream
  remoteStreams,            // Remote participant streams
  peerConnections,          // Map of peer connections
  error,                    // Error message
  isLoading,               // Loading state
  getLocalStream,          // Request user media
  stopLocalStream,         // Stop local media
  createPeerConnection,    // Create RTCPeerConnection
  createOffer,            // Generate SDP offer
  createAnswer,           // Generate SDP answer
  addICECandidate,        // Add ICE candidate
  setRemoteDescription,   // Set remote SDP
  closePeerConnection,    // Close specific connection
  closeAllConnections,    // Close all connections
} = useWebRTC(config);
```

### useCallNotifications(options)

Real-time call event notifications.

```typescript
const {
  isConnected,           // WebSocket connection status
  subscribe,            // Subscribe to events
  emit,                // Emit call event
  disconnect,          // Disconnect from server
} = useCallNotifications({ userId, autoConnect: true });

// Subscribe example
subscribe({
  'call:initiated': (notification) => { /* handle */ },
  'call:accepted': (notification) => { /* handle */ },
  'call:ended': (notification) => { /* handle */ },
});
```

### useCallAnalytics(options)

Fetch and manage call statistics.

```typescript
const {
  summary,              // Analytics summary
  dailyStats,          // Daily statistics
  isLoading,          // Loading state
  error,              // Error message
  fetchSummary,       // Fetch summary
  fetchDailyStats,    // Fetch daily stats
  fetchQualityMetrics, // Get quality metrics
  exportAnalytics,    // Export as JSON/CSV
  refresh,            // Refresh all data
} = useCallAnalytics({ userId, days: 30 });
```

### useBandwidthOptimization(options)

Monitor and optimize bandwidth.

```typescript
const {
  currentQuality,        // Current quality preset
  metrics,              // Bandwidth metrics
  status,               // Network status
  canUpgradeVideo,      // Can upgrade to video
  shouldDegradeAudio,   // Should downgrade
  recommendations,      // Optimization tips
  recordMetrics,        // Record metrics
  setQuality,          // Manual quality change
  getQualityProfile,    // Get current profile
  getBandwidthStats,    // Get network stats
  startMonitoring,      // Start metrics polling
  stopMonitoring,       // Stop polling
} = useBandwidthOptimization({ callId, autoOptimize: true });
```

## UI Components

### VideoCallWindow

Full-screen video call interface.

**Props:**
```typescript
interface VideoCallWindowProps {
  callId: string;
  recipientName: string;
  callType: 'video' | 'voice';
}
```

**Features:**
- Local video (PiP corner)
- Remote video (full screen)
- Audio/video toggle buttons
- Screen sharing
- End call button
- Connection quality indicator
- Minimize/maximize

### IncomingCallDialog

Notification for incoming calls.

**Features:**
- Caller info and avatar
- Call type badge (video/voice)
- 30-second auto-reject timer
- Accept/reject buttons
- Animated ringing effect

### CallControls

Reusable call control buttons.

**Props:**
```typescript
interface CallControlsProps {
  callId: string;
  callType: 'video' | 'voice';
  compact?: boolean;
}
```

**Controls:**
- Mute/unmute microphone
- Start/stop video (video calls)
- Share screen
- Record call
- End call

### CallHistory

Call history list with filtering.

**Features:**
- Call filtering (all/incoming/outgoing/missed)
- Duration and status display
- Contact avatars
- Relative timestamps
- Call count badges

### CallAnalyticsDashboard

Comprehensive statistics dashboard.

**Displays:**
- Overall quality score (0-100)
- Call counts (total/incoming/outgoing/missed)
- Call type distribution
- Top contact list
- 7-day trend chart
- Export controls

### NetworkQualityMonitor

Real-time network monitoring.

**Features:**
- Quality level (excellent/good/fair/poor)
- Live metrics display
- Quality adjustment controls
- Network recommendations
- Automatic optimization

## API Endpoints

### Call Management

**POST /api/calls**
- Initiate call
- Body: `{ recipientId, type: 'voice'|'video', roomId? }`

**GET /api/calls**
- Retrieve calls
- Query: `type=active|history|missed`, `limit`, `offset`

**GET /api/calls/[callId]**
- Get call details
- Response: Call object with participants and metrics

**POST /api/calls/[callId]**
- Call actions
- Body: `{ action: 'accept'|'reject'|'end'|'miss' }`

**PATCH /api/calls/[callId]**
- Toggle audio/video or update quality
- Body: `{ audioEnabled?, videoEnabled?, quality? }`

### Signaling

**POST /api/calls/[callId]/signaling**
- WebRTC signaling
- Body: `{ type: 'offer'|'answer'|'ice-candidate', data }`

**GET /api/calls/[callId]/signaling**
- Retrieve pending signals
- Query: `peerId`

### Recording

**POST /api/calls/[callId]/recording**
- Control recording
- Body: `{ action: 'start'|'stop'|'pause'|'resume', format?, options? }`

### Analytics

**GET /api/calls/analytics**
- Get analytics
- Query: `type=summary|daily|quality|export`, `userId`, `days`, `format`

**POST /api/calls/analytics**
- Record metrics
- Body: Call metrics with quality data

## WebSocket Events

### Call Events

```typescript
'call:initiated'          // New incoming call
'call:ringing'           // Call ringing
'call:accepted'          // Call accepted
'call:rejected'          // Call rejected
'call:ended'            // Call ended
'call:missed'           // Call missed
'call:audio-toggled'    // Audio state changed
'call:video-toggled'    // Video state changed
'call:quality-changed'  // Quality adjusted
'call:participant-joined'    // Participant joined
'call:participant-left'      // Participant left
'call:recording-started'     // Recording started
'call:recording-stopped'     // Recording stopped
```

### Notification Format

```typescript
interface CallNotification {
  type: CallEventType;
  callId: string;
  userId: string;
  participantId?: string;
  timestamp: string;
  data?: Record<string, any>;
}
```

## Usage Examples

### Start a Video Call

```typescript
import { useCall } from '@/hooks/useCall';
import { VideoCallWindow } from '@/components/calling/video-call-window';

function VideoCallPage({ recipientId }: { recipientId: string }) {
  const { call, initiateCall } = useCall('');

  const handleStartCall = async () => {
    await initiateCall(recipientId, 'video', undefined);
  };

  if (!call?.id) {
    return <button onClick={handleStartCall}>Start Video Call</button>;
  }

  return (
    <VideoCallWindow
      callId={call.id}
      recipientName={call.participantName}
      callType="video"
    />
  );
}
```

### Monitor Call Quality

```typescript
import { NetworkQualityMonitor } from '@/components/calling/network-quality-monitor';

function CallWithQuality({ callId }: { callId: string }) {
  return (
    <div className="relative">
      <VideoCallWindow callId={callId} ... />
      <div className="absolute top-4 right-4">
        <NetworkQualityMonitor callId={callId} compact />
      </div>
    </div>
  );
}
```

### View Call Analytics

```typescript
import { CallAnalyticsDashboard } from '@/components/calling/call-analytics-dashboard';

function AnalyticsPage({ userId }: { userId: string }) {
  return <CallAnalyticsDashboard userId={userId} days={30} />;
}
```

### Handle Incoming Calls

```typescript
import { CallNotificationManager } from '@/components/calling/call-notification-manager';

function AppLayout() {
  return (
    <div>
      <CallNotificationManager
        userId={currentUserId}
        onIncomingCall={(call) => {
          // Custom handling if needed
          console.log('Incoming call from:', call.data?.callerName);
        }}
      />
      {/* Rest of app */}
    </div>
  );
}
```

## Performance Optimization

### Bandwidth Optimization

The system automatically adjusts quality based on network conditions:

1. **Monitor**: Continuous packet loss, latency, jitter tracking
2. **Evaluate**: Quality score calculation every second
3. **Adjust**: Automatic quality preset changes if conditions change
4. **Notify**: UI updates with recommendations

### Codec Selection

Optimal codecs are selected based on:
- Available bandwidth
- Device capabilities (hardware encoders)
- Network conditions
- User preference

VP8 for low bandwidth, H.264 for low CPU, VP9 for efficiency.

### Recording Optimization

- Bitrate scaled to available bandwidth
- Quality settings prevent excessive file sizes
- Disk space estimation before recording

## Security

### Call Privacy

- End-to-end encryption ready (TweetNaCl.js integration)
- SDP filtering to prevent leak of IP addresses
- TURN server support for NAT traversal

### Authentication

- User verification required for call initiation
- WebSocket authentication via userId
- Token-based access control on API endpoints

## Deployment

### Environment Variables

```env
# WebSocket Configuration
NEXT_PUBLIC_SOCKET_URL=ws://localhost:3001
NEXT_PUBLIC_SOCKET_CORS_ORIGIN=http://localhost:3000

# STUN/TURN Servers
WEBRTC_STUN_SERVER_1=stun:stun.l.google.com:19302
WEBRTC_STUN_SERVER_2=stun:stun1.l.google.com:19302
WEBRTC_TURN_SERVER_URL=turn:turnserver.example.com
WEBRTC_TURN_USERNAME=username
WEBRTC_TURN_PASSWORD=password

# Recording Storage
CALL_RECORDING_STORAGE_PATH=/recordings
CALL_RECORDING_MAX_DURATION=3600000  # 1 hour in ms
CALL_RECORDING_MAX_FILE_SIZE=524288000  # 500MB

# Analytics
CALL_ANALYTICS_RETENTION_DAYS=90
```

## Troubleshooting

### No Call Connection

1. Check WebSocket connection: `GET /api/socket/init`
2. Verify firewall/NAT: Use TURN server
3. Check browser permissions for media devices
4. Review console logs for WebRTC errors

### Poor Call Quality

1. Check network stats in NetworkQualityMonitor
2. Manually reduce quality if auto-adjustment not working
3. Close bandwidth-intensive applications
4. Switch to voice-only if video problematic

### Recording Issues

1. Verify disk space available
2. Check file size estimates before recording
3. Review browser console for MediaRecorder errors
4. Ensure supported format (MP4 may require OS support)

## Future Enhancements

1. **Mesh Conferencing**: Multi-party calls with SFU
2. **Screen Sharing**: Enhanced screen capture with annotations
3. **Call Transcription**: Real-time speech-to-text
4. **Advanced Encryption**: SRTP and end-to-end encryption UI
5. **Call Scheduling**: Calendar integration and reminders
6. **Call Transfer**: Transfer calls between users
7. **Call Recording Playback**: Built-in player with timeline
8. **Advanced Analytics**: ML-based quality predictions

## Support

For issues or questions about the calling system:
1. Check logs in browser console and server logs
2. Review NetworkQualityMonitor recommendations
3. Verify network connectivity and device permissions
4. Open issue on GitHub with reproduction steps
