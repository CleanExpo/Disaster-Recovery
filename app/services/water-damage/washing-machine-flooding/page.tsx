import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Washing Machine Flood Damage',
  description: 'Professional washing machine flood damage services in Queensland. 24/7 emergency response for washing machine overflow, laundry flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/washing-machine-flooding',
  },
};

export default function WashingMachineFloodDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Washing Machine Flood Damage',
        subtitle: 'Professional washing machine flood damage services in Queensland. 24/7 emergency response for washing machine overflow, laundry flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Washing Machine Flood Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Washing Machine Flood Damage', parentCategory: 'Water Damage', context: 'washing machine overflow and laundry flooding cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
