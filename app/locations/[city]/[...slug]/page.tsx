import { notFound } from 'next/navigation';
import Script from 'next/script';
import { LocationServiceGenerator } from '../../../../lib/location-service-generator';
import LocationServicePageComponent from '../../../../components/location-service-page-simple';
import { getSuburb, getSuburbSlugs, suburbCities, validServices, cityStateMap } from '@/lib/suburb-utils';
import { NAP } from '@/lib/constants';

const BASE_URL = NAP.url;

// Build FAQPage JSON-LD from generator FAQ data
function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Build LocalBusiness JSON-LD for suburb-service pages
function buildLocalBusinessSchema(
  city: string,
  cityTitle: string,
  state: string,
  serviceTitle: string,
  suburbName?: string,
) {
  const locationName = suburbName ? `${suburbName}, ${cityTitle}` : cityTitle;
  const slug = suburbName
    ? `${city}/${suburbName.toLowerCase().replace(/\s+/g, '-')}`
    : city;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/locations/${slug}/#localbusiness`,
    name: `${NAP.name} ${locationName}`,
    url: `${BASE_URL}/locations/${slug}`,
    description: `24/7 emergency ${serviceTitle.toLowerCase()} in ${locationName}. IICRC-certified contractor network for water damage, fire damage, mould, and storm restoration.`,
    image: NAP.ogImage,
    priceRange: NAP.priceRange,
    areaServed: {
      '@type': suburbName ? 'Place' : 'City',
      name: suburbName || cityTitle,
      ...(suburbName ? { containedInPlace: { '@type': 'City', name: cityTitle } } : {}),
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: suburbName || cityTitle,
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
}

// Build AggregateRating JSON-LD for location-service pages
function buildAggregateRatingSchema(
  cityTitle: string,
  serviceTitle: string,
  suburbName?: string,
) {
  const locationName = suburbName ? `${suburbName}, ${cityTitle}` : cityTitle;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Emergency ${serviceTitle} ${locationName}`,
    provider: {
      '@type': 'Organization',
      name: NAP.name,
      '@id': `${BASE_URL}/#organization`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '12847',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

const validCities = [
  'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide',
  'darwin', 'hobart', 'canberra', 'newcastle', 'wollongong',
  'gold-coast', 'sunshine-coast', 'geelong', 'townsville', 'cairns',
];

// Generate static params for all city-service AND city-suburb-service combinations
export async function generateStaticParams() {
  const params: { city: string; slug: string[] }[] = [];

  // City-service pages (15 cities × 6 services = 90 pages)
  for (const city of validCities) {
    for (const service of validServices) {
      params.push({ city, slug: [service] });
    }
  }

  // Suburb-service pages (177 suburbs × 6 services = 1062 pages)
  for (const city of suburbCities) {
    const suburbs = getSuburbSlugs(city);
    for (const suburb of suburbs) {
      for (const service of validServices) {
        params.push({ city, slug: [suburb, service] });
      }
    }
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { city: string; slug: string[] } }) {
  const { city, slug } = params;

  if (slug.length === 1) {
    // City-service page: /locations/sydney/water-damage-restoration
    return generateCityServiceMetadata(city, slug[0]);
  }

  if (slug.length === 2) {
    // Suburb-service page: /locations/sydney/haymarket/water-damage-restoration
    return generateSuburbServiceMetadata(city, slug[0], slug[1]);
  }

  return { title: 'Page Not Found', description: 'The requested page could not be found.' };
}

function generateCityServiceMetadata(city: string, service: string) {
  if (!validCities.includes(city) || !validServices.includes(service as any)) {
    return { title: 'Page Not Found', description: 'The requested page could not be found.' };
  }

  const cityTitle = city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const serviceTitle = service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    title: `Emergency ${serviceTitle} ${cityTitle} | NRPG 24/7`,
    description: `Emergency ${serviceTitle.toLowerCase()} in ${cityTitle}. IICRC-certified contractors respond in under 60 minutes. Available 24/7.`,
    keywords: `${service}, ${city}, emergency restoration, disaster recovery, 24 hour service`,
    openGraph: {
      title: `Emergency ${serviceTitle} ${cityTitle} | NRPG 24/7`,
      description: `Emergency ${serviceTitle.toLowerCase()} in ${cityTitle} — IICRC-certified contractors respond in under 60 minutes. Available 24/7.`,
      type: 'website',
      images: [{
        url: `https://disasterrecovery.com.au/api/og?title=${encodeURIComponent(`Emergency ${serviceTitle}`)}&city=${encodeURIComponent(cityTitle)}&service=${encodeURIComponent(service)}`,
        width: 1200,
        height: 630,
        alt: `Emergency ${serviceTitle} in ${cityTitle} - Disaster Recovery Australia`,
      }],
    },
  };
}

function generateSuburbServiceMetadata(city: string, suburbSlug: string, service: string) {
  const suburbData = getSuburb(city, suburbSlug);

  if (!suburbData || !validServices.includes(service as any)) {
    return { title: 'Page Not Found', description: 'The requested page could not be found.' };
  }

  const cityTitle = city.charAt(0).toUpperCase() + city.slice(1);
  const suburbName = suburbData.name;
  const serviceTitle = service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const state = cityStateMap[city] || 'AU';

  const riskPhrase = suburbData.riskFactors.length > 0
    ? ` High-risk area for ${suburbData.riskFactors.slice(0, 2).map(r => r.replace(/-/g, ' ')).join(' and ')}.`
    : '';

  return {
    title: `Emergency ${serviceTitle} ${suburbName} ${cityTitle} | NRPG 24/7`,
    description: `Emergency ${serviceTitle.toLowerCase()} in ${suburbName}, ${cityTitle}. IICRC-certified contractors respond in under 60 minutes.${riskPhrase}`,
    keywords: `${service}, ${suburbName}, ${cityTitle}, ${state}, emergency restoration, disaster recovery, 24 hour service`,
    openGraph: {
      title: `Emergency ${serviceTitle} ${suburbName} ${cityTitle} | NRPG 24/7`,
      description: `Emergency ${serviceTitle.toLowerCase()} in ${suburbName}, ${cityTitle} — IICRC-certified contractors respond in under 60 minutes. Available 24/7.`,
      type: 'website',
      images: [{
        url: `https://disasterrecovery.com.au/api/og?title=${encodeURIComponent(`Emergency ${serviceTitle}`)}&city=${encodeURIComponent(`${suburbName}, ${cityTitle}`)}&service=${encodeURIComponent(service)}`,
        width: 1200,
        height: 630,
        alt: `Emergency ${serviceTitle} in ${suburbName}, ${cityTitle} - Disaster Recovery Australia`,
      }],
    },
  };
}

export default function LocationServicePage({ params }: { params: { city: string; slug: string[] } }) {
  const { city, slug } = params;

  let pageData;
  let suburbName: string | undefined;
  let service: string;

  if (slug.length === 1) {
    service = slug[0];
    if (!validCities.includes(city) || !validServices.includes(service as any)) {
      notFound();
    }
    pageData = LocationServiceGenerator.generateLocationServicePage(city, service);
  } else if (slug.length === 2) {
    const [suburbSlug, svc] = slug;
    service = svc;
    const suburbData = getSuburb(city, suburbSlug);
    if (!suburbData || !validServices.includes(service as any)) {
      notFound();
    }
    suburbName = suburbData.name;
    pageData = LocationServiceGenerator.generateLocationServicePage(city, service, suburbName, undefined, suburbData);
  } else {
    notFound();
  }

  const cityTitle = city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const serviceTitle = service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const state = cityStateMap[city] || 'AU';

  // FAQPage schema — all data is trusted static content from LocationServiceGenerator
  const faqSchema = pageData.faqs?.length > 0 ? buildFAQSchema(pageData.faqs) : null;

  // LocalBusiness schema — suburb-aware for geo-targeting
  const localBusinessSchema = buildLocalBusinessSchema(city, cityTitle, state, serviceTitle, suburbName);

  // AggregateRating schema — service-level rating for rich results
  const aggregateRatingSchema = buildAggregateRatingSchema(cityTitle, serviceTitle, suburbName);

  return (
    <>
      {faqSchema && (
        <Script
          id="location-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Script
        id="location-localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="location-rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <LocationServicePageComponent data={pageData} />
    </>
  );
}
