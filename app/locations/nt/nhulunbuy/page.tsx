import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Nhulunbuy',
  description: '24/7 disaster recovery in Nhulunbuy, Northern Territory. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' ,
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/nt/nhulunbuy',
  },
};

export default function NhulunbuyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Nhulunbuy',
        subtitle: '24/7 Emergency Services in Nhulunbuy',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'NT', href: '/locations/nt' },
        { label: 'Nhulunbuy' },
      ]}
      sections={getLocationSections({ city: 'Nhulunbuy', state: 'NT' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
