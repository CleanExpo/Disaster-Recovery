import { Metadata } from 'next';
import { Lock } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Privacy Policy | Disaster Recovery Australia',
  description: 'Privacy Policy for Disaster Recovery Australia. How we collect, use, and protect your personal information under the Australian Privacy Act.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Disaster Recovery Australia',
    description: 'How Disaster Recovery Australia collects, uses, and protects your personal information.',
    type: 'website',
  },
};

export default function PrivacyPolicy() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Lock className="h-12 w-12" />,
        title: "Privacy Policy",
        subtitle: "Privacy Policy for Disaster Recovery - How we collect, use, and protect your personal information.",
      }}
      cta={{ text: 'Contact Us', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Privacy Policy" },
      ]}
    />
  );
}
