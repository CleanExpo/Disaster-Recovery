/**
 * DR-775 / GAP-117: Affordability anxiety advocacy hook.
 *
 * YouGov Australia April 2026: 54% of Australians with home/contents
 * insurance are worried about affordability or availability of cover.
 * This page leverages that tailwind under the "Who First" stance —
 * what policyholders can do when premiums rise, claims delay, or cover
 * gets harder to get.
 *
 * ACL s18 / s29 compliant — no "guarantee" claims, no insurer naming,
 * no advice on credit or financial products. AU English. IICRC-canonical.
 *
 * NOT LEGAL ADVICE. NOT INSURANCE ADVICE.
 */

import type { Metadata } from 'next';
import Script from 'next/script';
import { ShieldCheck } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Insurance Affordability in Australia 2026 — What Policyholders Can Do | Disaster Recovery',
  description:
    '54% of Australians with home or contents insurance are worried about affordability or availability of cover (YouGov, April 2026). Practical steps for policyholders when premiums rise, claims delay, or cover gets harder to obtain.',
  keywords: [
    'insurance affordability Australia',
    'home insurance premiums 2026',
    'contents insurance affordability',
    'YouGov insurance survey 2026',
    'insurance claim delays',
    'underinsured Australia',
    'AFCA insurance complaint',
    'IICRC certified contractor',
    'who first disaster recovery',
  ],
  alternates: {
    canonical: `${NAP.url}/guides/insurance/affordability-anxiety-2026`,
  },
  openGraph: {
    title: 'Insurance Affordability in Australia 2026 — What Policyholders Can Do',
    description:
      'YouGov April 2026: 54% of insured Australians worried about cover affordability. Here is what you can do — practical, sourced, no spin.',
    url: `${NAP.url}/guides/insurance/affordability-anxiety-2026`,
    type: 'article',
  },
};

