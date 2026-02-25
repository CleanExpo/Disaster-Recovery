import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Christmas Day Emergency | December 25th | $2200 Minimum + $1500 Surcharge',
  description: 'Christmas Day disaster recovery - we never close. 60 minutes response time. Available December 25th. Insurance approved.',
  keywords: ["christmas emergency","december 25 disaster","xmas day recovery"],
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/christmas' },
};

export default function ChristmasDayEmergencyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Christmas Day Emergency',
        subtitle: 'Insurance Covered',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'Christmas Day Emergency' },
      ]}
      sections={getEmergencySections({ emergencyType: 'Christmas', context: 'on Christmas Day and Boxing Day' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
