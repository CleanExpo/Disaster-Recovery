import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Early Morning Emergency | 4AM - 7AM | $2200 Minimum + $500 Surcharge',
  description: 'Dawn disaster recovery before the day begins. 30 minutes response time. Available 4AM - 7AM. IICRC-certified.',
  keywords: ["early morning emergency","dawn disaster","5am emergency service"],
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/early-morning' },
};

export default function EarlyMorningEmergencyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Early Morning Emergency',
        subtitle: 'Insurance Covered',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'Early Morning Emergency' },
      ]}
      sections={getEmergencySections({ emergencyType: 'Early Morning', context: 'before business hours' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
