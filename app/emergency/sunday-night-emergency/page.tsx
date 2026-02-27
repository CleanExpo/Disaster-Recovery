import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Sunday Night Emergency | Sunday 6PM - Monday 6AM | $2200 Minimum + $750 Surcharge',
  description: 'Sunday night disaster recovery before the work week. 30 minutes response time. Available Sunday 6PM - Monday 6AM. IICRC-certified.',
  keywords: ["sunday night emergency","sunday evening disaster","pre-monday emergency"],
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/sunday-night-emergency' },
};

export default function SundayNightEmergencyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Sunday Night Emergency',
        subtitle: 'Insurance Covered',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'Sunday Night Emergency' },
      ]}
      sections={getEmergencySections({ emergencyType: 'Sunday Night', context: 'on Sunday nights' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
