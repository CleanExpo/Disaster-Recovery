/**
 * DesignOS Form Textarea Component
 *
 * Multi-line text input with character count and validation
 * Context-aware sizing
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helpText?: string;
  context?: 'emergency' | 'education';
  showLabel?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      className,
      label,
      error,
      helpText,
      context = 'education',
      showLabel = true,
      showCharCount = false,
      maxLength,
      required = false,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');
    const helpTextId = `${textareaId}-help`;
    const errorId = `${textareaId}-error`;

    const isEmergency = context === 'emergency';
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="space-y-2">
        {/* Label */}
        {showLabel && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={textareaId}
              className={cn(
                'block font-medium',
                isEmergency ? 'text-base' : 'text-sm',
                error ? 'text-destructive' : 'text-foreground'
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>

            {/* Character count */}
            {showCharCount && maxLength && (
              <span
                className={cn(
                  'text-xs',
                  charCount > maxLength * 0.9 && 'text-amber-600',
                  charCount >= maxLength && 'text-destructive',
                  charCount < maxLength * 0.9 && 'text-muted-foreground'
                )}
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}

        {/* Textarea */}
        <textarea
          id={textareaId}
          ref={ref}
          maxLength={maxLength}
          value={value}
          className={cn(
            // Base styles
            'flex w-full rounded-md border bg-background px-3 py-2',
            'text-sm ring-offset-background',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'resize-y', // Allow vertical resize

            // Emergency context: Larger
            isEmergency && 'text-base px-4 py-3 min-h-[120px]',
            !isEmergency && 'min-h-[100px]',

            // Error state
            error && 'border-destructive focus-visible:ring-destructive',
            !error && 'border-input',

            className
          )}
          aria-required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(helpText && helpTextId, error && errorId)}
          {...props}
        />

        {/* Help Text */}
        {helpText && !error && (
          <p
            id={helpTextId}
            className={cn('text-muted-foreground', isEmergency ? 'text-sm' : 'text-xs')}
          >
            {helpText}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p
            id={errorId}
            className={cn('text-destructive font-medium', isEmergency ? 'text-sm' : 'text-xs')}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export { FormTextarea };
