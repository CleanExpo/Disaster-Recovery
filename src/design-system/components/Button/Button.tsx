/**
 * DesignOS Button Component
 *
 * Context-aware button with support for:
 * - Emergency context (red, no animations, large tap targets)
 * - Education context (teal, subtle animations)
 * - NRPG brand (navy/gold professional)
 *
 * Strategic decisions:
 * - Crisis pages: No animations, instant response, large targets
 * - Education pages: Subtle hover effects, engaging
 * - Dual CTAs on mobile: Full-width stacked
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  // Base styles (all buttons)
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Default variants (existing)
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',

        // DesignOS: Emergency variants (no transition animations)
        'emergency-primary': 'bg-dr-emergency text-white hover:bg-dr-emergency-hover transition-none',
        'emergency-secondary': 'border-2 border-dr-emergency text-dr-emergency hover:bg-dr-emergency-bg transition-none',

        // DesignOS: Education variants (subtle animations allowed)
        'education-primary': 'bg-dr-education text-white hover:bg-dr-education-hover',
        'education-secondary': 'border border-dr-education-border text-dr-education hover:bg-dr-education-bg',

        // DesignOS: NRPG variants (professional network)
        'nrpg-primary': 'bg-nrpg-primary text-white hover:bg-nrpg-primary-hover',
        'nrpg-secondary': 'bg-nrpg-secondary text-white hover:bg-nrpg-secondary-hover',
        'nrpg-outline': 'border border-nrpg-border text-nrpg-text hover:bg-nrpg-bg',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        xl: 'h-14 rounded-lg px-10 text-lg', // Larger for emphasis
        icon: 'h-10 w-10',

        // DesignOS: Crisis-optimized (large tap targets)
        crisis: 'h-14 px-8 text-lg min-h-[56px]', // 56px minimum for panic users
        'crisis-full': 'h-14 px-8 text-lg min-h-[56px] w-full', // Full-width mobile

        // DesignOS: Call CTA (extra prominent)
        call: 'h-16 px-12 text-xl min-h-[64px] font-semibold', // Hero CTAs
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, icon, iconPosition = 'left', children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
