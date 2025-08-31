/**
 * LANDING PAGE CONTENT - REAL DATA
 * All metrics and content for public-facing pages
 */

import { BUSINESS_CONFIG } from './real-business-data';

export const HERO_CONTENT = {
  headline: 'Australia\'s AI-Powered Disaster Recovery Network',
  subheadline: 'Connecting 115,350+ contractors to insurance claims in under 60 minutes',
  ctaPrimary: 'Join as Contractor',
  ctaSecondary: 'View Investor Deck',
  trustBadges: [
    'IICRC Certified Network',
    '24/7 Online Emergency Response',
    'Insurance Approved',
    'AI-Powered Matching'
  ],
  emergencyBanner: {
    show: true,
    text: 'AI-Powered Disaster Recovery Platform - Join Our Network',
    color: 'bg-blue-600'
  }
};

export const METRICS_SECTION = {
  title: 'The Platform Built for Scale',
  subtitle: 'Real numbers that demonstrate our market opportunity',
  metrics: [
    {
      value: '$4.2B',
      label: 'Total Market Size',
      description: 'Australian disaster recovery market growing at 8.7% annually',
      icon: 'TrendingUp'
    },
    {
      value: '115,350',
      label: 'Contractors Nationwide',
      description: 'Total addressable contractor network across Australia',
      icon: 'Users'
    },
    {
      value: '60min',
      label: 'Response Time',
      description: 'Target response vs 45-day industry average',
      icon: 'Clock'
    },
    {
      value: '95%',
      label: 'Automation Rate',
      description: 'Fully automated operations with AI orchestration',
      icon: 'Bot'
    }
  ]
};

export const SERVICES_CONTENT = {
  title: 'Comprehensive Disaster Recovery Services',
  subtitle: 'Every disaster type, every property type, everywhere in Australia',
  categories: [
    {
      name: 'Water Damage',
      percentage: 40,
      services: [
        'Burst Pipes',
        'Flood Recovery',
        'Storm Water',
        'Sewage Cleanup',
        'Structural Drying'
      ],
      averageJobValue: 8500,
      responseTime: '1 hour'
    },
    {
      name: 'Fire & Smoke',
      percentage: 25,
      services: [
        'Fire Damage',
        'Smoke Removal',
        'Soot Cleanup',
        'Odour Treatment',
        'Contents Restoration'
      ],
      averageJobValue: 15000,
      responseTime: '2 hours'
    },
    {
      name: 'Mould Remediation',
      percentage: 15,
      services: [
        'Black Mould',
        'HVAC Mould',
        'Crawl Space',
        'Bathroom Mould',
        'Commercial Mould'
      ],
      averageJobValue: 5000,
      responseTime: '24 hours'
    },
    {
      name: 'Storm Damage',
      percentage: 12,
      services: [
        'Cyclone Damage',
        'Hail Damage',
        'Wind Damage',
        'Tree Damage',
        'Emergency Tarping'
      ],
      averageJobValue: 12000,
      responseTime: '1 hour'
    },
    {
      name: 'Biohazard',
      percentage: 8,
      services: [
        'Crime Scene',
        'Unattended Death',
        'Hoarding',
        'Drug Lab',
        'Infectious Disease'
      ],
      averageJobValue: 7500,
      responseTime: '2 hours'
    }
  ]
};

