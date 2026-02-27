import { Metadata } from 'next';
import { User } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Client Portal',
  description: 'Access your Disaster Recovery client portal. Track your restoration claim, view contractor progress, download documentation, and manage your property damage project.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/client',
  },
  openGraph: {
    title: 'Client Portal',
    description: 'Track your restoration claim, view progress, and manage your property damage project.',
    type: 'website',
  },
};

export default function ClientPortalPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <User className="h-12 w-12" />,
        title: "Client Portal",
        subtitle: "",
      }}
      cta={{ text: 'Get Started', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Client Portal" },
      ]}
    />
  );
}
