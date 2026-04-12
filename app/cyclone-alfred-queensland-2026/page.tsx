import { redirect } from 'next/navigation';
import { Metadata } from 'next';

// Canonical URL lives at /events/cyclone-alfred-fnq-2026
// This route handles legacy URL pattern and redirects permanently.

export const metadata: Metadata = {
  // Tell crawlers not to index this redirect page
  robots: { index: false, follow: true },
};

export default function CycloneAlfredRedirect() {
  redirect('/events/cyclone-alfred-fnq-2026');
}
