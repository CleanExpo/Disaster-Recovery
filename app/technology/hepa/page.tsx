import { Metadata } from 'next';
import { Cpu } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getTechnologySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'HEPA Air Filtration Systems',
  description: 'Hospital-grade HEPA filtration technology removes 99.97% of airborne particles including mould spores, allergens, and contaminants. EPA-approved air quality restoration.',
  keywords: 'HEPA filtration, air scrubbing, mould spore removal, air quality, negative air machines, air purification',
  openGraph: {
    title: 'HEPA Air Filtration Systems',
    description: 'Breathe easy with our hospital-grade HEPA air filtration technology.',
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/technology/hepa',
  },
};

export default function HEPAFiltrationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)',
        icon: <Cpu className="h-12 w-12" />,
        title: 'HEPA Air Filtration Systems',
        subtitle: 'Restore air quality to pristine conditions with our hospital-grade HEPA filtration systems. Remove 99.97% of airborne contaminants including mould spores, allergens, and pathogens.',
      }}
      cta={{ text: 'See Our Technology', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Technology', href: '/technology' },
        { label: 'HEPA Air Filtration Systems' },
      ]}
      sections={getTechnologySections({ techType: 'HEPA Filtration', feature: 'Hospital-grade air filtration for contamination control during restoration.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
