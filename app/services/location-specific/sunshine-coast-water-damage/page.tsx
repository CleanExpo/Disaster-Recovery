import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Sunshine Coast Water Damage',
  description: 'Professional sunshine coast water damage services in Queensland. 24/7 emergency response for coastal damage, beach restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/sunshine-coast-water-damage',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes water damage events on the Sunshine Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sunshine Coast water damage arises from: intense hinterland rainfall draining through the Maroochy, Mooloolah, and Noosa River systems into coastal plains; severe thunderstorm activity during the summer storm season producing localised flash flooding and roof damage; stormwater overwhelm in lower-lying residential areas of Maroochydore, Nambour, and Caloundra; plumbing failures in the region\'s mix of newer coastal developments and older hinterland housing stock; and groundwater infiltration into subfloor areas during extended wet periods in high water table areas near the coast and rivers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Sunshine Coast\'s growth affect restoration access and timelines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Sunshine Coast\'s rapid growth has created large new residential areas — Aura, Harmony, Sippy Downs, Palmview — where high construction activity can limit emergency access during concurrent loss events. Hinterland communities (Maleny, Montville, Kenilworth) require longer equipment travel times and may have road access limitations during major weather events. NRPG maintains contractor resources across both coastal and hinterland Sunshine Coast areas and coordinates logistics planning for multi-site activations during declared disaster events.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documentation is required for Sunshine Coast water damage insurance claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sunshine Coast insurers require standard IICRC-compliant documentation: water category and Class assessment; photographic evidence at all stages; drying logs with daily moisture readings; scope of works with agreed quantities; and a clearance report confirming drying goals have been met. For properties in the Sunshine Coast Council\'s flood overlay areas, a Flood Check property report confirming flood risk category and historical flood level may be requested by the insurer. Where DRFA assistance is also sought, additional documentation to the relevant state authority is required.',
      },
    }
  ],
});

export default function SunshineCoastWaterDamagePage() {
  return (
    <>
      <Script id="sunshine-coast-water-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Sunshine Coast Water Damage',
        subtitle: 'Professional sunshine coast water damage services in Queensland. 24/7 emergency response for coastal damage, beach restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Sunshine Coast Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Sunshine Coast Water Damage', parentCategory: 'Location Specific', context: 'coastal water damage and beach property restoration on the Sunshine Coast' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
