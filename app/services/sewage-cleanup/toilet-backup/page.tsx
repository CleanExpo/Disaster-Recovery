import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Toilet Sewage Backup Cleanup',
  description: 'Professional toilet sewage backup cleanup services in Queensland. 24/7 emergency response for toilet overflow, bathroom sewage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/toilet-backup',
  },
};

export default function ToiletSewageBackupCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Toilet Sewage Backup Cleanup',
        subtitle: 'Professional toilet sewage backup cleanup services in Queensland. 24/7 emergency response for toilet overflow, bathroom sewage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Toilet Sewage Backup Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Toilet Sewage Backup Cleanup', parentCategory: 'Sewage Cleanup', context: 'toilet overflow and bathroom sewage cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
