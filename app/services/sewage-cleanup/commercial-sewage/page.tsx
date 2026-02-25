import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Commercial Sewage Cleanup | Disaster Recovery',
  description: 'Professional commercial sewage cleanup services in Queensland. 24/7 emergency response for business sewage, workplace contamination.',
};

export default function CommercialSewageCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Commercial Sewage Cleanup',
        subtitle: 'Professional commercial sewage cleanup services in Queensland. 24/7 emergency response for business sewage, workplace contamination.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Commercial Sewage Cleanup' },
      ]}
    />
  );
}
