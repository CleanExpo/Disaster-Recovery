import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Roof Leak Water Damage',
  description: 'Professional roof leak water damage services across Australia. 24/7 emergency response for roof leaking, storm water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/roof-leak-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why do roof leaks appear inside a property in a different location from the actual roof fault?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water entering a roof cavity follows the roof framing and sarking until it finds a penetration point — typically a light fitting, ceiling cornice, or wall framing junction. The visible ceiling stain may be several metres from the actual roof entry point. This is why tracing the leak to the roof surface requires inspection of the roof space during or immediately after rain, not just external inspection from the ground.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much roof damage is required before water penetrates the ceiling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Even minor tile cracking, lifting, or displaced ridge capping allows water ingress during driving rain. A single lifted roof tile over a sarking tear can allow hundreds of litres of water into the roof space during a prolonged rain event. Roof leaks are progressive — small initial entry points worsen with each subsequent rain, expanding the structural damage and increasing mould risk. Prompt repair after the first sign of a leak is always the lowest-cost outcome.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is roof leak water damage covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Water damage resulting from a sudden roof leak — caused by storm damage, hail, or sudden tile failure — is covered under most Australian home insurance policies. Damage resulting from a long-standing roof leak that went unrepaired may face a maintenance exclusion. The claim outcome often depends on whether there is evidence of sudden versus gradual damage. Our assessment documents the storm date, damage pattern, and moisture timeline to support the claim characterisation.',
      },
    }
  ],
});

export default function RoofLeakWaterDamagePage() {
  return (
    <>
      <Script id="roof-leak-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Roof Leak Water Damage',
        subtitle: 'Professional roof leak water damage services across Australia. 24/7 emergency response for roof leaking, storm water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Roof Leak Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Roof Leak Water Damage', parentCategory: 'Water Damage', context: 'roof leak repair and storm water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
