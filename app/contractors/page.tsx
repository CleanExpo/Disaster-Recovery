import { Metadata } from 'next';
import { Wrench } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Join Our Contractor Network | IICRC',
  description: 'Join Australia\'s premier disaster recovery network. IICRC certification required. Get qualified leads in your service area.' };

export default function ContractorsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Wrench className="h-12 w-12" />,
        title: "Join Our Network",
        subtitle: "Join Australia's premier disaster recovery network. IICRC certification required. Get qualified leads in your service area.",
      }}
      cta={{ text: 'Apply Now', href: '/contractor/apply' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Join Our Network" },
      ]}
    />
  );
}
