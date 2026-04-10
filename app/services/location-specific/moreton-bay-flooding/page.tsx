import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Moreton Bay Flood Services',
  description: 'Professional moreton bay flood services services in Queensland. 24/7 emergency response for northern flooding, bay area.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/moreton-bay-flooding',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What flood risks exist across the Moreton Bay region?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Moreton Bay Regional Council area faces diverse flood risks: coastal tidal inundation along the foreshore from Sandgate to Redcliffe; creek and waterway flooding throughout the Pine Rivers and Caboolture catchments; stormwater overland flow across low-lying residential areas in Strathpine, Morayfield, and Narangba; and the compound effects of coincident rainfall events and king tide periods. The 2022 South East Queensland floods caused major inundation across multiple Moreton Bay suburbs, and the region\'s rapid population growth continues to intensify existing stormwater infrastructure pressures.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does tidal surge affect flooding and restoration in coastal Moreton Bay communities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coastal Moreton Bay communities are exposed to tidal surge flooding during major weather events — storm surge from east coast low pressure systems can raise sea level 0.5-2m above normal tidal height. This introduces saline water into properties, classified as Category 3 (black water) under IICRC S500, which requires more extensive decontamination, material removal, and post-drying verification than freshwater flooding. Salt residues accelerate corrosion of embedded steel and fasteners and must be thoroughly removed from masonry and concrete surfaces during restoration.',
      },
    },
    {
      '@type': 'Question',
      name: 'What response capacity does NRPG maintain for flooding events in the Moreton Bay region?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG maintains contractor resources across the Moreton Bay region, including contractors based in Redcliffe, Caboolture, and North Lakes with equipment sufficient for residential and commercial flood response. For major regional events, NRPG activates its extended network to supplement local capacity with additional crews and equipment. Moreton Bay Regional Council coordinates disaster response through the Local Disaster Management Group (LDMG), and NRPG contractors operate in accordance with LDMG access clearances and priority protocols for affected areas.',
      },
    }
  ],
});

export default function MoretonBayFloodServicesPage() {
  return (
    <>
      <Script id="moreton-bay-flooding-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Moreton Bay Flood Services',
        subtitle: 'Professional moreton bay flood services services in Queensland. 24/7 emergency response for northern flooding, bay area.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Moreton Bay Flood Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Moreton Bay Flood Services', parentCategory: 'Location Specific', context: 'northern Brisbane and Moreton Bay region flood restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
