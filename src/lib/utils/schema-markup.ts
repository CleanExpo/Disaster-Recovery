/**
 * Schema.org structured data utilities for SEO optimization
 * Implements JSON-LD schema markup for disaster recovery content
 */

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    addressCountry: string;
    addressRegion: string;
  };
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string;
  };
  sameAs: string[];
}

export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article' | 'BlogPosting' | 'NewsArticle';
  headline: string;
  description: string;
  author: {
    '@type': 'Person' | 'Organization';
    name: string;
    url?: string;
  };
  datePublished: string;
  dateModified: string;
  image?: string[];
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
  keywords?: string[];
}

export interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
  };
  areaServed: {
    '@type': 'Country' | 'State';
    name: string;
  };
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: Array<{
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
        description: string;
      };
    }>;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    reviewCount: string;
  };
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  '@id': string;
  name: string;
  image: string;
  url: string;
  telephone: string;
  priceRange: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  sameAs: string[];
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface HowToSchema {
  '@context': 'https://schema.org';
  '@type': 'HowTo';
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  estimatedCost?: {
    '@type': 'MonetaryAmount';
    currency: string;
    value: string;
  };
  supply?: Array<{
    '@type': 'HowToSupply';
    name: string;
  }>;
  tool?: Array<{
    '@type': 'HowToTool';
    name: string;
  }>;
  step: Array<{
    '@type': 'HowToStep';
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>;
}

// Trust signal schemas for E-E-A-T
export interface ReviewSchema {
  '@context': 'https://schema.org';
  '@type': 'Review';
  itemReviewed: {
    '@type': 'Service' | 'Organization';
    name: string;
  };
  reviewRating: {
    '@type': 'Rating';
    ratingValue: string;
    bestRating: string;
  };
  author: {
    '@type': 'Person';
    name: string;
  };
  datePublished: string;
  reviewBody: string;
}

// Emergency service schema for crisis-oriented content
export interface EmergencyServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'EmergencyService';
  name: string;
  description: string;
  telephone: string;
  availableChannel: {
    '@type': 'ServiceChannel';
    serviceUrl: string;
    servicePhone: string;
    availableLanguage: {
      '@type': 'Language';
      name: string;
    };
  };
  potentialAction: {
    '@type': 'Action';
    name: string;
    target: string;
  };
}

/**
 * Generate organization schema for the main website
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'National Restoration Professionals (NRP)',
    url: 'https://disasterrecovery.com.au',
    logo: 'https://disasterrecovery.com.au/logo.png',
    description: 'Professional disaster recovery and emergency restoration services across Australia. IICRC certified, 24/7 emergency response.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
      addressRegion: 'Australia'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+61-1300-DISASTER',
      contactType: 'Emergency Services',
      areaServed: 'AU',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://www.linkedin.com/company/national-restoration-professionals',
      'https://www.facebook.com/NRPAustralia',
      'https://twitter.com/NRPAustralia'
    ]
  };
}

/**
 * Generate article schema for guides and blog posts
 */
export function generateArticleSchema(
  headline: string,
  description: string,
  datePublished: string,
  dateModified: string,
  url: string,
  keywords?: string[]
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': 'Organization',
      name: 'National Restoration Professionals',
      url: 'https://disasterrecovery.com.au'
    },
    datePublished,
    dateModified,
    publisher: {
      '@type': 'Organization',
      name: 'National Restoration Professionals',
      logo: {
        '@type': 'ImageObject',
        url: 'https://disasterrecovery.com.au/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    keywords
  };
}

/**
 * Generate service schema for disaster recovery services
 */
export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  rating?: { value: string; count: string }
): ServiceSchema {
  const schema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'Organization',
      name: 'National Restoration Professionals'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Australia'
    }
  };

  if (rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating.value,
      reviewCount: rating.count
    };
  }

  return schema;
}

/**
 * Generate FAQ schema for frequently asked questions
 */
export function generateFAQSchema(questions: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question' as const,
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: q.answer
      }
    }))
  };
}

/**
 * Generate breadcrumb schema for navigation
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Generate emergency service schema for crisis response
 */
export function generateEmergencyServiceSchema(): EmergencyServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    name: '24/7 Emergency Disaster Response',
    description: 'Immediate emergency response for water damage, fire damage, storm damage, and mould remediation across Australia',
    telephone: '1300-DISASTER',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://disasterrecovery.com.au/emergency',
      servicePhone: '+61-1300-DISASTER',
      availableLanguage: {
        '@type': 'Language',
        name: 'English'
      }
    },
    potentialAction: {
      '@type': 'Action',
      name: 'Request Emergency Help',
      target: 'https://disasterrecovery.com.au/emergency-response'
    }
  };
}

/**
 * Helper function to inject schema into page head
 */
export function injectSchema(schema: any): string {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}