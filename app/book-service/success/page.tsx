import { Metadata } from 'next';
import BookingSuccessPage from './SuccessClient';

export const metadata: Metadata = {
  title: 'Booking Confirmed',
  description: 'Your restoration service booking is confirmed. A certified contractor will contact you within 30 minutes to schedule your service.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/book-service/success',
  },
  openGraph: {
    title: 'Booking Confirmed',
    description: 'Your restoration service booking is confirmed. Contractor contact within 30 minutes.',
    type: 'website',
  },
};

export default function BookingSuccessPageWrapper() {
  return <BookingSuccessPage />;
}
