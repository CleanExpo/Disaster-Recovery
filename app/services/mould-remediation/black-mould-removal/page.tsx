import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Black Mould Removal | IICRC Certified',
  description: 'Professional black mould removal services across Australia. 24/7 emergency response for toxic black mould, stachybotrys removal. IICRC S520 certified.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/black-mould-removal',
  },
};

export default function BlackMouldRemovalPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Black Mould Removal Services',
        subtitle: 'Professional black mould removal services across Australia. 24/7 emergency response for toxic black mould, stachybotrys removal. IICRC S520 certified.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Black Mould Removal' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Black Mould Removal', parentCategory: 'Mould Remediation', context: 'toxic black mould and stachybotrys removal' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
