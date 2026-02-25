import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Life Safety | Disaster Recovery",
  description: "Corporate offices, co-working spaces, professional services",
};

export default function CommercialPropertyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: "Life Safety",
        subtitle: "Corporate offices, co-working spaces, professional services",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Property", href: "/property" },
        { label: "Life Safety" },
      ]}
    />
  );
}
