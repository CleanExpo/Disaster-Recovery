import Link from 'next/link';

export interface ChildService {
  label: string;
  href: string;
  description: string;
}

/** Maps each service category to its child sub-service pages */
export const SERVICE_CHILDREN: Record<string, ChildService[]> = {
  'water-damage': [
    { label: 'Burst Pipes', href: '/services/water-damage/burst-pipes', description: 'Emergency burst pipe repair and water extraction' },
    { label: 'Basement Flooding', href: '/services/water-damage/basement-flooding', description: 'Subfloor and basement flood recovery' },
    { label: 'Ceiling Water Damage', href: '/services/water-damage/ceiling-water-damage', description: 'Ceiling leak repair and plasterboard replacement' },
    { label: 'Roof Leak Damage', href: '/services/water-damage/roof-leak-damage', description: 'Roof leak detection and water damage repair' },
    { label: 'Toilet Overflow', href: '/services/water-damage/toilet-overflow', description: 'Toilet overflow cleanup and sanitisation' },
    { label: 'Washing Machine Flooding', href: '/services/water-damage/washing-machine-flooding', description: 'Appliance leak emergency response' },
    { label: 'Dishwasher Leaks', href: '/services/water-damage/dishwasher-leaks', description: 'Dishwasher leak cleanup and floor drying' },
    { label: 'Hot Water System Burst', href: '/services/water-damage/hot-water-system-burst', description: 'Hot water unit failure and flood recovery' },
    { label: 'Shower Leaks', href: '/services/water-damage/shower-leaks', description: 'Shower waterproofing failure repair' },
    { label: 'Pool Leak Damage', href: '/services/water-damage/pool-leak-damage', description: 'Pool and spa leak water damage restoration' },
    { label: 'Garage Flooding', href: '/services/water-damage/garage-flooding', description: 'Garage flood cleanup and structural drying' },
    { label: 'Crawl Space Flooding', href: '/services/water-damage/crawl-space-flooding', description: 'Subfloor crawl space moisture remediation' },
    { label: 'Concrete Water Damage', href: '/services/water-damage/concrete-water-damage', description: 'Concrete slab moisture and efflorescence treatment' },
  ],
  'fire-damage': [
    { label: 'Kitchen Fire Damage', href: '/services/fire-damage/kitchen-fire-damage', description: 'Kitchen fire restoration and smoke removal' },
    { label: 'Structural Fire Damage', href: '/services/fire-damage/structural-fire-damage', description: 'Structural assessment and fire damage rebuild' },
    { label: 'Smoke Odour Removal', href: '/services/fire-damage/smoke-odour-removal', description: 'Thermal fogging and ozone smoke odour treatment' },
    { label: 'Soot Damage Cleanup', href: '/services/fire-damage/soot-damage-cleanup', description: 'Soot residue removal from surfaces and contents' },
    { label: 'Electrical Fire Damage', href: '/services/fire-damage/electrical-fire-damage', description: 'Electrical fire assessment and restoration' },
    { label: 'Bushfire Smoke Damage', href: '/services/fire-damage/bushfire-smoke-damage', description: 'Bushfire smoke infiltration cleanup' },
    { label: 'Commercial Fire Damage', href: '/services/fire-damage/commercial-fire-damage', description: 'Business fire damage restoration and recovery' },
    { label: 'Contents Restoration', href: '/services/fire-damage/contents-restoration', description: 'Fire-damaged contents cleaning and restoration' },
    { label: 'Garage Fire Damage', href: '/services/fire-damage/garage-fire-damage', description: 'Garage and workshop fire recovery' },
    { label: 'Chimney Fire Damage', href: '/services/fire-damage/chimney-fire-damage', description: 'Chimney fire assessment and repair' },
  ],
  'mould-remediation': [
    { label: 'Black Mould Removal', href: '/services/mould-remediation/black-mould-removal', description: 'Stachybotrys black mould remediation' },
    { label: 'Bathroom Mould', href: '/services/mould-remediation/bathroom-mould', description: 'Bathroom mould removal and prevention' },
    { label: 'Bedroom Mould', href: '/services/mould-remediation/bedroom-mould', description: 'Bedroom mould remediation and air quality' },
    { label: 'Wall Cavity Mould', href: '/services/mould-remediation/wall-cavity-mould', description: 'Hidden wall cavity mould detection and removal' },
    { label: 'HVAC Mould', href: '/services/mould-remediation/hvac-mould', description: 'Air conditioning and ductwork mould treatment' },
    { label: 'Carpet Mould', href: '/services/mould-remediation/carpet-mould', description: 'Carpet mould removal or replacement' },
    { label: 'Attic Mould', href: '/services/mould-remediation/attic-mould', description: 'Roof space and attic mould remediation' },
    { label: 'Timber Mould', href: '/services/mould-remediation/timber-mould', description: 'Timber frame and flooring mould treatment' },
    { label: 'Crawl Space Mould', href: '/services/mould-remediation/crawl-space-mould', description: 'Subfloor crawl space mould remediation' },
    { label: 'Commercial Mould', href: '/services/mould-remediation/commercial-mould', description: 'Commercial property mould assessment and removal' },
  ],
  'storm-damage': [
    { label: 'Hail Damage Repair', href: '/services/storm-damage/hail-damage-repair', description: 'Hailstorm damage assessment and repair' },
    { label: 'Wind Damage Repair', href: '/services/storm-damage/wind-damage-repair', description: 'Wind damage roof and structural repair' },
    { label: 'Tree Damage Cleanup', href: '/services/storm-damage/tree-damage-cleanup', description: 'Fallen tree removal and property repair' },
    { label: 'Cyclone Damage', href: '/services/storm-damage/cyclone-damage', description: 'Cyclone damage restoration and rebuild' },
    { label: 'Lightning Damage', href: '/services/storm-damage/lightning-damage', description: 'Lightning strike assessment and repair' },
    { label: 'Flood Damage Restoration', href: '/services/storm-damage/flood-damage-restoration', description: 'Storm-related flood recovery' },
    { label: 'Storm Surge Damage', href: '/services/storm-damage/storm-surge-damage', description: 'Coastal storm surge cleanup and restoration' },
    { label: 'Fence Storm Damage', href: '/services/storm-damage/fence-storm-damage', description: 'Storm-damaged fence repair and replacement' },
    { label: 'Window Storm Damage', href: '/services/storm-damage/window-storm-damage', description: 'Storm-broken window boarding and replacement' },
    { label: 'Tornado Damage', href: '/services/storm-damage/tornado-damage', description: 'Tornado damage assessment and restoration' },
  ],
  'sewage-cleanup': [
    { label: 'Toilet Backup', href: '/services/sewage-cleanup/toilet-backup', description: 'Toilet backup cleanup and sanitisation' },
    { label: 'Black Water Cleanup', href: '/services/sewage-cleanup/black-water-cleanup', description: 'Category 3 black water decontamination' },
    { label: 'Basement Sewage', href: '/services/sewage-cleanup/basement-sewage', description: 'Basement sewage overflow recovery' },
    { label: 'Main Line Backup', href: '/services/sewage-cleanup/main-line-backup', description: 'Main sewer line backup cleanup' },
    { label: 'Septic Overflow', href: '/services/sewage-cleanup/septic-overflow', description: 'Septic system overflow remediation' },
    { label: 'Grey Water Cleanup', href: '/services/sewage-cleanup/grey-water-cleanup', description: 'Category 2 grey water cleanup' },
    { label: 'Commercial Sewage', href: '/services/sewage-cleanup/commercial-sewage', description: 'Commercial sewage overflow restoration' },
    { label: 'Grease Trap Overflow', href: '/services/sewage-cleanup/grease-trap-overflow', description: 'Restaurant grease trap overflow cleanup' },
    { label: 'Storm Drain Backup', href: '/services/sewage-cleanup/storm-drain-backup', description: 'Storm drain backup flooding cleanup' },
    { label: 'Sewage Decontamination', href: '/services/sewage-cleanup/sewage-decontamination', description: 'Full sewage decontamination and sanitisation' },
  ],
  'biohazard-cleaning': [
    { label: 'Crime Scene Cleanup', href: '/services/biohazard-cleaning/crime-scene-cleanup', description: 'Certified crime scene decontamination' },
    { label: 'Unattended Death', href: '/services/biohazard-cleaning/unattended-death', description: 'Compassionate unattended death cleanup' },
    { label: 'Blood Cleanup', href: '/services/biohazard-cleaning/blood-cleanup', description: 'Bloodborne pathogen decontamination' },
    { label: 'Drug Lab Cleanup', href: '/services/biohazard-cleaning/drug-lab-cleanup', description: 'Clandestine drug lab decontamination' },
    { label: 'Infectious Disease', href: '/services/biohazard-cleaning/infectious-disease', description: 'Viral and bacterial decontamination' },
    { label: 'Suicide Cleanup', href: '/services/biohazard-cleaning/suicide-cleanup', description: 'Sensitive suicide scene restoration' },
    { label: 'Hoarding Cleanup', href: '/services/biohazard-cleaning/hoarding-cleanup', description: 'Hoarding situation cleanup and sanitisation' },
    { label: 'Bodily Fluids', href: '/services/biohazard-cleaning/bodily-fluids', description: 'Bodily fluid cleanup and decontamination' },
    { label: 'Sharps Disposal', href: '/services/biohazard-cleaning/sharps-disposal', description: 'Needle and sharps safe removal' },
    { label: 'Animal Waste', href: '/services/biohazard-cleaning/animal-waste', description: 'Animal waste and contamination cleanup' },
  ],
  'commercial-services': [
    { label: 'Office Water Damage', href: '/services/commercial-services/office-water-damage', description: 'Office building water damage restoration' },
    { label: 'Hotel Flood Recovery', href: '/services/commercial-services/hotel-flood-recovery', description: 'Hotel and accommodation flood restoration' },
    { label: 'Restaurant Water Damage', href: '/services/commercial-services/restaurant-water-damage', description: 'Restaurant flood and water damage recovery' },
    { label: 'Retail Flood Damage', href: '/services/commercial-services/retail-flood-damage', description: 'Retail store water damage restoration' },
    { label: 'Warehouse Flooding', href: '/services/commercial-services/warehouse-flooding', description: 'Warehouse and distribution centre flooding' },
    { label: 'Hospital Water Damage', href: '/services/commercial-services/hospital-water-damage', description: 'Healthcare facility water damage response' },
    { label: 'School Water Damage', href: '/services/commercial-services/school-water-damage', description: 'School and education facility restoration' },
    { label: 'Factory Water Damage', href: '/services/commercial-services/factory-water-damage', description: 'Industrial factory water damage recovery' },
    { label: 'Data Centre Flooding', href: '/services/commercial-services/data-center-flooding', description: 'Data centre flood emergency response' },
    { label: 'Gym Flooding', href: '/services/commercial-services/gym-flooding', description: 'Gym and fitness centre flood recovery' },
  ],
  'emergency-services': [
    { label: '24-Hour Water Extraction', href: '/services/emergency-services/24-hour-water-extraction', description: 'Round-the-clock water extraction service' },
    { label: 'Emergency Board-Up', href: '/services/emergency-services/emergency-board-up', description: 'Emergency property boarding and securing' },
    { label: 'Emergency Tarping', href: '/services/emergency-services/emergency-tarping', description: 'Emergency roof tarping for storm damage' },
    { label: 'Emergency Drying', href: '/services/emergency-services/emergency-drying', description: 'Rapid deployment structural drying' },
    { label: 'After-Hours Response', href: '/services/emergency-services/after-hours-response', description: 'Weekend and after-hours emergency callout' },
    { label: 'Priority Response', href: '/services/emergency-services/priority-response', description: 'Priority response for critical situations' },
    { label: 'Disaster Response', href: '/services/emergency-services/disaster-response', description: 'Large-scale disaster response coordination' },
    { label: 'Emergency Plumbing', href: '/services/emergency-services/emergency-plumbing', description: 'Emergency plumber coordination' },
    { label: 'Emergency Sanitisation', href: '/services/emergency-services/emergency-sanitization', description: 'Emergency decontamination and sanitisation' },
    { label: 'Emergency Power', href: '/services/emergency-services/emergency-power', description: 'Emergency power and generator supply' },
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

/** Renders a grid of child service links for a parent service category page */
export default function ServiceChildLinks({ category }: { category: string }) {
  const children = SERVICE_CHILDREN[category];
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
