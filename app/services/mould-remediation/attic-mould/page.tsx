import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Attic Mould Removal',
  description: 'Professional attic mould removal services in Queensland. 24/7 emergency response for roof cavity mould, ceiling mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/attic-mould',
  },
};

export default function AtticMouldRemovalPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Attic Mould Removal',
        subtitle: 'Professional attic mould removal services in Queensland. 24/7 emergency response for roof cavity mould, ceiling mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Attic Mould Removal' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Attic Mould Removal', parentCategory: 'Mould Remediation', context: 'roof cavity and ceiling mould removal and prevention' })}
      relatedPages={getRelatedPages('biohazard')}
    />
  );
}
