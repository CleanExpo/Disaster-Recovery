import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Fence Storm Damage Repair',
  description: 'Professional fence storm damage repair services across Australia. 24/7 emergency response for fence repair, boundary damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/fence-storm-damage',
  },
};

export default function FenceStormDamageRepairPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Fence Storm Damage Repair',
        subtitle: 'Professional fence storm damage repair services across Australia. 24/7 emergency response for fence repair, boundary damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Fence Storm Damage Repair' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Fence Storm Damage Repair', parentCategory: 'Storm Damage', context: 'storm-damaged fence and boundary restoration' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
  );
}
