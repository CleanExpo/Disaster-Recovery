import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Government Funding & Assistance",
  description: "Financial assistance for disaster-affected communities to rebuild essential infrastructure",
  alternates: {
    canonical: 'https://disasterrecovery.com.au/government-funding',
  },
};

export default function GovernmentFundingPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: "Government Funding & Assistance",
        subtitle: "Financial assistance for disaster-affected communities to rebuild essential infrastructure",
      }}
      cta={{ text: 'Learn More', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Government Funding & Assistance" },
      ]}
    />
  );
}
