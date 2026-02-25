import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "This is critical for determining coverage | Disaster Recovery",
  description: "Happened all at once",
};

export default function CoverageChecker() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: "This is critical for determining coverage",
        subtitle: "Happened all at once",
      }}
      cta={{ text: 'Check Coverage', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "This is critical for determining cove..." },
      ]}
    />
  );
}
