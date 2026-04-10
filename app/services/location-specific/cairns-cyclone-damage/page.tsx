import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Cairns Cyclone Recovery',
  description: 'Professional cairns cyclone recovery services in Queensland. 24/7 emergency response for tropical damage, FNQ restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/cairns-cyclone-damage',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is Cairns particularly vulnerable to cyclone damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cairns sits within Australia\'s most active cyclone zone — the Gulf of Carpentaria and Coral Sea approaches — and experiences a direct or near-miss tropical cyclone event approximately every 3-5 years on historical averages. The region\'s high sea surface temperatures intensify cyclone development. Cairns\' topography, with coastal low-lying suburbs and hinterland ranges, creates wind funnelling effects. Rapid population growth since the 1980s means a significant proportion of buildings were constructed under older, less stringent cyclone loading standards prior to current NCC requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What cyclone-specific building standards apply to restoration in Cairns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cairns falls within Wind Region C under AS 1170.2, which requires buildings to be designed and constructed to withstand the highest cyclone wind loads in the standard. Under the National Construction Code (NCC), cyclonic construction requirements mandate specific roof-to-wall tie-down connections, cyclone-rated windows and doors, continuous load path connections, and specific cladding ratings. Buildings predating these standards — many constructed before 1985 — may have significant structural vulnerabilities. Post-cyclone structural assessments check these connection points as a priority.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does North Queensland\'s tropical climate affect structural drying timelines after cyclone damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cairns\' high year-round humidity (average 75-85% relative humidity) significantly reduces natural evaporation rates and requires more aggressive mechanical drying compared to southern Australian climates. IICRC S500 psychrometric calculations must account for high ambient grains-per-pound (GPP) levels, requiring larger dehumidifier capacity to achieve the required drying differential. Extended drying timelines — 50-100% longer than equivalent projects in drier climates — should be anticipated for insurance scheduling. NRPG project managers apply climate-adjusted drying projections for all Far North Queensland restoration projects.',
      },
    }
  ],
});

export default function CairnsCycloneRecoveryPage() {
  return (
    <>
      <Script id="cairns-cyclone-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-cyclone-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Cairns Cyclone Recovery',
        subtitle: 'Professional cairns cyclone recovery services in Queensland. 24/7 emergency response for tropical damage, FNQ restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-cyclone-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Cairns Cyclone Recovery' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Cairns Cyclone Recovery', parentCategory: 'Location Specific', context: 'tropical cyclone damage restoration in Far North Queensland' })}
      relatedPages={getRelatedPages('emergency')}
    />
    </>
  );
}
