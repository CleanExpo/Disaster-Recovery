import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Gold Coast High Rise Water Damage Specialists | Disaster Recovery',
  description: 'Expert answers and solutions for "gold coast high rise water damage". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'gold coast high rise water damage, disaster recovery, restoration services, Australia, IICRC certified' };

export default function GoldCoastHighRiseWaterDamagePage() {
  return (
    <AgGuidePageTemplate
      category="Locations"
      title="Gold Coast High Rise Water Damage Specialists"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)"
      icon={<MapPin className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Locations', href: '/guides/locations' },
        { label: 'Gold Coast High Rise Water Damage Specialists' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
