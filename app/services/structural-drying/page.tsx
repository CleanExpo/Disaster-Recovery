import { Metadata } from 'next';
import { Wind } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Structural Drying Services',
  description: 'Professional structural drying services with industrial dehumidifiers, air movers, and moisture monitoring. Expert water extraction and building drying to prevent mould and structural damage.',
  keywords: [
    'structural drying',
    'professional water extraction',
    'industrial dehumidifiers',
    'building drying services',
    'moisture removal',
    'water damage drying',
    'structural moisture control',
    'professional drying equipment',
    'water extraction services',
    'humidity control',
    'moisture monitoring',
    'building dehumidification',
    'water damage mitigation',
    'structural water removal',
    'professional drying technicians'
  ],
  openGraph: {
    title: 'Professional Structural Drying Services',
    description: 'Expert structural drying services with industrial equipment. Professional water extraction, dehumidification, and moisture monitoring to prevent mould and structural damage.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Structural Drying Services | Professional Water Extraction',
    description: 'Expert structural drying services. Industrial dehumidifiers, air movers, and professional moisture monitoring available 24/7.',
  },
  alternates: {
    canonical: '/services/structural-drying' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

export default function StructuralDryingPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Wind className="h-12 w-12" />,
        title: 'Structural Drying Services',
        subtitle: 'Professional structural drying services with industrial dehumidifiers, air movers, and moisture monitoring. Expert water extraction and building drying to prevent mould and structural damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Structural Drying Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Structural Drying Services', parentCategory: 'Water Damage', context: 'industrial dehumidification and moisture control' })}
      relatedPages={getRelatedPages('structural-drying')}
    />
  );
}
