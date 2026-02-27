import { Metadata } from 'next';
import ModernContactPage from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | 24/7 Emergency Line',
  description: 'Get immediate emergency help for property damage. Contact our 24/7 online response team. Certified restoration specialists respond within 60 minutes.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/contact',
  },
  openGraph: {
    title: 'Contact Us | 24/7 Emergency Line',
    description: 'Get immediate emergency help for property damage. 24/7 online response with certified restoration specialists.',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ModernContactPage />;
}
