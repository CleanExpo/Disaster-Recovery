import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Property Managers',
  description: 'Emergency disaster restoration for property managers and managing agents across Australia. 24/7 response, full documentation for owners, preferred supplier arrangements.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/for/property-managers',
  },
};

const faqData = [
  {
    question: 'What should I do when a tenant reports water damage?',
    answer: 'Instruct the tenant to turn off the water at the mains (if safe to do so), move valuables off the floor, and take photos of the damage. Then contact Disaster Recovery immediately — we deploy an IICRC-certified contractor to the property within 60 minutes, 24/7. Do not wait for owner approval if there is an immediate risk of further damage; your duty of care requires you to take reasonable steps to mitigate the loss.',
  },
  {
    question: 'Who is responsible for restoration costs — the owner or the tenant?',
    answer: 'The building owner\'s landlord insurance typically covers structural damage and fixtures (walls, floors, ceilings, plumbing). The tenant\'s contents insurance covers their personal belongings, furniture, and stock. In strata properties, the body corporate policy covers common areas. Disaster Recovery bills the client directly — whoever engages us — and provides full documentation for their insurance claim.',
  },
  {
    question: 'How quickly can you respond to a commercial property emergency?',
    answer: 'An IICRC-certified contractor from our NRPG network will contact you within 60 minutes of your claim being lodged, and can be on-site within the hour — 24 hours a day, 7 days a week, 365 days a year. This applies Australia-wide, including after hours, weekends, and public holidays.',
  },
  {
    question: 'What documentation do you provide for building owners?',
    answer: 'We provide comprehensive documentation including: before, during, and after photo evidence; moisture mapping and readings; a detailed scope of works and methodology report; progress updates throughout the restoration; and a final completion certificate. This package gives the building owner everything they need to lodge an insurance claim for reimbursement.',
  },
  {
    question: 'Can I set up a preferred supplier arrangement for my entire portfolio?',
    answer: 'Yes. We offer preferred supplier arrangements for property management agencies managing multiple properties. You receive a single point of contact, consistent service standards across your portfolio, priority response times, and quarterly reporting on all jobs. Contact us to discuss terms for your agency.',
  },
  {
    question: 'Do you work after hours and on weekends?',
    answer: 'Yes — Disaster Recovery operates 24/7/365 with no additional after-hours surcharges on the emergency make-safe fee. Property damage does not wait for business hours, and neither do we. Our NRPG contractor network has certified technicians available around the clock across Australia.',
  },
  {
    question: 'What is the emergency make-safe fee?',
    answer: 'The emergency make-safe fee is $2,750, which covers a $550 platform fee and $2,200 held for the attending contractor. This covers the emergency dispatch, initial damage assessment, water extraction or temporary weatherproofing, and insurance-compliant documentation. Full restoration is scoped and quoted separately after the emergency is stabilised. Payment plans are available through Blue Fire Finance.',
  },
];

