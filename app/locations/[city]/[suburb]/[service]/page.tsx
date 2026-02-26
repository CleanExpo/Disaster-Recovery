import { notFound } from 'next/navigation';
import { LocationServiceGenerator } from '../../../../../lib/location-service-generator';
import LocationServicePageComponent from '../../../../../components/location-service-page-simple';
import { getSuburb, getSuburbSlugs, suburbCities, validServices, cityStateMap } from '@/lib/suburb-utils';

// Generate static params for all city-suburb-service combinations
export async function generateStaticParams() {
  const params: { city: string; suburb: string; service: string }[] = [];

  for (const city of suburbCities) {
    const suburbs = getSuburbSlugs(city);
    for (const suburb of suburbs) {
      for (const service of validServices) {
        params.push({ city, suburb, service });
      }
    }
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { city: string; suburb: string; service: string } }) {
  const suburbData = getSuburb(params.city, params.suburb);

  if (!suburbData || !validServices.includes(params.service as any)) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const cityTitle = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  const suburbName = suburbData.name;
  const serviceTitle = params.service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const state = cityStateMap[params.city] || 'AU';

  // Build risk-aware description
  const riskPhrase = suburbData.riskFactors.length > 0
    ? ` High-risk area for ${suburbData.riskFactors.slice(0, 2).map(r => r.replace(/-/g, ' ')).join(' and ')}.`
    : '';

  return {
    title: `Emergency ${serviceTitle} ${suburbName} ${cityTitle} | NRPG 24/7`,
    description: `Need emergency ${serviceTitle.toLowerCase()} in ${suburbName}, ${cityTitle}? NRPG connects you with IICRC-certified contractors in under 60 minutes.${riskPhrase} Available 24/7.`,
    keywords: `${params.service}, ${suburbName}, ${cityTitle}, ${state}, emergency restoration, disaster recovery, 24 hour service`,
    openGraph: {
      title: `Emergency ${serviceTitle} ${suburbName} ${cityTitle} | NRPG 24/7`,
      description: `Emergency ${serviceTitle.toLowerCase()} in ${suburbName}, ${cityTitle} — IICRC-certified contractors respond in under 60 minutes. Available 24/7.`,
      type: 'website',
      images: [{
        url: `https://disasterrecovery.com.au/api/og?title=${encodeURIComponent(`Emergency ${serviceTitle}`)}&city=${encodeURIComponent(`${suburbName}, ${cityTitle}`)}&service=${encodeURIComponent(params.service)}`,
        width: 1200,
        height: 630,
        alt: `Emergency ${serviceTitle} in ${suburbName}, ${cityTitle} - Disaster Recovery Australia`,
      }],
    },
  };
}

export default function SuburbServicePage({ params }: { params: { city: string; suburb: string; service: string } }) {
  const suburbData = getSuburb(params.city, params.suburb);

  if (!suburbData || !validServices.includes(params.service as any)) {
    notFound();
  }

  // Generate page data with suburb context
  const pageData = LocationServiceGenerator.generateLocationServicePage(
    params.city,
    params.service,
    suburbData.name
  );

  return <LocationServicePageComponent data={pageData} />;
}
