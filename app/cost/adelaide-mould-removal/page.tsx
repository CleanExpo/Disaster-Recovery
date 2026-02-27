import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCostSections } from '@/lib/content-sections';

export const metadata: Metadata = {
  title: 'Adelaide mould removal Cost | Pricing Guide 2024 | Free Quotes',
  description: 'How much does mould removal cost in Adelaide? Average prices, insurance coverage, payment plans. Get free quote now.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/cost/adelaide-mould-removal',
  },
};

export default function AdelaidemouldremovalCostPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: 'Adelaide Mould removal Cost',
        subtitle: 'Transparent Pricing • Insurance Coverage • Free Quotes',
      }}
      cta={{ text: 'Get Free Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cost Guides', href: '/cost' },
        { label: 'Adelaide Mould removal Cost' },
      ]}
      sections={getCostSections({ city: 'Adelaide', serviceType: 'mould-removal' })}
    />
  );
}
