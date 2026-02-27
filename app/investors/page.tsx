import { Metadata } from 'next';
import { TrendingUp } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Investor Information',
  description: 'Investor information for Disaster Recovery Australia. National disaster restoration claims distribution platform covering all Australian states and territories.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/investors',
  },
  openGraph: {
    title: 'Investor Information',
    description: 'Investor information for Disaster Recovery Australia — national claims distribution platform.',
    type: 'website',
  },
};

export default function InvestorsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <TrendingUp className="h-12 w-12" />,
        title: "Investors",
        subtitle: "",
      }}
      cta={{ text: 'Investor Contact', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Investors" },
      ]}
    />
  );
}
