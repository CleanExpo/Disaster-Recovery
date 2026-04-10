import { Metadata } from 'next';
import Script from 'next/script';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Attic Mould Removal',
  description: 'Professional attic mould removal services across Australia. 24/7 emergency response for roof cavity mould, ceiling mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/attic-mould',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes mould to grow in attics and roof spaces?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Attic mould is caused by moisture accumulation from inadequate roof ventilation, condensation on cold roof sheeting in winter, roof leaks, and blocked or undersized eave vents. Bathroom and kitchen exhaust fans venting into the roof space (rather than outside) are a common cause. Mould grows on timber framing, sarking, and insulation batts when relative humidity exceeds 60% consistently.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is attic mould dangerous to occupants below?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Mould spores in roof spaces can enter living areas through ceiling penetrations, light fittings, exhaust fan openings, and leaks in the ceiling lining. Attic mould significantly worsens indoor air quality throughout the property. Structural timber affected by mould for extended periods also suffers structural degradation — roof framing strength is compromised over time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is attic mould remediated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S520:2025-compliant attic mould remediation involves: containment of the roof space; HEPA vacuuming of all spore-contaminated surfaces; application of EPA-registered antifungal to timber framing and sarking; replacement of contaminated insulation batts; and addressing the moisture source (improving ventilation, fixing roof leaks). Post-remediation clearance air testing verifies spore counts are within acceptable limits before the roof space is resealed.',
      },
    }
  ],
});

export default function AtticMouldRemovalPage() {
  return (
    <>
      <Script id="attic-mould-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Attic Mould Removal',
        subtitle: 'Professional attic mould removal services across Australia. 24/7 emergency response for roof cavity mould, ceiling mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Attic Mould Removal' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Attic Mould Removal', parentCategory: 'Mould Remediation', context: 'roof cavity and ceiling mould removal and prevention' })}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
