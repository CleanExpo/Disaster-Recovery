import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Easter Long Weekend Emergency Restoration | Disaster Recovery',
  description: 'Expert answers and solutions for "easter long weekend emergency restoration". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'easter long weekend emergency restoration, disaster recovery, restoration services, Australia, IICRC certified' };

export default function EasterWeekendEmergencyRestorationPage() {
  return (
    <AgGuidePageTemplate
      category="Emergency"
      title="Easter Long Weekend Emergency Restoration"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency', href: '/guides/emergency' },
        { label: 'Easter Long Weekend Emergency Restoration' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
