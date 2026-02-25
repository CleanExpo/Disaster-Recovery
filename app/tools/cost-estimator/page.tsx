import { Metadata } from 'next';
import Script from 'next/script';
import { Calculator } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import { getCostEstimatorSections } from '@/lib/content-sections';
import CostEstimator from '@/components/tools/CostEstimator';

export const metadata: Metadata = {
  title: 'Emergency Cost Estimator | Disaster Recovery Australia',
  description:
    'Get an instant cost estimate for water damage, fire, mould, storm, sewage, or biohazard restoration. Free, no-obligation estimate based on Australian pricing data.',
  keywords: [
    'disaster recovery cost estimator',
    'water damage cost calculator',
    'fire damage restoration cost',
    'mould removal cost Australia',
    'storm damage repair cost',
    'flood restoration cost estimate',
    'insurance restoration cost',
    'emergency restoration pricing',
  ],
  openGraph: {
    title: 'Emergency Cost Estimator | Disaster Recovery Australia',
    description:
      'Instant cost estimate for water damage, fire, mould, storm, sewage, or biohazard restoration based on real Australian pricing data.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/tools/cost-estimator',
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Estimate Disaster Recovery Costs in Australia',
  description:
    'Use our free interactive tool to get an instant cost estimate for emergency restoration based on your specific situation.',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'AUD',
    value: '2500-50000',
  },
  step: [
    {
      '@type': 'HowToStep',
      name: 'Select damage type',
      text: 'Choose the type of damage: water, fire, mould, flood, storm, sewage, or biohazard.',
    },
    {
      '@type': 'HowToStep',
      name: 'Choose property type',
      text: 'Select whether the property is residential or commercial.',
    },
    {
      '@type': 'HowToStep',
      name: 'Set affected area',
      text: 'Use the slider to set the affected area in square metres (5\u2013500 m\u00b2).',
    },
    {
      '@type': 'HowToStep',
      name: 'Select urgency level',
      text: 'Choose between emergency (immediate), urgent (24 hours), or scheduled (3\u20135 days).',
    },
    {
      '@type': 'HowToStep',
      name: 'Review your estimate',
      text: 'View your personalised cost range, insurance coverage likelihood, and response time.',
    },
  ],
};

export default function CostEstimatorPage() {
  return (
    <>
      <Script
        id="cost-estimator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 50%, #0F2942 100%)',
          icon: <Calculator className="h-12 w-12" />,
          title: 'Emergency Cost Estimator',
          subtitle: 'Instant estimate based on real Australian restoration data',
        }}
        cta={{ text: 'Lodge a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Cost Estimator' },
        ]}
        stats={[
          { label: 'Market Size', value: '$4.2B' },
          { label: 'Response', value: '24/7' },
          { label: 'Provider Status', value: 'Insurance Approved' },
          { label: 'Certification', value: 'IICRC Certified' },
        ]}
        sections={[
          {
            body: <CostEstimator />,
          },
          ...getCostEstimatorSections(),
        ]}
        relatedPages={getRelatedPages('cost-estimator')}
      />
    </>
  );
}
