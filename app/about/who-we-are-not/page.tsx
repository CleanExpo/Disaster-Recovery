/**
 * BUILD-004 (SAFE version): Who We Are Not
 *
 * Counter-positioning brand page. "Who First" stance — describes the
 * MODEL we run (network orchestrator, IICRC-certified independents,
 * policyholder-first scope) and the model we do NOT run (insurer-
 * directed managed repair, scope to budget rather than to damage).
 *
 * ACL s18 / s29 compliant — no unverified statistics, no "guarantee"
 * language, no named competitor claims, no enforcement-action citations.
 * The aggressive variant (with named-competitor enforcement citations
 * and statutory penalty references) gates on DR-535 / GAP-061 legal
 * review and ships separately if cleared.
 *
 * Linked tickets: DR-599, DR-535, GAP-061.
 */

import type { Metadata } from 'next';
import Script from 'next/script';
import { Compass } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Who We Are Not — The Disaster Recovery Difference | Disaster Recovery',
  description:
    'Disaster Recovery is a network of IICRC-certified independent contractors. We are not an insurer-directed managed repair program. Understand the difference before your claim is closed.',
  keywords: [
    'who first disaster recovery',
    'independent restoration contractor Australia',
    'IICRC-certified contractor',
    'insurer managed repair',
    'policyholder choice',
    'restoration network',
    'AFCA',
    'IICRC S500:2025',
    'IICRC S700:2025',
  ],
  alternates: {
    canonical: `${NAP.url}/about/who-we-are-not`,
  },
  openGraph: {
    title: 'Who We Are Not — The Disaster Recovery Difference',
    description:
      'A network of IICRC-certified independents. Not an insurer panel. Not a managed repair program. Here is what that distinction means for your property after a loss.',
    url: `${NAP.url}/about/who-we-are-not`,
    type: 'website',
  },
};

