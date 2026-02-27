import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Main Sewer Line Backup',
  description: 'Professional main sewer line backup services across Australia. 24/7 emergency response for sewer blockage, main drain backup.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/main-line-backup',
  },
};

export default function MainSewerLineBackupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Main Sewer Line Backup',
        subtitle: 'Professional main sewer line backup services across Australia. 24/7 emergency response for sewer blockage, main drain backup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Main Sewer Line Backup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Main Sewer Line Backup', parentCategory: 'Sewage Cleanup', context: 'main sewer blockage and drain backup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
