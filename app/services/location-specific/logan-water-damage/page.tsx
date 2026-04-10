import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Logan Water Damage Services',
  description: 'Professional logan water damage services services in Queensland. 24/7 emergency response for Logan flooding, southern Brisbane.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/logan-water-damage',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of water damage are most common in Logan City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Logan City experiences water damage events from multiple sources: Bremer and Logan River flooding in low-lying suburbs including Eagleby, Waterford, and Browns Plains; stormwater drainage overwhelm during intense summer thunderstorm events; flash flooding from the many creek and drainage corridors across the city; plumbing failures in Logan\'s significant proportion of 1970s-1990s housing stock; and insurance claims arising from burst flexible hose connections on toilets and tapware — a leading source of sudden water damage in Australian residential properties.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Logan City\'s housing age affect water damage risk and restoration scope?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A significant proportion of Logan\'s residential housing was constructed in the 1970s-1990s during rapid suburban expansion. This housing stock commonly features: flexible braided hose connections on toilets and tapware that deteriorate and fail unexpectedly; galvanised water supply pipes approaching end of service life; weathered roof cladding on older dwellings; and subfloor moisture problems in stumped-floor homes from drainage changes over time. IICRC-certified assessors account for these pre-existing material vulnerabilities when determining the appropriate restoration scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'What restoration standards apply to residential water damage in Logan City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All water damage restoration in Logan must meet IICRC S500 (Standard for Professional Water Damage Restoration, 2021 edition) requirements, which are referenced by Queensland insurers as the industry standard. The Queensland Building and Construction Commission (QBCC) licenses contractors performing structural drying and related building works, and all licensed work must comply with the National Construction Code. For properties in flood-prone zones, Logan City Council\'s flood overlay code may specify requirements for permanent reinstatement works following flood events.',
      },
    }
  ],
});

export default function LoganWaterDamageServicesPage() {
  return (
    <>
      <Script id="logan-water-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Logan Water Damage Services',
        subtitle: 'Professional logan water damage services services in Queensland. 24/7 emergency response for Logan flooding, southern Brisbane.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Logan Water Damage Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Logan Water Damage Services', parentCategory: 'Location Specific', context: 'Logan and southern Brisbane flood and water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
