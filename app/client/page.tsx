import { Metadata } from 'next';
import { User } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Client Portal | Disaster Recovery",
  description: "",
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
