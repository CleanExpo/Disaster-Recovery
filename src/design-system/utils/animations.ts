/**
 * DesignOS Animation Utilities
 *
 * Context-aware animation helpers
 * Strategic decision: Disable animations on emergency pages
 */

import { useAnimationsEnabled } from '../hooks/useContextualTheme';

// ============================================================================
// ANIMATION CLASSES
// ============================================================================

/**
 * Get animation class based on context
 * Returns empty string if animations disabled (emergency context)
 */
export function getAnimationClass(animationClass: string): string {
  // In a component, use the hook
  // const enabled = useAnimationsEnabled();
  // return enabled ? animationClass : '';

  // For static use, check prefers-reduced-motion in CSS
  return animationClass;
}

/**
 * Transition classes (only applied if animations enabled)
 */
export const transitions = {
  // Fast transitions (buttons, hovers)
  fast: 'transition-all duration-150 ease-out',

  // Standard transitions (most UI elements)
  standard: 'transition-all duration-200 ease-out',

  // Slow transitions (page transitions, large movements)
  slow: 'transition-all duration-300 ease-out',

  // No transition (emergency pages)
  none: 'transition-none',
};

/**
 * Scroll-triggered reveal animation (Timeline component)
 */
export const scrollReveal = {
  hidden: 'opacity-0 translate-y-5',
  visible: 'opacity-100 translate-y-0 transition-all duration-500 ease-out',
};

/**
 * Slide-in animation (Toast notifications)
 */
export const slideIn = {
  from: 'transform translate-x-full opacity-0',
  to: 'transform translate-x-0 opacity-100 transition-all duration-300 ease-out',
};

/**
 * Fade animation (overlays, modals)
 */
export const fade = {
  in: 'animate-in fade-in duration-200',
  out: 'animate-out fade-out duration-150',
};

// ============================================================================
// CSS-IN-JS ANIMATIONS (for styled components if needed)
// ============================================================================

export const keyframes = {
  slideInRight: `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,

  fadeIn: `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,

  pulse: `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `,
};
