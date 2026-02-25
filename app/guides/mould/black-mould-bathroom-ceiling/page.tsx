import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Black Mould on Bathroom Ceiling: Removal Guide | Disaster Recovery',
  description: 'Expert answers and solutions for "black mould removal bathroom ceiling". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'black mould removal bathroom ceiling, disaster recovery, restoration services, Australia, IICRC certified' };

export default function BlackMouldBathroomCeilingPage() {
  return (
    <AgGuidePageTemplate
      category="Mould"
      title="Black Mould on Bathroom Ceiling: Removal Guide"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #14532D 0%, #15803D 100%)"
      icon={<Bug className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Mould', href: '/guides/mould' },
        { label: 'Black Mould on Bathroom Ceiling: Removal Guide' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
