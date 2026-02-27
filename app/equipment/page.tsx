import { Metadata } from 'next';
import { Wrench } from 'lucide-react';
import Link from 'next/link';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Restoration Equipment & Technology | IICRC-Grade Tools | Disaster Recovery',
  description: 'Professional IICRC-grade restoration equipment used by our certified contractors. Air scrubbers, dehumidifiers, thermal imaging, moisture meters, and more.',
  alternates: { canonical: 'https://disasterrecovery.com.au/equipment' },
};

const equipmentItems = [
  { title: 'Air Scrubbers', href: '/equipment/air-scrubbers', description: 'HEPA-filtered air scrubbers for contamination containment and air quality restoration.' },
  { title: 'Negative Air Machines', href: '/equipment/negative-air-machines', description: 'Negative pressure containment systems for mould and asbestos remediation.' },
  { title: 'Industrial Dehumidifiers', href: '/equipment/industrial-dehumidifiers', description: 'Commercial-grade dehumidifiers for structural drying and moisture control.' },
  { title: 'Thermal Imaging', href: '/equipment/thermal-imaging', description: 'Infrared thermal cameras for hidden moisture and damage detection.' },
  { title: 'Moisture Meters', href: '/equipment/moisture-meters', description: 'Pin and pinless moisture meters for accurate damage assessment.' },
  { title: 'Infrared Drying', href: '/equipment/infrared-drying', description: 'Infrared drying panels for targeted structural drying without demolition.' },
  { title: 'Hydroxyl Generators', href: '/equipment/hydroxyl-generators', description: 'Safe odour removal and air purification using hydroxyl radical technology.' },
  { title: 'Ozone Generators', href: '/equipment/ozone-generators', description: 'Ozone treatment for severe smoke odour and microbial decontamination.' },
  { title: 'Ultrasonic Cleaning', href: '/equipment/ultrasonic-cleaning', description: 'Ultrasonic cleaning for soot-damaged electronics, jewellery, and precision items.' },
  { title: 'Drone Inspection', href: '/equipment/drone-inspection', description: 'Aerial drone surveys for roof damage, bushfire assessment, and large-scale inspections.' },
  { title: 'Equipment Catalog', href: '/equipment/catalog', description: 'Browse our complete equipment catalog with specifications and capabilities.' },
];

export default function EquipmentHubPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Wrench className="h-12 w-12" />,
        title: 'Restoration Equipment & Technology',
        subtitle: 'IICRC-grade professional equipment used by our certified contractor network. Every tool meets or exceeds industry standards for safe, effective restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment' },
      ]}
      sections={[
        {
          heading: 'Professional Equipment',
          body: (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {equipmentItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block p-4 rounded-xl transition-all hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          ),
        },
      ]}
      relatedPages={getRelatedPages('operational-excellence')}
    />
  );
}
