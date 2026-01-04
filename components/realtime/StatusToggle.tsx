'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { JobStatus } from '@/lib/supabase/types'

interface StatusToggleProps {
  currentStatus: JobStatus
  jobId: string
  onStatusChange: (jobId: string, status: JobStatus) => Promise<boolean>
  disabled?: boolean
  className?: string
}

const statusFlow: Record<JobStatus, JobStatus | null> = {
  pending: 'accepted',
  accepted: 'en_route',
  en_route: 'on_site',
  on_site: 'in_progress',
  in_progress: 'completed',
  completed: null,
  cancelled: null,
}

const statusLabels: Record<JobStatus, string> = {
  pending: 'Accept Job',
  accepted: 'Start Route',
  en_route: 'Arrived',
  on_site: 'Start Work',
  in_progress: 'Complete',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

const statusColors: Record<JobStatus, string> = {
  pending: 'bg-blue-500 hover:bg-blue-600',
  accepted: 'bg-teal-500 hover:bg-teal-600',
  en_route: 'bg-amber-500 hover:bg-amber-600',
  on_site: 'bg-purple-500 hover:bg-purple-600',
  in_progress: 'bg-green-500 hover:bg-green-600',
  completed: 'bg-gray-500',
  cancelled: 'bg-red-500',
}

export function StatusToggle({
  currentStatus,
  jobId,
  onStatusChange,
  disabled = false,
  className,
}: StatusToggleProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const nextStatus = statusFlow[currentStatus]
  const canAdvance = nextStatus !== null && !disabled

  const handleClick = useCallback(async () => {
    if (!canAdvance || !nextStatus) return

    setIsUpdating(true)
    try {
      await onStatusChange(jobId, nextStatus)
    } finally {
      setIsUpdating(false)
    }
  }, [canAdvance, nextStatus, jobId, onStatusChange])

  if (!canAdvance) {
    return (
      <Button
        variant="outline"
        disabled
        className={cn('min-w-[120px]', className)}
      >
        {statusLabels[currentStatus]}
      </Button>
    )
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isUpdating || disabled}
      className={cn(
        'min-w-[120px] text-white',
        statusColors[currentStatus],
        className
      )}
    >
      {isUpdating ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Updating...
        </span>
      ) : (
        statusLabels[currentStatus]
      )}
    </Button>
  )
}
