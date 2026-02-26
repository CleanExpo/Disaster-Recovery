import { Metadata } from 'next';
import { Handshake } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Suncorp Group Emergency Claim | Disaster Recovery',
  description: 'Suncorp Group policyholders — AAMI, GIO, Apia, and more — receive priority emergency restoration matching with IICRC-certified contractors Australia-wide.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/partners/suncorp',
  },
  openGraph: {
    title: 'Suncorp Group Emergency Claim | Disaster Recovery',
    description: 'All Suncorp Group brands receive priority matching with IICRC-certified restoration contractors.',
    type: 'website',
  },
};

export default function SuncorpPartnershipPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Handshake className="h-12 w-12" />,
        title: "Emergency Claim",
        subtitle: "All Suncorp Group brands covered",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Partners", href: "/partners" },
        { label: "Emergency Claim" },
      ]}
    />
  );
}
