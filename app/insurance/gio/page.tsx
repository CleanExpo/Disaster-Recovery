import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getInsuranceSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'GIO Insurance Claims | Approved Restoration Provider | Claims Assistance',
  description: 'Preferred GIO insurance restoration provider. Full claims documentation, flexible payment options, and 24/7 claims assistance.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/gio' },
};

export default function GIOInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'GIO Insurance Claims',
        subtitle: 'Preferred Provider • Flexible Payment Options • Full Claims Documentation',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'GIO Insurance Claims' },
      ]}
      sections={getInsuranceSections({ insurerName: 'GIO', insurerSlug: 'gio' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
