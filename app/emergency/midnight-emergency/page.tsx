import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Midnight Emergency Response | 12AM - 6AM | $2200 Minimum + $750 Surcharge',
  description: 'Middle of the night disaster recovery services. 45 minutes response time. Available 12AM - 6AM. Insurance approved.',
  keywords: ["midnight emergency","late night disaster","3am emergency service"],
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/midnight' },
};

export default function MidnightEmergencyResponsePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Midnight Emergency Response',
        subtitle: 'Insurance Covered',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'Midnight Emergency Response' },
      ]}
      sections={getEmergencySections({ emergencyType: 'Midnight', context: 'at any hour of the night' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
