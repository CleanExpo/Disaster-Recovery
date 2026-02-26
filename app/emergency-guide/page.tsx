import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Emergency Guide | What to Do After Property Damage',
  description: 'Step-by-step emergency guide for property damage in Australia. What to do immediately after water, fire, storm, or mould damage. Safety steps, who to call, and how to document.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/emergency-guide',
  },
  openGraph: {
    title: 'Emergency Guide | What to Do After Property Damage',
    description: 'Step-by-step emergency guide for property damage. Safety steps, who to call, and documentation.',
    type: 'website',
  },
};

export default function EmergencyGuidePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Siren className="h-12 w-12" />,
        title: "Emergency Guide",
        subtitle: "What to do immediately after property damage — safety steps, who to call, and how to document for your insurance claim.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Emergency Guide" },
      ]}
    />
  );
}
