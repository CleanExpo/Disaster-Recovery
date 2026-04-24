import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tropical Cyclone Maila: Cape York Peninsula Claim Guide 2026 | NRPG',
  description:
    'TC Maila is tracking toward Cape York Peninsula as a Category 3 system. Landfall estimated 17–19 April 2026. Register your claim now. IICRC-certified advocacy — Who First.',
  keywords: [
    'cyclone maila cape york',
    'tc maila fnq 2026',
    'cyclone maila insurance claim',
    'cape york cyclone damage',
    'far north queensland cyclone claim',
    'cyclone maila property damage',
    'arpc cyclone reinsurance qld',
  ],
  // DR-745: canonical winner is tc-maila-fnq-2026; this page is a near-duplicate
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/tc-maila-fnq-2026',
  },
  openGraph: {
    title: 'Tropical Cyclone Maila: Cape York Peninsula Claim Guide 2026',
    description:
      'Category 3 TC Maila tracking toward Cape York. Register your claim now — NRPG provides IICRC-certified advocacy from first contact to settlement.',
    url: 'https://disasterrecovery.com.au/events/cyclone-maila-cape-york-fnq-2026',
    siteName: 'Disaster Recovery | NRPG',
    locale: 'en_AU',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TC Maila Cape York: Insurance Claim Guide | NRPG',
    description:
      'Category 3 cyclone approaching Cape York Peninsula. Register your claim before landfall (17–19 April 2026).',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is cyclone damage covered by my home insurance in Queensland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Cyclone damage is covered under standard home and contents insurance policies in Queensland, provided your insurer participates in the ARPC Cyclone Reinsurance Pool (most mainstream insurers do). Your policy will explicitly cover "cyclone" or "storm" damage. Check your policy document to confirm your coverage and excess. If you are unsure, contact your insurer before TC Maila makes landfall.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the ARPC Cyclone Reinsurance Pool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ARPC (Australian Reinsurance Pool Corporation) is a government-backed reinsurance pool that protects participating insurers against catastrophic cyclone losses across northern Australia. If your insurer participates, your cyclone claim is backed by federal government reinsurance. ARPC has paid over $1 billion in cyclone claims since July 2022.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly should I document damage after a cyclone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Within 24 hours if it is safe to do so. Water damage deteriorates rapidly — structural timber, plasterboard, and insulation begin rotting within 24–48 hours. Mold colonisation begins within 24–48 hours in tropical climates. Photographic evidence taken immediately after impact is strongest evidence for your claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'My insurer says my damage is "flood" not "cyclone" — what do I do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This is a common dispute. Cyclone-related water damage is covered (water entering through storm-damaged windows, missing roof sections, etc.). Pure flooding may not be covered unless you hold flood cover. Document the source of the water. If your insurer denies the claim as "flood", contact NRPG to help dispute it using IICRC documentation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What government assistance will be available after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If TC Maila is declared a natural disaster, the Disaster Recovery Funding Arrangements (DRFA) may activate, offering grants and loans for reconstruction. The Australian Government Disaster Recovery Payment (AGDRP) may provide $1,000–$3,000 per eligible person in declared LGAs. Check disasterassist.gov.au and qld.gov.au/prepare-act-recover after landfall.',
      },
    },
  ],
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Tropical Cyclone Maila — Cape York Peninsula',
  startDate: '2026-04-17',
  endDate: '2026-04-19',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Cape York Peninsula, Far North Queensland',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'QLD',
      addressCountry: 'AU',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'National Restoration Property Group (NRPG)',
    url: 'https://disasterrecovery.com.au',
  },
  description:
    'Tropical Cyclone Maila, Category 3, tracking toward Cape York Peninsula. Estimated landfall 17–19 April 2026. NRPG providing pre-landfall claim registration and post-landfall IICRC-certified recovery advocacy.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Events',
      item: 'https://disasterrecovery.com.au/events',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Cyclone Maila Cape York 2026',
      item: 'https://disasterrecovery.com.au/events/cyclone-maila-cape-york-fnq-2026',
    },
  ],
};

