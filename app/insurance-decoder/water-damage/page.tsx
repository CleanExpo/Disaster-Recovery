import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Call Certified Restoration Professionals | Disaster Recovery",
  description: "",
};

export default function WaterDamageInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        icon: <Droplets className="h-12 w-12" />,
        title: "Call Certified Restoration Professionals",
        subtitle: "",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Insurance Decoder", href: "/insurance-decoder" },
        { label: "Call Certified Restoration Professionals" },
      ]}
    />
  );
}
