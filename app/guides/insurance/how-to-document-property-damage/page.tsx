import { Metadata } from 'next';
import Script from 'next/script';
import { FileText } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'How to Document Property Damage for Insurance Claims in Australia',
  description:
    'A comprehensive guide to documenting all types of property damage — fire, storm, flood, hail, wind and contents — for insurance claims in Australia. Factual procedural advice aligned with the General Insurance Code of Practice and AFCA timeframes.',
  keywords:
    'how to document property damage, property damage insurance claim Australia, fire damage documentation, storm damage insurance, flood damage claim, hail damage documentation, AFCA insurance claim',
  alternates: {
    canonical:
      'https://disasterrecovery.com.au/guides/insurance/how-to-document-property-damage',
  },
};

export default function HowToDocumentPropertyDamagePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the most important thing to document immediately after property damage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Timestamped photographs and video of every affected area before any cleaning or repair work begins. Use your phone with the date and time stamp enabled, take wide-angle shots showing full rooms and close-ups of specific damage, and back up everything to cloud storage immediately. The pre-repair condition of your property is the evidence your insurer needs \u2014 once repairs start, that evidence is gone.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to wait for insurer approval before making emergency repairs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Your policy and the General Insurance Code of Practice both expect you to take reasonable steps to prevent further damage. Emergency make-safe work \u2014 tarping a damaged roof, boarding a broken window, extracting standing water \u2014 should begin promptly. Document the damage thoroughly before make-safe work begins, then photograph the make-safe measures you have taken. Keep all receipts for emergency works.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I document damage to expensive items I no longer have receipts for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bank and credit card statements, warranty registrations, email order confirmations, and photos from before the event (including social media, family photos, or previous insurance documentation) all support claimed values. For high-value items such as jewellery, artwork or collectibles, a pre-loss appraisal or valuation (if one exists) is the strongest evidence. Without documentation, your insurer will typically use market value at time of loss.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I have to lodge an insurance claim in Australia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Policies vary, but most require you to notify your insurer as soon as reasonably possible after the event. Delays in notification can complicate your claim if the insurer argues they were prejudiced by the late notice. Lodge promptly. If your claim is denied and you wish to take it to AFCA, you generally have two years from the date of the insurer\u2019s final decision to make a complaint.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is AFCA and how does it help with property damage disputes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Australian Financial Complaints Authority (AFCA) is the external dispute resolution scheme for financial services complaints in Australia, including insurance disputes. It is free to use for consumers. If you are unable to resolve a dispute with your insurer through their internal complaints process, you can lodge a complaint with AFCA. AFCA can require your insurer to review its decision, and its determinations are binding on insurers.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="docprop-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
      category="Insurance"
      title="How to Document Property Damage for Insurance Claims"
      subtitle="A complete guide for Australian homeowners and tenants covering"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<FileText className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'How to Document Property Damage' },
      ]}
      sections={[
        {
          heading: 'Why Thorough Documentation is the Foundation of Every Claim',
          body: (
            <>
              <p>
                Whether your property has been affected by fire, storm, flood, hail, wind or
                an impact event, the quality of your documentation is the single biggest
                factor within your control that determines how smoothly your insurance claim
                is processed. Insurers and their appointed assessors rely on the evidence you
                provide to establish what was damaged, when the damage occurred, and what the
                pre-loss condition of your property was.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The General Insurance Code of Practice sets minimum standards that all
                Australian general insurers must meet, including the obligation to handle
                claims honestly, fairly and transparently. However, meeting those obligations
                requires your insurer to have complete and accurate information. Gaps in your
                documentation create opportunities for delays, requests for further
                information, or disputes about the extent of the loss.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This guide covers documentation principles that apply across all major damage
                types. For water-damage-specific documentation, see our dedicated guide on
                documenting water damage for insurance claims.
              </p>
            </>
          ),
        },
        {
          heading: 'Documenting Fire and Smoke Damage',
          body: (
            <>
              <p>
                Fire damage documentation presents particular challenges because the scene
                changes rapidly — emergency services activities, demolition of unstable
                structures, and weather exposure all alter the evidence. Prioritise
                documentation immediately after the property is declared safe to enter.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Photograph the origin area first:</strong> If the fire origin is
                  identifiable (kitchen, electrical panel, roof void), photograph that area in
                  detail before it is disturbed. The origin and cause are central to the
                  insurer&apos;s assessment of whether the loss is covered under your policy.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Capture smoke and soot damage separately:</strong> Smoke and soot
                  damage can extend well beyond the area of flame contact, affecting walls,
                  ceilings, HVAC systems, and soft furnishings throughout the property.
                  Photograph each affected room individually, including ceiling corners and
                  air vents.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Inventory all damaged and destroyed contents:</strong> For items
                  that were destroyed or rendered unusable, create a written list with as much
                  detail as possible: brand, model, approximate age, and purchase price if
                  known. Photograph any items that are still identifiable. Check for
                  warranties, receipts, or bank statements that confirm purchases.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Record structural damage:</strong> Photograph compromised roof
                  members, burnt-out wall frames, collapsed ceilings, and any structural
                  elements that have failed or are at risk. Wide shots showing the full
                  extent of structural involvement are as important as close-up detail shots.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Obtain the fire brigade report:</strong> Contact your local fire
                  and rescue service to request a copy of the incident report. This report
                  records the date, time, and fire brigade&apos;s assessment of the fire
                  origin and cause — information your insurer will request as part of the
                  claim.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Do not dispose of any damaged items, even if they appear to have no value,
                until your insurer has either inspected them or confirmed in writing that
                disposal is approved. Premature disposal can result in disputes over
                contents values.
              </p>
            </>
          ),
        },
        {
          heading: 'Documenting Storm, Hail, Wind and Impact Damage',
          body: (
            <>
              <p>
                Storm damage claims — including hail, wind, falling trees and wind-driven
                rain — are among the most common property insurance claims in Australia. The
                Insurance Council of Australia (ICA) coordinates industry responses to
                declared catastrophe events, which can affect claim timeframes. Good
                documentation helps your claim move efficiently even in high-volume periods.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Document the weather event independently:</strong> Obtain a
                  weather bureau (Bureau of Meteorology) confirmation of the storm event —
                  date, time, location, and recorded conditions such as wind speed or
                  hailstone size. Insurers use this to verify that a qualifying weather event
                  occurred. Screenshots from the BOM website with date and time visible are
                  acceptable supporting evidence.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Photograph roof damage safely from the ground:</strong> Do not
                  access a damaged roof. Use a zoom lens or, if safe, photograph from an
                  upstairs window. Show missing tiles, lifted metal sheeting, damaged
                  flashings, guttering displacement, and any visible penetrations. If you
                  engage a contractor, ensure they photograph the roof in detail before
                  making repairs.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Capture hail impact patterns:</strong> Hail damage on vehicles,
                  guttering, air conditioning units, solar panels, and roofing materials
                  often shows a distinctive impact pattern. Photograph individual impacts
                  with a close-up that clearly shows the dent depth and surface texture.
                  Include a ruler for scale.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Document fallen trees and impact zones:</strong> If a tree has
                  fallen on the structure, photograph the full length of the tree, the root
                  zone (to show whether it was diseased or structurally compromised prior),
                  the point of impact, and all resulting structural damage. Do not remove
                  the tree until the insurer&apos;s assessor has attended or given approval
                  — tree removal is a separate cost category in most claims.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Internal water ingress from the event:</strong> Storm events
                  frequently cause internal water damage through penetrations in the building
                  envelope. Document internal water staining, saturated materials, and
                  ceiling damage with the same thoroughness as you would for a plumbing leak
                  — photos, extent mapping, and evidence linking the water ingress to the
                  external storm damage.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Documenting Flood and Inundation Damage',
          body: (
            <>
              <p>
                Flood damage documentation is particularly time-sensitive. Rising and
                receding water levels alter the evidence quickly, and access to the property
                may be restricted during and immediately after a flood event. Document as
                early as safe access permits.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Mark and measure water lines immediately:</strong> The high-water
                  mark on walls is critical evidence of flood height and extent. Photograph
                  water lines on every wall in every room with a tape measure held vertically
                  from floor level. If the line is fading, mark it with painter&apos;s tape
                  before it disappears.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Distinguish storm surge, flash flood and riverine flood:</strong>{' '}
                  Your policy may treat different flood types differently. Document the
                  source of inundation — was water entering from outside the property at
                  ground level, rising through drainage, or coming from a watercourse? This
                  distinction matters for coverage determination under many home insurance
                  policies.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Photograph contaminated materials:</strong> Floodwater frequently
                  carries sewage, chemicals and debris. Photograph contamination evidence —
                  sediment deposits, debris lines, discolouration — as this affects the
                  remediation scope and the insurer&apos;s assessment of whether materials
                  can be cleaned or must be replaced.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Retain samples if instructed:</strong> In some flood events,
                  insurers or their assessors may request soil or water samples to assess
                  contamination levels. Do not wash or clean affected areas until the
                  insurer has had the opportunity to inspect or has confirmed approval to
                  proceed.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Under the General Insurance Code of Practice, insurers must keep you
                informed of the progress of your claim. If your property is uninhabitable,
                your insurer has obligations regarding alternative accommodation — check your
                policy for &apos;temporary accommodation&apos; or &apos;additional living
                expenses&apos; cover.
              </p>
            </>
          ),
        },
        {
          heading: 'Creating Your Contents Inventory and Managing the Claim Process',
          body: (
            <>
              <p>
                A thorough contents inventory is required for virtually every significant
                property damage claim. The more detail you can provide, the less room there
                is for dispute about the value of your loss. Start building your inventory
                immediately, even if it is incomplete — you can add to it as you locate or
                recall items.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Use a spreadsheet or your insurer&apos;s contents form:</strong>{' '}
                  List each item with: description, brand and model, approximate age, purchase
                  price if known, and current damage status (destroyed, damaged, salvageable).
                  Group items by room for ease of assessment.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Support values with evidence:</strong> Bank statements, email
                  receipts, warranty cards, credit card statements, and photos of items
                  taken before the event (from social media, family photos or previous
                  insurance documentation) all support your claimed values. Gather whatever
                  is available.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Understand indemnity versus replacement:</strong> Contents
                  policies in Australia are typically either &apos;agreed value&apos;,
                  &apos;replacement&apos;, or &apos;indemnity&apos; (market value at time
                  of loss, accounting for depreciation). Know which type of cover you hold
                  before the assessor visit — this affects how your claim is settled.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Lodge promptly and follow AFCA timeframes:</strong> Lodge your
                  claim as soon as possible. Under the General Insurance Code of Practice,
                  your insurer must acknowledge your claim promptly and keep you informed of
                  its progress. If your claim is denied or you are unsatisfied with the
                  outcome, you may escalate to the Australian Financial Complaints Authority
                  (AFCA) — the external dispute resolution scheme for insurance complaints —
                  within two years of receiving the insurer&apos;s final decision letter.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Do not accept a settlement under duress:</strong> If the insurer
                  offers a settlement amount that you believe is inadequate, you are entitled
                  to request a review, obtain your own repair quotes, and if necessary, take
                  the matter to AFCA. You do not have to accept the first offer.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                The Disaster Recovery platform connects you with IICRC-certified restoration
                contractors who produce professional documentation — scope of works, moisture
                mapping, progress reports and completion reports — that supports your claim
                from the initial assessment through to finalisation.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is the most important thing to document immediately after property damage?',
          answer:
            'Timestamped photographs and video of every affected area before any cleaning or repair work begins. Use your phone with the date and time stamp enabled, take wide-angle shots showing full rooms and close-ups of specific damage, and back up everything to cloud storage immediately. The pre-repair condition of your property is the evidence your insurer needs — once repairs start, that evidence is gone.',
        },
        {
          question: 'Do I need to wait for insurer approval before making emergency repairs?',
          answer:
            'No. Your policy and the General Insurance Code of Practice both expect you to take reasonable steps to prevent further damage. Emergency make-safe work — tarping a damaged roof, boarding a broken window, extracting standing water — should begin promptly. Document the damage thoroughly before make-safe work begins, then photograph the make-safe measures you have taken. Keep all receipts for emergency works.',
        },
        {
          question: 'How do I document damage to expensive items I no longer have receipts for?',
          answer:
            'Bank and credit card statements, warranty registrations, email order confirmations, and photos from before the event (including social media, family photos, or previous insurance documentation) all support claimed values. For high-value items such as jewellery, artwork or collectibles, a pre-loss appraisal or valuation (if one exists) is the strongest evidence. Without documentation, your insurer will typically use market value at time of loss.',
        },
        {
          question: 'How long do I have to lodge an insurance claim in Australia?',
          answer:
            'Policies vary, but most require you to notify your insurer as soon as reasonably possible after the event. Delays in notification can complicate your claim if the insurer argues they were prejudiced by the late notice. Lodge promptly. If your claim is denied and you wish to take it to AFCA, you generally have two years from the date of the insurer&apos;s final decision to make a complaint.',
        },
        {
          question: 'What is AFCA and how does it help with property damage disputes?',
          answer:
            'The Australian Financial Complaints Authority (AFCA) is the external dispute resolution scheme for financial services complaints in Australia, including insurance disputes. It is free to use for consumers. If you are unable to resolve a dispute with your insurer through their internal complaints process, you can lodge a complaint with AFCA. AFCA can require your insurer to review its decision, and its determinations are binding on insurers.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Documenting Water Damage for Insurance Claims',
          href: '/guides/insurance/document-water-damage-insurance',
          description:
            'In-depth guide on photographing, mapping and reporting water damage specifically for insurance claim purposes.',
        },
        {
          title: 'The Real Cost of Insurance Delays',
          href: '/guides/insurance/real-cost-insurance-delays',
          description:
            'Why waiting for insurer approval before beginning make-safe works can increase both damage and claim costs.',
        },
        {
          title: 'Submit a Claim',
          href: '/claim',
          description:
            'Get matched with an IICRC-certified restoration contractor in your area now.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
    </>
  );
}
