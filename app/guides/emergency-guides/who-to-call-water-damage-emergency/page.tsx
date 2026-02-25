import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Emergency Water Damage: Who to Call First | Disaster Recovery',
  description: 'Expert answers and solutions for "who to call for emergency water damage". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'who to call for emergency water damage, disaster recovery, restoration services, Australia, IICRC certified' };

export default function WhoToCallWaterDamageEmergencyPage() {
  return (
    <AgGuidePageTemplate
      category="Emergency Guides"
      title="Emergency Water Damage: Who to Call First"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency Guides', href: '/guides/emergency-guides' },
        { label: 'Emergency Water Damage: Who to Call First' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
