import { redirect } from 'next/navigation';

// Redirect to the canonical contractor home — the portal page
// (which is now wired to real API data)
export default function ContractorDashboardPage() {
  redirect('/contractor/portal');
}
