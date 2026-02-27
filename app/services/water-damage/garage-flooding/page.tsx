import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Garage Flood Cleanup | Disaster Recovery',
  description: 'Professional garage flood cleanup services in Queensland. 24/7 emergency response for garage water damage, carport flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/garage-flooding',
  },
};

export default function GarageFloodCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Garage Flood Cleanup',
        subtitle: 'Professional garage flood cleanup services in Queensland. 24/7 emergency response for garage water damage, carport flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Garage Flood Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Garage Flood Cleanup', parentCategory: 'Water Damage', context: 'garage water damage and carport flooding restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
