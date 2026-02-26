import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Sewage Backup Emergency Checklist | Disaster Recovery',
  description: 'Sewage backup emergency checklist. Immediate safety steps, contamination containment, health risks, and professional cleanup requirements for Category 3 water.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/emergency/checklists/sewage',
  },
  openGraph: {
    title: 'Sewage Backup Emergency Checklist | Disaster Recovery',
    description: 'Emergency checklist for sewage backup. Safety, containment, and professional cleanup.',
    type: 'website',
  },
};

export default function SewageChecklistPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        icon: <Droplets className="h-12 w-12" />,
        title: "Sewage Backup Emergency Checklist",
        subtitle: "",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Emergency", href: "/emergency" },
        { label: "Sewage Backup Emergency Checklist" },
      ]}
      sections={getEmergencySections({ emergencyType: 'Sewage Emergency Checklist', context: 'after a sewage overflow' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
