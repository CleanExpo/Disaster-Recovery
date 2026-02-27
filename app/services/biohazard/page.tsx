import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Professional Biohazard Cleanup Services',
  description: 'Expert biohazard cleanup and decontamination services. IICRC certified technicians available 24/7 for crime scene cleanup, trauma scene cleanup, and infectious waste removal.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Biohazard Cleanup',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: 'Professional Biohazard Cleanup Services | IICRC Certified',
  description: 'Expert biohazard cleanup and decontamination services. IICRC certified technicians available 24/7 for crime scene cleanup, trauma scene cleanup, and infectious waste removal.',
  keywords: [
    'biohazard cleanup',
    'crime scene cleanup',
    'trauma scene cleanup',
    'biohazard decontamination',
    'bloodborne pathogen cleanup',
    'infectious waste removal',
    'hazmat cleanup',
    'OSHA compliance cleanup'
  ],
  alternates: {
    canonical: '/services/biohazard-cleaning' },
};

export default function BiohazardPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  return (
    <>
    <Script id="biohazard-svc-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Professional Biohazard Cleanup Services',
        subtitle: 'Expert biohazard cleanup and decontamination services. IICRC certified technicians available 24/7 for crime scene cleanup, trauma scene cleanup, and infectious waste removal.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Professional Biohazard Cleanup Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Professional Biohazard Cleanup Services', parentCategory: 'Biohazard Services', context: 'biohazard cleanup and decontamination' })}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
