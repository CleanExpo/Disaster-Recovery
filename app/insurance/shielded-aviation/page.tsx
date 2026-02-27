import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getAviationInsuranceSections } from '@/lib/content-sections/aviation-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Shielded Insurance Aviation Claims | Australian Aviation Restoration',
  description: 'IICRC-certified restoration for Shielded Insurance aviation claims. Australian aviation specialist — hangar, aircraft, and airport facility damage documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/shielded-aviation' },
};

export default function ShieldedAviationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1B2838 0%, #2C3E50 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Shielded Insurance Aviation Claims',
        subtitle: 'Aviation & Aerospace Specialist • Full Claims Documentation • CASA Compliance',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Shielded Insurance Aviation Claims' },
      ]}
      sections={getAviationInsuranceSections({ insurerName: 'Shielded Insurance', insurerSlug: 'shielded-aviation' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
