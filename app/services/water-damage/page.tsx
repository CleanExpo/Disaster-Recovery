import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Services | 24/7 Online Emergency Response | IICRC S500 Certified',
  description: 'Professional water damage restoration following ANSI/IICRC S500-2021 standards. Immediate extraction, structural drying, and mould prevention. Available 24/7 with 1-hour response time.',
  keywords: 'water damage restoration, flood cleanup, water extraction, structural drying, IICRC S500, emergency water removal, burst pipe repair, sewage cleanup, basement flooding, water mitigation',
  openGraph: {
    title: 'Emergency Water Damage Restoration - IICRC Certified Professionals',
    description: 'Immediate response for water damage emergencies. IICRC S500 certified technicians, advanced drying equipment, insurance approved. Call Get Help Now.',
    images: ['/images/optimised/damage/3D Water Damage.png'],
    type: 'website' },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage' }
};

export default function WaterDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Water Damage Restoration Services',
        subtitle: 'Professional water damage restoration following ANSI/IICRC S500-2021 standards. Immediate extraction, structural drying, and mould prevention. Available 24/7 with 1-hour response time.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage Restoration Services' },
      ]}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
