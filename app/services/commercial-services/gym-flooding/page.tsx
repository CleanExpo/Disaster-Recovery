import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Gym & Fitness Centre Flooding | Disaster Recovery',
  description: 'Professional gym & fitness centre flooding services in Queensland. 24/7 emergency response for sports facility, gym water damage.',
};

export default function GymFitnessCenterFloodingPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Gym & Fitness Centre Flooding',
        subtitle: 'Professional gym & fitness centre flooding services in Queensland. 24/7 emergency response for sports facility, gym water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Gym & Fitness Centre Flooding' },
      ]}
    />
  );
}