export const CONTRACTOR_BENEFITS = {
  title: 'Join Australia\'s Largest Recovery Network',
  subtitle: 'Get qualified insurance leads delivered directly to you',
  benefits: [
    {
      title: 'Qualified Leads Only',
      description: 'Pre-verified insurance claims with motivated property owners',
      value: '$100-300 per lead'
    },
    {
      title: 'Your Service Area',
      description: 'Choose your radius from 25km to state-wide coverage',
      value: '25-500km radius'
    },
    {
      title: 'No Marketing Costs',
      description: 'We handle all SEO, advertising, and lead generation',
      value: 'Save $5K+/month'
    },
    {
      title: 'Instant Payment',
      description: 'Get paid immediately upon job completion',
      value: 'Same-day settlement'
    },
    {
      title: 'Performance Rewards',
      description: 'Higher ratings = priority access to premium leads',
      value: 'Up to 30% discount'
    },
    {
      title: 'Full Support',
      description: 'Training, certification help, and dedicated support',
      value: '24/7 assistance'
    }
  ],
  pricingTiers: [
    {
      name: 'Local',
      radius: '25km',
      price: 299,
      leads: 20,
      features: ['Basic dashboard', 'Email alerts', 'Standard support']
    },
    {
      name: 'Regional',
      radius: '50km',
      price: 599,
      leads: 50,
      features: ['Full dashboard', 'SMS + Email', 'Priority support', 'Analytics'],
      popular: true
    },
    {
      name: 'Metro',
      radius: '75km',
      price: 999,
      leads: 100,
      features: ['Advanced dashboard', 'All notifications', 'Dedicated support', 'API access']
    },
    {
      name: 'Enterprise',
      radius: '100km+',
      price: 1999,
      leads: 'Unlimited',
      features: ['White-label option', 'Custom integration', 'Account manager', 'Training']
    }
  ]
};

export const PROPERTY_TYPES = {
  title: 'Every Property Type Covered',
  subtitle: 'From residential homes to offshore oil rigs',
  types: [
    {
      category: 'Residential',
      percentage: 65,
      examples: [
        'Single homes',
        'Apartments',
        'Townhouses',
        'High-rises (up to 80 floors)',
        'Granny flats',
        'Retirement villages'
      ]
    },
    {
      category: 'Commercial',
      percentage: 25,
      examples: [
        'Office buildings',
        'Retail stores',
        'Shopping centers',
        'Hotels & motels',
        'Restaurants',
        'Medical centers'
      ]
    },
    {
      category: 'Industrial',
      percentage: 7,
      examples: [
        'Warehouses',
        'Factories',
        'Distribution centers',
        'Cold storage',
        'Data centers',
        'Processing plants'
      ]
    },
    {
      category: 'Institutional',
      percentage: 3,
      examples: [
        'Hospitals',
        'Schools',
        'Government buildings',
        'Churches',
        'Museums',
        'Sports facilities'
      ]
    }
  ],
  specialCases: [
    'Offshore oil rigs',
    'Mining sites',
    'Remote facilities',
    'PNG operations',
    'Military bases',
    'Critical infrastructure'
  ]
};

export const TECHNOLOGY_STACK = {
  title: 'Technology That Scales',
  subtitle: 'Built for millions of users from day one',
  features: [
    {
      name: 'AI Orchestration',
      description: 'Claude 3.5 Sonnet powers all interactions',
      specs: ['24/7 availability', 'Natural language', 'Multi-agent system']
    },
    {
      name: 'Auto-Scaling Infrastructure',
      description: 'Vercel + Supabase + Redis architecture',
      specs: ['99.9% uptime', '200ms response', '10K concurrent users']
    },
    {
      name: 'SEO Domination Engine',
      description: 'Programmatic page generation at scale',
      specs: ['1000 pages/week', '15,387 locations', '45 services each']
    },
    {
      name: 'Real-Time Matching',
      description: 'Instant contractor-to-lead assignment',
      specs: ['60-second matching', 'Multi-factor scoring', 'Performance-based']
    }
  ]
};

