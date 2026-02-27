import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Best Restoration Companies in Australia: How to Choose | Disaster Recovery',
  description: 'Expert answers and solutions for "which restoration company is best in australia". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'which restoration company is best in australia, disaster recovery, restoration services, Australia, IICRC certified',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/guides/best-restoration-company-australia' },
};

export default function BestRestorationCompanyAustraliaPage() {
  return (
    <AgGuidePageTemplate
      category="Guides"
      title="Best Restoration Companies in Australia: How to Choose"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1A4674 100%)"
      icon={<BookOpen className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Guides', href: '/guides/guides' },
        { label: 'Best Restoration Companies in Australia: How to...' },
      ]}
      sections={[
        {
          heading: 'What to Look for in a Restoration Company',
          body: (
            <>
              <p>
                Choosing the right restoration company after a disaster is one of the most
                important decisions you will make as a property owner. The wrong choice can lead
                to incomplete work, secondary damage, and a drawn-out insurance claim. Here are
                the non-negotiable criteria to check before hiring anyone.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>IICRC certification:</strong> The Institute of Inspection, Cleaning and
                  Restoration Certification is the global benchmark for restoration professionals.
                  An IICRC-certified firm employs technicians trained in water damage restoration
                  (WRT), fire and smoke restoration (FSRT), and mould remediation. Always ask for
                  certification numbers and verify them on the IICRC website.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>24/7 availability:</strong> Disasters do not wait for business hours.
                  A credible restoration company offers genuine round-the-clock emergency response
                  — not just an answering service. Ask what their average response time is and
                  whether they guarantee on-site arrival within a specific window.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Insurance claims experience:</strong> Your restoration company should
                  understand the documentation your insurer requires — scope of works, moisture
                  mapping, progress photos, and completion reports. This directly affects how
                  smoothly your claim is processed and reimbursed.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Local presence and equipment:</strong> A company with a local depot
                  can mobilise faster and maintain equipment on-site without excessive transport
                  charges. Check whether they have commercial dehumidifiers, air scrubbers,
                  thermal imaging cameras and moisture metres available — not rented from a third
                  party.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Red Flags to Avoid When Hiring a Restorer',
          body: (
            <>
              <p>
                After a disaster, you may be approached by multiple companies offering services.
                Some are legitimate; others are not. Knowing the warning signs can save you
                thousands of dollars and months of frustration.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No certification or unable to provide numbers:</strong> If a company
                  cannot show current IICRC certification (or equivalent recognised qualification),
                  walk away. Uncertified operators may cause further damage and their work may not
                  be accepted by your insurer.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Demanding full payment upfront:</strong> Professional restorers will
                  provide a written scope of works and a clear payment schedule. Any company
                  demanding the total amount before work begins is a significant risk. Progress
                  payments tied to milestones are standard industry practice.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>High-pressure sales tactics:</strong> Beware of companies that create
                  artificial urgency (&quot;sign today or the price doubles&quot;) or discourage
                  you from getting competing quotes. A professional restorer will give you time to
                  make an informed decision, even in an emergency.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No written scope of works:</strong> Every restoration job should begin
                  with a detailed, written scope outlining exactly what will be done, what
                  materials and equipment will be used, the expected timeline, and the total cost.
                  Verbal agreements provide no protection if a dispute arises.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No ABN or proper insurance:</strong> Verify the company holds a valid
                  Australian Business Number and carries both public liability and professional
                  indemnity insurance. Request certificates of currency before any work commences.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'How the Disaster Recovery Platform Works',
          body: (
            <>
              <p>
                Disaster Recovery is Australia&apos;s claims distribution platform, connecting
                property owners with vetted, IICRC-certified restoration contractors nationwide.
                Here is how the process works from start to finish.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Submit your claim online:</strong> Complete the online claim form with
                  details of the damage, your location and any photos you have. The form takes
                  approximately 5 minutes.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Matched with an IICRC-certified contractor:</strong> Our platform
                  matches you with a qualified, certified contractor in your area based on the
                  damage type, location and urgency. All contractors on our network are vetted
                  for certification, insurance and track record.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>$550 platform fee:</strong> A one-time platform fee covers claim
                  processing, contractor matching and documentation support. This is clearly
                  disclosed before you proceed.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>$2,200 held for contractor mobilisation:</strong> An initial amount is
                  held to secure your contractor&apos;s mobilisation to site. After the make-safe
                  is complete, your contractor provides a formal contract with full terms and
                  conditions.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Full documentation provided:</strong> Throughout the restoration, your
                  contractor provides comprehensive documentation — scope of works, progress
                  photographs, moisture readings and completion reports — everything your insurer
                  needs to process your reimbursement claim.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                We bill you directly, which means work begins immediately with no waiting for
                insurer approval. You control the process and there are no scope disputes with
                third parties. Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>
                .
              </p>
            </>
          ),
        },
        {
          heading: 'Questions to Ask Before Hiring a Restoration Company',
          body: (
            <>
              <p>
                Before you commit to any restoration contractor, ask these questions. A reputable
                company will answer all of them without hesitation.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>&quot;What are your IICRC certification numbers?&quot;</strong> — Ask
                  for both the firm registration number and the individual technician
                  certifications for whoever will be on site. Verify them at{' '}
                  <em>www.iicrc.org</em>.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>&quot;What is your guaranteed response time?&quot;</strong> — For
                  emergencies, a 2–4 hour on-site response is standard in metro areas. Regional
                  areas may be longer, but the company should commit to a specific timeframe in
                  writing.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>&quot;Will I receive a written scope of works before you start?&quot;</strong> —
                  The scope should detail every task, the equipment to be used, the expected
                  duration, and the cost. It should also include what happens if additional damage
                  is discovered during the job.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>&quot;How will I receive progress updates?&quot;</strong> — Professional
                  restorers provide regular updates including photographs, moisture readings and
                  written status reports. This documentation is also critical for your insurance
                  claim.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>&quot;Can you provide certificates of currency for your insurance?&quot;</strong> —
                  Public liability ($10–20 million minimum) and professional indemnity insurance
                  are non-negotiable. A company without current coverage exposes you to
                  significant financial risk.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What certifications should a restoration company have in Australia?',
          answer:
            'At minimum, look for IICRC (Institute of Inspection, Cleaning and Restoration Certification) firm registration and individual technician certifications such as WRT (Water Restoration Technician), FSRT (Fire and Smoke Restoration Technician), and AMRT (Applied Microbial Remediation Technician). The company should also hold a valid ABN, public liability insurance of at least $10 million, and professional indemnity cover.',
        },
        {
          question: 'How quickly should a restoration company respond to an emergency?',
          answer:
            'In metropolitan areas, a 2–4 hour on-site response is the industry standard for genuine emergencies such as active water leaks, fire damage or sewage overflows. Regional response times may be longer depending on distance, but a reputable company will commit to a specific timeframe in writing before you engage them.',
        },
        {
          question: 'How does Disaster Recovery vet its contractor network?',
          answer:
            'Every contractor on the Disaster Recovery platform must hold current IICRC certification, carry public liability and professional indemnity insurance, provide proof of an active ABN, and demonstrate relevant experience. Contractors are matched to jobs based on certification scope, location, equipment availability and track record.',
        },
        {
          question: 'How much does disaster restoration typically cost in Australia?',
          answer:
            'Costs vary significantly depending on the damage type, extent and property size. A minor water leak in a single room may cost a few thousand dollars; a whole-house fire restoration can run to tens of thousands. We bill you directly with a transparent, written scope of works, and payment plans are available through Blue Fire Finance (bluefirefinance.com.au). Full documentation is provided to support your insurance reimbursement claim.',
        },
        {
          question: 'Can I choose my own restoration company or do I have to use my insurer\'s preferred supplier?',
          answer:
            'Under Australian insurance law, you are not obligated to use your insurer\'s preferred supplier. You have the right to choose your own contractor. Using the Disaster Recovery platform, you are matched with an IICRC-certified contractor and we provide all the documentation your insurer needs to process your reimbursement claim. You control the process from start to finish.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Why Hire IICRC-Certified Professionals',
          href: '/guides/certifications/why-hire-iicrc-certified',
          description: 'What IICRC certification means and why it matters for your restoration job.',
        },
        {
          title: 'Submit a Claim',
          href: '/claim',
          description: 'Get matched with a vetted, IICRC-certified contractor in your area now.',
        },
        {
          title: 'Water Damage Restoration Guides',
          href: '/guides/water-damage',
          description: 'Complete guide hub for water damage restoration topics.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
