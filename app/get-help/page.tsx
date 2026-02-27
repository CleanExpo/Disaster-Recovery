import { Metadata } from 'next';
import { LifeBuoy } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Get Emergency Help | Disaster Recovery",
  description: "Get instant help from IICRC certified disaster recovery contractors in your area. 24/7 emergency response, IICRC-certified.",
  alternates: {
    canonical: 'https://disasterrecovery.com.au/get-help',
  },
};

export default function GetHelpPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <LifeBuoy className="h-12 w-12" />,
        title: "Get Emergency Help",
        subtitle: "Get instant help from IICRC certified disaster recovery contractors in your area. 24/7 emergency response, IICRC-certified.",
      }}
      cta={{ text: 'Get Help Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Get Emergency Help" },
      ]}
    />
  );
}
