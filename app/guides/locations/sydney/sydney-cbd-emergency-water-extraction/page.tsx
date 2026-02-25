import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Sydney CBD Emergency Water Extraction - 24/7 Service | Disaster Recovery',
  description: 'Expert answers and solutions for "emergency water extraction sydney cbd after hours". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'emergency water extraction sydney cbd after hours, disaster recovery, restoration services, Australia, IICRC certified' };

export default function SydneyCbdEmergencyWaterExtractionPage() {
  return (
    <AgGuidePageTemplate
      category="Locations"
      title="Sydney CBD Emergency Water Extraction - 24/7 Service"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)"
      icon={<MapPin className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Locations', href: '/guides/locations' },
        { label: 'Sydney CBD Emergency Water Extraction - 24/7 Se...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
