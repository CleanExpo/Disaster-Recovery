'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ETADisplayProps {
  etaMinutes: number | null
  lastUpdated?: Date
  showCountdown?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ETADisplay({
  etaMinutes,
  lastUpdated,
  showCountdown = true,
  size = 'md',
  className,
}: ETADisplayProps) {
  const [countdown, setCountdown] = useState<number | null>(null)

  // Calculate countdown based on ETA and last update time
  useEffect(() => {
    if (!etaMinutes || !lastUpdated || !showCountdown) {
      setCountdown(etaMinutes)
      return
    }

    const updateCountdown = () => {
      const elapsed = Math.floor((Date.now() - lastUpdated.getTime()) / 60000)
      const remaining = Math.max(0, etaMinutes - elapsed)
      setCountdown(remaining)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [etaMinutes, lastUpdated, showCountdown])

  if (countdown === null) {
    return (
      <div className={cn('text-muted-foreground', className)}>
        ETA not available
      </div>
    )
  }

  const hours = Math.floor(countdown / 60)
  const minutes = countdown % 60

  const getUrgencyColor = () => {
    if (countdown <= 5) return 'text-green-600 bg-green-50'
    if (countdown <= 15) return 'text-teal-600 bg-teal-50'
    if (countdown <= 30) return 'text-amber-600 bg-amber-50'
    return 'text-gray-600 bg-gray-50'
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  }

  const formatTime = () => {
    if (countdown === 0) return 'Arriving now'
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes} min`
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        sizeClasses[size],
        getUrgencyColor(),
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
      </span>
      <span>ETA: {formatTime()}</span>
    </div>
  )
}
