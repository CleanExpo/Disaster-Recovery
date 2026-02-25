import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Office Water Damage Restoration | Disaster Recovery',
  description: 'Professional office water damage restoration services across Australia. 24/7 emergency response for commercial flooding, workplace water.',
};

export default function OfficeWaterDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Office Water Damage Restoration',
        subtitle: 'Professional office water damage restoration services across Australia. 24/7 emergency response for commercial flooding, workplace water.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Office Water Damage Restoration' },
      ]}
    />
  );
}
