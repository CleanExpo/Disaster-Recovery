import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Adelaide Rental Property Mould Remediation | Disaster Recovery',
  description: 'Expert answers and solutions for "adelaide mould remediation rental property". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'adelaide mould remediation rental property, disaster recovery, restoration services, Australia, IICRC certified' };

export default function AdelaideRentalMouldRemediationPage() {
  return (
    <AgGuidePageTemplate
      category="Locations"
      title="Adelaide Rental Property Mould Remediation"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)"
      icon={<MapPin className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Locations', href: '/guides/locations' },
        { label: 'Adelaide Rental Property Mould Remediation' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
