import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCostSections } from '@/lib/content-sections';

export const metadata: Metadata = {
  title: 'SunshineCoast storm damage Cost | Pricing Guide 2024',
  description: 'How much does storm damage cost in SunshineCoast? Average prices, insurance coverage, payment plans. Use our cost estimator for an instant estimate.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/cost/sunshine-coast-storm-damage',
  },
};

export default function SunshineCoaststormdamageCostPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: 'SunshineCoast Storm damage Cost',
        subtitle: 'Transparent Pricing • Insurance Coverage • Instant Estimates',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cost Guides', href: '/cost' },
        { label: 'SunshineCoast Storm damage Cost' },
      ]}
      sections={getCostSections({ city: 'Sunshine Coast', serviceType: 'storm-damage' })}
    />
  );
}
