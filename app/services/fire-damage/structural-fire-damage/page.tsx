import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Structural Fire Damage Repair',
  description: 'Professional structural fire damage repair services across Australia. 24/7 emergency response for building fire, frame damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/structural-fire-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is structural fire damage assessed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC-certified fire restoration contractors assess the structural integrity of load-bearing elements — roof framing, floor joists, wall studs, beams — for fire exposure, char depth, and residual strength. A structural engineer is engaged for elements where fire exposure may have compromised load capacity. This assessment forms the basis of the restoration scope and insurance claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is a fire-damaged structure demolished versus restored?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most fire-damaged residential structures are restorable unless the fire was extremely severe or the building was already at end of life. Restoration is nearly always less expensive than demolition and rebuild. The decision is made based on the structural engineer\'s assessment of residual structural integrity and the scope of required repairs versus new build costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does structural fire damage restoration take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Structural restoration following a significant fire event typically takes 8-24 weeks depending on the scope of structural repair, engineering requirements, council approvals, trades availability, and insurance settlement timing. We provide a project timeline after the initial structural assessment and update it regularly throughout the project.',
      },
    }
  ],
});

export default function StructuralFireDamageRepairPage() {
  return (
    <>
      <Script id="structural-fire-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Structural Fire Damage Repair',
        subtitle: 'Professional structural fire damage repair services across Australia. 24/7 emergency response for building fire, frame damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Structural Fire Damage Repair' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Structural Fire Damage Repair', parentCategory: 'Fire Damage', context: 'building frame and structural fire damage assessment and repair' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
    </>
  );
}
