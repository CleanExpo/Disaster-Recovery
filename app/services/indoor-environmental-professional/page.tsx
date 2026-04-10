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

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does an Indoor Environmental Professional (IEP) assess after water or mould damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An IEP provides independent environmental testing and assessment of indoor air quality, moisture levels, and biological contamination. After water or mould events, an IEP conducts: air sampling for mould spore counts and species identification; surface swab samples from affected materials; moisture and humidity mapping; assessment of HVAC contamination; and a written report recommending remediation scope. The IEP is typically engaged by the property owner or insurer independent of the restoration contractor to provide an objective assessment of the scope required.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is an IEP inspection required after water or mould damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An IEP inspection is required or strongly recommended where: visible mould exceeds one square metre and occupants have health symptoms; mould has been identified in HVAC systems; a Category 3 (sewage or floodwater) contamination event has occurred; a commercial property governed by the WHS Act 2011 requires employer due diligence documentation; or the insurer or building certifier requires independent clearance testing before reoccupation is permitted following remediation. IEP clearance is increasingly required by insurers as standard for significant mould and water damage claims.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does an IEP clearance certificate support a property insurance claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An IEP clearance certificate issued after successful remediation provides independent third-party confirmation that the property has been restored to acceptable indoor environmental conditions — typically AIHA or IICRC-referenced spore count thresholds. This document protects the property owner against future liability for health complaints from occupants, provides evidence for the insurer that the loss has been fully addressed, and in commercial properties satisfies WHS Act 2011 due diligence requirements for safe return to work. It also protects the restoration contractor from post-completion disputes.',
      },
    }
  ],
});

export default function IndoorEnvironmentalProfessionalPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  return (
    <>
    <Script id="iep-svc-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
    <Script id="iep-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
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
