import { redirect } from 'next/navigation';

// Redirect to main service page for now
// TODO: Build out comprehensive sub-pillar content
export default function SmokeDamageRestorationPage() {
  redirect('/services/fire-smoke-damage');
}
