import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Main Sewer Line Backup | Disaster Recovery',
  description: 'Professional main sewer line backup services in Queensland. 24/7 emergency response for sewer blockage, main drain backup.',
};

export default function MainSewerLineBackupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Main Sewer Line Backup',
        subtitle: 'Professional main sewer line backup services in Queensland. 24/7 emergency response for sewer blockage, main drain backup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Main Sewer Line Backup' },
      ]}
    />
  );
}
