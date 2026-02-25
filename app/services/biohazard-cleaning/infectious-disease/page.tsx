import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Infectious Disease Sanitisation | Disaster Recovery',
  description: 'Professional infectious disease sanitisation services in Queensland. 24/7 emergency response for COVID cleaning, virus disinfection.',
};

export default function InfectiousDiseaseSanitisationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Infectious Disease Sanitisation',
        subtitle: 'Professional infectious disease sanitisation services in Queensland. 24/7 emergency response for COVID cleaning, virus disinfection.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Infectious Disease Sanitisation' },
      ]}
    />
  );
}
