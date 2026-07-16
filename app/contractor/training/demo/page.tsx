import { redirect } from 'next/navigation';

/**
 * Training demo modules are not production onboarding.
 * Canonical path: /contractor/onboarding (auth-gated, real progress API).
 */
export default function TrainingDemoPage() {
  redirect('/contractor/onboarding');
}