export default function WhoWeAreNotPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Disaster Recovery affiliated with my insurer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Disaster Recovery is an independent network of IICRC-certified restoration contractors. We are not on any insurer panel and we are not an authorised representative of any insurer. The contractor you engage works to your brief and bills you directly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you "guarantee" my insurance claim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. We do not provide insurance advice, we do not approve claims, and we do not guarantee outcomes. We provide IICRC-certified restoration work and an independent scope of works documenting your loss. Your insurer determines what your policy covers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use a Disaster Recovery contractor instead of my insurer’s assigned builder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Check your policy and raise this with your insurer in writing. Many policies allow you to nominate your own contractor, or to request an independent assessment if you are not satisfied with the insurer’s scope. If your insurer refuses, you can raise that through their internal dispute resolution process and, if unresolved, through AFCA at no cost.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who pays for the restoration work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The contractor bills you directly. Disaster Recovery does not invoice clients for restoration work, does not bill insurers, and does not hold client funds. Your contractor will provide a scope of works and pricing in writing before any work proceeds. How that work is funded — out of pocket, through your insurer, through finance — is between you, your insurer, and any finance provider you choose.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the "Who First" stance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '"Who First" describes whose interests drive the scope of works on your job. When an insurer assigns a contractor, the commercial relationship is between the insurer and the contractor. When you engage an independent IICRC-certified contractor, the scope reflects the full extent of your damage to current industry standards (IICRC S500:2025 for water, S700:2025 for fire and smoke), not a pre-authorised budget ceiling.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="who-we-are-not-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="About Disaster Recovery"
        title="Who We Are Not"
        subtitle="A short page on what we do, what we do not do, and why that distinction matters when your property has just been damaged."
        gradient="linear-gradient(135deg, #0F2942 0%, #1B4F72 100%)"
        icon={<Compass className="h-10 w-10" />}
        lastReviewed="2026-04-25"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Who We Are Not' },
        ]}
        cta={{ text: 'Get an Independent IICRC Assessment', href: '/claim' }}
        sections={[
          {
            heading: 'What we are',
            body: (
              <>
                <p>
                  Disaster Recovery is a network of independent, IICRC-certified restoration
                  contractors operating across Australia and New Zealand. When you contact us, we
                  match you to a contractor in your area whose scope of works documents the full
                  extent of your damage to the current IICRC standards &mdash; S500:2025 for water,
                  S700:2025 for fire and smoke, S520:2025 for mould.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The contractor you engage works to your brief and bills you directly. We do not
                  invoice clients for restoration work, we do not bill on behalf of insurers, and we
                  do not hold client funds.
                </p>
              </>
            ),
          },
          {
            heading: 'What we are not',
            background: 'light',
            body: (
              <>
                <p>
                  We are not an insurer. We are not an insurance broker, agent, or authorised
                  representative. We are not a claims advocate, a public adjuster, or a legal
                  service. We do not approve, deny, or guarantee insurance claims.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  We are not a managed repair program. Insurer panels exist; this is not one. Our
                  contractors are not selected by your insurer and their scope of works is not set
                  to an insurer&apos;s authorised budget. The commercial relationship is between you
                  and your contractor, not between your insurer and us.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  We are not financial advisers. Where finance is available through a referral
                  partner, that referral is made under Regulation 25 of the NCCP Regulations 2010.
                  Rates, eligibility, and credit decisions are entirely between you and the credit
                  provider.
                </p>
              </>
            ),
          },
          {
            heading: 'Why the distinction matters',
            body: (
              <>
                <p>
                  After a loss, two structurally different models exist for how your property gets
                  restored. The choice you make in the first 48 hours often shapes what happens
                  next.
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      background: '#FFF7ED',
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      border: '1px solid #FED7AA',
                      borderTop: '4px solid #EA580C',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: '#9A3412',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Insurer-directed model
                    </div>
                    <ul
                      style={{
                        paddingLeft: '1.25rem',
                        lineHeight: 2,
                        color: '#374151',
                        fontSize: '0.9rem',
                      }}
                    >
                      <li>Contractor selected by the insurer&apos;s panel</li>
                      <li>Scope set to the insurer&apos;s authorised budget</li>
                      <li>
                        Contractor&apos;s commercial relationship is with the insurer, not you
                      </li>
                      <li>Disputes go through the insurer&apos;s internal review first</li>
                      <li>Limited independent documentation of damage extent</li>
                    </ul>
                  </div>
                  <div
                    style={{
                      background: '#F0FDF4',
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      border: '1px solid #BBF7D0',
                      borderTop: '4px solid #16A34A',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: '#15803D',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Independent IICRC model
                    </div>
                    <ul
                      style={{
                        paddingLeft: '1.25rem',
                        lineHeight: 2,
                        color: '#374151',
                        fontSize: '0.9rem',
                      }}
                    >
                      <li>You choose your contractor</li>
                      <li>Scope reflects full extent of damage, documented to IICRC standard</li>
                      <li>Contractor works to your brief, bills you directly</li>
                      <li>Independent scope supports any dispute through your insurer or AFCA</li>
                      <li>Full written and photographic record produced independently</li>
                    </ul>
                  </div>
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#4B5563' }}>
                  Both models exist legitimately. We run the second one. This page exists so you can
                  tell the two apart before you commit.
                </p>
              </>
            ),
          },
          {
            heading: 'Your rights as a policyholder',
            background: 'light',
            body: (
              <>
                <p>
                  Under the General Insurance Code of Practice and the Insurance Contracts Act 1984,
                  you have rights about how your claim is handled. AFCA (the Australian Financial
                  Complaints Authority) accepts complaints from policyholders at no cost.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  AFCA has published determinations covering recurring patterns in restoration
                  disputes &mdash; scope undervaluation, repair quality below industry standard, and
                  premature claim closure. Where an independent IICRC scope of works has documented
                  additional damage that the insurer&apos;s scope missed, AFCA has required insurers
                  to pay additional amounts or arrange re-assessment.
                </p>
                <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#6B7280' }}>
                  Source:{' '}
                  <a
                    href="https://www.afca.org.au/about-afca/publications/case-studies"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AFCA published case studies
                  </a>
                  . Individual outcomes vary; this is general information, not legal advice.
                </p>
              </>
            ),
          },
          {
            heading: 'What "Who First" actually means',
            body: (
              <>
                <p>
                  &ldquo;Who First&rdquo; is a stance, not a guarantee. It describes whose interests
                  drive every decision on your job:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Your contractor is yours.</strong> Selected by you, working to your
                    brief.
                  </li>
                  <li>
                    <strong>Your scope is independent.</strong> Documented to the current IICRC
                    standard, regardless of any insurer&apos;s authorised budget.
                  </li>
                  <li>
                    <strong>Your record is portable.</strong> If your claim ends up in dispute, the
                    scope of works you commissioned is admissible evidence in any insurer review or
                    AFCA complaint.
                  </li>
                  <li>
                    <strong>Your call.</strong> If you would rather use your insurer&apos;s assigned
                    builder, that is a legitimate choice. We just want you to know there is a second
                    one.
                  </li>
                </ul>
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
                  This page is general information about restoration models in Australia and New
                  Zealand. It is not legal advice and it is not insurance advice. For advice about
                  your specific policy, contact your insurer or a licensed insurance broker. For
                  advice about disputing a claim, contact AFCA or a legal practitioner.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Disaster Recovery affiliated with my insurer?',
            answer:
              'No. Disaster Recovery is an independent network of IICRC-certified restoration contractors. We are not on any insurer panel and we are not an authorised representative of any insurer. The contractor you engage works to your brief and bills you directly.',
          },
          {
            question: 'Do you "guarantee" my insurance claim?',
            answer:
              'No. We do not provide insurance advice, we do not approve claims, and we do not guarantee outcomes. We provide IICRC-certified restoration work and an independent scope of works documenting your loss. Your insurer determines what your policy covers.',
          },
          {
            question:
              "Can I use a Disaster Recovery contractor instead of my insurer's assigned builder?",
            answer:
              'Check your policy and raise this with your insurer in writing. Many policies allow you to nominate your own contractor, or to request an independent assessment if you are not satisfied with the insurer’s scope. If your insurer refuses, you can raise that through their internal dispute resolution process and, if unresolved, through AFCA at no cost.',
          },
          {
            question: 'Who pays for the restoration work?',
            answer:
              'The contractor bills you directly. Disaster Recovery does not invoice clients for restoration work, does not bill insurers, and does not hold client funds. Your contractor will provide a scope of works and pricing in writing before any work proceeds.',
          },
          {
            question: 'What is the "Who First" stance?',
            answer:
              '"Who First" describes whose interests drive the scope of works on your job. When an insurer assigns a contractor, the commercial relationship is between the insurer and the contractor. When you engage an independent IICRC-certified contractor, the scope reflects the full extent of your damage to current industry standards (IICRC S500:2025 for water, S700:2025 for fire and smoke), not a pre-authorised budget ceiling.',
          },
        ]}
        relatedGuides={[
          {
            title: "Your Advocate vs Your Insurer's Builder",
            href: '/guides/insurance/human-advocate-vs-insurer-assigned-builder',
          },
          {
            title: 'Why Hire an IICRC-Certified Professional',
            href: '/guides/certifications/why-hire-iicrc-certified',
          },
          {
            title: 'How the Disaster Recovery Network Works',
            href: '/how-it-works',
          },
          { title: 'Start a Claim Intake', href: '/claim' },
        ]}
      />
    </>
  );
}
