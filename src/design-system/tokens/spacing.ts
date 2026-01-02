/**
 * DesignOS Spacing Tokens
 *
 * 8px baseline grid system
 * All spacing is multiples of 8 for visual consistency
 */

// ============================================================================
// SPACING SCALE (8px Grid)
// ============================================================================

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  14: '3.5rem',   // 56px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
};

// ============================================================================
// CONTAINER WIDTHS
// ============================================================================

export const containers = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.125rem',    // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
};

// ============================================================================
// SHADOWS
// ============================================================================

export const boxShadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
};

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
};

// ============================================================================
// BREAKPOINTS (Mobile-First)
// ============================================================================

export const breakpoints = {
  sm: '640px',   // Large phones
  md: '768px',   // Tablets (navigation collapses here)
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px', // Large displays
};

// ============================================================================
// TAP TARGETS (Touch-Friendly Sizes)
// ============================================================================

export const tapTargets = {
  minimum: '44px',     // WCAG AAA minimum
  comfortable: '48px', // Recommended
  crisis: '56px',      // Emergency pages (panic users, shaking hands)
  hero: '64px',        // Primary CTAs
};

// ============================================================================
// CONTENT WIDTH (Optimal Reading)
// ============================================================================

export const contentWidths = {
  prose: '65ch',    // Standard reading width
  proseRelaxed: '70ch', // Comfortable educational content
  narrow: '45ch',   // Short-form content
  wide: '85ch',     // Technical documentation
};
