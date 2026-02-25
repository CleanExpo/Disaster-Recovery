import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Melbourne Apartment Flood Damage Restoration | Disaster Recovery',
  description: 'Expert answers and solutions for "melbourne apartment flood damage restoration". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'melbourne apartment flood damage restoration, disaster recovery, restoration services, Australia, IICRC certified' };

export default function MelbourneApartmentFloodRestorationPage() {
  return (
    <AgGuidePageTemplate
      category="Locations"
      title="Melbourne Apartment Flood Damage Restoration"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)"
      icon={<MapPin className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Locations', href: '/guides/locations' },
        { label: 'Melbourne Apartment Flood Damage Restoration' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
