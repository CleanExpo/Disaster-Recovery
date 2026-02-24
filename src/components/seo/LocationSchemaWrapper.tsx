'use client';

import Script from 'next/script';

interface LocationSchemaWrapperProps {
  city: string;
  state: string;
  stateFullName: string;
  breadcrumbs: { label: string; href?: string }[];
  faqs?: { question: string; answer: string }[];
}

const STATE_FULL_NAMES: Record<string, string> = {
  NSW: 'New South Wales',
  VIC: 'Victoria',
  QLD: 'Queensland',
  WA: 'Western Australia',
  SA: 'South Australia',
  TAS: 'Tasmania',
  NT: 'Northern Territory',
  ACT: 'Australian Capital Territory',
  AKL: 'Auckland Region',
};

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  sydney: { lat: -33.8688, lng: 151.2093 },
  melbourne: { lat: -37.8136, lng: 144.9631 },
  brisbane: { lat: -27.4705, lng: 153.026 },
  perth: { lat: -31.9505, lng: 115.8605 },
  adelaide: { lat: -34.9285, lng: 138.6007 },
  hobart: { lat: -42.8821, lng: 147.3272 },
  darwin: { lat: -12.4634, lng: 130.8456 },
  canberra: { lat: -35.2809, lng: 149.13 },
  'gold-coast': { lat: -28.0167, lng: 153.4 },
  newcastle: { lat: -32.9283, lng: 151.7817 },
  auckland: { lat: -36.8485, lng: 174.7633 },
};

const BASE_URL = 'https://disasterrecovery.com.au';

function getDefaultFAQs(city: string, state: string): { question: string; answer: string }[] {
  const fullState = STATE_FULL_NAMES[state] ?? state;
  return [
    {
      question: `How quickly can you respond to emergencies in ${city}?`,
      answer: `Our network of IICRC-certified contractors in ${city}, ${fullState} provides 24/7 emergency response. Submit your claim online and receive contractor quotes within 30-60 minutes.`,
    },
    {
      question: `What disaster recovery services are available in ${city}?`,
      answer: `We connect ${city} property owners with certified contractors for water damage restoration, fire damage restoration, mould remediation, storm damage repair, flood recovery, sewage cleanup, and biohazard cleaning.`,
    },
    {
      question: `Is insurance accepted for disaster recovery in ${city}?`,
      answer: `Yes. Our vetted contractors bill you directly so work begins immediately. We provide full claims documentation to support your reimbursement with any major Australian insurer. Payment plans are available.`,
    },
    {
      question: `Are contractors in ${city} certified?`,
      answer: `All contractors in our ${city} network must maintain current IICRC certification, carry public liability insurance, and meet strict Disaster Recovery Network quality standards.`,
    },
  ];
}

export function LocationSchemaWrapper({
  city,
  state,
  stateFullName,
  breadcrumbs,
  faqs,
}: LocationSchemaWrapperProps) {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const coords = CITY_COORDS[citySlug] ?? { lat: -25.2744, lng: 133.7751 };
  const resolvedFaqs = faqs ?? getDefaultFAQs(city, state);
  const fullState = stateFullName || STATE_FULL_NAMES[state] || state;

  // All schema data is hardcoded/derived from trusted props — no user input in JSON-LD
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/locations/${citySlug}/#service`,
    name: `Disaster Recovery ${city} - 24/7 Emergency Restoration`,
    url: `${BASE_URL}/locations/${citySlug}`,
    description: `Professional disaster recovery and emergency restoration services in ${city}, ${fullState}. IICRC-certified contractors available 24/7 for water damage, fire damage, mould remediation, and storm damage.`,
    serviceType: 'Damage Restoration Service',
    provider: {
      '@id': `${BASE_URL}/#organization`,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: coords.lat,
        longitude: coords.lng,
      },
      geoRadius: '100000',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${BASE_URL}/claim/start`,
      availableLanguage: 'English',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Disaster Recovery Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Water Damage Restoration',
            description: `24/7 emergency water extraction and structural drying in ${city}`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fire Damage Restoration',
            description: `Smoke damage cleanup, soot removal, and structural repairs in ${city}`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mould Remediation',
            description: `IICRC certified mould removal and prevention in ${city}`,
          },
        },
      ],
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${BASE_URL}${crumb.href}` } : {}),
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: resolvedFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // LocalBusiness (ProfessionalService) schema for local search pack visibility
  // All data derived from trusted server-side props — no user input
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/locations/${citySlug}/#localbusiness`,
    name: `Disaster Recovery ${city}`,
    url: `${BASE_URL}/locations/${citySlug}`,
    description: `24/7 emergency disaster recovery and property restoration services in ${city}, ${fullState}. IICRC-certified contractor network for water damage, fire damage, mould, and storm restoration.`,
    image: `${BASE_URL}/images/disaster-recovery-og.jpg`,
    priceRange: '$$',
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: {
        '@type': 'State',
        name: fullState,
      },
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coords.lat,
      longitude: coords.lng,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: state,
      addressCountry: 'AU',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    parentOrganization: {
      '@id': `${BASE_URL}/#organization`,
    },
  };

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Disaster Recovery ${city} - 24/7 Emergency Restoration`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.ag-hero-h1', '.ag-hero-national-tagline', '.ag-section-heading', '.ag-section-body p:first-child'],
    },
    url: `${BASE_URL}/locations/${citySlug}`,
  };

  // All dangerouslySetInnerHTML usage below contains only JSON.stringify'd
  // objects built from trusted server-side props — safe from XSS
  return (
    <>
      <Script
        id={`location-service-schema-${citySlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id={`location-breadcrumb-schema-${citySlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id={`location-faq-schema-${citySlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id={`location-localbusiness-schema-${citySlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id={`location-speakable-schema-${citySlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
    </>
  );
}
