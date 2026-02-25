import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Smoke Damage Cleaning After House Fire | Disaster Recovery',
  description: 'Expert answers and solutions for "smoke damage cleaning after house fire". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'smoke damage cleaning after house fire, disaster recovery, restoration services, Australia, IICRC certified' };

export default function SmokeDamageCleaningGuidePage() {
  return (
    <AgGuidePageTemplate
      category="Fire Damage"
      title="Smoke Damage Cleaning After House Fire"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Flame className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Fire Damage', href: '/guides/fire-damage' },
        { label: 'Smoke Damage Cleaning After House Fire' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
