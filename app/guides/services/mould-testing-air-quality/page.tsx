import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Mould Testing and Air Quality Assessment — What IICRC Certified Contractors Do',
  description: 'What professional mould testing involves, the types of sampling used, what lab analysis reveals, and when post-remediation clearance testing is required — explained by IICRC S520 standards.',
  keywords: 'mould testing, air quality assessment, mould air sampling, mould swab test, post remediation clearance, IICRC S520, mould spore count, mould testing cost Australia',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/services/mould-testing-air-quality' },
};

export default function MouldTestingAirQualityPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does a professional mould test involve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A professional mould test involves a visual inspection of the property for visible mould growth, moisture sources, and conditions that support mould; air spore sampling using cassette-based spore traps that capture airborne spores for laboratory analysis; surface swab or tape lift sampling of visible mould colonies for species identification; laboratory analysis by an accredited mycology lab to identify species and quantify spore concentrations; and a clearance certificate once remediation is confirmed complete to the IICRC S520 standard.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does mould testing cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A basic air spore test (two cassettes — indoor and outdoor control — plus lab analysis) typically costs $200–$500. A comprehensive assessment including surface swabs, multiple air samples, full lab analysis, written report, and post-remediation clearance testing typically costs $500–$1,500 depending on the property size and number of affected areas. Post-remediation clearance testing by an independent third-party assessor is recommended and adds to the cost but is required by most insurers for claim sign-off.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need post-remediation clearance testing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, for any significant mould remediation. Post-remediation clearance testing confirms that the remediation was effective — that spore concentrations have returned to or below outdoor baseline levels and that no new mould growth is present. The IICRC S520 standard requires clearance testing as the final step of the remediation process. Most insurers require clearance certification for claim sign-off. Independent third-party testing — by a different assessor than the one who performed the remediation — is preferred to avoid conflicts of interest.',
        },
      },
      {
        '@type': 'Question',
        name: 'What spore levels are considered safe in Australia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Australia does not have an official national standard for indoor spore levels. The IICRC S520 standard uses outdoor control samples as the reference point — indoor spore counts should not significantly exceed outdoor baseline, and the species profile indoors should be broadly consistent with outdoor air. Elevated concentrations of water-damage indicator species (Stachybotrys, Chaetomium) indoors are significant even at low counts, as these species are rarely present in outdoor air.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="mtaq-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Restoration Services"
        title="Mould Testing and Air Quality Assessment — What IICRC Certified Contractors Do"
        subtitle="Types of mould testing, what lab analysis reveals, post-remediation clearance requirements, and when to test versus when to simply remediate."
        gradient="linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Services', href: '/guides/services' },
          { label: 'Mould Testing and Air Quality' },
        ]}
        cta={{ text: 'Get Mould Assessment', href: '/claim' }}
        lastReviewed="2026-04-09"
        sections={[
          {
            heading: 'Types of Mould Testing',
            body: (
              <div className="space-y-4">
                <p>
                  Professional mould assessment uses multiple testing methods, selected based on the purpose of the assessment — initial scoping, species identification, or post-remediation clearance. Each method provides different information:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Visual inspection</strong> — The foundation of any mould assessment. A trained inspector examines the property for visible mould growth, water staining, moisture intrusion points, condensation, and building conditions that support mould (high humidity, poor ventilation, leaks). Visual inspection guides where sampling is most useful.
                  </li>
                  <li>
                    <strong>Tape lift and surface swab sampling</strong> — Tape lifts collect a sample of surface growth for microscopic analysis. Swabs collect material from within mould colonies for culture and species identification. These methods identify what species are growing on a particular surface and confirm whether a stain is mould or another substance.
                  </li>
                  <li>
                    <strong>Bulk sampling</strong> — A small section of affected material (plasterboard, timber, carpet) is removed and sent to the lab for analysis. Used when surface sampling is insufficient to characterise the growth, or when material condition needs to be assessed for disposal versus retention decisions.
                  </li>
                  <li>
                    <strong>Air cassette sampling (spore trap)</strong> — A calibrated pump draws a known volume of air through a cassette containing a sticky surface that captures airborne spores. The cassette is analysed by a mycology laboratory to identify and count spore types per cubic metre of air. This method measures the airborne spore load — the primary exposure risk — and is the standard method for clearance testing.
                  </li>
                  <li>
                    <strong>ERMI (Environmental Relative Mouldiness Index)</strong> — A DNA-based dust sampling method that sequences mould species from settled dust. ERMI is used in some research and high-sensitivity assessments but is not standard in Australian remediation practice and is not required by IICRC S520.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'What Lab Analysis Reveals',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Laboratory analysis of mould samples provides two key pieces of information: species identification and concentration. Both matter for assessing health risk and remediation scope.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Species identification</strong> — Not all mould species carry the same health risk or indicate the same cause. Water-damage indicator species — Stachybotrys chartarum (&ldquo;black mould&rdquo;), Chaetomium, and Ulocladium — require prolonged wet conditions to establish and are rarely present in outdoor air. Their presence indoors strongly indicates a water damage event. Common environmental species — Cladosporium, Penicillium, Aspergillus — are ubiquitous and their presence must be interpreted in context of their concentration relative to outdoor levels.
                  </li>
                  <li>
                    <strong>Spore concentration per m&sup3;</strong> — Air sample results are expressed as spores per cubic metre (spores/m&sup3;). Concentration alone is not sufficient for interpretation — the species composition and the outdoor control sample are essential context. Indoor Stachybotrys at 50 spores/m&sup3; is more significant than indoor Cladosporium at 5,000 spores/m&sup3; if outdoor Cladosporium is 4,500 spores/m&sup3;.
                  </li>
                  <li>
                    <strong>Comparison to outdoor control sample</strong> — Every professional air assessment should include an outdoor control sample taken at the same time as indoor samples. This establishes the baseline for the specific location and day, accounting for seasonal variation, regional climate, and proximity to vegetation. Indoor results are interpreted relative to this baseline.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'Post-Remediation Clearance Testing',
            body: (
              <div className="space-y-4">
                <p>
                  Post-remediation clearance testing is the confirmation step that proves remediation was effective. It is not optional for any significant remediation project.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Independent third-party requirement</strong> — Clearance testing should be performed by an assessor who was not involved in the remediation work. This independence prevents conflicts of interest — a contractor cannot reliably certify the quality of their own work. Insurers increasingly require third-party clearance certification.
                  </li>
                  <li>
                    <strong>Outdoor control comparison</strong> — Clearance testing uses the same air cassette method as initial assessment, always including an outdoor control sample taken on the same day. Indoor spore concentrations are assessed relative to that day&rsquo;s outdoor baseline.
                  </li>
                  <li>
                    <strong>IICRC S520 clearance criteria</strong> — The IICRC S520 standard requires that after remediation, the property shows no visible mould, no mould odour, and indoor spore concentrations that do not significantly exceed outdoor baseline. Water-damage indicator species should be absent or at trace levels. The assessor issues a written clearance certificate confirming these criteria are met.
                  </li>
                  <li>
                    <strong>Failed clearance</strong> — If clearance testing reveals elevated spore concentrations or visible growth, the remediation scope must be reviewed and additional work undertaken before re-testing. A failed clearance is not unusual — it simply means the initial scope did not capture all affected materials, and further investigation is required.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'When to Test vs When to Just Remediate',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  A common question is whether testing is necessary before remediation, or whether visible mould is sufficient to proceed directly to removal. The answer depends on the purpose of the assessment.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Obvious visible mould over 0.1m&sup2;</strong> — The IICRC S520 standard considers any mould growth exceeding 0.1m&sup2; as requiring professional remediation regardless of species. If visible growth of this scale is present, remediation should begin without waiting for testing results. Testing before remediation helps scope the work but does not change the outcome — remediation is required.
                  </li>
                  <li>
                    <strong>Testing before remediation to scope the work</strong> — Pre-remediation testing is useful when the extent of contamination is unclear, when hidden mould is suspected behind walls or under floors, or when the client or insurer requires documented pre-remediation conditions. Air sampling can detect elevated spore concentrations even when visible growth has not yet appeared.
                  </li>
                  <li>
                    <strong>Testing after remediation is required</strong> — Post-remediation clearance testing is not optional for any professionally conducted remediation. It provides the documented evidence that work was completed to the IICRC S520 standard — required by insurers, landlords, and property purchasers. Skipping clearance testing leaves the property owner without proof that the remediation was effective.
                  </li>
                  <li>
                    <strong>Testing for health concerns without visible mould</strong> — When occupants report health symptoms consistent with mould exposure but no visible growth is present, air sampling can confirm or rule out elevated spore concentrations. This scenario often reveals hidden mould within wall cavities, under flooring, or in HVAC systems.
                  </li>
                </ul>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What does a professional mould test involve?',
            answer: 'A professional mould test involves a visual inspection of the property for visible mould growth, moisture sources, and conditions that support mould; air spore sampling using cassette-based spore traps that capture airborne spores for laboratory analysis; surface swab or tape lift sampling of visible mould colonies for species identification; laboratory analysis by an accredited mycology lab to identify species and quantify spore concentrations; and a clearance certificate once remediation is confirmed complete to the IICRC S520 standard.',
          },
          {
            question: 'How much does mould testing cost?',
            answer: 'A basic air spore test (two cassettes — indoor and outdoor control — plus lab analysis) typically costs $200–$500. A comprehensive assessment including surface swabs, multiple air samples, full lab analysis, written report, and post-remediation clearance testing typically costs $500–$1,500 depending on the property size and number of affected areas. Post-remediation clearance testing by an independent third-party assessor is recommended and adds to the cost but is required by most insurers for claim sign-off.',
          },
          {
            question: 'Do I need post-remediation clearance testing?',
            answer: 'Yes, for any significant mould remediation. Post-remediation clearance testing confirms that the remediation was effective — that spore concentrations have returned to or below outdoor baseline levels and that no new mould growth is present. The IICRC S520 standard requires clearance testing as the final step of the remediation process. Most insurers require clearance certification for claim sign-off. Independent third-party testing — by a different assessor than the one who performed the remediation — is preferred to avoid conflicts of interest.',
          },
          {
            question: 'What spore levels are considered safe in Australia?',
            answer: 'Australia does not have an official national standard for indoor spore levels. The IICRC S520 standard uses outdoor control samples as the reference point — indoor spore counts should not significantly exceed outdoor baseline, and the species profile indoors should be broadly consistent with outdoor air. Elevated concentrations of water-damage indicator species (Stachybotrys, Chaetomium) indoors are significant even at low counts, as these species are rarely present in outdoor air.',
          },
        ]}
        relatedGuides={[
          {
            title: 'IICRC S520 Mould Standard',
            href: '/guides/mould/iicrc-s520-mould-remediation-standard',
            description: 'What the IICRC S520 standard requires of certified mould remediation contractors.',
          },
          {
            title: 'Mould Insurance Coverage',
            href: '/guides/insurance/mould-insurance-coverage',
            description: 'When mould is covered by home insurance in Australia and what documentation is required.',
          },
          {
            title: 'Mould Remediation Cost',
            href: '/guides/cost-guides/how-much-mould-remediation-cost',
            description: 'What professional mould remediation costs in Australia — transparent pricing explained.',
          },
        ]}
      />
    </>
  );
}
