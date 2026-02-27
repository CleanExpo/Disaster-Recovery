import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Timber Mould Treatment | Disaster Recovery',
  description: 'Professional timber mould treatment services in Queensland. 24/7 emergency response for wood rot, structural mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/timber-mould',
  },
};

export default function TimberMouldTreatmentPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Timber Mould Treatment',
        subtitle: 'Professional timber mould treatment services in Queensland. 24/7 emergency response for wood rot, structural mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Timber Mould Treatment' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Timber Mould Treatment', parentCategory: 'Mould Remediation', context: 'wood rot and structural timber mould treatment' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
