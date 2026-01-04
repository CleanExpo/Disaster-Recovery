'use client'

import { cn } from '@/lib/utils'

interface BetaBadgeProps {
  variant?: 'default' | 'small' | 'inline'
  className?: string
}

export function BetaBadge({ variant = 'default', className }: BetaBadgeProps) {
  if (variant === 'small') {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center',
          'bg-orange-100 text-orange-600',
          'text-[10px] font-bold uppercase tracking-wider',
          'px-1.5 py-0.5 rounded',
          className
        )}
      >
        Beta
      </span>
    )
  }

  if (variant === 'inline') {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center',
          'bg-gradient-to-r from-orange-500 to-orange-600',
          'text-white text-[10px] font-bold uppercase tracking-wider',
          'px-2 py-0.5 rounded-full',
          'shadow-sm',
          className
        )}
      >
        Beta
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'bg-gradient-to-r from-orange-500 to-orange-600',
        'text-white text-xs font-bold uppercase tracking-wider',
        'px-3 py-1 rounded-full',
        'shadow-md',
        className
      )}
    >
      Beta Tester
    </span>
  )
}
