import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Location-Specific Restoration Services | Queensland Emergency Response',
  description: 'Disaster recovery services tailored to specific Queensland locations. Brisbane CBD, Gold Coast, Sunshine Coast, Cairns, Townsville, and more.',
  alternates: { canonical: 'https://disasterrecovery.com.au/services/location-specific' },
};

const locationServices = [
  { title: 'Brisbane CBD Water Damage', href: '/services/location-specific/brisbane-cbd-water-damage', description: 'CBD flooding, high-rise water damage and downtown Brisbane emergency response.' },
  { title: 'Cairns Cyclone Damage', href: '/services/location-specific/cairns-cyclone-damage', description: 'Tropical cyclone damage restoration for Far North Queensland properties.' },
  { title: 'Gold Coast Flood Restoration', href: '/services/location-specific/gold-coast-flood-restoration', description: 'Gold Coast flood recovery for beachfront and canal properties.' },
  { title: 'Ipswich Flood Recovery', href: '/services/location-specific/ipswich-flood-recovery', description: 'Bremer River flood zone recovery for Ipswich homes and businesses.' },
  { title: 'Logan Water Damage', href: '/services/location-specific/logan-water-damage', description: 'Water damage restoration across the Logan City area.' },
  { title: 'Moreton Bay Flooding', href: '/services/location-specific/moreton-bay-flooding', description: 'Flood recovery for Moreton Bay Region properties.' },
  { title: 'Redlands Storm Damage', href: '/services/location-specific/redlands-storm-damage', description: 'Storm damage repair for Redland City and bayside suburbs.' },
  { title: 'Sunshine Coast Water Damage', href: '/services/location-specific/sunshine-coast-water-damage', description: 'Water damage restoration on the Sunshine Coast.' },
  { title: 'Toowoomba Water Damage', href: '/services/location-specific/toowoomba-water-damage', description: 'Toowoomba Range water damage and flash flood recovery.' },
  { title: 'Townsville Flood Restoration', href: '/services/location-specific/townsville-flood-restoration', description: 'Townsville flood and monsoonal damage recovery.' },
];

export default function LocationSpecificPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Location-Specific Restoration',
        subtitle: 'Disaster recovery services tailored to specific Queensland locations and their unique risk profiles, climate challenges, and local conditions.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific' },
      ]}
      sections={[
        {
          heading: 'Queensland Location Services',
          body: (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locationServices.map((item) => (
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
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
