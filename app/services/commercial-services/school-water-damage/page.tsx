import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'School Water Damage Cleanup | Disaster Recovery',
  description: 'Professional school water damage cleanup services across Australia. 24/7 emergency response for education facility, classroom flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/school-water-damage',
  },
};

export default function SchoolWaterDamageCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'School Water Damage Cleanup',
        subtitle: 'Professional school water damage cleanup services across Australia. 24/7 emergency response for education facility, classroom flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'School Water Damage Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'School Water Damage Cleanup', parentCategory: 'Commercial Services', context: 'education facility and classroom flooding restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
