import React from 'react';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  /** Lucide icon to display */
  icon: LucideIcon;
  /** Main heading */
  title: string;
  /** Supporting description */
  description?: string;
  /** Optional action button/link */
  action?: React.ReactNode;
  className?: string;
  /** Icon colour variant — defaults to 'gray' */
  variant?: 'gray' | 'orange' | 'blue' | 'emerald' | 'amber' | 'red';
}

const ICON_STYLES: Record<NonNullable<EmptyStateProps['variant']>, string> = {
  gray: 'bg-gray-100 text-gray-400',
  orange: 'bg-orange-100 text-orange-500',
  blue: 'bg-blue-100 text-blue-500',
  emerald: 'bg-emerald-100 text-emerald-500',
  amber: 'bg-amber-100 text-amber-500',
  red: 'bg-red-100 text-red-500',
};

/**
 * DR-753: Consistent empty-state UI component.
 *
 * Usage:
 * ```tsx
 * <EmptyState
 *   icon={Inbox}
 *   title="No leads yet"
 *   description="New leads will appear here once submitted."
 *   action={<Link href="/admin/leads/new">Create lead</Link>}
 * />
 * ```
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  variant = 'gray',
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className
      )}
      role="status"
      aria-label={title}
    >
      <div
        className={cn(
          'mb-4 flex h-16 w-16 items-center justify-center rounded-2xl',
          ICON_STYLES[variant]
        )}
      >
        <Icon className="h-8 w-8" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/**
 * Compact variant — suitable inside cards or smaller containers.
 */
export function EmptyStateCompact({
  icon: Icon,
  title,
  description,
  action,
  className,
  variant = 'gray',
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-10 px-4 text-center',
        className
      )}
      role="status"
      aria-label={title}
    >
      <div
        className={cn(
          'mb-3 flex h-12 w-12 items-center justify-center rounded-xl',
          ICON_STYLES[variant]
        )}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-gray-700">{title}</p>
      {description && (
        <p className="mt-0.5 text-xs text-gray-400">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
