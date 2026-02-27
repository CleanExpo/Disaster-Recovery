import { Metadata } from 'next';
import Script from 'next/script';
import { Leaf } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Indoor Environmental Professional (IEP) Services',
  description: 'Certified Indoor Environmental Professionals providing comprehensive building health assessments, air quality testing, mould investigations, and environmental consulting nationwide.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Indoor Environmental Assessment',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: 'Indoor Environmental Professional (IEP) Services',
  description: 'Certified Indoor Environmental Professionals (IEP) providing comprehensive building health assessments, air quality testing, mould investigations, and environmental consulting nationwide.',
  keywords: [
    'indoor environmental professional',
    'IEP services',
    'indoor air quality testing',
    'mould investigation',
    'building health assessment',
    'environmental consulting',
    'air quality monitoring',
    'moisture assessment',
    'building diagnostics',
    'environmental site assessment',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/indoor-environmental-professional',
  },
};

export default function IndoorEnvironmentalProfessionalPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  return (
    <>
    <Script id="iep-svc-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Leaf className="h-12 w-12" />,
        title: 'Indoor Environmental Professional (IEP) Services',
        subtitle: 'Certified Indoor Environmental Professionals providing comprehensive building health assessments, air quality testing, mould investigations, and environmental consulting nationwide.',
      }}
      cta={{ text: 'Book an IEP Assessment', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Indoor Environmental Professional' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Indoor Environmental Professional (IEP) Services', parentCategory: 'Environmental Services', context: 'building health assessments, air quality testing, and mould investigations' })}
      relatedPages={getRelatedPages('guides-general')}
    />
    </>
  );
}
