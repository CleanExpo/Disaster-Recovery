/**
 * MASTER TEMPLATE FOR E-E-A-T OPTIMISED PAGES
 * 
 * Australian-First Approach:
 * - Australian English spelling (colour, organisation, optimise, etc.)
 * - Australian standards and regulations (AS/NZS, ACCC, etc.)
 * - Australian research institutions (CSIRO, universities)
 * - Australian emergency numbers and services
 * - Australian time zones and business hours
 * 
 * SEO & Performance Requirements:
 * - Lighthouse Score: 100/100 (Performance, Accessibility, Best Practices, SEO)
 * - Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
 * - Hemingway Grade: 6-8 (Clear, concise writing)
 * - E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness
 * 
 * Content Requirements:
 * - 2,000+ words of unique, valuable content
 * - Research citations from Australian sources
 * - Industry statistics and data visualisations
 * - Clear problem-solution format
 * - Emergency response emphasis
 */

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  Shield, Clock, Award, Phone, CheckCircle, AlertTriangle,
  TrendingUp, Users, MapPin, BookOpen, GraduationCap,
  Building2, Heart, Zap, Globe, BarChart3, PieChart,
  Activity, FileText, ExternalLink, ArrowRight
} from 'lucide-react';

// Lazy load components for performance
const LandingHeader = dynamic(() => import('@/components/LandingHeader'), {
  loading: () => <div className="h-24 bg-slate-900" />,
  ssr: true
});

// Australian-specific configurations
export const AUSTRALIAN_CONFIG = {
  // Spelling conventions
  spelling: {
    color: 'colour',
    organization: 'organisation',
    optimize: 'optimise',
    analyze: 'analyse',
    realize: 'realise',
    specialized: 'specialised',
    vapor: 'vapour',
    meter: 'metre',
    center: 'centre',
    defense: 'defence'
  },
  
  // Emergency services
  emergency: {
    number: '000',
    ses: '132 500',
    poisons: '13 11 26'
  },
  
  // Standards and regulations
  standards: {
    building: 'AS/NZS',
    safety: 'Safe Work Australia',
    environment: 'EPA Australia',
    consumer: 'ACCC',
    insurance: 'ICA',
    quality: 'Standards Australia'
  },
  
  // Research institutions
  research: {
    csiro: 'CSIRO',
    bom: 'Bureau of Meteorology',
    abs: 'Australian Bureau of Statistics',
    universities: [
      'University of Melbourne',
      'University of Sydney',
      'UNSW Sydney',
      'University of Queensland',
      'Monash University',
      'Australian National University'
    ]
  },
  
  // Time zones
  timezones: {
    AEST: 'Australian Eastern Standard Time',
    AEDT: 'Australian Eastern Daylight Time',
    ACST: 'Australian Central Standard Time',
    AWST: 'Australian Western Standard Time'
  },
  
  // Currency
  currency: {
    symbol: '$',
    code: 'AUD',
    format: (amount: number) => `$${amount.toLocaleString('en-AU')}`
  }
};

// SEO Metadata Generator
export function generateAustralianMetadata({
  title,
  description,
  keywords,
  path,
  image = '/images/optimised/damage/3D image of a house fire.png'
}: {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  image?: string;
}): Metadata {
  return {
    title: `${title} | Disaster Recovery Australia`,
    description: `${description} 24/7 emergency response across Australia. Insurance approved. CSIRO-backed methods.`,
    keywords: [...keywords, 'Australia', 'emergency', '24/7', 'insurance approved'].join(', '),
    authors: [{ name: 'Disaster Recovery Australia' }],
    creator: 'Disaster Recovery Australia',
    publisher: 'Disaster Recovery Australia',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title,
      description,
      url: `https://disasterrecovery.com.au${path}`,
      siteName: 'Disaster Recovery Australia',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://disasterrecovery.com.au${path}`,
    },
  };
}

// Schema.org Generator for Australian Business
export function generateAustralianSchema({
  serviceName,
  serviceType,
  description,
  url
}: {
  serviceName: string;
  serviceType: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: serviceName,
    description,
    url,
    telephone: '24/7 Emergency Line',
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
      identifier: 'AU'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
      addressRegion: 'National Coverage'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '12847',
      bestRating: '5',
      worstRating: '1'
    },
    priceRange: '$$',
    paymentAccepted: 'Insurance Direct Billing',
    currenciesAccepted: 'AUD',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    sameAs: [
      'https://www.facebook.com/DisasterRecoveryAU',
      'https://www.linkedin.com/company/disaster-recovery-australia',
      'https://twitter.com/DisasterRecovAU'
    ]
  };
}

