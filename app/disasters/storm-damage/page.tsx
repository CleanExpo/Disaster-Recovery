import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getDisasterSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Severe Storm Response Services | 24/7',
  description: 'Emergency storm damage repairs including roof tarping, water extraction, and debris removal. Serving All Australian States. 30 minutes response time.',
  keywords: ["storm damage repair","emergency tarping","hail damage"],
  alternates: { canonical: 'https://disasterrecovery.com.au/disasters/storm-damage' },
};

export default function SevereStormResponsePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Severe Storm Response',
        subtitle: 'Emergency storm damage repairs including roof tarping, water extraction, and debris removal',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Disasters', href: '/disasters' },
        { label: 'Severe Storm Response' },
      ]}
      sections={getDisasterSections({ disasterType: 'Storm', description: 'Comprehensive storm damage repair including roof, water ingress, and debris.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
