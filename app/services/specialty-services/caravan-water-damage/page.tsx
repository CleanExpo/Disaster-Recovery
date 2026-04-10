import { Metadata } from 'next';
import Script from 'next/script';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Caravan Water Damage',
  description: 'Professional caravan water damage services across Australia. 24/7 emergency response for RV flooding, mobile home water.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/caravan-water-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of water damage commonly affect caravans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Caravans are prone to: roof seal deterioration allowing water ingress around roof vents, skylights, and A/C units; window frame seal failures; body joint seal degradation; storm damage to the roof or slide-out; and plumbing fitting failures in the internal water system. Because caravan walls and ceilings are typically ply and composite construction, water ingress rapidly causes delamination, soft spots in the floor, and mould growth within wall cavities.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you detect hidden moisture damage in a caravan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG uses non-invasive moisture meters and thermal imaging to map moisture within caravan wall panels, floor composite, and roof cavity without invasive opening. Soft spots in floors and walls indicate long-term moisture damage even if the surface appears sound. Moisture assessment before buying a second-hand caravan or during periodic maintenance is strongly recommended to identify hidden water ingress before it becomes structural damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is caravan water damage covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Water damage to a caravan from storm events, sudden leaks, or flooding is covered under most Australian caravan and motorhome insurance policies. Cover conditions typically require the caravan to be securely stored and maintained. Long-standing moisture damage from inadequate maintenance or unrepaired leaks may be excluded. NRPG provides causation and condition reports for caravan insurance claims.',
      },
    }
  ],
});

export default function CaravanWaterDamagePage() {
  return (
    <>
      <Script id="caravan-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Caravan Water Damage',
        subtitle: 'Professional caravan water damage services across Australia. 24/7 emergency response for RV flooding, mobile home water.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Caravan Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Caravan Water Damage', parentCategory: 'Specialty Services', context: 'RV and mobile home water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
