import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['monospace'],
        // DesignOS: Serif for authority headlines
        serif: ['"Playfair Display"', '"Merriweather"', 'Georgia', 'serif'],
        // DesignOS: Sans for body text
        'sans-modern': ['"Inter"', '"Archivo"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display - Hero sections (Space Grotesk)
        'display-2xl': ['8rem', { lineHeight: '0.85', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-xl': ['6rem', { lineHeight: '0.9', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-lg': ['4.5rem', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '700' }],

        // Headings (Space Grotesk)
        'heading-2xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-xl': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-lg': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-md': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-sm': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],

        // Body (Plus Jakarta Sans)
        'body-xl': ['1.25rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body-xs': ['0.8125rem', { lineHeight: '1.65', fontWeight: '400' }],

        // Label - Small uppercase
        'label-xs': ['10px', { lineHeight: '1.4', letterSpacing: '0.3em', fontWeight: '900' }],
      },
      colors: {
        // DesignOS: Disaster Recovery (Client Brand) - Context-Aware
        'dr-emergency': {
          DEFAULT: '#DC2626',
          hover: '#B91C1C',
          bg: '#FEF2F2',
          border: '#FCA5A5',
          text: '#991B1B',
        },
        'dr-education': {
          DEFAULT: '#00BFA6',
          hover: '#0891B2',
          secondary: '#0891B2',
          bg: '#F0FDFA',
          border: '#5EEAD4',
          text: '#134E4A',
        },
        'dr-authority': {
          DEFAULT: '#1E3A8A',
          hover: '#1E40AF',
          accent: '#D97706',
          bg: '#FFFFFF',
          text: '#111827',
        },

        // DesignOS: NRPG (Contractor Brand) - Professional Network
        'nrpg': {
          primary: '#1E3A8A',
          'primary-hover': '#1E40AF',
          secondary: '#F59E0B',
          'secondary-hover': '#D97706',
          success: '#10B981',
          bg: '#F9FAFB',
          surface: '#FFFFFF',
          border: '#E5E7EB',
          text: '#1F2937',
          'text-secondary': '#6B7280',
          'text-muted': '#9CA3AF',
          heading: '#111827',
        },

        // DesignOS: Priority Levels (CRM)
        'priority-critical': {
          DEFAULT: '#DC2626',
          bg: '#FEE2E2',
          text: '#991B1B',
        },
        'priority-high': {
          DEFAULT: '#F59E0B',
          bg: '#FEF3C7',
          text: '#92400E',
        },
        'priority-medium': {
          DEFAULT: '#FBBF24',
          bg: '#FEFCE8',
          text: '#854D0E',
        },
        'priority-low': {
          DEFAULT: '#10B981',
          bg: '#D1FAE5',
          text: '#065F46',
        },

        // NRPG Brand Colors (Legacy - keeping for compatibility)
        'nrpg-blue': '#0047FF',
        'nrpg-red': '#E11D48',
        'nrpg-dark': '#020617',
        'nrpg-slate': '#0F172A',

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // NRPG Extended Border Radius (Large Rounded Corners)
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
        '6xl': '3.5rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // NRPG Animations
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // NRPG Animations
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
