import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Cognitive Performance | Disaster Recovery",
  description: "Poor indoor air quality reduces cognitive function by up to 9%. Professional restoration prevents this invisible threat.",
};

export default function WhyFirstPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Award className="h-12 w-12" />,
        title: "Cognitive Performance",
        subtitle: "Poor indoor air quality reduces cognitive function by up to 9%. Professional restoration prevents this invisible threat.",
      }}
      cta={{ text: 'Get Started', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Cognitive Performance" },
      ]}
    />
  );
}
