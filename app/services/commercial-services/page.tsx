import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

export const metadata: Metadata = {
  title: 'Commercial Restoration Services',
  description: 'Professional commercial restoration services for businesses across Australia. Minimising downtime and protecting your business assets.',
  keywords: [
    'commercial restoration services',
    'commercial water damage restoration',
    'office water damage',
    'retail flood damage',
    'warehouse flooding restoration',
    'hotel flood recovery',
    'restaurant water damage',
    'hospital water damage',
    'school water damage',
    'factory water damage',
    'data center flooding',
    'gym flooding restoration',
    'commercial disaster recovery',
    'business property restoration',
    'commercial fire damage restoration',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Commercial Restoration Services',
  description: 'Professional commercial restoration services for businesses across Australia. Minimising downtime and protecting your business assets.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization', name: 'Disaster Recovery' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Commercial Property Disaster Restoration',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim', serviceType: 'Online' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you minimise business interruption during commercial restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG develops a business continuity plan before any work begins. This includes staging work to keep operational areas running, scheduling intensive work outside business hours, coordinating with your facilities manager daily, and prioritising systems critical to your operations. We target the fastest path to full reoccupation without compromising restoration quality.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you handle commercial insurance claims directly with insurers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide complete claims-ready documentation — IICRC-certified assessment reports, scope of works, photographic evidence, moisture drying logs, and invoices — in the format commercial insurers require. We can liaise directly with your insurer or appointed loss adjuster to expedite claim approval and avoid delays that extend business disruption.',
      },
    },
    {
      '@type': 'Question',
      name: 'What commercial property types do you restore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG restores all commercial property types: offices, retail centres, warehouses, factories, restaurants and hospitality venues, healthcare facilities, aged care, schools, strata buildings, data centres, and specialist industrial facilities. Each requires specific compliance knowledge that our IICRC-certified contractors and project managers are trained to address.',
      },
    }
  ],
});

export default function CommercialServicesPage() {
  return (
    <>
    <Script id="commercial-services-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Commercial Restoration Services',
        subtitle: 'Professional commercial restoration services for businesses across Australia. Minimising downtime and protecting your business assets.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Restoration Services' },
      ]}
      sections={[
        {
          heading: 'Commercial Restoration Services',
          body: <ServiceChildLinks category="commercial-services" />,
        },
      ]}
    />
    </>
  );
}
