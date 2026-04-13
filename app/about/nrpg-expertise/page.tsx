import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NRPG Expertise: IICRC-Certified Property Restoration Claims Advocacy | Australia',
  description:
    'National Restoration Property Group (NRPG) — IICRC S500/S520/S700 certified, ACL-audited, Privacy Act compliant. Full lifecycle claims management from intake through AFCA resolution.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/about/nrpg-expertise',
  },
  openGraph: {
    title: 'NRPG Expertise: IICRC & ACL Claims Advocacy in Australia',
    description:
      'NRPG manages property damage claims end-to-end: intake, IICRC assessment, documentation, insurer negotiation, and AFCA escalation. Policyholder-first, always.',
    url: 'https://disasterrecovery.com.au/about/nrpg-expertise',
    type: 'website',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'National Restoration Property Group (NRPG)',
  alternateName: 'NRPG',
  url: 'https://disasterrecovery.com.au',
  logo: 'https://disasterrecovery.com.au/logo.png',
  description:
    'IICRC-certified property restoration claims advocacy platform for Australian policyholders. Managing claims from intake through AFCA resolution.',
  foundingDate: '2024',
  areaServed: { '@type': 'Country', name: 'Australia' },
  knowsAbout: [
    'Property restoration claims',
    'IICRC standards (S500, S520, S700)',
    'Australian Consumer Law compliance',
    'Insurance claim advocacy',
    'AFCA dispute resolution',
    'Water damage restoration',
    'Mold remediation',
    'Fire and smoke restoration',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://disasterrecovery.com.au/about' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'NRPG Expertise',
      item: 'https://disasterrecovery.com.au/about/nrpg-expertise',
    },
  ],
};

const stages = [
  {
    num: '1',
    label: 'Claim Intake',
    timeframe: 'Hour 0–24',
    nrpg: 'Assign dedicated claims advocate, notify insurer in writing (email + registered post), send policyholder confirmation with claim number and timeline.',
    policyholder: 'Lodge claim via NRPG mobile app or website (~5 minutes). Approve NRPG\'s fee (disclosed upfront).',
  },
  {
    num: '2',
    label: 'Damage Assessment',
    timeframe: 'Day 1–2',
    nrpg: 'Arrange IICRC-certified independent assessment. Assessor visits property (or video assessment if unsafe). Assessment references S500, S520, or S700. Report delivered to NRPG within 24 hours.',
    policyholder: 'Provide access to property. Supply any additional evidence (receipts, pre-incident photos, maintenance records).',
  },
  {
    num: '3',
    label: 'Claim Documentation',
    timeframe: 'Day 2–3',
    nrpg: 'Compile IICRC assessment, photos, inventory, receipts, BOM weather data, neighbour statements. Prepare formal written claim submission with cover letter citing damage scope, cost estimate, applicable coverage, and ACL/ICA legal framework.',
    policyholder: 'Review and approve submission before it is sent.',
  },
  {
    num: '4',
    label: 'Claim Advocacy',
    timeframe: 'Day 4 onwards',
    nrpg: 'Track insurer response weekly. Chase acknowledgment within 10 business days. Respond to additional information requests. Escalate delays in writing. Update policyholder weekly.',
    policyholder: 'Receive weekly updates. Be available for any insurer-requested inspection (NRPG present to represent you).',
  },
  {
    num: '5',
    label: 'Dispute Resolution',
    timeframe: 'If needed',
    nrpg: 'If denied or underpaid: request written reasons, prepare response with new evidence, send reconsideration letter to insurer (30–50% of disputes overturned here), prepare full AFCA submission if insurer doesn\'t budge.',
    policyholder: 'Receive clear advice on options at each stage. Approve escalation strategy.',
  },
  {
    num: '6',
    label: 'Settlement & Repair',
    timeframe: 'Final',
    nrpg: 'Verify payment received. Assist in selecting contractor (policyholder\'s choice, not insurer\'s preferred vendor). Provide scope of work based on IICRC assessment. Verify final completion.',
    policyholder: 'Choose contractor from NRPG\'s network or independently. Confirm repairs meet IICRC standard.',
  },
];

