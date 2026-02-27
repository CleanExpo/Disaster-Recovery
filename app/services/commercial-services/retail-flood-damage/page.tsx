import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Retail Store Flood Recovery | Disaster Recovery',
  description: 'Professional retail store flood recovery services across Australia. 24/7 emergency response for shop flooding, retail water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/retail-flood-damage',
  },
};

export default function RetailStoreFloodRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Retail Store Flood Recovery',
        subtitle: 'Professional retail store flood recovery services across Australia. 24/7 emergency response for shop flooding, retail water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Retail Store Flood Recovery' },
      ]}
    />
  );
}