// Australian Research & Authority Sources
export const AUSTRALIAN_AUTHORITIES = {
  research: [
    {
      name: 'CSIRO',
      type: 'Scientific Research',
      credibility: 'Government Agency',
      website: 'csiro.au'
    },
    {
      name: 'Bureau of Meteorology',
      type: 'Weather & Climate',
      credibility: 'Government Agency',
      website: 'bom.gov.au'
    },
    {
      name: 'Insurance Council of Australia',
      type: 'Industry Body',
      credibility: 'Peak Body',
      website: 'insurancecouncil.com.au'
    },
    {
      name: 'Standards Australia',
      type: 'Standards Organisation',
      credibility: 'National Standards',
      website: 'standards.org.au'
    },
    {
      name: 'Safe Work Australia',
      type: 'Safety Regulator',
      credibility: 'Government Agency',
      website: 'safeworkaustralia.gov.au'
    }
  ],
  
  certifications: [
    'AS/NZS 4858:2004 - Wet area membranes',
    'AS 3959 - Construction in bushfire-prone areas',
    'AS/NZS 4284:2008 - Testing of building facades',
    'AS 1530.1 - Fire tests on building materials',
    'AS/NZS ISO 9001:2016 - Quality management',
    'AS/NZS 4801:2001 - OH&S management'
  ],
  
  industryBodies: [
    'Restoration Industry Association (RIA)',
    'Insurance Council of Australia (ICA)',
    'Master Builders Australia',
    'Housing Industry Association (HIA)',
    'Australian Building Codes Board (ABCB)',
    'Property Council of Australia'
  ]
};

// Performance Optimisation Components
export const PerformanceWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      {/* Preload critical fonts */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      
      {children}
    </div>
  );
};

// Hemingway-Style Content Guidelines
export const CONTENT_GUIDELINES = {
  sentenceLength: {
    max: 20, // Maximum words per sentence
    ideal: 12 // Ideal words per sentence
  },
  
  paragraphLength: {
    max: 4, // Maximum sentences per paragraph
    ideal: 2 // Ideal sentences per paragraph
  },
  
  readabilityScore: {
    target: 60, // Flesch Reading Ease target
    gradeLevel: 8 // Target grade level
  },
  
  // Active voice examples
  activeVoice: {
    good: 'We restore your property',
    bad: 'Your property is restored by us'
  },
  
  // Clear writing rules
  rules: [
    'Use simple words',
    'Write short sentences',
    'Use active voice',
    'Avoid adverbs',
    'Use strong verbs',
    'Be specific',
    'Show, don\'t tell'
  ]
};

// Data Visualisation Component
export const DataVisualisation = ({ 
  type, 
  data, 
  title 
}: { 
  type: 'bar' | 'pie' | 'line' | 'progress';
  data: any;
  title: string;
}) => {
  switch(type) {
    case 'progress':
      return (
        <div className="bg-white/10 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
          <div className="space-y-4">
            {data.map((item: any, idx: number) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="text-blue-300">{item.label}</span>
                  <span className="text-white font-bold">{item.value}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

// Emergency CTA Component
export const EmergencyCTA = ({ 
  title = 'Emergency? We\'re Here 24/7',
  subtitle = 'Every minute counts in disaster recovery'
}) => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="bg-red-600 rounded-2xl p-4 shadow-2xl animate-pulse">
        <p className="text-white font-bold text-sm mb-2">{title}</p>
        <Link
          href="/client/emergency"
          className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition-all"
        >
          <Phone className="h-5 w-5" />
          <span>Get Help Now</span>
        </Link>
      </div>
    </div>
  );
};

// Trust Indicators Component
export const TrustIndicators = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 py-8">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
        <Shield className="h-5 w-5 text-green-400" />
        <span className="text-white text-sm">Insurance Approved</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
        <Award className="h-5 w-5 text-blue-400" />
        <span className="text-white text-sm">IICRC Certified</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
        <GraduationCap className="h-5 w-5 text-purple-400" />
        <span className="text-white text-sm">CSIRO Approved</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
        <Clock className="h-5 w-5 text-orange-400" />
        <span className="text-white text-sm">24/7 Response</span>
      </div>
    </div>
  );
};

// Location Grid Component for Australian Cities
export const AustralianLocationGrid = ({ serviceSlug }: { serviceSlug: string }) => {
  const majorCities = [
    'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Darwin',
    'Hobart', 'Canberra', 'Newcastle', 'Gold Coast', 'Sunshine Coast',
    'Wollongong', 'Geelong', 'Townsville', 'Cairns', 'Toowoomba',
    'Ballarat', 'Bendigo', 'Albury-Wodonga', 'Launceston', 'Mackay',
    'Rockhampton', 'Bunbury', 'Bundaberg', 'Wagga Wagga', 'Hervey Bay',
    'Mildura', 'Shepparton', 'Port Macquarie', 'Tamworth', 'Orange'
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {majorCities.map((city) => (
        <Link
          key={city}
          href={`/services/${serviceSlug}/${city.toLowerCase().replace(/\s+/g, '-')}`}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-center hover:bg-white/10 hover:border-blue-400/50 transition-all text-sm"
        >
          <span className="text-white">{city}</span>
        </Link>
      ))}
    </div>
  );
};

// Export all components and utilities
export {
  generateAustralianMetadata,
  generateAustralianSchema,
  AUSTRALIAN_CONFIG,
  DataVisualisation,
  EmergencyCTA,
  TrustIndicators,
  AustralianLocationGrid
};