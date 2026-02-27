import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

export const metadata: Metadata = {
  title: 'Sewage Cleanup Services | 24/7 Response',
  description: 'Professional sewage cleanup and sanitisation across Australia. 24/7 emergency response for sewage backup, overflow cleanup, contamination removal. IICRC-certified technicians.',
  keywords: [
    'sewage cleanup',
    'sewage overflow cleanup',
    'sewage backup restoration',
    'black water cleanup',
    'grey water cleanup',
    'septic overflow cleanup',
    'toilet overflow cleanup',
    'storm drain backup',
    'grease trap overflow',
    'sewage decontamination',
    'commercial sewage cleanup',
    'basement sewage cleanup',
    'main line backup repair',
    'sewage sanitisation',
    'Category 3 water damage',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Sewage Cleanup Services',
  description: 'Professional sewage cleanup and sanitisation across Australia. 24/7 emergency response for sewage backup, overflow cleanup, and contamination removal. IICRC-certified technicians.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization', name: 'Disaster Recovery' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Sewage Cleanup and Decontamination',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim', serviceType: 'Online' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export default function SewageCleanupPage() {
  return (
    <>
    <Script id="sewage-cleanup-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Sewage Cleanup Services',
        subtitle: 'Professional sewage cleanup and sanitisation across Australia. 24/7 emergency response for sewage backup, overflow cleanup, and contamination removal. IICRC-certified technicians.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup' },
      ]}
      sections={[
        {
          heading: 'Sewage Cleanup Services',
          body: <ServiceChildLinks category="sewage-cleanup" />,
        },
      ]}
    />
    </>
  );
}
