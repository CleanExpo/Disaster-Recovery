/**
 * DesignOS Timeline Component
 *
 * Educational process timeline with:
 * - Scroll-triggered reveals (animated)
 * - Interactive checklist (users check off steps)
 * - Mobile: Left-aligned numbers with indented content
 *
 * Strategic decision: Multiple formats (timeline, checklist, video, FAQ)
 * This component handles timeline and checklist modes
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface TimelineStep {
  id: string;
  number: number;
  title: string;
  description: string;
  details?: string[];
  checkable?: boolean;
  checked?: boolean;
}

export interface TimelineProps {
  steps: TimelineStep[];
  mode?: 'timeline' | 'checklist';
  onStepCheck?: (stepId: string, checked: boolean) => void;
  animated?: boolean;
  className?: string;
}

export function Timeline({
  steps,
  mode = 'timeline',
  onStepCheck,
  animated = true,
  className,
}: TimelineProps) {
  const [visibleSteps, setVisibleSteps] = React.useState<Set<string>>(new Set());
  const [checkedSteps, setCheckedSteps] = React.useState<Set<string>>(
    new Set(steps.filter((s) => s.checked).map((s) => s.id))
  );

  const observerRef = React.useRef<IntersectionObserver | null>(null);

  // Scroll-triggered reveals (only if animated)
  React.useEffect(() => {
    if (!animated) {
      // Show all immediately if not animated
      setVisibleSteps(new Set(steps.map((s) => s.id)));
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = entry.target.getAttribute('data-step-id');
            if (stepId) {
              setVisibleSteps((prev) => new Set([...prev, stepId]));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [animated, steps]);

  const handleStepCheck = (stepId: string, checked: boolean) => {
    setCheckedSteps((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(stepId);
      } else {
        newSet.delete(stepId);
      }
      return newSet;
    });

    onStepCheck?.(stepId, checked);
  };

  return (
    <div className={cn('space-y-6', className)}>
      {steps.map((step, index) => {
        const isVisible = visibleSteps.has(step.id);
        const isChecked = checkedSteps.has(step.id);

        return (
          <div
            key={step.id}
            data-step-id={step.id}
            ref={(el) => {
              if (el && observerRef.current) {
                observerRef.current.observe(el);
              }
            }}
            className={cn(
              'flex gap-4 relative',
              animated && !isVisible && 'opacity-0 translate-y-5',
              animated && isVisible && 'opacity-100 translate-y-0 transition-all duration-500',
              animated && `transition-delay-${index * 100}`
            )}
          >
            {/* Connecting line (except last step) */}
            {index < steps.length - 1 && (
              <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200" />
            )}

            {/* Step number/checkbox */}
            <div className="flex-shrink-0 z-10">
              {mode === 'checklist' && step.checkable ? (
                <button
                  onClick={() => handleStepCheck(step.id, !isChecked)}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                    isChecked
                      ? 'bg-green-600 text-white'
                      : 'bg-white border-2 border-gray-300 hover:border-dr-education'
                  )}
                >
                  {isChecked && <Check className="h-5 w-5" />}
                  {!isChecked && <span className="font-semibold text-gray-600">{step.number}</span>}
                </button>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dr-education to-dr-education-hover text-white flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
              <p className="text-muted-foreground mb-3">{step.description}</p>

              {/* Details list */}
              {step.details && step.details.length > 0 && (
                <ul className="space-y-1 text-sm">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-dr-education mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Checked indicator */}
              {mode === 'checklist' && isChecked && (
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">
                  <Check className="h-4 w-4" />
                  <span>Completed</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Example usage:
 *
 * // Educational timeline (animated scroll reveals)
 * <Timeline
 *   steps={restorationSteps}
 *   mode="timeline"
 *   animated={true}
 * />
 *
 * // Interactive checklist (client tracks their progress)
 * <Timeline
 *   steps={restorationSteps}
 *   mode="checklist"
 *   animated={false}
 *   onStepCheck={(stepId, checked) => {
 *     console.log(`Step ${stepId} checked: ${checked}`);
 *   }}
 * />
 */
