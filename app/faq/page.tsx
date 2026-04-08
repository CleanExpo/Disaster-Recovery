import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Disaster Recovery Australia',
  description: 'Top 30 questions from Australian policyholders about insurance claims, water damage, fire restoration, mould remediation, storm damage, and emergency response. IICRC-certified expertise.',
  alternates: { canonical: 'https://disasterrecovery.com.au/faq' },
  openGraph: {
    title: 'FAQ — Disaster Recovery Australia',
    description: 'Top 30 questions from Australian policyholders about insurance claims, water damage, storm damage, fire restoration, and mould remediation.',
    url: 'https://disasterrecovery.com.au/faq',
    type: 'website',
  },
};

const FAQ_SECTIONS = [
  {
    category: 'Insurance Claims',
    anchor: 'insurance-claims',
    questions: [
      {
        q: 'Does home insurance cover water damage restoration in Australia?',
        a: 'Most Australian home and contents insurance policies cover sudden, accidental water damage — including burst pipes, storm intrusion, and appliance failures. Gradual leaks or maintenance-related damage are typically excluded. Flood cover is often an optional add-on. NRPG contractors begin work immediately and provide full scope-of-works documentation, moisture logs, and photographic evidence to support your claim reimbursement.',
      },
      {
        q: 'How do I make an insurance claim for disaster damage?',
        a: 'Lodge your claim online at disasterrecovery.com.au/claim with damage photos, your address, and a brief description. NRPG matches you with a certified contractor within your selected radius (20–100 km). We bill you directly so work begins immediately — no waiting for insurer approval. Your contractor provides the full documentation package your insurer requires, including IICRC-compliant scope of works, before-and-after photos, and moisture readings.',
      },
      {
        q: 'Can I choose my own restoration contractor when making an insurance claim?',
        a: 'Yes. Under the Insurance Contracts Act and the General Insurance Code of Practice, you have the right to choose a qualified repairer for most residential claims. Your insurer may recommend their preferred contractors, but you are not obligated to use them. Choosing an IICRC-certified contractor ensures the documentation meets industry standards regardless of which insurer is involved.',
      },
      {
        q: 'What happens if my insurer underpays or rejects my damage claim?',
        a: 'If your claim is underpaid or denied, you can request an internal review in writing. If unsatisfied, escalate to the Australian Financial Complaints Authority (AFCA) at no cost. Under the General Insurance Code of Practice, insurers must explain their decision in writing. Your NRPG contractor\'s independent damage assessment, scope of works, and photographic documentation is your primary evidence in a dispute.',
      },
      {
        q: 'How long does an insurance claim for property damage take in Australia?',
        a: 'Simple claims are typically resolved within 10–15 business days. Complex structural damage or disputed claims can take 3–6 months. Cyclone or flood catastrophe declarations (ICA CAT events) often see delays of 6–12 months due to claim volume. Having complete, professional documentation from an IICRC-certified contractor from day one significantly reduces delays and disputes.',
      },
      {
        q: 'What is a make-safe and does insurance cover it?',
        a: 'A make-safe is emergency stabilisation work to prevent further damage — boarding broken windows, tarping damaged roofs, isolating electrical hazards, and extracting standing water. Most home insurance policies cover make-safe costs as part of the claim, separate from full restoration. Work should begin within hours of the event to meet your policy\'s duty to minimise loss.',
      },
      {
        q: 'Does insurance cover mould removal after water damage?',
        a: 'Mould removal is covered when it results directly from an insured event such as a burst pipe, storm, or flood. Mould from long-term neglect or gradual leaks is generally excluded. NRPG contractors document the causal link between the water damage event and mould growth — this documentation is critical for successful mould remediation claims.',
      },
    ],
  },
  {
    category: 'Water Damage',
    anchor: 'water-damage',
    questions: [
      {
        q: 'What should I do immediately after water damage?',
        a: 'Stop the water source if safe — turn off the mains or isolate the burst pipe. Switch off electricity to affected areas at the switchboard. Move valuables, documents, and electronics to dry areas and photograph all damage from multiple angles. Do not use fans or domestic air conditioners to dry the space — these can spread contamination. Contact a professional immediately: mould can begin growing within 24 to 48 hours in Australian conditions.',
      },
      {
        q: 'How much does water damage restoration cost in Australia?',
        a: 'The minimum callout for professional water damage restoration is $2,200, which covers emergency extraction, industrial drying equipment deployment, antimicrobial treatment, and insurance documentation. Severe flooding affecting multiple rooms or subfloors typically ranges from $5,000 to $25,000. Most residential insurance policies cover these costs subject to your excess.',
      },
      {
        q: 'How long does it take to dry out a water-damaged house?',
        a: 'Professional structural drying takes 3 to 5 days for Category 1 (clean water) damage using commercial-grade dehumidifiers and air movers. Category 2 (grey water) or Category 3 (black water — sewage or floodwater) may take 7 to 14 days. IICRC-certified technicians take daily psychrometric readings to confirm materials reach their dry standard before any reinstatement begins.',
      },
      {
        q: 'What is Category 3 water damage and is it dangerous?',
        a: 'Category 3 water (black water) includes sewage backups, rising floodwater, and water that has contacted faecal matter or soil contamination. It is hazardous — containing bacteria, viruses, and pathogens. Affected materials must be removed and disposed of safely. Occupants should vacate affected areas until remediation is complete. NRPG contractors follow IICRC S500:2025 protocols for safe handling and disposal.',
      },
      {
        q: 'Can water-damaged flooring and walls be saved, or do they need to be replaced?',
        a: 'It depends on the water category, duration of exposure, and material type. Solid timber floors can often be dried and refinished if addressed within 24–48 hours of a Category 1 event. Particle board subfloors and gyprock wet for more than 48 hours typically require replacement. Your IICRC-certified technician performs moisture mapping to identify which materials can be salvaged versus those requiring removal.',
      },
    ],
  },
  {
    category: 'Mould Remediation',
    anchor: 'mould-remediation',
    questions: [
      {
        q: 'How do I know if I need professional mould remediation?',
        a: 'Professional remediation is required when mould covers more than 1 square metre, is present inside wall cavities, ceiling spaces, or HVAC systems, or when occupants experience respiratory symptoms, headaches, or unexplained fatigue. Visible surface mould is frequently a symptom of a larger hidden colony. A qualified mould assessor conducts air quality and surface sampling to determine contamination levels and identify species.',
      },
      {
        q: 'Is mould dangerous to my family\'s health?',
        a: 'Elevated mould levels can cause respiratory irritation, allergic reactions, and aggravate asthma — particularly in children, the elderly, and immunocompromised individuals. Certain species such as Stachybotrys (black mould) produce mycotoxins that pose serious health risks with prolonged exposure. If you suspect significant mould growth, reduce time in affected areas and seek professional assessment promptly.',
      },
      {
        q: 'Why does mould keep coming back after cleaning?',
        a: 'Surface cleaning removes visible mould but not the underlying moisture source or root system (mycelium) embedded in porous materials. Mould returns because the conditions that caused it — elevated humidity, a hidden leak, or inadequate ventilation — have not been resolved. Professional remediation identifies and eliminates the moisture source, removes affected materials where necessary, and applies HEPA filtration and antimicrobial treatment to prevent recurrence.',
      },
      {
        q: 'What is IICRC S520 mould remediation?',
        a: 'IICRC S520:2025 is the current international standard for professional mould assessment and remediation. It defines containment protocols, personal protective equipment requirements, air scrubbing procedures, and clearance testing standards. NRPG contractors follow S520:2025 to ensure remediation is thorough, safe, and produces documentation accepted by insurers and building certifiers.',
      },
    ],
  },
  {
    category: 'Fire & Storm Damage',
    anchor: 'fire-storm-damage',
    questions: [
      {
        q: 'Can a house be fully restored after fire damage?',
        a: 'Yes — most fire-damaged properties can be restored to pre-loss condition. The process includes immediate make-safe and board-up, soot and smoke removal from all surfaces (including inside ductwork), contents pack-out and specialist cleaning, odour elimination using thermal fogging and ozone treatment, and full structural reinstatement. Severe fires with structural compromise may require a combined restoration and rebuild approach. Timeline is typically 4 to 12 weeks depending on severity.',
      },
      {
        q: 'Why does smoke damage spread even in rooms the fire did not reach?',
        a: 'Smoke is a gas — it infiltrates through wall cavities, HVAC ducts, roof spaces, and gaps around power outlets. Hot gases can travel through an entire building, depositing soot and odour-causing compounds far from the origin point. Professional smoke damage assessment uses ATP meters and odour mapping to identify affected areas not visible to the naked eye. Ignoring hidden smoke residue leads to persistent odours and material degradation.',
      },
      {
        q: 'What should I do after a storm damages my roof or home?',
        a: 'Document everything with photos before any temporary repairs. Contact your insurer to lodge a claim and get a claim number. Arrange make-safe to prevent further damage — tarpaulin over breached roof areas, boarding broken windows. Do not dispose of any damaged materials until your insurer has conducted their assessment or you have your own independent documentation. Most policies require you to take reasonable steps to minimise further loss.',
      },
      {
        q: 'How long do I have to lodge an insurance claim after a storm?',
        a: 'Most Australian home insurance policies require notification of damage as soon as reasonably practicable — typically within 30 days of the event. The General Insurance Code of Practice requires insurers to acknowledge claims within 10 business days. In declared catastrophe (CAT) events such as TC Maila or the 2026 Queensland floods, insurers must maintain specific CAT-response service standards.',
      },
    ],
  },
  {
    category: 'Emergency Response',
    anchor: 'emergency-response',
    questions: [
      {
        q: 'How quickly can a restoration contractor respond to an emergency?',
        a: 'NRPG contractors target a 60-minute response across major Australian cities. Response times in regional areas such as Cairns, Townsville, and regional WA depend on contractor availability and distance. When you lodge online at disasterrecovery.com.au/claim, you select your response radius (20–100 km) and are instantly matched with the nearest available IICRC-certified contractor. The service operates 24 hours a day, 7 days a week including public holidays.',
      },
      {
        q: 'What areas of Australia does NRPG cover?',
        a: 'NRPG has active contractors across all Australian states and territories including Sydney, Melbourne, Brisbane, Perth, Adelaide, Hobart, Darwin, and Canberra. Regional coverage includes the Sunshine Coast, Gold Coast, Townsville, Cairns, Cape York, Geelong, Ballarat, Newcastle, Wollongong, and major WA regional centres. Coverage expands during declared disaster events (ICA CAT declarations) as contractors deploy to affected regions.',
      },
      {
        q: 'Are NRPG contractors available on weekends and public holidays?',
        a: 'Yes. Disasters do not observe business hours. All NRPG contractors operate 24/7 including weekends and public holidays. Emergency make-safe work is available any time. Standard restoration scheduling is coordinated by your assigned contractor.',
      },
      {
        q: 'What is IICRC certification and why does it matter?',
        a: 'The Institute of Inspection Cleaning and Restoration Certification (IICRC) is the international standard-setting body for the restoration industry. IICRC-certified technicians hold qualifications in water damage restoration (WRT), fire and smoke restoration (FSRT), mould remediation, and other specialisations. Certification ensures technicians follow current evidence-based protocols (S500:2025, S520:2025, S700:2025) and produce documentation that insurers accept.',
      },
      {
        q: 'Does NRPG handle both residential and commercial disaster recovery?',
        a: 'Yes. NRPG contractors handle residential homes, strata and apartment buildings, commercial offices, retail premises, restaurants, warehouses, and industrial facilities. Commercial jobs require additional considerations including business interruption documentation, tenant and landlord coordination, and compliance with commercial building codes.',
      },
    ],
  },
  {
    category: 'Contractor Quality',
    anchor: 'contractor-quality',
    questions: [
      {
        q: 'How do I know the contractor sent to my property is qualified?',
        a: 'Every contractor in the NRPG network must pass a multi-step vetting process: verified current IICRC certification, minimum $20 million public liability insurance, current trade licences for their state, a clean background check, and ongoing quality audits. Membership is maintained only while all credentials remain current. When your contractor arrives, they carry a valid IICRC card and can show proof of insurance on request.',
      },
      {
        q: 'What is the NRPG contractor network?',
        a: 'NRPG (National Restoration Professionals Group) is Australia\'s professional network for IICRC-certified disaster restoration contractors. Contractors join through a rigorous onboarding process including 14-day training, documentation review, and certification verification. The network connects qualified contractors with policyholders who need certified restoration services — ensuring quality, accountability, and insurer-accepted documentation on every job.',
      },
      {
        q: 'Can I request a specific contractor or geographic region?',
        a: 'When you lodge a claim, you select your response radius (20–100 km). The system automatically matches you with the nearest available certified contractor in your area. If you have previously worked with an NRPG contractor and wish to request them specifically, mention this in your claim notes and we will do our best to accommodate.',
      },
      {
        q: 'What documentation will the contractor provide for my insurer?',
        a: 'NRPG contractors provide a complete documentation package: initial damage assessment report with photos, moisture mapping readings and logs, scope of works detailing all tasks performed, IICRC-compliant drying records (psychrometric data), antimicrobial treatment records, and a final clearance report. This documentation is designed to meet the standards required by all major Australian insurers.',
      },
      {
        q: 'How do I lodge an emergency claim online?',
        a: 'Visit disasterrecovery.com.au/claim and complete the four-step form: describe the damage, provide your property address, upload photos (optional but recommended), and select your response radius. You will receive a contractor match confirmation immediately. The process takes under 3 minutes. No account is required to lodge a claim.',
      },
    ],
  },
];

