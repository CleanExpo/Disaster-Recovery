import { Metadata } from 'next';
import { Map } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Sitemap | All Pages | Disaster Recovery',
  description: 'Complete sitemap of all pages on Disaster Recovery. Find services, locations, pricing, and resources.',
  robots: {
    index: true,
    follow: true },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/sitemap',
  },
};

export default function SitemapPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Map className="h-12 w-12" />,
        title: "Sitemap",
        subtitle: "Complete sitemap of all pages on Disaster Recovery. Find services, locations, pricing, and resources.",
      }}
      cta={{ text: 'Home', href: '/' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Sitemap" },
      ]}
    />
  );
}
