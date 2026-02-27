import { Metadata } from 'next';
import { ClipboardCheck } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Apply to Join Network",
  description: "Apply to join Australia's premier disaster recovery network. IICRC certification required. Get qualified leads in your territory.",
};

export default function ContractorApplicationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <ClipboardCheck className="h-12 w-12" />,
        title: "Apply to Join Network",
        subtitle: "Apply to join Australia's premier disaster recovery network. IICRC certification required. Get qualified leads in your territory.",
      }}
      cta={{ text: 'Get Started', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Contractors", href: "/contractors" },
        { label: "Apply to Join Network" },
      ]}
    />
  );
}
