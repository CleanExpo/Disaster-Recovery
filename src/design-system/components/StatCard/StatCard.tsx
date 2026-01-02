/**
 * DesignOS Stat Card Component
 *
 * NRPG contractor dashboard statistics cards
 * Strategic decision: Show ALL THREE metrics (earnings, completion, rating)
 * Equal prominence for transparency and motivation
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  trend?: string;
  trendDirection?: TrendDirection;
  icon?: LucideIcon;
  iconColor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'red';
  helpText?: string;
  className?: string;
}

const iconColorClasses = {
  emerald: 'text-emerald-500 bg-emerald-50',
  blue: 'text-blue-500 bg-blue-50',
  amber: 'text-amber-500 bg-amber-50',
  purple: 'text-purple-500 bg-purple-50',
  red: 'text-red-500 bg-red-50',
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const trendColors = {
  up: 'text-green-600',
  down: 'text-red-600',
  neutral: 'text-gray-500',
};

export function StatCard({
  label,
  value,
  sublabel,
  trend,
  trendDirection,
  icon: Icon,
  iconColor = 'blue',
  helpText,
  className,
}: StatCardProps) {
  const TrendIcon = trendDirection ? trendIcons[trendDirection] : null;

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-6',
        'hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-start justify-between">
        {/* Label and Value */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {sublabel && <p className="text-sm text-gray-600 mt-1">{sublabel}</p>}

          {/* Trend */}
          {trend && TrendIcon && (
            <div className={cn('flex items-center gap-1 mt-2', trendColors[trendDirection!])}>
              <TrendIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{trend}</span>
            </div>
          )}

          {/* Help text */}
          {helpText && (
            <p className="text-xs text-gray-500 mt-2 border-t border-gray-100 pt-2">{helpText}</p>
          )}
        </div>

        {/* Icon */}
        {Icon && (
          <div className={cn('rounded-full p-3', iconColorClasses[iconColor])}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Example usage (NRPG contractor dashboard):
 *
 * <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *   <StatCard
 *     label="Total Earnings"
 *     value="$47,382"
 *     sublabel="Year to Date"
 *     trend="+12% vs last month"
 *     trendDirection="up"
 *     icon={DollarSign}
 *     iconColor="emerald"
 *   />
 *
 *   <StatCard
 *     label="Job Completion Rate"
 *     value="98%"
 *     sublabel="147 of 150 jobs"
 *     trend="+2% vs last quarter"
 *     trendDirection="up"
 *     icon={CheckCircle}
 *     iconColor="blue"
 *   />
 *
 *   <StatCard
 *     label="Average Rating"
 *     value="4.8★"
 *     sublabel="from 127 reviews"
 *     trend="Top 5% of network"
 *     icon={Star}
 *     iconColor="amber"
 *   />
 * </div>
 */
