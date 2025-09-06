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
    title: `${serviceTitle} ${cityTitle} | 24/7 Emergency Response`,
    description: `Professional ${serviceTitle.toLowerCase()} services in ${cityTitle}. Available 24/7 for emergency response. Insurance approved contractors. Call now for immediate assistance.`,
    keywords: `${params.service}, ${params.city}, emergency restoration, insurance claims, 24 hour service`,
    openGraph: {
      title: `${serviceTitle} ${cityTitle} - Emergency Response`,
      description: `Get immediate ${serviceTitle.toLowerCase()} help in ${cityTitle}. Professional, insurance-approved contractors available 24/7.`,
      type: 'website',
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