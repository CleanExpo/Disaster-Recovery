import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Crawl Space Water Removal | Disaster Recovery',
  description: 'Professional crawl space water removal services in Queensland. 24/7 emergency response for under house flooding, subfloor water.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/crawl-space-flooding',
  },
};

export default function CrawlSpaceWaterRemovalPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Crawl Space Water Removal',
        subtitle: 'Professional crawl space water removal services in Queensland. 24/7 emergency response for under house flooding, subfloor water.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Crawl Space Water Removal' },
      ]}
    />
  );
}
