import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Mould Discovery Checklist',
  description: 'Found mould in your property? Follow this emergency checklist for containment steps, health precautions, documentation, and IICRC-certified remediation advice.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/emergency/checklists/mould',
  },
  openGraph: {
    title: 'Mould Discovery Checklist',
    description: 'Emergency checklist for mould discovery. Containment, health precautions, and next steps.',
    type: 'website',
  },
};

export default function MouldChecklistPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <Bug className="h-12 w-12" />,
        title: "Mould Discovery Emergency Checklist",
        subtitle: "Found mould in your property? Follow these containment steps, health precautions, and documentation guidelines before calling certified remediators.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Emergency", href: "/emergency" },
        { label: "Mould Discovery Emergency Checklist" },
      ]}
      sections={getEmergencySections({ emergencyType: 'Mould Emergency Checklist', context: 'when mould is discovered' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
