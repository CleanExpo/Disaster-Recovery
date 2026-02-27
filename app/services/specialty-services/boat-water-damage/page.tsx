import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Marine Water Damage',
  description: 'Professional marine water damage services across Australia. 24/7 emergency response for boat flooding, yacht restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/boat-water-damage',
  },
};

export default function MarineWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Marine Water Damage',
        subtitle: 'Professional marine water damage services across Australia. 24/7 emergency response for boat flooding, yacht restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Marine Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Marine Water Damage', parentCategory: 'Specialty Services', context: 'boat flooding and yacht water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
