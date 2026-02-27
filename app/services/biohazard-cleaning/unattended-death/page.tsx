import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Unattended Death Cleanup | Disaster Recovery',
  description: 'Professional unattended death cleanup services in Queensland. 24/7 emergency response for decomposition cleanup, deceased estate.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/unattended-death',
  },
};

export default function UnattendedDeathCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Unattended Death Cleanup',
        subtitle: 'Professional unattended death cleanup services in Queensland. 24/7 emergency response for decomposition cleanup, deceased estate.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Unattended Death Cleanup' },
      ]}
    />
  );
}
