import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NSW & QLD Storms April 2026 — Insurance Claim Advocacy | NRPG',
  description:
    'The April 2026 east coast storm events caused significant insured losses across NSW and QLD. NRPG advocates for policyholders navigating storm, flood, and wind damage claims.',
  keywords: [
    'nsw storms april 2026',
    'queensland storm damage 2026',
    'east coast storm insurance claim',
    'NRPG storm claim advocacy',
    'storm insurance dispute',
    'flood damage claim nsw',
    'wind damage claim qld',
  ],
  alternates: {
    canonical: '/events/nsw-storms-april-2026',
  },
  openGraph: {
    title: 'NSW & QLD Storms April 2026 — NRPG Claim Advocacy',
    description: 'East coast storm events, April 2026. NRPG works for you, not your insurer.',
    url: 'https://disasterrecovery.com.au/events/nsw-storms-april-2026',
    type: 'article',
  },
};

// Structured data for the event
const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'NSW and Queensland East Coast Storms — April 2026',
  description:
    'A series of severe east coast storm events in April 2026 caused wind, hail, and flooding across NSW and QLD. NRPG provides independent claim advocacy for affected policyholders.',
  location: {
    '@type': 'Place',
    name: 'New South Wales and Queensland, Australia',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'NSW, QLD',
      addressCountry: 'AU',
    },
  },
};

const faqItems = [
  {
    question: 'My insurer says storm damage is excluded because of a flood clause — what can I do?',
    answer:
      'Flood and storm are legally distinct categories under Australian insurance law. If wind, hail, or rain entered your property directly (not via rising floodwater), it is typically classified as storm damage, which most policies cover. NRPG reviews your policy wording and disputes misclassifications on your behalf.',
  },
  {
    question: 'How long does my insurer have to accept or reject my storm claim?',
    answer:
      'Under the Insurance Contracts Act 1984 and the General Insurance Code of Practice, your insurer must respond to your claim within 10 business days of receiving all required information. If they are taking longer without explanation, NRPG can escalate to the Australian Financial Complaints Authority (AFCA) on your behalf.',
  },
  {
    question: 'The assessor said my roof pre-existed the storm — is NRPG able to challenge that?',
    answer:
      'Yes. Pre-existing damage arguments are one of the most commonly disputed grounds. NRPG engages independent licensed building assessors who provide objective reports. Where pre-existing damage is exaggerated or incorrectly applied to deny cover, we prepare a formal dispute submission to AFCA.',
  },
  {
    question: 'My contents were damaged by water entering through a broken window during the storm — is that covered?',
    answer:
      'Water damage resulting from storm-caused structural openings (broken windows, damaged roofs, lifted tiles) is typically covered under home and contents policies as consequential damage. Your insurer must assess the water damage in the context of the covered storm event. NRPG can document this causal chain for your claim.',
  },
  {
    question: 'I have a $5,000 excess on my storm policy. Is it still worth claiming?',
    answer:
      'It depends on the extent of the damage. NRPG provides a no-obligation damage assessment to estimate the likely claim value before you commit. If the claim is unlikely to exceed your excess after repairs, we will tell you that honestly — there is no charge for this advice.',
  },
  {
    question: 'The emergency contractor my insurer sent did a poor job — what are my rights?',
    answer:
      'You are entitled to a competent rectification of the insured damage. If the insurer-appointed contractor has caused additional damage or failed to complete repairs to an acceptable standard, NRPG documents the deficiencies and pursues the insurer for the cost of rectification.',
  },
  {
    question: 'I rent my property — can I still make a storm damage claim?',
    answer:
      'As a tenant, you can claim on your contents insurance for storm-damaged personal property. Structural repairs are the landlord\'s responsibility under their building policy. NRPG can advise on which policy applies to each category of damage and assist with both if required.',
  },
  {
    question: 'What is the time limit for disputing a denied storm claim in Australia?',
    answer:
      'You have six years from the date of the event to lodge a legal claim under the Insurance Contracts Act 1984. However, AFCA requires you to have first completed the insurer\'s internal dispute resolution (IDR) process. NRPG recommends beginning a dispute within 60 days of denial to preserve all options.',
  },
];

