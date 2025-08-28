import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'outlined' | 'filled' | 'glass';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    type = 'text',
    label,
    error,
    helperText,
    icon,
    iconPosition = 'left',
    variant = 'default',
    ...props 
  }, ref) => {
    const [focused, setFocused] = useState(false);
    
    const variants = {
      default: 'bg-dark-700 border-gray-600 focus:border-primary-500',
      outlined: 'bg-transparent border-2 border-gray-600 focus:border-primary-500',
      filled: 'bg-dark-800 border-transparent focus:bg-dark-700',
      glass: 'bg-white/5 backdrop-blur-md border-white/10 focus:border-white/30',
    };

    const hasValue = props.value !== undefined && props.value !== '';

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={props.id}
            className={cn(
              'block text-sm font-medium mb-2 transition-colors',
              error ? 'text-red-400' : focused ? 'text-primary-400' : 'text-gray-300'
            )}
          >
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              'w-full px-4 py-2 rounded-lg text-white transition-all duration-200',
              'border focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              variants[variant],
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            ref={ref}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
            }
            {...props}
          />
          
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${props.id}-error`} className="mt-1 text-sm text-red-400">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${props.id}-helper`} className="mt-1 text-sm text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };