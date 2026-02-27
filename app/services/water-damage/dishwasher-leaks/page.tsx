import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Dishwasher Leak Water Damage',
  description: 'Professional dishwasher leak water damage services across Australia. 24/7 emergency response for dishwasher flooding, kitchen water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/dishwasher-leaks',
  },
};

export default function DishwasherLeakWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Dishwasher Leak Water Damage',
        subtitle: 'Professional dishwasher leak water damage services across Australia. 24/7 emergency response for dishwasher flooding, kitchen water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Dishwasher Leak Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Dishwasher Leak Water Damage', parentCategory: 'Water Damage', context: 'dishwasher overflow and kitchen water damage cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
