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

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly can you respond to a sewage backup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG dispatches IICRC-certified technicians as soon as a certified contractor is confirmed for your area in most metro areas, 24/7. Sewage backup is a Category 3 contamination event — every hour of delay increases health risk and structural damage. Contact us immediately at disasterrecovery.com.au/claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is sewage backup covered by home insurance in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Australian home and contents policies cover sudden sewage backup events as a defined event under water damage. Gradual deterioration or blocked drains due to lack of maintenance may be excluded. Begin emergency make-safe immediately — do not wait for insurer approval. Document all damage with photographs before cleanup.',
      },
    },
    {
      '@type': 'Question',
      name: 'What health risks does sewage contamination cause?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sewage (Category 3 black water) contains bacteria, viruses, parasites, and chemical contaminants including E. coli, Salmonella, Hepatitis A, and Cryptosporidium. Exposure causes serious gastrointestinal illness and skin infections. Do not enter a sewage-affected area without full PPE. Evacuate and call a certified technician immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can my belongings be restored after sewage damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Porous materials that have absorbed sewage — carpet, soft furnishings, cardboard, insulation — must be disposed of under IICRC S500:2025 protocols. Hard surfaces, tiles, timber, and many contents can be decontaminated and restored with antimicrobial treatment. Your restoration contractor will document the scope for insurance purposes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does sewage cleanup take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency extraction and containment typically takes 4–12 hours. Full decontamination and antimicrobial treatment of affected areas takes 1–3 days. Structural drying following sewage events typically requires 3–7 days under IICRC S500:2025 protocols. Timeline varies with the extent of contamination and affected area.',
      },
    },
  ],
});

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
    <Script id="sewage-cleanup-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
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
