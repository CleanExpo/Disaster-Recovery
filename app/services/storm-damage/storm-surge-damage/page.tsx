import { Metadata } from 'next';
import Script from 'next/script';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Storm Surge Flood Damage',
  description: 'Professional storm surge flood damage services across Australia. 24/7 emergency response for coastal flooding, tidal damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/storm-surge-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is storm surge and how is it different from regular flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Storm surge is a rise in sea level caused by the low atmospheric pressure and onshore wind of a tropical cyclone or severe storm system. It produces a sudden inundation of seawater that is saltwater (not freshwater) and carries debris, sediment, and marine contamination. Storm surge damage is significantly more severe than freshwater flooding because salt accelerates corrosion of metals, concrete, and electrical systems, and saltwater is classified as Category 3 contamination regardless of its apparent cleanliness.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does salt water damage require different restoration than freshwater flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Saltwater (storm surge) damage requires more aggressive and immediate intervention than freshwater flooding. Salt must be flushed from structural materials before drying commences — residual salt draws moisture back into dried materials. All metal fixings, reinforcement, and electrical infrastructure must be assessed for corrosion. Drying equipment must run at higher capacity due to elevated hygroscopic moisture load from salt residues.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is storm surge damage covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Storm surge coverage in Australian home insurance policies is complex — some policies include it under storm damage, others require separate flood or cyclone cover. Storm surge events associated with declared cyclones are typically covered if cyclone cover is included. Review your PDS for storm surge-specific inclusions and exclusions. After a major storm surge event, government disaster assistance (AGDRP) may also be available.',
      },
    }
  ],
});

export default function StormSurgeFloodDamagePage() {
  return (
    <>
      <Script id="storm-surge-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Storm Surge Flood Damage',
        subtitle: 'Professional storm surge flood damage services across Australia. 24/7 emergency response for coastal flooding, tidal damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Storm Surge Flood Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Storm Surge Flood Damage', parentCategory: 'Storm Damage', context: 'coastal flooding and tidal damage recovery' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
    </>
  );
}
