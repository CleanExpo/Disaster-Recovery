import { Metadata } from 'next';
import { Camera } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Gallery | Disaster Recovery",
  description: "",
};

export default function EventsGalleryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Camera className="h-12 w-12" />,
        title: "Gallery",
        subtitle: "",
      }}
      cta={{ text: 'Get Started', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Events", href: "/events" },
        { label: "Gallery" },
      ]}
    />
  );
}
