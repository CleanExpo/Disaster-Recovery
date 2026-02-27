import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Shower Leak Water Damage',
  description: 'Professional shower leak water damage services in Queensland. 24/7 emergency response for shower pan leak, bathroom flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/shower-leaks',
  },
};

export default function ShowerLeakWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Shower Leak Water Damage',
        subtitle: 'Professional shower leak water damage services in Queensland. 24/7 emergency response for shower pan leak, bathroom flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Shower Leak Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Shower Leak Water Damage', parentCategory: 'Water Damage', context: 'shower pan leak and bathroom flooding cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
