import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Data Centre Water Damage',
  description: 'Professional data centre water damage services across Australia. 24/7 emergency response for server room flooding, IT disaster.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/data-center-flooding',
  },
};

export default function DataCenterWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Data Centre Water Damage',
        subtitle: 'Professional data centre water damage services across Australia. 24/7 emergency response for server room flooding, IT disaster.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Data Centre Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Data Centre Water Damage', parentCategory: 'Commercial Services', context: 'server room flooding and IT infrastructure recovery' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
