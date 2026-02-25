import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Bodily Fluid Cleanup | Disaster Recovery',
  description: 'Professional bodily fluid cleanup services in Queensland. 24/7 emergency response for vomit cleanup, human waste.',
};

export default function BodilyFluidCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Bodily Fluid Cleanup',
        subtitle: 'Professional bodily fluid cleanup services in Queensland. 24/7 emergency response for vomit cleanup, human waste.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Bodily Fluid Cleanup' },
      ]}
    />
  );
}
