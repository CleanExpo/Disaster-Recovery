import { Metadata } from 'next';
import { Map } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Site Map | Disaster Recovery Australia',
  description: 'Complete site map for Disaster Recovery Australia. Browse all service pages, location pages, guides, emergency checklists, and insurance decoder tools.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/sitemap-page',
  },
  openGraph: {
    title: 'Site Map | Disaster Recovery Australia',
    description: 'Browse all pages on Disaster Recovery Australia — services, locations, guides, and tools.',
    type: 'website',
  },
};

export default function SitemapPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Map className="h-12 w-12" />,
        title: "Site Map",
        subtitle: "Complete navigation guide to all Disaster Recovery services, locations, guides, emergency checklists, and insurance tools.",
      }}
      cta={{ text: 'Home', href: '/' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Site Map" },
      ]}
    />
  );
}
