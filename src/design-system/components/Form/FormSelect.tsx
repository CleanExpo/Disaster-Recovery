/**
 * DesignOS Form Select Component
 *
 * Dropdown select with smart validation
 * Context-aware sizing (emergency vs education)
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface FormSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  options: FormSelectOption[];
  error?: string;
  helpText?: string;
  context?: 'emergency' | 'education';
  showLabel?: boolean;
  placeholder?: string;
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      className,
      label,
      options,
      error,
      helpText,
      context = 'education',
      showLabel = true,
      required = false,
      placeholder = 'Select an option',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
    const helpTextId = `${selectId}-help`;
    const errorId = `${selectId}-error`;

    const isEmergency = context === 'emergency';

    return (
      <div className="space-y-2">
        {/* Label */}
        {showLabel && (
          <label
            htmlFor={selectId}
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

        {/* Select */}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              // Base styles
              'flex w-full rounded-md border bg-background px-3 py-2',
              'text-sm ring-offset-background',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'appearance-none cursor-pointer',

              // Emergency context: Larger
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
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <ChevronDown
            className={cn(
              'absolute right-3 pointer-events-none',
              isEmergency ? 'top-5 h-5 w-5' : 'top-3 h-4 w-4',
              'text-muted-foreground'
            )}
          />
        </div>

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

FormSelect.displayName = 'FormSelect';

export { FormSelect };
