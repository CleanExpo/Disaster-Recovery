/**
 * Website & CRM Consistency Enhancement Engine
 * Ensures visual, writing, analytics, and linking consistency across the entire platform
 */

import { BUSINESS_NAME, STATES, CITIES_BY_STATE, INDUSTRIES, INSURANCE_PARTNERS } from './constants';

// Visual Consistency Standards
export const VISUAL_STANDARDS = {
  colors: {
    // Primary brand colors
    primary: {
      disaster: '#ef4444',      // Red for disaster/emergency
      recovery: '#22c55e',      // Green for recovery/success
      australia: '#fbbf24',     // Gold for Australian identity
      professional: '#1e293b'   // Dark slate for professionalism
    },
    // Semantic colors
    semantic: {
      danger: '#dc2626',
      warning: '#f59e0b',
      success: '#16a34a',
      info: '#0ea5e9',
      neutral: '#64748b'
    },
    // Background gradients
    gradients: {
      hero: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      emergency: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
      recovery: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
      premium: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'
    }
  },
  typography: {
    // Font families
    fonts: {
      heading: "'Inter', system-ui, sans-serif",
      body: "'Inter', system-ui, sans-serif",
      mono: "'JetBrains Mono', monospace"
    },
    // Font sizes (rem)
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem'   // 72px
    },
    // Font weights
    weights: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    // Line heights
    lineHeights: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    }
  },
  spacing: {
    // Consistent spacing scale (rem)
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
    '2xl': '4rem',  // 64px
    '3xl': '6rem',  // 96px
    '4xl': '8rem',  // 128px
    '5xl': '12rem'  // 192px
  },
  borders: {
    radius: {
      none: '0',
      sm: '0.125rem',    // 2px
      default: '0.25rem', // 4px
      md: '0.375rem',     // 6px
      lg: '0.5rem',       // 8px
      xl: '0.75rem',      // 12px
      '2xl': '1rem',      // 16px
      '3xl': '1.5rem',    // 24px
      full: '9999px'
    },
    width: {
      none: '0',
      thin: '1px',
      default: '2px',
      thick: '4px',
      heavy: '8px'
    }
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    emergency: '0 0 20px rgba(239, 68, 68, 0.5)',
    recovery: '0 0 20px rgba(34, 197, 94, 0.5)'
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
      slowest: '1000ms'
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  }
};

