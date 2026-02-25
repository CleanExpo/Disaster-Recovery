import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: "Fire Damage Emergency Checklist | Disaster Recovery",
  description: "",
};

export default function FireDamageChecklistPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Flame className="h-12 w-12" />,
        title: "Fire Damage Emergency Checklist",
        subtitle: "",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Emergency", href: "/emergency" },
        { label: "Fire Damage Emergency Checklist" },
      ]}
      sections={getEmergencySections({ emergencyType: 'Fire Damage Checklist', context: 'after a fire event' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
