import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

export const metadata: Metadata = {
  title: 'Sewage Cleanup Brisbane | Disaster Recovery',
  description: 'Professional sewage cleanup and sanitisation in Brisbane & Queensland. 24/7 emergency response for sewage backup, overflow cleanup, contamination removal. Health-certified technicians. Use Our Online Form',
};

export default function SewageCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Sewage Cleanup Brisbane',
        subtitle: 'Professional sewage cleanup and sanitisation in Brisbane & Queensland. 24/7 emergency response for sewage backup, overflow cleanup, contamination removal. Health-certified technicians. Use Our Online ',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup Brisbane' },
      ]}
      sections={[
        {
          heading: 'Sewage Cleanup Services',
          body: <ServiceChildLinks category="sewage-cleanup" />,
        },
      ]}
    />
  );
}
