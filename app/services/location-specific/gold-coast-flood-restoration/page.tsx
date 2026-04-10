import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Gold Coast Flood Restoration',
  description: 'Professional gold coast flood restoration services in Queensland. 24/7 emergency response for coastal flooding, beach property.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/gold-coast-flood-restoration',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What areas of the Gold Coast are most at risk of flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Gold Coast\'s complex canal network, tidal rivers (Nerang, Coomera, Pimpama), and hinterland catchments create multiple flood risk zones. SEQWATER flood mapping identifies high-risk precincts including: Labrador, Paradise Point, and Runaway Bay (tidal inundation and canal flooding); Nerang and Carrara (Nerang River flooding); Oxenford and Coomera (Coomera River flooding); and Mudgeeraba and Reedy Creek (overland flow from the hinterland). Gold Coast City Council\'s Local Flood Study is updated regularly and should be consulted for property-specific flood risk assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Gold Coast\'s coastal humidity affect water damage restoration timelines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Gold Coast\'s subtropical coastal climate (average 65-75% relative humidity) slows evaporation compared to inland Australian climates. IICRC S500 drying protocols require humidity control within the drying zone (targeting 40-50% RH) regardless of external ambient conditions, meaning higher dehumidifier capacity or longer drying periods in humid coastal conditions. Fungal colonisation risk is also elevated in subtropical climates — mould can establish on wet organic materials within 48 hours, making rapid water extraction and dehumidification critical for all Gold Coast flood events.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documentation is required for flood restoration insurance on the Gold Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gold Coast insurers require: IICRC-certified assessment with water category determination and photographic mapping; drying logs with daily readings until goals are met; scope of works approved by the insurer\'s loss adjuster; SEQWATER flood data confirming the flood event and extent; and contamination clearance testing for Category 3 (floodwater) events. For strata properties, body corporate minutes, by-laws, and strata manager correspondence are often required to confirm insurance responsibilities between lot owner and body corporate policies.',
      },
    }
  ],
});

export default function GoldCoastFloodRestorationPage() {
  return (
    <>
      <Script id="gold-coast-flood-restoration-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Gold Coast Flood Restoration',
        subtitle: 'Professional gold coast flood restoration services in Queensland. 24/7 emergency response for coastal flooding, beach property.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Gold Coast Flood Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Gold Coast Flood Restoration', parentCategory: 'Location Specific', context: 'coastal flooding and beach property water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
