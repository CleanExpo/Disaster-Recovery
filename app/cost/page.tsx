import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Restoration Cost Guides | Disaster Recovery Australia',
  description: 'Transparent pricing for water damage, fire, mould, storm, and flood restoration across Australia. City-specific cost guides with insurance coverage information.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/cost',
  },
};

export default function CostGuidesIndexPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: 'Restoration Cost Guides',
        subtitle: 'Transparent Pricing Across Australia',
      }}
      cta={{ text: 'Get Free Quote', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cost Guides' },
      ]}
      stats={[
        { label: 'Cities Covered', value: '10+' },
        { label: 'Damage Types', value: '5' },
        { label: 'Updated', value: '2026' },
        { label: 'Free Quotes', value: 'Always' },
      ]}
      sections={[
        {
          heading: 'Water Damage Restoration Costs',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Water damage restoration typically costs between $2,500 and $50,000+ depending on the severity and area affected. Explore city-specific pricing below.</p>
              <div className="grid md:grid-cols-3 gap-4 not-prose mt-4">
                {[
                  { city: 'Sydney', href: '/cost/sydney-water-damage' },
                  { city: 'Melbourne', href: '/cost/melbourne-water-damage' },
                  { city: 'Brisbane', href: '/cost/brisbane-water-damage' },
                  { city: 'Perth', href: '/cost/perth-water-damage' },
                  { city: 'Adelaide', href: '/cost/adelaide-water-damage' },
                  { city: 'Gold Coast', href: '/cost/gold-coast-water-damage' },
                  { city: 'Canberra', href: '/cost/canberra-water-damage' },
                  { city: 'Newcastle', href: '/cost/newcastle-water-damage' },
                  { city: 'Sunshine Coast', href: '/cost/sunshine-coast-water-damage' },
                  { city: 'Wollongong', href: '/cost/wollongong-water-damage' },
                ].map((item) => (
                  <a key={item.href} href={item.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center">
                    <h3 className="font-semibold text-gray-900">{item.city} Water Damage</h3>
                  </a>
                ))}
              </div>
            </div>
          ),
        },
        {
          heading: 'Fire & Smoke Damage Costs',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Fire damage restoration ranges from $5,000 for minor incidents to over $100,000 for major structural fires. Costs vary by city and extent of damage.</p>
              <div className="grid md:grid-cols-3 gap-4 not-prose mt-4">
                {[
                  { city: 'Sydney', href: '/cost/sydney-fire-damage' },
                  { city: 'Melbourne', href: '/cost/melbourne-fire-damage' },
                  { city: 'Brisbane', href: '/cost/brisbane-fire-damage' },
                  { city: 'Perth', href: '/cost/perth-fire-damage' },
                  { city: 'Adelaide', href: '/cost/adelaide-fire-damage' },
                  { city: 'Gold Coast', href: '/cost/gold-coast-fire-damage' },
                  { city: 'Canberra', href: '/cost/canberra-fire-damage' },
                  { city: 'Newcastle', href: '/cost/newcastle-fire-damage' },
                  { city: 'Sunshine Coast', href: '/cost/sunshine-coast-fire-damage' },
                  { city: 'Wollongong', href: '/cost/wollongong-fire-damage' },
                ].map((item) => (
                  <a key={item.href} href={item.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center">
                    <h3 className="font-semibold text-gray-900">{item.city} Fire Damage</h3>
                  </a>
                ))}
              </div>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Mould Remediation Costs',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Professional mould remediation costs between $1,500 and $30,000+ depending on the extent of contamination and species involved.</p>
              <div className="grid md:grid-cols-3 gap-4 not-prose mt-4">
                {[
                  { city: 'Sydney', href: '/cost/sydney-mould-removal' },
                  { city: 'Melbourne', href: '/cost/melbourne-mould-removal' },
                  { city: 'Brisbane', href: '/cost/brisbane-mould-removal' },
                  { city: 'Perth', href: '/cost/perth-mould-removal' },
                  { city: 'Adelaide', href: '/cost/adelaide-mould-removal' },
                  { city: 'Gold Coast', href: '/cost/gold-coast-mould-removal' },
                  { city: 'Canberra', href: '/cost/canberra-mould-removal' },
                  { city: 'Newcastle', href: '/cost/newcastle-mould-removal' },
                  { city: 'Sunshine Coast', href: '/cost/sunshine-coast-mould-removal' },
                  { city: 'Wollongong', href: '/cost/wollongong-mould-removal' },
                ].map((item) => (
                  <a key={item.href} href={item.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center">
                    <h3 className="font-semibold text-gray-900">{item.city} Mould Removal</h3>
                  </a>
                ))}
              </div>
            </div>
          ),
        },
        {
          heading: 'Storm & Flood Damage Costs',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Storm damage repair ranges from $2,000 to $45,000+ while flood restoration can cost $3,000 to $60,000+ depending on contamination levels and structural impact.</p>
              <div className="grid md:grid-cols-3 gap-4 not-prose mt-4">
                {[
                  { city: 'Sydney Storm', href: '/cost/sydney-storm-damage' },
                  { city: 'Sydney Flood', href: '/cost/sydney-flood-restoration' },
                  { city: 'Melbourne Storm', href: '/cost/melbourne-storm-damage' },
                  { city: 'Melbourne Flood', href: '/cost/melbourne-flood-restoration' },
                  { city: 'Brisbane Storm', href: '/cost/brisbane-storm-damage' },
                  { city: 'Brisbane Flood', href: '/cost/brisbane-flood-restoration' },
                  { city: 'Perth Storm', href: '/cost/perth-storm-damage' },
                  { city: 'Perth Flood', href: '/cost/perth-flood-restoration' },
                  { city: 'Adelaide Storm', href: '/cost/adelaide-storm-damage' },
                  { city: 'Adelaide Flood', href: '/cost/adelaide-flood-restoration' },
                  { city: 'Gold Coast Storm', href: '/cost/gold-coast-storm-damage' },
                  { city: 'Gold Coast Flood', href: '/cost/gold-coast-flood-restoration' },
                  { city: 'Canberra Storm', href: '/cost/canberra-storm-damage' },
                  { city: 'Canberra Flood', href: '/cost/canberra-flood-restoration' },
                  { city: 'Newcastle Storm', href: '/cost/newcastle-storm-damage' },
                  { city: 'Newcastle Flood', href: '/cost/newcastle-flood-restoration' },
                  { city: 'Sunshine Coast Storm', href: '/cost/sunshine-coast-storm-damage' },
                  { city: 'Sunshine Coast Flood', href: '/cost/sunshine-coast-flood-restoration' },
                  { city: 'Wollongong Storm', href: '/cost/wollongong-storm-damage' },
                  { city: 'Wollongong Flood', href: '/cost/wollongong-flood-restoration' },
                ].map((item) => (
                  <a key={item.href} href={item.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center">
                    <h3 className="font-semibold text-gray-900">{item.city}</h3>
                  </a>
                ))}
              </div>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Get a Personalised Estimate',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Use our free <a href="/tools/cost-estimator">Cost Estimator Tool</a> to get an instant estimate based on your specific situation, property type, and location. No obligation, no signup required.</p>
            </div>
          ),
          background: 'dark',
        },
      ]}
      relatedPages={[
        { title: 'Pricing by City', href: '/pricing', description: 'Detailed pricing breakdowns for every city and damage type.' },
        { title: 'Cost Estimator Tool', href: '/tools/cost-estimator', description: 'Get an instant personalised cost estimate.' },
        { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Navigate your insurance claim step by step.' },
        { title: 'Knowledge Base', href: '/knowledge', description: 'IICRC standards and restoration science.' },
        { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Professional water damage restoration services.' },
        { title: 'All Services', href: '/services', description: 'Browse all disaster recovery services.' },
      ]}
    />
  );
}
