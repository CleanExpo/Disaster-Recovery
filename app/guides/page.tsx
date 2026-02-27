import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Restoration Guides',
  description: 'Expert guides on water damage, fire restoration, mould remediation, storm damage, insurance claims, and emergency preparedness for Australian property owners.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides',
  },
};

export default function GuidesIndexPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <BookOpen className="h-12 w-12" />,
        title: 'Restoration Guides',
        subtitle: 'Expert Advice for Australian Property Owners',
      }}
      cta={{ text: 'Lodge a Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides' },
      ]}
      stats={[
        { label: 'Expert Guides', value: '55+' },
        { label: 'Damage Types', value: 'All' },
        { label: 'Updated', value: '2026' },
        { label: 'Free Access', value: 'Always' },
      ]}
      sections={[
        {
          heading: 'Damage Type Guides',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Understand what to expect from the restoration process for each type of property damage.</p>
              <div className="grid md:grid-cols-2 gap-4 not-prose mt-4">
                {[
                  { title: 'Water Damage Restoration', href: '/guides/water-damage', desc: 'Complete guide to water damage categories, drying, and restoration.' },
                  { title: 'Fire & Smoke Damage', href: '/guides/fire-damage', desc: 'What to do after fire damage and the restoration process.' },
                  { title: 'Mould Remediation', href: '/guides/mould', desc: 'Health risks, identification, and professional mould removal.' },
                  { title: 'Storm Damage', href: '/guides/storm-damage', desc: 'Storm and cyclone damage repair and insurance claims.' },
                  { title: 'Flood Recovery', href: '/guides/flood-damage', desc: 'Post-flood restoration, drying, and contamination cleanup.' },
                  { title: 'Emergency Response', href: '/guides/emergency', desc: 'Emergency preparedness and what to do when disaster strikes.' },
                ].map((guide) => (
                  <a key={guide.href} href={guide.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ),
        },
        {
          heading: 'Insurance & Claims',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Navigate the insurance claims process with confidence. Our guides explain your rights, the claims process, and how to maximise your entitlements.</p>
              <div className="grid md:grid-cols-2 gap-4 not-prose mt-4">
                {[
                  { title: 'Insurance Claims Guide', href: '/guides/insurance', desc: 'Step-by-step guide to filing your disaster insurance claim.' },
                  { title: 'Emergency Make-Safe Guide', href: '/insurance/emergency-make-safe-guide', desc: 'Your $2,750 emergency service rights and insurance reimbursement.' },
                  { title: 'Is It Covered?', href: '/is-it-covered', desc: 'Check if your damage type is covered by your insurance.' },
                  { title: 'Cost Estimator', href: '/tools/cost-estimator', desc: 'Get instant cost estimates with insurance coverage likelihood.' },
                ].map((guide) => (
                  <a key={guide.href} href={guide.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Commercial & Industry Guides',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Specialist restoration guidance for commercial properties, retail, hospitality, and industrial facilities.</p>
              <div className="grid md:grid-cols-2 gap-4 not-prose mt-4">
                {[
                  { title: 'Data Centre Water Damage', href: '/guides/commercial/data-centre-water-damage', desc: 'Specialist restoration for server rooms and critical infrastructure.' },
                  { title: 'Office Water Damage & Business Interruption', href: '/guides/commercial/office-water-damage-business-interruption', desc: 'Minimise downtime and manage BI claims.' },
                  { title: 'Restaurant Fire Damage', href: '/guides/commercial/restaurant-fire-damage-restoration', desc: 'Commercial kitchen fires, health authority clearance, reopening.' },
                  { title: 'Retail Flood Inventory Recovery', href: '/guides/commercial/retail-flood-inventory-recovery', desc: 'Stock triage, documentation, and trading continuity.' },
                  { title: 'Warehouse Roof Leak', href: '/guides/commercial/warehouse-roof-leak-restoration', desc: 'Large-scale drying, stock protection, structural assessment.' },
                  { title: 'Invoice Shock Epidemic', href: '/guides/industry-problems/invoice-shock-epidemic', desc: 'Why some restorers inflate invoices and how to protect yourself.' },
                ].map((guide) => (
                  <a key={guide.href} href={guide.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ),
        },
        {
          heading: 'Pricing & Service Guides',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Understand what professional restoration costs, what your money covers, and how transparent pricing works.</p>
              <div className="grid md:grid-cols-2 gap-4 not-prose mt-4">
                {[
                  { title: 'Water Damage Restoration Cost', href: '/guides/cost-guides/how-much-water-damage-restoration-cost', desc: 'Cost breakdown by IICRC damage class — $2,000 to $15,000+.' },
                  { title: 'Professional Response Pricing', href: '/guides/pricing/professional-response-pricing-breakdown', desc: 'What professional response costs include and typical price ranges.' },
                  { title: 'Real Emergency Response Costs', href: '/guides/pricing/real-emergency-response-costs', desc: 'Emergency callout fees, after-hours pricing, and the DR model.' },
                  { title: 'What Disaster Recovery Includes', href: '/guides/services/what-disaster-recovery-includes', desc: 'Full breakdown of the $550 platform fee and $2,200 contractor credit.' },
                  { title: 'Contents Pack-Out & Storage', href: '/guides/services/contents-pack-out-storage', desc: 'How contents are inventoried, packed, stored, and returned.' },
                  { title: 'Structural Drying Equipment Cost', href: '/guides/equipment/structural-drying-equipment-cost', desc: 'Equipment types, hire rates, and how they affect project cost.' },
                ].map((guide) => (
                  <a key={guide.href} href={guide.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Professional & Certification Guides',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Learn what makes a qualified restorer and how to choose the right professional for your property.</p>
              <div className="grid md:grid-cols-2 gap-4 not-prose mt-4">
                {[
                  { title: 'Why Hire IICRC-Certified', href: '/guides/certifications/why-hire-iicrc-certified', desc: 'What IICRC certification means and why it protects you.' },
                  { title: 'Builder vs Restorer', href: '/guides/professional/builder-vs-restorer-difference', desc: 'Why restoration requires specialist skills a builder does not have.' },
                  { title: 'When to Call a Restorer', href: '/guides/guides/when-to-call-disaster-restoration', desc: 'DIY thresholds, time-critical scenarios, and decision criteria.' },
                  { title: 'How Long Does Fire Restoration Take?', href: '/guides/guides/how-long-fire-damage-restoration', desc: 'Typical timeline by severity — from 2 weeks to 6+ months.' },
                ].map((guide) => (
                  <a key={guide.href} href={guide.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ),
        },
        {
          heading: 'Location-Specific Guides',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Restoration advice tailored to specific Australian cities and their unique climate, legislation, and risk profiles.</p>
              <div className="grid md:grid-cols-2 gap-4 not-prose mt-4">
                {[
                  { title: 'Sydney CBD Emergency Extraction', href: '/guides/locations/sydney/sydney-cbd-emergency-water-extraction', desc: 'Heritage buildings, underground car parks, and CBD access.' },
                  { title: 'Melbourne Apartment Flood', href: '/guides/locations/melbourne/melbourne-apartment-flood-restoration', desc: 'Strata complexities and multi-level water movement.' },
                  { title: 'Brisbane Commercial Water Damage', href: '/guides/locations/brisbane/brisbane-commercial-water-damage', desc: 'Subtropical storms and the 2022 flood legacy.' },
                  { title: 'Gold Coast High-Rise Water Damage', href: '/guides/locations/gold-coast/gold-coast-high-rise-water-damage', desc: 'Salt corrosion, body corporate, and cascading tower damage.' },
                  { title: 'Perth Storm Damage Emergency', href: '/guides/locations/perth/perth-storm-damage-emergency', desc: 'Hail events, coastal wind, and sandy soil drainage.' },
                  { title: 'Adelaide Rental Mould', href: '/guides/locations/adelaide/adelaide-rental-mould-remediation', desc: 'SA Residential Tenancies Act and landlord/tenant duties.' },
                  { title: 'Canberra Government Restoration', href: '/guides/locations/canberra/canberra-government-restoration', desc: 'Heritage compliance, security clearances, and Comcover.' },
                  { title: 'Newcastle Industrial Flood', href: '/guides/locations/newcastle/newcastle-industrial-flood-recovery', desc: 'Hunter River flooding and industrial contamination.' },
                  { title: 'Wollongong Coastal Storm Damage', href: '/guides/locations/wollongong/wollongong-coastal-storm-damage', desc: 'Illawarra escarpment, East Coast Lows, and salt spray.' },
                  { title: 'Sunshine Coast Hotel Restoration', href: '/guides/locations/sunshine-coast/sunshine-coast-hotel-restoration', desc: 'Tourism-dependent recovery and guest disruption.' },
                ].map((guide) => (
                  <a key={guide.href} href={guide.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ),
          background: 'light',
        },
      ]}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
