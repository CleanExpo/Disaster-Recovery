import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getInsuranceSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Budget Direct Insurance Claims | Approved Restoration Provider | Claims Assistance',
  description: 'Preferred Budget Direct insurance restoration provider. Full claims documentation, flexible payment options, and 24/7 claims assistance.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/budget-direct' },
};

export default function BudgetDirectInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Budget Direct Insurance Claims',
        subtitle: 'Preferred Provider • Flexible Payment Options • Full Claims Documentation',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Budget Direct Insurance Claims' },
      ]}
      sections={getInsuranceSections({ insurerName: 'Budget Direct', insurerSlug: 'budget-direct' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
