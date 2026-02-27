import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Septic Tank Overflow Cleanup | Disaster Recovery',
  description: 'Professional septic tank overflow cleanup services in Queensland. 24/7 emergency response for septic backup, tank overflow.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/septic-overflow',
  },
};

export default function SepticTankOverflowCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Septic Tank Overflow Cleanup',
        subtitle: 'Professional septic tank overflow cleanup services in Queensland. 24/7 emergency response for septic backup, tank overflow.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Septic Tank Overflow Cleanup' },
      ]}
    />
  );
}
