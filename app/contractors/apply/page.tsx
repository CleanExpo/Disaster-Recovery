import { Metadata } from 'next';
import { ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Apply to Join the NRPG Contractor Network | Disaster Recovery Australia",
  description: "Apply to join Australia's premier disaster recovery contractor network. IICRC certification required. Get qualified leads in your territory.",
};

export default function ContractorApplicationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <ClipboardCheck className="h-12 w-12" />,
        title: "Apply to Join the NRPG Network",
        subtitle: "Apply to join Australia's premier disaster recovery contractor network. IICRC certification required. Get qualified leads in your territory.",
      }}
      cta={{ text: 'Get Started', href: '/contractor/apply' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Contractors', href: '/contractors' },
        { label: 'Apply to Join Network' },
      ]}
      sections={[
        {
          heading: 'Privacy — Collection Notice (APP 3)',
          body: (
            <p className="text-sm text-slate-500 leading-relaxed">
              By submitting an application, you consent to Disaster Recovery Australia collecting your business and personal information to assess your application for the NRPG contractor network. Handled in accordance with the{' '}
              <Link href="/privacy-policy" className="underline hover:text-slate-700">
                Privacy Policy
              </Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
