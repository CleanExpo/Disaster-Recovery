import { Metadata } from 'next';
import Script from 'next/script';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Wind Damage Restoration',
  description: 'Professional wind damage restoration services across Australia. 24/7 emergency response for cyclone damage, storm wind repair.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/wind-damage-repair',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What wind speed causes structural damage to Australian homes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sustained winds above 90 km/h begin causing damage to roof cladding and fencing. At 120 km/h, tile loss and partial roof sheeting uplift occurs. At 160+ km/h (cyclone intensity), significant structural failure of standard construction occurs. Australian Standard AS4055 classifies wind regions (N1-N6 for non-cyclonic, C1-C4 for cyclonic) — properties built to the correct wind class for their region have significantly better storm performance than older or non-compliant buildings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can wind-lifted roof sections be repaired or do they need full replacement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Partial roof repairs are often possible for limited sheeting or tile loss. However, if wind uplift has displaced multiple rows of tiles or sheeting sections, or if the underlying sarking and insulation have been water-damaged, a more extensive roof restoration is warranted. NRPG assesses whether spot repairs are sufficient or whether a full roof restoration better serves the property\'s long-term waterproofing integrity and insurance claim value.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is wind damage always covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wind damage from a sudden storm event is covered by most Australian home insurance policies. Wind damage due to normal wear and pre-existing maintenance neglect (deteriorated roof fixings, rotted fascia) may be subject to exclusion. Our assessment documents the storm cause and distinguishes storm-caused damage from pre-existing conditions — this is critical for claims where the insurer seeks to apply a maintenance exclusion.',
      },
    }
  ],
});

export default function WindDamageRestorationPage() {
  return (
    <>
      <Script id="wind-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Wind Damage Restoration',
        subtitle: 'Professional wind damage restoration services across Australia. 24/7 emergency response for cyclone damage, storm wind repair.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Wind Damage Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Wind Damage Restoration', parentCategory: 'Storm Damage', context: 'cyclone and storm wind damage repair' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
    </>
  );
}
