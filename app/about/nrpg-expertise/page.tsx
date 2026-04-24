import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NRPG Expertise & Authority | IICRC-Certified Restoration Network',
  description:
    'National Restoration Property Group — IICRC S500/S520/S700 certified network connecting Australian policyholders with vetted restoration contractors. Policyholder-first, always.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/about/nrpg-expertise',
  },
  openGraph: {
    title: 'NRPG Expertise & Authority | IICRC-Certified Restoration Network',
    description:
      'NRPG connects property owners with IICRC-certified restoration contractors across Australia. Independent from insurers. Policyholder-first network.',
    url: 'https://disasterrecovery.com.au/about/nrpg-expertise',
    type: 'website',
  },
};

// Article schema — trusted static data, safe to stringify
const articleSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'NRPG Expertise & Authority — IICRC-Certified Restoration Network',
  description:
    'National Restoration Property Group connects Australian policyholders with IICRC-certified contractors for water, fire, mould, and storm restoration. Independent from insurers.',
  url: 'https://disasterrecovery.com.au/about/nrpg-expertise',
  dateModified: '2026-04-14',
  datePublished: '2024-01-01',
  author: {
    '@type': 'Organization',
    name: 'National Restoration Professionals Group Pty Ltd',
    url: 'https://disasterrecovery.com.au',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Disaster Recovery',
    url: 'https://disasterrecovery.com.au',
    logo: 'https://disasterrecovery.com.au/logo.png',
  },
  about: [
    'IICRC certification standards',
    'Water damage restoration',
    'Mould remediation',
    'Fire and smoke restoration',
    'Insurance claim documentation',
    'Australian Consumer Law',
  ],
});

// Breadcrumb schema — trusted static data, safe to stringify
const breadcrumbSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://disasterrecovery.com.au/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About',
      item: 'https://disasterrecovery.com.au/about',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'NRPG Expertise & Authority',
      item: 'https://disasterrecovery.com.au/about/nrpg-expertise',
    },
  ],
});

const faqItems = [
  {
    q: 'Is NRPG a restoration company?',
    a: 'No. NRPG is a contractor network and matching platform. The network connects policyholders with IICRC-certified restoration contractors who perform the work. NRPG does not carry out repairs directly.',
  },
  {
    q: 'Who pays NRPG contractors?',
    a: 'The policyholder pays the contractor directly for work completed. Contractors invoice you — not your insurer. NRPG provides comprehensive documentation to support your insurance reimbursement claim.',
  },
  {
    q: 'Is NRPG independent from insurers?',
    a: 'Yes. NRPG has no financial relationships with any insurer and does not accept payments from insurers. Contractors in the network are independent businesses that hold their own licences, insurance, and IICRC certifications.',
  },
  {
    q: 'What certifications do NRPG contractors hold?',
    a: 'All NRPG contractors must hold current IICRC certification in their service category, minimum $20 million public liability insurance, WorkSafe accreditation, and compliance with relevant Australian Standards. Specialist categories (asbestos, HAZMAT) require additional licences.',
  },
  {
    q: "How does NRPG differ from an insurer's preferred repairer?",
    a: "An insurer's preferred repairer is selected by and accountable to the insurer. NRPG contractors are selected by and accountable to the policyholder. The contractor works to restore the property to the standard required by IICRC methodology — documented for the policyholder's claim.",
  },
  {
    q: 'Does NRPG operate Australia-wide?',
    a: 'Yes. The NRPG contractor network covers all eight Australian states and territories — from metropolitan centres to regional and remote communities. Emergency jobs receive priority matching.',
  },
];

// FAQPage schema — trusted static data, safe to stringify
const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

// HowTo schema — claim lifecycle, trusted static data, safe to stringify
const howToSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How NRPG Connects Policyholders with Certified Restoration Contractors',
  description:
    'Step-by-step process: lodging your claim through the NRPG platform, contractor matching, IICRC assessment, and documentation for insurance reimbursement.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Lodge Your Claim',
      text: 'Submit the claim online — describe the damage, upload photos, and provide your location. The platform is available 24/7.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'IICRC Assessment',
      text: 'An IICRC-certified contractor visits the property and assesses damage against the applicable standard (S500 for water, S520 for mould, S700 for fire/smoke).',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Claim Documentation',
      text: 'The assessment report, photos, and supporting evidence are compiled into a formal claim package for insurance reimbursement.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Restoration Work',
      text: 'The matched contractor carries out remediation to IICRC standard. The policyholder is invoiced directly.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Insurance Reimbursement',
      text: 'The claim package — including IICRC-certified assessment and full documentation — is submitted to the insurer for reimbursement under the policy.',
    },
  ],
});

