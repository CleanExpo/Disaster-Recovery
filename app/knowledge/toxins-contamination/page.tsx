import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Biological Toxins | Disaster Recovery",
  description: "Living organisms and their byproducts that cause health issues",
};

export default function ToxinsContaminationKnowledgePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: "Biological Toxins",
        subtitle: "Living organisms and their byproducts that cause health issues",
      }}
      cta={{ text: 'Get Started', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Knowledge", href: "/knowledge" },
        { label: "Biological Toxins" },
      ]}
    />
  );
}
