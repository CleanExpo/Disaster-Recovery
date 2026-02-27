import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Easter Emergency Services | Easter Long Weekend | 24/7 Disaster Recovery',
  description: 'Emergency disaster recovery services available Easter Long Weekend. No call-out fees, immediate response nationwide.',
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/easter' },
};

export default function EasterEmergencyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Easter Emergency Services',
        subtitle: 'No Extra Charges • Same Day Response',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'Easter Emergency Services' },
      ]}
      sections={getEmergencySections({ emergencyType: 'Easter', context: 'over the Easter long weekend' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