// Writing Style Guidelines
export const WRITING_STYLE = {
  tone: {
    primary: 'professional',
    secondary: 'empathetic',
    urgency: 'action-oriented',
    authority: 'expert',
    attributes: [
      'Clear and concise',
      'Solution-focused',
      'Reassuring yet urgent',
      'Data-driven',
      'Australian-centric'
    ]
  },
  voice: {
    perspective: 'first-person plural (we/our)',
    formality: 'professional but approachable',
    technical: 'explain complex terms simply'
  },
  formatting: {
    headings: {
      h1: 'Title Case - Main Page Title',
      h2: 'Title Case - Major Sections',
      h3: 'Sentence case - Subsections',
      h4: 'Sentence case - Details'
    },
    lists: {
      bullets: 'Use for unordered information',
      numbers: 'Use for sequential steps or rankings',
      icons: 'Use relevant icons for visual interest'
    },
    emphasis: {
      bold: 'Key terms and important numbers',
      italic: 'Quotes and technical terms on first use',
      highlight: 'Critical actions and CTAs'
    }
  },
  content: {
    structure: {
      hero: 'Problem → Solution → Action',
      service: 'What → Why → How → CTA',
      location: 'Local relevance → Services → Trust signals → Contact',
      industry: 'Industry challenges → Our expertise → Case studies → Partnership'
    },
    lengths: {
      headline: '6-12 words',
      subheadline: '15-25 words',
      paragraph: '40-60 words',
      bulletPoint: '5-15 words',
      cta: '2-5 words'
    },
    keywords: {
      primary: ['disaster recovery', 'Australia', 'emergency', '24/7'],
      services: ['water damage', 'fire damage', 'mould remediation', 'restoration'],
      trust: ['certified', 'insured', 'IICRC', 'professional', 'experienced'],
      urgency: ['immediate', 'rapid response', 'emergency', 'same day', 'urgent'],
      local: ['near me', 'local', '[city name]', '[suburb]', 'Australian']
    }
  },
  messaging: {
    valueProposition: 'Australia\'s most comprehensive disaster recovery network',
    uniqueSellingPoints: [
      'Nationwide coverage from metro to remote',
      'All disaster types handled',
      'Direct insurance claim processing',
      '24/7 emergency response',
      'Certified professional contractors only'
    ],
    trustIndicators: [
      'Trusted by major insurers',
      'IICRC certified network',
      '$20M+ insurance coverage',
      'Verified contractor network',
      'Real-time tracking'
    ]
  }
};

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  tracking: {
    // Google Analytics 4
    ga4: {
      measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      events: {
        // User engagement
        pageView: 'page_view',
        scroll: 'scroll',
        click: 'click',
        search: 'search',
        
        // Conversion events
        leadSubmit: 'lead_submit',
        contractorSignup: 'contractor_signup',
        quoteRequest: 'quote_request',
        emergencyCall: 'emergency_call',
        
        // Content interaction
        videoPlay: 'video_play',
        downloadResource: 'download_resource',
        shareContent: 'share',
        
        // Navigation
        menuClick: 'menu_click',
        footerClick: 'footer_click',
        ctaClick: 'cta_click'
      },
      customDimensions: {
        userType: 'dimension1',        // customer/contractor/insurer
        disasterType: 'dimension2',    // water/fire/mould/etc
        location: 'dimension3',        // city/suburb
        urgency: 'dimension4',         // emergency/scheduled
        source: 'dimension5'           // organic/paid/referral
      }
    },
    // Heat mapping
    heatmap: {
      provider: 'Microsoft Clarity',
      projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
    },
    // Conversion tracking
    conversions: {
      facebook: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
      google: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
      linkedin: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID
    }
  },
  goals: {
    primary: {
      leadGeneration: {
        target: 500,
        value: 550,
        funnel: ['landing', 'form_start', 'form_submit', 'thank_you']
      },
      contractorAcquisition: {
        target: 50,
        value: 5000,
        funnel: ['contractor_landing', 'signup_start', 'verification', 'onboarded']
      }
    },
    secondary: {
      engagement: {
        avgSessionDuration: 180, // seconds
        pagesPerSession: 3,
        bounceRate: 40 // percentage
      },
      content: {
        blogReadRate: 60, // percentage
        videoWatchRate: 70, // percentage
        resourceDownloads: 100 // monthly
      }
    }
  },
  reporting: {
    dashboards: {
      executive: ['revenue', 'leads', 'contractors', 'coverage'],
      marketing: ['traffic', 'conversions', 'campaigns', 'seo'],
      operations: ['response_times', 'job_completion', 'satisfaction'],
      contractor: ['leads_received', 'conversion_rate', 'revenue', 'ranking']
    },
    frequency: {
      realtime: ['active_users', 'current_emergencies'],
      daily: ['leads', 'traffic', 'conversions'],
      weekly: ['contractor_performance', 'content_performance'],
      monthly: ['revenue', 'growth', 'market_share']
    }
  }
};

