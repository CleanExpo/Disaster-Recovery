/**
 * Brisbane Ex-TC Alfred Recovery Guide
 *
 * Ex-TC Alfred: 132,000+ ICA claims, AU$1.877B final insured loss (PERILS, 13 Apr 2026).
 * Brisbane LGA — significant residential and commercial Alfred damage across inner-city,
 * bayside, and suburban areas. High rate of claim disputes from multi-peril events.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Brisbane Ex-TC Alfred Recovery — Disputed & Underpaid Claims Guide 2026',
  description:
    'Ex-TC Alfred recovery guide for Brisbane property owners. Disputed, underpaid, or stalled Alfred claims — IICRC documentation for AFCA escalation, storm vs flood coverage analysis, and NRPG contractor support across Brisbane LGA.',
  keywords:
    'brisbane alfred recovery, ex cyclone alfred brisbane, brisbane insurance claim alfred 2026, alfred claim disputed brisbane, alfred underpaid brisbane',
  alternates: {
    canonical: `${NAP.url}/guides/locations/brisbane/brisbane-alfred-recovery`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Brisbane`,
  '@id': `${NAP.url}/#organization-brisbane`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'Place', name: 'Brisbane' },
    { '@type': 'State', name: 'Queensland' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Brisbane Ex-TC Alfred Recovery Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Brisbane Ex-TC Alfred Recovery — Claim Documentation and Restoration',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Brisbane`,
    '@id': `${NAP.url}/#organization-brisbane`,
  },
  areaServed: { '@type': 'Place', name: 'Brisbane' },
  serviceType: 'Storm and Cyclone Damage Restoration',
  description:
    'Post-Alfred restoration documentation, storm vs flood coverage analysis, and AFCA escalation documentation for Brisbane property owners with disputed, underpaid, or stalled Ex-TC Alfred insurance claims.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'My Brisbane Alfred claim was denied — what grounds can I dispute on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common denial grounds for Brisbane Alfred claims that can be disputed via AFCA include: storm surge attributed as flood (denying under storm cover when flood exclusion applies); pre-existing damage claimed without evidence; exclusion clauses that do not exist in your specific policy; desktop assessment that missed concealed damage. Gather your Policy Disclosure Statement, your claim lodgement, the insurer\'s denial letter, and any inspection reports. NRPG can provide a supplementary IICRC inspection report documenting damage that supports your AFCA dispute.',
      },
    },
    {
      '@type': 'Question',
      name: 'Brisbane is not in a cyclone zone — why was my Alfred claim handled differently?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ex-TC Alfred made landfall as an ex-tropical cyclone system, not an active named cyclone. At Brisbane\'s latitude (27.5°S), the ARPC Cyclone Reinsurance Pool does not apply — Brisbane Alfred claims are lodged under standard home insurance storm and wind damage cover. However, some insurers initially assessed Brisbane Alfred claims under cyclone-specific provisions that may not apply, potentially affecting coverage. If your insurer\'s denial references cyclone exclusions for a Brisbane property, this should be disputed with AFCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do I have to dispute my Alfred insurance claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the ICA General Insurance Code of Practice, there is no fixed time limit on your right to dispute an insurance decision, but delay weakens your case — particularly for claims where mould or secondary damage has progressed beyond what was present at the initial assessment. AFCA requires you to have first complained to your insurer and received a final response (or waited 45 days without a response) before lodging with AFCA. There is no AFCA filing fee.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Brisbane Alfred property has developed mould since the claim was settled — can I reopen the claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If mould developed as a direct consequence of Alfred water ingress that was inadequately remediated in the original claim — particularly if the insurer\'s appointed contractor completed insufficient drying — you may be able to reopen the claim or lodge a supplementary claim. The key evidence is showing the moisture chain from Alfred to the mould growth. Commission an IICRC inspection immediately to document current conditions before further deterioration. NRPG can provide this inspection and assessment report.',
      },
    },
  ],
};

export default function BrisbaneAlfredRecoveryPage() {
  return (
    <>
      <Script
        id="brisalr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="brisalr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="brisalr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Brisbane Location Guide"
        title="Brisbane Ex-TC Alfred Recovery — Disputed &amp; Underpaid Claims Guide"
        subtitle="Ex-TC Alfred affected tens of thousands of Brisbane properties across inner-city, bayside, and suburban areas. For Brisbane property owners with stalled, disputed, or underpaid Alfred claims — IICRC documentation support, storm vs flood coverage analysis, and AFCA escalation guidance."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-12"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Brisbane', href: '/guides/locations/brisbane' },
          { label: 'Ex-TC Alfred Recovery' },
        ]}
        cta={{ text: 'Get Alfred Claim Support — Brisbane', href: '/claim' }}
        sections={[
          {
            heading: 'Ex-TC Alfred and Brisbane — What Happened',
            body: (
              <div className="space-y-4">
                <p>
                  Ex-Tropical Cyclone Alfred made landfall on the SE Queensland coast on 8&ndash;9 March 2025, bringing destructive winds, extreme rainfall, and storm surge across greater Brisbane. The event was the most significant cyclone-origin system to directly impact the Brisbane metropolitan area since Cyclone Wanda in January 1974. Over 132,000 insurance claims were lodged across SE Queensland, with Brisbane LGA accounting for a significant proportion.
                </p>
                <p>
                  <strong>Brisbane Bayside flooding</strong> — Wynnum, Manly, Tingalpa, and Capalaba — experienced storm surge from Moreton Bay combined with floodwater from Bulimba Creek and Norman Creek. These multi-source flooding events created complex claim scenarios where the distinction between storm surge, river flooding, and stormwater became the basis for insurer disputes.
                </p>
                <p>
                  <strong>Inner-city wind damage</strong> was widespread across Paddington, Ashgrove, Red Hill, Kelvin Grove, Newmarket, and Bardon. Alfred&rsquo;s destructive wind core removed roof cladding, destroyed Queenslander-style external features, and breached building envelopes across older housing stock that predates modern cyclone design standards.
                </p>
                <p>
                  <strong>Brisbane River tributaries</strong> — the Oxley Creek, Breakfast Creek, and Kedron Brook catchments — rose rapidly under Alfred&rsquo;s extreme rainfall, affecting properties in Rocklea, Oxley, Sherwood, and Windsor. Properties in these catchments with flood cover had separate flood claim pathways from properties with storm-only cover in the areas above the modelled flood extent.
                </p>
                <p>
                  <strong>South Bank and inner-city commercial properties</strong> sustained significant facade and roof damage from Alfred&rsquo;s sustained winds. Commercial claims under Alfred are subject to different ICA code provisions than residential claims, with different assessment and disputes timeframes.
                </p>
              </div>
            ),
          },
          {
            heading: 'The Brisbane Alfred Claim Dispute Landscape',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Brisbane Alfred claims have a higher dispute rate than many other catastrophe events, driven by several factors specific to the Brisbane market.
                </p>
                <p>
                  <strong>Storm vs flood attribution:</strong> Brisbane LGA has significant areas in flood-prone catchments where standard home insurance excludes flood cover. Alfred generated both storm water (from the cyclone system itself, typically covered under storm damage) and floodwater (from rising rivers and creeks, which may or may not be covered depending on your policy). Insurers have disputed claims on the basis that damage was caused by flood rather than storm, particularly in bayside suburbs and creek-adjacent properties. The legal and technical boundary between storm surge, stormwater, and floodwater is not always clear — AFCA handles many cases involving this distinction.
                </p>
                <p>
                  <strong>Pre-existing damage claims:</strong> Brisbane has a high proportion of older housing stock — Queenslanders and early brick construction — where Alfred wind damage exposed pre-existing maintenance issues. Insurers have used pre-existing condition clauses to reduce or deny claims where Alfred wind damage is intertwined with old age or deferred maintenance. Under the ICA code, insurers must prove pre-existing damage and must cover the portion directly attributable to the insured event.
                </p>
                <p>
                  <strong>Inadequate remediation and mould:</strong> The scale of Alfred claims meant contractor shortages across Brisbane in the weeks following the event. Some properties that received early emergency make-safe works waited months for full structural remediation. During this period, inadequately dried properties developed secondary mould — particularly in wall cavities and under flooring in Queenslander-style homes with elevated subfloor spaces.
                </p>
                <p>
                  <strong>Commercial and strata disputes:</strong> Inner-city strata and commercial properties in Brisbane have faced disputes between the lot owner&rsquo;s policy and the body corporate or commercial building policy. Wind damage to common property elements — stairwells, facades, roofs — falls under the body corporate policy; interior fit-out damage falls under the individual owner&rsquo;s policy. Alfred often caused both simultaneously, creating coordinated claim disputes.
                </p>
              </div>
            ),
          },
          {
            heading: 'AFCA Escalation Guide — Brisbane Alfred Claims',
            body: (
              <div className="space-y-4">
                <p>
                  AFCA is the correct escalation path for Brisbane Alfred claim disputes. It is free, fast relative to court proceedings, and AFCA decisions on insurance matters are binding on the insurer.
                </p>
                <p>
                  <strong>Step 1 — Internal dispute resolution:</strong> Before AFCA, you must have raised a formal complaint with your insurer and either received a final response or waited 45 days without one. Send your complaint in writing (email with read receipt) stating specifically what decision you are disputing and why. Keep a copy of everything.
                </p>
                <p>
                  <strong>Step 2 — Gather your evidence:</strong> You will need: (1) your insurance policy (PDS + Certificate of Insurance); (2) the original claim lodgement; (3) the insurer&rsquo;s assessment report; (4) the denial or underpayment letter with reasons; (5) photographs of the damage; (6) quotes from independent licensed trades for the disputed repairs; (7) NRPG&rsquo;s IICRC scope of works if we have inspected the property.
                </p>
                <p>
                  <strong>Step 3 — Lodge with AFCA:</strong> Lodge online at afca.org.au. Select &ldquo;insurance&rdquo; as the product type. Describe the decision you are disputing, the grounds for dispute, and the outcome you are seeking. Attach all supporting evidence. AFCA will contact your insurer within 21 days.
                </p>
                <p>
                  <strong>What NRPG provides:</strong> NRPG&rsquo;s documentation package for AFCA submissions includes an IICRC inspection report documenting the current state of the property, moisture readings, scope of works for rectification, and photographic evidence. This provides the independent technical evidence that AFCA uses to assess quantum disputes.
                </p>
              </div>
            ),
          },
          {
            heading: 'Queenslander Homes and Alfred — Special Considerations',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Brisbane has one of Australia&rsquo;s highest concentrations of pre-1940 Queenslander homes. These properties have specific vulnerabilities and claim challenges in the aftermath of Ex-TC Alfred.
                </p>
                <p>
                  <strong>Subfloor moisture:</strong> Queenslander homes are elevated on stumps with open or louvred subfloor spaces. Alfred storm surge and floodwater entered these subfloor spaces easily, saturating the underside of floor structures — bearer and joist systems, floor sheeting, and lower wall framing. Standard visual inspections that did not include subfloor access frequently missed this damage. If your Queenslander&rsquo;s Alfred claim did not include a subfloor moisture assessment, the settlement may be incomplete.
                </p>
                <p>
                  <strong>Timber frame and cladding:</strong> Queenslander external cladding — chamferboard, VJ lining, fibrous cement — absorbs moisture differently from modern materials. Alfred wind-driven rain penetrated behind weatherboards and into wall cavities without visible external damage, creating concealed moisture in timber frames that then developed mould. In-depth moisture mapping of Queenslander wall frames requires in-person inspection with moisture meters — not a desktop assessment.
                </p>
                <p>
                  <strong>Heritage and character overlays:</strong> Properties in Brisbane&rsquo;s character protection areas must be restored with like-for-like materials under council planning instruments. Insurance policies are required to cover the cost of like-for-like restoration for insured events. If your insurer has offered a cash settlement based on modern material substitution costs rather than genuine like-for-like restoration costs for a character-overlay property, dispute this via AFCA with council planning documentation showing the material requirements.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'My Brisbane Alfred claim was denied — what grounds can I dispute on?',
            answer:
              'Common disputable denial grounds include: storm surge attributed as flood incorrectly, pre-existing damage claims without evidence, exclusion clauses not in your specific PDS, or desktop assessments missing concealed damage. Lodge with AFCA after exhausting internal dispute resolution. NRPG provides supplementary IICRC inspection reports to support the dispute.',
          },
          {
            question: 'Brisbane is not in a cyclone zone — why was my Alfred claim handled differently?',
            answer:
              'Ex-TC Alfred made landfall as an ex-tropical system. Brisbane (27.5°S) is outside the ARPC Cyclone Pool zone — Brisbane Alfred claims are under standard storm/wind cover. If your insurer has applied cyclone-specific exclusions to a Brisbane property, that should be disputed via AFCA.',
          },
          {
            question: 'How long do I have to dispute my Alfred insurance claim?',
            answer:
              'There is no fixed deadline under the ICA code, but delay weakens your case as damage progresses. Complain in writing to your insurer first, then lodge with AFCA after 45 days with no resolution. AFCA is free to use.',
          },
          {
            question: 'My Brisbane Alfred property has developed mould since the claim was settled — can I reopen the claim?',
            answer:
              'If mould developed from Alfred water ingress that was inadequately remediated, you may be able to reopen or supplement the claim. Commission an IICRC inspection immediately to document the moisture chain from Alfred to the mould growth. NRPG provides this inspection report for AFCA submission.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Ex-TC Alfred Disputed & Late Claims',
            href: '/events/ex-cyclone-alfred-recovery',
            description:
              'National recovery hub for Ex-TC Alfred disputed and underpaid insurance claims — AFCA pathways and IICRC documentation support.',
          },
          {
            title: 'Gold Coast Ex-TC Alfred Recovery',
            href: '/guides/locations/gold-coast/gold-coast-alfred-recovery',
            description:
              'Ex-TC Alfred disputed claims guide for Gold Coast property owners.',
          },
          {
            title: 'Brisbane Commercial Water Damage',
            href: '/guides/locations/brisbane/brisbane-commercial-water-damage',
            description:
              'Brisbane commercial water damage restoration — storm damage, flooding, and business continuity.',
          },
          {
            title: 'AFCA Insurance Dispute Guide',
            href: '/guides/insurance/afca-insurance-complaint-guide',
            description:
              'Step-by-step guide to lodging an AFCA complaint for an underpaid or disputed insurance claim.',
          },
        ]}
      />
    </>
  );
}
