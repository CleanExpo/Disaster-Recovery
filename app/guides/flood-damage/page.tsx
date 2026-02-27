import { Metadata } from 'next';
import { CloudRain } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Flood Damage Recovery Guides',
  description: 'Expert guides for flood damage recovery in Australian properties. Hardwood floor restoration, contamination cleanup, and post-flood drying techniques.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/flood-damage',
  },
  openGraph: {
    title: 'Flood Damage Recovery Guides',
    description: 'Expert guides for flood damage recovery in Australian properties.',
    type: 'website',
  },
};

const floodGuides = [
  { title: 'Flood Damage to Hardwood Floors', href: '/guides/flood-damage/flood-damage-hardwood-floors', description: 'How to assess and restore flood-damaged hardwood floors — cupping, crowning, and replacement thresholds.' },
];

export default function FloodDamageGuidesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A5F 0%, #0369A1 100%)',
        icon: <CloudRain className="h-12 w-12" />,
        title: 'Flood Damage Recovery Guides',
        subtitle: 'Australia experiences some of the most severe flooding in the world. Our flood recovery guides cover everything from immediate safety through to full restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Flood Damage' },
      ]}
      sections={[
        {
          heading: 'Flood Recovery Guides',
          body: (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {floodGuides.map((guide) => (
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
          heading: 'Flood Damage in Australia',
          body: (
            <div className="space-y-4 text-gray-300">
              <p>
                Flooding is the costliest natural disaster in Australia, causing an average of $8.8 billion in damage annually (Insurance Council of Australia). From the 2022 Lismore floods to annual monsoonal events in North Queensland, flood damage requires specialist restoration techniques that differ significantly from standard water damage.
              </p>
              <p>
                Floodwater is always classified as Category 3 (black water) under IICRC S500 standards, meaning it contains sewage, chemicals, and biological contaminants. This requires specialised extraction, antimicrobial treatment, and often removal of porous materials like carpet, underlay, and plasterboard. Our guides explain the process and help you make informed decisions about restoration vs replacement.
              </p>
            </div>
          ),
        },
      ]}
      relatedPages={[
        { title: 'Water Damage Guide', href: '/guides/water-damage', description: 'Complete guide to water damage categories, drying, and restoration.' },
        { title: 'Storm Damage Guide', href: '/guides/storm-damage', description: 'Storm and cyclone damage repair and insurance claims.' },
        { title: 'Insurance Claims Guides', href: '/guides/insurance', description: 'Navigate your flood damage insurance claim.' },
        { title: 'Flood Damage Restoration Perth', href: '/flood-damage-restoration-perth', description: 'Flood damage services and costs specific to Perth.' },
      ]}
    />
  );
}
