import { Metadata } from 'next';
import { Users } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'NRPG Best Practices Guide - Professional Standards for Disaster Recovery | Disaster Recovery',
  description: 'Comprehensive guide to National Restoration Professionals Group best practices, mandatory procedures, and professional standards for emergency response and disaster recovery contractors.',
  keywords: 'NRPG best practices, professional standards, disaster recovery procedures, emergency response protocols, contractor certification, industry standards',
  openGraph: {
    title: 'NRPG Best Practices Guide - Professional Standards',
    description: 'Official guide to professional standards and mandatory procedures for NRPG contractors in emergency response and disaster recovery.' },
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/professional/nrp-best-practices-guide' },
};

export default function NRPBestPracticesGuidePage() {
  return (
    <AgGuidePageTemplate
      category="Professional"
      title="NRPG Best Practices Guide - Professional Standards for Disaster Recovery"
      subtitle="Comprehensive guide to National Restoration Professionals Group best practices, mandatory procedures, and professional standards for emergency response and disaster recovery contractors."
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Users className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Professional', href: '/guides/professional' },
        { label: 'NRPG Best Practices Guide - Professional Standa...' },
      ]}
      cta={{ text: 'Join the NRPG Network', href: '/contractor' }}
      lastReviewed="2026-02-27"
      sections={[
        {
          heading: 'IICRC Compliance Standards',
          body: (
            <div className="space-y-4">
              <p>
                Every contractor in the NRPG network must maintain current IICRC certification as a non-negotiable condition of membership. These are not optional recommendations — they are mandatory professional standards that govern every job you accept through the platform.
              </p>
              <p>
                <strong>Minimum certification requirements:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>WRT (Water Damage Restoration Technician)</strong> — Required for all water damage, flood, and burst pipe jobs. You must demonstrate competency in psychrometry, structural drying calculations, moisture mapping, and water category/class classification per IICRC S500.
                </li>
                <li>
                  <strong>FSRT (Fire and Smoke Restoration Technician)</strong> — Required for all fire, smoke, and soot damage jobs. Covers soot chemistry, residue types, cleaning protocols, odour elimination, and contents restoration per IICRC S540.
                </li>
                <li>
                  <strong>AMRT (Applied Microbial Remediation Technician)</strong> — Required for all mould remediation jobs. Covers containment protocols, air quality testing, remediation procedures, and clearance testing per IICRC S520.
                </li>
              </ul>
              <p>
                <strong>Continuing education:</strong> IICRC certifications require renewal every 3&ndash;5 years. NRPG audits certification currency quarterly. If your certification lapses, your profile is suspended until renewal is confirmed — no exceptions. Plan your renewal dates well in advance.
              </p>
              <p>
                <strong>Insurance requirements:</strong> A minimum of $20 million public liability insurance must be maintained at all times. Proof of currency is verified during onboarding and at each quarterly audit cycle.
              </p>
            </div>
          ),
        },
        {
          heading: 'Documentation Requirements',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Professional documentation is the foundation of the NRPG quality standard. Every job must produce a complete evidence package — both for the client&apos;s insurance claim and for NRPG&apos;s internal quality assurance. Incomplete documentation is the single most common reason for contractor performance reviews.
              </p>
              <p>
                <strong>Mandatory documentation per job:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Initial site assessment</strong> — Timestamped photos of all affected areas before any work begins. Include wide shots showing the full scope, close-ups of specific damage, and reference shots of unaffected areas for comparison.
                </li>
                <li>
                  <strong>Moisture readings</strong> — Initial readings using pin-type and non-invasive meters at all affected points. Record readings on a moisture map (floor plan with numbered reference points). For water damage jobs, include ambient temperature, relative humidity, and GPP (grains per pound) readings.
                </li>
                <li>
                  <strong>Daily drying logs</strong> — Moisture readings at every mapped point, equipment placement records (dehumidifiers, air movers, HEPA units), and psychrometric calculations showing drying progress. Continue until all materials reach their dry standard per IICRC S500.
                </li>
                <li>
                  <strong>Treatment records</strong> — Antimicrobial application details (product name, concentration, application method, coverage area), containment setup and removal records for mould jobs, and any specialist treatments applied.
                </li>
                <li>
                  <strong>Completion report</strong> — Final moisture readings confirming dry standard achieved, before-and-after photo comparison, scope of works summary, and any recommendations for follow-up building work.
                </li>
              </ul>
              <p>
                <strong>Billing documentation:</strong> NRPG contractors bill the client directly. Your invoice must clearly itemise all work performed, materials used, and equipment deployed. After the make-safe phase, provide the client with a formal contract including terms and conditions for the full restoration scope. Full claims documentation — photos, moisture logs, scope of works, and treatment records — must be provided to the client so they have everything their insurer needs for reimbursement.
              </p>
            </div>
          ),
        },
        {
          heading: 'Client Communication Protocols',
          body: (
            <div className="space-y-4">
              <p>
                Clear, proactive communication is a core NRPG standard. Property owners dealing with disaster damage are under significant stress. Your professionalism in communication directly affects client satisfaction, review scores, and your priority ranking within the network.
              </p>
              <p>
                <strong>Initial response (within 60 minutes of job acceptance):</strong>
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Confirm your estimated arrival time via the platform.</li>
                <li>Introduce yourself and confirm your IICRC certification if asked.</li>
                <li>Provide a brief explanation of what the make-safe process involves and how long it typically takes.</li>
              </ul>
              <p>
                <strong>During the job:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Explain each step before you do it. Clients should never be surprised by equipment placement, noise, or disruption.</li>
                <li>Provide daily updates during the drying phase — even a brief message confirming readings and expected timeline.</li>
                <li>If the scope expands beyond the original assessment, communicate this immediately with a clear explanation of what was found and what additional work is recommended.</li>
              </ul>
              <p>
                <strong>Billing communication:</strong> Be transparent about costs from the outset. Explain that you bill the client directly, that work begins immediately without waiting for insurer approval, and that you will provide full claims documentation to support their insurance reimbursement. If clients express concern about cash flow, direct them to{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a>{' '}
                for payment plan options. After the make-safe phase, provide a formal contract with clear terms and conditions.
              </p>
            </div>
          ),
        },
        {
          heading: 'Quality Benchmarks',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                NRPG maintains quality benchmarks that exceed minimum IICRC standards. These benchmarks determine your performance tier, job priority, and standing within the network.
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Response time</strong> — Target: 60 minutes from job acceptance to on-site arrival. Contractors consistently exceeding 90 minutes will receive a performance review. Metropolitan contractors are expected to maintain sub-45-minute averages.
                </li>
                <li>
                  <strong>Documentation completeness</strong> — Every job must include all mandatory documentation items listed above. Random audits are conducted quarterly. A documentation completeness score below 90% triggers a review.
                </li>
                <li>
                  <strong>Dry standard achievement</strong> — All materials must reach their IICRC S500 dry standard before the job is marked complete. Drying equipment must not be removed based on time alone — only verified moisture readings confirm completion.
                </li>
                <li>
                  <strong>Client satisfaction</strong> — NRPG surveys clients after every job. A satisfaction score below 4.0/5.0 over a rolling 10-job window triggers a performance review. Contractors maintaining 4.8+ receive priority job allocation.
                </li>
                <li>
                  <strong>Callback rate</strong> — Jobs that require a return visit due to incomplete work, recurring moisture, or client complaints are tracked. A callback rate above 5% triggers a review. The network-wide target is below 2%.
                </li>
                <li>
                  <strong>Equipment standards</strong> — Commercial-grade dehumidifiers (LGR or desiccant), calibrated moisture meters (pin-type and non-invasive), thermal imaging cameras, and HEPA air filtration devices must be maintained in working order. Consumer-grade equipment is not acceptable for NRPG jobs.
                </li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'Continuous Professional Development',
          body: (
            <div className="space-y-4">
              <p>
                The restoration industry evolves constantly — new materials, new contamination risks, new equipment, and new insurance requirements. NRPG expects contractors to maintain and expand their professional knowledge throughout their membership.
              </p>
              <p>
                <strong>Recommended development pathways:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Additional IICRC certifications</strong> — Expand into OCT (Odour Control Technician), CCT (Carpet Cleaning Technician), RTCE (Resilient Textile and Carpet Examiner), or specialty certifications relevant to your service areas.
                </li>
                <li>
                  <strong>Equipment manufacturer training</strong> — Stay current with dehumidifier, air mover, and moisture detection technology. Manufacturers regularly update their equipment and calibration requirements.
                </li>
                <li>
                  <strong>Australian standards updates</strong> — Monitor changes to AS/NZS standards relevant to restoration, building codes, WHS requirements, and asbestos handling regulations (particularly important for pre-1990 properties).
                </li>
                <li>
                  <strong>Insurance industry awareness</strong> — Understanding how insurers assess claims, what documentation they prioritise, and how to produce evidence packages that support efficient claim processing helps your clients and reduces disputes.
                </li>
              </ul>
              <p>
                NRPG periodically publishes technical bulletins and hosts webinars on emerging topics. Participation is voluntary but strongly encouraged — contractors who engage with CPD opportunities consistently outperform those who do not, as measured by client satisfaction scores and callback rates.
              </p>
              <p>
                For more information on joining the NRPG network and accessing contractor resources, visit the{' '}
                <a href="/contractor" className="text-blue-400 hover:underline">contractor portal</a>.
              </p>
            </div>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What certifications do I need to join the NRPG network?',
          answer: 'At minimum, you need a current IICRC certification relevant to the services you offer — WRT for water damage, FSRT for fire and smoke, or AMRT for mould remediation. You must also carry a minimum of $20 million public liability insurance and hold all relevant trade licences for your state or territory. Certification currency is verified during onboarding and audited quarterly.',
        },
        {
          question: 'How does the billing process work for NRPG contractors?',
          answer: 'NRPG contractors bill the client (property owner) directly. Work begins immediately without waiting for insurer approval. You provide full claims documentation — photos, moisture logs, scope of works, and treatment records — so the client has everything their insurer needs for reimbursement. After the make-safe phase, you provide the client with a formal contract including terms and conditions for the full restoration scope. If clients need payment flexibility, direct them to Blue Fire Finance (bluefirefinance.com.au).',
        },
        {
          question: 'What happens if my IICRC certification lapses?',
          answer: 'Your NRPG profile is immediately suspended and you will not receive new job allocations until proof of renewed certification is provided. IICRC certifications require renewal every 3–5 years depending on the specific qualification. We recommend setting renewal reminders at least 3 months before expiry to avoid any gap in your availability on the platform.',
        },
        {
          question: 'What documentation is required for every NRPG job?',
          answer: 'Every job requires: timestamped before-and-after photos, initial moisture readings with a documented moisture map, daily drying logs with psychrometric data, treatment records (antimicrobial applications, containment setup), equipment placement records, and a completion report confirming dry standard was achieved. This documentation package supports the client\'s insurance claim and is subject to random quarterly audits by NRPG.',
        },
        {
          question: 'How is contractor performance measured in the NRPG network?',
          answer: 'Performance is measured across five key benchmarks: response time (target 60 minutes), documentation completeness (minimum 90%), dry standard verification, client satisfaction score (minimum 4.0/5.0 over rolling 10-job window), and callback rate (target below 2%). High-performing contractors (4.8+ satisfaction, sub-45-minute response) receive priority job allocation. Contractors falling below benchmarks receive a performance review and support to improve.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Why Hire IICRC Certified Professionals?',
          href: '/guides/certifications/why-hire-iicrc-certified',
          description: 'The IICRC certification framework explained — what each qualification covers and why it matters.',
        },
        {
          title: 'Become a Disaster Recovery Contractor',
          href: '/contractor',
          description: 'Join the NRPG network — learn about the application process, requirements, and benefits.',
        },
        {
          title: 'Builder vs Restorer: The $15,000 Difference',
          href: '/guides/professional/builder-vs-restorer-difference',
          description: 'Why restoration professionals save what builders demolish, and how IICRC methodology reduces costs.',
        },
      ]}
    />
  );
}
