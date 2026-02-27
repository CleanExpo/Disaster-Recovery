import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Toxins and Contamination Knowledge Base',
  description: 'Understand biological toxins and contamination in property damage. Mould, bacteria, viruses, and chemical hazards — health risks, cleanup standards, and IICRC-certified decontamination.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/knowledge/toxins-contamination',
  },
  openGraph: {
    title: 'Toxins and Contamination Knowledge Base',
    description: 'Biological toxins and contamination in property damage. Health risks, cleanup standards, and decontamination.',
    type: 'website',
  },
};

export default function ToxinsContaminationKnowledgePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: "Toxins and Contamination",
        subtitle: "Understanding biological toxins, chemical hazards, and contamination in property damage — health risks and cleanup standards.",
      }}
      cta={{ text: 'Get Started', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Knowledge", href: "/knowledge" },
        { label: "Toxins and Contamination" },
      ]}
    />
  );
}