export const INSURANCE_PARTNERS = {
  title: 'Insurance Integration Ready',
  subtitle: 'Direct API connections with major insurers',
  targetPartners: [
    { name: 'Suncorp', logo: '/logos/suncorp.png', status: 'In Discussion' },
    { name: 'IAG', logo: '/logos/iag.png', status: 'Planned' },
    { name: 'Allianz', logo: '/logos/allianz.png', status: 'Planned' },
    { name: 'QBE', logo: '/logos/qbe.png', status: 'Planned' },
    { name: 'RACQ', logo: '/logos/racq.png', status: 'Planned' },
    { name: 'Youi', logo: '/logos/youi.png', status: 'Planned' }
  ],
  benefits: [
    'Direct claims feed',
    'Instant contractor dispatch',
    'Real-time status updates',
    'Compliance reporting',
    'Quality assurance',
    'Cost reduction'
  ]
};

export const INVESTOR_SECTION = {
  title: 'Investment Opportunity',
  subtitle: 'Join us in building Australia\'s disaster recovery monopoly',
  highlights: [
    {
      metric: '$2M',
      label: 'Seed Round',
      description: 'Q1 2025 target'
    },
    {
      metric: '$10M',
      label: 'Pre-money Valuation',
      description: 'Conservative entry'
    },
    {
      metric: '30:1',
      label: 'LTV:CAC Ratio',
      description: 'Exceptional unit economics'
    },
    {
      metric: '85%',
      label: 'Gross Margin',
      description: 'Software-level margins'
    },
    {
      metric: '$40M',
      label: 'Year 3 Revenue',
      description: 'Conservative projection'
    },
    {
      metric: '10x',
      label: 'Exit Multiple',
      description: '5-7 year timeline'
    }
  ],
  usesOfFunds: [
    { category: 'Product Development', percentage: 40 },
    { category: 'Market Expansion', percentage: 30 },
    { category: 'Team Building', percentage: 20 },
    { category: 'Operations', percentage: 10 }
  ],
  cta: {
    text: 'Download Full Pitch Deck',
    action: '/demo/investor-pitch',
    secondary: 'Schedule Meeting',
    calendar: 'https://calendly.com/disaster-recovery/investor'
  }
};

export const FOOTER_CONTENT = {
  companyInfo: {
    name: 'Disaster Recovery',
    tagline: 'Australia\'s AI-Powered Disaster Recovery Network',
    description: 'Connecting insurance claims to qualified contractors nationwide with zero human intervention.',
    abn: 'ABN: 85 151 794 142',
    address: 'Brisbane, Queensland, Australia',
    designCredit: 'Website by Zenith | Part of Unite-Group Agency'
  },
  contact: {
    
    emergency: null, // No email service
    email: 'contractors@disasterrecovery.com.au',
    contractor: 'contractors@disasterrecovery.com.au',
    investor: 'contractors@disasterrecovery.com.au'
  },
  links: {
    contractors: [
      { label: 'Join Network', href: '/contractors/apply' },
      { label: 'Login', href: '/contractor/login' },
      { label: 'Pricing', href: '/contractors/pricing' },
      { label: 'Training', href: '/contractors/training' },
      { label: 'Support', href: '/contractors/support' }
    ],
    services: [
      { label: 'Water Damage', href: '/services/water-damage' },
      { label: 'Fire Restoration', href: '/services/fire-damage' },
      { label: 'Mould Remediation', href: '/services/mould-remediation' },
      { label: 'Storm Damage', href: '/services/storm-damage' },
      { label: 'Biohazard Cleanup', href: '/services/biohazard' }
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Investor Relations', href: '/investors' },
      { label: 'Technology', href: '/technology' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' }
    ],
    legal: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Contractor Agreement', href: '/contractor-agreement' },
      { label: 'Insurance Partners', href: '/insurance-partners' }
    ]
  },
  certifications: [
    'IICRC Certified Network',
    'ISO 9001 (Pending)',
    'Australian Privacy Act Compliant',
    'PCI DSS Compliant'
  ],
  socialMedia: {
    linkedin: 'https://linkedin.com/company/disaster-recovery-au',
    facebook: 'https://facebook.com/DisasterRecoveryAU',
    instagram: 'https://instagram.com/disasterrecoveryau',
    youtube: 'https://youtube.com/@DisasterRecoveryAU'
  }
};