import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Zurich Insurance Claims | Commercial Restoration Provider',
  description: 'IICRC-certified restoration for Zurich commercial insurance claims. Full claims documentation for property, liability, and NM Insurance marine covers.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/zurich' },
};

export default function ZurichPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Zurich Insurance Claims',
        subtitle: 'Commercial & Industrial Specialist • Full Claims Documentation • Project Management',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Zurich Insurance Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'Zurich', insurerSlug: 'zurich', tier: 'heavy-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
