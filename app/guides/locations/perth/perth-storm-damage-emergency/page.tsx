import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Perth Storm Damage Emergency Response | Disaster Recovery',
  description: 'Expert answers and solutions for "perth storm damage emergency response team". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'perth storm damage emergency response team, disaster recovery, restoration services, Australia, IICRC certified' };

export default function PerthStormDamageEmergencyPage() {
  return (
    <AgGuidePageTemplate
      category="Locations"
      title="Perth Storm Damage Emergency Response"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)"
      icon={<MapPin className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Locations', href: '/guides/locations' },
        { label: 'Perth Storm Damage Emergency Response' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
