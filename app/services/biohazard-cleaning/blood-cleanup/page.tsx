import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Blood Spill Cleanup Services | Disaster Recovery',
  description: 'Professional blood spill cleanup services services in Queensland. 24/7 emergency response for bloodborne pathogen, accident cleanup.',
};

export default function BloodSpillCleanupServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Blood Spill Cleanup Services',
        subtitle: 'Professional blood spill cleanup services services in Queensland. 24/7 emergency response for bloodborne pathogen, accident cleanup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Blood Spill Cleanup Services' },
      ]}
    />
  );
}
