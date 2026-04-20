import { Metadata } from 'next';
import Link from 'next/link';
import { Banknote } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Recovery Funding Options via Equipped Commercial Finance | Disaster Recovery',
  description:
    'Request a call back from our finance partner Equipped Commercial Finance for equipment finance, commercial loans, and funding options that help you get your property or business back to work faster. Disaster Recovery is not the lender.',
  keywords: [
    'disaster recovery finance',
    'equipment finance Australia',
    'commercial restoration loan',
    'business recovery funding',
    'Equipped Commercial Finance',
  ],
  canonical: '/finance',
});

export default function FinanceLandingPage() {
  return (
    <AgContentPageTemplate
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Finance Options' }]}
      hero={{
        gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #0ea5e9 100%)',
        icon: <Banknote className="w-16 h-16 text-white" aria-hidden />,
        title: 'Recovery Funding Options',
        subtitle:
          'Finance is provided by Equipped Commercial Finance and/or its authorised lending partners. Disaster Recovery is not the lender.',
      }}
      stats={[
        { label: 'Finance partner', value: 'Equipped' },
        { label: 'Focus', value: 'Commercial & equipment' },
        { label: 'Typical response', value: 'Business day' },
      ]}
      sections={[
        {
          heading: 'Who this is for',
          body: (
            <div className="space-y-4 text-slate-700">
              <p>
                If your business has been affected by water damage, fire, storm, mould, or biohazard events, you may need
                funding before the insurer resolves the claim. Cash flow can be the difference between resuming
                operations this week and waiting months. Our finance partner, <strong>Equipped Commercial Finance</strong>,
                specialises in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Equipment finance for trucks, trailers, earthmoving, agricultural and manufacturing assets</li>
                <li>Commercial finance for ABN holders (cars, vans, utility vehicles, fit-out)</li>
                <li>Commercial property, business overdrafts, lines of credit, invoice and trade finance</li>
              </ul>
              <p className="text-sm text-slate-600">
                The damaged or replacement equipment can often be used as collateral, which may speed up the process
                and sharpen the rate. All credit assessments, disclosures and approvals are handled by Equipped or its
                authorised lending partners — not by Disaster Recovery.
              </p>
            </div>
          ),
        },
        {
          heading: 'How the referral works',
          background: 'light',
          body: (
            <ol className="list-decimal pl-6 space-y-3 text-slate-700">
              <li>
                <strong>You submit a short referral form</strong> — name, phone, email, postcode, whether you&apos;re a
                business or household, the job context, and a rough funding range. That&apos;s all we ask on our side.
              </li>
              <li>
                <strong>We pass your referral securely to Equipped</strong> — with a signed, single-use token and your
                explicit consent to share the data.
              </li>
              <li>
                <strong>Equipped runs their application and decision</strong> — affordability, disclosures and the
                credit decision all happen inside their regulated environment, not ours.
              </li>
              <li>
                <strong>If approved, funds are directed to the approved recovery work</strong> — typically paid to the
                contractor or supplier under your authority, not held by Disaster Recovery.
              </li>
            </ol>
          ),
        },
        {
          heading: 'What we will not do',
          body: (
            <div className="space-y-3 text-slate-700">
              <p>We are a <strong>referrer</strong>, not a lender or credit assistance provider. That means we will not:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Assess whether a loan is suitable or affordable for you</li>
                <li>Recommend a specific product, rate or term</li>
                <li>Promise that finance will be approved</li>
                <li>Ask for income, bank statements, liabilities or credit history</li>
                <li>Receive or hold loan proceeds in our operating account</li>
              </ul>
              <p className="text-sm text-slate-600">
                All of the above is handled by Equipped Commercial Finance and/or its authorised lending partners, who
                are bound by their own regulatory obligations.
              </p>
            </div>
          ),
        },
        {
          heading: 'Disclosures',
          background: 'light',
          body: (
            <div className="space-y-3 text-sm text-slate-600">
              <p>
                Disaster Recovery is a referrer under reg 25 of the National Consumer Credit Protection Regulations 2010
                (Cth). A referral fee may be paid to Disaster Recovery by Equipped Commercial Finance when a referral
                results in a funded transaction. That fee does not come out of your loan amount and does not change the
                price you pay for the finance. The referral fee amount will be disclosed before you submit the form.
              </p>
              <p>
                Any credit or finance decision is made solely by Equipped Commercial Finance and/or its authorised
                lending partners. Disaster Recovery does not and cannot guarantee any finance outcome.
              </p>
              <p>
                This is a Phase 1 referral service for Australian businesses. New Zealand and household consumer pathways
                will be added once the relevant regulatory and partner arrangements are in place.
              </p>
            </div>
          ),
        },
      ]}
      cta={{ text: 'Start a referral', href: '/finance/referral' }}
      secondaryCta={{ text: 'Speak to us first', href: '/contact' }}
      relatedPages={[
        {
          title: 'How Disaster Recovery works',
          href: '/how-it-works',
          description: 'Six steps from damage to restoration — where finance fits in the journey.',
        },
        {
          title: 'For business owners',
          href: '/for-business/business-owners',
          description: 'Why business owners get work started before insurer sign-off.',
        },
        {
          title: 'Contact us',
          href: '/contact',
          description: 'Talk to our team before starting a referral.',
        },
      ]}
    />
  );
}
