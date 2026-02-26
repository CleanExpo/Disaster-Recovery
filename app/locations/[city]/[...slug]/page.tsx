import { notFound } from 'next/navigation';
import { LocationServiceGenerator } from '../../../../lib/location-service-generator';
import LocationServicePageComponent from '../../../../components/location-service-page-simple';
import { getSuburb, getSuburbSlugs, suburbCities, validServices, cityStateMap } from '@/lib/suburb-utils';

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

  // Suburb-service pages (58 suburbs × 6 services = 348 pages)
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
    description: `Need emergency ${serviceTitle.toLowerCase()} in ${cityTitle}? NRPG connects you with IICRC-certified contractors in under 60 minutes. Available 24/7 across ${cityTitle}.`,
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
    description: `Need emergency ${serviceTitle.toLowerCase()} in ${suburbName}, ${cityTitle}? NRPG connects you with IICRC-certified contractors in under 60 minutes.${riskPhrase} Available 24/7.`,
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

  if (slug.length === 1) {
    // City-service page
    const service = slug[0];
    if (!validCities.includes(city) || !validServices.includes(service as any)) {
      notFound();
    }
    const pageData = LocationServiceGenerator.generateLocationServicePage(city, service);
    return <LocationServicePageComponent data={pageData} />;
  }

  if (slug.length === 2) {
    // Suburb-service page
    const [suburbSlug, service] = slug;
    const suburbData = getSuburb(city, suburbSlug);
    if (!suburbData || !validServices.includes(service as any)) {
      notFound();
    }
    const pageData = LocationServiceGenerator.generateLocationServicePage(city, service, suburbData.name);
    return <LocationServicePageComponent data={pageData} />;
  }

  notFound();
}
