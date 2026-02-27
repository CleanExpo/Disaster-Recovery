import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'ANZAC Day Emergency Services | April 25 | 24/7 Disaster Recovery',
  description: 'Emergency disaster recovery services available April 25. No call-out fees, immediate response nationwide.',
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/anzac-day' },
};

export default function ANZACDayEmergencyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'ANZAC Day Emergency Services',
        subtitle: 'No Extra Charges • Same Day Response',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'ANZAC Day Emergency Services' },
      ]}
      sections={getEmergencySections({ emergencyType: 'ANZAC Day', context: 'on public holidays including ANZAC Day' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
