import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getInsuranceSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Insurance Claims Assistance | All Major Australian Insurers | Disaster Recovery Australia',
  description: 'Expert insurance claims assistance for disaster recovery. Work with NRMA, Suncorp, AAMI, QBE, Allianz and all major Australian insurers. Full claims documentation provided.',
  keywords: [
    'insurance claims assistance',
    'disaster recovery insurance',
    'NRMA insurance claims',
    'Suncorp insurance claims',
    'AAMI insurance claims',
    'insurance claims documentation',
    'insurance approved contractors',
    'water damage insurance',
    'fire damage insurance',
    'storm damage insurance',
    'mould insurance coverage',
    'insurance claim documentation',
    'restoration insurance claims'
  ],
  openGraph: {
    title: 'Insurance Claims Assistance | All Major Australian Insurers',
    description: 'Expert help with disaster recovery insurance claims. Full claims documentation provided. Work with all major Australian insurance companies.',
    type: 'website',
    images: ['/images/generated/disaster-recovery/hero-insurance-claims.webp'] },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/insurance' }
};

export default function InsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-insurance-claims.webp',
        icon: <Shield className="h-12 w-12" />,
        title: "Insurance Claims Assistance",
        subtitle: "Expert insurance claims assistance for disaster recovery. Work with NRMA, Suncorp, AAMI, QBE, Allianz and all major Australian insurers. Full claims documentation provided.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Insurance Claims Assistance" },
      ]}
      sections={getInsuranceSections({ insurerName: 'Insurance Partners', insurerSlug: 'insurance' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
