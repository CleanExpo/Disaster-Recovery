import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Pool Leak Property Damage',
  description: 'Professional pool leak property damage services across Australia. 24/7 emergency response for swimming pool leak, pool water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/pool-leak-damage',
  },
};

export default function PoolLeakPropertyDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Pool Leak Property Damage',
        subtitle: 'Professional pool leak property damage services across Australia. 24/7 emergency response for swimming pool leak, pool water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Pool Leak Property Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Pool Leak Property Damage', parentCategory: 'Water Damage', context: 'swimming pool leak and pool water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
