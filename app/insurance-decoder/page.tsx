import { Metadata } from 'next';
import { FileSearch } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Burst Pipe Water Damage | Disaster Recovery",
  description: "",
};

export default function InsuranceDecoderHub() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
        icon: <FileSearch className="h-12 w-12" />,
        title: "Burst Pipe Water Damage",
        subtitle: "",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Burst Pipe Water Damage" },
      ]}
    />
  );
}
