import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Emergency Sanitisation | Disaster Recovery',
  description: 'Professional emergency sanitisation services in Queensland. 24/7 emergency response for urgent disinfection, contamination control.',
};

export default function EmergencySanitisationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Sanitisation',
        subtitle: 'Professional emergency sanitisation services in Queensland. 24/7 emergency response for urgent disinfection, contamination control.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Sanitisation' },
      ]}
    />
  );
}
