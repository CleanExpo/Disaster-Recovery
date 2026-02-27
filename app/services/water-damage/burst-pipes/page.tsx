import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Burst Pipe Emergency Services | 24/7',
  description: 'Emergency burst pipe repair and water damage restoration across Australia. 24/7 response for pipe bursts, leaks, and flooding. IICRC-certified technicians.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/burst-pipes',
  },
};

export default function BurstPipesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Burst Pipe Emergency Services',
        subtitle: 'Emergency burst pipe repair and water damage restoration across Australia. 24/7 response for pipe bursts, leaks, and flooding. IICRC-certified technicians.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Burst Pipe Emergency Services Brisbane' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Burst Pipe Emergency Services Brisbane', parentCategory: 'Water Damage', context: 'burst pipe repair and emergency water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
