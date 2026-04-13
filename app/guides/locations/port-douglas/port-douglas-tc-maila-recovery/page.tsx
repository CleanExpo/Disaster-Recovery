import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Port Douglas TC Maila Recovery — Property Owner Guide 2026',
  description:
    'TC Maila recovery guide for Port Douglas and Daintree property owners. Port Douglas (4877) is in the direct TC Maila landfall corridor. ARPC cyclone pool claims, mould prevention, and NRPG priority post-clearance response.',
  keywords:
    'port douglas TC Maila recovery, cyclone Maila port douglas, port douglas cyclone damage 2026, daintree cyclone recovery 2026',
  alternates: {
    canonical: `${NAP.url}/guides/locations/port-douglas/port-douglas-tc-maila-recovery`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Port Douglas`,
  '@id': `${NAP.url}/#organization-port-douglas`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'Place', name: 'Port Douglas' },
    { '@type': 'Place', name: 'Daintree' },
    { '@type': 'Place', name: 'Far North Queensland' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Port Douglas TC Maila Recovery Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Port Douglas TC Maila Recovery Services',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Port Douglas`,
    '@id': `${NAP.url}/#organization-port-douglas`,
  },
  areaServed: { '@type': 'Place', name: 'Port Douglas' },
  serviceType: 'Cyclone Damage Restoration',
  description:
    'Emergency cyclone damage restoration, structural drying, mould remediation, and ARPC claim documentation for Port Douglas and Daintree property owners affected by TC Maila April 2026.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should Port Douglas property owners do immediately after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wait for Queensland Police or SES to issue the all-clear before leaving shelter or entering your property. Do not re-enter during the eye — violent conditions return as TC Maila\'s eye passes. Photograph all damage with timestamps before any cleanup. Notify your insurer within 24–48 hours to activate Additional Living Expenses. Lodge at disasterrecovery.com.au/claim — NRPG is deployed across Port Douglas (4877) and Daintree (4895) for priority post-clearance response.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the ARPC Cyclone Pool apply to Port Douglas TC Maila claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Port Douglas (16.5°S, postcode 4877) is well within the ARPC Cyclone Reinsurance Pool coverage zone. Lodge cyclone wind damage, water ingress, and mould as separate line items within the same claim — do not combine them into a single lump sum. Your insurer manages the claim as normal; ARPC pools the reinsurance risk in the background.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is mould covered for Port Douglas TC Maila claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — mould directly caused by TC Maila water ingress is covered as a secondary consequence of the cyclone event. In Port Douglas\' tropical conditions, mould can establish on wet surfaces within 24 hours. Document the water entry point and moisture spread path with photographs and moisture readings. Lodge mould as a separate line item within the cyclone claim, not as a standalone mould claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'My insurer says Port Douglas is outside their response area — what can I do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the ICA General Insurance Code of Practice, your insurer must progress your claim regardless of the remoteness of your location. If your insurer is unable to appoint a contractor within a reasonable timeframe, you can engage your preferred IICRC-certified contractor (such as NRPG) and seek reimbursement. If the insurer disputes this, escalate to AFCA. Document all insurer communication and make-safe works thoroughly.',
      },
    },
  ],
};

