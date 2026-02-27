import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Document Water Damage Recovery | Disaster Recovery',
  description: 'Professional document water damage recovery services in Queensland. 24/7 emergency response for paper restoration, book drying.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/document-drying',
  },
};

export default function DocumentWaterDamageRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Document Water Damage Recovery',
        subtitle: 'Professional document water damage recovery services in Queensland. 24/7 emergency response for paper restoration, book drying.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Document Water Damage Recovery' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Document Water Damage Recovery', parentCategory: 'Specialty Services', context: 'paper restoration and book drying services' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
