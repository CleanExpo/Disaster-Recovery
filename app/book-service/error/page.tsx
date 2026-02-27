import { Metadata } from 'next';
import BookingErrorPage from './BookingErrorClient';

export const metadata: Metadata = {
  title: 'Booking Error',
  description: 'Something went wrong with your booking. Review the error details, troubleshooting steps, and try again or contact our support team.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/book-service/error',
  },
  openGraph: {
    title: 'Booking Error',
    description: 'Something went wrong with your booking. Review error details and try again.',
    type: 'website',
  },
};

export default function BookingErrorPageWrapper() {
  return <BookingErrorPage />;
}
