import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Mould Insurance Coverage Decoder | Disaster Recovery',
  description: 'Is mould covered by your home insurance? Decode your policy to understand mould coverage, exclusions, and what documentation you need for a successful claim.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/insurance-decoder/mould',
  },
  openGraph: {
    title: 'Mould Insurance Coverage Decoder | Disaster Recovery',
    description: 'Understand your insurance policy mould coverage, exclusions, and claim requirements.',
    type: 'website',
  },
};

export default function MouldInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <Bug className="h-12 w-12" />,
        title: "Mould Insurance Coverage Decoder",
        subtitle: "Is mould covered by your home insurance? Understand coverage, exclusions, and what documentation you need.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Insurance Decoder", href: "/insurance-decoder" },
        { label: "Mould Coverage" },
      ]}
    />
  );
}
