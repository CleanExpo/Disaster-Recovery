import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'School and University Flood Damage Restoration — Education Sector Guide',
  description: 'Flood and water damage restoration for schools, universities, and TAFEs. Fast-track drying to minimise class disruption, safe material handling, and insurance claim support.',
  keywords: 'school flood damage restoration, university water damage, TAFE flood damage, education facility water damage, school water damage insurance, flood damage school reopening',
  alternates: { canonical: `${NAP.url}/guides/commercial/school-university-flood-damage` },
};

const lastReviewed = '2026-04-09';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly can a school reopen after flood damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reopening timeline depends on the extent of damage. Targeted extraction and commercial drying can restore a single-room water event in 3\u20135 days, allowing the rest of the school to remain operational throughout. Whole-building inundation from a significant flood event typically requires 4\u20138 weeks from extraction through to building reinstatement and clearance certification. The IICRC S500:2025 standard requires drying to be verified by moisture measurement before reinstatement begins, and mould clearance testing is required before student re-entry if mould was identified. Fast-track scheduling &mdash; including weekend and school holiday works &mdash; is used to reduce the impact on the school calendar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are government schools covered by insurance for flood damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'State government schools are typically covered under state government self-insurance or asset insurance programs administered by the relevant state Department of Education (DET/DOE/equivalent), not through private commercial insurers. The claims process, assessment procedures, and approved contractor panels vary by state. Independent and Catholic schools hold their own commercial property insurance. Universities and TAFEs generally hold institutional insurance policies with specialist education sector coverage. Contact your state DET/DOE facilities team directly to initiate a claim for a government school.',
      },
    },
    {
      '@type': 'Question',
      name: 'What materials in schools are particularly vulnerable to water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Carpet and carpet tiles absorb water and become a mould substrate within 48\u201372 hours if not dried. Particleboard and MDF furniture \u2014 common in school fit-out \u2014 swells and delaminates on contact with water and is typically non-restorable once fully saturated. MDF cabinetry in science labs, home economics rooms, and libraries is similarly vulnerable. Acoustic panels and ceiling tiles are highly absorbent and must be removed if wetted. IT equipment and network infrastructure requires specialist electronic assessment. Library stock requires immediate triage \u2014 some books and archival materials can be stabilised by freeze-drying if treated within 48 hours. Gymnasium timber sprung floors are particularly sensitive to moisture and require specialist drying protocols.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is mould risk managed in schools after flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould can establish within 48\u201372 hours of water contact in warm, humid conditions. In a school environment, mould remediation must comply with IICRC S520 protocol. HEPA air scrubbing is operated throughout the remediation. If mould is identified in an area exceeding 1 square metre, notification to the relevant state Health Department or school authority may be required. Air quality testing is conducted after remediation to confirm spore levels are within acceptable limits before students re-enter the affected area. The restoration contractor provides a clearance certificate confirming post-remediation air quality. This certificate is required documentation before the school principal can authorise student re-entry.',
      },
    },
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'School and University Flood Damage Restoration — Education Sector Guide',
  dateModified: lastReviewed,
  author: { '@type': 'Organization', name: NAP.name },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'School and University Flood Damage Restoration',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Australia' },
  serviceType: 'Commercial Flood Damage Restoration',
  description: 'Fast-track flood and water damage restoration for schools, universities, and TAFEs across Australia, with mould clearance certification and insurance claim documentation.',
};

