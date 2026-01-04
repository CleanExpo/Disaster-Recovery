'use client'

import { cn } from '@/lib/utils'
import type { ConnectionStatus } from '@/lib/supabase/types'

interface ConnectionIndicatorProps {
  status: ConnectionStatus
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const statusConfig: Record<ConnectionStatus, { color: string; label: string; pulse: boolean }> = {
  connected: {
    color: 'bg-green-500',
    label: 'Connected',
    pulse: false,
  },
  connecting: {
    color: 'bg-yellow-500',
    label: 'Connecting...',
    pulse: true,
  },
  disconnected: {
    color: 'bg-gray-400',
    label: 'Disconnected',
    pulse: false,
  },
  error: {
    color: 'bg-red-500',
    label: 'Connection Error',
    pulse: true,
  },
}

const sizeConfig = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
}

export function ConnectionIndicator({
  status,
  showLabel = false,
  size = 'md',
  className,
}: ConnectionIndicatorProps) {
  const config = statusConfig[status]

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="relative flex">
        <span
          className={cn(
            'rounded-full',
            sizeConfig[size],
            config.color,
            config.pulse && 'animate-pulse'
          )}
        />
        {config.pulse && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
              config.color
            )}
          />
        )}
      </span>
      {showLabel && (
        <span className="text-sm text-muted-foreground">{config.label}</span>
      )}
    </div>
  )
}
