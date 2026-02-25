import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Water Damage Prevention | Disaster Recovery",
  description: "Police, Fire, Ambulance",
};

export default function EmergencyGuidePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Siren className="h-12 w-12" />,
        title: "Water Damage Prevention",
        subtitle: "Police, Fire, Ambulance",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Water Damage Prevention" },
      ]}
    />
  );
}
