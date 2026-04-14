/**
 * Resources hub — /resources
 *
 * DR-606 smoke test fix: this page was missing, causing /resources to return 404.
 * Lists available downloadable guides and professional resources.
 */

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resources | Disaster Recovery Australia',
  description:
    'Guides, pricing references, and professional resources for property owners, strata managers, and restoration contractors. Free downloads from Disaster Recovery Australia.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/resources',
  },
  openGraph: {
    title: 'Resources | Disaster Recovery Australia',
    description:
      'Free guides and resources for property owners dealing with water, fire, mould, and storm damage.',
    type: 'website',
  },
};

interface ResourceCard {
  title: string;
  description: string;
  href: string;
  tag: string;
  tagColour: string;
}

const resources: ResourceCard[] = [
  {
    title: 'Fuel Surcharge Pricing Guide 2026',
    description:
      'How to apply an ACCC-compliant fuel surcharge during the 2026 energy crisis. Worked examples for restoration and carpet cleaning firms.',
    href: '/resources/fuel-surcharge-guide-2026',
    tag: 'Contractor Pricing',
    tagColour: 'bg-amber-100 text-amber-800',
  },
];

const guideLinks = [
  { label: 'Water Damage Restoration', href: '/guides/water-damage/iicrc-s500-water-damage-restoration-standard' },
  { label: 'Mould Remediation', href: '/guides/mould/iicrc-s520-mould-remediation-standard' },
  { label: 'Fire and Smoke Restoration', href: '/guides/fire-smoke/iicrc-s700-fire-smoke-restoration-standard' },
  { label: 'How to Make an Insurance Claim', href: '/guides/how-to-make-an-insurance-claim-australia' },
  { label: 'AFCA Complaint Guide', href: '/guides/insurance/afca-complaint-guide' },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-14 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-3">
            Free resources
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Guides and Resources
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            Practical guides for property owners, strata managers, and contractors navigating
            insurance claims, restoration processes, and industry pricing.
          </p>
        </div>
      </section>

      {/* Downloadable resources */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Downloads</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="block rounded-xl border border-slate-200 p-6 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <span className={`inline-block text-xs font-semibold px-2 py-1 rounded mb-3 ${resource.tagColour}`}>
                  {resource.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{resource.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                  View guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guide links */}
      <section className="py-8 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Guides</h2>
          <ul className="space-y-3">
            {guideLinks.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium text-sm"
                >
                  <span className="text-slate-400">→</span>
                  {guide.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
