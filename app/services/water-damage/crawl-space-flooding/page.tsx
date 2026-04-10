import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Crawl Space Water Removal',
  description: 'Professional crawl space water removal services across Australia. 24/7 emergency response for under house flooding, subfloor water.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/crawl-space-flooding',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is crawl space flooding particularly dangerous for a home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Crawl space flooding threatens the structural integrity of the entire home — floor framing, bearer, and subfloor are continuously exposed to standing water and elevated humidity. Timber moisture content above 19% enables decay fungi; above 25% enables rapid mould growth and structural degradation. Crawl spaces are also inaccessible to standard drying equipment, requiring specialist low-profile equipment and potentially a vapour barrier installation after drying.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you extract water from a crawl space?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Extraction involves deploying submersible pump in standing water, followed by trailer-mounted extraction equipment for residual water in the soil. Commercial desiccant dehumidifiers are then positioned with ducting into the crawl space, combined with air movers to circulate air through the timber structure. Moisture readings are taken at each visit until floor framing reaches equilibrium moisture content for the local climate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should a vapour barrier be installed in a crawl space after flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — a vapour barrier (minimum 0.2mm polyethylene membrane) installed over the soil floor of a crawl space significantly reduces ongoing moisture vapour migration from the soil into the timber structure. After a flooding event, the barrier should only be installed after the soil and timber structure have been dried to acceptable moisture levels. NRPG assesses existing vapour barrier condition and installs or replaces as part of the crawl space restoration scope.',
      },
    }
  ],
});

export default function CrawlSpaceWaterRemovalPage() {
  return (
    <>
      <Script id="crawl-space-flooding-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Crawl Space Water Removal',
        subtitle: 'Professional crawl space water removal services across Australia. 24/7 emergency response for under house flooding, subfloor water.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Crawl Space Water Removal' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Crawl Space Water Removal', parentCategory: 'Water Damage', context: 'under-house flooding and subfloor water extraction' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