const damagedAreasData = [
  { region: 'Sydney Basin (NSW)', damageType: 'Hail, wind, roof damage' },
  { region: 'Hunter Valley (NSW)', damageType: 'Flash flooding, debris flow' },
  { region: 'Northern Rivers (NSW)', damageType: 'Storm surge, river flooding' },
  { region: 'South-East QLD', damageType: 'Wind, hail, storm water' },
  { region: 'Darling Downs (QLD)', damageType: 'Large hail, wind damage' },
  { region: 'Gold Coast (QLD)', damageType: 'Coastal erosion, wind damage' },
];

export default function NSWStormsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#1C2E47] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-[#D4A574] mb-3 font-semibold">
            April 2026 Storm Events — NSW &amp; QLD
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            We work for you,<br className="hidden md:block" /> not your insurer.
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl">
            The April 2026 east coast storm events caused widespread damage across New South Wales and Queensland. If your insurer has denied, delayed, or undervalued your claim, NRPG provides independent advocacy — at no upfront cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/claim?event=nsw-storms-april-2026&source=event-page"
              className="inline-block bg-[#D4A574] text-[#1C2E47] font-bold py-3 px-8 rounded-lg text-center hover:bg-[#c49060] transition-colors"
              aria-label="Get storm claim help — NRPG collects your name, contact, and claim details to provide advocacy services. See our Privacy Policy."
            >
              Get Claim Help
            </Link>
            <Link
              href="tel:1800NRPGAU"
              className="inline-block border border-white text-white font-semibold py-3 px-8 rounded-lg text-center hover:bg-white/10 transition-colors"
            >
              Call NRPG Now
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Privacy notice (APP 3): NRPG collects your name, contact details, and claim information to provide insurance advocacy services. Information is handled in accordance with the Privacy Act 1988.{' '}
            <Link href="/privacy" className="underline hover:text-white">
              Privacy Policy
            </Link>
          </p>
        </div>
      </section>

      {/* Event Context */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1C2E47] mb-6">About the April 2026 Storm Events</h2>
          <p className="text-gray-700 mb-4">
            A series of severe weather systems tracked along Australia&apos;s east coast through April 2026, bringing destructive winds, large hail, heavy rainfall, and flash flooding to communities across New South Wales and Queensland. The events followed closely after Tropical Cyclone Alfred and compounded claims pressure on insurers already managing a high-volume catastrophe event.
          </p>
          <p className="text-gray-700 mb-8">
            Policyholders in affected areas are reporting delayed assessments, disputes over flood versus storm classification, and undervalued repair estimates. NRPG&apos;s advocacy team is accepting instructions for all storm, wind, hail, and storm-water damage claims arising from the April 2026 events.
          </p>

          {/* Affected Regions Grid */}
          <h3 className="text-lg font-semibold text-[#1C2E47] mb-4">Affected Regions</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {damagedAreasData.map((area) => (
              <div
                key={area.region}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <p className="font-semibold text-[#1C2E47] text-sm">{area.region}</p>
                <p className="text-gray-600 text-sm mt-1">{area.damageType}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Damage Types NRPG Handles */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1C2E47] mb-2">What NRPG Can Help With</h2>
          <p className="text-gray-600 mb-8">
            NRPG&apos;s assessors are trained to IICRC S500:2025 (water damage) and S520:2025 (mould remediation) standards and provide independent reports that support claim disputes.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Roof and Structural Damage',
                desc: 'Wind and hail damage to roof coverings, fascias, gutters, and structural framing. NRPG documents scope of damage and disputes pre-existing exclusions.',
              },
              {
                title: 'Storm Water Intrusion',
                desc: 'Water entering through storm-created openings — broken windows, lifted tiles, failed flashing. Assessed under IICRC S500:2025 moisture categorisation protocol.',
              },
              {
                title: 'Hail Impact Damage',
                desc: 'Hail damage to cladding, skylights, solar panels, HVAC units, and vehicles. NRPG provides independent assessments where insurer estimates are insufficient.',
              },
              {
                title: 'Flood vs Storm Disputes',
                desc: 'Insurers frequently misclassify storm water damage as excluded flood damage. NRPG prepares hydrological evidence to support correct classification.',
              },
              {
                title: 'Mould from Storm Moisture',
                desc: 'Unmitigated storm water intrusion can generate mould growth within 24–48 hours. NRPG documents the causal link between the storm event and subsequent mould under IICRC S520:2025.',
              },
              {
                title: 'Contents and Temporary Accommodation',
                desc: 'Storm events may entitle you to alternative accommodation if your property is uninhabitable and contents cover for damaged personal property.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border-l-4 border-[#8A6B4E] pl-4"
              >
                <h3 className="font-semibold text-[#1C2E47] mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How NRPG Works */}
      <section className="py-12 px-4 bg-[#1C2E47] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">How NRPG Advocates for You</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Independent Assessment',
                desc: 'Our assessors inspect your property and produce an independent damage report — separate from your insurer\'s assessor.',
              },
              {
                step: '02',
                title: 'Claim Review',
                desc: 'We review your policy, identify all applicable coverage, and document the full scope of insured damage.',
              },
              {
                step: '03',
                title: 'Dispute Resolution',
                desc: 'Where your insurer has denied or undervalued your claim, we prepare and lodge formal dispute submissions to AFCA.',
              },
            ].map((item) => (
              <div key={item.step}>
                <p className="text-[#D4A574] text-3xl font-bold mb-2">{item.step}</p>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white/10 rounded-lg text-sm text-gray-300">
            <strong className="text-white">No upfront cost:</strong> NRPG&apos;s fee is contingent on a successful outcome. If we do not recover additional money for you, you pay nothing for our advocacy services.
          </div>
        </div>
      </section>

      {/* ACL compliance note — no platform guarantee language per GAP-061 */}

      {/* Bupa / ACCC illustrative citation */}
      <section className="py-12 px-4 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#1C2E47] mb-4">Insurer Conduct Disputes — An Illustrative Context</h2>
          <p className="text-gray-700 text-sm mb-3">
            Australian regulatory authorities have, in separate proceedings, taken action against insurers for conduct that adversely affected claimants — including misrepresentation, claims handling delays, and failure to adequately assess storm damage. NRPG monitors AFCA and ASIC enforcement outcomes to maintain current dispute practices.
          </p>
          <p className="text-gray-500 text-xs">
            Note: Any regulatory matters referenced are illustrative of systemic industry issues and do not imply that your specific insurer has engaged in wrongful conduct.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1C2E47] mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-8 text-sm">
            Questions about the April 2026 NSW and QLD storm events and how insurance claims work.
          </p>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="border border-gray-200 rounded-lg group"
              >
                <summary className="flex justify-between items-start p-4 cursor-pointer font-medium text-[#1C2E47] list-none">
                  <span>{item.question}</span>
                  <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0">
                    ▾
                  </span>
                </summary>
                <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#1C2E47] mb-4">
            Start Your Storm Claim Review Today
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            NRPG provides independent advocacy for policyholders affected by the April 2026 east coast storm events. No upfront cost.
          </p>
          <Link
            href="/claim?event=nsw-storms-april-2026&source=event-cta"
            className="inline-block bg-[#1C2E47] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#243a5a] transition-colors text-lg"
            aria-label="Begin storm claim review — NRPG collects your contact and claim details to assess your situation."
          >
            Begin Claim Review
          </Link>
          <p className="text-xs text-gray-400 mt-4">
            Privacy notice (APP 3): NRPG collects your name, contact details, and claim information to provide insurance advocacy services. Information is handled in accordance with the Privacy Act 1988.{' '}
            <Link href="/privacy" className="underline hover:text-[#1C2E47]">
              Privacy Policy
            </Link>
          </p>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1C2E47] text-white px-4 py-3 flex items-center justify-between sm:hidden z-50">
        <p className="text-sm font-medium">April 2026 storm damage?</p>
        <Link
          href="/claim?event=nsw-storms-april-2026&source=sticky-cta"
          className="bg-[#D4A574] text-[#1C2E47] font-bold py-2 px-5 rounded-lg text-sm hover:bg-[#c49060] transition-colors"
          aria-label="Get help with storm claim"
        >
          Get Help
        </Link>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // SAFE: JSON.stringify of server-controlled schema object — no user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
    </main>
  );
}
