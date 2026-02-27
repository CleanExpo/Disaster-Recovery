import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCostSections } from '@/lib/content-sections';

export const metadata: Metadata = {
  title: 'SunshineCoast water damage Cost | Pricing Guide 2024 | Free Quotes',
  description: 'How much does water damage cost in SunshineCoast? Average prices, insurance coverage, payment plans. Get free quote now.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/cost/sunshine-coast-water-damage',
  },
};

export default function SunshineCoastwaterdamageCostPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: 'SunshineCoast Water damage Cost',
        subtitle: 'Transparent Pricing • Insurance Coverage • Free Quotes',
      }}
      cta={{ text: 'Get Free Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cost Guides', href: '/cost' },
        { label: 'SunshineCoast Water damage Cost' },
      ]}
      sections={getCostSections({ city: 'Sunshine Coast', serviceType: 'water-damage' })}
    />
  );
}
