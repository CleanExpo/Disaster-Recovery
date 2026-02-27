import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Blog & Resources',
  description: 'Expert guides, knowledge base articles, and case studies on water damage, fire restoration, mould remediation, storm damage, and insurance claims in Australia.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/blog',
  },
};

export default function BlogPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <BookOpen className="h-12 w-12" />,
        title: 'Blog & Resources',
        subtitle: 'Expert Guides, Knowledge Base & Industry Insights',
      }}
      cta={{ text: 'Lodge a Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Blog & Resources' },
      ]}
      stats={[
        { label: 'Expert Guides', value: '60+' },
        { label: 'Knowledge Articles', value: '20+' },
        { label: 'Cost Guides', value: '50+' },
        { label: 'Updated', value: '2024' },
      ]}
      sections={[
        {
          heading: 'Restoration Guides',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Comprehensive guides to help you understand the restoration process, know what to expect, and make informed decisions about your property.</p>
              <div className="grid md:grid-cols-2 gap-4 not-prose mt-4">
                {[
                  { title: 'Water Damage Guide', href: '/guides/water-damage', desc: 'Complete guide to water damage restoration and what to expect.' },
                  { title: 'Fire Damage Guide', href: '/guides/fire-damage', desc: 'Understanding fire and smoke damage restoration.' },
                  { title: 'Mould Remediation Guide', href: '/guides/mould', desc: 'Health risks, identification, and professional remediation.' },
                  { title: 'Insurance Claims Guide', href: '/guides/insurance', desc: 'Navigate your disaster insurance claim step by step.' },
                  { title: 'Emergency Preparedness', href: '/guides/emergency', desc: 'Be prepared for natural disasters and emergencies.' },
                  { title: 'Equipment Guide', href: '/guides/equipment', desc: 'Industrial restoration equipment and how it works.' },
                ].map((guide) => (
                  <a key={guide.href} href={guide.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ),
        },
        {
          heading: 'Knowledge Base',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>In-depth technical articles on restoration science, industry standards, and Australian regulations.</p>
              <div className="grid md:grid-cols-2 gap-4 not-prose mt-4">
                {[
                  { title: 'Water Damage Restoration Science', href: '/knowledge/water-damage-restoration-science', desc: 'IICRC S500 water damage categories, classes, and drying science.' },
                  { title: 'Mould Remediation Standards', href: '/knowledge/mould-remediation-standards', desc: 'IICRC S520 mould protocols and Australian health guidelines.' },
                  { title: 'Fire Damage Restoration Process', href: '/knowledge/fire-damage-restoration-process', desc: 'Four-phase fire restoration including smoke and soot science.' },
                  { title: 'Insurance Claims Process', href: '/knowledge/insurance-claims-process-australia', desc: 'Australian insurance claims process, AFCA, and legal frameworks.' },
                  { title: 'IICRC Certification Standards', href: '/knowledge/iicrc-certification-standards', desc: 'Certification requirements, standards, and why they matter.' },
                  { title: 'Emergency Response Protocols', href: '/knowledge/emergency-response-protocols', desc: 'PPRR emergency response framework and the golden hour.' },
                ].map((article) => (
                  <a key={article.href} href={article.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                    <p className="text-sm text-gray-600">{article.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Cost Guides',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Transparent pricing information for restoration services across all major Australian cities. Understand what to expect before engaging a contractor.</p>
              <div className="grid md:grid-cols-3 gap-4 not-prose mt-4">
                {[
                  { title: 'Water Damage Costs', href: '/cost/sydney-water-damage' },
                  { title: 'Fire Damage Costs', href: '/cost/sydney-fire-damage' },
                  { title: 'Mould Removal Costs', href: '/cost/sydney-mould-removal' },
                  { title: 'Storm Damage Costs', href: '/cost/sydney-storm-damage' },
                  { title: 'Flood Restoration Costs', href: '/cost/sydney-flood-restoration' },
                  { title: 'Cost Estimator Tool', href: '/tools/cost-estimator' },
                ].map((guide) => (
                  <a key={guide.href} href={guide.href} className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center">
                    <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                  </a>
                ))}
              </div>
            </div>
          ),
        },
      ]}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
