import { Metadata } from 'next';
import Script from 'next/script';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Asbestos Water Damage',
  description: 'Professional asbestos water damage services across Australia. 24/7 emergency response for wet asbestos, contaminated materials.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/asbestos-water-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When does water damage create an asbestos risk?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water damage creates an asbestos risk in any property built before 1987 (when asbestos use in building materials began to be restricted in Australia) if the water has damaged or disturbed asbestos-containing materials (ACM). Common ACM in older Australian homes include: fibro (flat or corrugated asbestos cement sheeting used in walls, eaves, and roofs), vinyl floor tiles, ceiling tiles, and pipe lagging. Undisturbed ACM that is wet but intact does not release fibres — the risk arises when ACM is damaged, crumbling, or disturbed by water entry.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can water-damaged asbestos be repaired or does it always need removal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Intact, non-friable ACM (bonded asbestos cement) that has been water-damaged but not cracked or broken can sometimes be encapsulated rather than removed. Friable asbestos (crumbling, powdery, or damaged by water) must be removed by a licensed asbestos removalist under state regulations. NRPG engages licensed asbestos assessors to determine whether encapsulation or removal is required before any restoration work begins in affected areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who pays for asbestos removal after a water damage event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Where asbestos removal is required as a direct consequence of a covered water damage event (storm, burst pipe, fire), the asbestos removal costs are generally claimable as part of the restoration scope. This includes both the asbestos removal cost and the disposal costs. NRPG provides a detailed scope that identifies ACM removal requirements within the restoration claim, supported by a licensed asbestos assessor\'s report.',
      },
    }
  ],
});

export default function AsbestosWaterDamagePage() {
  return (
    <>
      <Script id="asbestos-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Asbestos Water Damage',
        subtitle: 'Professional asbestos water damage services across Australia. 24/7 emergency response for wet asbestos, contaminated materials.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Asbestos Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Asbestos Water Damage', parentCategory: 'Specialty Services', context: 'wet asbestos and contaminated material handling' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
