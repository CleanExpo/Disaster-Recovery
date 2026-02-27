import { Metadata } from 'next';
import { Newspaper } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Media & Press | Disaster Recovery Australia',
  description: 'Media enquiries, press releases, and news from Disaster Recovery Australia. Contact our media team for interviews and industry commentary.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/media',
  },
  openGraph: {
    title: 'Media & Press | Disaster Recovery Australia',
    description: 'Media enquiries, press releases, and news from Disaster Recovery Australia.',
    type: 'website',
  },
};

export default function MediaPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Newspaper className="h-12 w-12" />,
        title: "Media & Press",
        subtitle: "Media enquiries, press releases, and news from Disaster Recovery Australia.",
      }}
      cta={{ text: 'Media Contact', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Media" },
      ]}
      relatedPages={[
        { title: 'Photo Gallery', href: '/events/gallery', description: 'Before and after photos from restoration projects across Australia.' },
        { title: 'Testimonials', href: '/testimonials', description: 'Real stories from property owners we have helped.' },
        { title: 'About Us', href: '/about', description: 'Learn about Disaster Recovery Australia.' },
        { title: 'Our Partners', href: '/partners', description: 'Insurance and technology partnerships.' },
        { title: 'Facts & Statistics', href: '/facts', description: 'Key statistics about disaster recovery in Australia.' },
      ]}
    />
  );
}
