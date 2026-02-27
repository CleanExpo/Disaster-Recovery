import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Water Damage Insurance Decoder',
  description: 'Is water damage covered by your home insurance? Decode burst pipes, flooding, and leak coverage. Understand policy terms and claim steps for homeowners.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/insurance-decoder/water-damage',
  },
  openGraph: {
    title: 'Water Damage Insurance Decoder',
    description: 'Is water damage covered by your insurance? Decode policy terms and claim steps.',
    type: 'website',
  },
};

export default function WaterDamageInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        icon: <Droplets className="h-12 w-12" />,
        title: "Water Damage Insurance Decoder",
        subtitle: "Is water damage covered by your insurance? Decode burst pipes, flooding, and leak coverage in your policy.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Insurance Decoder", href: "/insurance-decoder" },
        { label: "Water Damage Coverage" },
      ]}
    />
  );
}
