import { Metadata } from 'next';
import { Handshake } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Global Expansion | Disaster Recovery",
  description: "Clean Claims enters Asia-Pacific market through strategic Australian partnership",
  alternates: {
    canonical: 'https://disasterrecovery.com.au/partners/clean-claims',
  },
};

export default function CleanClaimsPartnershipPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Handshake className="h-12 w-12" />,
        title: "Global Expansion",
        subtitle: "Clean Claims enters Asia-Pacific market through strategic Australian partnership",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Partners", href: "/partners" },
        { label: "Global Expansion" },
      ]}
    />
  );
}
