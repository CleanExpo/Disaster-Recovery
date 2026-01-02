/**
 * DesignOS Typography Tokens
 *
 * Typography system for dual-brand platform:
 * - Serif headlines (Playfair/Merriweather) for institutional authority
 * - Sans-serif body (Inter/Archivo) for modern clarity
 * - Monospace (JetBrains Mono) for technical/data
 *
 * Strategic decision: Large serif = authority (government/legal/medical associations)
 */

// ============================================================================
// FONT FAMILIES
// ============================================================================

export const fontFamilies = {
  // Serif - Authority & Institutional Trust
  serif: '"Playfair Display", "Merriweather", Georgia, serif',

  // Sans-Serif - Modern Clarity & Readability
  sans: '"Inter", "Archivo", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',

  // Monospace - Technical & Data
  mono: '"JetBrains Mono", "Fira Code", Consolas, "Courier New", monospace',
};

// ============================================================================
// FONT SIZES (Fluid Responsive Scale)
// ============================================================================

export const fontSizes = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
  '5xl': '3rem',      // 48px
  '6xl': '3.75rem',   // 60px
  '7xl': '4.5rem',    // 72px
  '8xl': '6rem',      // 96px
  '9xl': '8rem',      // 128px
};

// ============================================================================
// FONT WEIGHTS
// ============================================================================

export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

// ============================================================================
// LINE HEIGHTS
// ============================================================================

export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,

  // Context-specific
  crisis: 1.4,      // Tighter for faster scanning
  education: 1.7,   // More relaxed for comfortable reading
};

// ============================================================================
// LETTER SPACING
// ============================================================================

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

// ============================================================================
// TYPOGRAPHY PRESETS (Crisis vs Education)
// ============================================================================

export const typographyPresets = {
  // Crisis Pages (Emergency Intake)
  crisis: {
    h1: {
      fontFamily: fontFamilies.serif,
      fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', // 40px-72px fluid
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacings.tight,
    },
    h2: {
      fontFamily: fontFamilies.serif,
      fontSize: 'clamp(2rem, 6vw, 3.75rem)', // 32px-60px fluid
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacings.tight,
    },
    body: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.crisis,
      maxWidth: '65ch', // Optimal reading width
    },
    cta: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semibold,
      letterSpacing: letterSpacings.wide,
      textTransform: 'none' as const,
    },
  },

  // Educational Pages (Learning, Browsing)
  education: {
    h1: {
      fontFamily: fontFamilies.serif,
      fontSize: 'clamp(2.25rem, 6vw, 3.75rem)', // 36px-60px fluid
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacings.tight,
    },
    h2: {
      fontFamily: fontFamilies.sans,
      fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', // 24px-36px fluid
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.normal,
    },
    h3: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.normal,
    },
    body: {
      fontFamily: fontFamilies.sans,
      fontSize: '1.0625rem', // 17px - slightly larger for comfort
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.education,
      maxWidth: '70ch', // Comfortable reading width
    },
    small: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.normal,
    },
  },

  // NRPG Portal (Professional Network)
  nrpg: {
    h1: {
      fontFamily: fontFamilies.serif,
      fontSize: fontSizes['4xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
    },
    h2: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes['3xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.snug,
    },
    body: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.normal,
    },
    stat: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes['4xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.none,
    },
    statLabel: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.medium,
      textTransform: 'uppercase' as const,
      letterSpacing: letterSpacings.wider,
    },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get typography preset for context
 */
export function getTypographyPreset(context: 'crisis' | 'education' | 'nrpg') {
  return typographyPresets[context];
}

/**
 * Generate CSS for typography preset
 */
export function typographyToCSS(preset: typeof typographyPresets.crisis.h1): string {
  return Object.entries(preset)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    })
    .join('\n  ');
}
