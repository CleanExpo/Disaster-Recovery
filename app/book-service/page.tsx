import { Metadata } from 'next';
import BookServicePage from './BookServiceClient';

export const metadata: Metadata = {
  title: 'Book Restoration Service',
  description: 'Book professional disaster restoration services online. Water damage, fire, mould, and storm repair. Certified contractors, IICRC-certified.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/book-service',
  },
  openGraph: {
    title: 'Book Restoration Service',
    description: 'Book professional disaster restoration services online. Certified contractors, IICRC-certified.',
    type: 'website',
  },
};

export default function BookServicePageWrapper() {
  return <BookServicePage />;
}
