import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getInsuranceSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Terri Scheer Insurance Claims | Landlord Insurance Restoration',
  description: 'IICRC-certified restoration for Terri Scheer landlord insurance claims. Australia\'s specialist landlord insurer — full claims documentation for investment property damage.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/terri-scheer' },
};

export default function TerriScheerInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Terri Scheer Insurance Claims',
        subtitle: 'Australia\'s Landlord Insurance Specialist • Full Claims Documentation • Investment Property Experts',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Terri Scheer Insurance Claims' },
      ]}
      sections={getInsuranceSections({ insurerName: 'Terri Scheer', insurerSlug: 'terri-scheer' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
