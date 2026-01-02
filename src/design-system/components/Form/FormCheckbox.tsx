/**
 * DesignOS Form Checkbox Component
 *
 * Checkbox with integrated label and help text
 * Accessible with proper ARIA attributes
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface FormCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string | React.ReactNode;
  helpText?: string;
  error?: string;
  context?: 'emergency' | 'education';
}

const FormCheckbox = React.forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ className, label, helpText, error, context = 'education', id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const helpTextId = `${checkboxId}-help`;
    const errorId = `${checkboxId}-error`;

    const isEmergency = context === 'emergency';

    return (
      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          {/* Checkbox */}
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id={checkboxId}
              ref={ref}
              className={cn(
                // Base styles
                'peer shrink-0 rounded border border-input',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'cursor-pointer',

                // Size
                isEmergency ? 'h-6 w-6' : 'h-5 w-5',

                // Checked state
                'checked:bg-primary checked:border-primary',

                // Error state
                error && 'border-destructive',

                className
              )}
              aria-describedby={cn(helpText && helpTextId, error && errorId)}
              aria-invalid={error ? 'true' : 'false'}
              {...props}
            />

            {/* Check icon (shown when checked) */}
            <Check
              className={cn(
                'absolute pointer-events-none text-white',
                isEmergency ? 'h-4 w-4' : 'h-3 w-3',
                'hidden peer-checked:block',
                // Center the check mark
                isEmergency ? 'left-1 top-1' : 'left-1 top-1'
              )}
            />
          </div>

          {/* Label and Help Text */}
          <div className="flex-1">
            <label
              htmlFor={checkboxId}
              className={cn(
                'font-medium cursor-pointer',
                isEmergency ? 'text-base' : 'text-sm',
                error ? 'text-destructive' : 'text-foreground',
                props.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {label}
            </label>

            {/* Help Text */}
            {helpText && !error && (
              <p
                id={helpTextId}
                className={cn('text-muted-foreground mt-1', isEmergency ? 'text-sm' : 'text-xs')}
              >
                {helpText}
              </p>
            )}

            {/* Error Message */}
            {error && (
              <p
                id={errorId}
                className={cn('text-destructive font-medium mt-1', isEmergency ? 'text-sm' : 'text-xs')}
                role="alert"
                aria-live="assertive"
              >
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';

export { FormCheckbox };
