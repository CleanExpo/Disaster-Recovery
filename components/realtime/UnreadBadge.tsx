'use client'

import { cn } from '@/lib/utils'

interface UnreadBadgeProps {
  count: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
}

export function UnreadBadge({
  count,
  className,
  size = 'md',
  pulse = false,
}: UnreadBadgeProps) {
  if (count <= 0) return null

  const displayCount = count > 99 ? '99+' : count.toString()

  const sizeClasses = {
    sm: 'text-xs min-w-4 h-4 px-1',
    md: 'text-xs min-w-5 h-5 px-1.5',
    lg: 'text-sm min-w-6 h-6 px-2',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-red-500 text-white font-medium',
        sizeClasses[size],
        pulse && 'animate-pulse',
        className
      )}
    >
      {displayCount}
    </span>
  )
}

interface MessageIconWithBadgeProps {
  unreadCount: number
  className?: string
  iconClassName?: string
}

export function MessageIconWithBadge({
  unreadCount,
  className,
  iconClassName,
}: MessageIconWithBadgeProps) {
  return (
    <div className={cn('relative inline-flex', className)}>
      <svg
        className={cn('w-5 h-5 text-gray-600 dark:text-gray-400', iconClassName)}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      {unreadCount > 0 && (
        <UnreadBadge
          count={unreadCount}
          size="sm"
          className="absolute -top-1.5 -right-1.5"
        />
      )}
    </div>
  )
}
