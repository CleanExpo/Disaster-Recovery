import { Metadata } from 'next';
import { ClipboardCheck } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Response Checklist | Disaster Recovery',
  description: 'Universal disaster response checklist for any emergency. Safety actions, documentation, insurance notification, and professional restoration steps for property owners.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/emergency/checklists/general',
  },
  openGraph: {
    title: 'Disaster Response Checklist | Disaster Recovery',
    description: 'Universal disaster response checklist for any property emergency in Australia.',
    type: 'website',
  },
};

export default function GeneralDisasterChecklistPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <ClipboardCheck className="h-12 w-12" />,
        title: "Universal Disaster Response Checklist",
        subtitle: "A general-purpose emergency checklist for any property disaster. Safety first, then documentation, insurance notification, and professional restoration.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Emergency", href: "/emergency" },
        { label: "Universal Disaster Response Checklist" },
      ]}
      sections={getEmergencySections({ emergencyType: 'General Emergency Checklist', context: 'for any disaster situation' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