export default function AffordabilityAnxiety2026Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why are home and contents insurance premiums rising in Australia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Premium increases since 2023 reflect a combination of higher reinsurance costs, more frequent and severe natural-hazard events (cyclones, floods, bushfires), construction-cost inflation, and post-event repair backlogs. The Australian Prudential Regulation Authority (APRA) and the Insurance Council of Australia (ICA) publish regular sector updates on these drivers.',
        },
      },
      {
        '@type': 'Question',
        name: 'What can I do if I cannot afford to wait on my insurer to settle a claim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Three practical steps: request emergency make-safe authorisation in writing from your insurer (most policies provide for it); engage an independent IICRC-certified contractor to document the full damage scope; and lodge an internal dispute with your insurer if the response is inadequate. If unresolved within 30 days, you can escalate to AFCA at no cost.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is being underinsured common in Australia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Multiple ICA and Quantum Market Research surveys have estimated underinsurance rates in Australian residential building insurance at between 60% and 80%. The most common driver is sum-insured values that have not kept pace with construction-cost inflation since 2020.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Disaster Recovery provide insurance advice?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Disaster Recovery is a network of IICRC-certified restoration contractors. We do not provide insurance advice, financial advice, or credit advice. For policy-specific questions, contact your insurer or a licensed insurance broker. For disputes, contact AFCA or a legal practitioner.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the "Who First" stance on affordability?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '"Who First" means policyholder-first scope of works. When premiums and excesses are stretching households, the last thing you need is an under-scoped repair that misses damage. An independent IICRC-certified scope documents your loss in full, to current industry standard (S500:2025 for water, S700:2025 for fire and smoke), regardless of any insurer-authorised budget.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="affordability-anxiety-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance Claims"
        title="Insurance Affordability in Australia 2026"
        subtitle="54% of insured Australians are worried about affordability or availability of cover. Here is what you can do when premiums rise, claims delay, or cover gets harder to get."
        gradient="linear-gradient(135deg, #0F2942 0%, #1B4F72 100%)"
        icon={<ShieldCheck className="h-10 w-10" />}
        lastReviewed="2026-04-25"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance Claims', href: '/guides/insurance' },
          { label: 'Affordability in Australia 2026' },
        ]}
        cta={{ text: 'Get an Independent IICRC Assessment', href: '/claim' }}
        sections={[
          {
            heading: 'The number that drives this page',
            body: (
              <>
                <p>
                  YouGov Australia, April 2026:{' '}
                  <strong>
                    54% of Australians with home or contents insurance are worried about the
                    affordability or availability of cover.
                  </strong>
                </p>
                <p style={{ marginTop: '1rem' }}>
                  That is more than half of every household with a policy. It is not noise — it is a
                  structural shift driven by rising premiums, higher excesses, more frequent
                  natural-hazard events, and construction-cost inflation that has outpaced wage
                  growth since 2020.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  This page is for the people behind that 54%. If you are stretching to keep cover
                  in place, or worried about what happens if you actually need to claim, the
                  practical steps below are written for you. None of this is legal advice, and none
                  of this is financial advice. It is what we see, every week, in the restoration
                  network.
                </p>
                <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#6B7280' }}>
                  Source: YouGov Australia, April 2026 home and contents insurance affordability
                  survey. ICA and APRA publish regular sector commentary on premium drivers.
                </p>
              </>
            ),
          },
          {
            heading: 'Why premiums are rising — the short version',
            background: 'light',
            body: (
              <>
                <p>
                  Insurers price cover against expected claim cost. Four drivers have pushed that
                  expected cost higher since 2022:
                </p>
                <ol style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Reinsurance.</strong> Global reinsurers, who carry the tail of the risk,
                    raised rates sharply after the 2022 floods, the 2023 bushfire season, and
                    Ex-Cyclone Alfred (2025) and Cyclone Maila (2026).
                  </li>
                  <li>
                    <strong>Event frequency.</strong> ICA significant-event declarations are running
                    materially above the long-run average. More events means more claims in the same
                    year.
                  </li>
                  <li>
                    <strong>Construction-cost inflation.</strong> Replacement-cost building
                    materials and labour have risen faster than CPI for four consecutive years. The
                    same loss in 2026 costs more to repair than it did in 2022.
                  </li>
                  <li>
                    <strong>Catastrophe pooling.</strong> The Cyclone Reinsurance Pool (active since
                    July 2022) reduces premiums in cyclone-exposed regions but does not eliminate
                    the underlying cost.
                  </li>
                </ol>
                <p style={{ marginTop: '1rem' }}>
                  None of this is the policyholder&apos;s fault. But it is the environment every
                  household has to manage.
                </p>
              </>
            ),
          },
          {
            heading: 'What you can do BEFORE a loss',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Re-check your sum insured against current rebuild costs.</strong>{' '}
                    Underinsurance estimates from ICA and Quantum Market Research have run between
                    60% and 80% of Australian residential policies. Most insurers publish a rebuild
                    calculator; use it.
                  </li>
                  <li>
                    <strong>Read your PDS for managed-repair clauses.</strong> Know whether your
                    policy gives you the right to nominate your own contractor, or whether the
                    insurer has authority to assign a builder from their panel.
                  </li>
                  <li>
                    <strong>Photograph your contents annually.</strong> Sum-insured contents claims
                    routinely under-pay because the policyholder cannot evidence what was lost.
                  </li>
                  <li>
                    <strong>Keep proof of major upgrades.</strong> Receipts for kitchens, bathrooms,
                    flooring. Without them, settled claims default to base specification.
                  </li>
                  <li>
                    <strong>Compare cover, not just premium.</strong> The cheapest premium with a
                    $5,000 excess and a 70% sum insured is often more expensive at claim time than
                    the slightly higher premium with proper sum insured and a $1,000 excess.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'What you can do AFTER a loss',
            background: 'light',
            body: (
              <>
                <p>
                  This is the moment where the affordability anxiety bites hardest. Premiums and
                  excesses have already gone up; the property is now damaged; and the insurer may be
                  slow, under-scoping the loss, or pushing you onto a managed-repair panel.
                </p>
                <ol style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Request emergency make-safe authorisation in writing.</strong> Most home
                    and contents policies include emergency make-safe cover. Email the insurer; do
                    not rely on a phone confirmation alone.
                  </li>
                  <li>
                    <strong>Get an independent IICRC-certified scope of works.</strong> Documents
                    your full loss to the current industry standard — IICRC S500:2025 for water,
                    S700:2025 for fire and smoke, S520:2025 for mould. This is your most important
                    piece of evidence if anything is later disputed.
                  </li>
                  <li>
                    <strong>
                      Compare scope against any insurer-authorised scope line by line.
                    </strong>{' '}
                    Items that appear in the independent scope but not the insurer&apos;s scope are
                    the items to dispute.
                  </li>
                  <li>
                    <strong>Lodge an internal dispute (IDR) in writing.</strong> All Australian
                    insurers must operate a free internal dispute resolution process. Attach the
                    independent scope.
                  </li>
                  <li>
                    <strong>Escalate to AFCA at no cost if unresolved within 30 days.</strong> The
                    Australian Financial Complaints Authority accepts complaints from policyholders
                    without charge. The complaint must generally be lodged within two years of the
                    insurer&apos;s decision.
                  </li>
                </ol>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4B5563' }}>
                  Related reading:{' '}
                  <Link href="/guides/insurance/human-advocate-vs-insurer-assigned-builder">
                    Your Advocate vs Your Insurer&apos;s Builder
                  </Link>
                  ,{' '}
                  <Link href="/guides/insurance/should-i-take-a-payout">
                    Should I Take a Payout?
                  </Link>
                  .
                </p>
              </>
            ),
          },
          {
            heading: '"Who First" — what it means when affordability is the story',
            body: (
              <>
                <p>
                  Disaster Recovery is a network of IICRC-certified independent contractors. We are
                  not on any insurer panel and we are not a managed-repair program. Your contractor
                  works to your brief and bills you directly.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  When premiums are stretching households, an under-scoped repair is more expensive
                  — not less — because the rework, the moisture-related secondary damage, or the
                  mould remediation comes back six months later out of pocket. An independent scope
                  of works documented to the current IICRC standard is the cheapest insurance
                  against that outcome.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  &ldquo;Who First&rdquo; means policyholder-first scope. It is a stance, not a
                  guarantee. It is the difference between a budget-fit repair and a damage-fit
                  repair.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Link
                    href="/claim"
                    style={{
                      display: 'inline-block',
                      padding: '0.875rem 2rem',
                      background: '#1D4ED8',
                      color: 'white',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Start an Independent IICRC Assessment
                  </Link>
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#6B7280' }}>
                  This page is general information about the Australian insurance environment in
                  2026. It is not legal advice and it is not insurance advice. For policy-specific
                  questions, contact your insurer or a licensed broker. For disputes, contact AFCA
                  or a legal practitioner.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Why are home and contents insurance premiums rising in Australia?',
            answer:
              'Premium increases since 2023 reflect higher reinsurance costs, more frequent and severe natural-hazard events, construction-cost inflation, and post-event repair backlogs. APRA and ICA publish regular sector updates on these drivers.',
          },
          {
            question: 'What can I do if I cannot afford to wait on my insurer to settle a claim?',
            answer:
              'Three practical steps: request emergency make-safe authorisation in writing from your insurer; engage an independent IICRC-certified contractor to document the full damage scope; and lodge an internal dispute with your insurer if the response is inadequate. If unresolved within 30 days, you can escalate to AFCA at no cost.',
          },
          {
            question: 'Is being underinsured common in Australia?',
            answer:
              'Yes. ICA and Quantum Market Research surveys have estimated underinsurance rates in Australian residential building insurance at between 60% and 80%. The most common driver is sum-insured values that have not kept pace with construction-cost inflation since 2020.',
          },
          {
            question: 'Does Disaster Recovery provide insurance advice?',
            answer:
              'No. Disaster Recovery is a network of IICRC-certified restoration contractors. We do not provide insurance advice, financial advice, or credit advice. For policy-specific questions, contact your insurer or a licensed broker. For disputes, contact AFCA or a legal practitioner.',
          },
          {
            question: 'What is the "Who First" stance on affordability?',
            answer:
              '"Who First" means policyholder-first scope of works. When premiums and excesses are stretching households, the last thing you need is an under-scoped repair that misses damage. An independent IICRC-certified scope documents your loss in full, to current industry standard (S500:2025 for water, S700:2025 for fire and smoke), regardless of any insurer-authorised budget.',
          },
        ]}
        relatedGuides={[
          {
            title: "Your Advocate vs Your Insurer's Builder",
            href: '/guides/insurance/human-advocate-vs-insurer-assigned-builder',
          },
          {
            title: 'Should I Take a Payout?',
            href: '/guides/insurance/should-i-take-a-payout',
          },
          {
            title: 'Who We Are Not — The Disaster Recovery Difference',
            href: '/about/who-we-are-not',
          },
          {
            title: 'How to Make an Insurance Claim in Australia',
            href: '/guides/how-to-make-an-insurance-claim-australia',
          },
        ]}
      />
    </>
  );
}
