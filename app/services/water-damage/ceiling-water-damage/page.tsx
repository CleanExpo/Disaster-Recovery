import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Response | Disaster Recovery',
  description: 'Expert ceiling water damage repair and restoration in Queensland. Emergency response for ceiling leaks, sagging, and collapse prevention.',
};

export default function CeilingWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Emergency Response',
        subtitle: 'Expert ceiling water damage repair and restoration in Queensland. Emergency response for ceiling leaks, sagging, and collapse prevention.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Emergency Response' },
      ]}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