export default function CycloneMailaCapYorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main id="main-content" className="min-h-screen bg-gray-50">
        {/* P0 Alert Banner */}
        <div className="bg-red-600 text-white py-3 px-4 text-center">
          <p className="font-semibold text-sm md:text-base">
            ⚠️ <strong>ACTIVE CYCLONE ALERT:</strong> TC Maila is Category 3 tracking toward Cape
            York Peninsula. Estimated landfall 17–19 April 2026.{' '}
            <Link href="/claim" className="underline font-bold">
              Register your claim now →
            </Link>
          </p>
        </div>

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
                  <Link href="/events" className="hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium">Cyclone Maila — Cape York 2026</li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Live Event — P0 Emergency
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Tropical Cyclone Maila
              <br />
              <span className="text-blue-200">Cape York Peninsula Insurance Claim Guide</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
              Category 3 system tracking from the Solomon Sea. Estimated landfall 17–19 April 2026.
              Register your claim now — NRPG advocates for you from first contact to settlement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#0052CC] font-bold text-lg rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                aria-label="Register your cyclone claim with NRPG"
              >
                Register Your Claim Now
              </Link>
              <a
                href="https://bom.gov.au/cyclone"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold text-lg rounded-lg hover:bg-white/10 transition-colors"
              >
                BOM Live Tracking →
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">Cat 3</div>
                <div className="text-blue-200 text-sm">Current intensity</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">17–19 Apr</div>
                <div className="text-blue-200 text-sm">Estimated landfall</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">200 km/h</div>
                <div className="text-blue-200 text-sm">Peak gusts possible</div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
          {/* About TC Maila */}
          <section aria-labelledby="about-maila">
            <h2 id="about-maila" className="text-2xl font-bold text-gray-900 mb-4">
              About Tropical Cyclone Maila
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 prose prose-gray max-w-none">
              <p>
                Tropical Cyclone Maila is currently tracking through the Solomon Sea, approximately
                4–6 days from estimated landfall on Cape York Peninsula, Far North Queensland. The
                system is Category 3 and may strengthen to Category 4 before reaching the coast.
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Expected Conditions at Landfall</h3>
              <ul className="space-y-1 text-gray-700">
                <li>
                  Destructive winds: 120–170 km/h, gusts potentially exceeding 200 km/h in exposed
                  areas
                </li>
                <li>Heavy rainfall: 200–400 mm over 24–48 hours (higher in elevated terrain)</li>
                <li>Storm surge: significant coastal inundation in low-lying areas</li>
                <li>Flash flooding: creek and river rises, road closures across remote regions</li>
                <li>Duration: 12–24 hours of severe impact; cleanup may take weeks</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-lg p-4">
                <strong>For real-time updates:</strong>{' '}
                <a
                  href="https://bom.gov.au/cyclone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0052CC] underline"
                >
                  Bureau of Meteorology Cyclone Tracking
                </a>{' '}
                — check every 3–6 hours as landfall approaches.
              </p>
            </div>
          </section>

          {/* Pre-Landfall Action Plan */}
          <section aria-labelledby="before-landfall">
            <h2 id="before-landfall" className="text-2xl font-bold text-gray-900 mb-4">
              What To Do RIGHT NOW (Before Landfall)
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Review Your Insurance Policy',
                  body: 'Locate your home insurance policy and read the sections on "cyclone", "storm", and "flood". Confirm whether you are covered for cyclone wind damage (yes, under ARPC for most insurers), water damage resulting from cyclone damage (typically yes), and flood from rising water without structural breach (typically no unless you hold flood cover). Note your excess amount.',
                },
                {
                  step: '2',
                  title: 'Document Your Property NOW',
                  body: "Take dated photos and video of: roof condition, walls, windows, and doors (exterior and interior), fencing and outbuildings, all contents room by room, and any pre-existing damage. Save files with today's date and back up to cloud storage (Google Drive, OneDrive). These pre-event photos are essential for any future claim dispute.",
                },
                {
                  step: '3',
                  title: 'Know Your Emergency Claims Number',
                  body: 'Contact your insurer today and ask for their emergency claims phone number or post-cyclone portal. Some insurers activate special cyclone hotlines once landfall is confirmed. Write it down and store it with your important documents.',
                },
                {
                  step: '4',
                  title: 'Secure Important Documents',
                  body: 'Gather and protect: insurance policy documents, building permits and renovation records, receipts for recent appliance or structural upgrades, personal identification, and financial documents. Store originals in a waterproof container. Back up digital copies to cloud storage.',
                },
                {
                  step: '5',
                  title: 'Register with NRPG Now',
                  body: "Complete the registration form below. We will prioritise you post-landfall and ensure you are connected with an IICRC-certified contractor as soon as your claim is triggered. Registering now gives you a head start while insurers' queues fill up.",
                },
              ].map(({ step, title, body }) => (
                <div
                  key={step}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#0052CC] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Damage Types */}
          <section aria-labelledby="damage-types">
            <h2 id="damage-types" className="text-2xl font-bold text-gray-900 mb-4">
              Expected Damage Types &amp; Insurance Coverage
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  type: 'Wind Damage',
                  standard: null,
                  coverage: 'Covered under standard home/business policies (ARPC-pooled)',
                  action:
                    'Document pre-event photos of roof, walls, and structures NOW. Post-landfall, take dated photos within 24 hours if safe.',
                },
                {
                  type: 'Water Damage',
                  standard: 'IICRC S500:2025',
                  coverage:
                    'Covered if water entry is a direct result of wind damage (broken window, missing roof section)',
                  action:
                    'If water has entered your home, contact NRPG within 12 hours. Do not attempt to dry or clean yourself.',
                },
                {
                  type: 'Mold Growth',
                  standard: 'IICRC S520:2025',
                  coverage:
                    'Covered if mold results from a covered water damage event — the window is extremely tight (24–48 hours)',
                  action:
                    'If you see visible mold or smell musty odours post-cyclone, do NOT touch it. Contact NRPG immediately.',
                },
                {
                  type: 'Contents Damage',
                  standard: null,
                  coverage: 'Covered under home contents insurance if you hold contents coverage',
                  action:
                    'Document all damaged items with photos. Keep receipts or screenshots of replacement pricing. Do not discard items.',
                },
              ].map(({ type, standard, coverage, action }) => (
                <div
                  key={type}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{type}</h3>
                    {standard && (
                      <span className="text-xs bg-blue-50 text-[#0052CC] border border-blue-100 px-2 py-1 rounded font-medium">
                        {standard}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                    Coverage
                  </p>
                  <p className="text-sm text-gray-700 mb-3">{coverage}</p>
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                    Your Action
                  </p>
                  <p className="text-sm text-gray-700">{action}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Your Rights */}
          <section aria-labelledby="your-rights">
            <h2 id="your-rights" className="text-2xl font-bold text-gray-900 mb-4">
              Your Rights After Cyclone Damage
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">ARPC Cyclone Reinsurance Pool</h3>
                <p className="text-gray-700 text-sm">
                  If your insurer participates in the ARPC Cyclone Reinsurance Pool, your cyclone
                  damage is covered. ARPC has paid over{' '}
                  <strong>$1 billion in cyclone claims</strong> across approximately 20 events since
                  July 2022. Most mainstream insurers participate.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  ICA General Insurance Code of Practice
                </h3>
                <p className="text-gray-700 text-sm mb-2">Your insurer must:</p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Acknowledge your claim within 1 business day</li>
                  <li>Respond within 10 business days or provide a timeframe</li>
                  <li>For complex claims, provide a decision within 4 months</li>
                  <li>Treat you fairly and not engage in misleading conduct</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Australian Financial Complaints Authority (AFCA)
                </h3>
                <p className="text-gray-700 text-sm">
                  If your claim is denied, delayed, or you are unhappy with your insurer&apos;s
                  decision, AFCA offers free, independent dispute resolution. AFCA can order your
                  insurer to pay up to $1 million. Contact AFCA at{' '}
                  <a
                    href="https://afca.org.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0052CC] underline"
                  >
                    afca.org.au
                  </a>{' '}
                  or <strong>1800 931 678</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Government Assistance */}
          <section aria-labelledby="govt-assistance">
            <h2 id="govt-assistance" className="text-2xl font-bold text-gray-900 mb-4">
              Government Assistance (Check After Landfall)
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <p className="text-sm text-amber-800 mb-4 font-medium">
                ℹ️ Government assistance is activated after a formal disaster declaration. Check
                these sources after TC Maila makes landfall.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Disaster Recovery Funding Arrangements (DRFA)
                  </h3>
                  <p className="text-sm text-gray-700">
                    Grants and loans for reconstruction if TC Maila is declared a natural disaster.
                    Check:{' '}
                    <a
                      href="https://disasterassist.gov.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0052CC] underline"
                    >
                      disasterassist.gov.au
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Australian Government Disaster Recovery Payment (AGDRP)
                  </h3>
                  <p className="text-sm text-gray-700">
                    One-off payment of $1,000–$3,000 for eligible persons in declared LGAs. In
                    addition to insurance claims — you can access both. Check:{' '}
                    <a
                      href="https://disasterassist.gov.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0052CC] underline"
                    >
                      disasterassist.gov.au
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Queensland State Government</h3>
                  <p className="text-sm text-gray-700">
                    Additional state assistance for declared disasters. Check:{' '}
                    <a
                      href="https://qld.gov.au/prepare-act-recover"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0052CC] underline"
                    >
                      qld.gov.au/prepare-act-recover
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq">
            <h2 id="faq" className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((item) => (
                <details
                  key={item.name}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 group"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{item.name}</span>
                    <span className="text-[#0052CC] text-xl font-light flex-shrink-0 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                    {item.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* FNQ Coverage Transparency */}
          <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Far North Queensland Contractor Coverage: Honest &amp; Transparent
            </h2>
            <p className="text-sm text-gray-700 mb-3">
              NRPG is actively expanding our IICRC-certified contractor network across Cape York
              Peninsula and Far North Queensland. We will not pretend to cover every corner of FNQ
              today. Here is what this means in practice:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>
                In major centres (Cairns, Townsville, Atherton): immediate access to IICRC-certified
                contractors.
              </li>
              <li>
                In remote areas (Cape York Peninsula, outer FNQ): we are connecting you with the
                nearest certified contractor — response times may be longer than in urban areas.
              </li>
              <li>
                If contractor availability is genuinely constrained, we will help you navigate that
                reality with your insurer — ensuring you are not penalised for living remotely.
              </li>
            </ul>
            <p className="text-sm text-gray-600 mt-3 italic">
              Registering now helps us identify coverage gaps and prioritise contractor recruitment
              in your region.
            </p>
          </section>

          {/* CTA / Intake */}
          <section className="bg-[#1e3a5f] text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Register Your Claim Now</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              If TC Maila has affected or may affect your property, register with NRPG now. We will
              prioritise you the moment your claim is triggered post-landfall — connecting you with
              an IICRC-certified contractor and ensuring your insurer sees professional
              documentation from the start.
            </p>
            <Link
              href="/claim"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#0052CC] font-bold text-lg rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start My Claim Registration →
            </Link>
            <p className="mt-6 text-blue-200 text-xs leading-relaxed max-w-2xl mx-auto">
              <strong>Privacy Collection Notice:</strong> Personal information collected through
              this service is used solely to connect you with an IICRC-certified restoration
              contractor and to advocate for your insurance claim. Handled by NRPG in accordance
              with the Privacy Act 1988 (Cth) and Australian Privacy Principles. We may share your
              information with IICRC-certified restoration contractors in your area. We do not sell
              personal information. Information is stored in Australia.{' '}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
            </p>
          </section>

          {/* Related Resources */}
          <section aria-labelledby="resources">
            <h2 id="resources" className="text-xl font-bold text-gray-900 mb-4">
              Related Resources
            </h2>
            <ul className="space-y-2 text-sm">
              {[
                {
                  href: 'https://bom.gov.au/cyclone',
                  label: 'Bureau of Meteorology: Cyclone Tracking',
                  desc: 'Real-time TC Maila updates',
                  external: true,
                },
                {
                  href: 'https://disasterassist.gov.au',
                  label: 'Disaster Assist',
                  desc: 'Government financial assistance and recovery resources',
                  external: true,
                },
                {
                  href: 'https://afca.org.au',
                  label: 'AFCA: Australian Financial Complaints Authority',
                  desc: 'Free insurance dispute resolution (1800 931 678)',
                  external: true,
                },
                {
                  href: '/guides/insurance-claim-rejected-what-to-do',
                  label: 'Insurance Claim Rejected? What To Do',
                  desc: 'Step-by-step dispute guide',
                  external: false,
                },
                {
                  href: '/guides/how-to-make-an-insurance-claim-australia',
                  label: 'How To Make an Insurance Claim in Australia',
                  desc: '8-step guide for property damage claims',
                  external: false,
                },
              ].map(({ href, label, desc, external }) => (
                <li key={href}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#0052CC] hover:underline"
                    >
                      <span className="font-medium">{label}</span>
                      <span className="text-gray-400 text-xs">— {desc}</span>
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="flex items-center gap-2 text-[#0052CC] hover:underline"
                    >
                      <span className="font-medium">{label}</span>
                      <span className="text-gray-400 text-xs">— {desc}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