// Trusted static content — safe to serialise as JSON-LD
const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export default function PropertyManagersPage() {
  return (
    <>
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
          heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
          icon: <Building2 className="h-12 w-12" />,
          title: 'Emergency Restoration for Property Managers',
          subtitle: 'Your tenant is calling at 2am with water pouring through the ceiling. You need a certified restoration company on-site within the hour — not tomorrow morning.',
        }}
        cta={{ text: 'Set Up Emergency Protocol', href: '/claim' }}
        ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'For Business', href: '/for' },
          { label: 'Property Managers' },
        ]}
        stats={[
          { label: 'Response Time', value: '< 60 min' },
          { label: 'Available', value: '24/7/365' },
          { label: 'Coverage', value: 'Australia-Wide' },
          { label: 'Documentation', value: 'Full Reports' },
        ]}
        sections={[
          /* ------------------------------------------------------------------ */
          /* Section 1: Emergency Protocol (default bg)                          */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Emergency Protocol — What to Do Right Now',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  When a tenant calls you with property damage — water pouring through the ceiling,
                  smoke damage after a kitchen fire, storm debris through a window — the first 60 minutes
                  determine whether you are dealing with a $5,000 repair or a $50,000 restoration. Acting
                  quickly is not optional; it is your professional obligation and the single most effective
                  way to contain the loss.
                </p>

                <h3>Step 1: Ensure the Tenant&apos;s Safety</h3>
                <p>
                  Before anything else, confirm the tenant is safe. If there is structural risk, electrical
                  hazard, or gas leak, instruct the tenant to evacuate and call 000. Do not allow anyone back
                  into the property until the relevant authority (fire brigade, SES, or a licensed electrician)
                  has cleared it. Document this instruction in writing — a text message or email is sufficient.
                </p>

                <h3>Step 2: Instruct the Tenant to Mitigate Further Damage</h3>
                <p>
                  Where it is safe to do so, ask the tenant to take these immediate actions:
                </p>
                <ul>
                  <li><strong>Water damage:</strong> Turn off the water at the mains. Move furniture and valuables off wet carpet or flooring. Place towels around the affected area.</li>
                  <li><strong>Fire or smoke damage:</strong> Do not enter until cleared by fire services. Open windows for ventilation once cleared. Do not attempt to clean soot — incorrect cleaning permanently sets stains into surfaces.</li>
                  <li><strong>Storm damage:</strong> Move away from broken glass or exposed structural elements. Cover exposed areas with plastic sheeting or tarpaulins if safe to do so.</li>
                </ul>

                <h3>Step 3: Document the Damage</h3>
                <p>
                  Ask the tenant to take photos and videos of the damage immediately, before any cleanup
                  begins. This contemporaneous evidence is critical for the building owner&apos;s insurance
                  claim. Timestamp the photos if possible — most smartphones do this automatically. Send them
                  to you via text or email so you have them on file.
                </p>

                <h3>Step 4: Contact Disaster Recovery</h3>
                <p>
                  <Link href="/claim" className="text-blue-600 hover:underline font-medium">Lodge a claim online</Link> — it takes
                  under five minutes and is available 24/7. An IICRC-certified contractor from our NRPG network
                  will contact you within 60 minutes and can be on-site within the hour. Our contractors operate
                  Australia-wide and respond at all hours, including weekends and public holidays.
                </p>

                <h3>Step 5: Notify the Building Owner</h3>
                <p>
                  Contact the building owner as soon as practically possible. Provide the photos from the
                  tenant, a summary of what has happened, and confirmation that you have engaged a certified
                  restoration company. If you cannot reach the owner immediately, proceed with the emergency
                  make-safe — your duty of care requires you to take reasonable steps to prevent further
                  damage, and most management agreements authorise emergency expenditure for exactly this
                  situation.
                </p>
              </div>
            ),
          },

          /* ------------------------------------------------------------------ */
          /* Section 2: Your Responsibilities (light bg)                         */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Your Responsibilities During a Loss',
            background: 'light',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  As a managing agent, you hold a dual duty of care — to the tenant occupying the property
                  and to the building owner who has entrusted you with their asset. Understanding where these
                  responsibilities begin and end is critical, both for protecting the people involved and for
                  protecting yourself from liability.
                </p>

                <h3>Duty of Care to Tenants</h3>
                <p>
                  Under the <em>Residential Tenancies Act</em> in each state and territory, landlords (and by
                  extension, their managing agents) are required to provide premises that are fit for habitation,
                  maintained in a reasonable state of repair, and compliant with health and safety standards.
                  When property damage occurs, this translates to a practical obligation: you must take reasonable
                  steps to ensure the tenant&apos;s safety and to arrange repairs without unreasonable delay.
                </p>
                <p>
                  If a property is rendered uninhabitable — for example, by significant water damage, fire
                  damage, or mould contamination — the tenant may be entitled to a rent reduction or to
                  terminate the lease. Acting quickly to engage a qualified restoration company demonstrates
                  that you are meeting your obligations and mitigates the risk of a tribunal dispute.
                </p>

                <h3>Duty of Care to Building Owners</h3>
                <p>
                  Your management agreement with the building owner typically authorises you to arrange
                  emergency repairs up to a specified threshold (commonly $500 to $2,000 depending on the
                  state). For expenditure beyond that threshold, you would normally seek the owner&apos;s
                  approval. However, where delay would result in further damage — for example, a burst pipe
                  flooding multiple rooms overnight — you have both the authority and the obligation to act.
                </p>
                <p>
                  Document every decision. Send the owner an email or text message explaining the emergency,
                  what action you have taken, and why you could not wait for approval. This protects you and
                  provides the owner with the information they need for their insurance claim.
                </p>

                <h3>When You Must Act Immediately</h3>
                <ul>
                  <li><strong>Active water ingress</strong> — a burst pipe, overflowing fixture, or roof leak during rain. Every hour of delay multiplies the affected area and the cost of restoration.</li>
                  <li><strong>Fire or smoke damage</strong> — soot is acidic and causes progressive damage to surfaces. Delay allows corrosion, staining, and odour to penetrate deeper into materials.</li>
                  <li><strong>Sewage overflow</strong> — a Category 3 biohazard under IICRC standards. The property is uninhabitable until professionally decontaminated.</li>
                  <li><strong>Storm damage with exposed interior</strong> — broken windows or roof damage during a weather event. Temporary weatherproofing is essential to prevent cascading water damage.</li>
                </ul>

                <h3>When You Can Wait for Owner Approval</h3>
                <p>
                  If the damage is contained, not worsening, and poses no safety risk — for example, a small
                  stain on a ceiling with no active leak, or minor cosmetic damage from a resolved incident —
                  you can wait for the owner to make a decision. Even in these cases, document the damage with
                  photos and notify the owner promptly so they can engage their insurer if they choose to.
                </p>

                <h3>Liability Risks of Delayed Action</h3>
                <p>
                  Failing to act on an emergency can expose you to claims from both sides. A tenant whose
                  health is affected by untreated mould, or whose belongings are damaged by water you failed
                  to address, may seek compensation through the relevant tenancy tribunal. A building owner
                  whose insurance claim is reduced because secondary damage could have been prevented may hold
                  the managing agent responsible for the difference. The cost of a 60-minute emergency response
                  is almost always a fraction of the cost of inaction.
                </p>
              </div>
            ),
          },

          /* ------------------------------------------------------------------ */
          /* Section 3: Who Pays (default bg)                                    */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Who Pays — Owner vs Tenant vs Body Corporate',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  One of the most common questions property managers face during a loss event is: who
                  pays for what? The answer depends on the type of property, the nature of the damage, and
                  the insurance policies in place. Here is how it typically works.
                </p>

                <h3>Building Owner&apos;s Insurance (Landlord Insurance)</h3>
                <p>
                  The building owner&apos;s landlord insurance policy typically covers damage to the
                  structure and fixtures — walls, floors, ceilings, built-in cabinetry, plumbing, and
                  electrical. This is the policy that covers most restoration work after water damage, fire,
                  or storm events. The building owner lodges a claim with their insurer and provides the
                  documentation from the restoration company to support their claim for reimbursement.
                </p>

                <h3>Tenant&apos;s Contents Insurance</h3>
                <p>
                  The tenant&apos;s contents insurance covers their personal belongings — furniture,
                  electronics, clothing, and stock (for commercial tenants). If a tenant&apos;s belongings
                  are damaged during a covered event, they claim under their own policy. As a property
                  manager, it is worth reminding tenants at lease signing that contents insurance is their
                  responsibility and is strongly recommended. Many tenants do not carry contents insurance
                  and discover this gap only after a loss event.
                </p>

                <h3>Body Corporate Insurance (Strata Properties)</h3>
                <p>
                  In strata-titled properties, the body corporate (or owners corporation) holds the
                  building insurance policy, which covers common property — shared walls, corridors,
                  car parks, lobbies, roofing, and external structures. Individual lot owners are responsible
                  for insuring their own lot improvements (internal walls, flooring, fixtures above the
                  standard finishes). This distinction varies by state — in Queensland, for example,
                  the <em>Body Corporate and Community Management Act 1997</em> defines what constitutes
                  common property differently from the <em>Strata Schemes Management Act 2015</em> in
                  New South Wales.
                </p>

                <h3>How Disaster Recovery Billing Works</h3>
                <p>
                  <strong>We bill you directly — the client who engages us.</strong> In most cases, this is the
                  building owner or the managing agent acting on their behalf. Work begins immediately upon
                  engagement, with no need to wait for insurer approval, scope negotiations, or claims
                  assessors. You control the process from start to finish.
                </p>
                <p>
                  We provide full documentation — photos, moisture readings, scope of works, progress reports,
                  and a compliant tax invoice — so the building owner has everything their insurer requires to
                  lodge a claim for reimbursement.
                </p>

                <h3>The $2,750 Emergency Make-Safe Fee</h3>
                <p>
                  The emergency make-safe fee is <strong>$2,750</strong>, broken down as:
                </p>
                <ul>
                  <li><strong>$550 platform fee</strong> — covers emergency dispatch, contractor matching, and claims coordination through the Disaster Recovery platform</li>
                  <li><strong>$2,200 held for the attending contractor</strong> — covers emergency attendance, initial damage assessment, water extraction or temporary weatherproofing, and insurance-compliant documentation</li>
                </ul>
                <p>
                  This covers the emergency response only. Full restoration is scoped and quoted separately
                  once the property is stabilised.{' '}
                  <Link href="/insurance/emergency-make-safe-guide" className="text-blue-600 hover:underline font-medium">
                    Read the full Emergency Make-Safe Guide →
                  </Link>
                </p>

                <h3>Payment Plans</h3>
                <p>
                  If the building owner or your agency needs to manage cash flow while the insurance claim is
                  being processed, flexible payment plans are available through{' '}
                  <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                    Blue Fire Finance
                  </a>. This allows restoration work to proceed without delay while the financial side is
                  resolved at a manageable pace.
                </p>
              </div>
            ),
          },

          /* ------------------------------------------------------------------ */
          /* Section 4: Documentation (light bg)                                 */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Documentation We Provide',
            background: 'light',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  As a property manager, you are the conduit between the restoration company and the
                  building owner. The owner needs comprehensive documentation to lodge their insurance claim,
                  and you need documentation to demonstrate that you managed the incident professionally. Our
                  documentation package is designed to serve both purposes.
                </p>

                <h3>Photo Documentation — Before, During, and After</h3>
                <p>
                  Every job is documented with timestamped photographs at three stages: on arrival (showing
                  the full extent of damage), during the restoration process (showing equipment placement,
                  affected areas under treatment, and progress), and on completion (showing the restored
                  condition). These photos form the evidentiary backbone of the building owner&apos;s insurance
                  claim.
                </p>

                <h3>Moisture Mapping and Readings</h3>
                <p>
                  For water damage events, our contractors produce moisture maps showing affected areas,
                  moisture readings at each measurement point, and drying progress over the course of the
                  restoration. This data is critical for demonstrating to insurers that the scope of works
                  was necessary and that drying was achieved to IICRC S500 standards.
                </p>

                <h3>Scope of Works and Methodology</h3>
                <p>
                  A detailed scope document outlines exactly what work was performed, the methodology used
                  (referencing IICRC standards where applicable), the equipment deployed, and the timeline
                  of the restoration. This scope supports the tax invoice and gives the insurer confidence
                  that the work was performed to industry standards.
                </p>

                <h3>Progress Reports</h3>
                <p>
                  For multi-day restorations, you and the building owner receive progress reports at key
                  milestones — typically daily during active drying, and at each phase transition (e.g.,
                  from water extraction to structural drying to reconstruction). These reports include
                  updated moisture readings, photos, and an estimated completion timeline.
                </p>

                <h3>Final Completion Certificate</h3>
                <p>
                  On completion, our contractor issues a formal completion certificate confirming that the
                  restoration has been completed to IICRC standards and that the property has been returned
                  to a safe, habitable condition. This certificate, combined with the photo documentation
                  and scope of works, gives the building owner a complete claims package ready for
                  submission to their insurer.
                </p>

                <h3>Everything the Building Owner Needs</h3>
                <p>
                  The entire documentation package is provided digitally and can be forwarded directly to the
                  building owner for their insurance claim. You do not need to compile reports, chase
                  contractors for photos, or explain the scope to the insurer yourself — we provide a
                  professional, self-contained package that speaks for itself.
                </p>
              </div>
            ),
          },

          /* ------------------------------------------------------------------ */
          /* Section 5: Preferred Supplier (default bg)                          */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Preferred Supplier Arrangements',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  If you manage multiple properties — whether a portfolio of 20 residential rentals or 200
                  commercial tenancies — a preferred supplier arrangement with Disaster Recovery eliminates
                  the guesswork from emergency response. Instead of scrambling to find a restoration company
                  at 3am, you have a pre-established protocol and a single number to call.
                </p>

                <h3>How Preferred Supplier Arrangements Work</h3>
                <p>
                  We work with your agency to establish a standing arrangement that covers your entire
                  portfolio. This includes:
                </p>
                <ul>
                  <li><strong>Single point of contact</strong> — a dedicated relationship manager who knows your portfolio, your processes, and your reporting requirements</li>
                  <li><strong>Consistent service standards</strong> — every property in your portfolio receives the same IICRC-certified response, the same documentation, and the same professionalism, regardless of location</li>
                  <li><strong>Priority response</strong> — preferred partners receive priority dispatch, meaning your properties are at the front of the queue when emergencies occur during peak demand (such as after a major storm event)</li>
                  <li><strong>Quarterly portfolio reporting</strong> — a summary of all jobs across your portfolio, including response times, costs, completion rates, and common damage types. This data helps you identify recurring issues (e.g., a building with repeated water damage may have a plumbing defect requiring capital works)</li>
                </ul>

                <h3>Onboarding Your Agency</h3>
                <p>
                  Setting up a preferred supplier arrangement is straightforward. We meet with your team
                  (in person or via video) to understand your portfolio, your internal processes, and your
                  after-hours protocols. We then provide your property managers and after-hours answering
                  service with a clear emergency protocol card — a single-page reference that any team member
                  can follow at 2am under pressure.
                </p>

                <h3>Training for Your Team</h3>
                <p>
                  We offer complimentary training sessions for your property management team covering
                  emergency response best practices, documentation requirements, and common mistakes that
                  increase restoration costs. These sessions can be delivered as part of your regular team
                  meetings and are tailored to the types of properties in your portfolio.
                </p>

                <p>
                  <Link href="/services/commercial-services" className="text-blue-600 hover:underline font-medium">
                    View our full commercial services offering →
                  </Link>
                </p>
              </div>
            ),
          },

          /* ------------------------------------------------------------------ */
          /* Section 6: After-Hours Protocol (light bg)                          */
          /* ------------------------------------------------------------------ */
          {
            heading: 'After-Hours Emergency Protocol',
            background: 'light',
            body: (
              <div className="prose prose-lg max-w-none">
                <p>
                  Property emergencies do not respect business hours. Burst pipes at midnight, storm
                  damage at 4am, fire alarms at dawn on a Sunday — these are the calls that define the
                  quality of your property management service. Having a reliable after-hours emergency
                  protocol is not a luxury; it is a baseline expectation of building owners and tenants
                  alike.
                </p>

                <h3>Our 24/7 Emergency Response</h3>
                <p>
                  Disaster Recovery operates around the clock, every day of the year. When you{' '}
                  <Link href="/claim" className="text-blue-600 hover:underline font-medium">lodge a claim online</Link>,
                  our system immediately matches your property with an IICRC-certified contractor from
                  the NRPG network in your area. The contractor will contact you within 60 minutes and
                  can be on-site within the hour — at 2pm or 2am, on Christmas Day or a Tuesday in July.
                </p>

                <h3>What Happens When You Call After Hours</h3>
                <p>
                  Our online claim system is available 24/7 and triggers an immediate response. There is no
                  answering machine, no call-back queue, no &quot;we&apos;ll get to it in the morning&quot;
                  delay. The process is identical whether you lodge at midday or midnight:
                </p>
                <ol>
                  <li>You lodge the claim online with property details, damage type, and photos</li>
                  <li>Our system matches a certified contractor in your area within minutes</li>
                  <li>The contractor contacts you within 60 minutes to discuss the situation</li>
                  <li>The contractor is on-site within the hour to perform emergency make-safe</li>
                </ol>

                <h3>Briefing Your Tenants</h3>
                <p>
                  We recommend providing every tenant with an emergency response card at lease signing.
                  This card should include:
                </p>
                <ul>
                  <li><strong>Your agency&apos;s after-hours number</strong> — so the tenant calls you first</li>
                  <li><strong>Basic safety instructions</strong> — turn off water mains, do not enter if structural risk, evacuate if gas or electrical hazard</li>
                  <li><strong>Documentation instructions</strong> — take photos and video before touching anything</li>
                  <li><strong>What to expect</strong> — a certified restoration technician will attend within 60 minutes once you have been notified</li>
                </ul>
                <p>
                  This prevents tenants from attempting DIY cleanup (which often worsens damage and
                  compromises the insurance claim), panicking because they do not know what to do, or
                  waiting until morning to report damage that is actively worsening.
                </p>

                <h3>Integrating With Your Answering Service</h3>
                <p>
                  If your agency uses an after-hours answering service, we can provide them with a decision
                  tree specific to property emergencies. This ensures that genuine emergencies are escalated
                  to you immediately (with a simultaneous claim lodged with Disaster Recovery), while
                  non-urgent maintenance requests are queued for the next business day. The goal is simple:
                  zero delay between a tenant reporting an emergency and a certified contractor being
                  dispatched.
                </p>
              </div>
            ),
          },

          /* ------------------------------------------------------------------ */
          /* Section 7: FAQs (dark bg)                                           */
          /* ------------------------------------------------------------------ */
          {
            heading: 'Frequently Asked Questions',
            background: 'dark',
            body: (
              <div className="prose prose-lg max-w-none prose-invert">
                {faqData.map((faq, i) => (
                  <details key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '1rem' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '1.1rem', padding: '0.5rem 0' }}>
                      {faq.question}
                    </summary>
                    <p style={{ marginTop: '0.75rem', opacity: 0.9 }}>
                      {faq.answer}
                    </p>
                  </details>
                ))}

                <p style={{ marginTop: '2rem' }}>
                  Have a question not covered here?{' '}
                  <Link href="/claim" className="text-blue-300 hover:underline font-medium">
                    Contact us
                  </Link>{' '}
                  or visit our{' '}
                  <Link href="/for" className="text-blue-300 hover:underline font-medium">
                    business services hub
                  </Link>{' '}
                  for more information.
                </p>
              </div>
            ),
          },
        ]}
        relatedPages={[
          {
            title: 'Commercial Services',
            href: '/services/commercial-services',
            description: 'Restoration services for offices, retail, hospitality, healthcare, and industrial properties.',
          },
          {
            title: 'Emergency Make-Safe Guide',
            href: '/insurance/emergency-make-safe-guide',
            description: 'Detailed breakdown of the $2,750 emergency make-safe fee and what it covers.',
          },
          {
            title: 'For Business Hub',
            href: '/for',
            description: 'Restoration solutions for property managers, strata managers, business owners, and councils.',
          },
          {
            title: 'How It Works',
            href: '/how-it-works',
            description: 'The complete 6-step journey from property damage to full restoration.',
          },
        ]}
      />

      {/* Inline FAQ Schema — FAQPage structured data for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
    </>
  );
}
