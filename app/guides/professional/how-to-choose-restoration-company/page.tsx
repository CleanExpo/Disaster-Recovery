import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Choose a Disaster Restoration Company in Australia — 7 Key Criteria',
  description: 'How to choose the right disaster restoration company in Australia. IICRC certification, insurance direct billing, response time, and 7 criteria that separate genuine professionals from unreliable operators.',
  keywords: 'how to choose restoration company australia, best restoration company australia, IICRC certified restoration, restoration company comparison australia',
  openGraph: {
    title: 'How to Choose a Disaster Restoration Company in Australia — 7 Key Criteria',
    description: 'How to choose the right disaster restoration company in Australia. IICRC certification, insurance direct billing, response time, and 7 criteria that separate genuine professionals from unreliable operators.',
  },
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/professional/how-to-choose-restoration-company' },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: NAP.name,
  legalName: NAP.legalName,
  alternateName: NAP.alternateName,
  url: NAP.url,
  email: NAP.email,
  priceRange: NAP.priceRange,
  logo: NAP.logo,
  sameAs: NAP.sameAs,
  areaServed: 'Australia',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Disaster Restoration Services',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    url: NAP.url,
  },
  description: 'IICRC-certified disaster restoration for water, fire, mould, and cyclone damage across Australia.',
  areaServed: 'Australia',
  serviceType: 'Disaster Restoration',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is IICRC certification and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The IICRC (Institute of Inspection, Cleaning and Restoration Certification) sets the internationally recognised standards for restoration work, including water damage (S500:2025), mould remediation (S520), fire and smoke restoration (S700:2025), and floor covering (S220). IICRC-certified contractors produce psychrometric drying logs — the detailed scientific records of moisture levels and drying progress that insurers require to approve claims. Non-certified work may not receive insurer sign-off, potentially leaving you personally liable for the cost of works.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I choose the cheapest restoration quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not necessarily. Restoration is a complex technical process, and incomplete drying is the leading cause of mould growth after water events. The cheapest quote may omit equipment hire, disposal costs, or antimicrobial treatment — items that are essential to a compliant outcome. Rather than comparing quote totals, request a detailed scope of works from each contractor and compare line items. NRPG provides transparent fixed-fee pricing with a full scope so you know exactly what is included.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a restoration company bill my insurance directly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. NRPG bills your insurer directly and provides full documentation including moisture logs, scope of works, and treatment certificates. You authorise the works, your insurer reviews and approves the scope, and you pay only your policy excess. Some operators require upfront payment and leave you to claim back — this is unusual and not required. If a contractor insists on full upfront cash payment, treat this as a significant red flag.',
      },
    },
    {
      '@type': 'Question',
      name: "How do I verify a restoration company's credentials?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check the IICRC website search at iicrc.org to verify the contractor holds current certification. Check your state licensing body for a valid building licence — QBCC in Queensland, Service NSW for New South Wales, or the equivalent in other states. Review Google Reviews, paying close attention to recency and how the company responds to negative feedback. Never rely solely on website claims — always verify credentials through the issuing body directly.',
      },
    },
  ],
};

