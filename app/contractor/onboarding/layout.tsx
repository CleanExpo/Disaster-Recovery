import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contractor Onboarding | NRPG Network',
  description: '14-day onboarding program for NRPG network contractors. Complete your training modules, assessments, and certifications to join Australia\'s leading restoration contractor network.',
  robots: { index: false, follow: false },
};

export default function ContractorOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
