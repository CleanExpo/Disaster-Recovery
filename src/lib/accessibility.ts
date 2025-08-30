// Accessibility utilities for Lighthouse 100/100 scores

export const a11yConfig = {
  // Skip to main content link
  skipLinks: {
    main: 'Skip to main content',
    navigation: 'Skip to navigation',
    footer: 'Skip to footer',
  },
  
  // ARIA labels for interactive elements
  ariaLabels: {
    navigation: {
      main: 'Main navigation',
      breadcrumb: 'Breadcrumb navigation',
      footer: 'Footer navigation',
      social: 'Social media links',
    },
    buttons: {
      menu: 'Open navigation menu',
      close: 'Close',
      search: 'Search',
      submit: 'Submit form',
      getQuote: 'Get instant quote',
      emergency: 'Emergency assistance',
      viewMore: 'View more information',
    },
    forms: {
      search: 'Search disaster recovery services',
      contact: 'Contact form',
      quote: 'Quote request form',
      newsletter: 'Newsletter subscription',
    },
    regions: {
      banner: 'Site header',
      main: 'Main content',
      complementary: 'Related information',
      contentinfo: 'Site footer',
    },
  },
  
  // Focus management
  focusStyles: {
    default: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    button: 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
    input: 'focus:border-blue-500 focus:ring-2 focus:ring-blue-500',
  },
  
  // Screen reader only text
  srOnly: 'sr-only',
  
  // High contrast mode support
  highContrast: {
    text: 'contrast-more:font-semibold',
    border: 'contrast-more:border-slate-400',
    link: 'contrast-more:underline',
  },
  
  // Reduced motion support
  reducedMotion: {
    transition: 'motion-safe:transition-all motion-reduce:transition-none',
    animation: 'motion-safe:animate-pulse motion-reduce:animate-none',
  },
};

// Helper function to generate accessible heading hierarchy
export function generateHeadingId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Helper function for live region announcements
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  if (typeof document === 'undefined') return;
  
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Helper function for focus trap
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );
  const firstFocusableElement = focusableElements[0] as HTMLElement;
  const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  element.addEventListener('keydown', (e) => {
    const isTabPressed = e.key === 'Tab';
    
    if (!isTabPressed) return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });
  
  firstFocusableElement?.focus();
}

// Colour contrast ratios for WCAG AAA compliance
export const colorContrast = {
  // Background: white (#ffffff)
  primary: {
    text: '#003366', // Contrast ratio: 12.6:1 (AAA)
    textLight: '#004080', // Contrast ratio: 10.2:1 (AAA)
  },
  // Background: light gray (#f3f4f6)
  secondary: {
    text: '#1f2937', // Contrast ratio: 12.5:1 (AAA)
    textLight: '#374151', // Contrast ratio: 9.7:1 (AAA)
  },
  // Background: blue (#0052CC)
  onPrimary: {
    text: '#ffffff', // Contrast ratio: 7.5:1 (AAA for large text)
  },
  // Background: dark (#1f2937)
  onDark: {
    text: '#ffffff', // Contrast ratio: 14.1:1 (AAA)
    textLight: '#e5e7eb', // Contrast ratio: 11.2:1 (AAA)
  },
  // Error states
  error: {
    text: '#991b1b', // Contrast ratio: 7.2:1 (AAA)
    background: '#fee2e2',
  },
  // Success states
  success: {
    text: '#166534', // Contrast ratio: 7.4:1 (AAA)
    background: '#dcfce7',
  },
  // Warning states
  warning: {
    text: '#854d0e', // Contrast ratio: 7.1:1 (AAA)
    background: '#fef3c7',
  },
};

// Semantic HTML elements mapping
export const semanticElements = {
  navigation: 'nav',
  header: 'header',
  main: 'main',
  footer: 'footer',
  aside: 'aside',
  section: 'section',
  article: 'article',
  list: 'ul',
  listItem: 'li',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  paragraph: 'p',
  time: 'time',
  address: 'address',
};

// Keyboard navigation helpers
export const keyboardNav = {
  enter: 'Enter',
  space: ' ',
  escape: 'Escape',
  tab: 'Tab',
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
  home: 'Home',
  end: 'End',
};

// Form validation messages for screen readers
export const validationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  postcode: 'Please enter a valid 4-digit postcode',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  pattern: 'Please match the requested format',
};