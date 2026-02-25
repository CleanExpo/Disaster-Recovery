import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '24 Hour Emergency Restoration Services Near You | Disaster Recovery',
  description: 'Expert answers and solutions for "where to find 24 hour emergency restoration". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'where to find 24 hour emergency restoration, disaster recovery, restoration services, Australia, IICRC certified' };

export default function Find24HourEmergencyRestorationPage() {
  return (
    <AgGuidePageTemplate
      category="Emergency"
      title="24 Hour Emergency Restoration Services Near You"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency', href: '/guides/emergency' },
        { label: '24 Hour Emergency Restoration Services Near You' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
