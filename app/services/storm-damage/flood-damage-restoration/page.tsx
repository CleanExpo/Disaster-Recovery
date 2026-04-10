import { Metadata } from 'next';
import Script from 'next/script';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Flash Flood Damage Recovery',
  description: 'Professional flash flood damage recovery services across Australia. 24/7 emergency response for flood cleanup, storm flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/flood-damage-restoration',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between storm flooding and riverine flooding for insurance purposes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Australian insurance policies distinguish between stormwater inundation (flash flooding from extreme rainfall overwhelming drainage systems) and riverine flooding (rising water levels from overflowing rivers and creeks). Standard policies typically cover storm flooding; flood cover for riverine flooding is often a separate add-on or available only through specific flood policies. Check your PDS carefully and lodge your claim with the correct classification.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the immediate steps after a property floods from storm runoff?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only re-enter once the water level has receded and the property is confirmed structurally safe. Turn off electricity at the mains before entering (do not do this from inside the property if you must stand in water). Photograph all damage. Do not use generators inside. Open windows and doors to ventilate. Contact your insurer to register the claim and call NRPG for emergency water extraction and make-safe.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does storm flood damage restoration take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A single-storey residential property with moderate storm flooding (under 300mm water level, Category 1 water, affected for less than 24 hours) typically requires 2-4 weeks for complete restoration including drying, material replacement, and reinstatement. Properties with extensive flooding, Category 3 contamination, or significant structural damage require 6-16 weeks. Timeline is significantly affected by insurance approval speed.',
      },
    }
  ],
});

export default function FlashFloodDamageRecoveryPage() {
  return (
    <>
      <Script id="storm-flood-restoration-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Flash Flood Damage Recovery',
        subtitle: 'Professional flash flood damage recovery services across Australia. 24/7 emergency response for flood cleanup, storm flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Flash Flood Damage Recovery' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Flash Flood Damage Recovery', parentCategory: 'Storm Damage', context: 'flash flood cleanup and storm flooding restoration' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
    </>
  );
}
