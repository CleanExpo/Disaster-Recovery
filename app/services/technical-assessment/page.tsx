import { Metadata } from 'next';
import Script from 'next/script';
import { ClipboardCheck } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Technical Assessment Services',
  description: 'Professional technical assessment and damage evaluation services. IICRC certified inspectors provide comprehensive reports for insurance claims and restoration planning.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Technical Damage Assessment',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: 'Technical Assessment Services',
  description: 'Professional technical assessment and damage evaluation services. IICRC certified inspectors provide comprehensive reports for insurance claims and restoration planning.',
  keywords: [
    'technical assessment',
    'property damage evaluation',
    'moisture detection',
    'thermal imaging',
    'structural damage assessment',
    'insurance inspection',
    'damage documentation',
    'restoration planning'
  ] };

export default function TechnicalAssessmentPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  return (
    <>
    <Script id="tech-assessment-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <ClipboardCheck className="h-12 w-12" />,
        title: 'Technical Assessment Services',
        subtitle: 'Professional technical assessment and damage evaluation services. IICRC certified inspectors provide comprehensive reports for insurance claims and restoration planning.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Technical Assessment Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Technical Assessment Services', parentCategory: 'Technical Services', context: 'property damage evaluation and insurance inspection' })}
      relatedPages={getRelatedPages('guides-general')}
    />
    </>
  );
}
