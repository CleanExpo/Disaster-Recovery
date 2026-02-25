import { Metadata } from 'next';
import { ClipboardCheck } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Technical Assessment Services | Property Damage Evaluation | NRP Australia',
  description: 'Professional technical assessment and damage evaluation services. IICRC certified inspectors provide comprehensive reports for insurance claims and restoration planning.',
  keywords: [
    'technical assessment',
    'property damage evaluation',
    'moisture detection',
    'thermal imaging',
    'structural damage assessment',
    'insurance inspection',
    'damage documentation',
    'restoration planning'
  ] };

export default function TechnicalAssessmentPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <ClipboardCheck className="h-12 w-12" />,
        title: 'Technical Assessment Services',
        subtitle: 'Professional technical assessment and damage evaluation services. IICRC certified inspectors provide comprehensive reports for insurance claims and restoration planning.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Technical Assessment Services' },
      ]}
    />
  );
}