export default function PortDouglasTCMailaRecoveryPage() {
  return (
    <>
      <Script
        id="pdtcr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="pdtcr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="pdtcr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Port Douglas Location Guide"
        title="Port Douglas TC Maila Recovery — Property Owner Guide 2026"
        subtitle="Port Douglas (4877) and Daintree (4895) are in the direct TC Maila landfall corridor. What property owners need to do now — emergency make-safe, ARPC cyclone pool claims, and full restoration."
        gradient="linear-gradient(135deg, #4A0404 0%, #7B1FA2 50%, #0C2340 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-12"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Port Douglas', href: '/guides/locations/port-douglas' },
          { label: 'TC Maila Recovery' },
        ]}
        cta={{ text: 'Lodge TC Maila Claim — Port Douglas', href: '/claim' }}
        sections={[
          {
            heading: 'TC Maila Port Douglas Impact — What Happened',
            body: (
              <div className="space-y-4">
                <p>
                  Tropical Cyclone Maila made landfall across the Far North Queensland coast on 11&ndash;12 April 2026 as a Category 5 system with sustained winds of 215 km/h. Port Douglas (4877) and Daintree (4895), situated approximately 65 km north of Cairns, were within the direct TC Maila landfall corridor. The Douglas Shire and Daintree Coast experienced the full force of TC Maila&rsquo;s impact.
                </p>
                <p>
                  <strong>Four Mile Beach and Port Douglas Marina</strong> were exposed to TC Maila&rsquo;s storm surge along the Coral Sea coastline. Beachfront and marina properties in Port Douglas experienced storm surge inundation combined with extreme wind loads, with the Coral Sea providing no natural wind break against the cyclone&rsquo;s approach from the east. Properties along Macrossan Street, The Esplanade, and Murphy Street sustained combined wind and water damage.
                </p>
                <p>
                  <strong>Daintree Rainforest catchment rainfall</strong> caused the Daintree River to rise significantly, affecting low-lying properties in Daintree Village and Cow Bay. The Daintree region is already flood-prone; TC Maila&rsquo;s extreme rainfall event compounded existing flood risk with cyclone water ingress and structural wind damage. Properties in the Daintree area may have both cyclone and flood damage components requiring separate claim analysis.
                </p>
                <p>
                  <strong>Mossman Gorge corridor</strong> — the Mossman River catchment experienced rapid rise during TC Maila, affecting Mossman (4873) and Newell Beach. Properties in the Mossman River floodplain require the same cyclone vs flood peril distinction as those in the Daintree. Lodge cyclone water ingress separately from river flood inundation.
                </p>
                <p>
                  <strong>NRPG contractors are deployed</strong> across Port Douglas (4877), Daintree (4895), and Mossman (4873/4874). Lodge at <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> for priority post-clearance response once Queensland SES confirms your area is clear.
                </p>
              </div>
            ),
          },
          {
            heading: 'Port Douglas TC Maila — Damage Types and Claim Structure',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Port Douglas and Daintree properties are likely to have multiple damage types from TC Maila. Identifying each peril correctly at the point of claim lodgement is critical to maximum recovery.
                </p>
                <p>
                  <strong>Wind structural damage:</strong> TC Maila&rsquo;s 215 km/h sustained winds caused widespread structural damage across Port Douglas. Older timber and fibrous cement construction in the Douglas Shire are particularly susceptible to Category 5 wind loads. Emergency make-safe — roof tarping, structural securing, boarding of compromised openings — is the immediate priority once the all-clear is issued.
                </p>
                <p>
                  <strong>Cyclone water ingress:</strong> Water entering through cyclone-damaged roofs, walls, or windows is cyclone water ingress — covered under the ARPC Cyclone Pool. Lodge this separately from any flood inundation. Commercial-grade extraction and structural drying must commence within 24 hours in Port Douglas&rsquo; tropical climate.
                </p>
                <p>
                  <strong>Flood damage (Daintree and Mossman):</strong> If your property was inundated by the Daintree River, Mossman River, or overland flow rather than cyclone water ingress, flood cover under your standard home insurance policy applies — not the ARPC pool. NRPG documents which water damage is attributable to cyclone ingress and which to flood, ensuring the correct policy section is applied to each component.
                </p>
                <p>
                  <strong>Mould:</strong> Port Douglas averages 32&ndash;35&deg;C post-cyclone with high humidity. Without immediate extraction and drying, mould establishes on wet plasterboard and timber framing within 24&ndash;36 hours. Mould from TC Maila water ingress is covered under the cyclone claim as a secondary consequence. Begin containment before mould spreads to structural cavities.
                </p>
                <p>
                  <strong>Remote access considerations:</strong> Properties north of Port Douglas on the Daintree Coast and Cape Tribulation may face access delays due to road damage from TC Maila. NRPG will deploy to these areas as access is confirmed — contact us at <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> to register your property and we will prioritise dispatch when access is available.
                </p>
              </div>
            ),
          },
          {
            heading: 'ARPC Cyclone Pool — Port Douglas Claim Guide',
            body: (
              <div className="space-y-4">
                <p>
                  The ARPC Cyclone Reinsurance Pool covers all residential and eligible commercial properties in cyclone-prone regions of Australia. Port Douglas (16.5&deg;S) is fully within the coverage zone. Understanding how the pool works and how to structure your claim determines the outcome.
                </p>
                <p>
                  <strong>ARPC claim lodgement:</strong> Lodge with your own insurer as normal — the ARPC pool operates in the background. TC Maila is a declared cyclone event. Contact your insurer within 24&ndash;48 hours to notify of loss and activate your Additional Living Expenses (ALE) benefit if the property is uninhabitable.
                </p>
                <p>
                  <strong>Lodgement structure — four separate line items:</strong> (1) cyclone wind structural damage; (2) cyclone water ingress — interior water damage from cyclone entry points; (3) mould — secondary growth from cyclone water; (4) flood inundation — separately, if applicable (Daintree River, Mossman River, or overland flow). Each line item may be assessed by a different specialist and settled at a different rate.
                </p>
                <p>
                  <strong>Insurer access obligations:</strong> Port Douglas&rsquo; relative remoteness does not reduce your insurer&rsquo;s obligations. Your insurer must progress your claim and appoint an assessor within the ICA timeframes regardless of location. If your insurer is unable to provide a contractor within a timeframe that prevents further damage, engage NRPG directly and document the insurer&rsquo;s failure to respond.
                </p>
                <p>
                  <strong>AFCA escalation:</strong> If your insurer is unresponsive, underpays, or disputes a cyclone-related item, escalate to AFCA at no cost. NRPG provides the full documentation package — psychrometric drying logs, scope of works, moisture readings, photographic records — that supports AFCA lodgements.
                </p>
              </div>
            ),
          },
          {
            heading: 'Recovery Timeline — Port Douglas',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Port Douglas TC Maila recovery follows the same structured phases as other FNQ locations, with additional lead time for access confirmation to the more remote Daintree and Mossman Gorge areas.
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>All-clear and emergency make-safe.</strong> Once Queensland SES confirms access, NRPG deploys as soon as a certified contractor is confirmed for your area to Port Douglas and within a confirmed timeframe to Daintree and Mossman Gorge depending on road access. Roof tarping, structural securing, boarding of openings. All make-safe documented for the claim.
                  </li>
                  <li>
                    <strong>Days 1&ndash;3: Water extraction and drying deployment.</strong> Industrial extraction from all affected areas. Deployment of drying and dehumidification equipment. Initial moisture mapping of walls, ceilings, floors, and subfloors. Mould prevention treatment applied immediately.
                  </li>
                  <li>
                    <strong>Weeks 1&ndash;3: Structural drying.</strong> Daily psychrometric readings track drying progress. In Port Douglas&rsquo; tropical conditions, structural drying typically takes 14&ndash;21 days for moderate ingress events. Drying logs maintained for the insurance claim.
                  </li>
                  <li>
                    <strong>Weeks 2&ndash;6: Scope approval and mould remediation.</strong> Full restoration scope submitted to the insurer. IICRC S520 mould remediation underway under containment. Insurer assessment during this period.
                  </li>
                  <li>
                    <strong>Weeks 4&ndash;20: Structural repairs and rebuilds.</strong> Roof replacement, wall linings, ceilings, flooring, windows, and doors repaired or replaced once insurer approval is received. More severe structural losses extend the program timeline.
                  </li>
                </ol>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What should Port Douglas property owners do immediately after TC Maila?',
            answer:
              'Wait for Queensland Police or SES all-clear before leaving shelter or entering your property. Photograph all damage with timestamps. Notify your insurer within 24–48 hours. Lodge at disasterrecovery.com.au/claim — NRPG is deployed across 4877 and 4895 for priority post-clearance response.',
          },
          {
            question: 'How does the ARPC Cyclone Pool apply to Port Douglas TC Maila claims?',
            answer:
              'Port Douglas (16.5°S, 4877) is fully within the ARPC Cyclone Reinsurance Pool zone. Lodge with your own insurer as normal. Lodge cyclone wind damage, water ingress, and mould as separate line items. If your property was also flooded by the Daintree or Mossman River, lodge flood as a separate peril.',
          },
          {
            question: 'Is mould covered for Port Douglas TC Maila claims?',
            answer:
              'Yes — mould directly caused by TC Maila water ingress is covered as a secondary consequence of the cyclone event. Document the moisture chain from cyclone entry point to mould growth. IICRC S520 documentation is required for insurer sign-off. Lodge mould as a separate line item within the cyclone claim.',
          },
          {
            question: 'My insurer says Port Douglas is outside their response area — what can I do?',
            answer:
              'Your insurer must progress your claim regardless of remoteness. If they cannot appoint a contractor within a timeframe that prevents further damage, engage NRPG directly and document the insurer\'s failure to respond. Escalate to AFCA if the insurer disputes reimbursement.',
          },
        ]}
        relatedGuides={[
          {
            title: 'TC Maila Recovery Hub',
            href: '/events/tc-maila-recovery-2026',
            description:
              'Central TC Maila recovery hub — claim lodgement, government assistance, and contractor deployment status across all FNQ postcodes.',
          },
          {
            title: 'Cairns TC Maila Recovery',
            href: '/guides/locations/cairns/cairns-tc-maila-recovery',
            description:
              'TC Maila recovery guide for Cairns — the primary landfall zone for the event.',
          },
          {
            title: 'Storm Damage Restoration Port Douglas',
            href: '/storm-damage-restoration-port-douglas',
            description:
              'Port Douglas storm damage restoration — IICRC-certified contractors, structural drying, and insurance claim support.',
          },
          {
            title: 'ARPC Cyclone Pool Explained',
            href: '/guides/insurance/arpc-cyclone-reinsurance-pool',
            description:
              'How the ARPC Cyclone Reinsurance Pool works and what it means for your TC Maila claim.',
          },
        ]}
      />
    </>
  );
}