const stages = [
  {
    num: '1',
    label: 'Claim Lodgement',
    timeframe: 'Hour 0–24',
    nrpg: 'Platform matches the job to the nearest available IICRC-certified contractor. Policyholder receives confirmation with job reference and expected response time.',
    policyholder:
      'Lodge via the NRPG platform or website — describe the damage, upload photos, confirm location.',
  },
  {
    num: '2',
    label: 'IICRC Damage Assessment',
    timeframe: 'Day 1–2',
    nrpg: 'Contractor visits the property and assesses damage against the applicable IICRC standard. Assessment report delivered within 24 hours of site visit.',
    policyholder:
      'Provide access to the property. Supply any supporting evidence (receipts, pre-incident photos, maintenance records).',
  },
  {
    num: '3',
    label: 'Documentation Package',
    timeframe: 'Day 2–3',
    nrpg: 'IICRC assessment, photographic evidence, inventory, and cost estimate are compiled into a formal claim package. Formal written summary cites applicable coverage and Australian Standards.',
    policyholder: 'Review the claim package before it is submitted to the insurer.',
  },
  {
    num: '4',
    label: 'Restoration Work',
    timeframe: 'Day 3 onwards',
    nrpg: 'Contractor carries out remediation to IICRC standard. Work is documented at each stage. Policyholder receives a formal invoice from the contractor.',
    policyholder: 'Confirm access is available. Review progress at each stage.',
  },
  {
    num: '5',
    label: 'Insurance Reimbursement',
    timeframe: 'Post-completion',
    nrpg: 'Complete claim package — IICRC-certified assessment, work documentation, and final invoice — is available for submission to the insurer for reimbursement.',
    policyholder:
      'Submit claim package to insurer. Contact NRPG if the insurer requests additional documentation.',
  },
];

const standards = [
  {
    code: 'S500:2025',
    label: 'Water Damage Restoration',
    relevance:
      'Defines water categories (clean, grey, black), required drying procedures, and secondary damage prevention. Establishes the technical standard for all water extraction and structural drying work.',
    nrpg: 'All water damage assessments in the NRPG network reference S500:2025. Drying methodology and containment decisions are made to the S500 standard, documented for claim support.',
  },
  {
    code: 'S520:2025',
    label: 'Mould Remediation',
    relevance:
      'Distinguishes mould caused by water damage (typically insurable as secondary loss) from mould caused by ongoing ventilation issues. Defines remediation scope, containment, and post-remediation verification.',
    nrpg: 'All mould assessments use S520:2025 methodology. Remediation scope and verification standards follow S520, with full documentation provided to the policyholder.',
  },
  {
    code: 'S700:2025',
    label: 'Fire & Smoke Restoration',
    relevance:
      'Defines smoke damage categories, required cleaning procedures, and HVAC remediation scope. Establishes that smoke odour and residue remediation are measurable, documentable, and claimable.',
    nrpg: "All fire and smoke assessments reference S700:2025. Assessment reports document damage category and required remediation scope per S700, supporting the policyholder's claim submission.",
  },
];