// FAQPage schema — DR-451: structured data for Ask Maps / Google Rich Results
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_SECTIONS.flatMap((section) =>
    section.questions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    }))
  ),
};

const FAQ_CATEGORIES = [
  { name: 'Water Damage', href: '/faq/water-damage' },
  { name: 'Fire Damage', href: '/faq/fire-damage' },
  { name: 'Flood Restoration', href: '/faq/flood-restoration' },
  { name: 'Storm Damage', href: '/faq/storm-damage' },
  { name: 'Mould Removal', href: '/faq/mould-removal' },
  { name: 'Insurance Claims', href: '/faq/insurance-claims' },
  { name: 'Emergency Response', href: '/faq/emergency-response' },
  { name: 'Biohazard Cleanup', href: '/faq/biohazard-cleanup' },
  { name: 'Sewage Cleanup', href: '/faq/sewage-cleanup' },
  { name: 'Carpet Drying', href: '/faq/carpet-drying' },
  { name: 'Ceiling Repairs', href: '/faq/ceiling-repairs' },
  { name: 'Contents Restoration', href: '/faq/contents-restoration' },
  { name: 'Document Drying', href: '/faq/document-drying' },
  { name: 'Electronics Restoration', href: '/faq/electronics-restoration' },
  { name: 'Emergency Plumbing', href: '/faq/emergency-plumbing' },
  { name: 'Odour Removal', href: '/faq/odour-removal' },
  { name: 'General FAQs', href: '/faq/general' },
];

