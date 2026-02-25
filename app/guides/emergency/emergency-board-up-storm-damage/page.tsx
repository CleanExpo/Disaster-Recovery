import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Emergency Board Up Services After Storm Damage | Disaster Recovery',
  description: 'Expert answers and solutions for "emergency board up services after storm". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'emergency board up services after storm, disaster recovery, restoration services, Australia, IICRC certified' };

export default function EmergencyBoardUpStormDamagePage() {
  return (
    <AgGuidePageTemplate
      category="Emergency"
      title="Emergency Board Up Services After Storm Damage"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency', href: '/guides/emergency' },
        { label: 'Emergency Board Up Services After Storm Damage' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
