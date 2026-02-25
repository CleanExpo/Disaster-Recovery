import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Newcastle Industrial Flood Recovery Services | Disaster Recovery',
  description: 'Expert answers and solutions for "newcastle industrial flood recovery services". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'newcastle industrial flood recovery services, disaster recovery, restoration services, Australia, IICRC certified' };

export default function NewcastleIndustrialFloodRecoveryPage() {
  return (
    <AgGuidePageTemplate
      category="Locations"
      title="Newcastle Industrial Flood Recovery Services"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)"
      icon={<MapPin className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Locations', href: '/guides/locations' },
        { label: 'Newcastle Industrial Flood Recovery Services' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
