import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Shower Leak Water Damage',
  description: 'Professional shower leak water damage services across Australia. 24/7 emergency response for shower pan leak, bathroom flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/shower-leaks',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes shower leaks and how do they damage the building?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shower leaks occur when: the shower base waterproofing membrane fails or is not adequately lapped; grout or silicone in the tiled enclosure cracks or deteriorates; the shower screen seals fail; or drain connections develop leaks under the shower floor. Water migrates through these failures into the substrate, wall framing, and subfloor. Because leaks occur slowly and are hidden, significant structural damage — wet timber framing, mould in wall cavities, subfloor damage — often accumulates over months before it becomes apparent.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you test for a shower leak?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG uses moisture meters and thermal imaging cameras to detect moisture in wall cavities and subfloor adjacent to the shower without demolition. A flood test (plugging the drain and filling the shower base for 24 hours) confirms whether the leak is from the base waterproofing or the shower plumbing. If significant moisture is detected, exploratory access into the wall cavity confirms the extent and nature of the damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is shower leak damage covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This depends on whether the damage is classified as sudden or gradual. A sudden waterproofing failure causing rapid damage may be covered. A slow leak that has been present for years causing gradual structural degradation is generally excluded as a maintenance issue. We provide a moisture timeline assessment that documents how long the damage has been occurring, which is the key factor in claim determination.',
      },
    }
  ],
});

export default function ShowerLeakWaterDamagePage() {
  return (
    <>
      <Script id="shower-leak-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Shower Leak Water Damage',
        subtitle: 'Professional shower leak water damage services across Australia. 24/7 emergency response for shower pan leak, bathroom flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Shower Leak Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Shower Leak Water Damage', parentCategory: 'Water Damage', context: 'shower pan leak and bathroom flooding cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
