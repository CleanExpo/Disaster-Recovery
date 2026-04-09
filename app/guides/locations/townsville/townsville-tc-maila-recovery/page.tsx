import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Townsville TC Maila Recovery — Complete Guide for Property Owners 2026',
  description:
    'Complete TC Maila recovery guide for Townsville property owners. What to do, what to claim, ARPC cyclone pool, and how NRPG helps through the full restoration process.',
  keywords:
    'townsville TC Maila recovery, cyclone Maila townsville, ARPC cyclone pool townsville, townsville cyclone damage 2026',
  alternates: {
    canonical: `${NAP.url}/guides/locations/townsville/townsville-tc-maila-recovery`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Townsville`,
  '@id': `${NAP.url}/#organization-townsville`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'Place', name: 'Townsville' },
    { '@type': 'State', name: 'Queensland' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Townsville TC Maila Recovery Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Townsville TC Maila Recovery Services',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Townsville`,
    '@id': `${NAP.url}/#organization-townsville`,
  },
  areaServed: { '@type': 'Place', name: 'Townsville' },
  serviceType: 'Cyclone Damage Restoration',
  description:
    'Emergency cyclone damage restoration, structural drying, mould remediation, and ARPC/insurer claim documentation for Townsville property owners affected by TC Maila April 2026.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should Townsville property owners do immediately after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wait for the DFES all-clear before leaving your home or entering damaged areas. Photograph all damage immediately — interior and exterior — with timestamps before any cleanup. Notify your insurer within 24–48 hours of the event. Lodge at disasterrecovery.com.au/claim for the NRPG priority response queue. Do not commence permanent repairs until your insurer has approved the scope of works.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the ARPC Cyclone Pool affect Townsville TC Maila claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Townsville (19.3°S) is north of the Tropic of Capricorn and is fully within the ARPC Cyclone Reinsurance Pool coverage zone. The pool processes all cyclone claims through your normal insurer — the claims process is the same as a regular claim, but ARPC pools the reinsurance risk behind the scenes. For maximum recovery, lodge damage as both \'cyclone damage\' and \'water ingress\' as separate line items within the same claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is mould from TC Maila covered in Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — mould directly caused by TC Maila is covered as a secondary consequence of the cyclone event. Document the moisture chain from cyclone water ingress through to mould growth with photographs and moisture readings. IICRC S520 documentation is required for insurer sign-off. Lodge mould as a separate line item within the cyclone claim rather than as a standalone mould claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my Townsville insurer is slow to respond post-TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Insurers must acknowledge claims within 10 business days under ICA obligations. ICA catastrophe protocols require expedited processing during declared catastrophe events. If your insurer does not respond within this timeframe or underpays the claim, escalate to the Australian Financial Complaints Authority (AFCA). NRPG provides full documentation — drying logs, scope of works, photographic records — to support AFCA lodgements.',
      },
    },
  ],
};

