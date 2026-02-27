import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import { getCostSections } from '@/lib/content-sections';

export const metadata: Metadata = {
  title: 'Sydney storm damage Cost | Pricing Guide 2024',
  description: 'How much does storm damage cost in Sydney? Average prices, insurance coverage, payment plans. Use our cost estimator for an instant estimate.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/cost/sydney-storm-damage',
  },
};

export default function SydneystormdamageCostPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: 'Sydney Storm damage Cost',
        subtitle: 'Transparent Pricing • Insurance Coverage • Instant Estimates',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cost Guides', href: '/cost' },
        { label: 'Sydney Storm damage Cost' },
      ]}
      relatedPages={getRelatedPages('cost-storm')}
      sections={getCostSections({ city: 'Sydney', serviceType: 'storm-damage' })}
    />
  );
}
