import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Enhanced color system with semantic naming
      colors: {
        // Legacy support (keeping existing)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          500: "hsl(var(--primary-500))",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          900: "hsl(var(--primary-900))",
          950: "hsl(var(--primary-950))",
          DEFAULT: "hsl(var(--primary-600))",
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

        // Enhanced status colors (WCAG AAA compliant)
        emergency: {
          50: "hsl(var(--emergency-50))",
          100: "hsl(var(--emergency-100))",
          200: "hsl(var(--emergency-200))",
          300: "hsl(var(--emergency-300))",
          400: "hsl(var(--emergency-400))",
          500: "hsl(var(--emergency-500))",
          600: "hsl(var(--emergency-600))", // Primary emergency color
          700: "hsl(var(--emergency-700))",
          800: "hsl(var(--emergency-800))",
          900: "hsl(var(--emergency-900))",
          DEFAULT: "hsl(var(--emergency-600))",
        },
        warning: {
          50: "hsl(var(--warning-50))",
          100: "hsl(var(--warning-100))",
          200: "hsl(var(--warning-200))",
          300: "hsl(var(--warning-300))",
          400: "hsl(var(--warning-400))",
          500: "hsl(var(--warning-500))",
          600: "hsl(var(--warning-600))", // Primary warning color
          700: "hsl(var(--warning-700))",
          800: "hsl(var(--warning-800))",
          900: "hsl(var(--warning-900))",
          DEFAULT: "hsl(var(--warning-600))",
        },
        success: {
          50: "hsl(var(--success-50))",
          100: "hsl(var(--success-100))",
          200: "hsl(var(--success-200))",
          300: "hsl(var(--success-300))",
          400: "hsl(var(--success-400))",
          500: "hsl(var(--success-500))",
          600: "hsl(var(--success-600))", // Primary success color
          700: "hsl(var(--success-700))",
          800: "hsl(var(--success-800))",
          900: "hsl(var(--success-900))",
          DEFAULT: "hsl(var(--success-600))",
        },
        info: {
          50: "hsl(var(--info-50))",
          100: "hsl(var(--info-100))",
          200: "hsl(var(--info-200))",
          300: "hsl(var(--info-300))",
          400: "hsl(var(--info-400))",
          500: "hsl(var(--info-500))",
          600: "hsl(var(--info-600))", // Primary info color
          700: "hsl(var(--info-700))",
          800: "hsl(var(--info-800))",
          900: "hsl(var(--info-900))",
          DEFAULT: "hsl(var(--info-600))",
        },

        // Enhanced neutral scale
        neutral: {
          50: "hsl(var(--neutral-50))",
          100: "hsl(var(--neutral-100))",
          200: "hsl(var(--neutral-200))",
          300: "hsl(var(--neutral-300))",
          400: "hsl(var(--neutral-400))",
          500: "hsl(var(--neutral-500))",
          600: "hsl(var(--neutral-600))",
          700: "hsl(var(--neutral-700))",
          800: "hsl(var(--neutral-800))",
          900: "hsl(var(--neutral-900))",
          950: "hsl(var(--neutral-950))",
        },

        // Service category colors
        water: {
          50: "hsl(var(--water-50))",
          500: "hsl(var(--water-500))",
          600: "hsl(var(--water-600))",
          DEFAULT: "hsl(var(--water-500))",
        },
        fire: {
          50: "hsl(var(--fire-50))",
          500: "hsl(var(--fire-500))",
          600: "hsl(var(--fire-600))",
          DEFAULT: "hsl(var(--fire-500))",
        },
        mould: {
          50: "hsl(var(--mould-50))",
          500: "hsl(var(--mould-500))",
          600: "hsl(var(--mould-600))",
          DEFAULT: "hsl(var(--mould-500))",
        },
        storm: {
          50: "hsl(var(--storm-50))",
          500: "hsl(var(--storm-500))",
          600: "hsl(var(--storm-600))",
          DEFAULT: "hsl(var(--storm-500))",
        },
        biohazard: {
          50: "hsl(var(--biohazard-50))",
          500: "hsl(var(--biohazard-500))",
          600: "hsl(var(--biohazard-600))",
          DEFAULT: "hsl(var(--biohazard-500))",
        },
      },

      // Enhanced spacing scale
      spacing: {
        '0': 'var(--spacing-0)',
        'px': 'var(--spacing-px)',
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
        '7': 'var(--spacing-7)',
        '8': 'var(--spacing-8)',
        '10': 'var(--spacing-10)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
        '20': 'var(--spacing-20)',
        '24': 'var(--spacing-24)',
        '32': 'var(--spacing-32)',
        'touch': 'var(--touch-target-min)', // 44px minimum touch target
        'touch-lg': 'var(--touch-target-optimal)', // 48px optimal touch target
        'touch-xl': 'var(--touch-target-large)', // 56px large touch target
      },

      // Enhanced border radius
      borderRadius: {
        'none': 'var(--radius-none)',
        'sm': 'var(--radius-sm)',
        'base': 'var(--radius-base)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        'full': 'var(--radius-full)',
        // Legacy support
        DEFAULT: "var(--radius)",
      },

      // Enhanced typography
      fontSize: {
        'xs': ['var(--font-size-xs)', { lineHeight: 'var(--line-height-normal)' }],
        'sm': ['var(--font-size-sm)', { lineHeight: 'var(--line-height-normal)' }],
        'base': ['var(--font-size-base)', { lineHeight: 'var(--line-height-normal)' }],
        'lg': ['var(--font-size-lg)', { lineHeight: 'var(--line-height-normal)' }],
        'xl': ['var(--font-size-xl)', { lineHeight: 'var(--line-height-snug)' }],
        '2xl': ['var(--font-size-2xl)', { lineHeight: 'var(--line-height-tight)' }],
        '3xl': ['var(--font-size-3xl)', { lineHeight: 'var(--line-height-tight)' }],
        '4xl': ['var(--font-size-4xl)', { lineHeight: 'var(--line-height-tight)' }],
        '5xl': ['var(--font-size-5xl)', { lineHeight: 'var(--line-height-tight)' }],
        '6xl': ['var(--font-size-6xl)', { lineHeight: 'var(--line-height-tight)' }],
      },

      fontWeight: {
        'light': 'var(--font-weight-light)',
        'normal': 'var(--font-weight-normal)',
        'medium': 'var(--font-weight-medium)',
        'semibold': 'var(--font-weight-semibold)',
        'bold': 'var(--font-weight-bold)',
        'extrabold': 'var(--font-weight-extrabold)',
      },

      lineHeight: {
        'tight': 'var(--line-height-tight)',
        'snug': 'var(--line-height-snug)',
        'normal': 'var(--line-height-normal)',
        'relaxed': 'var(--line-height-relaxed)',
        'loose': 'var(--line-height-loose)',
      },

      // Enhanced shadows
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'base': 'var(--shadow-base)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'inner': 'var(--shadow-inner)',
        'emergency': 'var(--shadow-emergency)',
        // Legacy support
        DEFAULT: 'var(--shadow-base)',
      },

      // Enhanced animations
      animation: {
        // Legacy support
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        
        // New design system animations
        "slide-in-bottom": "slide-in-from-bottom var(--animation-duration-base) var(--animation-timing-ease-out)",
        "slide-in-right": "slide-in-from-right var(--animation-duration-base) var(--animation-timing-ease-out)",
        "fade-in": "fade-in var(--animation-duration-slow) var(--animation-timing-ease-out)",
        "scale-in": "scale-in var(--animation-duration-base) var(--animation-timing-ease-out)",
        "pulse-glow": "pulse-glow 2s infinite",
        "pulse-dot": "pulse-dot 2s infinite",
        "pulse-subtle": "pulse-subtle 2s infinite",
        "subtle-pulse": "subtle-pulse 4s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },

      keyframes: {
        // Legacy support
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        
        // New design system keyframes
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "var(--shadow-emergency)" },
          "50%": { boxShadow: "0 4px 20px 0 rgb(220 38 38 / 0.4)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.1)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "subtle-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.95" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },

      // Animation timing functions
      transitionTimingFunction: {
        'ease-out': 'var(--animation-timing-ease-out)',
        'ease-in': 'var(--animation-timing-ease-in)',
        'ease-in-out': 'var(--animation-timing-ease-in-out)',
      },

      transitionDuration: {
        'fast': 'var(--animation-duration-fast)',
        'base': 'var(--animation-duration-base)',
        'slow': 'var(--animation-duration-slow)',
        'slower': 'var(--animation-duration-slower)',
      },

      // Gradient stops for background images
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-hero-emergency': 'var(--gradient-hero-emergency)',
        'gradient-bg-light': 'var(--gradient-bg-light)',
        'gradient-bg-primary': 'var(--gradient-bg-primary)',
        'gradient-bg-emergency': 'var(--gradient-bg-emergency)',
        'gradient-bg-success': 'var(--gradient-bg-success)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom plugin for design system utilities
    function({ addUtilities, addComponents, theme }) {
      addUtilities({
        // Touch target utilities
        '.touch-target': {
          minHeight: 'var(--touch-target-min)',
          minWidth: 'var(--touch-target-min)',
        },
        '.touch-target-lg': {
          minHeight: 'var(--touch-target-optimal)',
          minWidth: 'var(--touch-target-optimal)',
        },
        '.touch-target-xl': {
          minHeight: 'var(--touch-target-large)',
          minWidth: 'var(--touch-target-large)',
        },
      });

      addComponents({
        // Button components that integrate with design system
        '.btn-emergency': {
          background: 'var(--gradient-bg-emergency)',
          color: 'white',
          boxShadow: 'var(--shadow-emergency)',
          animation: 'pulse-glow 2s infinite',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px 0 rgb(220 38 38 / 0.35)',
          },
        },
        '.btn-primary-gradient': {
          background: 'var(--gradient-bg-primary)',
          color: 'white',
          boxShadow: 'var(--shadow-sm)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: 'var(--shadow-md)',
          },
        },
      });
    },
  ],
}
export default config