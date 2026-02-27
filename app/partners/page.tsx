import { Metadata } from 'next';
import { Handshake } from 'lucide-react';
import Link from 'next/link';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Insurance Partners | Priority Emergency Claims | Disaster Recovery Australia',
  description: 'Disaster Recovery partners with major Australian insurers for priority emergency claims processing. NRMA, Suncorp, and Clean Claims partnerships.',
  alternates: { canonical: 'https://disasterrecovery.com.au/partners' },
};

const partners = [
  { title: 'Clean Claims', href: '/partners/clean-claims', description: 'Strategic technology partner for digital claims processing and contractor matching.' },
  { title: 'NRMA Policyholders', href: '/partners/nrma', description: 'Priority emergency restoration matching for NRMA insurance policyholders.' },
  { title: 'Suncorp Group', href: '/partners/suncorp', description: 'Priority emergency response for Suncorp, AAMI, GIO, and Apia policyholders.' },
];

export default function PartnersHubPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
        icon: <Handshake className="h-12 w-12" />,
        title: 'Our Partners',
        subtitle: 'We partner with major Australian insurers and technology providers to deliver faster emergency response and streamlined claims processing.',
      }}
      cta={{ text: 'Lodge a Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Partners' },
      ]}
      sections={[
        {
          heading: 'Strategic Partnerships',
          body: (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block p-4 rounded-xl transition-all hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          ),
        },
      ]}
      relatedPages={[
        { title: 'Insurance Claims', href: '/insurance', description: 'Understanding disaster insurance claims in Australia.' },
        { title: 'Is It Covered?', href: '/is-it-covered', description: 'Check if your damage type is covered by your policy.' },
        { title: 'How It Works', href: '/how-it-works', description: 'Step-by-step guide to using our platform.' },
        { title: 'About Us', href: '/about', description: 'Learn about Disaster Recovery Australia.' },
        { title: 'Lodge a Claim', href: '/claim', description: 'Start your emergency claim online now.' },
      ]}
    />
  );
}
