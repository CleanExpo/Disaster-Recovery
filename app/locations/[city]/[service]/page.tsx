import { notFound } from 'next/navigation';
import { LocationServiceGenerator } from '../../../../lib/location-service-generator';
import LocationServicePageComponent from '../../../../components/location-service-page-simple';

// Generate static params for all location-service combinations
export async function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  
  const cities = [
    'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide',
    'darwin', 'hobart', 'canberra', 'newcastle', 'wollongong',
    'gold-coast', 'sunshine-coast', 'geelong', 'townsville', 'cairns'
  ];
  
  const services = [
    'water-damage-restoration',
    'fire-damage-restoration',
    'storm-damage-repairs',
    'mould-remediation',
    'flood-recovery',
    'emergency-restoration'
  ];
  
  cities.forEach(city => {
    services.forEach(service => {
      params.push({ city, service });
    });
  });
  
  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { city: string; service: string } }) {
  // Validate the combination exists
  const validCities = ['sydney', 'melbourne', 'brisbane', 'perth', 'adelaide', 'darwin', 'hobart', 'canberra', 'newcastle', 'wollongong', 'gold-coast', 'sunshine-coast', 'geelong', 'townsville', 'cairns'];
  const validServices = ['water-damage-restoration', 'fire-damage-restoration', 'storm-damage-repairs', 'mould-remediation', 'flood-recovery', 'emergency-restoration'];
  
  if (!validCities.includes(params.city) || !validServices.includes(params.service)) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    };
  }
  
  const cityTitle = params.city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const serviceTitle = params.service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return {
    title: `Emergency ${serviceTitle} ${cityTitle} | NRPG 24/7`,
    description: `Need emergency ${serviceTitle.toLowerCase()} in ${cityTitle}? NRPG connects you with IICRC-certified contractors in under 60 minutes. Available 24/7 across ${cityTitle}.`,
    keywords: `${params.service}, ${params.city}, emergency restoration, disaster recovery, 24 hour service`,
    openGraph: {
      title: `Emergency ${serviceTitle} ${cityTitle} | NRPG 24/7`,
      description: `Emergency ${serviceTitle.toLowerCase()} in ${cityTitle} — IICRC-certified contractors respond in under 60 minutes. Available 24/7.`,
      type: 'website',
      images: [{
        url: `https://disasterrecovery.com.au/api/og?title=${encodeURIComponent(`Emergency ${serviceTitle}`)}&city=${encodeURIComponent(cityTitle)}&service=${encodeURIComponent(params.service)}`,
        width: 1200,
        height: 630,
        alt: `Emergency ${serviceTitle} in ${cityTitle} - Disaster Recovery Australia`,
      }],
    }
  };
}

export default function LocationServicePage({ params }: { params: { city: string; service: string } }) {
  // Validate params
  const validCities = ['sydney', 'melbourne', 'brisbane', 'perth', 'adelaide', 'darwin', 'hobart', 'canberra', 'newcastle', 'wollongong', 'gold-coast', 'sunshine-coast', 'geelong', 'townsville', 'cairns'];
  const validServices = ['water-damage-restoration', 'fire-damage-restoration', 'storm-damage-repairs', 'mould-remediation', 'flood-recovery', 'emergency-restoration'];
  
  if (!validCities.includes(params.city) || !validServices.includes(params.service)) {
    notFound();
  }
  
  // Generate page data - use static method with correct parameter order
  const pageData = LocationServiceGenerator.generateLocationServicePage(params.city, params.service);
  
  return <LocationServicePageComponent data={pageData} />;
}
