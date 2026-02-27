import Link from 'next/link';

export interface ChildPage {
  label: string;
  href: string;
  description: string;
}

/** All child pages grouped by hub category */
export const HUB_CHILDREN: Record<string, ChildPage[]> = {
  industries: [
    { label: 'Agriculture & Farming', href: '/industries/agriculture-farming', description: 'Farm and agricultural facility disaster recovery' },
    { label: 'Education & Schools', href: '/industries/education-schools', description: 'School and education facility restoration' },
    { label: 'Healthcare & Medical', href: '/industries/healthcare-medical', description: 'Healthcare facility disaster recovery' },
    { label: 'Hospitality & Tourism', href: '/industries/hospitality-tourism', description: 'Hotel, resort and tourism venue restoration' },
    { label: 'Mining & Resources', href: '/industries/mining-resources', description: 'Mining site and resource facility recovery' },
    { label: 'Retail & Shopping', href: '/industries/retail-shopping', description: 'Retail store and shopping centre restoration' },
  ],
  'property-types': [
    { label: 'Apartment Units', href: '/property-types/apartment-units', description: 'Multi-unit apartment disaster recovery' },
    { label: 'Commercial Properties', href: '/property-types/commercial', description: 'Commercial property restoration services' },
    { label: 'Commercial Offices', href: '/property-types/commercial-offices', description: 'Office building disaster recovery' },
    { label: 'Government Facilities', href: '/property-types/government', description: 'Government building and infrastructure restoration' },
    { label: 'Healthcare Facilities', href: '/property-types/healthcare-facilities', description: 'Hospital and clinic disaster recovery' },
    { label: 'Heritage Properties', href: '/property-types/heritage', description: 'Heritage-listed property restoration' },
    { label: 'High-Rise Buildings', href: '/property-types/high-rise', description: 'High-rise building disaster recovery' },
    { label: 'Hotels & Accommodation', href: '/property-types/hotels-accommodation', description: 'Hotel and accommodation restoration' },
    { label: 'Industrial Properties', href: '/property-types/industrial', description: 'Industrial facility disaster recovery' },
    { label: 'Luxury Properties', href: '/property-types/luxury', description: 'High-end luxury property restoration' },
    { label: 'Rental Properties', href: '/property-types/rental', description: 'Rental property disaster recovery for landlords' },
    { label: 'Residential Homes', href: '/property-types/residential', description: 'Residential home disaster recovery' },
    { label: 'Retail Stores', href: '/property-types/retail-stores', description: 'Retail store disaster recovery' },
    { label: 'Rural Properties', href: '/property-types/rural', description: 'Rural and remote property restoration' },
    { label: 'Schools & Education', href: '/property-types/schools-education', description: 'School building disaster recovery' },
    { label: 'Strata Properties', href: '/property-types/strata', description: 'Strata and body corporate restoration' },
    { label: 'Warehouses', href: '/property-types/warehouses', description: 'Warehouse and storage facility recovery' },
  ],
  disasters: [
    { label: 'Bushfire Restoration', href: '/disasters/bushfire-restoration', description: 'Bushfire damage assessment and restoration' },
    { label: 'Coastal Erosion', href: '/disasters/coastal-erosion', description: 'Coastal erosion damage recovery' },
    { label: 'Cyclone Response', href: '/disasters/cyclone-response', description: 'Cyclone damage emergency response and rebuild' },
    { label: 'Flood Recovery', href: '/disasters/flood-recovery', description: 'Flood damage cleanup and recovery' },
    { label: 'Storm Damage', href: '/disasters/storm-damage', description: 'Storm damage repair and restoration' },
  ],
  compare: [
    { label: 'Cheap vs Quality', href: '/compare/cheap-vs-quality', description: 'Why quality restoration saves money long-term' },
    { label: 'DIY vs Professional', href: '/compare/diy-vs-professional', description: 'When to DIY and when to call professionals' },
    { label: 'Emergency vs Scheduled', href: '/compare/emergency-vs-scheduled', description: 'Emergency response vs scheduled restoration' },
    { label: 'Insurance vs Cash', href: '/compare/insurance-vs-cash', description: 'Insurance claims vs paying out of pocket' },
    { label: 'Local vs National', href: '/compare/local-vs-national', description: 'Local contractors vs national restoration companies' },
  ],
  'specialty-services': [
    { label: 'Document Drying', href: '/services/specialty-services/document-drying', description: 'Freeze-drying and vacuum document recovery' },
    { label: 'Electronics Water Damage', href: '/services/specialty-services/electronics-water-damage', description: 'Water-damaged electronics restoration' },
    { label: 'Art Restoration', href: '/services/specialty-services/art-restoration', description: 'Artwork and fine art damage restoration' },
    { label: 'Antique Restoration', href: '/services/specialty-services/antique-restoration', description: 'Antique furniture and item restoration' },
    { label: 'Piano Water Damage', href: '/services/specialty-services/piano-water-damage', description: 'Piano flood and water damage recovery' },
    { label: 'Wine Cellar Flooding', href: '/services/specialty-services/wine-cellar-flooding', description: 'Wine cellar flood recovery and climate restoration' },
    { label: 'Asbestos Water Damage', href: '/services/specialty-services/asbestos-water-damage', description: 'Water damage with asbestos-containing materials' },
    { label: 'Boat Water Damage', href: '/services/specialty-services/boat-water-damage', description: 'Marine vessel water damage restoration' },
    { label: 'Caravan Water Damage', href: '/services/specialty-services/caravan-water-damage', description: 'Caravan and RV water damage repair' },
    { label: 'Solar Panel Water Damage', href: '/services/specialty-services/solar-panel-water-damage', description: 'Solar panel system water damage assessment' },
  ],
};

/** Renders a grid of child page links for a hub page */
export default function ChildPageGrid({ category }: { category: string }) {
  const children = HUB_CHILDREN[category];
  if (!children || children.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {children.map((child) => (
        <Link
          key={child.href}
          href={child.href}
          className="group block p-4 rounded-xl transition-all hover:scale-[1.02]"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors">
            {child.label}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed">
            {child.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
