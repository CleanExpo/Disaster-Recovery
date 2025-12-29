/**
 * NRPG Design System - Design Tokens
 *
 * Centralized design system based on DisasterRecovery.com.au brand identity
 * and Anthropic design principles for market leadership.
 *
 * Brand History: 15 years live, Phil McGurk's restoration company
 * Transition: Single company → National contractor platform
 */

export const designTokens = {
  // NRPG Brand Colors
  colors: {
    // Primary Brand - National Blue
    nrpgBlue: '#0047FF',
    nrpgBlueHover: '#0039CC',
    nrpgBlueSofter: '#3B82F6',

    // Emergency/CTA - Red
    nrpgRed: '#E11D48',
    nrpgRedHover: '#BE123C',
    nrpgRedSofter: '#F43F5E',

    // Backgrounds - Deep Dark
    nrpgDark: '#020617',
    nrpgSlate: '#0F172A',
    nrpgSlateMid: '#1E293B',

    // Light mode
    white: '#FFFFFF',
    slate50: '#F8FAFC',
    slate100: '#F1F5F9',
    slate200: '#E2E8F0',
    slate300: '#CBD5E1',
    slate400: '#94A3B8',
    slate500: '#64748B',
    slate600: '#475569',
    slate700: '#334155',
    slate800: '#1E293B',
    slate900: '#0F172A',
    slate950: '#020617',

    // Service Protocol Colors (from Phil's design)
    protocolBlue: '#60A5FA',   // S500 Water Damage Restoration
    protocolOrange: '#FB923C',  // FSRT Fire & Smoke Restoration
    protocolGreen: '#4ADE80',   // S520 Mold Remediation
    protocolRed: '#F87171',     // S540/S800 Bio/Forensic

    // Semantic
    success: '#10B981',
    warning: '#F59E0B',
    error: '#DC2626',
    info: '#3B82F6',
  },

  // Typography
  fonts: {
    sans: 'var(--font-jakarta)', // Plus Jakarta Sans
    display: 'var(--font-space-grotesk)', // Space Grotesk
    mono: 'monospace',
  },

  // Font Sizes (from tailwind config)
  fontSize: {
    // Display (Hero sections)
    displayXxl: '8rem',      // 128px
    displayXl: '6rem',       // 96px
    displayLg: '4.5rem',     // 72px

    // Headings
    heading2xl: '4rem',      // 64px
    headingXl: '3rem',       // 48px
    headingLg: '2.25rem',    // 36px
    headingMd: '1.875rem',   // 30px
    headingSm: '1.5rem',     // 24px

    // Body
    bodyXl: '1.25rem',       // 20px
    bodyLg: '1.125rem',      // 18px
    bodyMd: '1rem',          // 16px
    bodySm: '0.875rem',      // 14px
    bodyXs: '0.8125rem',     // 13px

    // Labels
    labelXs: '10px',         // Ultra-small uppercase labels
  },

  // Border Radius (Large rounded corners)
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '1rem',       // 16px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    '4xl': '2.5rem',  // 40px
    '5xl': '3rem',    // 48px
    '6xl': '3.5rem',  // 56px
    full: '9999px',
  },

  // Spacing
  spacing: {
    // Component spacing
    componentGap: '1rem',      // 16px - Gap between related elements
    sectionGap: '3rem',        // 48px - Gap between sections
    containerPadding: '2rem',  // 32px - Container padding

    // Vertical rhythm
    sectionPaddingY: '6rem',   // 96px (py-24)
    cardPadding: '2.5rem',     // 40px (p-10)
    buttonPadding: '1.25rem',  // 20px (py-5)
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

    // NRPG Branded Shadows
    blue: '0 20px 40px -10px rgba(0, 71, 255, 0.2)',
    red: '0 20px 40px -10px rgba(225, 29, 72, 0.3)',
    emergency: '0 40px 80px -20px rgba(225, 29, 72, 0.3)', // For emergency buttons
  },

  // Z-Index Scale
  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 100,
    fixed: 200,
    modalBackdrop: 500,
    modal: 600,
    popover: 700,
    tooltip: 800,
    notification: 900,
  },

  // Transitions
  transitions: {
    fast: '0.15s ease-out',
    normal: '0.3s ease-out',
    slow: '0.5s ease-out',
    transform: '0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },

  // Breakpoints (from Tailwind)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Phone Number as Brand Element
export const EMERGENCY_PHONE = {
  number: '1300 309 361',
  href: 'tel:1300309361',
  display: '1300 309 361',

  // Number storytelling
  parts: {
    national: '1300',      // National Defense Line
    protocols: '309',      // 309 IICRC forensic checkpoints
    care: '361',          // 361 degrees of care (beyond 360)
  },

  // Copy variations
  labels: {
    primary: 'Emergency Dispatch',
    secondary: 'Immediate Response',
    cta: 'Call Command',
    footer: 'National Dispatch Ready',
  },
} as const;

// Service Pillars (from Phil's design)
export const SERVICE_PILLARS = [
  {
    id: 'water',
    title: 'Flood & Water',
    subtitle: 'Damage Restoration',
    protocol: 'Protocol S500',
    protocolColor: 'text-blue-400',
    services: [
      'Structural Drying',
      'Rapid Extraction',
      'Thermal Imaging',
      'Category 1-3 Water',
      'Dehumidification',
    ],
    slug: 'flood-water-damage',
  },
  {
    id: 'fire',
    title: 'Fire & Smoke',
    subtitle: 'Restoration',
    protocol: 'FSRT',
    protocolColor: 'text-orange-400',
    services: [
      'Soot Mitigation',
      'Odour Control',
      'Corrosion Treatment',
      'Content Restoration',
      'HEPA Filtration',
    ],
    slug: 'fire-smoke-restoration',
  },
  {
    id: 'mould',
    title: 'Mould Growth',
    subtitle: 'Remediation',
    protocol: 'Remediation',
    protocolColor: 'text-green-400',
    services: [
      'Spore Containment',
      'Remediation',
      'Microbial Audit',
      'Air Quality Testing',
      'Prevention Protocols',
    ],
    slug: 'mould-remediation',
  },
  {
    id: 'bio',
    title: 'Bio & Forensic',
    subtitle: 'Cleaning',
    protocol: 'Forensic',
    protocolColor: 'text-red-400',
    services: [
      'Meth Lab Decon',
      'Trauma Cleanup',
      'ATP Verification',
      'Pathogen Elimination',
      'Crime Scene Restoration',
    ],
    slug: 'bio-forensic-cleaning',
  },
] as const;

// Client Sectors (from Phil's design)
export const CLIENT_SECTORS = [
  {
    id: 'residential',
    title: 'Residential',
    subtitle: 'Advocacy',
    badge: 'Homeowner Defense',
    description: 'Your home is your largest asset. We provide the forensic evidence needed to force insurers to restore correctly.',
    slug: 'residential-restoration',
  },
  {
    id: 'commercial',
    title: 'Commercial',
    subtitle: 'Continuity',
    badge: 'Business Recovery',
    description: 'Minimizing downtime for retail, corporate, and public facilities through rapid response and logistical excellence.',
    slug: 'commercial-restoration',
  },
  {
    id: 'industrial',
    title: 'Industrial',
    subtitle: 'Infrastructure',
    badge: 'Heavy Infrastructure',
    description: 'Decontaminating manufacturing plants, warehouses, and industrial machinery where precision and safety are paramount.',
    slug: 'industrial-restoration',
  },
  {
    id: 'insurance',
    title: 'Insurance',
    subtitle: 'Auditing',
    badge: 'Verified Auditing',
    description: 'Providing transparent, data-backed forensic reports that satisfy international restoration auditing requirements.',
    slug: 'insurance-loss-adjusters',
  },
] as const;

// Australian States/Territories
export const AUSTRALIAN_LOCATIONS = [
  { code: 'NSW', name: 'New South Wales', capital: 'Sydney' },
  { code: 'VIC', name: 'Victoria', capital: 'Melbourne' },
  { code: 'QLD', name: 'Queensland', capital: 'Brisbane' },
  { code: 'WA', name: 'Western Australia', capital: 'Perth' },
  { code: 'SA', name: 'South Australia', capital: 'Adelaide' },
  { code: 'TAS', name: 'Tasmania', capital: 'Hobart' },
  { code: 'ACT', name: 'ACT Canberra', capital: 'Canberra' },
  { code: 'NT', name: 'Northern Territory', capital: 'Darwin' },
] as const;

// Helper Functions
export const getColorVar = (colorName: keyof typeof designTokens.colors) => {
  return designTokens.colors[colorName];
};

export const getFontFamily = (fontType: 'sans' | 'display' | 'mono') => {
  return designTokens.fonts[fontType];
};

// Type exports for TypeScript
export type ServicePillar = typeof SERVICE_PILLARS[number];
export type ClientSector = typeof CLIENT_SECTORS[number];
export type AustralianLocation = typeof AUSTRALIAN_LOCATIONS[number];
