import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Fire & Smoke Damage Restoration | IICRC Certified Specialists | Available 24/7',
  description: 'Expert fire and smoke damage restoration services following IICRC S700 standards. Soot removal, smoke odour elimination, structural fire damage repair. 24/7 emergency response nationwide.',
  keywords: [
    'fire damage restoration',
    'smoke damage cleanup',
    'soot removal',
    'fire damage repair',
    'smoke odour removal',
    'IICRC S700 certified',
    'structural fire damage',
    'fire restoration company',
    'smoke damage restoration',
    'fire cleanup services',
    'thermal fogging',
    'ozone treatment',
    'fire damage assessment',
    'smoke residue removal',
    'fire damage specialists'
  ],
  openGraph: {
    title: 'Fire & Smoke Damage Restoration | IICRC Certified Specialists',
    description: 'Professional fire and smoke damage restoration following IICRC S700 standards. 24/7 emergency response for complete fire damage recovery.',
    images: [
      {
        url: '/images/optimised/damage/3D image of a house fire.png',
        width: 1200,
        height: 630,
        alt: 'Professional fire damage restoration service' },
    ] },
  twitter: {
    card: 'summary_large_image',
    title: 'Fire & Smoke Damage Restoration | IICRC Certified',
    description: 'Expert fire damage restoration services. IICRC S700 certified technicians. 24/7 emergency response nationwide.',
    images: ['/images/optimised/damage/3D image of a house fire.png'] },
  alternates: {
    canonical: '/services/fire-damage' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

export default function FireDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Flame className="h-12 w-12" />,
        title: 'Fire & Smoke Damage Restoration',
        subtitle: 'Expert fire and smoke damage restoration services following IICRC S700 standards. Soot removal, smoke odour elimination, structural fire damage repair. 24/7 emergency response nationwide.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire & Smoke Damage Restoration' },
      ]}
      relatedPages={getRelatedPages('fire-damage')}
    />
  );
}