export default function HowToChooseRestorationCompanyPage() {
  return (
    <>
      <Script id="htcrc-professional-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      <Script id="htcrc-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="htcrc-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Professional Standards"
        title="How to Choose a Disaster Restoration Company in Australia — 7 Key Criteria"
        subtitle="IICRC certification, insurance direct billing, response time, and 7 criteria that separate genuine professionals from unreliable operators."
        gradient="linear-gradient(135deg, #1A237E 0%, #283593 100%)"
        icon={<Shield className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Professional', href: '/guides/professional' },
          { label: 'How to Choose a Restoration Company' },
        ]}
        cta={{ text: 'Get IICRC-Certified Emergency Response', href: '/claim' }}
        lastReviewed="2026-04-09"
        sections={[
          {
            heading: '7 Criteria for Choosing a Restoration Company',
            body: (
              <div className="space-y-4">
                <p>
                  Not all restoration companies operate to the same standard. Use this checklist to evaluate any company before you sign an authority to proceed.
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>IICRC certification</strong> — Verify the contractor holds current IICRC certification relevant to your damage type (WRT for water, FSRT for fire, AMRT for mould). Check the IICRC website directly at iicrc.org — do not rely on logos on a website alone.
                  </li>
                  <li>
                    <strong>24/7 emergency response capability</strong> — Disaster damage does not occur during business hours. Confirm the contractor can dispatch to your property at any time, including weekends and public holidays, with a stated response time.
                  </li>
                  <li>
                    <strong>Direct insurance billing</strong> — A professional operator will bill your insurer directly and manage the claims documentation. You should only be responsible for your policy excess, not full upfront payment.
                  </li>
                  <li>
                    <strong>Psychrometric drying logs</strong> — For water damage, the contractor must produce daily drying records showing temperature, relative humidity, and moisture readings. These records are required by insurers and demonstrate the work was carried out to standard.
                  </li>
                  <li>
                    <strong>State licensing</strong> — In addition to IICRC certification, contractors performing structural work require a state building licence. Verify with QBCC (QLD), Service NSW, or your state equivalent.
                  </li>
                  <li>
                    <strong>Transparent pricing</strong> — Request a written scope of works before you authorise anything. The scope should list every line item, including equipment hire, labour, disposal, and treatment. Avoid any contractor who cannot provide this.
                  </li>
                  <li>
                    <strong>Clear scope of works</strong> — The scope should describe exactly what will be done, in what sequence, and what the expected outcome is. Vague proposals like &ldquo;restore affected areas&rdquo; are not adequate — you need specifics.
                  </li>
                </ol>
              </div>
            ),
          },
          {
            heading: 'Red Flags — Restoration Company Warning Signs',
            background: 'light',
            body: (
              <div className="space-y-4">
                <p>
                  In the aftermath of a major weather event or sudden water damage, predatory operators target vulnerable homeowners. Know the warning signs before you engage anyone.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Door-knocking post-disaster</strong> — Legitimate restoration companies do not solicit door-to-door after storm or flood events. If someone turns up unsolicited, do not sign anything.
                  </li>
                  <li>
                    <strong>Pressure to sign immediately</strong> — Any contractor who insists you must sign right now, before you can get other quotes or check their credentials, is using high-pressure sales tactics. Reputable operators do not operate this way.
                  </li>
                  <li>
                    <strong>No IICRC certification</strong> — This is a non-negotiable. Without IICRC certification, the contractor cannot produce the drying documentation your insurer requires, and they likely lack the training to do the work correctly.
                  </li>
                  <li>
                    <strong>No written scope</strong> — If a contractor cannot or will not provide a written scope before beginning work, walk away. Verbal agreements leave you with no recourse if the work is incomplete.
                  </li>
                  <li>
                    <strong>Upfront cash-only payment</strong> — Full upfront cash payment with no invoicing process is a significant warning sign. Legitimate operators invoice through standard business processes, not cash-in-hand.
                  </li>
                  <li>
                    <strong>No local presence</strong> — Be cautious of operators with no verifiable local office or address. After the work is done, you need to be able to contact them if issues arise.
                  </li>
                  <li>
                    <strong>Unable to produce drying logs on request</strong> — If a contractor cannot show you drying logs from previous jobs when asked, they are likely not producing them at all — which means their work will not meet insurer standards.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'Questions to Ask Before You Sign',
            body: (
              <div className="space-y-4">
                <p>
                  Before authorising any work, ask these questions directly and confirm the answers in writing:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Are you IICRC certified for this work type?</strong> Ask them to confirm the specific certification relevant to your event — WRT, FSRT, or AMRT.</li>
                  <li><strong>Can you produce psychrometric drying logs?</strong> For water damage, this is mandatory. Ask for a sample from a previous job if you want to understand what to expect.</li>
                  <li><strong>Will you bill my insurer directly?</strong> Confirm the billing process upfront. You should not be expected to fund the work and claim back.</li>
                  <li><strong>What is your emergency response time?</strong> Get this in writing — a stated 60-minute or same-day response should be in the contract.</li>
                  <li><strong>Do you provide a written scope before work commences?</strong> This must be a written document, not a verbal summary.</li>
                  <li><strong>What licences do you hold?</strong> Request the specific licence number for your state so you can verify independently.</li>
                </ul>
              </div>
            ),
          },
          {
            heading: "How NRPG's Contractor Network Meets These Criteria",
            background: 'light',
            body: (
              <div className="space-y-4">
                <p>
                  Every contractor in the NRPG network is vetted against the same criteria you should be applying when choosing a restoration company independently.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>IICRC certification required for network membership</strong> — No contractor joins the NRPG network without holding current, verified IICRC certification relevant to their service offering. Certifications are checked at onboarding and monitored ongoing.
                  </li>
                  <li>
                    <strong>60-minute emergency response</strong> — NRPG contractors commit to a 60-minute emergency response, 24 hours a day, 7 days a week, including public holidays.
                  </li>
                  <li>
                    <strong>Direct insurer billing</strong> — NRPG manages the insurance documentation process end-to-end. You authorise the work and pay your excess — NRPG handles everything else with your insurer.
                  </li>
                  <li>
                    <strong>Psychrometric drying logs as standard</strong> — Every water damage job produces a full set of drying logs in the format insurers require. This is not optional — it is part of every engagement.
                  </li>
                  <li>
                    <strong>State licensing verification</strong> — Contractor state licences are verified at onboarding. You can request licence details at any time.
                  </li>
                  <li>
                    <strong>Transparent fixed-fee structure</strong> — NRPG provides itemised scopes of works with fixed pricing before work commences. There are no hidden costs or post-completion surprises.
                  </li>
                </ul>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is IICRC certification and why does it matter?',
            answer: 'The IICRC (Institute of Inspection, Cleaning and Restoration Certification) sets the internationally recognised standards for restoration work, including water damage (S500:2025), mould remediation (S520), fire and smoke restoration (S700:2025), and floor covering (S220). IICRC-certified contractors produce psychrometric drying logs — the detailed scientific records of moisture levels and drying progress that insurers require to approve claims. Non-certified work may not receive insurer sign-off, potentially leaving you personally liable for the cost of works.',
          },
          {
            question: 'Should I choose the cheapest restoration quote?',
            answer: 'Not necessarily. Restoration is a complex technical process, and incomplete drying is the leading cause of mould growth after water events. The cheapest quote may omit equipment hire, disposal costs, or antimicrobial treatment — items that are essential to a compliant outcome. Rather than comparing quote totals, request a detailed scope of works from each contractor and compare line items. NRPG provides transparent fixed-fee pricing with a full scope so you know exactly what is included.',
          },
          {
            question: 'Can a restoration company bill my insurance directly?',
            answer: 'Yes. NRPG bills your insurer directly and provides full documentation including moisture logs, scope of works, and treatment certificates. You authorise the works, your insurer reviews and approves the scope, and you pay only your policy excess. Some operators require upfront payment and leave you to claim back — this is unusual and not required. If a contractor insists on full upfront cash payment, treat this as a significant red flag.',
          },
          {
            question: "How do I verify a restoration company's credentials?",
            answer: 'Check the IICRC website search at iicrc.org to verify the contractor holds current certification. Check your state licensing body for a valid building licence — QBCC in Queensland, Service NSW for New South Wales, or the equivalent in other states. Review Google Reviews, paying close attention to recency and how the company responds to negative feedback. Never rely solely on website claims — always verify credentials through the issuing body directly.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Builder vs Restorer: The $15,000 Difference',
            href: '/guides/professional/builder-vs-restorer-difference',
            description: 'Why builders rip and replace what professional restorers can save, and the cost difference.',
          },
          {
            title: 'Why Hire IICRC Certified Professionals?',
            href: '/guides/certifications/why-hire-iicrc-certified',
            description: 'What IICRC certification means and why it matters for your property and insurance claim.',
          },
          {
            title: 'Best Restoration Company Australia',
            href: '/guides/guides/best-restoration-company-australia',
            description: 'How to identify the best restoration company for your event type and location.',
          },
        ]}
      />
    </>
  );
}