// Backlinking Strategy
export const LINKING_STRATEGY = {
  internal: {
    structure: {
      hub: '/services',
      spokes: [
        '/services/water-damage',
        '/services/fire-damage',
        '/services/mould-remediation',
        '/services/emergency-response'
      ],
      crossLinks: {
        related: 'Link to related services',
        location: 'Link to nearest location pages',
        process: 'Link to how it works',
        trust: 'Link to certifications and insurance'
      }
    },
    rules: [
      'Every page must have 3-5 internal links',
      'Link to both parent and sibling pages',
      'Use descriptive anchor text with keywords',
      'Prioritize links to high-conversion pages',
      'Include breadcrumb navigation on all pages'
    ],
    anchors: {
      services: [
        'water damage restoration in [location]',
        'emergency [service] services',
        '24/7 [disaster] response',
        'certified [service] contractors'
      ],
      locations: [
        '[city] disaster recovery services',
        'emergency restoration in [suburb]',
        '[state] disaster response network',
        'local [service] contractors'
      ],
      trust: [
        'IICRC certified professionals',
        'insurance approved contractors',
        'verified disaster recovery network',
        'trusted emergency responders'
      ]
    }
  },
  external: {
    targets: {
      authority: [
        'Bureau of Meteorology (weather warnings)',
        'Emergency Management Australia',
        'State Emergency Services',
        'Insurance Council of Australia',
        'IICRC Australia',
        'Master Builders Association',
        'Housing Industry Association'
      ],
      local: [
        'Local council emergency pages',
        'Chamber of Commerce directories',
        'Regional business networks',
        'Community emergency groups'
      ],
      industry: [
        'Restoration industry publications',
        'Insurance industry news',
        'Property management associations',
        'Facility management groups'
      ]
    },
    acquisition: {
      strategies: [
        'Guest posts on insurance blogs',
        'Expert quotes in media',
        'Case study features',
        'Industry directory listings',
        'Partnership announcements',
        'Community sponsorships',
        'Educational content sharing'
      ],
      anchor: {
        branded: 'Disaster Recovery Australia',
        partial: 'disaster recovery services',
        natural: ['click here', 'learn more', 'read more'],
        exact: 'water damage restoration Australia'
      }
    }
  },
  schema: {
    types: [
      'LocalBusiness',
      'EmergencyService',
      'ProfessionalService',
      'Organization',
      'FAQPage',
      'HowTo',
      'Article'
    ],
    structured: {
      business: {
        '@type': 'LocalBusiness',
        name: BUSINESS_NAME,
        url: 'https://disasterrecovery.com.au',
        telephone: 'Online Only',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'AU'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -25.2744,
          longitude: 133.7751
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        }
      }
    }
  }
};

