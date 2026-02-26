import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Storm Damage Insurance Decoder | Disaster Recovery',
  description: 'Is storm damage covered by your home insurance? Decode cyclone, hail, wind, and flood coverage. Understand excess amounts, exclusions, and claim documentation steps.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/insurance-decoder/storm-damage',
  },
  openGraph: {
    title: 'Storm Damage Insurance Decoder | Disaster Recovery',
    description: 'Is storm damage covered by your insurance? Decode cyclone, hail, wind, and flood coverage.',
    type: 'website',
  },
};

export default function StormDamageInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        icon: <CloudLightning className="h-12 w-12" />,
        title: "Storm Damage Insurance Decoder",
        subtitle: "Understand your storm, cyclone, hail, and wind damage insurance coverage, excess amounts, and claim requirements.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Insurance Decoder", href: "/insurance-decoder" },
        { label: "Storm Damage Coverage" },
      ]}
    />
  );
}
