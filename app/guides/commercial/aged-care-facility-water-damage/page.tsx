import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Aged Care Facility Water Damage Restoration — Compliance and Response',
  description: 'Water and flood damage restoration for aged care facilities and nursing homes. Infection control, NDIS/Aged Care Quality Standards compliance, and minimal resident disruption.',
  keywords: 'aged care water damage restoration, nursing home flood damage, aged care facility restoration, infection control water damage, ACQSC compliance restoration, NDIS water damage',
  alternates: { canonical: `${NAP.url}/guides/commercial/aged-care-facility-water-damage` },
};

const lastReviewed = '2026-04-09';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the regulatory requirements for water damage restoration in aged care facilities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aged care facilities must comply with the Aged Care Quality Standards (Department of Health and Aged Care), which mandate infection control procedures, safe physical environments, and continuity of care. Water damage events trigger obligations under Standard 3 (Care and Services) and Standard 5 (Organisation\u2019s Service Environment). Facilities that are also registered NDIS providers must additionally comply with NDIS Quality and Safeguards Commission requirements. Contractors working in aged care must complete facility inductions, hold appropriate insurances, and follow infection control protocols specified by the facility\u2019s infection control officer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you minimise disruption to aged care residents during restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zone containment is the primary strategy \u2014 isolating the affected area from resident zones using temporary barriers and negative air pressure to prevent airborne contamination spread. HEPA air scrubbers remove mould spores and particulates before they reach resident areas. Mobile drying units are positioned outside resident rooms where possible to minimise noise. Restoration activities involving loud equipment or strong odours are scheduled during periods when residents are in communal spaces or away from the affected zone. For significant damage affecting resident rooms, the facility manager coordinates temporary room reassignments or, in severe cases, temporary transfers to partner facilities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does aged care insurance cover water damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial property policies for aged care facilities typically cover structural damage and building contents. Business interruption extensions cover revenue loss or additional costs incurred to maintain care services during the restoration period. Operators should confirm whether their government-funded bed allocation creates separate compliance obligations that affect the business interruption calculation. Some facilities operating under aged care approvals have specific insurance obligations stipulated in their approval conditions. Review your policy PDS for exclusions related to gradual deterioration, maintenance failure, or flood.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly must aged care facilities report water damage incidents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the Serious Incident Response Scheme (SIRS), aged care providers must notify the Aged Care Quality and Safety Commission (ACQSC) within 24 hours of becoming aware of a serious incident where a consumer is at risk. Water damage that creates an infection risk (Category 2 or 3 water), renders essential services unavailable, or requires emergency resident relocation triggers SIRS reporting obligations. Internal incident management procedures must be initiated immediately. The facility\u2019s infection control officer should assess the water category and document the infection risk determination as part of the SIRS notification record.',
      },
    },
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Aged Care Facility Water Damage Restoration — Compliance and Response',
  dateModified: lastReviewed,
  author: { '@type': 'Organization', name: NAP.name },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Aged Care Facility Water Damage Restoration',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Australia' },
  serviceType: 'Commercial Water Damage Restoration',
  description: 'IICRC-certified water damage restoration for aged care facilities and nursing homes, with infection control protocols, ACQSC compliance documentation, and minimal resident disruption.',
};

