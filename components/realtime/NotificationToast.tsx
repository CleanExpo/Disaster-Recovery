'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { RealtimeJobEvent } from '@/lib/supabase/types'

interface NotificationToastProps {
  event: RealtimeJobEvent
  onDismiss: () => void
  autoHideDuration?: number
  className?: string
}

const eventConfig: Record<RealtimeJobEvent['type'], {
  icon: string
  title: string
  bgColor: string
  borderColor: string
}> = {
  NEW_JOB: {
    icon: '🆕',
    title: 'New Job Available',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
  },
  STATUS_CHANGED: {
    icon: '📍',
    title: 'Status Update',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  JOB_REASSIGNED: {
    icon: '🔄',
    title: 'Job Reassigned',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  JOB_CANCELLED: {
    icon: '❌',
    title: 'Job Cancelled',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
}

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  en_route: 'En Route',
  on_site: 'On Site',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export function NotificationToast({
  event,
  onDismiss,
  autoHideDuration = 5000,
  className,
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const config = eventConfig[event.type]

  useEffect(() => {
    // Animate in
    requestAnimationFrame(() => setIsVisible(true))

    // Auto dismiss
    const timer = setTimeout(() => {
      handleDismiss()
    }, autoHideDuration)

    return () => clearTimeout(timer)
  }, [autoHideDuration])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => {
      onDismiss()
    }, 300) // Match animation duration
  }

  const getMessage = () => {
    switch (event.type) {
      case 'NEW_JOB':
        return 'A new job is available for you'
      case 'STATUS_CHANGED':
        return `Job status changed to ${statusLabels[event.status] || event.status}`
      case 'JOB_REASSIGNED':
        return event.message || 'This job has been reassigned'
      case 'JOB_CANCELLED':
        return event.message || 'This job has been cancelled'
      default:
        return event.message || 'Job update'
    }
  }

  return (
    <div
      className={cn(
        'fixed right-4 top-4 z-50 w-80 rounded-lg border p-4 shadow-lg transition-all duration-300',
        config.bgColor,
        config.borderColor,
        isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{config.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900">{config.title}</h4>
          <p className="text-sm text-gray-600 mt-0.5">{getMessage()}</p>
          {event.eta && (
            <p className="text-xs text-gray-500 mt-1">ETA: {event.eta} minutes</p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            {new Date(event.timestamp).toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

// Toast container for managing multiple toasts
interface ToastContainerProps {
  events: RealtimeJobEvent[]
  onDismiss: (eventId: string) => void
}

export function ToastContainer({ events, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed right-4 top-4 z-50 space-y-2">
      {events.map((event, index) => (
        <div
          key={`${event.jobId}-${event.timestamp}`}
          style={{ transform: `translateY(${index * 8}px)` }}
        >
          <NotificationToast
            event={event}
            onDismiss={() => onDismiss(`${event.jobId}-${event.timestamp}`)}
          />
        </div>
      ))}
    </div>
  )
}
