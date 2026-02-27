import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCostSections } from '@/lib/content-sections';

export const metadata: Metadata = {
  title: 'Canberra water damage Cost | Pricing Guide 2024',
  description: 'How much does water damage cost in Canberra? Average prices, insurance coverage, payment plans. Use our cost estimator for an instant estimate.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/cost/canberra-water-damage',
  },
};

export default function CanberrawaterdamageCostPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: 'Canberra Water damage Cost',
        subtitle: 'Transparent Pricing • Insurance Coverage • Instant Estimates',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cost Guides', href: '/cost' },
        { label: 'Canberra Water damage Cost' },
      ]}
      sections={getCostSections({ city: 'Canberra', serviceType: 'water-damage' })}
    />
  );
}
