import { Metadata } from 'next';
import { Wrench } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Restoration Equipment Guides',
  description: 'Guides to professional restoration equipment — structural drying, dehumidifiers, air movers, and moisture detection technology used in disaster recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/equipment',
  },
  openGraph: {
    title: 'Restoration Equipment Guides',
    description: 'Guides to professional restoration equipment and structural drying technology.',
    type: 'website',
  },
};

const equipmentGuides = [
  { title: 'Structural Drying Equipment Cost', href: '/guides/equipment/structural-drying-equipment-cost', description: 'Understand the costs of professional structural drying equipment — dehumidifiers, air movers, and monitoring tools.' },
];

export default function EquipmentGuidesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #374151 0%, #4B5563 100%)',
        icon: <Wrench className="h-12 w-12" />,
        title: 'Restoration Equipment Guides',
        subtitle: 'Professional disaster recovery relies on specialised equipment. Our guides explain the technology behind structural drying, moisture detection, and contamination remediation.',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Equipment' },
      ]}
      sections={[
        {
          heading: 'Equipment Guides',
          body: (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {equipmentGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group block p-4 rounded-xl transition-all hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          ),
        },
        {
          heading: 'Why Equipment Matters',
          body: (
            <div className="space-y-4 text-gray-300">
              <p>
                The difference between a DIY attempt and professional restoration often comes down to equipment. Commercial-grade dehumidifiers remove 10-20 times more moisture than household units. Infrared thermal cameras detect hidden moisture behind walls that a visual inspection would miss. Hydroxyl generators neutralise odour at a molecular level rather than masking it.
              </p>
              <p>
                Understanding what equipment is being used on your property helps you evaluate quotes and ensure the contractor is following IICRC S500/S520 standards. Our equipment guides explain what each piece does, why it matters, and what it typically costs.
              </p>
            </div>
          ),
        },
      ]}
      relatedPages={[
        { title: 'Equipment Overview', href: '/equipment', description: 'Browse our professional restoration equipment range.' },
        { title: 'Cost Guides', href: '/cost', description: 'Understand restoration costs across all damage types.' },
        { title: 'Water Damage Guide', href: '/guides/water-damage', description: 'Complete guide to water damage restoration.' },
        { title: 'Technology', href: '/technology', description: 'The technology behind modern disaster recovery.' },
      ]}
    />
  );
}
