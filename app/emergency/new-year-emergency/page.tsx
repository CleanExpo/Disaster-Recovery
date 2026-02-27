import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'New Year Emergency | Dec 31-Jan 1 Pricing',
  description: 'New Year disaster response when others are celebrating. 60 minutes response time. Available December 31st - January 1st. IICRC-certified.',
  keywords: ["new year emergency","nye disaster recovery","january 1 emergency"],
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/new-year' },
};

export default function NewYearEmergencyServicePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'New Year Emergency Service',
        subtitle: 'Insurance Covered',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'New Year Emergency Service' },
      ]}
      sections={getEmergencySections({ emergencyType: 'New Year', context: 'on New Year\'s Eve and New Year\'s Day' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
