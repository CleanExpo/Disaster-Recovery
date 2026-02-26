import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Is It Covered? Insurance Coverage Checker | Disaster Recovery',
  description: 'Check whether your property damage is covered by insurance. Understand how sudden vs gradual damage affects your claim and what documentation you need.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/is-it-covered',
  },
  openGraph: {
    title: 'Is It Covered? Insurance Coverage Checker | Disaster Recovery',
    description: 'Check whether your property damage is covered by insurance. Sudden vs gradual damage explained.',
    type: 'website',
  },
};

export default function CoverageChecker() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: "Is It Covered?",
        subtitle: "Check whether your property damage is covered by insurance and understand what affects your claim.",
      }}
      cta={{ text: 'Check Coverage', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Is It Covered?" },
      ]}
    />
  );
}
