/**
 * DR-482 — Fuel Surcharge Pricing Guide 2026
 *
 * Landing page for LinkedIn + Facebook ad campaigns targeting:
 * - Loss adjusters / insurance claims managers (LinkedIn)
 * - Homeowners / SMB owners dealing with restoration surcharges (Facebook)
 *
 * SEO targets: "fuel surcharge restoration Australia", "diesel crisis contractor pricing",
 *              "ACCC compliant surcharge"
 *
 * ACL compliance: All surcharge calculations reference public indices (AIP).
 * No misleading conduct — guide represents cost pass-through methodology only.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import DownloadButton from './DownloadButton'

export const metadata: Metadata = {
  title: 'Fuel Surcharge Pricing Guide 2026 — Restoration & Carpet Cleaning | Disaster Recovery Australia',
  description:
    'How to apply a fair, ACCC-compliant fuel surcharge during the 2026 Strait of Hormuz energy crisis. Worked examples for small, medium, and large restoration firms. Free guide from NRPG.',
  keywords:
    'fuel surcharge restoration Australia, diesel crisis contractor pricing, ACCC compliant surcharge, fuel surcharge carpet cleaning, restoration firm pricing 2026',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/resources/fuel-surcharge-guide-2026',
  },
  openGraph: {
    title: 'Fuel Surcharge Pricing Guide 2026 — Restoration & Carpet Cleaning',
    description:
      'Fair, ACCC-compliant fuel surcharge formulas for restoration firms during the 2026 energy crisis. Free guide — worked examples for every firm size.',
    url: 'https://disasterrecovery.com.au/resources/fuel-surcharge-guide-2026',
    type: 'article',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it legal to charge a fuel surcharge to insurance clients in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, provided the surcharge reflects your actual cost increase, is disclosed before the service is provided, and is shown as a separate line item on the invoice. The ACCC requires surcharges to be transparent and tied to verifiable cost data (e.g. the AIP national diesel average). Bundling surcharges into the base rate without disclosure risks misleading conduct under the Australian Consumer Law.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much fuel surcharge should a small restoration firm charge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a small firm (1–3 vans) at current diesel prices (~$2.73/L vs $1.85/L baseline), the actual cost increase per residential job is approximately $3.50–$5.00. A flat $5.00 per job surcharge is fair, defensible to the ACCC, and accounts for price volatility. Review monthly using the AIP national average.',
      },
    },
    {
      '@type': 'Question',
      name: 'What index should I reference for my fuel surcharge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Australian Institute of Petroleum (AIP) national average terminal gate price is the standard reference for fuel surcharges in Australia. The NRMA weekly fuel report is also widely used. Both are publicly available and updated weekly, making your surcharge objective and auditable.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I remove the fuel surcharge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Set a specific trigger point when you activate the surcharge — for example, "this surcharge will be removed when national average diesel returns below $2.20/L." Check the AIP weekly. Removing the surcharge promptly when the trigger is met builds client trust and avoids the appearance of profiteering.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can policyholders claim fuel surcharges through their insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In most cases yes — a clearly itemised, ACCC-compliant fuel surcharge is a legitimate cost of restoration and should be included in insurance claims documentation. The surcharge must be shown as a separate line item with a brief explanation. Policyholders should ask their insurer to confirm coverage. NRPG contractors provide insurance-standard documentation for all charges.',
      },
    },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Fuel Surcharge Pricing Guide 2026 — Restoration & Carpet Cleaning Firms',
  datePublished: '2026-04-09',
  dateModified: '2026-04-09',
  author: { '@type': 'Organization', name: 'Disaster Recovery Australia / NRPG' },
  publisher: {
    '@type': 'Organization',
    name: 'Disaster Recovery Australia',
    url: 'https://disasterrecovery.com.au',
  },
  description:
    'Fair, ACCC-compliant fuel surcharge formulas for restoration and carpet cleaning firms during the 2026 Strait of Hormuz energy crisis.',
}

export default function FuelSurchargeGuide2026Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-white print:bg-white">

        {/* ── Hero ── */}
        <section className="bg-slate-900 text-white py-16 md:py-24 print:py-8 print:bg-white print:text-black">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3 print:text-black">
              NRPG Boardroom Intelligence · 9 April 2026
            </p>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight print:text-3xl print:text-black">
              Fuel Surcharge Pricing Guide
              <br />
              <span className="text-amber-400 print:text-black">For Restoration & Carpet Cleaning Firms</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-8 print:text-black print:text-base">
              Small, medium, and large operations navigating the 2026 Strait of Hormuz energy crisis.
              Fair pricing formulas, ACCC compliance, and invoice implementation — no fluff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 print:hidden">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Make a Claim
              </Link>
              <DownloadButton />
            </div>
          </div>
        </section>

        {/* ── Table of Contents ── */}
        <nav className="bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="container mx-auto px-6 max-w-4xl py-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Contents</p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
              {[
                ['1', 'The 2026 Fuel Crisis: What Happened', '#crisis'],
                ['2', 'Impact on Restoration Firms by Size', '#impact'],
                ['3', 'Global Industry Response', '#global'],
                ['4', 'Fair Pricing: What to Charge', '#pricing'],
                ['5', 'How to Implement Without Backlash', '#implementation'],
                ['6', 'ACCC Compliance', '#accc'],
                ['7', 'Beyond Surcharges: Reducing Fuel Costs', '#beyond'],
              ].map(([num, label, href]) => (
                <li key={num}>
                  <a href={href as string} className="text-blue-700 hover:underline">
                    <span className="text-slate-400 mr-1">{num}.</span>{label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* ── Body ── */}
        <article className="container mx-auto px-6 max-w-4xl py-12 print:py-4">

          {/* Section 1 */}
          <section id="crisis" className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              1. The 2026 Fuel Crisis: What Happened
            </h2>
            <p className="text-slate-700 mb-4">
              The closure of the Strait of Hormuz following the Iran conflict in February–March 2026
              triggered the largest disruption to global energy supply since the 1970s oil crises.
              Approximately 20% of global oil supply transits the Strait. Its closure sent Brent crude
              surging from ~$78/barrel to a peak of $126/barrel — a 60%+ increase in under four weeks.
            </p>
            <p className="text-slate-700 mb-6">
              For Australia, 70–80% of our refined petrol and diesel arrives via Asian refineries dependent
              on Hormuz transit routes. The Australian Government halved the fuel excise from 52.6c/L to
              26.3c/L from 1 April to 30 June 2026 — providing some relief, but not fully offsetting the
              40–60% increase in underlying fuel costs.
            </p>

            {/* Price table */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Fuel Type</th>
                    <th className="px-4 py-3 text-right font-semibold">Pre-Crisis (Feb 2026)</th>
                    <th className="px-4 py-3 text-right font-semibold">Current (April 2026)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Unleaded Petrol (AU)', '~$1.70/L', '$2.35–$2.45/L'],
                    ['Diesel (AU)', '~$1.85/L', '$2.73–$3.00+/L'],
                    ['US Gasoline', '~$3.01/gal', '$3.96–$4.00+/gal'],
                    ['US Diesel', '~$3.89/gal', '$5.37+/gal'],
                    ['Brent Crude (Global)', '~$78/barrel', '$96–$126/barrel'],
                  ].map(([type, pre, curr]) => (
                    <tr key={type} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-700">{type}</td>
                      <td className="px-4 py-3 text-right text-slate-500">{pre}</td>
                      <td className="px-4 py-3 text-right font-semibold text-red-700">{curr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">
              Sources: GlobalPetrolPrices.com, NRMA Weekly Fuel Report, IEA 2026 Energy Crisis Tracker, US EIA
            </p>
          </section>

          {/* Section 2 */}
          <section id="impact" className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              2. Impact on Restoration Firms by Size
            </h2>
            <p className="text-slate-700 mb-6">
              Fuel is a disproportionate cost for mobile service businesses. Every job requires driving
              to site — often with heavy equipment. Diesel powers the vans, truck-mounted extractors,
              trailer dehumidifiers, and generators. With diesel approaching $3.00/L (up from ~$1.85/L
              pre-crisis), a single van running 150km/day costs an additional $15–$25/day in fuel alone.
            </p>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Factor</th>
                    <th className="px-4 py-3 text-center font-semibold">Small (1–3 vans)</th>
                    <th className="px-4 py-3 text-center font-semibold">Medium (4–15 vans)</th>
                    <th className="px-4 py-3 text-center font-semibold">Large (16+ vans)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Fuel as % of revenue', '8–15%', '6–10%', '4–7%'],
                    ['Monthly fuel cost increase', '$400–$1,200/mo', '$2,000–$8,000/mo', '$10,000–$50,000+/mo'],
                    ['Route optimisation capacity', 'Limited', 'Moderate', 'Strong — zone routing'],
                    ['Ability to absorb cost', 'Very low', 'Moderate', 'Higher — scale advantage'],
                    ['Recommended approach', 'Flat surcharge per job', 'Tiered % surcharge', 'Contract renegotiation + %'],
                  ].map(([factor, small, med, large]) => (
                    <tr key={factor} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">{factor}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{small}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{med}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{large}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3 */}
          <section id="global" className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              3. Global Industry Response: What Others Are Charging
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                <h3 className="font-bold text-slate-800 mb-3">🇺🇸 United States</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li><strong>USPS:</strong> 8% fuel surcharge on packages (March 2026)</li>
                  <li><strong>Amazon:</strong> 3.5% fuel and logistics surcharge</li>
                  <li><strong>HVAC/Plumbing:</strong> $10–$15 flat per service call</li>
                  <li><strong>Pest control:</strong> 3–5% surcharge on invoices, monthly review</li>
                  <li><strong>Construction:</strong> 8–10% surcharges now standard</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                <h3 className="font-bold text-slate-800 mb-3">🇦🇺 Australia</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li><strong>Concrete suppliers:</strong> $8.10–$8.67 per m³ surcharge</li>
                  <li><strong>Construction:</strong> 8–10% fuel surcharges on projects</li>
                  <li><strong>Logistics/freight:</strong> Variable, tied to weekly diesel index</li>
                  <li><strong>ACCC position:</strong> Actively monitoring — surcharges must be justified by actual cost increases</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-800 mb-2">Lesson from the 2022 Fuel Spike</h3>
              <p className="text-sm text-slate-700">
                When US gas hit $4.25/gallon in 2022, contractors split into two camps.{' '}
                <strong>Camp 1</strong> added a visible fuel surcharge as a separate line item ($10–$15/call).{' '}
                <strong>Camp 2</strong> quietly raised base rates by 5–8%. When prices dropped, Camp 1 could
                visibly <em>remove</em> the surcharge — generating client goodwill. Camp 2 never lowered rates
                back down, creating silent resentment.
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-2">
                Use a visible, separate line-item surcharge. It aligns with NRPG's "Who First" philosophy — transparency with the people you serve.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="pricing" className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              4. Fair Pricing: What to Charge
            </h2>

            <div className="bg-slate-800 text-white rounded-lg p-6 mb-6 font-mono text-sm">
              <p className="text-slate-400 mb-2">// The Formula</p>
              <p className="text-amber-300 font-bold text-base">
                Fuel Surcharge = (Current Price − Baseline Price) × Avg Litres Per Job
              </p>
              <div className="mt-3 space-y-1 text-slate-300">
                <p>• <strong className="text-white">Baseline:</strong> price/litre when you last set your rates (~$1.85/L diesel pre-crisis)</p>
                <p>• <strong className="text-white">Current:</strong> this week's average diesel at your local station (check AIP or NRMA)</p>
                <p>• <strong className="text-white">Avg litres:</strong> total litres used per week ÷ total jobs per week (travel + equipment run time)</p>
              </div>
            </div>

            <h3 className="font-bold text-slate-800 text-lg mb-4">Worked Examples by Firm Size</h3>
            <div className="space-y-4 mb-6">
              {[
                {
                  size: 'Small Firm (1–3 vans, residential carpet cleaning)',
                  bg: 'bg-blue-50 border-blue-200',
                  steps: [
                    'Van uses ~60L diesel/week across 15 jobs → 4L per job',
                    'Baseline: $1.85/L | Current: $2.73/L',
                    'Surcharge = ($2.73 − $1.85) × 4L = $3.52',
                  ],
                  recommendation: 'Recommended: $5.00 flat per job (rounded to cover volatility + equipment fuel)',
                },
                {
                  size: 'Medium Firm (4–15 vans, mixed residential/commercial)',
                  bg: 'bg-green-50 border-green-200',
                  steps: [
                    'Fleet uses ~500L/week across 80 jobs → 6.25L per job',
                    'Surcharge = ($2.73 − $1.85) × 6.25L = $5.50 (~1.6% on $350 job)',
                  ],
                  recommendation: 'Recommended: 2–3% of invoice OR $5–$10 flat (whichever fits your billing system)',
                },
                {
                  size: 'Large Firm (16+ vans, insurance/commercial restoration)',
                  bg: 'bg-purple-50 border-purple-200',
                  steps: [
                    'Fleet uses ~2,000L/week across 150 jobs → 13.3L per job (heavy equipment, generators)',
                    'Surcharge = ($2.73 − $1.85) × 13.3L = $11.70 (~0.5% on $2,500 job)',
                  ],
                  recommendation: 'Recommended: 3–5% of invoice for insurance-billed work. Cap at $50–$75 for jobs $5,000+',
                },
              ].map(({ size, bg, steps, recommendation }) => (
                <div key={size} className={`rounded-lg p-5 border ${bg}`}>
                  <p className="font-bold text-slate-800 mb-2">{size}</p>
                  <ul className="text-sm text-slate-700 space-y-1 mb-3">
                    {steps.map(s => <li key={s}>• {s}</li>)}
                  </ul>
                  <p className="text-sm font-semibold text-slate-800 bg-white/60 rounded px-3 py-2">✓ {recommendation}</p>
                </div>
              ))}
            </div>

            {/* Quick reference table */}
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Firm Size</th>
                    <th className="px-4 py-3 text-center font-semibold">Method</th>
                    <th className="px-4 py-3 text-center font-semibold">Amount</th>
                    <th className="px-4 py-3 text-center font-semibold">On $300 Job</th>
                    <th className="px-4 py-3 text-center font-semibold">On $2,500 Job</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Small (1–3 vans)', 'Flat per job', '$5.00', '+$5.00 (1.7%)', '+$5.00 (0.2%)'],
                    ['Medium (4–15 vans)', 'Flat or % of invoice', '$5–$10 or 2–3%', '+$6–$9 (2–3%)', '+$50–$75 (2–3%)'],
                    ['Large (16+ vans)', '% of invoice (capped)', '3–5% (cap $75)', '+$9–$15 (3–5%)', '+$50–$75 (capped)'],
                  ].map(row => (
                    <tr key={row[0]} className="hover:bg-slate-50">
                      {row.map((cell, i) => (
                        <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-medium text-slate-700' : 'text-center text-slate-600'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5 */}
          <section id="implementation" className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              5. How to Implement Without Backlash
            </h2>
            <div className="space-y-4 mb-8">
              {[
                ['Rule 1: Name it honestly', 'Call it a "Temporary Fuel Surcharge" — never bury it in "service fees" or "admin charges." The word temporary is critical. It signals this will go away when prices normalise.'],
                ['Rule 2: Show it separately', 'The surcharge must be its own line item on the invoice. Not bundled into the job cost. This makes it visible, auditable, and removable.'],
                ['Rule 3: Tie it to a public index', 'Reference the AIP national average or the NRMA weekly fuel report. This makes it objective — not a discretionary markup.'],
                ['Rule 4: Announce before you charge', 'Give clients 7–14 days notice. An email, a website notice, and a mention during booking confirmations. Never surprise someone on the invoice.'],
                ['Rule 5: Remove it when it\'s over', 'When diesel drops below your trigger point, publicly remove the surcharge. The 2022 contractors who removed theirs saw measurable client retention improvements.'],
              ].map(([title, body], i) => (
                <div key={title} className="flex gap-4 p-5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-1">{title}</p>
                    <p className="text-sm text-slate-700">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Invoice example */}
            <h3 className="font-bold text-slate-800 text-lg mb-3">Invoice Line Item Format</h3>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                Invoice Example
              </div>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Service description', '3-bedroom carpet clean (steam extraction)', ''],
                    ['Service fee', '', '$320.00'],
                    ['Temporary Fuel Surcharge*', '', '$5.00'],
                    ['GST (10%)', '', '$32.50'],
                    ['TOTAL', '', '$357.50'],
                  ].map(([label, desc, amount]) => (
                    <tr key={label} className={label === 'TOTAL' ? 'bg-slate-50 font-bold' : ''}>
                      <td className="px-4 py-3 text-slate-700 w-1/3">{label}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{desc}</td>
                      <td className="px-4 py-3 text-right font-mono">{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-slate-50 px-4 py-3 text-xs text-slate-500 border-t border-slate-200">
                *Temporary Fuel Surcharge: Applied due to the current global fuel crisis (Strait of Hormuz disruption).
                Tied to the AIP national diesel average. Reviewed monthly. Will be removed when diesel returns below $2.20/L.
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="accc" className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              6. ACCC Compliance: Staying on the Right Side
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-6">
              <p className="font-bold text-red-800 mb-1">⚠️ The ACCC is actively monitoring fuel surcharges across Australia.</p>
              <p className="text-sm text-red-700">
                Several businesses have already been served notices requiring them to justify surcharges,
                particularly those exceeding 70% in remote areas.
              </p>
            </div>
            <div className="space-y-3">
              {[
                ['Your surcharge must reflect actual cost increases', 'Keep fuel receipts and log your weekly average price. The surcharge must be defensible against your real data.'],
                ['Do not bundle surcharges with hidden fees', 'The surcharge must be a visible, separate charge. Bundling creates a risk of misleading conduct under the Australian Consumer Law.'],
                ['Disclose before the service is provided', 'Under ACL, consumers must be informed of all charges before committing to a purchase. Mention it during quoting, on your website, and in booking confirmations.'],
                ['Review and adjust regularly', 'A surcharge set in April that is still the same amount in September (when fuel may have dropped) looks like profiteering. Review monthly at minimum.'],
                ['Keep a surcharge policy document', 'Write down your baseline price, your formula, your review schedule, and your removal trigger. If the ACCC asks, you have documentation.'],
              ].map(([title, body]) => (
                <div key={title} className="flex gap-3 text-sm">
                  <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>
                  <div>
                    <span className="font-semibold text-slate-800">{title}. </span>
                    <span className="text-slate-700">{body}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7 */}
          <section id="beyond" className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              7. Beyond Surcharges: Reducing Fuel Cost Impact
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                ['Route optimisation', 'Cluster jobs geographically. A 20% reduction in driving = 20% reduction in fuel cost per job. Use routing software if you have 4+ vans.'],
                ['Minimum job values', 'If a job doesn\'t meet a minimum revenue threshold for travel distance, decline it or add a travel fee. The crisis is the right time to enforce this.'],
                ['Fuel tax credits', 'Businesses operating heavy vehicles (>4.5t GVM) for off-road use can claim fuel tax credits via the ATO. Diesel used in machinery (generators, extractors) earns a credit of 21.4c/L.'],
                ['Bulk fuel purchasing', 'Negotiate bulk diesel delivery from Viva Energy, BP, or local distributors. Even 5–8c/L savings on 2,000L/week = $100–$160/week.'],
                ['Fleet card programmes', 'Shell, BP, or Ampol fleet cards offer 2–6c/L discounts and consolidated billing — making fuel cost tracking easier for surcharge justification.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-semibold text-slate-800 mb-1">{title}</p>
                  <p className="text-sm text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((item) => (
                <details key={item.name} className="group rounded-lg border border-slate-200 overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-slate-800 hover:bg-slate-50 list-none">
                    {item.name}
                    <span className="text-slate-400 ml-4 flex-shrink-0 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="px-5 pb-4 pt-2 text-sm text-slate-700 bg-slate-50 border-t border-slate-200">
                    {item.acceptedAnswer.text}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom line */}
          <div className="bg-slate-900 text-white rounded-xl p-8 mb-10">
            <h2 className="text-xl font-bold mb-3">Bottom Line</h2>
            <p className="text-slate-300 mb-4">
              A fair fuel surcharge for carpet cleaning and restoration firms in the current crisis sits between{' '}
              <strong className="text-white">$5–$10 per residential job</strong> or{' '}
              <strong className="text-white">2–5% of invoice value</strong> for commercial/restoration work,
              capped at $50–$75 for large jobs. This is defensible, proportionate to actual cost increases,
              and aligned with what major industries are charging (USPS at 8%, Amazon at 3.5%, construction at 8–10%).
            </p>
            <p className="text-slate-300">
              The key to avoiding backlash is <strong className="text-white">transparency</strong>. Name it clearly.
              Show it separately. Tie it to a public index. Remove it the moment you can. That&apos;s how you pass
              on costs without losing trust — and it&apos;s exactly what &quot;Who First&quot; looks like in practice.
            </p>
          </div>

          {/* Sources */}
          <div className="text-xs text-slate-500 border-t border-slate-200 pt-6 mb-10">
            <p className="font-semibold mb-1">Sources & References</p>
            <p>IEA 2026 Energy Crisis Policy Response Tracker · GlobalPetrolPrices.com Australia Diesel Prices (6 Apr 2026) ·
            NRMA Weekly Fuel Report (Apr 2026) · ACCC Fuel Excise Cut Monitoring (Apr 2026) ·
            Australian Government Fuel Excise Relief Fact Sheet (1 Apr 2026) · ATO Fuel Tax Credits 2025–26 ·
            CNN Business Fuel Surcharge Report (7 Apr 2026) · CNBC Amazon Surcharge Report (2 Apr 2026) ·
            IBTimes Australia Fuel Crisis 2026</p>
          </div>

          {/* Final CTA */}
          <div className="bg-red-700 text-white rounded-xl p-8 text-center print:hidden">
            <h2 className="text-2xl font-bold mb-2">Need Help with an Insurance Claim?</h2>
            <p className="text-red-100 mb-6 max-w-xl mx-auto">
              NRPG contractors provide insurance-standard documentation — including itemised surcharges —
              to support your claim from first contact through to settlement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-700 font-bold rounded-lg hover:bg-red-50 transition-colors text-lg"
              >
                Make a Claim
              </Link>
              <DownloadButton />
            </div>
          </div>

        </article>

      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          nav, footer, .print\\:hidden { display: none !important; }
          body { font-size: 12pt; }
          h2 { page-break-after: avoid; }
          table { page-break-inside: avoid; }
          section { page-break-inside: avoid; }
        }
      `}</style>
    </>
  )
}