export default function FAQIndexPage() {
  return (
    <>
      {/* Raw <script> ensures JSON-LD is in SSR HTML for Googlebot / Gemini crawling */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section
          className="text-white py-16 px-4"
          style={{ background: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)' }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-3">Knowledge Centre</p>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Top 30 questions from Australian policyholders about disaster recovery, insurance claims, and restoration services — answered by IICRC-certified experts.
            </p>
            <div className="mt-8">
              <Link
                href="/claim"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition"
              >
                Lodge a Claim Now
              </Link>
            </div>
          </div>
        </section>

        {/* Jump nav */}
        <nav className="border-b bg-gray-50 sticky top-0 z-10" aria-label="FAQ sections">
          <div className="max-w-4xl mx-auto px-4 py-3 flex gap-4 overflow-x-auto text-sm">
            {FAQ_SECTIONS.map((section) => (
              <a
                key={section.anchor}
                href={`#${section.anchor}`}
                className="whitespace-nowrap text-blue-700 hover:text-blue-900 font-medium"
              >
                {section.category}
              </a>
            ))}
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-12">

          {/* Comprehensive FAQ — 30 questions across 6 categories */}
          {FAQ_SECTIONS.map((section) => (
            <section key={section.anchor} id={section.anchor} className="mb-14">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
                {section.category}
              </h2>
              <div className="space-y-6">
                {section.questions.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Category browse */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
              Browse All FAQ Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FAQ_CATEGORIES.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="block p-4 bg-white border border-gray-200 rounded-lg font-semibold text-blue-700 hover:border-blue-400 hover:bg-blue-50 transition text-sm"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-blue-900 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Need emergency restoration right now?</h2>
            <p className="text-blue-200 mb-6">
              IICRC-certified contractors available 24/7 across Australia. 60-minute response target.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/claim"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition"
              >
                Lodge Emergency Claim
              </Link>
              <Link
                href="/contact"
                className="border border-blue-400 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
