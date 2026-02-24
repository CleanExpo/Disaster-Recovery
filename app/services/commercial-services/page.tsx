import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Office Buildings | Disaster Recovery',
  description: 'Professional commercial restoration services for businesses across Queensland. Minimising downtime and protecting your business assets.',
};

export default function CommercialServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Office Buildings',
        subtitle: 'Professional commercial restoration services for businesses across Queensland. Minimising downtime and protecting your business assets.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Office Buildings' },
      ]}
    />
  );
}
