import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Sewage Decontamination Services | Disaster Recovery',
  description: 'Professional sewage decontamination services services in Queensland. 24/7 emergency response for sanitisation, bacterial cleanup.',
};

export default function SewageDecontaminationServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Sewage Decontamination Services',
        subtitle: 'Professional sewage decontamination services services in Queensland. 24/7 emergency response for sanitisation, bacterial cleanup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Sewage Decontamination Services' },
      ]}
    />
  );
}
