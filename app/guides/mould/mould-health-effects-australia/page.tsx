/**
 * Mould Health Effects — What Australians Need to Know
 *
 * IICRC compliance: references ANSI/IICRC S520 as the certification
 * benchmark. Does NOT reproduce standards text.
 *
 * ACL s18 compliant — no unverified statistics.
 * Legal content: state tenancy act references are for general guidance only,
 * not legal advice. Readers should seek independent legal advice.
 */

import type { Metadata } from 'next'
import Script from 'next/script'
import { Shield } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Mould Health Effects — What Australians Need to Know | Disaster Recovery Australia',
  description:
    'Health effects of mould exposure in Australian homes and workplaces. When mould becomes dangerous, legal obligations for landlords, and when to call a professional.',
  keywords: [
    'mould health effects australia',
    'black mould health risks',
    'mould exposure symptoms',
    'stachybotrys australia',
    'mould landlord obligations',
    'toxic mould australia',
  ],
  alternates: {
    canonical: `${NAP.url}/guides/mould/mould-health-effects-australia`,
  },
  openGraph: {
    title: 'Mould Health Effects — What Australians Need to Know',
    description:
      'Health effects of mould exposure in Australian homes and workplaces. When mould becomes dangerous, legal obligations for landlords, and when to call a professional.',
    url: `${NAP.url}/guides/mould/mould-health-effects-australia`,
    type: 'website',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: NAP.name,
  '@id': `${NAP.url}/#organization`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mould Health and Safety',
  },
  sameAs: NAP.sameAs,
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Professional Mould Assessment',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Mould Assessment and Remediation',
  description:
    'Professional mould assessment for Australian homes and workplaces. Air quality testing, species identification, scope of remediation, and IICRC S520-certified documentation for insurance and tenancy disputes.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the health effects of mould exposure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould exposure can cause respiratory symptoms including coughing and wheezing, asthma exacerbation, and allergic reactions including nasal congestion, eye irritation, and skin rash. Immunocompromised individuals are at higher risk at lower exposure levels. Stachybotrys (black mould) exposure has been linked to severe respiratory issues in cases of prolonged exposure. AIEH guidance indicates that prolonged exposure to elevated mould spore counts poses a health risk. A diagnosis of mould-related illness should be made by a medical professional.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is black mould (Stachybotrys) dangerous in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stachybotrys chartarum requires prolonged cellulose saturation to grow and is less common than other mould species. It produces mycotoxins under certain conditions. The health effects from Stachybotrys exposure are debated in the scientific literature, but AIEH recommends treatment of all visible mould regardless of species. A diagnosis of mould-related illness should be made by a medical professional.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does my landlord have to fix mould in my rental property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All Australian state Residential Tenancies Acts include implied habitability obligations. Landlords must remediate mould that constitutes a health hazard or makes the premises unfit for habitation. Legislative references vary by state: NSW RTRA s52; VIC RTRA s65B; QLD RTRA s185; WA RTRA s42A. This is general information only — seek independent legal advice for your specific situation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many mould spores is dangerous?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no official Australian standard for safe indoor mould spore levels. AIEH and IICRC S520 use outdoor control samples as a reference — indoor spore counts significantly exceeding outdoor background levels indicate problematic contamination. Professional air quality testing is required to quantify indoor spore levels accurately.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I leave my home because of mould?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consider temporary relocation if you are experiencing ongoing respiratory symptoms that resolve when you leave the property, if visible mould exceeds 1m², if the HVAC system is contaminated and distributing spores throughout the home, or if a professional assessment identifies Stachybotrys or Aspergillus fumigatus in significant quantities. Consult a medical professional about any health concerns.',
      },
    },
  ],
}

