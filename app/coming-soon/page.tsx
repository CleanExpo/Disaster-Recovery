import { Metadata } from 'next';
import { Clock } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'New features and services coming soon to Disaster Recovery Australia. IICRC-certified disaster restoration platform covering all Australian states and territories.',
  openGraph: {
    title: 'Coming Soon',
    description: 'New features and services coming soon to Disaster Recovery Australia.',
    type: 'website',
  },
};

export default function ComingSoonPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Clock className="h-12 w-12" />,
        title: "Coming Soon",
        subtitle: "",
      }}
      cta={{ text: 'Contact Us', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Coming Soon" },
      ]}
    />
  );
}
