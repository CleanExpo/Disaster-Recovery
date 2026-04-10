import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Ipswich Flood Recovery',
  description: 'Professional ipswich flood recovery services in Queensland. 24/7 emergency response for western flooding, Ipswich restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/ipswich-flood-recovery',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why does Ipswich experience repeated flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ipswich\'s flood risk is structural — the Bremer River and its tributaries drain a large catchment from the Darling Downs ranges and converge in Ipswich before joining the Brisbane River. The city\'s historical development on floodplain land and its position at the confluence of multiple catchments means it is affected by both localised stormwater flooding and major river flooding events. The 2011, 2013, 2022, and subsequent flood events have repeatedly inundated low-lying Ipswich suburbs including Goodna, Rosewood, Leichhardt, and Bundamba, to depths of 1-4 metres or more.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes flood recovery in Ipswich particularly complex?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ipswich flood recovery challenges include: a large proportion of pre-1980 housing stock with timber stumped subfloors that absorb and retain Category 3 floodwater contamination; ageing plumbing infrastructure that sustains primary damage during flood events; multiple repeat events in some properties requiring repeated restoration; asbestos-containing materials in older pre-1990 construction that require specialist management during demolition and restoration; and the volume of simultaneous claims from repeated events straining both contractor availability and insurance processing timelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there government assistance programs available to Ipswich flood victims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For declared disaster events under the Disaster Recovery Funding Arrangements (DRFA), affected Ipswich residents may access: the Disaster Recovery Payment through Services Australia; the Disaster Recovery Allowance for income lost due to the disaster; and the Queensland Government\'s Resilient Homes Fund for eligible properties in high-risk flood zones, providing funded buyback, raising, or retrofitting options. Ipswich City Council also coordinates local emergency and community recovery grants. Programs vary by event and activation status — contact the Queensland Disaster Hub or Services Australia for current program availability.',
      },
    }
  ],
});

export default function IpswichFloodRecoveryPage() {
  return (
    <>
      <Script id="ipswich-flood-recovery-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Ipswich Flood Recovery',
        subtitle: 'Professional ipswich flood recovery services in Queensland. 24/7 emergency response for western flooding, Ipswich restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Ipswich Flood Recovery' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Ipswich Flood Recovery', parentCategory: 'Location Specific', context: 'western corridor flood recovery and water damage restoration in Ipswich' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
