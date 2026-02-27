import { Metadata } from 'next';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { AgContentPageTemplate } from '@/components/antigravity';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Minimum Training Requirements',
  description: 'Mandatory OH&S training requirements for all Disaster Recovery site technicians. Work safety, risk management, SWMS, SDS, SOP, and asbestos awareness courses.',
  keywords: [
    'OH&S training requirements',
    'site technician training',
    'disaster recovery training',
    'work safety management course',
    'SWMS course',
    'asbestos awareness training',
  ],
  canonical: '/certifications/minimum-training-requirements',
});

export default function MinimumTrainingRequirementsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #065F46 0%, #059669 100%)',
        icon: <GraduationCap className="h-12 w-12" />,
        title: 'Minimum Training Requirements',
        subtitle: 'Every technician in the Disaster Recovery network must complete these mandatory safety and compliance courses before deployment to any site.',
      }}
      cta={{ text: 'View All Certifications', href: '/certifications' }}
      secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'Minimum Training Requirements' },
      ]}
      stats={[
        { label: 'Mandatory Courses', value: '6' },
        { label: 'Compliance', value: 'WHS Act' },
        { label: 'Verification', value: 'Annual' },
        { label: 'Provider', value: 'CARSI' },
      ]}
      sections={[
        {
          heading: 'OH&S Mandatory Courses',
          body: (
            <div className="space-y-4">
              <p>
                All site technicians must complete the following five OH&S courses before being assigned to any restoration project. These courses are delivered by{' '}
                <a href="https://carsi.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CARSI</a>{' '}
                (Cleaning and Restoration Skills Institute), the industry-recognised training provider for restoration professionals in Australia.
              </p>
              <div className="space-y-3 mt-4">
                <div className="p-4 rounded-lg border border-gray-200 bg-white">
                  <h3 className="font-bold text-[var(--ag-primary-blue,#0F2942)] mb-1">Work Safety Management</h3>
                  <p className="text-sm text-gray-600 mb-2">Foundational workplace safety procedures, hazard identification, and incident reporting for restoration environments.</p>
                  <a href="https://carsi.com.au/product/safety-procedures/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">View course at CARSI &rarr;</a>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 bg-white">
                  <h3 className="font-bold text-[var(--ag-primary-blue,#0F2942)] mb-1">Risk Management</h3>
                  <p className="text-sm text-gray-600 mb-2">Risk identification, assessment, and control measures aligned with AS/NZS ISO 31000 for disaster recovery sites.</p>
                  <a href="https://carsi.com.au/product/risk-assessment-course/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">View course at CARSI &rarr;</a>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 bg-white">
                  <h3 className="font-bold text-[var(--ag-primary-blue,#0F2942)] mb-1">SWMS Management</h3>
                  <p className="text-sm text-gray-600 mb-2">Developing and implementing Safe Work Method Statements for high-risk construction and restoration work.</p>
                  <a href="https://carsi.com.au/product/safe-work-method-statements-swms-course/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">View course at CARSI &rarr;</a>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 bg-white">
                  <h3 className="font-bold text-[var(--ag-primary-blue,#0F2942)] mb-1">SDS Management</h3>
                  <p className="text-sm text-gray-600 mb-2">Reading, interpreting, and applying Safety Data Sheets for chemicals used in restoration and remediation.</p>
                  <a href="https://carsi.com.au/product/safety-data-sheet-sds-course/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">View course at CARSI &rarr;</a>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 bg-white">
                  <h3 className="font-bold text-[var(--ag-primary-blue,#0F2942)] mb-1">SOP Management</h3>
                  <p className="text-sm text-gray-600 mb-2">Creating and following Standard Operating Procedures to ensure consistent, compliant restoration outcomes.</p>
                  <a href="https://carsi.com.au/product/standard-operating-procedures-sop-course/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">View course at CARSI &rarr;</a>
                </div>
              </div>
            </div>
          ),
        },
        {
          heading: 'Asbestos Awareness',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                In addition to the five OH&S courses above, all technicians must complete asbestos awareness training before working on any property built before 1990.
              </p>
              <div className="p-4 rounded-lg border border-gray-200 bg-white">
                <h3 className="font-bold text-[var(--ag-primary-blue,#0F2942)] mb-1">Asbestos Awareness</h3>
                <p className="text-sm text-gray-600 mb-2">Identification of asbestos-containing materials, safe work practices around asbestos, and legal obligations under Australian WHS regulations.</p>
                <a href="https://carsi.com.au/product/asbestos/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">View course at CARSI &rarr;</a>
              </div>
              <p>
                <strong>Why this is mandatory:</strong> Asbestos was used extensively in Australian building materials until the late 1980s. Any property built before 1990 may contain asbestos in wall sheeting, insulation, flooring, roofing, and pipe lagging. Disturbing asbestos-containing materials without proper training is illegal under the{' '}
                <em>Work Health and Safety Act 2011</em> and can cause fatal diseases including mesothelioma and asbestosis.
              </p>
              <p>
                Disaster recovery work — particularly water damage, fire damage, and demolition — frequently involves disturbing building materials. Every technician must be able to identify potential asbestos-containing materials and follow correct procedures before any invasive work begins.
              </p>
            </div>
          ),
        },
        {
          heading: 'Why These Requirements Exist',
          body: (
            <div className="space-y-4">
              <p>
                These training requirements are not optional guidelines — they are mandatory prerequisites enforced across our entire network. Here is why:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Australian WHS legislation compliance</strong> — The <em>Work Health and Safety Act 2011</em> and corresponding state regulations require all workers to be trained in workplace safety relevant to their duties. Non-compliance exposes both the contractor and the property owner to legal liability.
                </li>
                <li>
                  <strong>Duty of care to property owners and workers</strong> — Restoration sites involve contaminated water, hazardous chemicals, structural instability, electrical risks, and biological hazards. Untrained workers on these sites endanger themselves, occupants, and neighbouring properties.
                </li>
                <li>
                  <strong>Insurance requirements for certified work</strong> — Major insurers require restoration to be performed by appropriately trained and certified professionals. Work performed by untrained contractors may void the property owner&apos;s claim or result in disputes during the claims process.
                </li>
                <li>
                  <strong>IICRC and industry standards alignment</strong> — The IICRC restoration standards (S500, S520, S540) reference OH&S competency as a prerequisite for all restoration work. These training courses ensure our technicians meet the baseline safety knowledge required by international restoration standards.
                </li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'Additional Certifications',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                The courses listed above are the <strong>minimum entry requirements</strong> for all technicians. Depending on their specialisation, technicians may also hold:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>IICRC certification</strong> — Water Damage Restoration Technician (WRT), Fire and Smoke Restoration Technician (FSRT), Applied Microbial Remediation Technician (AMRT), and other specialist credentials. <Link href="/certifications/iicrc-certified" className="text-blue-600 hover:underline">Learn about IICRC certification</Link>.
                </li>
                <li>
                  <strong>WorkSafe licences</strong> — State-specific licences for high-risk work including confined spaces, working at heights, and asbestos removal. <Link href="/certifications/worksafe-certified" className="text-blue-600 hover:underline">WorkSafe requirements</Link>.
                </li>
                <li>
                  <strong>Specialist certifications</strong> — HAZMAT handling credentials for hazardous materials work, and Class A or Class B asbestos removal licences for licensed removal work. <Link href="/certifications/hazmat-certified" className="text-blue-600 hover:underline">HAZMAT certification</Link> | <Link href="/certifications/asbestos-licensed" className="text-blue-600 hover:underline">Asbestos licensing</Link>.
                </li>
              </ul>
              <p className="mt-4">
                <Link href="/certifications" className="text-blue-600 hover:underline font-medium">
                  View all certifications and standards &rarr;
                </Link>
              </p>
            </div>
          ),
        },
      ]}
      relatedPages={[
        { title: 'All Certifications', href: '/certifications', description: 'View the full list of professional certifications required for our network.' },
        { title: 'IICRC Certification', href: '/certifications/iicrc-certified', description: 'The international gold standard for restoration professionals.' },
        { title: 'HAZMAT Certification', href: '/certifications/hazmat-certified', description: 'Hazardous materials handling credentials and requirements.' },
        { title: 'WorkSafe Certification', href: '/certifications/worksafe-certified', description: 'State-specific workplace health and safety accreditation.' },
        { title: 'Asbestos Licensing', href: '/certifications/asbestos-licensed', description: 'Asbestos handling and removal licensing requirements.' },
        { title: 'Australian Standards', href: '/certifications/australian-standards', description: 'Compliance with AS/NZS standards for restoration work.' },
      ]}
    />
  );
}
