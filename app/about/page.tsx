import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { generateSEO } from '@/lib/seo';
import { NAP } from '@/lib/constants';
import Link from 'next/link';

export const metadata: Metadata = generateSEO({
  title: 'About Disaster Recovery Australia | National Claims Distribution Platform',
  description: 'Australia\'s national disaster recovery claims distribution platform. Connecting property owners with IICRC-certified contractors 24/7 for water, fire, storm, mould, and biohazard restoration.',
  keywords: [
    'about disaster recovery Australia',
    'national disaster recovery platform',
    'IICRC certified contractors Australia',
    'property damage restoration company',
    'insurance claims distribution',
    'emergency restoration network',
  ],
  canonical: '/about',
});

// About-specific Organization schema — trusted static data, safe to stringify
const aboutOrganizationSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${NAP.url}/#organization`,
  name: NAP.name,
  legalName: NAP.legalName,
  alternateName: NAP.alternateName,
  url: NAP.url,
  logo: NAP.logo,
  image: NAP.ogImage,
  email: NAP.email,
  foundingDate: '2024',
  areaServed: { '@type': 'Country', name: 'Australia' },
  description: 'Australia\'s national disaster recovery claims distribution platform. Connecting property owners with IICRC-certified contractors 24/7 for water, fire, storm, mould, and biohazard restoration.',
  sameAs: NAP.sameAs,
  knowsAbout: [
    'Water damage restoration',
    'Fire damage restoration',
    'Mould remediation',
    'Storm damage repair',
    'Flood recovery',
    'Biohazard cleaning',
    'Emergency property restoration',
    'Insurance claims documentation',
    'IICRC certification standards',
  ],
});

// About-page FAQ — trusted static data, safe to stringify
const aboutFAQs = [
  {
    question: 'What is Disaster Recovery Australia?',
    answer: 'Disaster Recovery Australia is a national claims distribution platform that connects property owners with IICRC-certified restoration contractors across all Australian states and territories. We operate 24/7/365 as the bridge between insurance claims and qualified restoration professionals.',
  },
  {
    question: 'Is Disaster Recovery Australia a restoration company?',
    answer: 'No. Disaster Recovery Australia is a distribution network, not a restoration company. We match property owners with certified contractors in their area. Contractors bill you directly, and we provide full documentation for your insurance reimbursement claim.',
  },
  {
    question: 'What areas does Disaster Recovery cover?',
    answer: 'Disaster Recovery covers all 8 Australian states and territories — from metropolitan Sydney and Melbourne to regional centres like Townsville and Wagga Wagga, and remote communities like Coober Pedy and Broken Hill. Our network handles jobs from single rooms to 80-floor towers.',
  },
  {
    question: 'What certifications do your contractors hold?',
    answer: 'All contractors must maintain current IICRC certification, minimum $20 million public liability insurance, WorkSafe accreditation, and compliance with Australian Standards including AS/NZS 4360. Specialist certifications (asbestos, HAZMAT, ISO) are required for relevant work categories.',
  },
  {
    question: 'How does billing work with Disaster Recovery?',
    answer: 'Your matched contractor bills you directly — not your insurer. This means work begins immediately without waiting for insurer approval. We provide comprehensive documentation to support your insurance reimbursement claim. Payment plans are available through Blue Fire Finance.',
  },
  {
    question: 'How quickly can a contractor respond?',
    answer: 'Our platform matches you with the nearest IICRC-certified contractor automatically. Emergency jobs receive priority dispatching, with contractors typically responding within 60 minutes in metropolitan areas. The platform operates 24/7/365 with no phone queues or business-hours limitations.',
  },
];
const aboutFAQSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: aboutFAQs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

