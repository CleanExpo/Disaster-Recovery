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

export default function CommercialRestorationPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  return (
    <>
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