export default function NRPGExpertisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Trusted static schema — no user input
        dangerouslySetInnerHTML={{ __html: articleSchema }}
      />
      <script
        type="application/ld+json"
        // Trusted static schema — no user input
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <script
        type="application/ld+json"
        // Trusted static schema — no user input
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      <script
        type="application/ld+json"
        // Trusted static schema — no user input
        dangerouslySetInnerHTML={{ __html: howToSchema }}
      />

      <main id="main-content" className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1e3a5f] to-[#0052CC] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-blue-200 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium">NRPG Expertise &amp; Authority</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              NRPG Expertise &amp; Authority
              <br />
              <span className="text-blue-200">IICRC-Certified Restoration Network, Australia</span>
            </h1>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl">
              National Restoration Property Group connects policyholders with IICRC-certified
              contractors. Independent from insurers. Policyholder-first — from first contact
              through documentation and completion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0052CC] font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Lodge Your Claim
              </Link>
              <Link
                href="/guides/how-to-make-an-insurance-claim-australia"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Claim Guide &rarr;
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { stat: 'IICRC', label: 'S500, S520, S700 certified' },
                { stat: 'ACL', label: 'Australian Consumer Law compliant' },
                { stat: 'AFCA', label: 'Documentation to AFCA standard' },
                { stat: 'Privacy Act', label: '1988 (Cth) compliant' },
              ].map(({ stat, label }) => (
                <div key={stat} className="bg-white/10 rounded-lg p-4">
                  <div className="text-xl font-bold">{stat}</div>
                  <div className="text-blue-200 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
          {/* Who NRPG Is */}
          <section aria-labelledby="who-heading">
            <h2 id="who-heading" className="text-2xl font-bold text-gray-900 mb-4">
              What is NRPG?
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                National Restoration Property Group (NRPG) is Australia&apos;s IICRC-certified
                contractor network for property damage restoration. NRPG connects policyholders,
                tenants, and property managers with independently operating contractors who hold
                IICRC certification, current public liability insurance, and the specialist licences
                required for their service categories.
              </p>
              <p className="text-gray-700 leading-relaxed">
                NRPG does not manage insurer decisions and does not act as a claims agent. The
                network provides what policyholders need most: a certified contractor who documents
                the damage to the required IICRC standard — giving the policyholder the evidence
                needed to support their insurance reimbursement claim.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-[#0052CC] mb-2">
                  &ldquo;Who First&rdquo; — the NRPG principle
                </p>
                <p className="text-sm text-gray-700">
                  Policyholder first, always. NRPG contractors are selected by and accountable to
                  the policyholder — not the insurer, not a preferred vendor panel. There are no
                  hidden insurer relationships and no steering toward insurer-nominated repairers.
                </p>
              </div>
            </div>
          </section>

          {/* Claim Lifecycle */}
          <section aria-labelledby="process-heading">
            <h2 id="process-heading" className="text-2xl font-bold text-gray-900 mb-6">
              How the NRPG Claim Process Works
            </h2>
            <div className="space-y-4">
              {stages.map(({ num, label, timeframe, nrpg, policyholder }) => (
                <div key={num} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-[#0052CC] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {num}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{label}</h3>
                      <span className="text-xs text-gray-500">{timeframe}</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                        NRPG Network Action
                      </p>
                      <p className="text-gray-700">{nrpg}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                        Policyholder Action
                      </p>
                      <p className="text-gray-700">{policyholder}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* IICRC Standards */}
          <section aria-labelledby="iicrc-heading">
            <h2 id="iicrc-heading" className="text-2xl font-bold text-gray-900 mb-4">
              IICRC Standards the NRPG Network Works To
            </h2>
            <p className="text-gray-600 mb-6">
              Every contractor in the NRPG network must hold current IICRC certification in their
              service category. These are the primary standards applied across water, mould, and
              fire restoration work.
            </p>
            <div className="space-y-4">
              {standards.map(({ code, label, relevance, nrpg }) => (
                <div
                  key={code}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs bg-blue-50 text-[#0052CC] border border-blue-100 px-2 py-1 rounded font-medium">
                      IICRC {code}
                    </span>
                    <h3 className="font-semibold text-gray-900">{label}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                        What the standard covers
                      </p>
                      <p className="text-gray-700">{relevance}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                        NRPG network application
                      </p>
                      <p className="text-gray-700">{nrpg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ACL Compliance */}
          <section aria-labelledby="acl-heading">
            <h2 id="acl-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Australian Consumer Law Compliance
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
              {[
                {
                  section: 'ACL s.29(1)(g) — Misleading Representations',
                  desc: 'All NRPG communications are reviewed for accuracy. The network clearly distinguishes what is known (damage extent, IICRC assessment results) from what is estimated (cost ranges) and what depends on insurer assessment (reimbursement outcome). Fees are disclosed in full before work commences.',
                },
                {
                  section: 'ACL s.21 — Unconscionable Conduct',
                  desc: 'NRPG contractors do not pressure policyholders to accept any particular outcome. Policyholders are informed of their rights at each step. No contractor in the network has a financial incentive to steer work toward a particular insurer outcome.',
                },
                {
                  section: 'ACL s.23 — Unfair Contract Terms',
                  desc: 'Contractor agreements through NRPG are clear, proportional, and reviewed annually. No one-sided termination clauses. No confidentiality restrictions that would prevent policyholders from seeking independent advice. Terms available on request.',
                },
              ].map(({ section, desc }) => (
                <div key={section}>
                  <h3 className="font-semibold text-gray-900 mb-2">{section}</h3>
                  <p className="text-sm text-gray-700">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contractor Standards */}
          <section aria-labelledby="contractor-standards-heading">
            <h2 id="contractor-standards-heading" className="text-2xl font-bold text-gray-900 mb-4">
              What Every NRPG Contractor Must Hold
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <p className="text-gray-700 mb-4">
                Contractor membership in the NRPG network requires verified credentials across four
                categories. These are minimum entry requirements — not aspirational standards.
              </p>
              <ul className="space-y-3">
                {[
                  {
                    label: 'IICRC Certification',
                    detail:
                      "Current IICRC credentials in the contractor's active service categories (S500, S520, S700, FSRT, or equivalent). Certificates must be current — lapsed certification results in suspension from the network.",
                  },
                  {
                    label: 'Public Liability Insurance',
                    detail:
                      'Minimum $20 million public liability cover. Contractors hold their own policies — NRPG does not underwrite contractor insurance.',
                  },
                  {
                    label: 'WorkSafe Accreditation',
                    detail:
                      'Current workplace health and safety accreditation as required by the relevant state or territory authority.',
                  },
                  {
                    label: 'Specialist Licences',
                    detail:
                      'Asbestos handling licences for properties built before 1990. HAZMAT certification for biohazard, chemical, or contaminated material work. ISO 9001 quality management system alignment where applicable.',
                  },
                ].map(({ label, detail }) => (
                  <li key={label} className="flex gap-3">
                    <div className="w-2 h-2 bg-[#0052CC] rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">{label}</span>
                      <p className="text-sm text-gray-600 mt-0.5">{detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Common Questions About NRPG
            </h2>
            <div className="space-y-4">
              {faqItems.map(({ q, a }) => (
                <details
                  key={q}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 group"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{q}</span>
                    <span className="text-[#0052CC] text-xl font-light flex-shrink-0 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-700 text-sm leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related pages */}
          <section aria-labelledby="related-heading" className="border-t border-gray-200 pt-8">
            <h2 id="related-heading" className="text-lg font-semibold text-gray-900 mb-4">
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: 'About Disaster Recovery',
                  href: '/about',
                  desc: 'Platform overview — who manages the network and how it operates.',
                },
                {
                  title: 'IICRC Certified Contractors',
                  href: '/certifications/iicrc-certified',
                  desc: 'What IICRC certification means for restoration work.',
                },
                {
                  title: 'How It Works',
                  href: '/how-it-works',
                  desc: 'Step-by-step guide to lodging a claim through the platform.',
                },
                {
                  title: 'Lodge a Claim',
                  href: '/claim',
                  desc: 'Start the claim process — available 24/7.',
                },
              ].map(({ title, href, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="block bg-white rounded-xl border border-gray-100 p-4 hover:border-blue-200 hover:shadow-sm transition-all"
                >
                  <p className="font-medium text-[#0052CC] mb-1">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#1e3a5f] text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Lodge Your Claim Through NRPG</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              IICRC-certified contractor matching 24/7. Policyholder-first — from intake through
              documentation and completion. Flexible payment options available.
            </p>
            <Link
              href="/claim"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#0052CC] font-bold text-lg rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Begin Claim Registration &rarr;
            </Link>
            <p className="mt-6 text-blue-200 text-xs leading-relaxed max-w-2xl mx-auto">
              <strong>Privacy Collection Notice:</strong> Personal information is collected to match
              the property with an IICRC-certified restoration contractor. Handled by NRPG in
              accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles. Data
              stored in Australia.{' '}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
