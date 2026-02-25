import { Metadata } from 'next';
import { Home } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Initial Contact | Disaster Recovery",
  description: "Single-family homes on individual blocks",
};

export default function ResidentialPropertyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Home className="h-12 w-12" />,
        title: "Initial Contact",
        subtitle: "Single-family homes on individual blocks",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Property", href: "/property" },
        { label: "Initial Contact" },
      ]}
    />
  );
}
