import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Insurance Claims Guides',
  description: 'Expert guides for navigating insurance claims after property damage. Learn how to document damage, understand your policy, and maximise your claim outcome.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/insurance',
  },
  openGraph: {
    title: 'Insurance Claims Guides',
    description: 'Expert guides for navigating insurance claims after property damage.',
    type: 'website',
  },
};

const insuranceGuides = [
  { title: 'Category 3 Water Damage Insurance', href: '/guides/insurance/category-3-water-damage-insurance', description: 'How category 3 (black water) damage affects your insurance claim and what coverage to expect.' },
  { title: 'Document Water Damage for Insurance', href: '/guides/insurance/document-water-damage-insurance', description: 'Step-by-step guide to documenting water damage evidence for a successful insurance claim.' },
  { title: 'Insurance Approved Contractors', href: '/guides/insurance/insurance-approved-contractors', description: 'Understanding insurer contractor panels and your right to choose your own IICRC-certified restorer.' },
  { title: 'Insurance Depreciation on Water Damage', href: '/guides/insurance/insurance-depreciation-water-damage', description: 'How depreciation affects your water damage payout and strategies to maximise your settlement.' },
  { title: 'Loss Assessor vs Contractor', href: '/guides/insurance/loss-assessor-vs-contractor', description: 'The difference between loss assessors and restoration contractors, and when you need each.' },
  { title: 'Make-Safe Insurance Coverage', href: '/guides/insurance/make-safe-insurance-coverage', description: 'Understanding emergency make-safe coverage and your rights under Australian insurance law.' },
  { title: 'The Real Cost of Insurance Delays', href: '/guides/insurance/real-cost-insurance-delays', description: 'How insurer delays escalate damage and costs, and what you can do about it.' },
  { title: 'Section 54 Contractor Rights', href: '/guides/insurance/section-54-contractor-rights', description: 'Your legal rights under Section 54 of the Insurance Contracts Act when choosing a contractor.' },
  { title: 'Should I Take a Payout?', href: '/guides/insurance/should-i-take-a-payout', description: 'Cash settlement vs managed repair — which option is better for your situation?' },
];

export default function InsuranceGuidesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Insurance Claims Guides',
        subtitle: 'Expert guidance for navigating property damage insurance claims in Australia. Understand your rights, document effectively, and maximise your claim outcome.',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance Claims' },
      ]}
      sections={[
        {
          heading: 'Insurance Claims Guides',
          body: (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {insuranceGuides.map((guide) => (
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
          heading: 'Know Your Rights',
          body: (
            <div className="space-y-4 text-gray-300">
              <p>
                Under Australian Consumer Law and the Insurance Contracts Act 1984, you have specific rights when making a property damage claim. These include the right to choose your own contractor, the right to dispute insurer decisions through the Australian Financial Complaints Authority (AFCA), and protection against unfair claim denials under Section 54.
              </p>
              <p>
                Our guides break down the claims process into actionable steps — from the initial make-safe phase through to final settlement. Whether you are dealing with water damage, fire, storm, or mould, understanding the insurance process helps you avoid costly mistakes and delays.
              </p>
            </div>
          ),
        },
      ]}
      relatedPages={[
        { title: 'Insurance Claims Overview', href: '/insurance', description: 'How the insurance claims process works with Disaster Recovery.' },
        { title: 'Is It Covered?', href: '/is-it-covered', description: 'Check if your property damage is covered by insurance.' },
        { title: 'Cost Guides', href: '/cost', description: 'Understand restoration costs before you claim.' },
        { title: 'Start a Claim', href: '/claim', description: 'Begin your disaster recovery claim now.' },
      ]}
    />
  );
}
