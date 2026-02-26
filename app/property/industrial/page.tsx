import { Metadata } from 'next';
import { Factory } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Industrial Facility Disaster Recovery | Disaster Recovery',
  description: 'Disaster restoration for industrial facilities — factories, warehouses, processing plants, and manufacturing sites. IICRC-certified contractors with HAZMAT and confined-space capability.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/property/industrial',
  },
  openGraph: {
    title: 'Industrial Facility Disaster Recovery | Disaster Recovery',
    description: 'Disaster restoration for factories, warehouses, and manufacturing sites. IICRC-certified contractors.',
    type: 'website',
  },
};

export default function IndustrialPropertyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Factory className="h-12 w-12" />,
        title: "Industrial Facility Disaster Recovery",
        subtitle: "Production plants, assembly lines, fabrication shops",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Property", href: "/property" },
        { label: "Industrial Facility Disaster Recovery" },
      ]}
    />
  );
}
