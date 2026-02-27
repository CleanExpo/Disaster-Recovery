import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCostSections } from '@/lib/content-sections';

export const metadata: Metadata = {
  title: 'GoldCoast flood restoration Cost | Pricing Guide 2024 | Free Quotes',
  description: 'How much does flood restoration cost in GoldCoast? Average prices, insurance coverage, payment plans. Get free quote now.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/cost/gold-coast-flood-restoration',
  },
};

export default function GoldCoastfloodrestorationCostPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: 'GoldCoast Flood restoration Cost',
        subtitle: 'Transparent Pricing • Insurance Coverage • Free Quotes',
      }}
      cta={{ text: 'Get Free Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cost Guides', href: '/cost' },
        { label: 'GoldCoast Flood restoration Cost' },
      ]}
      sections={getCostSections({ city: 'Gold Coast', serviceType: 'flood-restoration' })}
    />
  );
}
