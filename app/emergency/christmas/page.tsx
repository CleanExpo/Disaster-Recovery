import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Christmas Emergency Services | December 24-26 | 24/7 Disaster Recovery',
  description: 'Emergency disaster recovery services available December 24-26. No call-out fees, immediate response nationwide.',
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/christmas' },
};

export default function ChristmasEmergencyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Christmas Emergency Services',
        subtitle: 'No Extra Charges • Same Day Response',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'Christmas Emergency Services' },
      ]}
      sections={getEmergencySections({ emergencyType: 'Christmas', context: 'over the Christmas holiday period' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
