/**
 * Gold Coast Ex-TC Alfred Recovery Guide
 *
 * Ex-TC Alfred: 132,000+ ICA claims, AU$1.877B final insured loss (PERILS, 13 Apr 2026).
 * Gold Coast was the hardest-hit metro area — high-density residential, canal estates,
 * hinterland flooding, significant claim dispute and underpayment rate.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Gold Coast Ex-TC Alfred Recovery — Disputed & Underpaid Claims Guide 2026',
  description:
    'Ex-TC Alfred recovery guide for Gold Coast property owners. AU$1.877B final insured loss. Disputed, underpaid, or stalled Alfred claims — IICRC documentation for AFCA escalation, ARPC cyclone pool rights, and NRPG contractor support.',
  keywords:
    'gold coast alfred recovery, ex cyclone alfred gold coast, gold coast insurance claim alfred 2026, gold coast alfred disputed claim, alfred claim underpaid gold coast',
  alternates: {
    canonical: `${NAP.url}/guides/locations/gold-coast/gold-coast-alfred-recovery`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Gold Coast`,
  '@id': `${NAP.url}/#organization-gold-coast`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'Place', name: 'Gold Coast' },
    { '@type': 'State', name: 'Queensland' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Gold Coast Ex-TC Alfred Recovery Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Gold Coast Ex-TC Alfred Recovery — Claim Documentation and Restoration',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Gold Coast`,
    '@id': `${NAP.url}/#organization-gold-coast`,
  },
  areaServed: { '@type': 'Place', name: 'Gold Coast' },
  serviceType: 'Storm and Cyclone Damage Restoration',
  description:
    'Post-Alfred restoration documentation, ARPC cyclone pool claim support, and AFCA escalation documentation for Gold Coast property owners with disputed, underpaid, or stalled Ex-TC Alfred insurance claims.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'My Gold Coast Alfred claim has been "under review" for months — what can I do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under ICA catastrophe protocols, insurers must acknowledge claims promptly and provide a decision timeframe. If your Alfred claim has been "under review" without a substantive update for more than 8 weeks, you can escalate to AFCA at no cost. Gather all insurer correspondence, your original claim lodgement, and any inspection reports. NRPG provides supplementary IICRC documentation — moisture readings, scope of works, drying logs — that supports AFCA lodgements where insurers dispute the extent of damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool apply to Gold Coast Alfred claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Gold Coast (28°S) is south of the ARPC Cyclone Reinsurance Pool\'s cyclone-prone zone (Queensland properties north of approximately 26°S for pool purposes). Ex-TC Alfred made landfall as an ex-tropical cyclone system, not a named cyclone, at the Gold Coast latitude. Most Gold Coast Alfred claims are lodged under standard storm and wind damage cover, not the cyclone pool. If your insurer has applied the cyclone pool exclusion to deny or reduce your Gold Coast claim, that denial should be reviewed — contact AFCA to dispute.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Alfred assessment was done by phone or desktop — is that valid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Desktop or phone assessments were common for the volume of Alfred claims. Under the ICA catastrophe claims code, if a desktop assessment results in a denial or underpayment, you have the right to request an in-person re-assessment. If that re-assessment is also disputed, you can lodge with AFCA. NRPG provides a supplementary inspection and IICRC scope of works report that can be used to challenge a desktop assessment outcome.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Alfred repairs were done by an insurer-appointed contractor and the work is substandard — what are my options?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your insurer is responsible for the quality of repairs completed by their appointed contractor. If the repairs are substandard — ongoing leaks, inadequate drying resulting in mould, structural work that doesn\'t meet the pre-loss standard — raise a formal complaint with your insurer first. If unresolved, escalate to AFCA. NRPG can provide an independent IICRC assessment of the remediation quality, which supports the complaint. Document all defects with photographs and written communication to your insurer.',
      },
    },
  ],
};

export default function GoldCoastAlfredRecoveryPage() {
  return (
    <>
      <Script
        id="gcalr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="gcalr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="gcalr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Gold Coast Location Guide"
        title="Gold Coast Ex-TC Alfred Recovery — Disputed &amp; Underpaid Claims Guide"
        subtitle="Ex-TC Alfred generated AU$1.877B in final insured losses across SE Queensland and Northern NSW. For Gold Coast property owners with stalled, disputed, or underpaid Alfred claims — IICRC documentation, ARPC pool clarification, and AFCA escalation support."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-12"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Gold Coast', href: '/guides/locations/gold-coast' },
          { label: 'Ex-TC Alfred Recovery' },
        ]}
        cta={{ text: 'Get Alfred Claim Support — Gold Coast', href: '/claim' }}
        sections={[
          {
            heading: 'Ex-TC Alfred and Gold Coast — What Happened',
            body: (
              <div className="space-y-4">
                <p>
                  Ex-Tropical Cyclone Alfred crossed the Gold Coast and Scenic Rim on 8&ndash;9 March 2025, making it the first tropical cyclone system to directly impact the SE Queensland coast in over a decade. The Gold Coast sustained severe damage across its high-density residential areas, canal estates, and hinterland communities. The ICA declared a catastrophe and 132,000+ insurance claims were lodged across SE Queensland and Northern NSW.
                </p>
                <p>
                  <strong>Canal estate flooding</strong> was widespread across Broadwater, Runaway Bay, Labrador, and Paradise Point. Low-lying canal estates experienced storm surge inundation combined with floodwater from the Nerang River and Coomera River systems. The combination of surge, floodwater, and wind-driven rain created multi-peril damage events that have been a primary source of claim disputes — insurers categorising combined-peril damage differently.
                </p>
                <p>
                  <strong>Hinterland communities</strong> — Tamborine Mountain, Beaudesert, Canungra, and the Scenic Rim — received extreme rainfall from Alfred&rsquo;s remnant low, driving landslips, flash flooding, and structural damage across rural and semi-rural properties. Hinterland claims have been disproportionately affected by delayed assessments and access difficulties.
                </p>
                <p>
                  <strong>High-rise and strata properties</strong> on the Gold Coast strip — Surfers Paradise, Broadbeach, Coolangatta — sustained significant wind damage to balconies, facades, windows, and external cladding. Strata claims under Alfred have been complex, often requiring disputes over which damage falls under the body corporate policy versus the individual lot owner&rsquo;s policy.
                </p>
                <p>
                  <strong>PERILS final insured loss</strong> for Alfred was confirmed at AU$1.877 billion on 13 April 2026 — the largest insured cyclone loss on an as-if-today basis since Cyclone Debbie in March 2017.
                </p>
              </div>
            ),
          },
          {
            heading: 'Why Gold Coast Alfred Claims Are Being Disputed',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  The Gold Coast has one of the highest Alfred claim dispute rates of any affected LGA. Several factors specific to Gold Coast property types drive this.
                </p>
                <p>
                  <strong>Storm surge vs flood vs storm water disputes:</strong> Many Gold Coast canal estate properties experienced water inundation from multiple sources simultaneously — storm surge from the Pacific, river flooding from the Nerang and Coomera systems, and rainfall-driven stormwater. Insurance policies cover these perils differently. Insurers have disputed claims on the basis of which water source caused the damage — a determination that affects whether the claim is covered, and under which section. NRPG documents the damage with IICRC methodology, providing a scope that does not rely on source attribution where the damage mechanism is the same regardless of source.
                </p>
                <p>
                  <strong>Desktop assessments and underassessment:</strong> Alfred generated an unprecedented volume of SE Queensland claims. Many Gold Coast properties were assessed via desktop review — phone calls, aerial imagery, and photographs submitted by the homeowner — rather than in-person inspections. Desktop assessments systematically underestimate concealed damage: wet insulation in wall cavities, subfloor moisture, secondary mould that wasn&rsquo;t visible in the homeowner&rsquo;s photographs. NRPG&rsquo;s supplementary IICRC inspection report provides the in-person evidence that a desktop assessment cannot.
                </p>
                <p>
                  <strong>Strata and body corporate boundary disputes:</strong> High-rise and strata owners on the Gold Coast have faced disputes over which damage falls under their individual policy versus the body corporate master policy. Balconies, windows, external facades, and common areas are common dispute points. These disputes require both individual policy review and coordination with the body corporate insurer — NRPG can document the physical scope and provide the scope of works to both parties.
                </p>
                <p>
                  <strong>Substandard insurer-appointed repairs:</strong> The volume of claims created a shortage of qualified contractors on the Gold Coast post-Alfred. Some insurer-appointed contractors completed inadequate remediation — insufficient drying leaving residual moisture, mould appearing post-completion, or structural repairs that don&rsquo;t restore pre-loss standard. If your Alfred repairs have failed, your insurer is responsible under the general insurance code. NRPG can provide an independent quality assessment report.
                </p>
              </div>
            ),
          },
          {
            heading: 'AFCA Escalation — Gold Coast Alfred Claims',
            body: (
              <div className="space-y-4">
                <p>
                  The Australian Financial Complaints Authority (AFCA) is the free external dispute resolution service for insurance claim disputes. For Gold Coast Alfred claims, AFCA escalation is the correct next step in the following scenarios.
                </p>
                <p>
                  <strong>When to escalate to AFCA:</strong> (1) Your insurer has not provided a decision on your Alfred claim within 8 weeks of lodgement without a clear reason for delay. (2) Your claim has been denied on grounds you believe are incorrect — storm surge vs flood attribution disputes, pre-existing damage claims, or exclusion clauses your policy does not contain. (3) Your settlement offer does not reflect the actual cost of restoring the property to pre-loss standard. (4) Insurer-appointed repairs were completed but are defective, and the insurer refuses to authorise rectification.
                </p>
                <p>
                  <strong>AFCA process:</strong> Lodge at afca.org.au at no cost. AFCA contacts your insurer and requests the claim file. The insurer has 45 days to respond with their position. AFCA determines the outcome if the parties cannot agree. AFCA decisions are binding on the insurer but not on you — you can accept the outcome or pursue other avenues.
                </p>
                <p>
                  <strong>NRPG documentation for AFCA:</strong> AFCA decisions on quantum disputes (how much the repair should cost) are heavily influenced by independent evidence. NRPG provides: (1) an IICRC scope of works documenting the full extent of damage; (2) psychrometric drying logs if structural drying was required; (3) post-remediation moisture readings establishing the pre-repair baseline; (4) photographic records from NRPG&rsquo;s inspection. This documentation package is designed to be submitted directly to AFCA as supporting evidence.
                </p>
                <p>
                  <strong>ICA catastrophe timeframes:</strong> Under ICA catastrophe protocols, insurers must acknowledge claims promptly, provide a decision timeframe within 12 business days, and process claims with priority. If your Gold Coast Alfred claim has been in limbo beyond these timeframes, this is itself grounds for an AFCA complaint about insurer conduct, separate from the quantum dispute.
                </p>
              </div>
            ),
          },
          {
            heading: 'Mould and Concealed Damage — The Gold Coast Alfred Underpayment Pattern',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  A significant proportion of underpaid Gold Coast Alfred claims involve concealed damage that was not identified at the initial assessment. Understanding this pattern helps Gold Coast property owners know what to look for.
                </p>
                <p>
                  <strong>Post-Alfred mould in Gold Coast properties:</strong> Gold Coast averages 27&deg;C in March with humidity consistently above 70%. Properties that experienced Alfred water ingress but were not professionally dried within 48&ndash;72 hours developed mould in wall cavities, under flooring, and in ceiling spaces — even where surfaces appeared dry externally. This is particularly common in double-brick and brick-veneer construction where moisture is trapped behind impermeable surfaces.
                </p>
                <p>
                  <strong>Wet insulation:</strong> Rooftop water ingress from Alfred frequently saturated ceiling insulation. Insurers who assessed these properties by desktop review typically did not identify wet insulation — it is not visible in photographs. Wet insulation that is not replaced holds moisture indefinitely, driving secondary mould and long-term structural damage. NRPG inspects for insulation moisture as part of the assessment scope.
                </p>
                <p>
                  <strong>Subfloor and foundation moisture:</strong> Canal estate properties with subfloor spaces on the Gold Coast are particularly susceptible to extended subfloor moisture after Alfred inundation. Subfloor moisture not captured in the original assessment leads to timber decay, mould under flooring, and pest attraction. If your original Alfred assessment did not include subfloor moisture readings, the settlement may have been calculated on incomplete data.
                </p>
                <p>
                  <strong>What to do:</strong> Commission an independent IICRC inspection if you believe your Alfred settlement was based on an incomplete assessment. NRPG&rsquo;s inspection report documents all damage including concealed damage, and can be submitted with an AFCA dispute lodgement to support a claim for additional settlement.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'My Gold Coast Alfred claim has been "under review" for months — what can I do?',
            answer:
              'Under ICA catastrophe protocols, insurers must provide a substantive update within reasonable timeframes. If your Alfred claim has been stalled for more than 8 weeks without a decision, escalate to AFCA at no cost. NRPG provides supplementary IICRC documentation — moisture readings, scope of works, drying logs — to support AFCA lodgements.',
          },
          {
            question: 'Does the ARPC Cyclone Pool apply to Gold Coast Alfred claims?',
            answer:
              'The Gold Coast (28°S) is generally south of the ARPC Cyclone Pool coverage zone. Most Gold Coast Alfred claims are under standard storm and wind damage cover. If your insurer has applied a cyclone pool exclusion to deny your Gold Coast claim, that denial should be reviewed — contact AFCA to dispute.',
          },
          {
            question: 'My Alfred assessment was done by phone or desktop — is that valid?',
            answer:
              'Desktop assessments are valid but often underestimate concealed damage. If a desktop assessment resulted in denial or underpayment, you have the right to request an in-person re-assessment. NRPG provides a supplementary IICRC inspection report that can be used to challenge a desktop assessment outcome via AFCA.',
          },
          {
            question: 'My Alfred repairs were done by an insurer-appointed contractor and the work is substandard — what are my options?',
            answer:
              'Your insurer is responsible for insurer-appointed repair quality. Raise a formal complaint with your insurer first. If unresolved, escalate to AFCA. NRPG provides an independent IICRC quality assessment report that documents substandard work as supporting evidence for the complaint.',
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
            title: 'Gold Coast Storm & Flood Restoration',
            href: '/guides/locations/gold-coast/gold-coast-storm-flooding',
            description:
              'Gold Coast storm and flood damage restoration — canal estate flooding, hinterland, and high-rise.',
          },
          {
            title: 'AFCA Insurance Dispute Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description:
              'Step-by-step guide to lodging an AFCA complaint for an underpaid or disputed insurance claim.',
          },
          {
            title: 'Brisbane Ex-TC Alfred Recovery',
            href: '/guides/locations/brisbane/brisbane-alfred-recovery',
            description:
              'Ex-TC Alfred disputed claims guide for Brisbane property owners.',
          },
        ]}
      />
    </>
  );
}
