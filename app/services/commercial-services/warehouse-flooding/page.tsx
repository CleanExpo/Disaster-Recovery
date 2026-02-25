import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Warehouse Flood Cleanup | Disaster Recovery',
  description: 'Professional warehouse flood cleanup services in Queensland. 24/7 emergency response for industrial flooding, storage water damage.',
};

export default function WarehouseFloodCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Warehouse Flood Cleanup',
        subtitle: 'Professional warehouse flood cleanup services in Queensland. 24/7 emergency response for industrial flooding, storage water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Warehouse Flood Cleanup' },
      ]}
    />
  );
}
