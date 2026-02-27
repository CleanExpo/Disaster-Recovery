import { Metadata } from 'next';
import { Handshake } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'NRMA Policyholder Emergency Claim',
  description: 'NRMA policyholders receive priority emergency restoration matching. Submit your claim for fast-tracked IICRC-certified contractor response across Australia.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/partners/nrma',
  },
  openGraph: {
    title: 'NRMA Policyholder Emergency Claim',
    description: 'NRMA policyholders receive priority matching with IICRC-certified restoration contractors.',
    type: 'website',
  },
};

export default function NRMAPartnershipPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Handshake className="h-12 w-12" />,
        title: "Emergency Claim",
        subtitle: "NRMA policyholders jump to front of queue",
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
