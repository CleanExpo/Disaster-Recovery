import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Water Damage Emergency Checklist',
  description: 'Water damage emergency checklist. Stop the source, protect belongings, document damage, and arrange IICRC-certified water extraction within 24-48 hours.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/emergency/checklists/water-damage',
  },
  openGraph: {
    title: 'Water Damage Emergency Checklist',
    description: 'Emergency checklist for water damage. Stop the source, document, and get certified help.',
    type: 'website',
  },
};

export default function WaterDamageChecklistPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        icon: <Droplets className="h-12 w-12" />,
        title: "Water Damage Emergency Checklist",
        subtitle: "Step-by-step actions when water damage strikes. Stop the source, protect belongings, document for insurance, and arrange certified extraction.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Emergency", href: "/emergency" },
        { label: "Water Damage Emergency Checklist" },
      ]}
      sections={getEmergencySections({ emergencyType: 'Water Damage Checklist', context: 'after water damage occurs' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
