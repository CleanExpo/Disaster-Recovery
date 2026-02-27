import { Metadata } from 'next';
import { Zap } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Test Page",
  description: "",
};

export default function TestPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Zap className="h-12 w-12" />,
        title: "Test Page",
        subtitle: "",
      }}
      cta={{ text: 'Get Started', href: '/' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Test Page" },
      ]}
    />
  );
}
