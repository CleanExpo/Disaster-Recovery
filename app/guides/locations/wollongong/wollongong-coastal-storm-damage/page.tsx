import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Wollongong Coastal Property Storm Damage Repair | Disaster Recovery',
  description: 'Expert answers and solutions for "wollongong coastal property storm damage". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'wollongong coastal property storm damage, disaster recovery, restoration services, Australia, IICRC certified' };

export default function WollongongCoastalStormDamagePage() {
  return (
    <AgGuidePageTemplate
      category="Locations"
      title="Wollongong Coastal Property Storm Damage Repair"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)"
      icon={<MapPin className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Locations', href: '/guides/locations' },
        { label: 'Wollongong Coastal Property Storm Damage Repair' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
