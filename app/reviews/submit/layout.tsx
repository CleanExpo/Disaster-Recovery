import type { Metadata } from 'next';

/**
 * DR-388: Layout for the review submission page.
 * noindex — this is a private submission URL sent directly to clients.
 */
export const metadata: Metadata = {
  title: 'Leave a Review | Disaster Recovery',
  description: 'Share your experience with your restoration contractor.',
  robots: { index: false, follow: false },
};

export default function ReviewSubmitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
