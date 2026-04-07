import type { ContentSection, ContentStat } from '@/components/antigravity/AgContentPageTemplate';
import Link from 'next/link';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

interface FAQ {
  question: string;
  answer: string;
}

/* -------------------------------------------------------------------------- */
/* Page Data Registry                                                          */
/* -------------------------------------------------------------------------- */

interface OEPageData {
  sections: ContentSection[];
  faqs: FAQ[];
  stats: ContentStat[];
}

/* -------------------------------------------------------------------------- */
/* 1. Command Ecosystem                                                        */
/* -------------------------------------------------------------------------- */

const commandEcosystemData: OEPageData = {
  stats: [
    { label: 'Field Devices', value: '3 Platforms' },
    { label: 'GPS Dispatch', value: 'Real-time' },
    { label: 'Reporting', value: 'IICRC S500:2025' },
    { label: 'Availability', value: '24/7' },
  ],
  sections: [
    {
      heading: 'Seamless Technology Across Every Device',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Disaster Recovery operates a fully integrated command ecosystem spanning iPads, mobile
            phones, and laptops. Every technician in the field has real-time access to job data,
            claims documentation, and project status — regardless of which device they carry. This
            isn&apos;t a single app bolted on as an afterthought; it&apos;s a purpose-built
            technology stack designed for the chaos of disaster response.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            From the moment a claim is lodged to the final sign-off, our command ecosystem ensures
            every stakeholder — insurers, adjusters, project managers, and on-site crews — sees the
            same data in real time. No miscommunication, no lost reports, no delays.
          </p>
        </>
      ),
    },
    {
      heading: 'Real-Time Claims Management',
      background: 'light' as const,
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Our claims management application processes every stage of a disaster recovery project
            digitally. When a technician arrives on-site, they open the job on their iPad and begin
            documenting conditions immediately — moisture readings, thermal images, contamination
            levels, and structural assessments are captured and synced to the cloud within seconds.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Insurance adjusters receive timestamped, geo-tagged evidence as it is captured. This
            eliminates the traditional delays of paper-based reporting and dramatically accelerates
            claim approvals. Our platform integrates with major Australian insurance systems to
            ensure seamless data exchange.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Related:{' '}
            <Link href="/services/water-damage-restoration" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              Water Damage Restoration
            </Link>{' '}
            |{' '}
            <Link href="/knowledge/insurance-claims-process-australia" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              Insurance Claims Process
            </Link>
          </p>
        </>
      ),
    },
    {
      heading: 'GPS-Powered Contractor Dispatch',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            When an emergency call comes in, our dispatch system identifies the nearest qualified
            contractor using real-time GPS positioning. The system factors in each contractor&apos;s
            certifications, current workload, and travel time to ensure the right person reaches the
            site as fast as physically possible.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Across Australia — from Sydney CBD to remote regional communities — our GPS dispatch
            network covers every postcode. Contractors receive job details, site history, and safety
            alerts directly to their mobile device before they arrive, so they can prepare the
            correct{' '}
            <Link href="/operational-excellence/safety-ppe" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              PPE and safety equipment
            </Link>{' '}
            en route.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            This intelligent dispatch model is a key reason Disaster Recovery maintains industry-leading
            response times for{' '}
            <Link href="/services/emergency-response" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              emergency response
            </Link>{' '}
            across Australia and New Zealand.
          </p>
        </>
      ),
    },
    {
      heading: 'IICRC-Compliant Digital Workflows',
      background: 'light' as const,
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Every digital workflow in our command ecosystem is mapped to{' '}
            <Link href="/knowledge/iicrc-certification-standards" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              IICRC certification standards
            </Link>
            . When a technician logs moisture readings, the system automatically validates them
            against IICRC S500:2025 thresholds. When a mould remediation project progresses, the
            platform enforces the S520:2025 protocol sequence — containment, filtration, removal,
            treatment, verification.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            This built-in compliance layer means insurers can trust that every project documented
            through our system meets or exceeds industry standards. It also protects property owners
            by ensuring no critical step is skipped under pressure.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Our digital workflows cover{' '}
            <Link href="/services/fire-damage-restoration" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              fire damage restoration
            </Link>
            ,{' '}
            <Link href="/services/mould-remediation" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              mould remediation
            </Link>
            , and{' '}
            <Link href="/services/biohazard-cleaning" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              biohazard cleaning
            </Link>{' '}
            — each with its own compliance pathway.
          </p>
        </>
      ),
    },
    {
      heading: 'Data-Driven Restoration Outcomes',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            The command ecosystem doesn&apos;t just document — it analyses. Aggregated project data
            across thousands of restoration jobs informs our decision-making at every level. We
            identify drying time patterns by material type, predict mould risk windows based on
            environmental conditions, and optimise equipment deployment based on historical
            performance data.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            For insurers, this means more accurate scoping, fewer supplementary claims, and faster
            project completion. For property owners, it means less disruption and a higher standard
            of restoration. Every data point feeds back into improving our service delivery across
            the{' '}
            <Link href="/operational-excellence/executive-partners" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              NRPG national network
            </Link>
            .
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Our{' '}
            <Link href="/equipment/thermal-imaging" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              thermal imaging
            </Link>{' '}
            and{' '}
            <Link href="/equipment/moisture-meters" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              moisture meter
            </Link>{' '}
            data integrates directly into the platform, creating a verifiable audit trail from
            initial assessment to project completion.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: 'What devices does the Disaster Recovery command ecosystem support?',
      answer: 'Our command ecosystem runs seamlessly across iPads, iPhones, Android devices, and laptops. Technicians can access real-time job data, submit reports, and communicate with project managers from any device in the field.',
    },
    {
      question: 'How does GPS dispatch improve emergency response times?',
      answer: 'Our GPS dispatch system identifies the nearest qualified contractor in real time, factoring in certifications, current workload, and travel distance. This ensures the right technician reaches your property as quickly as possible — typically within 60 minutes in metro areas.',
    },
    {
      question: 'Is the claims management platform compliant with IICRC standards?',
      answer: 'Yes. Every digital workflow is mapped to IICRC S500:2025, S520:2025, and S540 standards. The system enforces protocol sequences and validates readings against industry thresholds automatically, ensuring full compliance on every project.',
    },
    {
      question: 'Can insurance adjusters access project data in real time?',
      answer: 'Absolutely. Insurance adjusters receive timestamped, geo-tagged evidence as technicians capture it on-site. Our platform integrates with major Australian insurance systems for seamless data exchange and faster claim approvals.',
    },
    {
      question: 'How does technology improve restoration outcomes?',
      answer: 'Aggregated data from thousands of restoration projects helps us predict drying times, identify mould risk windows, and optimise equipment deployment. This data-driven approach results in faster completions, fewer supplementary claims, and higher restoration quality.',
    },
    {
      question: 'Does Disaster Recovery use technology for contractor management?',
      answer: 'Yes. Our contractor management system tracks certifications, insurance status, performance ratings, and availability. GPS positioning enables intelligent job allocation, and real-time reporting ensures quality standards are maintained across the national network.',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* 2. Safety & PPE                                                             */
/* -------------------------------------------------------------------------- */

const safetyPpeData: OEPageData = {
  stats: [
    { label: 'Safety Record', value: 'Zero Incidents' },
    { label: 'PPE Compliance', value: '100%' },
    { label: 'Training Hours', value: '40+ per Tech' },
    { label: 'Standard', value: 'AS/NZS 1715' },
  ],
  sections: [
    {
      heading: 'Rigorous Safety Standards on Every Site',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Disaster recovery sites are inherently dangerous. Structural instability, contaminated
            water, airborne mould spores, asbestos fibres, chemical residues, and biological hazards
            are daily realities for our technicians. That is why Disaster Recovery enforces safety
            standards that exceed minimum WHS requirements on every single job.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Every technician in our network completes mandatory safety induction before they step
            onto their first site. Ongoing refresher training, site-specific risk assessments, and
            real-time safety alerts through our{' '}
            <Link href="/operational-excellence/command-ecosystem" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              command ecosystem
            </Link>{' '}
            ensure that safety is never an afterthought — it is the foundation of every operation.
          </p>
        </>
      ),
    },
    {
      heading: 'Purpose-Built Protective Equipment',
      background: 'light' as const,
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Our PPE inventory is not off-the-shelf consumer gear. Every piece of protective equipment
            is selected for the specific hazards encountered in disaster recovery — and branded to
            the Disaster Recovery standard. Hard hats rated to AS/NZS 1801, steel-cap boots
            compliant with AS/NZS 2210, high-visibility vests meeting AS/NZS 4602, and full-face
            respirators certified to AS/NZS 1716.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            For hazmat environments, technicians deploy in full Tyvek suits with sealed seams,
            chemical-resistant gloves, and self-contained breathing apparatus (SCBA) when required.
            Every item is inspected before each deployment and replaced on a strict maintenance
            schedule.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Our{' '}
            <Link href="/operational-excellence/chemical-remediation-assets" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              chemical and remediation assets
            </Link>{' '}
            complement our PPE programme to create a comprehensive safety system.
          </p>
        </>
      ),
    },
    {
      heading: 'Contamination Zone Protocols',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            When a site involves contamination — whether from{' '}
            <Link href="/services/mould-remediation" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              mould
            </Link>
            , sewage, chemical spills, or{' '}
            <Link href="/services/biohazard-cleaning" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              biohazard materials
            </Link>{' '}
            — our technicians follow strict contamination zone protocols. The site is divided into
            hot (contaminated), warm (transition), and cold (clean) zones. Movement between zones
            requires decontamination procedures to prevent cross-contamination.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            These protocols align with IICRC S520:2025 containment standards and Australian WHS
            regulations. Air quality monitoring is continuous in contaminated zones, with real-time
            particle counts fed back to our command ecosystem for documentation and compliance
            verification. This systematic approach protects technicians, property occupants, and
            neighbouring properties.
          </p>
        </>
      ),
    },
    {
      heading: 'Respiratory Protection for Mould & Asbestos',
      background: 'light' as const,
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Airborne hazards are among the most dangerous risks on disaster recovery sites.{' '}
            <Link href="/knowledge/mould-remediation-standards" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              Mould spores
            </Link>{' '}
            can cause severe respiratory illness, while asbestos fibres — still present in many
            Australian buildings constructed before 1990 — cause mesothelioma and asbestosis.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Our respiratory protection programme includes P2/P3 particulate respirators for mould
            work, half-face and full-face respirators with organic vapour cartridges for chemical
            environments, and supplied-air respirators for asbestos-adjacent work. Every respirator
            is fit-tested to AS/NZS 1715 standards, ensuring an effective seal for each individual
            technician.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Our{' '}
            <Link href="/equipment/air-scrubbers" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              air scrubbers
            </Link>{' '}
            and{' '}
            <Link href="/equipment/negative-air-machines" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              negative air machines
            </Link>{' '}
            work alongside PPE to create layered respiratory protection on every site.
          </p>
        </>
      ),
    },
    {
      heading: 'Training, Certification & Compliance',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Safety equipment is only as effective as the people using it. Every technician in the
            Disaster Recovery network completes a minimum of 40 hours of safety training annually,
            covering hazard identification, PPE selection and use, emergency procedures, and
            incident reporting.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Certifications include{' '}
            <Link href="/knowledge/iicrc-certification-standards" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              IICRC credentials
            </Link>
            , White Card (construction induction), Working at Heights, Confined Spaces, and
            Hazardous Materials Handling. Our compliance team audits every contractor&apos;s
            certifications quarterly through our{' '}
            <Link href="/operational-excellence/command-ecosystem" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              digital management platform
            </Link>
            .
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Our partnership with{' '}
            <Link href="/operational-excellence/executive-partners" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              IICRC, CARSI, and industry bodies
            </Link>{' '}
            ensures our training programmes remain current with evolving Australian WHS legislation
            and international restoration standards.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: 'What safety standards does Disaster Recovery follow?',
      answer: 'We follow Australian WHS legislation, AS/NZS safety standards (1715, 1716, 1801, 2210, 4602), and IICRC protocols. Our safety standards exceed minimum regulatory requirements, with mandatory site-specific risk assessments and continuous air quality monitoring on contaminated sites.',
    },
    {
      question: 'What PPE do technicians wear on disaster recovery sites?',
      answer: 'PPE varies by hazard type but typically includes hard hats, steel-cap boots, high-visibility vests, safety glasses, and gloves. For contaminated environments, technicians deploy in full Tyvek hazmat suits, chemical-resistant gloves, and respirators rated to AS/NZS 1716.',
    },
    {
      question: 'How are contamination zones managed on-site?',
      answer: 'Sites are divided into hot (contaminated), warm (transition), and cold (clean) zones. Movement between zones requires decontamination procedures. Air quality is continuously monitored and all data is documented through our digital command ecosystem.',
    },
    {
      question: 'What respiratory protection is used for mould remediation?',
      answer: 'P2/P3 particulate respirators are standard for mould work. Full-face respirators with organic vapour cartridges are used in chemical environments. Every respirator is individually fit-tested to AS/NZS 1715 standards to ensure an effective seal.',
    },
    {
      question: 'How much safety training do technicians receive?',
      answer: 'Every technician completes a minimum of 40 hours of safety training annually, covering hazard identification, PPE use, emergency procedures, and incident reporting. Additional certifications include White Card, Working at Heights, Confined Spaces, and Hazardous Materials Handling.',
    },
    {
      question: 'Are Disaster Recovery technicians certified for asbestos work?',
      answer: 'Technicians working near asbestos-containing materials hold appropriate licences and use supplied-air respirators and sealed Tyvek suits. We follow Safe Work Australia guidelines and state-specific asbestos regulations for all work involving or adjacent to asbestos.',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* 3. Field Essentials                                                         */
/* -------------------------------------------------------------------------- */

const fieldEssentialsData: OEPageData = {
  stats: [
    { label: 'Kit Items', value: '25+ Essential' },
    { label: 'Weather Rating', value: 'IP67 Rated' },
    { label: 'Battery Life', value: '72hrs+' },
    { label: 'Deployment', value: '< 30 mins' },
  ],
  sections: [
    {
      heading: 'Always Prepared, Always Branded',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            When a disaster strikes, there is no time to search for missing equipment. Disaster
            Recovery technicians deploy with pre-packed, branded field essentials kits that contain
            everything needed for the first critical hours on-site. From high-powered flashlights
            to portable power banks, from weatherproof notebooks to emergency first-aid supplies —
            every item is selected, tested, and branded to the Disaster Recovery standard.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            The Disaster Recovery brand is visible on every piece of equipment. This is not vanity —
            it is accountability. When property owners, insurers, and building managers see our
            branded gear, they know the person on-site represents a national network with rigorous{' '}
            <Link href="/operational-excellence/safety-ppe" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              safety standards
            </Link>{' '}
            and{' '}
            <Link href="/operational-excellence/executive-partners" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              industry-leading affiliations
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      heading: 'What Is in a Field Essentials Kit?',
      background: 'light' as const,
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Every Disaster Recovery field essentials kit is standardised across the national network.
            Core items include:
          </p>
          <ul style={{ fontSize: '1.05rem', lineHeight: 2, marginBottom: '1.25rem', paddingLeft: '1.5rem' }}>
            <li><strong>Illumination:</strong> High-lumen LED flashlights (1,000+ lumens), head-mounted torches, and area lighting with 12-hour battery life</li>
            <li><strong>Power:</strong> 20,000mAh portable power banks with multi-device charging — enough to keep phones, tablets, and moisture meters running for a full shift</li>
            <li><strong>Documentation:</strong> Weatherproof notebooks, permanent markers, and measurement tapes for manual recording when digital systems need backup</li>
            <li><strong>Weather Protection:</strong> Branded umbrellas, rain jackets, and waterproof equipment bags rated to IP67</li>
            <li><strong>Communication:</strong> Two-way radios for sites with poor mobile coverage, particularly in regional and remote Australia</li>
            <li><strong>First Aid:</strong> Comprehensive first-aid kits compliant with Safe Work Australia guidelines</li>
            <li><strong>Site Security:</strong> Branded padlocks, security tape, and temporary access control materials</li>
          </ul>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            These essentials complement the specialist{' '}
            <Link href="/operational-excellence/chemical-remediation-assets" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              chemical and remediation equipment
            </Link>{' '}
            deployed for specific disaster types.
          </p>
        </>
      ),
    },
    {
      heading: 'Built for Australian Conditions',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Australia&apos;s climate extremes — from tropical cyclones in North Queensland to
            freezing conditions in the Victorian Alps — demand equipment that performs under
            pressure. Every item in our field essentials kit is tested against Australian conditions:
            40&deg;C+ heat, torrential rain, high humidity, dust storms, and saltwater exposure.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Our flashlights are impact-rated and waterproof. Power banks operate in temperatures
            from -10&deg;C to 50&deg;C. Equipment bags use military-grade waterproofing rated to
            IP67 — fully submersible for 30 minutes. This is gear built for the real conditions
            our technicians face during{' '}
            <Link href="/services/storm-damage-restoration" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              storm damage restoration
            </Link>{' '}
            and{' '}
            <Link href="/services/flood-damage-restoration" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              flood recovery
            </Link>{' '}
            operations.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Whether responding to a burst pipe in a Sydney high-rise or a cyclone aftermath in
            Cairns, our field kits ensure technicians have what they need from the moment they
            arrive on-site.
          </p>
        </>
      ),
    },
    {
      heading: 'Maintaining and Restocking Field Kits',
      background: 'light' as const,
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            A field kit is only useful if it is complete and functional. Our{' '}
            <Link href="/operational-excellence/command-ecosystem" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              command ecosystem
            </Link>{' '}
            tracks kit status digitally. After every deployment, technicians complete a kit
            inspection checklist — flagging any consumed, damaged, or expired items. Restocking
            is automated through our supply chain, with replacement items dispatched within 24
            hours.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Batteries are replaced on a fixed schedule regardless of usage. First-aid supplies
            are checked monthly against expiry dates. Flashlights and power banks undergo
            quarterly performance testing. This maintenance discipline ensures that when the next
            emergency call comes in, every kit is deployment-ready.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            This operational discipline extends across all our equipment, from field essentials to
            the heavy-duty{' '}
            <Link href="/equipment/negative-air-machines" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              negative air machines
            </Link>{' '}
            and{' '}
            <Link href="/equipment/industrial-dehumidifiers" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              industrial dehumidifiers
            </Link>{' '}
            in our fleet.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: 'What is included in a Disaster Recovery field essentials kit?',
      answer: 'Each kit contains 25+ essential items including high-lumen LED flashlights, 20,000mAh power banks, weatherproof notebooks, branded rain jackets and umbrellas, two-way radios, first-aid supplies, and site security materials. All items are branded and pre-packed for rapid deployment.',
    },
    {
      question: 'Are field essentials kits waterproof?',
      answer: 'Yes. Equipment bags are rated to IP67 — fully waterproof and submersible for 30 minutes. Flashlights, power banks, and documentation supplies are all designed to operate in heavy rain, flooding, and high-humidity environments typical of Australian disaster sites.',
    },
    {
      question: 'How quickly can technicians deploy with their field kits?',
      answer: 'Field essentials kits are pre-packed and stored in deployment-ready condition. Technicians can grab their kit and be on the road within 30 minutes of receiving a dispatch notification through our GPS-powered command ecosystem.',
    },
    {
      question: 'How often are field kits inspected and restocked?',
      answer: 'Kits are inspected after every deployment using a digital checklist. Batteries are replaced on a fixed schedule, first-aid supplies are checked monthly, and all equipment undergoes quarterly performance testing. Replacement items are dispatched within 24 hours.',
    },
    {
      question: 'Do field kits include specialist restoration equipment?',
      answer: 'Field essentials kits focus on universal items needed on every site. Specialist restoration equipment — moisture meters, thermal cameras, dehumidifiers, air scrubbers — is deployed separately based on the specific disaster type and scope of the project.',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* 4. Executive Partners                                                       */
/* -------------------------------------------------------------------------- */

const executivePartnersData: OEPageData = {
  stats: [
    { label: 'Industry Bodies', value: '4 Executive' },
    { label: 'Certifications', value: 'IICRC Accredited' },
    { label: 'Coverage', value: 'AUS & NZ' },
    { label: 'Network', value: 'NRPG National' },
  ],
  sections: [
    {
      heading: 'Why Industry Partnerships Matter',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            In an industry where anyone can call themselves a &quot;restoration company,&quot;
            accreditations and affiliations are the only reliable markers of quality. Disaster
            Recovery maintains executive-level partnerships with the four most influential bodies
            in the Australian and New Zealand restoration industry — not as a marketing exercise,
            but as a commitment to the highest standards of practice.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            These partnerships mean our technicians are trained to internationally recognised
            standards, our processes are regularly audited, and our clients — both insurers and
            property owners — can verify our credentials independently. When you choose a Disaster
            Recovery contractor, you are choosing a network that has been vetted by the industry
            itself.
          </p>
        </>
      ),
    },
    {
      heading: 'IICRC — Institute of Inspection, Cleaning and Restoration Certification',
      background: 'light' as const,
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            The{' '}
            <Link href="/knowledge/iicrc-certification-standards" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              IICRC
            </Link>{' '}
            is the global standard-setting body for the restoration industry. Their S500:2025 (Water
            Damage), S520:2025 (Mould Remediation), and S540 (Trauma Scene) standards define how
            professional restoration work should be conducted.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Disaster Recovery is an IICRC-accredited firm, meaning our operations, training
            programmes, and quality systems have been independently audited and approved. Every
            technician in our network holds current IICRC certifications relevant to their
            specialisation — from WRT (Water Restoration Technician) to AMRT (Applied Microbial
            Remediation Technician).
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            For property owners, IICRC accreditation means your{' '}
            <Link href="/services/water-damage-restoration" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              water damage restoration
            </Link>{' '}
            or{' '}
            <Link href="/services/mould-remediation" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              mould remediation
            </Link>{' '}
            project will be completed to the standard that insurers expect and trust. Learn more
            in our guide:{' '}
            <Link href="/guides/certifications/why-hire-iicrc-certified" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              Why Hire an IICRC-Certified Restorer
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      heading: 'CARSI — Cleaning and Restoration Services Industry',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            CARSI is Australia&apos;s peak industry body for the cleaning and restoration sector.
            Membership requires demonstrated compliance with industry codes of conduct, insurance
            requirements, and professional development commitments.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            As a CARSI member, Disaster Recovery participates in industry working groups, contributes
            to the development of Australian restoration standards, and maintains access to the
            latest research and best practices. This partnership ensures our methods remain current
            with evolving Australian regulations and industry expectations.
          </p>
        </>
      ),
    },
    {
      heading: 'RestoreAssist — Restoration Intelligence Platform',
      background: 'light' as const,
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            RestoreAssist is a leading restoration intelligence platform that connects insurers,
            loss adjusters, and restoration companies. Our partnership with RestoreAssist means
            Disaster Recovery contractors appear in the preferred provider network used by major
            Australian insurers.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Through RestoreAssist, claims are allocated efficiently, project progress is tracked
            transparently, and quality metrics are reported in real time. This integration
            with our{' '}
            <Link href="/operational-excellence/command-ecosystem" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              command ecosystem
            </Link>{' '}
            creates a seamless workflow from claim lodgement to project completion — benefiting
            insurers, adjusters, and property owners alike.
          </p>
        </>
      ),
    },
    {
      heading: 'NRPG — National Restoration Partners Group',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            The National Restoration Partners Group (NRPG) is the backbone of the Disaster Recovery
            network. NRPG connects vetted, certified restoration contractors across every state and
            territory in Australia, as well as New Zealand and the Pacific region.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Through NRPG, Disaster Recovery can deploy resources to any location in Australia —
            from capital city CBDs to remote regional communities. The network&apos;s strength is
            its depth: multiple qualified contractors in every major market, ensuring rapid response
            even during catastrophic events when demand surges.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            NRPG members undergo rigorous vetting including insurance verification, certification
            audits, and ongoing performance monitoring. This ensures every contractor dispatched
            through the Disaster Recovery brand meets the standard our insurers and property owners
            expect — whether responding to{' '}
            <Link href="/services/emergency-response" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              emergency calls
            </Link>{' '}
            or managing complex{' '}
            <Link href="/services/fire-damage-restoration" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              fire damage restorations
            </Link>
            .
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: 'What is the IICRC and why does it matter?',
      answer: 'The IICRC (Institute of Inspection, Cleaning and Restoration Certification) is the global standard-setting body for the restoration industry. Their standards — including S500:2025, S520:2025, and S540 — define how professional restoration should be conducted. IICRC accreditation means a company has been independently audited and approved.',
    },
    {
      question: 'Is Disaster Recovery an IICRC-accredited firm?',
      answer: 'Yes. Disaster Recovery holds IICRC firm accreditation, meaning our operations, training programmes, and quality systems meet international standards. Individual technicians hold certifications including WRT (Water Restoration Technician) and AMRT (Applied Microbial Remediation Technician).',
    },
    {
      question: 'What is CARSI?',
      answer: 'CARSI (Cleaning and Restoration Services Industry) is Australia\'s peak industry body for the cleaning and restoration sector. Membership requires demonstrated compliance with industry codes of conduct, insurance requirements, and professional development commitments.',
    },
    {
      question: 'How does the NRPG network benefit property owners?',
      answer: 'The National Restoration Partners Group (NRPG) connects vetted, certified contractors across Australia and New Zealand. This means Disaster Recovery can deploy qualified technicians to any location — from capital cities to remote communities — with rapid response times even during catastrophic events.',
    },
    {
      question: 'What is RestoreAssist?',
      answer: 'RestoreAssist is a restoration intelligence platform connecting insurers, loss adjusters, and restoration companies. Disaster Recovery\'s partnership with RestoreAssist means our contractors appear in the preferred provider network used by major Australian insurers, enabling efficient claim allocation and transparent project tracking.',
    },
    {
      question: 'Do these partnerships affect insurance claim outcomes?',
      answer: 'Yes. Insurers recognise and prefer IICRC-accredited firms and NRPG network members. Working with an accredited restorer typically results in smoother claim processing, fewer disputes, and faster approvals because the insurer trusts the quality and documentation standards.',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* 5. Chemical & Remediation Assets                                            */
/* -------------------------------------------------------------------------- */

const chemicalRemediationData: OEPageData = {
  stats: [
    { label: 'Equipment Fleet', value: '200+ Assets' },
    { label: 'HEPA Standard', value: '99.97%' },
    { label: 'Chemical Range', value: 'EPA Registered' },
    { label: 'Containment', value: 'Negative Air' },
  ],
  sections: [
    {
      heading: 'A Fleet Built for Every Disaster',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Disaster Recovery maintains a fleet of over 200 specialist chemical and remediation
            assets, deployed daily across Australia. From negative air machines that create safe
            containment zones to EPA-registered antimicrobial treatments that eliminate biological
            hazards — our equipment fleet is the backbone of every restoration project.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Every piece of equipment is maintained to manufacturer specifications, calibrated on
            schedule, and tracked through our{' '}
            <Link href="/operational-excellence/command-ecosystem" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              digital command ecosystem
            </Link>
            . When a technician arrives on-site, they deploy professional-grade assets that meet
            or exceed{' '}
            <Link href="/knowledge/iicrc-certification-standards" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              IICRC standards
            </Link>{' '}
            — not consumer-grade alternatives.
          </p>
        </>
      ),
    },
    {
      heading: 'Negative Air Machines & HEPA Filtration',
      background: 'light' as const,
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            <Link href="/equipment/negative-air-machines" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              Negative air machines
            </Link>{' '}
            are critical for any job involving airborne contaminants — mould spores, asbestos
            fibres, smoke particulates, or biological agents. These machines create negative
            pressure within a containment zone, ensuring contaminated air flows inward (toward
            filtration) rather than outward into clean areas.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Our fleet uses true HEPA filtration rated to 99.97% efficiency at 0.3 microns — the
            standard required by IICRC S520:2025 for{' '}
            <Link href="/services/mould-remediation" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              mould remediation
            </Link>{' '}
            and asbestos-adjacent work. Combined with our{' '}
            <Link href="/equipment/air-scrubbers" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              air scrubbers
            </Link>
            , these machines ensure indoor air quality is restored to safe levels before occupants
            return.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Every machine is tested and HEPA filters are replaced according to manufacturer
            specifications — never stretched beyond their rated capacity.
          </p>
        </>
      ),
    },
    {
      heading: 'Antimicrobial & Chemical Treatment Systems',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Effective disaster recovery often requires targeted chemical treatments. Our
            antimicrobial arsenal includes EPA-registered disinfectants, sporicides, and fungicides
            selected for their efficacy against the specific organisms found in Australian disaster
            environments.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            For{' '}
            <Link href="/services/water-damage-restoration" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              water damage restoration
            </Link>
            , we apply antimicrobial treatments to prevent mould colonisation during the drying
            process. For{' '}
            <Link href="/services/biohazard-cleaning" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              biohazard cleaning
            </Link>
            , hospital-grade disinfectants eliminate bloodborne pathogens and infectious agents.
            For fire damage, specialised odour counteractants and smoke sealants address the
            unique chemical compounds produced by combustion.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            All chemical treatments are applied by trained technicians following Safety Data Sheet
            (SDS) protocols, with full documentation in our digital platform for insurer
            verification.
          </p>
        </>
      ),
    },
    {
      heading: 'Containment & Site Isolation Equipment',
      background: 'light' as const,
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Proper containment prevents cross-contamination and protects building occupants during
            restoration work. Our containment inventory includes polyethylene sheeting, zippered
            containment barriers, self-adhesive films, negative air ducting, and branded caution
            tape and signage.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            For mould remediation projects, we construct full containment enclosures that meet
            IICRC S520:2025 specifications — sealed barriers with negative air pressure, decontamination
            chambers, and HEPA-filtered exhaust. For{' '}
            <Link href="/services/fire-damage-restoration" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              fire damage
            </Link>{' '}
            work, containment prevents soot and smoke residue from spreading to unaffected areas
            during demolition and cleaning.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Our{' '}
            <Link href="/operational-excellence/safety-ppe" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              PPE programme
            </Link>{' '}
            works alongside containment systems to create layered protection — the equipment
            protects the environment, the PPE protects the technician.
          </p>
        </>
      ),
    },
    {
      heading: 'Branded Assets — From Caution Tape to Vehicle Fleet',
      body: (
        <>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Every asset in the Disaster Recovery fleet carries our branding — and that branding
            carries meaning. When property owners, insurers, and building managers see Disaster
            Recovery caution tape around a containment zone, branded signage at a site entrance,
            or our liveried vehicles in a car park, they know a professional, nationally accredited
            restoration team is on the job.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Our branded asset range includes: vehicle wraps and livery, caution tape and barrier
            tape, site signage and safety notices, equipment labels and tracking tags, uniforms
            and{' '}
            <Link href="/operational-excellence/safety-ppe" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              PPE
            </Link>
            , and documentation materials. This consistent visual identity reinforces
            professionalism and builds trust with every stakeholder on-site.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Combined with our{' '}
            <Link href="/operational-excellence/field-essentials" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              field essentials kits
            </Link>{' '}
            and{' '}
            <Link href="/operational-excellence/executive-partners" style={{ color: 'var(--ag-primary-blue)', textDecoration: 'underline' }}>
              executive partnerships
            </Link>
            , our branded equipment fleet represents the complete Disaster Recovery commitment to
            operational excellence.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: 'How many pieces of specialist equipment does Disaster Recovery operate?',
      answer: 'Our fleet includes over 200 specialist chemical and remediation assets, including negative air machines, HEPA air scrubbers, industrial dehumidifiers, antimicrobial application systems, and containment equipment. All assets are maintained to manufacturer specifications and tracked digitally.',
    },
    {
      question: 'What standard of HEPA filtration do you use?',
      answer: 'All our negative air machines and air scrubbers use true HEPA filtration rated to 99.97% efficiency at 0.3 microns. This is the standard required by IICRC S520:2025 for mould remediation and asbestos-adjacent work. Filters are replaced strictly according to manufacturer schedules.',
    },
    {
      question: 'Are your chemical treatments EPA-registered?',
      answer: 'Yes. All antimicrobial treatments, disinfectants, sporicides, and fungicides in our inventory are EPA-registered and approved for use in Australian restoration environments. Treatments are selected based on the specific organisms and contamination levels present on each site.',
    },
    {
      question: 'How does containment work during restoration?',
      answer: 'Containment involves constructing sealed barriers around the work area using polyethylene sheeting and zippered enclosures. Negative air machines create inward airflow, ensuring contaminated air passes through HEPA filtration before exhausting outside the containment zone. This prevents cross-contamination.',
    },
    {
      question: 'Why is Disaster Recovery equipment branded?',
      answer: 'Branding represents accountability and professionalism. When property owners, insurers, and building managers see Disaster Recovery branding on equipment, vehicles, and site materials, they can verify that a nationally accredited, IICRC-certified restoration team is managing the project.',
    },
    {
      question: 'How do you maintain such a large equipment fleet?',
      answer: 'Every asset is tracked through our digital command ecosystem. Maintenance schedules, calibration records, and deployment history are logged automatically. Equipment undergoes regular servicing, HEPA filter replacements, and performance testing to ensure it meets operational standards at all times.',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Registry — maps slug to page data                                           */
/* -------------------------------------------------------------------------- */

const PAGE_REGISTRY: Record<string, OEPageData> = {
  'command-ecosystem': commandEcosystemData,
  'safety-ppe': safetyPpeData,
  'field-essentials': fieldEssentialsData,
  'executive-partners': executivePartnersData,
  'chemical-remediation-assets': chemicalRemediationData,
};

/* -------------------------------------------------------------------------- */
/* Public API                                                                  */
/* -------------------------------------------------------------------------- */

export function getOperationalExcellenceSections(slug: string): ContentSection[] {
  return PAGE_REGISTRY[slug]?.sections ?? [];
}

export function getOperationalExcellenceFaqs(slug: string): FAQ[] {
  return PAGE_REGISTRY[slug]?.faqs ?? [];
}

export function getOperationalExcellenceStats(slug: string): ContentStat[] {
  return PAGE_REGISTRY[slug]?.stats ?? [];
}
