/**
 * DesignOS Error State Component
 *
 * Transparent Error Explanations (Strategic Decision)
 * Instead of: "Error: Failed to submit"
 * Show: "All contractors in Sydney busy. Expanding search to 50km radius..."
 *
 * Rationale: Explain what's happening, show system intelligence,
 * provide alternatives, never dead-end the user
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, XCircle, Phone } from 'lucide-react';
import { Button } from '../Button/Button';

export type ErrorSeverity = 'error' | 'warning' | 'info';

export interface AlternativeAction {
  label: string;
  action: () => void;
  variant?: 'primary' | 'outline';
}

export interface ErrorStateProps {
  title: string;
  message: string;
  explanation?: string; // What the system is doing about it
  severity?: ErrorSeverity;
  alternatives?: AlternativeAction[];
  showProgress?: boolean;
  progressLabel?: string;
  progressValue?: number;
  className?: string;
}

const severityConfig = {
  error: {
    icon: XCircle,
    iconColor: 'text-red-500',
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    textColor: 'text-red-900',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-900',
  },
  info: {
    icon: AlertCircle,
    iconColor: 'text-blue-500',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-900',
  },
};

export function ErrorState({
  title,
  message,
  explanation,
  severity = 'error',
  alternatives,
  showProgress = false,
  progressLabel,
  progressValue,
  className,
}: ErrorStateProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4', className)}>
      {/* Icon */}
      <Icon className={cn('h-12 w-12 mb-4', config.iconColor)} />

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{title}</h3>

      {/* Message */}
      <p className="text-muted-foreground text-center max-w-md mb-4">{message}</p>

      {/* Explanation (what system is doing) */}
      {explanation && (
        <div
          className={cn(
            'rounded-lg border p-4 max-w-md w-full mb-6',
            config.borderColor,
            config.bgColor
          )}
        >
          <p className={cn('text-sm', config.textColor)}>{explanation}</p>

          {/* Progress bar if showing system action */}
          {showProgress && progressValue !== undefined && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className={config.textColor}>{progressLabel || 'Processing...'}</span>
                <span className={config.textColor}>{progressValue}%</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    severity === 'error' && 'bg-red-500',
                    severity === 'warning' && 'bg-amber-500',
                    severity === 'info' && 'bg-blue-500'
                  )}
                  style={{ width: `${progressValue}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Alternative Actions */}
      {alternatives && alternatives.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          {alternatives.map((alt, index) => (
            <Button
              key={index}
              variant={alt.variant === 'outline' ? 'outline' : 'default'}
              size="lg"
              onClick={alt.action}
              className="flex-1"
            >
              {alt.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Example usage for "All contractors busy" scenario:
 *
 * <ErrorState
 *   severity="warning"
 *   title="All Contractors in Sydney Currently Busy"
 *   message="We're expanding our search to nearby areas to find you help."
 *   explanation="Expanding search to 50km radius (Parramatta, Liverpool, Sutherland)..."
 *   showProgress
 *   progressLabel="Searching wider area"
 *   progressValue={60}
 *   alternatives={[
 *     {
 *       label: 'Call Emergency Line: 1300 309 361',
 *       action: () => window.location.href = 'tel:1300309361',
 *       variant: 'primary'
 *     },
 *     {
 *       label: 'Try Again in 5 Minutes',
 *       action: () => window.location.reload(),
 *       variant: 'outline'
 *     }
 *   ]}
 * />
 */
