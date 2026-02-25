import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Data Centre Water Damage | Disaster Recovery',
  description: 'Professional data centre water damage services in Queensland. 24/7 emergency response for server room flooding, IT disaster.',
};

export default function DataCenterWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Data Centre Water Damage',
        subtitle: 'Professional data centre water damage services in Queensland. 24/7 emergency response for server room flooding, IT disaster.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Data Centre Water Damage' },
      ]}
    />
  );
}
