import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEquipmentSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Professional Equipment Catalogue | Disaster Recovery Equipment & Specifications',
  description: 'Browse our comprehensive catalogue of professional disaster recovery equipment. Detailed specifications, rental pricing, and availability for water damage, fire restoration, and mould remediation equipment.',
  keywords: 'disaster recovery equipment, restoration equipment catalogue, industrial dehumidifiers, air scrubbers, thermal imaging cameras, moisture meters, equipment rental Brisbane',
  openGraph: {
    title: 'Professional Disaster Recovery Equipment Catalogue',
    description: 'Complete catalogue of professional-grade restoration equipment with detailed specifications and rental options.',
    images: ['/images/equipment/catalog-hero.jpg'],
    type: 'website' } };

export default function EquipmentCatalogPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'Disaster Recovery Equipment Catalogue',
        subtitle: 'State-of-the-art restoration equipment with detailed specifications, technical data, and rental pricing for professional contractors',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'Disaster Recovery Equipment Catalogue' },
      ]}
      sections={getEquipmentSections({ equipmentName: 'Equipment Catalogue', useCase: 'comprehensive disaster recovery equipment' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
