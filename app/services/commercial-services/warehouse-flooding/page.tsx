import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Warehouse Flood Cleanup | Disaster Recovery',
  description: 'Professional warehouse flood cleanup services across Australia. 24/7 emergency response for industrial flooding, storage water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/warehouse-flooding',
  },
};

export default function WarehouseFloodCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Warehouse Flood Cleanup',
        subtitle: 'Professional warehouse flood cleanup services across Australia. 24/7 emergency response for industrial flooding, storage water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Warehouse Flood Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Warehouse Flood Cleanup', parentCategory: 'Commercial Services', context: 'industrial flooding and storage water damage recovery' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
