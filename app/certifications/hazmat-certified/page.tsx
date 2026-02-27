import { Metadata } from 'next';
import { Award } from 'lucide-react';
import Link from 'next/link';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'HAZMAT Certified | Hazardous Materials Restoration',
  description: 'HAZMAT certified restoration professionals handling hazardous materials, chemical spills, biohazard contamination, and dangerous goods incidents across Australia.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/certifications/hazmat-certified',
  },
};

export default function HAZMATCertifiedPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)',
        icon: <Award className="h-12 w-12" />,
        title: 'HAZMAT Certified',
        subtitle: 'Certified handling of hazardous materials, chemical contamination, and dangerous goods incidents in property restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      secondaryCta={{ text: 'View All Certifications', href: '/certifications' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'HAZMAT Certified' },
      ]}
      sections={[
        {
          heading: 'What HAZMAT Certification Means for Your Restoration',
          body: (
            <div className="space-y-4">
              <p>
                HAZMAT (Hazardous Materials) certification equips restoration technicians to safely identify, handle, contain, and remediate hazardous substances encountered during property restoration. This includes chemical spills, biological contaminants, lead paint, asbestos, methamphetamine residue, sewage, and industrial pollutants.
              </p>
              <p>
                Disaster recovery sites frequently involve hazardous materials that untrained workers may not recognise. Fire damage produces toxic smoke residue and combustion byproducts. Flood water carries sewage, chemicals, and biological contaminants. Older properties contain asbestos, lead paint, and legacy industrial chemicals. HAZMAT-certified technicians are trained to identify these hazards and apply the correct containment, removal, and decontamination procedures.
              </p>
              <p>
                All HAZMAT-certified technicians in our network maintain current credentials and undergo regular competency assessments to ensure they meet Australian WHS requirements and international best practices.
              </p>
            </div>
          ),
        },
        {
          heading: 'What HAZMAT Technicians Encounter',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Hazardous materials in property restoration are more common than most property owners realise. HAZMAT-certified technicians in our network are trained to handle:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Asbestos-containing materials</strong> — Found in pre-1990 buildings in wall sheeting, insulation, flooring, roofing, and pipe lagging.</li>
                <li><strong>Lead-based paint</strong> — Common in properties built before 1970, released as dust during demolition and restoration.</li>
                <li><strong>Methamphetamine contamination</strong> — Former clandestine drug laboratories requiring specialist decontamination to safe levels.</li>
                <li><strong>Sewage and biological waste</strong> — Category 3 black water from sewage overflows, flood contamination, and sanitary failures.</li>
                <li><strong>Chemical spills</strong> — Industrial chemicals, fuel, solvents, and cleaning agents released during property damage events.</li>
                <li><strong>Smoke and soot residue</strong> — Toxic combustion byproducts including polycyclic aromatic hydrocarbons (PAHs) and volatile organic compounds (VOCs).</li>
                <li><strong>Biohazard and trauma scenes</strong> — Blood-borne pathogens, bodily fluids, and biological material requiring specialist decontamination protocols.</li>
                <li><strong>Mould and microbial contamination</strong> — Certain mould species produce mycotoxins that require hazardous materials handling procedures.</li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'Prerequisite OH&S Training',
          body: (
            <div className="space-y-4">
              <p>
                Before pursuing HAZMAT certification, all technicians must first complete our{' '}
                <Link href="/certifications/minimum-training-requirements" className="text-blue-600 hover:underline">minimum training requirements</Link>{' '}
                — six mandatory OH&S courses covering work safety, risk management, SWMS, SDS, SOP, and asbestos awareness. These foundational courses are delivered by{' '}
                <a href="https://carsi.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CARSI</a>{' '}
                (Cleaning and Restoration Skills Institute) and include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><a href="https://carsi.com.au/product/safety-procedures/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Work Safety Management</a> — Workplace safety procedures and hazard identification</li>
                <li><a href="https://carsi.com.au/product/risk-assessment-course/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Risk Management</a> — Risk identification and control measures</li>
                <li><a href="https://carsi.com.au/product/safe-work-method-statements-swms-course/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SWMS Management</a> — Safe Work Method Statements for high-risk work</li>
                <li><a href="https://carsi.com.au/product/safety-data-sheet-sds-course/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SDS Management</a> — Safety Data Sheet interpretation for chemicals</li>
                <li><a href="https://carsi.com.au/product/standard-operating-procedures-sop-course/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SOP Management</a> — Standard Operating Procedures for consistent outcomes</li>
                <li><a href="https://carsi.com.au/product/asbestos/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Asbestos Awareness</a> — Identification and safe work around asbestos-containing materials</li>
              </ul>
              <p className="mt-2">
                These prerequisites ensure every HAZMAT technician has a solid foundation in workplace safety before undertaking specialist hazardous materials training.
              </p>
            </div>
          ),
        },
        {
          heading: 'Why HAZMAT Certification Matters',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Hiring uncertified contractors for work involving hazardous materials is one of the most dangerous and costly mistakes a property owner can make:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Legal compliance</strong> — Australian WHS legislation requires hazardous materials to be handled by appropriately trained and certified workers. Non-compliance can result in prosecution, fines, and stop-work orders.</li>
                <li><strong>Insurance requirements</strong> — Major insurers require HAZMAT work to be performed by certified professionals. Uncertified work may void your claim.</li>
                <li><strong>Health and safety</strong> — Improper handling of hazardous materials can cause serious illness or death, contaminate neighbouring properties, and create long-term environmental damage.</li>
                <li><strong>Correct decontamination</strong> — Different hazardous materials require specific containment, removal, and decontamination protocols. Using the wrong method can spread contamination rather than remove it.</li>
                <li><strong>Post-clearance verification</strong> — Certified HAZMAT technicians conduct clearance testing to verify that decontamination has been successful before re-occupancy is permitted.</li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'HAZMAT Certification FAQ',
          body: (
            <>
              <h3 className="font-bold text-lg mb-2">How do I verify a technician&apos;s HAZMAT certification?</h3>
              <p className="mb-4">
                All contractors in our network provide proof of certification on request. We verify HAZMAT credentials annually as part of our quality assurance programme. You can also check state-specific registers for asbestos removal and dangerous goods handling licences.
              </p>
              <h3 className="font-bold text-lg mb-2">Do all restoration jobs require HAZMAT-certified technicians?</h3>
              <p className="mb-4">
                Not all jobs require HAZMAT certification. However, any job involving known or suspected hazardous materials — including properties built before 1990, fire damage sites, sewage contamination, or former industrial premises — should be assessed and handled by HAZMAT-certified professionals.
              </p>
              <h3 className="font-bold text-lg mb-2">What is the difference between HAZMAT certification and asbestos removal licensing?</h3>
              <p>
                HAZMAT certification covers a broad range of hazardous materials. Asbestos removal is a specialist sub-category that requires separate state-issued licences (Class A for friable asbestos, Class B for bonded asbestos). Our network includes technicians who hold both. <Link href="/certifications/asbestos-licensed" className="text-blue-600 hover:underline">Learn about asbestos licensing</Link>.
              </p>
            </>
          ),
        },
      ]}
      relatedPages={[
        { title: 'Minimum Training Requirements', href: '/certifications/minimum-training-requirements', description: 'Mandatory OH&S courses required before any site deployment.' },
        { title: 'Asbestos Licensing', href: '/certifications/asbestos-licensed', description: 'Class A and Class B asbestos removal licensing requirements.' },
        { title: 'IICRC Certification', href: '/certifications/iicrc-certified', description: 'The international gold standard for restoration professionals.' },
        { title: 'WorkSafe Certification', href: '/certifications/worksafe-certified', description: 'State-specific workplace health and safety accreditation.' },
        { title: 'Biohazard Cleaning', href: '/services/biohazard-cleaning', description: 'Professional biohazard and trauma scene cleaning services.' },
        { title: 'All Certifications', href: '/certifications', description: 'View the full list of certifications required for our network.' },
      ]}
    />
  );
}
