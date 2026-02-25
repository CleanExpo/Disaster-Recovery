import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Retail Store Flood Recovery | Disaster Recovery',
  description: 'Professional retail store flood recovery services in Queensland. 24/7 emergency response for shop flooding, retail water damage.',
};

export default function RetailStoreFloodRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Retail Store Flood Recovery',
        subtitle: 'Professional retail store flood recovery services in Queensland. 24/7 emergency response for shop flooding, retail water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Retail Store Flood Recovery' },
      ]}
    />
  );
}