export default function TownsvilleTCMailaRecoveryPage() {
  return (
    <>
      <Script
        id="tvtcr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="tvtcr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="tvtcr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Townsville Location Guide"
        title="Townsville TC Maila Recovery — Complete Guide for Property Owners 2026"
        subtitle="What Townsville property owners need to do now — from emergency make-safe through ARPC cyclone pool claims to full property restoration after TC Maila"
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Townsville', href: '/guides/locations/townsville' },
          { label: 'TC Maila Recovery' },
        ]}
        cta={{ text: 'Lodge TC Maila Claim — Townsville', href: '/claim' }}
        sections={[
          {
            heading: 'TC Maila Townsville Impact — What Happened',
            body: (
              <div className="space-y-4">
                <p>
                  Tropical Cyclone Maila made landfall on the Far North Queensland coast between April 11&ndash;14, 2026, bringing Category 4 winds and extreme rainfall to the FNQ coast. Townsville, situated at 19.3&deg;S on the coast of Cleveland Bay, sits at the southern extent of TC Maila&rsquo;s direct impact corridor. While the cyclone centre tracked north of Townsville, the outer wind bands, storm surge into Cleveland Bay, and catchment rainfall across the Ross River and Bohle River systems created significant multi-peril damage across the region.
                </p>
                <p>
                  <strong>Cleveland Bay storm surge</strong> pushed water through the Port of Townsville and into low-lying foreshore properties. The Strand, North Ward, and Rowes Bay foreshore areas experienced storm surge inundation combined with wind-driven rain, resulting in compound water damage events where properties were simultaneously inundated from below (surge) and above (rain ingress through damaged roofs and windows).
                </p>
                <p>
                  <strong>Wind damage</strong> was widespread across Townsville&rsquo;s residential suburbs. TC Maila&rsquo;s outer bands delivered sustained winds of 80&ndash;120 km/h across Townsville, sufficient to strip roof coverings, lift metal roofing sheets, destroy shade structures and pergolas, and compromise building envelopes in older housing stock. Suburbs including Aitkenvale, Mundingburra, Gulliver, and Cranbrook reported significant structural wind damage.
                </p>
                <p>
                  <strong>NRPG pre-staged contractors</strong> in Townsville ahead of TC Maila&rsquo;s landfall, enabling immediate response deployment once the DFES all-clear was issued. Emergency response teams with water extraction equipment, temporary roof tarping materials, and structural drying equipment were positioned to mobilise across the Townsville region within hours of the all-clear.
                </p>
                <p>
                  <strong>Immediate response protocol:</strong> Lodge your TC Maila claim at <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> to enter the priority response queue. Do not wait for your insurer to appoint a contractor — you have the right to use your preferred IICRC-certified contractor, and make-safe works can commence before formal claim approval.
                </p>
              </div>
            ),
          },
          {
            heading: 'Townsville TC Maila Recovery — By Damage Type',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  TC Maila created multi-peril damage across Townsville. Understanding your damage type determines the required response, timeline, and claim lodgement approach.
                </p>
                <p>
                  <strong>Wind structural damage:</strong> Emergency make-safe is the immediate priority — temporary roof tarping to prevent further water ingress, securing compromised structural elements, and boarding openings left by destroyed windows and louvres. Make-safe works prevent secondary water damage and are covered under the cyclone claim. Do not attempt DIY roof access — structural damage may not be visually apparent.
                </p>
                <p>
                  <strong>Water damage:</strong> The 24-hour window for water extraction and structural drying is critical in Townsville&rsquo;s tropical climate. IICRC S500:2025 requires water extraction, structural drying, and dehumidification to commence immediately. In Townsville&rsquo;s heat and humidity, Category 1 clean water from cyclone ingress degrades to Category 2 within 24&ndash;48 hours. Deploy industrial drying equipment immediately after the all-clear.
                </p>
                <p>
                  <strong>Mould:</strong> The 48-hour mould growth window in Townsville&rsquo;s tropical climate is non-negotiable. Average post-cyclone temperatures of 28&ndash;32&deg;C and humidity exceeding 80% create ideal mould germination conditions. Visible mould on plasterboard can appear within 36 hours. IICRC S520 containment and remediation must begin before mould establishes.
                </p>
                <p>
                  <strong>Fire:</strong> Post-cyclone electrical hazards are a significant risk. Damaged wiring, wet switchboards, and fallen power lines create electrocution and fire risks. Do not restore power to cyclone-damaged properties without a licensed electrician&rsquo;s clearance. NRPG coordinates electrical safety assessments as part of the make-safe scope.
                </p>
                <p>
                  <strong>Multi-peril damage:</strong> Most Townsville TC Maila properties will have multiple damage types simultaneously — wind, water, and mould at minimum. NRPG prepares a single integrated scope covering all damage types, preventing scope gaps that create claim disputes and ensuring a single restoration timeline.
                </p>
              </div>
            ),
          },
          {
            heading: 'Insurance Claim Guide — TC Maila Townsville',
            body: (
              <div className="space-y-4">
                <p>
                  Lodging your TC Maila claim correctly from the outset determines your settlement outcome. Townsville property owners should understand how the ARPC Cyclone Pool works and how to structure their claim for maximum recovery.
                </p>
                <p>
                  <strong>ARPC Cyclone Pool mechanics:</strong> The Australian Reinsurance Pool Corporation (ARPC) Cyclone Reinsurance Pool backs all home and building insurance policies in cyclone-prone regions of Australia, including all of Queensland north of 19&deg;S. TC Maila is a declared cyclone event — all claims arising from the event are processed through the pool, but your claim is still lodged directly with your own insurer. The pool operates transparently in the background.
                </p>
                <p>
                  <strong>Correct lodgement terminology:</strong> For maximum claim recovery, lodge your TC Maila claim with the following distinct line items: (1) cyclone damage — wind structural damage and building envelope breaches; (2) water ingress — water damage to interior from cyclone-related entry points; (3) mould — secondary mould growth arising from the cyclone water ingress event. Lodging these as separate line items prevents each being subsumed into a single lump sum that may be underpaid.
                </p>
                <p>
                  <strong>Insurer-appointed vs NRPG preferred contractor rights:</strong> Your insurer may appoint their own preferred contractor. You have the right to use your preferred IICRC-certified contractor under the ICA General Insurance Code of Practice. If your insurer&rsquo;s appointed contractor is unavailable, unresponsive, or not IICRC-certified, you can request an alternative. NRPG provides the same claims documentation that insurer-appointed contractors provide.
                </p>
                <p>
                  <strong>AFCA escalation path:</strong> If your insurer acknowledges but does not progress your claim within 10 business days, underpays the settlement, or disputes a clearly cyclone-related item, escalate to the Australian Financial Complaints Authority (AFCA). AFCA handles insurance complaints at no cost. NRPG provides a complete documentation package — drying logs, scope of works, photographic records, moisture readings — that supports AFCA lodgements.
                </p>
              </div>
            ),
          },
          {
            heading: 'Recovery Timeline — What to Expect',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Townsville TC Maila recovery follows a structured timeline. Understanding what happens at each stage reduces uncertainty and ensures you can make informed decisions about repair authorisation and insurer engagement.
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Week 1: Emergency make-safe and water extraction.</strong> Temporary roof tarping, structural make-safe, emergency water extraction, and deployment of industrial drying and dehumidification equipment. NRPG documents all make-safe works for the claim. The property is secured and stabilised.
                  </li>
                  <li>
                    <strong>Weeks 1&ndash;3: Structural drying.</strong> Industrial drying equipment operates continuously. Daily moisture readings track drying progress across walls, ceilings, floors, and subfloor. In Townsville&rsquo;s tropical climate, structural drying typically takes 10&ndash;21 days depending on the extent of water ingress and building materials.
                  </li>
                  <li>
                    <strong>Weeks 2&ndash;6: Scope approval and restoration works commencement.</strong> Once make-safe is complete and drying is underway, the full restoration scope is prepared and submitted to the insurer for approval. Insurer assessment (in-person or desktop) occurs during this period. Mould remediation commences once containment is established.
                  </li>
                  <li>
                    <strong>Weeks 4&ndash;16: Repairs and rebuilds.</strong> Structural repairs — replacement of damaged roof coverings, wall linings, ceilings, flooring, windows, and doors — proceed once insurer scope approval is received. Larger structural rebuilds (roof frame replacement, load-bearing wall repairs) occur in this phase.
                  </li>
                  <li>
                    <strong>Ongoing: Mould clearance testing.</strong> Post-remediation air clearance testing confirms mould counts have returned to background levels before affected areas are reinstated. Clearance testing is a required document for insurer sign-off on mould remediation claims. NRPG coordinates accredited laboratory analysis for clearance certification.
                  </li>
                </ol>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What should Townsville property owners do immediately after TC Maila?',
            answer:
              'Wait for the DFES all-clear before leaving your home or entering damaged areas. Photograph all damage immediately with timestamps. Notify your insurer within 24–48 hours. Lodge at disasterrecovery.com.au/claim for the NRPG priority response queue. Do not commence permanent repairs until your insurer has approved the scope of works.',
          },
          {
            question: 'How does the ARPC Cyclone Pool affect Townsville TC Maila claims?',
            answer:
              'Townsville (19.3°S) is north of the Tropic and fully within the ARPC Cyclone Reinsurance Pool zone. The pool processes all cyclone claims through your normal insurer — the claims process is the same as a regular claim. Lodge damage as both \'cyclone damage\' and \'water ingress\' as separate line items for maximum recovery.',
          },
          {
            question: 'Is mould from TC Maila covered in Townsville?',
            answer:
              'Yes — mould directly caused by TC Maila is covered as a secondary consequence of the cyclone event. Document the moisture chain from cyclone ingress to mould growth. IICRC S520 documentation is required for insurer sign-off. Lodge mould as a separate line item within the cyclone claim.',
          },
          {
            question: 'What if my Townsville insurer is slow to respond post-TC Maila?',
            answer:
              'Insurers must acknowledge claims within 10 business days. ICA catastrophe protocols require expedited processing. Escalate to AFCA if your insurer does not respond or underpays. NRPG provides full documentation — drying logs, scope of works, moisture readings — to support AFCA lodgements.',
          },
        ]}
        relatedGuides={[
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description:
              'TC Maila emergency response for Far North Queensland — contractor coordination, claim lodgement, and recovery resources.',
          },
          {
            title: 'Cyclone Damage Restoration Townsville',
            href: '/cyclone-damage-restoration-townsville',
            description:
              'Full cyclone damage restoration for Townsville — structural drying, mould remediation, and ARPC claim documentation.',
          },
          {
            title: 'Flood Damage Restoration Townsville',
            href: '/flood-damage-restoration-townsville',
            description:
              'Townsville flood damage restoration — storm surge, Ross River flooding, and insurance claim support.',
          },
        ]}
      />
    </>
  );
}
