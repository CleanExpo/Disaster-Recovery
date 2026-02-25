import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Basement Sewage Flooding | Disaster Recovery',
  description: 'Professional basement sewage flooding services in Queensland. 24/7 emergency response for lower level sewage, underground backup.',
};

export default function BasementSewageFloodingPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Basement Sewage Flooding',
        subtitle: 'Professional basement sewage flooding services in Queensland. 24/7 emergency response for lower level sewage, underground backup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Basement Sewage Flooding' },
      ]}
    />
  );
}
