import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getInsuranceSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'SGUA Insurance Claims | Landlord Insurance Restoration',
  description: 'IICRC-certified restoration for SGUA (St George Underwriting Agency) landlord insurance claims. Full claims documentation for investment and rental property damage.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/sgua' },
};

export default function SGUAInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'SGUA Insurance Claims',
        subtitle: 'St George Underwriting Agency • Landlord Insurance Specialist • Full Claims Documentation',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'SGUA Insurance Claims' },
      ]}
      sections={getInsuranceSections({ insurerName: 'SGUA (St George Underwriting Agency)', insurerSlug: 'sgua' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
