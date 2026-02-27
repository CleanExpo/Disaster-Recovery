import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '$2200 Minimum Callout Fee Explained | What\'s Included',
  description: 'Our $2200 minimum callout includes comprehensive assessment, emergency mitigation, insurance documentation, and immediate response. No hidden fees.',
  keywords: [
    'disaster recovery callout fee',
    'emergency restoration cost',
    '$2200 minimum service',
    'what\'s included callout fee',
    'IICRC certified rates',
    'emergency response pricing'
  ],
  alternates: { canonical: 'https://disasterrecovery.com.au/pricing/minimum-callout' },
};

export default function MinimumCalloutPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: 'Minimum Callout Pricing',
        subtitle: 'Transparent disaster recovery pricing',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Minimum Callout' },
      ]}
    />
  );
}
