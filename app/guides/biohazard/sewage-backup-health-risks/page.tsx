import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Sewage Backup: Health Risks & Safe Cleanup | Disaster Recovery',
  description: 'Expert answers and solutions for "sewage backup cleanup health risks". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'sewage backup cleanup health risks, disaster recovery, restoration services, Australia, IICRC certified' };

export default function SewageBackupHealthRisksPage() {
  return (
    <AgGuidePageTemplate
      category="Biohazard"
      title="Sewage Backup: Health Risks & Safe Cleanup"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)"
      icon={<AlertTriangle className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Biohazard', href: '/guides/biohazard' },
        { label: 'Sewage Backup: Health Risks & Safe Cleanup' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
