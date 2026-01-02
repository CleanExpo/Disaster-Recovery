/**
 * useContextualTheme Hook
 *
 * Automatically detects page context (emergency, education, authority)
 * and returns appropriate color palette and animation settings
 *
 * Strategic decision: Context-aware design
 * - Emergency pages = red, no animations
 * - Education pages = blue/teal, subtle animations
 * - Authority pages = navy/gold, professional
 */

'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { getPageContext, getContextColors, type PageContext } from '../tokens/colors';

export interface ContextualTheme {
  context: PageContext;
  colors: ReturnType<typeof getContextColors>;
  animationsEnabled: boolean;
  typography: {
    lineHeight: number;
    maxWidth: string;
  };
}

/**
 * Hook to get context-aware theme based on current page
 *
 * Usage:
 * ```tsx
 * const theme = useContextualTheme();
 *
 * <div style={{ backgroundColor: theme.colors.background }}>
 *   <h1 style={{ color: theme.colors.primary }}>...</h1>
 * </div>
 * ```
 */
export function useContextualTheme(): ContextualTheme {
  const pathname = usePathname();

  const theme = useMemo(() => {
    const context = getPageContext(pathname);
    const colors = getContextColors(context);

    // Disable animations on emergency pages (strategic decision)
    const animationsEnabled = context !== 'emergency';

    // Context-specific typography settings
    const typography =
      context === 'emergency'
        ? { lineHeight: 1.4, maxWidth: '65ch' }
        : { lineHeight: 1.7, maxWidth: '70ch' };

    return {
      context,
      colors,
      animationsEnabled,
      typography,
    };
  }, [pathname]);

  return theme;
}

/**
 * Hook to check if current page is in emergency context
 */
export function useIsEmergency(): boolean {
  const { context } = useContextualTheme();
  return context === 'emergency';
}

/**
 * Hook to check if animations should be enabled
 */
export function useAnimationsEnabled(): boolean {
  const { animationsEnabled } = useContextualTheme();

  // Also respect user's prefers-reduced-motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return animationsEnabled && !prefersReducedMotion;
}
