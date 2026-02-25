import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Covered Storm Events | Disaster Recovery",
  description: "Fixed dollar amount (e.g., $1,000)",
};

export default function StormDamageInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        icon: <CloudLightning className="h-12 w-12" />,
        title: "Covered Storm Events",
        subtitle: "Fixed dollar amount (e.g., $1,000)",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Insurance Decoder", href: "/insurance-decoder" },
        { label: "Covered Storm Events" },
      ]}
    />
  );
}
