import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Storm Damage Emergency Checklist | Disaster Recovery',
  description: 'Storm damage emergency checklist for property owners. Roof damage, fallen trees, water ingress, emergency tarping, and insurance documentation steps.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/emergency/checklists/storm-damage',
  },
  openGraph: {
    title: 'Storm Damage Emergency Checklist | Disaster Recovery',
    description: 'Emergency checklist for storm damage. Roof, trees, water ingress, and insurance steps.',
    type: 'website',
  },
};

export default function StormDamageChecklistPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        icon: <CloudLightning className="h-12 w-12" />,
        title: "Storm Damage Emergency Checklist",
        subtitle: "",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Emergency", href: "/emergency" },
        { label: "Storm Damage Emergency Checklist" },
      ]}
      sections={getEmergencySections({ emergencyType: 'Storm Damage Checklist', context: 'after storm events' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
