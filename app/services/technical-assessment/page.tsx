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

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does a technical restoration assessment include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A technical restoration assessment is a comprehensive, systematic inspection conducted by an IICRC-certified assessor to document and scope the full extent of damage from a loss event. It includes: category and class determination for water events (IICRC S500); smoke type and residue classification for fire events (IICRC S700); contamination classification for biohazard events (IICRC S540); moisture mapping; thermal imaging; photographic documentation; materials inventory; and a written scope of works with quantities and recommended methods for each component. This assessment is the foundation of both the restoration project and the insurance claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is a structural engineer required as part of a technical restoration assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A structural engineer is required when the loss event may have compromised the structural integrity of load-bearing elements: significant fire damage to roof framing, wall studs, floor joists, or columns; severe storm, cyclone, or tree impact damage; flooding that has caused subfloor erosion or foundation movement; or any scenario where the safety of re-entry to the structure is uncertain. Structural engineers assess residual load capacity, prescribe remediation or replacement, and provide certification for reinstatement works where council or building certifier approval is required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a technical assessment report support an insurance claim settlement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The technical assessment report provides the insurer and their loss adjuster with the scope of works, quantities, and methodology justification required to value the claim. Without an IICRC-certified assessment, insurers rely solely on their own assessors, which may underestimate scope or apply inappropriate methods. A well-documented third-party technical assessment creates a factual record of damage extent, prevents scope disputes, and enables faster settlement. The report also provides legal protection for the property owner if the claim is subsequently disputed or litigated.',
      },
    }
  ],
});

export default function TechnicalAssessmentPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  return (
    <>
    <Script id="tech-assessment-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
    <Script id="technical-assessment-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
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
