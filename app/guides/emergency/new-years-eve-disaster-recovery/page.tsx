import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "New Year's Eve Disaster Recovery Services | Disaster Recovery",
  description: 'Expert answers and solutions for "new years eve disaster recovery services". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'new years eve disaster recovery services, disaster recovery, restoration services, Australia, IICRC certified' };

export default function NewYearsEveDisasterRecoveryPage() {
  return (
    <AgGuidePageTemplate
      category="Emergency"
      title="New Year's Eve Disaster Recovery Services"
      subtitle="Expert answers and solutions for New Year's Eve disaster recovery. IICRC certified professionals available 24/7 nationwide."
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency', href: '/guides/emergency' },
        { label: "New Year's Eve Disaster Recovery" },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