const standards = [
  {
    code: 'S500:2025',
    label: 'Water Damage Restoration',
    relevance: 'Defines water categories (clean, grey, black), drying procedures, and secondary damage prevention. If your insurer denies mold after water damage, S500 establishes that proper drying within 48 hours was required to prevent it.',
    nrpg: 'All water damage assessments are S500-certified. NRPG contractors use S500 methodology. Disputes are supported by S500 scientific evidence.',
  },
  {
    code: 'S520:2025',
    label: 'Mold Remediation',
    relevance: 'Distinguishes mold caused by water damage (insurable secondary loss) from mold caused by poor ventilation (not insurable). Defines proper remediation scope, containment, and verification.',
    nrpg: 'All mold assessments are S520-certified. NRPG advocates for mold remediation as secondary damage to covered water loss. Ensures remediation meets S520 verification standards.',
  },
  {
    code: 'S700:2025',
    label: 'Fire & Smoke Restoration',
    relevance: 'Defines smoke damage categories, required cleaning procedures, and HVAC remediation. Prevents insurers claiming smoke odour is "cosmetic" or will "naturally dissipate." All remediation costs are claimable.',
    nrpg: 'All fire/smoke assessments are S700-certified. NRPG disputes include S700 references to defend scope of work. Used to challenge HVAC cleaning denials and smoke odour misclassification.',
  },
];

const faqs = [
  {
    q: 'Is NRPG a real restoration company?',
    a: 'No. NRPG is a claims advocacy platform. NRPG connects policyholders with IICRC-certified restoration contractors but does not perform repairs. NRPG\'s expertise is in claim documentation, insurer negotiation, and dispute resolution.',
  },
  {
    q: 'Who pays NRPG?',
    a: 'Only the policyholder. NRPG does not accept payments from insurers, contractors, or anyone else. NRPG is paid as a percentage of the final claim settlement (15–25%, disclosed upfront). If the claim is denied, the fee is waived.',
  },
  {
    q: 'Is NRPG a law firm?',
    a: 'No. NRPG is not a law firm and does not provide legal advice. NRPG provides claims advocacy — expertise in IICRC standards, claim documentation, and AFCA process. NRPG can coordinate with lawyers if needed for major claims.',
  },
  {
    q: 'How is NRPG different from an insurance broker?',
    a: 'An insurance broker helps you buy insurance before a loss. NRPG helps you recover after a loss. NRPG is a claims advocate, not a broker. NRPG has no ongoing relationships with insurers that would create conflicts of interest.',
  },
  {
    q: 'Can NRPG guarantee my claim will be approved?',
    a: 'No. Claim outcomes depend on evidence, policy language, and insurer assessment. However, NRPG significantly improves your chances by obtaining independent IICRC assessment, documenting evidence thoroughly, using IICRC standards as leverage, and escalating to AFCA if needed.',
  },
  {
    q: 'Does NRPG work with all insurers?',
    a: 'Yes. NRPG works with every major Australian insurer and has no preferential relationships with any. NRPG advocates for the policyholder\'s rights regardless of which insurer they are dealing with.',
  },
];

