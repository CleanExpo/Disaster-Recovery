import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Commercial Restoration Services',
  description: 'Professional commercial restoration services with business continuity focus. Office water damage, retail fire damage, industrial restoration. Minimise downtime with expert disaster recovery.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Commercial Disaster Recovery',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: 'Commercial Restoration Services | Business Continuity',
  description: 'Professional commercial restoration services with business continuity focus. Office water damage, retail fire damage, industrial restoration. Minimize downtime with expert disaster recovery.',
  keywords: [
    'commercial restoration',
    'business restoration',
    'commercial water damage',
    'office restoration',
    'retail restoration',
    'industrial restoration',
    'business continuity',
    'commercial disaster recovery'
  ],
  alternates: {
    canonical: '/services/commercial-services' },
};

const commercialFaqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you minimise business disruption during commercial restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG develops a business continuity plan before restoration begins. This includes staging work to maintain operational areas, scheduling intensive work outside business hours, establishing temporary workspace where required, and prioritising systems critical to your operations. We communicate daily with your facility manager and insurer throughout the project.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you handle commercial insurance claims directly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide full claims-ready documentation — IICRC-certified assessment reports, scope of works, photographic evidence, moisture drying logs, and invoices — in the format insurers require. We can liaise directly with your insurer or loss adjuster to expedite claim approval and avoid delays that extend business disruption.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you restore commercial properties outside business hours?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. NRPG operates 24/7 and can schedule restoration work during nights, weekends, and public holidays to minimise impact on trading hours. Emergency response is available around the clock — lodge a claim at disasterrecovery.com.au/claim at any time.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of commercial properties do you restore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG restores all commercial property types including offices, retail centres, warehouses, factories, restaurants and hospitality venues, healthcare facilities, aged care facilities, schools, strata buildings, and data centres. Each property type has specific compliance requirements that our IICRC-certified contractors are trained to address.',
      },
    },
  ],
});

export default function CommercialRestorationPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  return (
    <>
    <Script id="commercial-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: commercialFaqSchema}} />
    <Script id="commercial-svc-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Commercial Restoration Services',
        subtitle: 'Professional commercial restoration services with business continuity focus. Office water damage, retail fire damage, industrial restoration. Minimize downtime with expert disaster recovery.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Restoration Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Commercial Restoration Services', parentCategory: 'Commercial Services', context: 'business continuity and commercial disaster recovery' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
