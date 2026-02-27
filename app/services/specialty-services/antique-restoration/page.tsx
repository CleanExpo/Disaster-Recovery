import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Antique Water Damage Restoration | Disaster Recovery',
  description: 'Professional antique water damage restoration services in Queensland. 24/7 emergency response for heritage items, valuable restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/antique-restoration',
  },
};

export default function AntiqueWaterDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Antique Water Damage Restoration',
        subtitle: 'Professional antique water damage restoration services in Queensland. 24/7 emergency response for heritage items, valuable restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Antique Water Damage Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Antique Water Damage Restoration', parentCategory: 'Specialty Services', context: 'heritage item and valuable antique restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
