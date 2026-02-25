import { Metadata } from 'next';
import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityServicePageTemplate } from '@/components/antigravity';
import { laserCleaningData } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Precision Laser Cleaning Services | Non-Abrasive Restoration',
  description:
    'Advanced laser cleaning and restoration for smoke, soot, heritage brickwork, and delicate surfaces. Non-abrasive vaporisation technology by IICRC-certified technicians across Australia.',
  keywords: [
    'laser cleaning restoration',
    'non-abrasive soot removal',
    'heritage brickwork restoration',
    'laser vaporisation cleaning',
    'smoke damage laser cleaning',
    'precision restoration Australia',
  ].join(', '),
  openGraph: {
    title: 'Precision Laser Cleaning | Disaster Recovery Australia',
    description:
      'Non-abrasive laser vaporisation for smoke, soot, and heritage surface restoration. Advanced technology deployed by certified technicians.',
    type: 'website',
  },
};

export default function LaserCleaningPage() {
  if (FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <AntigravityServicePageTemplate data={laserCleaningData} heroImage="/images/generated/disaster-recovery/hero-fire-damage.webp" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Precision Laser Cleaning</h1>
        <p className="text-lg text-gray-600">Coming soon — advanced laser restoration services.</p>
      </div>
    </div>
  );
}
