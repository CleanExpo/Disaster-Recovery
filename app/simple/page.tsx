import { Metadata } from 'next';
import { Zap } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Recovery Australia | 24/7 Emergency Restoration',
  description: 'Disaster Recovery Australia connects property owners with IICRC-certified restoration contractors. 24/7 emergency response for water, fire, storm, and mould damage.',
  robots: { index: false, follow: false },
};

export default function SimplePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Zap className="h-12 w-12" />,
        title: "Simple Server Component Page",
        subtitle: "",
      }}
      cta={{ text: 'Get Started', href: '/' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Simple Server Component Page" },
      ]}
    />
  );
}
