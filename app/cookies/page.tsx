import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How Disaster Recovery Australia uses cookies and similar technologies. Learn about the cookies we use and how to manage your preferences.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/cookies',
  },
  openGraph: {
    title: 'Cookie Policy',
    description: 'How Disaster Recovery Australia uses cookies and similar technologies.',
    type: 'website',
  },
};

export default function CookiesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: "Cookies",
        subtitle: "How Disaster Recovery Australia uses cookies and similar technologies on our website.",
      }}
      cta={{ text: 'Contact Us', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Cookies" },
      ]}
    />
  );
}
