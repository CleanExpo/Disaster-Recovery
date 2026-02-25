import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Priority Emergency Response | Disaster Recovery',
  description: 'Professional priority emergency response services in Queensland. 24/7 emergency response for rapid deployment, first response.',
};

export default function PriorityEmergencyResponsePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Siren className="h-12 w-12" />,
        title: 'Priority Emergency Response',
        subtitle: 'Professional priority emergency response services in Queensland. 24/7 emergency response for rapid deployment, first response.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Priority Emergency Response' },
      ]}
    />
  );
}
