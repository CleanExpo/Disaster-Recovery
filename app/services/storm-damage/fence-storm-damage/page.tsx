import { Metadata } from 'next';
import Script from 'next/script';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Fence Storm Damage Repair',
  description: 'Professional fence storm damage repair services across Australia. 24/7 emergency response for fence repair, boundary damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/fence-storm-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is a storm-damaged fence covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most Australian home insurance policies cover sudden storm damage to fences as part of the structures or outbuildings coverage. The storm event must be the direct cause of damage — pre-existing fence deterioration or poor maintenance may be excluded. Colorbond and timber pool fences that fall due to wind uplift are the most common storm fence claim type. Photograph the fence damage and any storm evidence (fallen branches, debris) immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is responsible for a shared fence damaged by a storm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under state Fencing Acts, boundary fence costs are generally shared equally between adjoining owners. Where one property\'s tree has fallen and caused the fence damage, the tree owner may bear greater liability. NRPG provides an assessment report that documents the cause and scope of damage, which assists with negotiations between neighbours and respective insurers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can a storm-damaged fence be repaired or replaced?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Temporary make-safe (securing the damaged fence to prevent hazard) is completed within 24-48 hours. Permanent fence replacement typically takes 3-7 days after scope confirmation and material procurement. Pool fences are prioritised due to child safety obligations — Australian Standard AS1926.1 pool barrier compliance must be maintained throughout the make-safe and repair process.',
      },
    }
  ],
});

export default function FenceStormDamageRepairPage() {
  return (
    <>
      <Script id="fence-storm-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Fence Storm Damage Repair',
        subtitle: 'Professional fence storm damage repair services across Australia. 24/7 emergency response for fence repair, boundary damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Fence Storm Damage Repair' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Fence Storm Damage Repair', parentCategory: 'Storm Damage', context: 'storm-damaged fence and boundary restoration' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
    </>
  );
}
