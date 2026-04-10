import { Metadata } from 'next';
import Script from 'next/script';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Crawl Space Mould Treatment',
  description: 'Professional crawl space mould treatment services across Australia. 24/7 emergency response for subfloor mould, under house mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/crawl-space-mould',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why do crawl spaces develop mould and what damage does it cause?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Crawl spaces develop mould because they combine three conditions for mould growth: organic material (timber floor joists, bearer, blocking), moisture (rising damp from soil, plumbing leaks, surface water ingress), and poor ventilation. Mould in crawl spaces affects the structural integrity of floor framing over time and generates spores that rise through the floor into living areas, degrading indoor air quality throughout the property.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is crawl space mould remediated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Crawl space remediation involves: removing contaminated insulation batts; HEPA vacuuming of all affected timber surfaces; treatment of floor framing with penetrating antifungal agent; addressing the moisture source (French drain installation, vapour barrier, improved subfloor ventilation); and air clearance testing post-treatment. In severe cases, structurally compromised timber elements require replacement before the crawl space is resealed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is crawl space mould covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould resulting from a sudden water event (burst pipe, flash flooding) is typically covered. Mould from rising damp — a gradual moisture accumulation — is generally treated as a maintenance issue and excluded. We conduct a causation assessment to document the moisture source and timeline, which informs how the claim is characterised. Cases involving a specific triggering event have the best coverage prospects.',
      },
    }
  ],
});

export default function CrawlSpaceMouldTreatmentPage() {
  return (
    <>
      <Script id="crawl-space-mould-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Crawl Space Mould Treatment',
        subtitle: 'Professional crawl space mould treatment services across Australia. 24/7 emergency response for subfloor mould, under house mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Crawl Space Mould Treatment' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Crawl Space Mould Treatment', parentCategory: 'Mould Remediation', context: 'subfloor and under-house mould treatment' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
