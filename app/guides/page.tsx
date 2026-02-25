import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Restoration Guides | Disaster Recovery Australia',
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
        { label: 'Expert Guides', value: '60+' },
        { label: 'Damage Types', value: 'All' },
        { label: 'Updated', value: '2024' },
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
                  { title: 'Flood Recovery', href: '/guides/flood', desc: 'Post-flood restoration, drying, and contamination cleanup.' },
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
          heading: 'Specialist Guides',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>In-depth technical guides for specific restoration topics and equipment.</p>
              <div className="grid md:grid-cols-2 gap-4 not-prose mt-4">
                {[
                  { title: 'Equipment Guide', href: '/guides/equipment', desc: 'Industrial restoration equipment and how it works.' },
                  { title: 'Cost Guides', href: '/cost', desc: 'Detailed pricing by city and damage type across Australia.' },
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
      ]}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
