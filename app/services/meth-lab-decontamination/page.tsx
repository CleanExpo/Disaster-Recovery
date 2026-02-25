import { Metadata } from 'next';
import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityServicePageTemplate } from '@/components/antigravity';
import { methLabDecontaminationData } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Clandestine Drug Lab Decontamination | Certified Remediation',
  description:
    'Professional clandestine drug laboratory decontamination and methamphetamine residue remediation. NATA-accredited testing, council clearance certificates, and Level C hazmat protocols across Australia.',
  keywords: [
    'meth lab decontamination',
    'clandestine drug lab remediation',
    'methamphetamine residue removal',
    'drug lab cleanup Australia',
    'NATA accredited testing',
    'council clearance certificate',
    'hazmat decontamination',
  ].join(', '),
  openGraph: {
    title: 'Drug Lab Decontamination | Disaster Recovery Australia',
    description:
      'Certified clandestine drug laboratory remediation with NATA-accredited testing and council clearance. Discreet, compliance-certified teams Australia-wide.',
    type: 'website',
  },
};

export default function MethLabDecontaminationPage() {
  if (FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <AntigravityServicePageTemplate data={methLabDecontaminationData} heroImage="/images/generated/disaster-recovery/hero-biohazard.webp" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Clandestine Drug Lab Decontamination</h1>
        <p className="text-lg text-gray-600">Coming soon — certified biohazard remediation services.</p>
      </div>
    </div>
  );
}
