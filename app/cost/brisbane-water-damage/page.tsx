import { Metadata } from 'next';
import Script from 'next/script';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import { getCostSections } from '@/lib/content-sections';

export const metadata: Metadata = {
  title: 'Brisbane Water Damage Restoration Cost | 2025 Pricing Guide',
  description:
    'How much does water damage restoration cost in Brisbane? Average prices by category and scope, insurance coverage, and payment options. IICRC-certified restoration pricing.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/cost/brisbane-water-damage',
  },
};

// PriceSpecification schema — trusted static content, safe to stringify
const priceSpecSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Water Damage Restoration — Brisbane',
  description:
    'IICRC-certified water damage restoration services in Brisbane. Pricing by category and scope.',
  provider: {
    '@type': 'Organization',
    '@id': 'https://disasterrecovery.com.au/#organization',
    name: 'Disaster Recovery',
  },
  areaServed: {
    '@type': 'City',
    name: 'Brisbane',
    containedInPlace: {
      '@type': 'State',
      name: 'Queensland',
      containedInPlace: { '@type': 'Country', name: 'Australia' },
    },
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Category 1 Water Damage Restoration (Clean Water)',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'AUD',
        minPrice: '800',
        maxPrice: '3500',
        description:
          'Clean water burst pipe or supply line failure. Small to medium residential scope.',
      },
    },
    {
      '@type': 'Offer',
      name: 'Category 2 Water Damage Restoration (Grey Water)',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'AUD',
        minPrice: '1500',
        maxPrice: '6000',
        description:
          'Grey water from appliances, overflow, or prolonged clean water exposure. Includes antimicrobial treatment.',
      },
    },
    {
      '@type': 'Offer',
      name: 'Category 3 Water Damage Restoration (Black Water)',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'AUD',
        minPrice: '3000',
        maxPrice: '15000',
        description:
          'Sewage backup, floodwater, or highly contaminated water. Full containment, PPE, antimicrobial, and structural assessment required.',
      },
    },
    {
      '@type': 'Offer',
      name: 'Emergency Water Extraction Only',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'AUD',
        minPrice: '450',
        maxPrice: '2500',
        description:
          'Emergency extraction and make-safe only, without full structural drying. Standard residential scope.',
      },
    },
  ],
});

export default function BrisbanewaterdamageCostPage() {
  return (
    <>
      <Script
        id="brisbane-wd-cost-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: priceSpecSchema }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
          icon: <DollarSign className="h-12 w-12" />,
          title: 'Brisbane Water damage Cost',
          subtitle: 'Transparent Pricing • Insurance Coverage • Instant Estimates',
        }}
        cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cost Guides', href: '/cost' },
          { label: 'Brisbane Water damage Cost' },
        ]}
        relatedPages={getRelatedPages('cost-water')}
        sections={getCostSections({ city: 'Brisbane', serviceType: 'water-damage' })}
      />
    </>
  );
}
