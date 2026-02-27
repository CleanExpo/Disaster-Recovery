import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Hollard Insurance Claims | Commercial & Specialty Restoration',
  description: 'IICRC-certified restoration for Hollard insurance claims. Commercial property, specialty lines, and underwriting agency claims documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/hollard' },
};

export default function HollardPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Hollard Insurance Claims',
        subtitle: 'Commercial Insurance • Full Claims Documentation • Flexible Payment Options',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Hollard Insurance Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'Hollard', insurerSlug: 'hollard', tier: 'medium-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