export default function SchoolUniversityFloodDamagePage() {
  return (
    <>
      <Script id="sufd-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="sufd-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="sufd-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Commercial Restoration"
        title="School and University Flood Damage Restoration — Education Sector Guide"
        subtitle="Expert answers and solutions for"
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Building2 className="h-10 w-10" />}
        lastReviewed={lastReviewed}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Commercial', href: '/guides/commercial' },
          { label: 'School and University Flood Damage' },
        ]}
        cta={{ text: 'Get Fast-Track School Restoration', href: '/claim' }}
        sections={[
          {
            heading: 'School and University Water Damage — Key Considerations',
            body: (
              <div className="space-y-4">
                <p>
                  Education facilities face water damage restoration challenges distinct from those of most commercial properties. The primary obligation is student safety, which adds requirements that go beyond the standard commercial restoration scope &mdash; independent clearance testing, air quality certification, and formal sign-off before re-entry are all standard expectations in the education sector.
                </p>
                <p>
                  <strong>Student safety</strong> is the non-negotiable priority. No area of a school or university may be reoccupied by students until the restoration contractor has verified that drying is complete (by moisture measurement), mould risk has been assessed and addressed, and air quality is within safe limits. The principal or head of facilities has a duty of care obligation that requires formal documentation of restoration completion before authorising re-entry.
                </p>
                <p>
                  <strong>DDA accessibility requirements</strong> for evacuation and alternate routing must be maintained throughout the restoration period. If flood damage has closed corridors or access routes used by students with disabilities, alternate accessible pathways must be identified and clearly signposted before the school can continue operating in the unaffected areas.
                </p>
                <p>
                  <strong>IT infrastructure damage</strong> in modern schools and universities is significant. Classrooms typically contain networked devices, projectors, and interactive displays. Server rooms, network switches, and communications cabinets are often in basement or ground-floor locations that are disproportionately affected by flooding. IT inventory documentation at the time of the flood event is critical for insurance claim purposes.
                </p>
                <p>
                  <strong>Library and archival material</strong> requires specialist triage within 48 hours. Water-damaged books and documents that are identified for retention can be stabilised through freeze-drying. Archival material with historical or administrative significance should be prioritised for specialist salvage assessment.
                </p>
                <p>
                  <strong>Sports hall flooring</strong>, particularly hardwood sprung timber floors, is among the most expensive and technically demanding material to restore after water damage. Subfloor flooding causes severe cupping and buckling. If the floor is to be salvaged rather than replaced, specialist timber floor drying protocols are required from the earliest possible stage.
                </p>
              </div>
            ),
          },
          {
            heading: 'Fast-Track Restoration to Minimise Class Disruption',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Every school day lost to flood damage has a direct educational impact and, for private and independent schools, a financial cost. Fast-track restoration requires advance planning, experienced contractors, and a zone-by-zone approach that keeps as much of the facility operational as possible throughout the process.
                </p>
                <p>
                  <strong>Modular drying equipment</strong> allows a high volume of dehumidifiers, air movers, and desiccant systems to be deployed quickly across large floor areas. Commercial-grade drying equipment operates 24 hours a day, accelerating drying timelines compared to residential-scale equipment. Daily moisture logging documents drying progress and informs the restoration timeline.
                </p>
                <p>
                  <strong>Zone-by-zone restoration</strong> sequences works so that classrooms and learning spaces are restored progressively, with completed rooms returned to the school as each zone is cleared. This approach allows teaching to resume in restored areas while works continue in others, reducing total days of educational disruption compared to a whole-building shutdown approach.
                </p>
                <p>
                  <strong>Temporary classroom setups</strong> can be arranged for situations where a significant number of classrooms are unavailable for an extended period. Demountable or modular classroom units are available at short notice in most states and can be positioned in school grounds to maintain teaching capacity while permanent restoration proceeds. The cost of temporary classrooms is typically covered under insurance business interruption provisions.
                </p>
                <p>
                  <strong>Weekend and school holiday scheduling</strong> is standard practice for education sector restoration. Structural drying continues 24/7 by necessity, but disruptive works (demolition of wet linings, noisy drying equipment, chemical treatments) are concentrated in periods outside school hours. Holiday periods are used for the most intensive phases of the restoration to maximise the return of spaces before the next school term.
                </p>
              </div>
            ),
          },
          {
            heading: 'State vs Private School Insurance Arrangements',
            body: (
              <div className="space-y-4">
                <p>
                  The insurance and claims pathway for flood damage in education facilities varies significantly depending on the school&apos;s sector and governance structure. Understanding which pathway applies determines how quickly restoration can begin and who is the right contact to initiate the process.
                </p>
                <p>
                  <strong>Government schools</strong> in each state operate under state government property insurance programs. The relevant Department of Education (variously styled as DET, DOE, or the department&apos;s current name) manages the facilities and insurance arrangements for government school buildings. Approved contractor panels may apply. The principal&apos;s first call after a flood event should be to the department&apos;s facilities maintenance or emergency line.
                </p>
                <p>
                  <strong>Independent and Catholic schools</strong> hold commercial property insurance policies, similar to other commercial property owners. The school&apos;s bursar or business manager is typically responsible for lodging the insurance claim. Disaster Recovery contractors bill the school directly so restoration begins immediately while the insurance claim is progressed in parallel.
                </p>
                <p>
                  <strong>Universities and TAFEs</strong> typically hold institutional insurance policies negotiated at the entity level, often with specialist education sector coverage provisions. Facilities and estates departments manage the claims process. Large-scale flood events at a university may trigger business interruption provisions covering lost tuition revenue, research continuity costs, and student accommodation loss.
                </p>
                <p>
                  All education sector operators &mdash; regardless of sector &mdash; benefit from the same fundamental principle: restoration begins immediately, billed directly to the operator, so that learning continuity is not held hostage to insurer approval timelines. Full documentation is provided for claim reimbursement.
                </p>
              </div>
            ),
          },
          {
            heading: 'Mould Risk in Education Facilities',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Mould in a school or university building is a regulatory, health, and reputational risk. The requirement for clearance testing and formal re-entry authorisation makes mould remediation in education facilities a more process-intensive exercise than in standard commercial buildings.
                </p>
                <p>
                  <strong>Regulatory notification thresholds</strong> vary by state. As a general guide, identified mould growth in an area exceeding 1 square metre should trigger notification to the relevant state health authority and the school&apos;s governing body. For government schools, the department&apos;s facilities team manages this notification. For independent schools, the principal and board should be informed immediately.
                </p>
                <p>
                  <strong>Air quality requirements</strong> before student re-entry are mandatory in education settings. After mould remediation, independent post-remediation air quality testing is conducted to confirm that spore counts are within safe limits. This testing is performed by an independent third party, not the remediation contractor, to provide an unimpartial clearance result.
                </p>
                <p>
                  <strong>Post-remediation clearance certification</strong> is provided to the school as a formal document confirming that remediation is complete, testing has been performed, and results are within acceptable limits. This certificate is retained by the school as part of its duty of care documentation and may be required by the insurer as a condition of reinstatement payment.
                </p>
                <p>
                  <strong>Parent communication obligations</strong> arise where mould has been identified in areas used by students. Schools have a duty to communicate transparently with parents about the nature of the issue, the remediation steps taken, and the clearance process. The restoration contractor&apos;s documentation &mdash; including the scope of works and clearance certificate &mdash; supports the school in communicating accurate information to the school community.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly can a school reopen after flood damage?',
            answer: 'Reopening timeline depends on the extent of damage. Targeted extraction and commercial drying can restore a single-room water event in 3\u20135 days, allowing the rest of the school to remain operational throughout. Whole-building inundation from a significant flood event typically requires 4\u20138 weeks from extraction through to building reinstatement and clearance certification. The IICRC S500:2025 standard requires drying to be verified by moisture measurement before reinstatement begins, and mould clearance testing is required before student re-entry if mould was identified. Fast-track scheduling \u2014 including weekend and school holiday works \u2014 is used to reduce the impact on the school calendar.',
          },
          {
            question: 'Are government schools covered by insurance for flood damage?',
            answer: 'State government schools are typically covered under state government self-insurance or asset insurance programs administered by the relevant state Department of Education (DET/DOE/equivalent), not through private commercial insurers. The claims process, assessment procedures, and approved contractor panels vary by state. Independent and Catholic schools hold their own commercial property insurance. Universities and TAFEs generally hold institutional insurance policies with specialist education sector coverage. Contact your state DET/DOE facilities team directly to initiate a claim for a government school.',
          },
          {
            question: 'What materials in schools are particularly vulnerable to water damage?',
            answer: 'Carpet and carpet tiles absorb water and become a mould substrate within 48\u201372 hours if not dried. Particleboard and MDF furniture \u2014 common in school fit-out \u2014 swells and delaminates on contact with water and is typically non-restorable once fully saturated. MDF cabinetry in science labs, home economics rooms, and libraries is similarly vulnerable. Acoustic panels and ceiling tiles are highly absorbent and must be removed if wetted. IT equipment and network infrastructure requires specialist electronic assessment. Library stock requires immediate triage \u2014 some books and archival materials can be stabilised by freeze-drying if treated within 48 hours. Gymnasium timber sprung floors are particularly sensitive to moisture and require specialist drying protocols.',
          },
          {
            question: 'How is mould risk managed in schools after flooding?',
            answer: 'Mould can establish within 48\u201372 hours of water contact in warm, humid conditions. In a school environment, mould remediation must comply with IICRC S520 protocol. HEPA air scrubbing is operated throughout the remediation. If mould is identified in an area exceeding 1 square metre, notification to the relevant state Health Department or school authority may be required. Air quality testing is conducted after remediation to confirm spore levels are within acceptable limits before students re-enter the affected area. The restoration contractor provides a clearance certificate confirming post-remediation air quality. This certificate is required documentation before the school principal can authorise student re-entry.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Education and Schools Restoration',
            href: '/industries/education-schools',
            description: 'Specialist restoration services for schools, universities, and TAFE campuses across Australia.',
          },
          {
            title: 'Mould Remediation Cost Guide',
            href: '/guides/cost-guides/how-much-mould-remediation-cost',
            description: 'What drives mould remediation costs in Australia and what to expect from a compliant remediation.',
          },
          {
            title: 'Flood Damage Restoration Cost Guide',
            href: '/guides/cost-guides/how-much-flood-damage-restoration-cost',
            description: 'Cost guide for flood damage restoration across residential and commercial properties in Australia.',
          },
        ]}
      />
    </>
  );
}
