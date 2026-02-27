import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import { getCostSections } from '@/lib/content-sections';

export const metadata: Metadata = {
  title: 'Brisbane water damage Cost | Pricing Guide 2024',
  description: 'How much does water damage cost in Brisbane? Average prices, insurance coverage, payment plans. Use our cost estimator for an instant estimate.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/cost/brisbane-water-damage',
  },
};

export default function BrisbanewaterdamageCostPage() {
  return (
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
  );
}
