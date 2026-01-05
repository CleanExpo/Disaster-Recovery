// Database types for Supabase
// These will be auto-generated once schema is pushed
// For now, using placeholder types

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Placeholder - will be replaced with generated types
      [key: string]: {
        Row: Record<string, unknown>
        Insert: Record<string, unknown>
        Update: Record<string, unknown>
      }
    }
    Views: {
      [key: string]: {
        Row: Record<string, unknown>
      }
    }
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>
        Returns: unknown
      }
    }
    Enums: {
      [key: string]: string
    }
  }
}

// Real-time event types
export type RealtimeJobEventType =
  | 'NEW_JOB'
  | 'STATUS_CHANGED'
  | 'JOB_REASSIGNED'
  | 'JOB_CANCELLED'
  | 'LOCATION_UPDATE'
  | 'ETA_UPDATE'
  | 'MESSAGE_SENT'
  | 'MESSAGE_READ'
  | 'TYPING_START'
  | 'TYPING_STOP'

export type RealtimeJobEvent = {
  type: RealtimeJobEventType
  jobId: string
  contractorId?: string
  clientId?: string
  status?: JobStatus
  eta?: number
  message?: string
  timestamp: string
}

export type JobStatus =
  | 'pending'
  | 'accepted'
  | 'en_route'
  | 'on_site'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error'

// Phase 3: Location tracking types
export interface ContractorLocation {
  latitude: number
  longitude: number
  accuracy?: number      // GPS accuracy in metres
  heading?: number       // Direction of travel (0-360 degrees)
  speed?: number         // Speed in km/h
}

export interface LocationUpdateEvent extends RealtimeJobEvent {
  type: 'LOCATION_UPDATE'
  location: ContractorLocation
}

export interface ETAUpdateEvent extends RealtimeJobEvent {
  type: 'ETA_UPDATE'
  eta: number              // Minutes until arrival
  distanceKm: number       // Remaining distance
  trafficCondition?: 'clear' | 'moderate' | 'heavy'
  routePolyline?: string   // Encoded polyline for route display
}

// Phase 3: Messaging types
export interface ChatMessage {
  id: string
  jobId: string
  senderId: string
  senderType: 'client' | 'contractor'
  content: string
  isRead: boolean
  createdAt: string
}

export interface MessageSentEvent extends RealtimeJobEvent {
  type: 'MESSAGE_SENT'
  messageId: string
  senderId: string
  senderType: 'client' | 'contractor'
  content: string
}

export interface MessageReadEvent extends RealtimeJobEvent {
  type: 'MESSAGE_READ'
  messageId: string
  readBy: string
}

// Phase 9: Typing indicator events
export interface TypingStartEvent extends RealtimeJobEvent {
  type: 'TYPING_START'
  senderId: string
  senderType: 'client' | 'contractor'
}

export interface TypingStopEvent extends RealtimeJobEvent {
  type: 'TYPING_STOP'
  senderId: string
  senderType: 'client' | 'contractor'
}

// Tier types
export type RealtimeTier = 'BASIC' | 'PRO' | 'ENTERPRISE'

export interface TierAccess {
  tier: RealtimeTier | null
  hasLiveEta: boolean
  hasMessaging: boolean
  hasGpsTracking: boolean
  isBetaAccess?: boolean
}