export default function MouldHealthEffectsAustraliaPage() {
  return (
    <>
      <Script
        id="mhea-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mhea-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mhea-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Health and Safety"
        title="Mould Health Effects — What Australians Need to Know"
        subtitle="Health effects of mould exposure in Australian homes and workplaces, when mould becomes a health risk, landlord obligations, and when to call a professional."
        gradient="linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Mould', href: '/guides/mould' },
          { label: 'Mould Health Effects Australia' },
        ]}
        cta={{ text: 'Get Professional Mould Assessment', href: '/claim' }}
        sections={[
          {
            heading: 'Mould Species Common in Australian Homes',
            body: (
              <>
                <p>
                  Australia&apos;s warm and humid climate in many regions supports a range of indoor mould species.
                  The species present in a property indicates the type and duration of moisture conditions that allowed
                  mould to establish.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Cladosporium</strong> — the most commonly identified indoor mould in Australia. Appears
                    as dark green, brown, or black patches. Found on surfaces with moderate moisture exposure including
                    bathroom grout, window frames, and fabrics. Indicates recurring condensation or humidity rather
                    than acute water damage.
                  </li>
                  <li>
                    <strong>Aspergillus</strong> — a large genus with many species; common in homes and workplaces.
                    Some Aspergillus species are opportunistic pathogens for immunocompromised individuals. Aspergillus
                    fumigatus is one species of particular concern in clinical settings. Found in high-humidity areas
                    and on water-damaged building materials.
                  </li>
                  <li>
                    <strong>Penicillium</strong> — blue-green mould commonly found on water-damaged building materials,
                    carpets, and soft furnishings. Indicates sustained moisture exposure. Some species produce
                    mycotoxins under certain conditions.
                  </li>
                  <li>
                    <strong>Stachybotrys chartarum (black mould)</strong> — less common than other species because
                    it requires sustained, heavy saturation of cellulose-based materials (paper, drywall, timber) to
                    establish and grow. Its presence indicates prolonged serious water damage that was not remediated.
                    Produces mycotoxins under certain conditions.
                  </li>
                  <li>
                    <strong>Alternaria</strong> — a common outdoor mould that colonises indoor surfaces after water
                    damage, particularly on shower surrounds, window frames, and fabric. Often an indicator of
                    post-flood contamination where outdoor mould spore load was introduced with floodwater.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Professional mould assessment identifies species present, which informs the remediation approach.
                  AIEH recommends treating all visible mould regardless of species rather than making health risk
                  determinations based on visual species identification alone.
                </p>
              </>
            ),
          },
          {
            heading: 'Health Effects by Exposure Level',
            background: 'light' as const,
            body: (
              <>
                <p>
                  The health effects of mould exposure vary by individual sensitivity, the species present, and the
                  duration and intensity of exposure. Any health concerns should be assessed by a medical professional.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Low-level exposure</strong> — minor respiratory irritation (coughing, sneezing),
                    eye irritation, and skin sensitivity in susceptible individuals. Symptoms often resolve when the
                    individual leaves the affected space. Most commonly associated with surface mould in bathrooms
                    or on window frames with intermittent condensation.
                  </li>
                  <li>
                    <strong>Moderate exposure</strong> — allergic sensitisation can develop with repeated exposure
                    to moderate mould levels. Once sensitised, an individual may react to much lower spore counts.
                    Associated with persistent mould in living areas, bedrooms, or poorly ventilated spaces with
                    ongoing moisture problems.
                  </li>
                  <li>
                    <strong>Prolonged high-level exposure</strong> — asthma exacerbation, chronic respiratory
                    symptoms, fatigue, and — in severe cases — hypersensitivity pneumonitis. AIEH guidance recommends
                    relocation from heavily mould-affected properties for individuals experiencing symptoms. Consult
                    a medical professional about any ongoing health concerns.
                  </li>
                  <li>
                    <strong>Immunocompromised individuals</strong> — people with weakened immune systems (including
                    those undergoing chemotherapy, transplant recipients, and individuals with HIV/AIDS) face higher
                    risk at lower mould levels. Aspergillus fumigatus can cause invasive aspergillosis in
                    immunocompromised individuals exposed to elevated spore counts. Medical guidance should be sought
                    before re-occupying a mould-affected property.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  <em>
                    This information is general in nature. Consult a medical professional for advice about your
                    specific health situation.
                  </em>
                </p>
              </>
            ),
          },
          {
            heading: 'Australian Legal Obligations for Mould in Rentals',
            body: (
              <>
                <p>
                  All Australian states and territories impose habitability obligations on landlords through their
                  Residential Tenancies Act. Mould that makes a property unsafe or unfit for habitation is a
                  maintenance obligation the landlord must address.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  State-by-state obligations (general guidance only — seek independent legal advice):
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>New South Wales</strong> — RTRA s52 requires landlords to provide and maintain the
                    property in a reasonable state of repair. The 2020 reforms introduced minimum habitability
                    standards. Urgent repairs (including serious mould) must be attended to within 24 hours.
                  </li>
                  <li>
                    <strong>Victoria</strong> — RTRA s65B introduced minimum rental standards in 2021, including
                    requirements for adequate ventilation and absence of damp or mould. Landlords must respond to
                    urgent repairs within 24 hours and non-urgent repairs within 14 days.
                  </li>
                  <li>
                    <strong>Queensland</strong> — RTRA s185 requires the property to be fit for habitation and in
                    good repair. The 2023 amendments strengthened minimum housing standards. Urgent repairs must be
                    completed within a reasonable time.
                  </li>
                  <li>
                    <strong>Western Australia</strong> — RTRA s42A requires the landlord to ensure the property
                    is in a reasonable state of repair and fit for habitation. Urgent repairs (those affecting
                    habitability) must be attended to promptly.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If a landlord fails to remediate mould after being notified in writing, tenants may be able to
                  arrange emergency repairs and claim the cost from the landlord, seek a rent reduction, or apply
                  to VCAT (VIC), QCAT (QLD), NCAT (NSW), or the relevant state tribunal for orders requiring repairs.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <em>
                    This section provides general information about legal frameworks only. It is not legal advice.
                    Seek independent legal advice from a tenancy advocate or solicitor for advice about your
                    specific situation.
                  </em>
                </p>
              </>
            ),
          },
          {
            heading: 'When to Call a Professional',
            background: 'light' as const,
            body: (
              <>
                <p>
                  Not all mould requires a professional remediation contractor. Small areas of surface mould on
                  non-porous surfaces in well-ventilated areas can sometimes be cleaned by occupants with appropriate
                  PPE. The following situations warrant a professional assessment:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Visible mould exceeds 0.1m²</strong> — at this scale, disturbing mould without
                    containment risks spreading spores throughout the property. Professional containment and HEPA
                    air filtration is required.
                  </li>
                  <li>
                    <strong>Musty odour without visible mould</strong> — musty odour indicates active mould growth
                    that is not yet visible — typically inside wall cavities, under flooring, or in ceiling spaces.
                    Thermal imaging and air quality testing can locate the source.
                  </li>
                  <li>
                    <strong>Symptoms resolve when leaving the property</strong> — if respiratory symptoms, headaches,
                    or fatigue improve when you are away from the property and return when you come back, mould or
                    other indoor air quality issues may be the cause. Professional air quality testing can identify
                    elevated spore counts.
                  </li>
                  <li>
                    <strong>HVAC smell</strong> — a musty or earthy smell when the HVAC system runs indicates mould
                    contamination in the ductwork or on coils. Running a contaminated system distributes spores
                    throughout every room served by the system.
                  </li>
                  <li>
                    <strong>Post-flood or post-leak assessment</strong> — any property that has experienced flooding
                    or a significant water leak should be assessed for mould within 72 hours if structural drying
                    has not been completed. Mould can establish on wet building materials within 24–72 hours under
                    warm, humid conditions.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What are the health effects of mould exposure?',
            answer:
              'Mould exposure can cause respiratory symptoms including coughing and wheezing, asthma exacerbation, and allergic reactions including nasal congestion, eye irritation, and skin rash. Immunocompromised individuals are at higher risk at lower exposure levels. Stachybotrys (black mould) exposure has been linked to severe respiratory issues in cases of prolonged exposure. AIEH guidance indicates that prolonged exposure to elevated mould spore counts poses a health risk. A diagnosis of mould-related illness should be made by a medical professional.',
          },
          {
            question: 'Is black mould (Stachybotrys) dangerous in Australia?',
            answer:
              'Stachybotrys chartarum requires prolonged cellulose saturation to grow and is less common than other mould species. It produces mycotoxins under certain conditions. The health effects from Stachybotrys exposure are debated in the scientific literature, but AIEH recommends treatment of all visible mould regardless of species. A diagnosis of mould-related illness should be made by a medical professional.',
          },
          {
            question: 'Does my landlord have to fix mould in my rental property?',
            answer:
              'All Australian state Residential Tenancies Acts include implied habitability obligations. Landlords must remediate mould that constitutes a health hazard or makes the premises unfit for habitation. Legislative references vary by state: NSW RTRA s52; VIC RTRA s65B; QLD RTRA s185; WA RTRA s42A. This is general information only — seek independent legal advice for your specific situation.',
          },
          {
            question: 'How many mould spores is dangerous?',
            answer:
              'There is no official Australian standard for safe indoor mould spore levels. AIEH and IICRC S520 use outdoor control samples as a reference — indoor spore counts significantly exceeding outdoor background levels indicate problematic contamination. Professional air quality testing is required to quantify indoor spore levels accurately.',
          },
          {
            question: 'When should I leave my home because of mould?',
            answer:
              'Consider temporary relocation if you are experiencing ongoing respiratory symptoms that resolve when you leave the property, if visible mould exceeds 1m², if the HVAC system is contaminated and distributing spores throughout the home, or if a professional assessment identifies Stachybotrys or Aspergillus fumigatus in significant quantities. Consult a medical professional about any health concerns.',
          },
        ]}
        relatedGuides={[
          { title: 'IICRC S520 Mould Standard', href: '/guides/mould/iicrc-s520-mould-remediation-standard' },
          { title: 'Mould Insurance Coverage', href: '/guides/insurance/mould-insurance-coverage' },
          { title: 'Rental Property Water Damage', href: '/guides/property/rental-property-water-damage' },
        ]}
      />
    </>
  )
}
