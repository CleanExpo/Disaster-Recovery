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
export type RealtimeJobEvent = {
  type: 'NEW_JOB' | 'STATUS_CHANGED' | 'JOB_REASSIGNED' | 'JOB_CANCELLED'
  jobId: string
  contractorId?: string
  clientId?: string
  status: JobStatus
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
