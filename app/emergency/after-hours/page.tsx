import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'After Hours Emergency Services | 5PM - 9AM | 24/7 Disaster Recovery',
  description: 'Emergency disaster recovery services available 5PM - 9AM. No call-out fees, immediate response nationwide.',
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/after-hours' },
};

export default function AfterHoursEmergencyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'After Hours Emergency Services',
        subtitle: 'No Extra Charges • Same Day Response',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'After Hours Emergency Services' },
      ]}
      sections={getEmergencySections({ emergencyType: 'After Hours', context: '24/7 including evenings and nights' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
