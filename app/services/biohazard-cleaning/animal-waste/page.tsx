import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Animal Waste Cleanup | Disaster Recovery',
  description: 'Professional animal waste cleanup services in Queensland. 24/7 emergency response for pet hoarding, feces removal.',
};

export default function AnimalWasteCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Animal Waste Cleanup',
        subtitle: 'Professional animal waste cleanup services in Queensland. 24/7 emergency response for pet hoarding, feces removal.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Animal Waste Cleanup' },
      ]}
    />
  );
}
