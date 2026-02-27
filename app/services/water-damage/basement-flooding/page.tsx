import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Basement Flooding Cleanup Brisbane | Disaster Recovery',
  description: 'Emergency basement flooding cleanup and restoration in Brisbane. 24/7 water extraction, drying, and flood damage repair services.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/basement-flooding',
  },
};

export default function BasementFloodingPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Basement Flooding Cleanup Brisbane',
        subtitle: 'Emergency basement flooding cleanup and restoration in Brisbane. 24/7 water extraction, drying, and flood damage repair services.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Basement Flooding Cleanup Brisbane' },
      ]}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
