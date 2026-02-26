import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'After Hours Emergency Service | 5PM - 9AM Weekdays | $2200 Minimum + $500 Surcharge',
  description: '24/7 emergency response when disaster strikes outside business hours. 30 minutes response time. Available 5PM - 9AM Weekdays. IICRC-certified.',
  keywords: ["after hours emergency","night time disaster recovery","evening emergency service"],
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/after-hours' },
};

export default function AfterHoursEmergencyServicePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'After Hours Emergency Service',
        subtitle: 'Insurance Covered',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'After Hours Emergency Service' },
      ]}
      sections={getEmergencySections({ emergencyType: 'After Hours', context: '5PM to 9AM every night' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
