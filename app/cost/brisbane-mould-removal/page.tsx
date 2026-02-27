import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import { getCostSections } from '@/lib/content-sections';

export const metadata: Metadata = {
  title: 'Brisbane mould removal Cost | Pricing Guide 2024',
  description: 'How much does mould removal cost in Brisbane? Average prices, insurance coverage, payment plans. Use our cost estimator for an instant estimate.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/cost/brisbane-mould-removal',
  },
};

export default function BrisbanemouldremovalCostPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: 'Brisbane Mould removal Cost',
        subtitle: 'Transparent Pricing • Insurance Coverage • Instant Estimates',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cost Guides', href: '/cost' },
        { label: 'Brisbane Mould removal Cost' },
      ]}
      relatedPages={getRelatedPages('cost-mould')}
      sections={getCostSections({ city: 'Brisbane', serviceType: 'mould-removal' })}
    />
  );
}