// CRM Integration Configuration
export const CRM_CONFIG = {
  dataSync: {
    contractor: {
      fields: [
        'businessName',
        'abn',
        'location',
        'serviceRadius',
        'services',
        'certifications',
        'insurance',
        'availability',
        'rating',
        'completedJobs'
      ],
      validation: {
        abn: /^\d{11}$/,
        insurance: /^\d{8,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^(\+61|0)[2-478]\d{8}$/
      }
    },
    lead: {
      fields: [
        'customerName',
        'location',
        'disasterType',
        'urgency',
        'insuranceCompany',
        'claimNumber',
        'propertyType',
        'damageDescription',
        'photos',
        'preferredContact'
      ],
      scoring: {
        high: ['insurance_claim', 'commercial', 'multi_unit'],
        medium: ['residential', 'urgent', 'repeat_customer'],
        low: ['quote_only', 'future_date', 'uncertain']
      }
    }
  },
  automation: {
    workflows: {
      leadDistribution: {
        trigger: 'new_lead',
        actions: [
          'score_lead',
          'match_contractors',
          'send_notifications',
          'start_timer',
          'track_acceptance'
        ]
      },
      contractorOnboarding: {
        trigger: 'contractor_signup',
        actions: [
          'verify_abn',
          'check_insurance',
          'validate_certifications',
          'assign_territory',
          'create_profile',
          'generate_landing_pages'
        ]
      },
      performanceTracking: {
        trigger: 'job_complete',
        actions: [
          'calculate_metrics',
          'update_rating',
          'adjust_ranking',
          'generate_invoice',
          'request_review'
        ]
      }
    }
  },
  reporting: {
    contractor: {
      metrics: [
        'leads_received',
        'acceptance_rate',
        'response_time',
        'conversion_rate',
        'average_job_value',
        'customer_rating',
        'revenue_generated'
      ],
      frequency: 'weekly'
    },
    system: {
      metrics: [
        'total_leads',
        'distribution_efficiency',
        'contractor_coverage',
        'revenue_per_lead',
        'customer_satisfaction',
        'market_penetration'
      ],
      frequency: 'daily'
    }
  }
};

// SEO Enhancement Configuration
export const SEO_CONFIG = {
  pages: {
    dynamic: {
      pattern: '/[state]/[city]/[service]',
      title: '[Service] in [City], [State] | 24/7 Emergency Response',
      description: 'Professional [service] services in [City]. IICRC certified, insurance approved. Rapid response for [disaster] emergencies. Call now!',
      h1: 'Emergency [Service] Services in [City]',
      content: {
        intro: 'When disaster strikes in [City], you need immediate professional help.',
        services: 'Our certified [service] contractors in [City] are available 24/7.',
        trust: 'Trusted by major insurers and thousands of [State] residents.',
        cta: 'Get immediate help for [disaster] in [City] now!'
      }
    }
  },
  optimization: {
    speed: {
      target: {
        lcp: 2.5, // Largest Contentful Paint (seconds)
        fid: 100, // First Input Delay (milliseconds)
        cls: 0.1  // Cumulative Layout Shift
      },
      techniques: [
        'Image optimization with WebP',
        'Lazy loading below fold',
        'Code splitting by route',
        'Edge caching with CDN',
        'Critical CSS inline',
        'Preconnect to required origins'
      ]
    },
    mobile: {
      responsive: true,
      touchTargets: '48x48px minimum',
      viewport: 'width=device-width, initial-scale=1',
      textSize: '16px minimum'
    }
  }
};

// Consistency Validator
export class ConsistencyValidator {
  validateVisuals(component: any): string[] {
    const issues: string[] = [];
    
    // Check color usage
    if (!this.isValidColor(component.color)) {
      issues.push(`Invalid color: ${component.color}`);
    }
    
    // Check typography
    if (!this.isValidFont(component.font)) {
      issues.push(`Invalid font: ${component.font}`);
    }
    
    // Check spacing
    if (!this.isValidSpacing(component.spacing)) {
      issues.push(`Invalid spacing: ${component.spacing}`);
    }
    
    return issues;
  }
  
  validateContent(content: string): string[] {
    const issues: string[] = [];
    
    // Check tone
    if (!this.hasAppropriateTone(content)) {
      issues.push('Content tone does not match brand guidelines');
    }
    
    // Check keyword usage
    if (!this.hasRequiredKeywords(content)) {
      issues.push('Missing required keywords for SEO');
    }
    
    // Check length
    if (!this.hasAppropriateLength(content)) {
      issues.push('Content length outside recommended range');
    }
    
    return issues;
  }
  
  validateLinks(page: any): string[] {
    const issues: string[] = [];
    
    // Check internal links
    if (page.internalLinks.length < 3) {
      issues.push('Insufficient internal links (minimum 3 required)');
    }
    
    // Check anchor text
    page.links.forEach((link: any) => {
      if (!this.hasDescriptiveAnchor(link)) {
        issues.push(`Non-descriptive anchor text: ${link.text}`);
      }
    });
    
    return issues;
  }
  
  private isValidColor(color: string): boolean {
    const validColors = Object.values(VISUAL_STANDARDS.colors.primary)
      .concat(Object.values(VISUAL_STANDARDS.colors.semantic));
    return validColors.includes(color);
  }
  
  private isValidFont(font: string): boolean {
    return Object.values(VISUAL_STANDARDS.typography.fonts).includes(font);
  }
  
  private isValidSpacing(spacing: string): boolean {
    return Object.values(VISUAL_STANDARDS.spacing).includes(spacing);
  }
  
  private hasAppropriateTone(content: string): boolean {
    // Check for professional and empathetic tone
    const professionalWords = ['professional', 'certified', 'experienced', 'trusted'];
    const empatheticWords = ['understand', 'help', 'support', 'care'];
    
    return professionalWords.some(word => content.toLowerCase().includes(word)) &&
           empatheticWords.some(word => content.toLowerCase().includes(word));
  }
  
  private hasRequiredKeywords(content: string): boolean {
    const required = WRITING_STYLE.content.keywords.primary;
    const contentLower = content.toLowerCase();
    
    return required.filter(keyword => 
      contentLower.includes(keyword.toLowerCase())
    ).length >= 2;
  }
  
  private hasAppropriateLength(content: string): boolean {
    const wordCount = content.split(' ').length;
    return wordCount >= 40 && wordCount <= 500;
  }
  
  private hasDescriptiveAnchor(link: any): boolean {
    const genericAnchors = ['click here', 'here', 'link', 'more'];
    return !genericAnchors.includes(link.text.toLowerCase());
  }
}

// Export main enhancement function
export function enhanceConsistency(type: 'visual' | 'content' | 'analytics' | 'linking', target: any) {
  const validator = new ConsistencyValidator();
  
  switch(type) {
    case 'visual':
      return {
        issues: validator.validateVisuals(target),
        standards: VISUAL_STANDARDS,
        recommendations: generateVisualRecommendations(target)
      };
      
    case 'content':
      return {
        issues: validator.validateContent(target),
        guidelines: WRITING_STYLE,
        suggestions: generateContentSuggestions(target)
      };
      
    case 'analytics':
      return {
        config: ANALYTICS_CONFIG,
        implementation: generateAnalyticsImplementation(target)
      };
      
    case 'linking':
      return {
        issues: validator.validateLinks(target),
        strategy: LINKING_STRATEGY,
        opportunities: generateLinkingOpportunities(target)
      };
  }
}

function generateVisualRecommendations(target: any): string[] {
  return [
    `Use primary color ${VISUAL_STANDARDS.colors.primary.disaster} for CTAs`,
    `Apply consistent spacing of ${VISUAL_STANDARDS.spacing.md} between sections`,
    `Ensure all headings use ${VISUAL_STANDARDS.typography.fonts.heading}`,
    `Add shadow ${VISUAL_STANDARDS.shadows.lg} to cards for depth`
  ];
}

function generateContentSuggestions(target: string): string[] {
  return [
    'Add location-specific keywords for better local SEO',
    'Include trust signals like certifications and insurance',
    'Use action-oriented language in CTAs',
    'Add urgency indicators for emergency services'
  ];
}

function generateAnalyticsImplementation(target: any): object {
  return {
    gtag: `
      gtag('config', '${ANALYTICS_CONFIG.tracking.ga4.measurementId}', {
        page_path: '${target.path}',
        custom_map: ${JSON.stringify(ANALYTICS_CONFIG.tracking.ga4.customDimensions)}
      });
    `,
    events: ANALYTICS_CONFIG.tracking.ga4.events,
    goals: ANALYTICS_CONFIG.goals
  };
}

function generateLinkingOpportunities(target: any): string[] {
  const opportunities: string[] = [];
  
  // Internal linking
  opportunities.push(`Link to related service: ${LINKING_STRATEGY.internal.structure.spokes[0]}`);
  opportunities.push(`Add breadcrumb: Home > Services > ${target.service}`);
  
  // External opportunities
  opportunities.push(`Acquire backlink from: ${LINKING_STRATEGY.external.targets.authority[0]}`);
  
  return opportunities;
}

// Export all configurations
export default {
  VISUAL_STANDARDS,
  WRITING_STYLE,
  ANALYTICS_CONFIG,
  LINKING_STRATEGY,
  CRM_CONFIG,
  SEO_CONFIG,
  ConsistencyValidator,
  enhanceConsistency
};