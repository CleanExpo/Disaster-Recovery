import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Fire Damage Insurance Decoder',
  description: 'Is fire damage covered by your home insurance? Decode dwelling, contents, and additional living expenses coverage. Understand policy exclusions and claim documentation requirements.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/insurance-decoder/fire-damage',
  },
  openGraph: {
    title: 'Fire Damage Insurance Decoder',
    description: 'Is fire damage covered by your insurance? Decode dwelling, contents, and living expenses coverage.',
    type: 'website',
  },
};

export default function FireDamageInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Flame className="h-12 w-12" />,
        title: "Fire Damage Insurance Decoder",
        subtitle: "Understand your fire damage insurance coverage, exclusions, and what documentation you need for a successful claim.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Insurance Decoder", href: "/insurance-decoder" },
        { label: "Fire Damage Coverage" },
      ]}
    />
  );
}
