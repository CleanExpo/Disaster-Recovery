import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getInsuranceSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'RACV Insurance Claims | Approved Restoration Provider',
  description: 'Preferred RACV insurance restoration provider. Full claims documentation, flexible payment options, and 24/7 claims assistance.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/racv' },
};

export default function RACVInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'RACV Insurance Claims',
        subtitle: 'Preferred Provider • Flexible Payment Options • Full Claims Documentation',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'RACV Insurance Claims' },
      ]}
      sections={getInsuranceSections({ insurerName: 'RACV', insurerSlug: 'racv' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
