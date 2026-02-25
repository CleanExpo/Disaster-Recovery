import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Canberra Government Building Restoration Services | Disaster Recovery',
  description: 'Expert answers and solutions for "canberra government building restoration". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'canberra government building restoration, disaster recovery, restoration services, Australia, IICRC certified' };

export default function CanberraGovernmentRestorationPage() {
  return (
    <AgGuidePageTemplate
      category="Locations"
      title="Canberra Government Building Restoration Services"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)"
      icon={<MapPin className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Locations', href: '/guides/locations' },
        { label: 'Canberra Government Building Restoration Services' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