export default function NRPGExpertisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main id="main-content" className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1e3a5f] to-[#0052CC] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-blue-200 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium">NRPG Expertise</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              NRPG: IICRC-Certified Property Restoration<br />
              <span className="text-blue-200">Claims Advocacy in Australia</span>
            </h1>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl">
              National Restoration Property Group advocates for policyholders exclusively. Not insurers.
              Not preferred vendors. End-to-end claim management from first contact through settlement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0052CC] font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Start Your Claim
              </Link>
              <Link
                href="/guides/how-to-make-an-insurance-claim-australia"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Claim Guide →
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { stat: 'IICRC', label: 'S500, S520, S700 certified' },
                { stat: 'ACL', label: 'Audited s.29, s.21, s.23' },
                { stat: 'AFCA', label: 'Jurisdiction accepted' },
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
              Who NRPG Is
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                National Restoration Property Group (NRPG) is Australia&apos;s property restoration claims
                advocacy platform. NRPG operates nationally, connecting distressed policyholders with
                IICRC-certified restoration contractors and expert claims advocates to manage the entire
                property damage claim lifecycle — from first contact through final settlement.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Insurance-backed claim processors (like BELFOR, APM) work for the insurer. Builders work
                for contractors. No one advocates for the policyholder as their primary stakeholder.
                NRPG exists to fix this.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-[#0052CC] mb-2">&ldquo;Who First&rdquo; — the NRPG principle</p>
                <p className="text-sm text-gray-700">
                  Policyholder first, always. No hidden insurer relationships. No secret deals. No steering
                  toward preferred contractors. The policyholder knows what NRPG is being paid and approves
                  it before work begins.
                </p>
              </div>
            </div>
          </section>

          {/* Process Stages */}
          <section aria-labelledby="process-heading">
            <h2 id="process-heading" className="text-2xl font-bold text-gray-900 mb-6">
              The NRPG Claim Lifecycle
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
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">NRPG Action</p>
                      <p className="text-gray-700">{nrpg}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Policyholder Action</p>
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
              IICRC Standards NRPG Works To
            </h2>
            <div className="space-y-4">
              {standards.map(({ code, label, relevance, nrpg }) => (
                <div key={code} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs bg-blue-50 text-[#0052CC] border border-blue-100 px-2 py-1 rounded font-medium">
                      IICRC {code}
                    </span>
                    <h3 className="font-semibold text-gray-900">{label}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Why it matters to claims</p>
                      <p className="text-gray-700">{relevance}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">NRPG compliance</p>
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
                  section: 'ACL s.29(1)(g) — Misleading Conduct',
                  desc: 'All NRPG communication to policyholders is reviewed for accuracy. NRPG clearly states what is known (damage extent, IICRC assessment), what is likely (claim probability), and what is not guaranteed (final settlement amount). NRPG discloses fees and insurer relationships upfront.',
                },
                {
                  section: 'ACL s.21 — Unconscionable Conduct',
                  desc: 'NRPG does not pressure policyholders to accept unfavourable settlements. NRPG ensures policyholders understand their rights before any decision. NRPG advocates for the policyholder\'s best interests, not its own.',
                },
                {
                  section: 'ACL s.23 — Unfair Contract Terms',
                  desc: 'NRPG\'s terms are simple, clear, and fair. Fee is proportional to work and recovery (15–25%). No one-sided termination clauses, no confidentiality restrictions preventing policyholders seeking second opinions. Terms reviewed annually by external counsel.',
                },
              ].map(({ section, desc }) => (
                <div key={section}>
                  <h3 className="font-semibold text-gray-900 mb-2">{section}</h3>
                  <p className="text-sm text-gray-700">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Common Questions About NRPG
            </h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details
                  key={q}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 group"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{q}</span>
                    <span className="text-[#0052CC] text-xl font-light flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-gray-700 text-sm leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#1e3a5f] text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Start Your Claim With NRPG</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              IICRC-certified assessment within 48 hours. Policyholder-first advocacy from intake through
              settlement. No upfront fees — paid only if you recover.
            </p>
            <Link
              href="/claim"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#0052CC] font-bold text-lg rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Begin Claim Registration →
            </Link>
            <p className="mt-6 text-blue-200 text-xs leading-relaxed max-w-2xl mx-auto">
              <strong>Privacy Collection Notice:</strong> Personal information is used solely to connect
              you with an IICRC-certified restoration contractor and to advocate for your insurance
              claim. Handled by NRPG in accordance with the Privacy Act 1988 (Cth) and Australian
              Privacy Principles. Data is stored in Australia.{' '}
              <Link href="/privacy" className="underline">Privacy Policy</Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
