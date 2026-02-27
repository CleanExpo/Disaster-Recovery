import { Metadata } from 'next';
import { ClipboardCheck } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Technical Assessment Services',
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
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <ClipboardCheck className="h-12 w-12" />,
        title: 'Technical Assessment Services',
        subtitle: 'Professional technical assessment and damage evaluation services. IICRC certified inspectors provide comprehensive reports for insurance claims and restoration planning.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Technical Assessment Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Technical Assessment Services', parentCategory: 'Technical Services', context: 'property damage evaluation and insurance inspection' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
