import { Metadata } from 'next';
import { Home } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Residential Property Restoration | Disaster Recovery Australia',
  description: 'Disaster restoration for all residential property types — houses, units, apartments, townhouses, and high-rises. IICRC-certified contractors for water, fire, storm, and mould damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/property/residential',
  },
  openGraph: {
    title: 'Residential Property Restoration | Disaster Recovery Australia',
    description: 'Disaster restoration for all residential property types. IICRC-certified contractors Australia-wide.',
    type: 'website',
  },
};

export default function ResidentialPropertyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Home className="h-12 w-12" />,
        title: "Residential Property Restoration",
        subtitle: "Disaster restoration for houses, units, apartments, townhouses, and high-rises across Australia.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Property", href: "/property" },
        { label: "Residential" },
      ]}
    />
  );
}
