import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Fire Damage Emergency Checklist | Disaster Recovery',
  description: 'Step-by-step fire damage emergency checklist. What to do after a house fire, safety priorities, documentation steps, and when to call certified professionals.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/emergency/checklists/fire-damage',
  },
  openGraph: {
    title: 'Fire Damage Emergency Checklist | Disaster Recovery',
    description: 'Step-by-step fire damage emergency checklist. Safety, documentation, and next steps.',
    type: 'website',
  },
};

export default function FireDamageChecklistPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Flame className="h-12 w-12" />,
        title: "Fire Damage Emergency Checklist",
        subtitle: "What to do after a fire. Safety priorities, documentation steps for insurance, and when to call certified fire restoration professionals.",
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
