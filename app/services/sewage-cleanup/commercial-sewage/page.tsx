import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Commercial Sewage Cleanup',
  description: 'Professional commercial sewage cleanup services across Australia. 24/7 emergency response for business sewage, workplace contamination.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/commercial-sewage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the immediate obligations for a business after a sewage event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The business must: evacuate the affected area immediately; turn off electricity to the zone if safe to do so; contact an emergency sewage remediation contractor; notify the building owner or strata manager; and in food service or healthcare settings, notify the relevant regulatory authority (local council environmental health, health department). Employees must not re-enter until the space is certified safe. Workers\' compensation obligations apply if employees are exposed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you remediate commercial sewage while minimising business disruption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG establishes containment barriers and deploys extraction and drying equipment to limit the affected zone. Unaffected areas of the premises remain operational where structurally and safety-wise possible. Intensive remediation work is scheduled outside trading hours. We provide documentation for your property manager, insurer, and any regulatory authority requiring evidence of professional remediation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a commercial kitchen or food service area be returned to use after sewage backup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but only after: professional extraction and decontamination of all affected surfaces; disposal of all food, packaging, and consumables in the contaminated area; clearance testing meeting food safety authority standards; and inspection and clearance by your local council environmental health officer. We provide IICRC-certified clearance documentation to support your regulatory reinspection and business reopening.',
      },
    }
  ],
});

export default function CommercialSewageCleanupPage() {
  return (
    <>
      <Script id="commercial-sewage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Commercial Sewage Cleanup',
        subtitle: 'Professional commercial sewage cleanup services across Australia. 24/7 emergency response for business sewage, workplace contamination.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Commercial Sewage Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Commercial Sewage Cleanup', parentCategory: 'Sewage Cleanup', context: 'business and workplace sewage contamination' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
