import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Storm Drain Sewage Backup | Disaster Recovery',
  description: 'Professional storm drain sewage backup services in Queensland. 24/7 emergency response for stormwater overflow, drain flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/storm-drain-backup',
  },
};

export default function StormDrainSewageBackupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Storm Drain Sewage Backup',
        subtitle: 'Professional storm drain sewage backup services in Queensland. 24/7 emergency response for stormwater overflow, drain flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Storm Drain Sewage Backup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Storm Drain Sewage Backup', parentCategory: 'Sewage Cleanup', context: 'stormwater overflow and drain flooding' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
