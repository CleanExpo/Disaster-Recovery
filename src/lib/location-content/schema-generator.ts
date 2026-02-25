import type { LocationData } from '../../../data/locations/_schema';
import type { FAQEntry } from './faq-generator';

const BASE_URL = 'https://disasterrecovery.com.au';

export function generateLocationSchemas(
  data: LocationData,
  faqs: FAQEntry[],
  breadcrumbs: { label: string; href?: string }[],
) {
  const { slug, city, state, stateFullName, coordinates, suburbs } = data;

  // All schema data is built from trusted static JSON — no user input interpolated
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/locations/${slug}/#service`,
    name: `Disaster Recovery ${city} - 24/7 Emergency Restoration`,
    url: `${BASE_URL}/locations/${slug}`,
    description: `Professional disaster recovery and emergency restoration services in ${city}, ${stateFullName}. IICRC-certified contractors available 24/7 for water damage, fire damage, mould remediation, and storm damage.`,
    serviceType: 'Damage Restoration Service',
    provider: {
      '@id': `${BASE_URL}/#organization`,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
      geoRadius: '100000',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${BASE_URL}/claim`,
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

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${BASE_URL}${crumb.href}` } : {}),
    })),
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/locations/${slug}/#localbusiness`,
    name: `Disaster Recovery ${city}`,
    url: `${BASE_URL}/locations/${slug}`,
    description: `24/7 emergency disaster recovery and property restoration services in ${city}, ${stateFullName}. IICRC-certified contractor network for water damage, fire damage, mould, and storm restoration.`,
    image: `${BASE_URL}/images/disaster-recovery-og.jpg`,
    priceRange: '$2,200+',
    areaServed: [
      {
        '@type': 'City',
        name: city,
        containedInPlace: {
          '@type': 'State',
          name: stateFullName,
        },
      },
      ...suburbs.slice(0, 10).map(s => ({
        '@type': 'Place',
        name: s.name,
      })),
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coordinates.lat,
      longitude: coordinates.lng,
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

  return {
    service,
    breadcrumbList,
    faqPage,
    localBusiness,
  };
}
