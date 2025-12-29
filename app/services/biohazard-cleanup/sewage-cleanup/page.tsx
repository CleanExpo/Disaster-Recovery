import { redirect } from 'next/navigation';

// Redirect to main service page for now
// TODO: Build out comprehensive sub-pillar content
export default function SewageCleanupPage() {
  redirect('/services/biohazard-cleanup');
}
