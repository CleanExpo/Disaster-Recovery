import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Testimonials | Disaster Recovery",
  description: "",
};

export default function TestimonialsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <Star className="h-12 w-12" />,
        title: "Testimonials",
        subtitle: "",
      }}
      cta={{ text: 'Get Help Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Testimonials" },
      ]}
    />
  );
}
