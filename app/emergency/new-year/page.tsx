import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'New Year Emergency Services | December 31 - January 2 | 24/7 Disaster Recovery',
  description: 'Emergency disaster recovery services available December 31 - January 2. No call-out fees, immediate response nationwide.' };

export default function NewYearEmergencyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'New Year Emergency Services',
        subtitle: 'No Extra Charges • Same Day Response',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'New Year Emergency Services' },
      ]}
      sections={getEmergencySections({ emergencyType: 'New Year', context: 'over the New Year period' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
