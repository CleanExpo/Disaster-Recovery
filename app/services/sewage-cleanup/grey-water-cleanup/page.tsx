import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Grey Water Damage Cleanup',
  description: 'Professional grey water damage cleanup services in Queensland. 24/7 emergency response for washing machine water, sink overflow.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/grey-water-cleanup',
  },
};

export default function GreyWaterDamageCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Grey Water Damage Cleanup',
        subtitle: 'Professional grey water damage cleanup services in Queensland. 24/7 emergency response for washing machine water, sink overflow.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Grey Water Damage Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Grey Water Damage Cleanup', parentCategory: 'Sewage Cleanup', context: 'washing machine and sink overflow cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
