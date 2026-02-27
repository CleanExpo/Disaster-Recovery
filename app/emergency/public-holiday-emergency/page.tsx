import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Public Holiday Emergency | All Public Holidays',
  description: 'Holiday disaster response when other services are closed. 45 minutes response time. Available All Public Holidays. IICRC-certified.',
  keywords: ["public holiday emergency","christmas emergency","easter disaster recovery"],
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/public-holiday' },
};

export default function PublicHolidayEmergencyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Public Holiday Emergency',
        subtitle: 'Insurance Covered',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'Public Holiday Emergency' },
      ]}
      sections={getEmergencySections({ emergencyType: 'Public Holiday', context: 'on any public holiday' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
