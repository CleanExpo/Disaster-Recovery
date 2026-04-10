import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Toowoomba Water Damage',
  description: 'Professional toowoomba water damage services in Queensland. 24/7 emergency response for highlands flooding, mountain damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/toowoomba-water-damage',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What significant water events have affected Toowoomba?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Toowoomba experienced a catastrophic flash flood event on 10 January 2011 when intense rainfall (approximately 90mm in 30 minutes) overwhelmed the city\'s stormwater infrastructure, sending a flash flood surge through the CBD and residential areas — killing 3 people and causing hundreds of millions of dollars in damage. The event occurred despite Toowoomba\'s elevated inland location (700m ASL), demonstrating that water damage risk is not limited to flood-prone lowlands. Ongoing creekline flooding risk exists in several suburbs including areas draining East Creek and Ruthven Street catchments.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Toowoomba\'s elevated inland location create unique water damage risks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Toowoomba\'s position on the rim of the Great Dividing Range creates several distinct water damage risks: storm runoff concentrates rapidly in natural creek channels before engineered stormwater systems can absorb it; steep terrain accelerates stormwater velocity, increasing scouring and erosion damage; properties on the escarpment may experience hillside water intrusion and subsurface seepage; and the region\'s significant annual rainfall (around 750mm per year) accelerates roof and cladding deterioration. Temperature variations at elevation — frost and heat cycles — also contribute to pipe failure rates above those in warmer coastal regions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What restoration services are available for rural and agricultural properties around Toowoomba?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG\'s contractor network covers Toowoomba city and surrounding agricultural areas including Highfields, Pittsworth, Warwick, and the Lockyer Valley. For rural properties — including farm buildings, sheds, and station infrastructure — NRPG coordinates contractors experienced in rural building construction, including steel-frame and post-and-beam structures, and grain and machinery storage damaged by flood or storm events. Queensland DRFA activation for affected rural areas may provide additional funding pathways through the Queensland Rural and Industry Development Authority (QRIDA).',
      },
    }
  ],
});

export default function ToowoombaWaterDamagePage() {
  return (
    <>
      <Script id="toowoomba-water-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Toowoomba Water Damage',
        subtitle: 'Professional toowoomba water damage services in Queensland. 24/7 emergency response for highlands flooding, mountain damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Toowoomba Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Toowoomba Water Damage', parentCategory: 'Location Specific', context: 'highlands and Darling Downs water damage and flood restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
