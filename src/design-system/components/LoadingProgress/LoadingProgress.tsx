/**
 * DesignOS Loading Progress Component
 *
 * Detailed step-by-step progress indicator (Strategic Decision)
 * Shows: Validating → Matching → Sending → Complete
 *
 * Rationale: Transparency builds trust, shows what's happening,
 * manages expectations, reduces perceived wait time
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Loader2, Circle } from 'lucide-react';

export type StepStatus = 'complete' | 'in-progress' | 'pending';

export interface LoadingStep {
  id: string;
  label: string;
  status: StepStatus;
}

export interface LoadingProgressProps {
  steps: LoadingStep[];
  estimatedSeconds?: number;
  className?: string;
}

export function LoadingProgress({ steps, estimatedSeconds, className }: LoadingProgressProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[300px]', className)}>
      {/* Steps */}
      <div className="space-y-3 w-full max-w-md">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg transition-colors',
              step.status === 'complete' && 'bg-green-50',
              step.status === 'in-progress' && 'bg-blue-50',
              step.status === 'pending' && 'bg-gray-50'
            )}
          >
            {/* Icon */}
            <div className="flex-shrink-0">
              {step.status === 'complete' && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              {step.status === 'in-progress' && (
                <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
              )}
              {step.status === 'pending' && (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                'text-sm',
                step.status === 'complete' && 'text-green-900 font-medium',
                step.status === 'in-progress' && 'text-blue-900 font-semibold',
                step.status === 'pending' && 'text-gray-500'
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Estimated time */}
      {estimatedSeconds && (
        <p className="text-sm text-muted-foreground mt-4">
          This usually takes {estimatedSeconds} seconds
        </p>
      )}
    </div>
  );
}

/**
 * Example usage:
 *
 * const [steps, setSteps] = useState([
 *   { id: '1', label: 'Validating information', status: 'complete' },
 *   { id: '2', label: 'Matching contractors in Sydney...', status: 'in-progress' },
 *   { id: '3', label: 'Sending notifications', status: 'pending' },
 *   { id: '4', label: 'Creating your case', status: 'pending' },
 * ]);
 *
 * <LoadingProgress steps={steps} estimatedSeconds={15} />
 */

/**
 * Overlay wrapper for full-screen loading
 */
export function LoadingOverlay({ steps, estimatedSeconds }: LoadingProgressProps) {
  return (
    <div className="fixed inset-0 bg-white/98 backdrop-blur-sm flex items-center justify-center z-50">
      <LoadingProgress steps={steps} estimatedSeconds={estimatedSeconds} />
    </div>
  );
}
