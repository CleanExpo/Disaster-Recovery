import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: '24/7 Emergency Response | 1-Hour Response',
  description: 'Professional 24/7 emergency response services for disaster recovery. Water damage, fire damage, storm damage emergency mitigation. 1-hour response time nationwide.',
  keywords: [
    'emergency response services',
    '24/7 emergency response',
    'disaster emergency response',
    'emergency mitigation',
    'emergency restoration',
    'rapid response team',
    'emergency water extraction',
    'emergency board up',
    'emergency tarping',
    'disaster response team',
    'emergency cleanup',
    'immediate response',
    'emergency contractors',
    '24 hour emergency service',
    'disaster mitigation'
  ],
  openGraph: {
    title: '24/7 Online Emergency Response Services | 1-Hour Response Time',
    description: 'Professional 24/7 emergency response for disaster recovery. Rapid response team available for water, fire, and storm damage emergencies.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '24/7 Online Emergency Response Services',
    description: 'Professional emergency response team available 24/7. 1-hour response time for disaster recovery emergencies.',
  },
  alternates: {
    canonical: '/services/emergency-services' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

export default function EmergencyResponsePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: '24/7 Online Emergency Response Services',
        subtitle: 'Professional 24/7 emergency response services for disaster recovery. Water damage, fire damage, storm damage emergency mitigation. 1-hour response time nationwide.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: '24/7 Online Emergency Response Services' },
      ]}
      sections={getServiceChildSections({ serviceName: '24/7 Online Emergency Response Services', parentCategory: 'Emergency Services', context: 'rapid disaster mitigation and emergency response' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
