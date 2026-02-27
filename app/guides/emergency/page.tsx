import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Emergency Response Guides',
  description: 'Emergency preparedness and response guides for Australian property owners. What to do when disaster strikes — holidays, weekends, and after hours.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/emergency',
  },
  openGraph: {
    title: 'Emergency Response Guides',
    description: 'Emergency preparedness and response guides for property owners.',
    type: 'website',
  },
};

const emergencyGuides = [
  { title: 'Christmas Emergency Water Damage', href: '/guides/emergency/christmas-emergency-water-damage', description: 'What to do when water damage strikes over Christmas — who to call and how to protect your property.' },
  { title: 'Easter Weekend Emergency Restoration', href: '/guides/emergency/easter-weekend-emergency-restoration', description: 'Emergency restoration during Easter long weekend — finding help when most businesses are closed.' },
  { title: 'Emergency Board-Up After Storm Damage', href: '/guides/emergency/emergency-board-up-storm-damage', description: 'Securing your property after storm damage — board-up procedures and temporary weatherproofing.' },
  { title: 'Find 24-Hour Emergency Restoration', href: '/guides/emergency/find-24-hour-emergency-restoration', description: 'How to find reliable 24/7 emergency restoration services anywhere in Australia.' },
  { title: 'Middle-of-Night Flooding Emergency', href: '/guides/emergency/middle-night-flooding-emergency', description: 'Step-by-step guide when flooding hits in the middle of the night — safety first, then action.' },
  { title: "New Year's Eve Disaster Recovery", href: '/guides/emergency/new-years-eve-disaster-recovery', description: "Dealing with property damage over New Year's Eve — firework damage, party flooding, and more." },
  { title: 'Weekend & Public Holiday Emergency', href: '/guides/emergency/weekend-public-holiday-emergency', description: 'Getting emergency help on weekends and public holidays when regular services are unavailable.' },
];

export default function EmergencyGuidesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Response Guides',
        subtitle: 'When disaster strikes, knowing what to do in the first 60 minutes can save thousands. Our emergency guides cover every scenario — holidays, weekends, and after hours.',
      }}
      cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency Response' },
      ]}
      sections={[
        {
          heading: 'Emergency Guides',
          body: (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group block p-4 rounded-xl transition-all hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-red-400 transition-colors">
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
          heading: 'The First 60 Minutes Matter Most',
          body: (
            <div className="space-y-4 text-gray-300">
              <p>
                The actions you take in the first hour after property damage can significantly affect the total restoration cost and outcome. Water damage escalates from Category 1 (clean) to Category 3 (contaminated) within 48 hours. Mould can begin colonising within 24 hours in humid conditions. Fire soot becomes permanently bonded to surfaces if not treated quickly.
              </p>
              <p>
                Our emergency guides walk you through the critical first steps for every type of disaster — whether it happens at 2am on a Tuesday or during a Christmas Day family gathering. Every guide includes safety priorities, documentation tips for insurance, and how to reach IICRC-certified emergency responders.
              </p>
            </div>
          ),
        },
      ]}
      relatedPages={[
        { title: 'Emergency Services', href: '/services/emergency-services', description: '24/7 emergency disaster response across Australia.' },
        { title: 'Start a Claim', href: '/claim', description: 'Begin your emergency claim now for immediate response.' },
        { title: 'Insurance Claims Guides', href: '/guides/insurance', description: 'Navigate your insurance claim after an emergency.' },
        { title: 'Water Damage Guide', href: '/guides/water-damage', description: 'Complete guide to water damage categories and restoration.' },
      ]}
    />
  );
}
