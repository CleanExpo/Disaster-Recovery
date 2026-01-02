/**
 * DesignOS Priority Card Component
 *
 * CRM incident cards with ALL FOUR priority indicators:
 * 1. Color coding (red, orange, yellow, green)
 * 2. Icon system (fire, clock, circle)
 * 3. Position (auto-sorted to top)
 * 4. Size/prominence (larger cards for critical)
 *
 * Strategic decision: Multi-modal signaling for instant visual scan
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Flame, Clock, Circle, CheckCircle } from 'lucide-react';

type Priority = 'critical' | 'high' | 'medium' | 'low';

const priorityCardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm relative',
  {
    variants: {
      priority: {
        // 1. Color + 4. Size (larger for critical)
        critical: 'border-l-4 border-priority-critical bg-gradient-to-r from-priority-critical-bg to-white min-h-[180px]',
        high: 'border-l-4 border-priority-high bg-gradient-to-r from-priority-high-bg to-white min-h-[168px]',
        medium: 'border-l-4 border-priority-medium bg-white min-h-[156px]',
        low: 'border-l-4 border-priority-low bg-white min-h-[144px] opacity-90',
      },
    },
    defaultVariants: {
      priority: 'medium',
    },
  }
);

// 2. Icon mapping by priority
const priorityIcons = {
  critical: Flame,       // 🔥
  high: Clock,           // ⏰
  medium: Circle,        // ○
  low: CheckCircle,      // ✓
};

// 2. Icon colors
const priorityIconColors = {
  critical: 'text-priority-critical',
  high: 'text-priority-high',
  medium: 'text-priority-medium',
  low: 'text-priority-low',
};

export interface PriorityCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priorityCardVariants> {
  priority: Priority;
  showPriorityIcon?: boolean;
  showPriorityLabel?: boolean;
}

const PriorityCard = React.forwardRef<HTMLDivElement, PriorityCardProps>(
  ({ className, priority = 'medium', showPriorityIcon = true, showPriorityLabel = true, children, ...props }, ref) => {
    const Icon = priorityIcons[priority];
    const iconColorClass = priorityIconColors[priority];

    return (
      <div
        ref={ref}
        className={cn(priorityCardVariants({ priority }), className)}
        data-priority={priority} // For sorting
        {...props}
      >
        {/* Priority indicator badge (top-right) */}
        {(showPriorityIcon || showPriorityLabel) && (
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {showPriorityIcon && <Icon className={cn('h-4 w-4', iconColorClass)} />}
            {showPriorityLabel && (
              <span
                className={cn(
                  'text-xs font-semibold uppercase tracking-wider',
                  priority === 'critical' && 'text-priority-critical-text',
                  priority === 'high' && 'text-priority-high-text',
                  priority === 'medium' && 'text-priority-medium-text',
                  priority === 'low' && 'text-priority-low-text'
                )}
              >
                {priority}
              </span>
            )}
          </div>
        )}

        {/* Card content */}
        {children}
      </div>
    );
  }
);

PriorityCard.displayName = 'PriorityCard';

export { PriorityCard, priorityCardVariants };
