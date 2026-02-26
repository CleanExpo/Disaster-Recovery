import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: '24/7 Online Emergency Response Times & Fees | After Hours, Weekends, Holidays',
  description: 'Emergency disaster recovery available 24/7/365. After hours, weekends, and holiday surcharges explained. IICRC-certified.' };

export default function EmergencyTimesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Siren className="h-12 w-12" />,
        title: "24/7 Online Emergency Response Times & Fees",
        subtitle: "Emergency disaster recovery available 24/7/365. After hours, weekends, and holiday surcharges explained. IICRC-certified.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "24/7 Online Emergency Response Times ..." },
      ]}
      sections={getEmergencySections({ emergencyType: 'Emergency', context: '24 hours a day, 7 days a week, 365 days a year' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
