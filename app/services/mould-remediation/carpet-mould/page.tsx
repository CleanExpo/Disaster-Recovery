import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Carpet Mould Remediation',
  description: 'Professional carpet mould remediation services across Australia. 24/7 emergency response for mouldy carpet, underlay mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/carpet-mould',
  },
};

export default function CarpetMouldRemediationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Carpet Mould Remediation',
        subtitle: 'Professional carpet mould remediation services across Australia. 24/7 emergency response for mouldy carpet, underlay mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Carpet Mould Remediation' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Carpet Mould Remediation', parentCategory: 'Mould Remediation', context: 'carpet and underlay mould treatment' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
