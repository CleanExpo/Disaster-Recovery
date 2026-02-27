import { Metadata } from 'next';
import { Cpu } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getTechnologySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Advanced Technology',
  description: 'Industry-leading restoration technology including AI damage detection, thermal imaging, and HEPA filtration systems for superior disaster recovery results.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/technology',
  },
};

export default function TechnologyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)',
        icon: <Cpu className="h-12 w-12" />,
        title: "Advanced Technology",
        subtitle: "Industry-leading restoration technology including AI damage detection, thermal imaging, and HEPA filtration systems for superior disaster recovery results.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Advanced Technology" },
      ]}
      sections={getTechnologySections({ techType: 'Restoration Technology', feature: 'Advanced technology for faster, more thorough disaster recovery.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
