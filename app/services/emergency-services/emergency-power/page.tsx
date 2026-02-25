import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Emergency Power Solutions | Disaster Recovery',
  description: 'Professional emergency power solutions services in Queensland. 24/7 emergency response for generators, temporary power.',
};

export default function EmergencyPowerSolutionsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Power Solutions',
        subtitle: 'Professional emergency power solutions services in Queensland. 24/7 emergency response for generators, temporary power.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Power Solutions' },
      ]}
    />
  );
}
