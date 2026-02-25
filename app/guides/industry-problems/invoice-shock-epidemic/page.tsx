import { Metadata } from 'next';
import { Factory } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Invoice Shock Epidemic - NSW Fair Trading Warns of Contractor Exploitation | Disaster Recovery',
  description: 'NSW Fair Trading reports 45+ complaints against single traders. ACCC investigating emergency pricing exploitation. Learn how to protect yourself from invoice shock tactics.',
  keywords: 'NSW Fair Trading contractor complaints, ACCC emergency pricing, invoice shock epidemic, hidden costs disaster recovery, consumer protection emergency services',
  openGraph: {
    title: 'Invoice Shock Crisis - NSW Fair Trading & ACCC Warnings',
    description: 'Government agencies warn of contractor exploitation. 45 complaints against single trader causing $52,957 consumer detriment.' }
};

export default function InvoiceShockEpidemicPage() {
  return (
    <AgGuidePageTemplate
      category="Industry Problems"
      title="Invoice Shock Epidemic - NSW Fair Trading Warns of Contractor Exploitation"
      subtitle="NSW Fair Trading reports 45+ complaints against single traders. ACCC investigating emergency pricing exploitation. Learn how to protect yourself from invoice shock tactics."
      gradient="linear-gradient(135deg, #1E293B 0%, #475569 100%)"
      icon={<Factory className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Industry Problems', href: '/guides/industry-problems' },
        { label: 'Invoice Shock Epidemic - NSW Fair Trading Warns...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
