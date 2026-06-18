import { Metadata } from 'next';
import BookingSuccessPage from './SuccessClient';

export const metadata: Metadata = {
  title: 'Booking Confirmed',
  description: 'Your restoration service booking is confirmed. A certified contractor will contact you to schedule your service.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/book-service',
  },
  openGraph: {
    title: 'Booking Confirmed',
    description: 'Your restoration service booking is confirmed. A certified contractor will be in touch to schedule your service.',
    type: 'website',
  },
};

export default function BookingSuccessPageWrapper() {
  return <BookingSuccessPage />;
}
