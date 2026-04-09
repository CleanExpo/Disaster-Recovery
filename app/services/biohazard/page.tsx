import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What counts as a biohazard in a residential property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Residential biohazards include blood and bodily fluids, sewage overflow, meth lab residue, hoarding-related contamination, trauma scene materials, and infectious waste. All require specialised IICRC-certified technicians with appropriate PPE, containment protocols, and certified disposal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is biohazard cleanup covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many Australian home insurance policies cover specific biohazard events including sewage backup, and some policies include trauma scene cleanup as an optional extension. Coverage varies significantly by insurer and policy. NRPG can review your PDS and help lodge your claim correctly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do technicians safely clean a trauma or crime scene?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC-certified biohazard technicians follow strict containment, PPE, and decontamination protocols. This includes isolating the affected area, removing porous materials that cannot be decontaminated, applying hospital-grade biocidal agents, air scrubbing with HEPA filtration, and certified disposal of biological waste in accordance with Australian standards.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does biohazard decontamination take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most residential biohazard cleanups are completed within 1–3 days for trauma or sewage events. Meth lab decontamination typically requires 3–7 days including surface sampling and clearance testing. Hoarding remediation timelines depend on the volume and contamination level of the property.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is biohazard cleanup confidential?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — NRPG biohazard contractors operate with complete discretion. Unmarked vehicles, plain uniforms, and strict client confidentiality protocols are standard. No information about the nature of the cleanup is disclosed to third parties without your explicit consent.',
      },
    },
  ],
}

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
    <Script id="biohazard-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}} />
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