export default function AboutPage() {
  return (
    <>
      {/* Organization + FAQ schemas — trusted static data from constants, no user input */}
      <Script id="about-org-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: aboutOrganizationSchema }} />
      <Script id="about-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: aboutFAQSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'About Disaster Recovery Australia',
        subtitle: 'Australia\'s national claims distribution platform — connecting property owners with certified restoration contractors 24/7, from single rooms to 80-floor towers.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      secondaryCta={{ text: 'View Our Certifications', href: '/certifications' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'About Us' },
      ]}
      stats={[
        { label: 'Response Time', value: '24/7/365' },
        { label: 'Network Coverage', value: 'Australia-Wide' },
        { label: 'Contractor Standard', value: 'IICRC Certified' },
        { label: 'Payment Options', value: 'Flexible' },
      ]}
      sections={[
        {
          heading: 'Who We Are',
          body: (
            <div className="space-y-4">
              <p>
                Disaster Recovery Australia is a national claims distribution platform that connects property owners, tenants, and businesses with IICRC-certified restoration contractors across every state and territory. We operate as the bridge between insurance claims and qualified professionals — ensuring the right contractor reaches every job, anywhere in Australia.
              </p>
              <p>
                Our platform operates 24 hours a day, 7 days a week, 365 days a year. There are no phone queues, no business-hours limitations, and no geographic restrictions. Whether it&apos;s a burst pipe in a Sydney CBD high-rise at 2am or cyclone damage to a remote Queensland property on Christmas Day, our system matches the job to the nearest qualified contractor automatically.
              </p>
              <p>
                We are not a restoration company — we are the distribution network that makes restoration happen faster, more transparently, and with transparent billing, flexible payment options, and full insurance claims documentation.
              </p>
            </div>
          ),
        },
        {
          heading: 'Our Mission',
          body: (
            <div className="space-y-4">
              <p>
                Property disasters don&apos;t follow business hours. Our mission is to ensure that every Australian — regardless of location, time of day, or type of disaster — can access certified restoration professionals within hours, not days.
              </p>
              <p>
                We believe in complete transparency: no hidden fees, no unnecessary delays, and no intermediaries between the property owner and the contractor doing the work. Every contractor in our network bills you directly — so work begins immediately without insurer delays. We provide all documentation you need to claim reimbursement from your insurer.
              </p>
              <p>
                We bill you directly; we provide the services you&apos;re entitled to — the insurance policy holders pay in accordance with your policy. We follow Australian laws, recommendations, and best practices, and all our qualified and certified business owners do too. It is a network you can trust, but we also need to be paid.
              </p>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Professional Standards & Certifications',
          body: (
            <div className="space-y-4">
              <p>
                Every contractor in the Disaster Recovery network must meet strict professional standards before joining our platform. These are not suggestions — they are mandatory entry requirements:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>IICRC Certification</strong> — The Institute of Inspection, Cleaning and Restoration Certification is the global standard for the restoration industry. All contractors must hold current IICRC credentials in their service categories. <Link href="/certifications/iicrc-certified" className="text-blue-600 hover:underline">Learn about IICRC certification</Link>.</li>
                <li><strong>Australian Standards Compliance</strong> — All work must comply with relevant Australian Standards including AS/NZS 4360 (Risk Management) and state-specific building codes. <Link href="/certifications/australian-standards" className="text-blue-600 hover:underline">View Australian Standards</Link>.</li>
                <li><strong>WorkSafe Certification</strong> — Current workplace health and safety accreditation is mandatory for all contractors. <Link href="/certifications/worksafe-certified" className="text-blue-600 hover:underline">WorkSafe requirements</Link>.</li>
                <li><strong>Asbestos Licensing</strong> — For properties built before 1990, contractors must hold appropriate asbestos handling licences. <Link href="/certifications/asbestos-licensed" className="text-blue-600 hover:underline">Asbestos licensing details</Link>.</li>
                <li><strong>HAZMAT Certification</strong> — Contractors handling biohazard, chemical, or contaminated materials must hold current HAZMAT credentials. <Link href="/certifications/hazmat-certified" className="text-blue-600 hover:underline">HAZMAT certification</Link>.</li>
                <li><strong>ISO Certification</strong> — Quality management systems aligned with ISO 9001 standards. <Link href="/certifications/iso-certified" className="text-blue-600 hover:underline">ISO certification details</Link>.</li>
                <li><strong>Public Liability Insurance</strong> — Minimum $20 million public liability cover required for all network contractors.</li>
                <li><strong>Professional Indemnity Insurance</strong> — Coverage for professional advice and assessment services.</li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'National Coverage — Every Location, Every Disaster',
          body: (
            <div className="space-y-4">
              <p>
                Our contractor network covers every Australian state and territory. From metropolitan centres to regional towns and remote communities, we maintain coverage density that ensures rapid response times across the continent.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {[
                  { state: 'New South Wales', href: '/locations/nsw' },
                  { state: 'Victoria', href: '/locations/vic' },
                  { state: 'Queensland', href: '/locations/qld' },
                  { state: 'Western Australia', href: '/locations/wa' },
                  { state: 'South Australia', href: '/locations/sa' },
                  { state: 'Tasmania', href: '/locations/tas' },
                  { state: 'ACT', href: '/locations/act' },
                  { state: 'Northern Territory', href: '/locations/nt' },
                ].map(({ state, href }) => (
                  <Link key={href} href={href} className="text-blue-600 hover:underline text-sm font-medium">
                    {state}
                  </Link>
                ))}
              </div>
              <p className="mt-4">
                Our network has handled jobs ranging from single-room water extraction in suburban homes to multi-floor restoration in 80-storey towers, offshore oil rig decontamination, and international deployments to Papua New Guinea.
              </p>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Services We Distribute',
          body: (
            <div className="space-y-4">
              <p>
                We distribute claims across every category of property disaster. Our contractors are equipped and certified to handle:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                {[
                  { service: 'Water Damage Restoration', href: '/services/water-damage-restoration' },
                  { service: 'Fire & Smoke Damage Restoration', href: '/services/fire-damage-restoration' },
                  { service: 'Mould Remediation', href: '/services/mould-remediation' },
                  { service: 'Storm Damage Restoration', href: '/services/storm-damage-restoration' },
                  { service: 'Flood Damage Restoration', href: '/services/flood-damage-restoration' },
                  { service: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
                  { service: 'Biohazard & Trauma Cleaning', href: '/services/biohazard-cleaning' },
                  { service: 'Bushfire Damage Restoration', href: '/services/bushfire-damage-restoration' },
                  { service: 'Cyclone Damage Restoration', href: '/services/cyclone-damage-restoration' },
                  { service: 'Emergency Services', href: '/services/emergency-services' },
                ].map(({ service, href }) => (
                  <Link key={href} href={href} className="text-blue-600 hover:underline text-sm">
                    {service}
                  </Link>
                ))}
              </div>
            </div>
          ),
        },
        {
          heading: 'How Our Platform Works',
          body: (
            <div className="space-y-4">
              <p>
                Our system is designed for speed and simplicity. There are no phone calls to NRPG, no waiting on hold, and no manual quote requests. The entire process is automated:
              </p>
              <ol className="list-decimal pl-6 space-y-3">
                <li><strong>Submit your claim online</strong> — Describe the damage, upload photos, and provide your location. Our system is available 24/7.</li>
                <li><strong>Instant contractor matching</strong> — Our platform identifies IICRC-certified contractors within your area who specialise in your type of damage.</li>
                <li><strong>Rapid response</strong> — Matched contractors respond directly. Emergency jobs receive priority dispatching.</li>
                <li><strong>Transparent billing & payment</strong> — Your contractor provides a formal contract and invoices you directly. We supply all documentation for your insurance reimbursement claim. Payment plans available through <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Blue Fire Finance</a>.</li>
                <li><strong>Quality assurance</strong> — All work is performed to IICRC standards with full documentation for your insurance claim.</li>
              </ol>
              <p className="mt-4">
                <Link href="/how-it-works" className="text-blue-600 hover:underline font-medium">
                  Learn more about how it works →
                </Link>
              </p>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Community Commitment',
          body: (
            <div className="space-y-4">
              <p>
                Disaster Recovery Australia was built with a core principle: profits directed back to community support. We operate with minimum overhead and maximum efficiency, and we believe that a platform serving communities during their worst moments has a responsibility to give back.
              </p>
              <p>
                Our operational model is designed for ruthless cost efficiency — not to maximise shareholder returns, but to ensure the largest possible portion of revenue flows back into community disaster resilience, contractor training, and emergency preparedness programmes across Australia.
              </p>
            </div>
          ),
        },
        {
          heading: 'Platform Statistics',
          body: (
            <div className="space-y-4">
              <p>
                Key metrics about the Disaster Recovery Australia platform:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {[
                  { metric: 'States & Territories Covered', value: '8 / 8' },
                  { metric: 'Service Categories', value: '10+' },
                  { metric: 'Platform Availability', value: '24/7/365' },
                  { metric: 'Contractor Certification', value: '100% IICRC' },
                  { metric: 'Minimum Public Liability', value: '$20M' },
                  { metric: 'Target Response Time', value: '60 minutes' },
                  { metric: 'Minimum Service Fee', value: '$2,200' },
                  { metric: 'Payment Plans', value: 'Available' },
                  { metric: 'Platform Type', value: '100% Digital' },
                ].map(({ metric, value }) => (
                  <div key={metric} className="border border-gray-700 rounded-lg p-3">
                    <div className="text-lg font-bold text-white">{value}</div>
                    <div className="text-sm text-gray-400">{metric}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Frequently Asked Questions',
          body: (
            <div className="space-y-6">
              {aboutFAQs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          ),
        },
      ]}
      relatedPages={[
        { title: 'Our Certifications', href: '/certifications', description: 'View the professional certifications required for all contractors in our network.' },
        { title: 'Training Requirements', href: '/certifications/minimum-training-requirements', description: 'Mandatory OH&S training courses for all site technicians in our network.' },
        { title: 'How It Works', href: '/how-it-works', description: 'Step-by-step guide to using our platform for disaster recovery claims.' },
        { title: 'Our Services', href: '/services', description: 'Full list of disaster recovery services distributed through our platform.' },
        { title: 'Service Locations', href: '/locations', description: 'Find certified contractors in your area across all Australian states and territories.' },
        { title: 'Start a Claim', href: '/claim', description: 'Submit your damage claim online for immediate contractor matching.' },
      ]}
    />
    </>
  );
}
