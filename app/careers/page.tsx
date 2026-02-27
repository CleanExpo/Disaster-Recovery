import { Metadata } from 'next';
import { Briefcase } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Careers at Disaster Recovery Australia',
  description: 'Join the Disaster Recovery team. Explore career opportunities in disaster restoration, contractor management, and emergency response across Australia.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/careers',
  },
  openGraph: {
    title: 'Careers at Disaster Recovery Australia',
    description: 'Explore career opportunities in disaster restoration and emergency response across Australia.',
    type: 'website',
  },
};

export default function CareersPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Briefcase className="h-12 w-12" />,
        title: "Careers",
        subtitle: "Join the Disaster Recovery team. We are building Australia's largest IICRC-certified contractor network for emergency restoration.",
      }}
      cta={{ text: 'View Openings', href: '/careers' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Careers" },
      ]}
    />
  );
}
