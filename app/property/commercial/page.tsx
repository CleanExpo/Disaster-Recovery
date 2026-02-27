import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Commercial Property Disaster Recovery",
  description: "Commercial property disaster recovery services for corporate offices, co-working spaces, and professional services across Australia.",
  alternates: {
    canonical: 'https://disasterrecovery.com.au/property/commercial',
  },
};

export default function CommercialPropertyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: "Commercial Property Disaster Recovery",
        subtitle: "Commercial property disaster recovery services for corporate offices, co-working spaces, and professional services across Australia.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Property", href: "/property" },
        { label: "Commercial Property Disaster Recovery" },
      ]}
    />
  );
}
