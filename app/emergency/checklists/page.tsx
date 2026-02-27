import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Response Checklists',
  description: 'Step-by-step emergency response checklists for water damage, fire, storm, mould, and sewage disasters. Protect life, property, and ensure proper insurance documentation.',
  keywords: ['emergency checklist', 'disaster response checklist', 'water damage checklist', 'fire damage steps', 'storm damage checklist Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/emergency/checklists' },
};

export default function EmergencyChecklistsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #D93025 50%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Emergency Response Checklists',
        subtitle: 'Step-by-step guides for immediate action during disasters. Follow these critical checklists to protect life, property, and ensure proper insurance documentation.',
      }}
      cta={{ text: 'Emergency Response Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'Emergency Response Checklists' },
      ]}
      sections={getEmergencySections({ emergencyType: 'Emergency Checklist', context: 'for all types of property disasters' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
