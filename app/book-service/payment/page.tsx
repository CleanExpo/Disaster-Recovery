import { Metadata } from 'next';
import PaymentPage from './PaymentClient';

export const metadata: Metadata = {
  title: 'Secure Payment',
  description: 'Complete your restoration service booking with our secure payment system. Stripe-powered checkout with full payment protection.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/book-service/payment',
  },
  openGraph: {
    title: 'Secure Payment',
    description: 'Complete your restoration service booking with secure Stripe-powered checkout.',
    type: 'website',
  },
};

export default function PaymentPageWrapper() {
  return <PaymentPage />;
}
