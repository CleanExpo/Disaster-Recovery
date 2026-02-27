import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

export const metadata: Metadata = {
  title: 'Biohazard Cleaning Services | IICRC Certified',
  description: 'Professional biohazard cleaning and crime scene cleanup across Australia. Discreet, compassionate trauma cleaning, unattended death, blood cleanup. IICRC-certified technicians.',
  keywords: [
    'biohazard cleaning',
    'crime scene cleanup',
    'trauma cleaning',
    'blood cleanup',
    'unattended death cleanup',
    'biohazard remediation',
    'hoarding cleanup',
    'drug lab cleanup',
    'sharps disposal',
    'infectious disease cleanup',
    'bodily fluid cleanup',
    'suicide cleanup',
    'IICRC S540 certified',
    'biohazard decontamination',
    'forensic cleaning',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Biohazard Cleaning Services',
  description: 'Professional biohazard cleaning and crime scene cleanup across Australia. Discreet, compassionate trauma cleaning, unattended death, blood cleanup. IICRC-certified technicians.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization', name: 'Disaster Recovery' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Biohazard Cleaning and Decontamination',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim', serviceType: 'Online' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export default function BiohazardCleaningPage() {
  return (
    <>
    <Script id="biohazard-cleaning-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Biohazard Cleaning Services',
        subtitle: 'Professional biohazard cleaning and crime scene cleanup across Australia. Discreet, compassionate trauma cleaning, unattended death, blood cleanup. IICRC-certified technicians.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning Services' },
      ]}
      sections={[
        {
          heading: 'Biohazard Cleanup Services',
          body: <ServiceChildLinks category="biohazard-cleaning" />,
        },
      ]}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
