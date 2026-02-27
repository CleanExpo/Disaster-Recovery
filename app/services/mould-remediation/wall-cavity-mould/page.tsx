import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Wall Cavity Mould Removal | Disaster Recovery',
  description: 'Professional wall cavity mould removal services in Queensland. 24/7 emergency response for inside wall mould, hidden mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/wall-cavity-mould',
  },
};

export default function WallCavityMouldRemovalPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Wall Cavity Mould Removal',
        subtitle: 'Professional wall cavity mould removal services in Queensland. 24/7 emergency response for inside wall mould, hidden mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Wall Cavity Mould Removal' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Wall Cavity Mould Removal', parentCategory: 'Mould Remediation', context: 'hidden mould inside wall cavities' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
