import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Weekend Emergency Response | Saturday & Sunday',
  description: 'Immediate weekend disaster recovery when you need it most. 30 minutes response time. Available Saturday & Sunday. IICRC-certified.',
  keywords: ["weekend emergency","saturday disaster recovery","sunday emergency service"],
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/weekend' },
};

export default function WeekendEmergencyResponsePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Weekend Emergency Response',
        subtitle: 'Insurance Covered',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'Weekend Emergency Response' },
      ]}
      sections={getEmergencySections({ emergencyType: 'Weekend', context: 'throughout the entire weekend' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
