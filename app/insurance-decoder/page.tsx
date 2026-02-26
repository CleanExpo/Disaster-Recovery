import { Metadata } from 'next';
import { FileSearch } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Insurance Decoder | Disaster Recovery Australia',
  description: 'Decode your home insurance policy. Understand what water damage, fire, storm, and mould coverage actually means and what to do when you need to claim.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/insurance-decoder',
  },
  openGraph: {
    title: 'Insurance Decoder | Disaster Recovery Australia',
    description: 'Decode your home insurance policy. Understand disaster coverage and claims.',
    type: 'website',
  },
};

export default function InsuranceDecoderHub() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
        icon: <FileSearch className="h-12 w-12" />,
        title: "Insurance Decoder",
        subtitle: "Decode your home insurance policy. Understand what your coverage actually means before you need to claim.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Insurance Decoder" },
      ]}
    />
  );
}
