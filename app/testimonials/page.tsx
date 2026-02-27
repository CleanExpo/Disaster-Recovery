import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Client Testimonials',
  description: 'Read verified reviews and testimonials from property owners who used Disaster Recovery Australia. 4.7-star rating from IICRC-certified restoration work.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/testimonials',
  },
  openGraph: {
    title: 'Client Testimonials',
    description: 'Verified reviews from property owners. 4.7-star rating from certified restoration work.',
    type: 'website',
  },
};

export default function TestimonialsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <Star className="h-12 w-12" />,
        title: "Testimonials",
        subtitle: "Real stories from property owners across Australia who trusted Disaster Recovery for emergency restoration. 4.7-star rated.",
      }}
      cta={{ text: 'Get Help Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Testimonials" },
      ]}
    />
  );
}
