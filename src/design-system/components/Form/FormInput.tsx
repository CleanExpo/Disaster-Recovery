/**
 * DesignOS Form Input Component
 *
 * Smart Hybrid Validation (Strategic Decision):
 * - Format errors (phone, postcode, email): Instant on blur
 * - Required field errors: Only on form submit
 *
 * Rationale: Don't overwhelm stressed users with red errors while typing,
 * but do catch format mistakes immediately so they can fix them.
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

export type ValidationType = 'instant' | 'on-blur' | 'on-submit';
export type InputType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'password';

export interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  error?: string;
  helpText?: string;
  validationType?: ValidationType;
  context?: 'emergency' | 'education';
  showLabel?: boolean;
  required?: boolean;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helpText,
      validationType = 'on-blur',
      context = 'education',
      showLabel = true,
      required = false,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    const helpTextId = `${inputId}-help`;
    const errorId = `${inputId}-error`;

    // Crisis context: Larger input, easier to tap
    const isEmergency = context === 'emergency';

    return (
      <div className="space-y-2">
        {/* Label */}
        {showLabel && (
          <label
            htmlFor={inputId}
            className={cn(
              'block font-medium',
              isEmergency ? 'text-base' : 'text-sm',
              error ? 'text-destructive' : 'text-foreground'
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        {/* Input */}
        <input
          type={type}
          id={inputId}
          ref={ref}
          className={cn(
            // Base styles
            'flex w-full rounded-md border bg-background px-3 py-2',
            'text-sm ring-offset-background',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',

            // Emergency context: Larger for easier tapping
            isEmergency && 'h-14 text-base px-4',
            !isEmergency && 'h-10',

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
            className={cn(
              'text-muted-foreground',
              isEmergency ? 'text-sm' : 'text-xs'
            )}
          >
            {helpText}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p
            id={errorId}
            className={cn(
              'text-destructive font-medium',
              isEmergency ? 'text-sm' : 'text-xs'
            )}
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

FormInput.displayName = 'FormInput';

export { FormInput };
