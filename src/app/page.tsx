import UltraModernHero from '@/components/UltraModernHero';
import UltraModernServiceCards from '@/components/UltraModernServiceCards';
import LiveDashboard from '@/components/LiveDashboard';
import AIDamageAssessment from '@/components/AIDamageAssessment';

export default function HomePage() {
  return (
    <>
      <UltraModernHero />
      <LiveDashboard />
      <UltraModernServiceCards />
      <AIDamageAssessment />
    </>
  );
}