export default function AgedCareFacilityWaterDamagePage() {
  return (
    <>
      <Script id="acfwd-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="acfwd-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="acfwd-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Commercial Restoration"
        title="Aged Care Facility Water Damage Restoration — Compliance and Response"
        subtitle="Expert answers and solutions for"
        gradient="linear-gradient(135deg, #1A237E 0%, #1565C0 100%)"
        icon={<Building2 className="h-10 w-10" />}
        lastReviewed={lastReviewed}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Commercial', href: '/guides/commercial' },
          { label: 'Aged Care Facility Water Damage' },
        ]}
        cta={{ text: 'Get Emergency Aged Care Response', href: '/claim' }}
        sections={[
          {
            heading: 'Aged Care Water Damage — Unique Challenges',
            body: (
              <div className="space-y-4">
                <p>
                  Water damage in an aged care facility or nursing home presents challenges that simply do not arise in standard commercial restorations. The resident population is vulnerable by definition &mdash; elderly, often immunocompromised, reliant on consistent routines and familiar environments. The regulatory framework governing aged care operations creates obligations that affect every aspect of the restoration response.
                </p>
                <p>
                  <strong>Infection control obligations</strong> are the most critical operational constraint. Any water event classified as Category 2 (grey water, mild contamination) or Category 3 (black water, sewage or floodwater contact) creates an immediate infection risk that must be contained before restoration works can proceed. The facility&apos;s infection control officer must be consulted from the moment the water event is identified.
                </p>
                <p>
                  <strong>The resident population</strong> cannot simply relocate while restoration proceeds. Residents with dementia, mobility limitations, or high care needs may be deeply distressed by environmental disruption. Noise, odours, unfamiliar workers, and changes to room configurations can trigger behavioural responses, falls, or deterioration in residents with cognitive impairment. Restoration planning must account for clinical risk, not just physical risk.
                </p>
                <p>
                  <strong>Regulatory oversight</strong> from the Aged Care Quality and Safety Commission (ACQSC) adds a compliance dimension absent from most commercial restorations. Significant water events that affect service delivery, resident safety, or the physical environment may trigger notification obligations under the Serious Incident Response Scheme (SIRS) and must be documented accordingly.
                </p>
                <p>
                  <strong>Heritage building stock</strong> is common in older residential aged care facilities, particularly in metropolitan areas. Lead paint, asbestos-containing materials in ceiling cavities and behind linings, and heritage-listed fabric all add complexity to the scope of works and documentation requirements.
                </p>
                <p>
                  <strong>HVAC contamination risk</strong> is heightened in aged care due to the vulnerability of the resident population. Water intrusion into central air handling systems or ceiling-mounted fan coil units can spread mould spores throughout the facility if the HVAC continues to operate before the water source is isolated and the system inspected.
                </p>
              </div>
            ),
          },
          {
            heading: 'Infection Control During Restoration',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Infection control during restoration in an aged care facility requires a higher standard of practice than a standard commercial water damage response. The facility&apos;s infection control policy takes precedence, and all restoration contractors must follow it.
                </p>
                <p>
                  <strong>Containment barriers</strong> are established at the perimeter of the affected zone using heavy-duty poly sheeting with zipper access panels. The goal is a physical barrier that prevents dust, particulates, and airborne spores from entering resident areas during demolition and drying.
                </p>
                <p>
                  <strong>HEPA filtration and negative air pressure</strong> are standard practice. Air scrubbers with HEPA filters are operated continuously within the containment zone, exhausted to the exterior of the building where possible. Negative air pressure within the work zone ensures that any air movement is directed inward, preventing contaminated air from escaping into occupied areas.
                </p>
                <p>
                  <strong>PPE requirements</strong> for contractors working in aged care water damage situations are more stringent than standard commercial sites. Category 2 and 3 water events require respiratory protection, eye protection, disposable coveralls, and gloves at minimum. Contractors must don and doff PPE in a designated area to prevent cross-contamination.
                </p>
                <p>
                  <strong>Cat 2 and Cat 3 water protocol</strong> requires immediate removal and disposal of all porous materials that have been contacted by contaminated water. Carpet, underlay, and lower sections of plasterboard lining in affected areas are removed and disposed of as contaminated waste. All structural surfaces are treated with hospital-grade antimicrobial agents and the treatment documented.
                </p>
                <p>
                  <strong>Antimicrobial treatment documentation</strong> is provided to the facility for ACQSC compliance purposes. The documentation records the products used, application method, coverage area, and dwell times, providing evidence that decontamination was performed to protocol.
                </p>
              </div>
            ),
          },
          {
            heading: 'Regulatory Compliance Requirements',
            body: (
              <div className="space-y-4">
                <p>
                  Aged care facilities operate under a complex compliance framework that intersects directly with water damage response. Understanding these requirements from the outset prevents compliance failures that can expose the operator to regulatory action.
                </p>
                <p>
                  <strong>Aged Care Quality Standards</strong> — particularly Standard 3 (Care and Services) and Standard 5 (Organisation&apos;s Service Environment) — require that the facility maintain a safe and clean physical environment and respond promptly to risks to consumer safety. A water damage event that compromises the physical environment engages both standards. Documentation of the facility&apos;s response, including contractor engagement, infection control measures, and resident management, is critical for demonstrating compliance.
                </p>
                <p>
                  <strong>SIRS reporting thresholds</strong> must be assessed as soon as a water event is identified. If the event creates an immediate risk to consumer safety (e.g., Category 3 water with infection risk, structural instability requiring room evacuation, or loss of essential services), the 24-hour ACQSC notification obligation is triggered. The facility must also document the event in its internal incident management system regardless of whether SIRS notification is required.
                </p>
                <p>
                  <strong>ACQSC notification</strong> should be prepared with specific reference to the actions taken, the infection control measures implemented, and the timeline for restoration. A restoration contractor who provides detailed documentation &mdash; including moisture readings, antimicrobial treatment records, and daily progress reports &mdash; directly supports the facility&apos;s compliance documentation obligations.
                </p>
                <p>
                  <strong>Contractor induction requirements</strong> for aged care sites include criminal history screening, infection control training, and facility-specific induction. All restoration contractors deployed to aged care facilities through the Disaster Recovery platform hold the necessary background checks and can complete facility inductions prior to commencement.
                </p>
              </div>
            ),
          },
          {
            heading: 'Business Continuity for Aged Care Operators',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Maintaining care continuity during restoration is the defining challenge for aged care operators facing a water damage event. Unlike commercial tenants who can work remotely or temporarily relocate, aged care providers must sustain 24-hour care delivery regardless of the physical environment.
                </p>
                <p>
                  <strong>Zone-by-zone restoration sequencing</strong> allows the facility to maintain operations in unaffected wings while restoration proceeds in the damaged area. The restoration plan is developed in consultation with the facility manager to prioritise rooms and areas based on occupancy, clinical acuity of residents in affected zones, and the operational functions of affected spaces.
                </p>
                <p>
                  <strong>Temporary room arrangements</strong> for residents displaced from affected rooms require coordination with the facility&apos;s clinical team. Residents with complex care needs may require enhanced monitoring during a room change. Documentation of all temporary relocations is maintained as part of the facility&apos;s incident record.
                </p>
                <p>
                  <strong>Insurance business interruption claims</strong> for aged care facilities typically involve additional costs incurred to maintain care delivery during restoration &mdash; such as enhanced staffing for resident monitoring during disruption, temporary equipment hire, and additional cleaning costs. These must be tracked and documented from day one.
                </p>
                <p>
                  <strong>Emergency procurement procedures</strong> may be required for essential equipment that has been damaged &mdash; hospital beds, medical equipment, assistive devices. The facility&apos;s insurer may need to approve emergency replacements. NRPG contractors provide photographic documentation and itemised loss reports that support fast-track insurer approval of emergency replacements.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What are the regulatory requirements for water damage restoration in aged care facilities?',
            answer: 'Aged care facilities must comply with the Aged Care Quality Standards (Department of Health and Aged Care), which mandate infection control procedures, safe physical environments, and continuity of care. Water damage events trigger obligations under Standard 3 (Care and Services) and Standard 5 (Organisation\u2019s Service Environment). Facilities that are also registered NDIS providers must additionally comply with NDIS Quality and Safeguards Commission requirements. Contractors working in aged care must complete facility inductions, hold appropriate insurances, and follow infection control protocols specified by the facility\u2019s infection control officer.',
          },
          {
            question: 'How do you minimise disruption to aged care residents during restoration?',
            answer: 'Zone containment is the primary strategy \u2014 isolating the affected area from resident zones using temporary barriers and negative air pressure to prevent airborne contamination spread. HEPA air scrubbers remove mould spores and particulates before they reach resident areas. Mobile drying units are positioned outside resident rooms where possible to minimise noise. Restoration activities involving loud equipment or strong odours are scheduled during periods when residents are in communal spaces or away from the affected zone. For significant damage affecting resident rooms, the facility manager coordinates temporary room reassignments or, in severe cases, temporary transfers to partner facilities.',
          },
          {
            question: 'Does aged care insurance cover water damage restoration?',
            answer: 'Commercial property policies for aged care facilities typically cover structural damage and building contents. Business interruption extensions cover revenue loss or additional costs incurred to maintain care services during the restoration period. Operators should confirm whether their government-funded bed allocation creates separate compliance obligations that affect the business interruption calculation. Some facilities operating under aged care approvals have specific insurance obligations stipulated in their approval conditions. Review your policy PDS for exclusions related to gradual deterioration, maintenance failure, or flood.',
          },
          {
            question: 'How quickly must aged care facilities report water damage incidents?',
            answer: 'Under the Serious Incident Response Scheme (SIRS), aged care providers must notify the Aged Care Quality and Safety Commission (ACQSC) within 24 hours of becoming aware of a serious incident where a consumer is at risk. Water damage that creates an infection risk (Category 2 or 3 water), renders essential services unavailable, or requires emergency resident relocation triggers SIRS reporting obligations. Internal incident management procedures must be initiated immediately. The facility\u2019s infection control officer should assess the water category and document the infection risk determination as part of the SIRS notification record.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Healthcare and Medical Restoration',
            href: '/industries/healthcare-medical',
            description: 'Specialist restoration services for hospitals, medical centres, and healthcare facilities.',
          },
          {
            title: 'Water Damage Restoration Cost Guide',
            href: '/guides/cost-guides/how-much-water-damage-restoration-cost',
            description: 'Understand the cost drivers for water damage restoration across residential and commercial properties.',
          },
          {
            title: 'Structural Drying Process Explained',
            href: '/guides/services/structural-drying-process',
            description: 'How IICRC S500-compliant structural drying works and what to expect during the drying phase.',
          },
        ]}
      />
    </>
  );
}
