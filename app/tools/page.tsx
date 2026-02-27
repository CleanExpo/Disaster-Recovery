import { Metadata } from 'next';
import Script from 'next/script';
import { Wrench } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Disaster Recovery Cost Estimator',
  description: 'Property damage assessment tools. Get instant pricing estimates for water damage, fire, mould, storm, and flood restoration across Australia.',
  url: 'https://disasterrecovery.com.au/tools',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
};

export const metadata: Metadata = {
  title: 'Tools & Calculators | Disaster Recovery Cost Estimator',
  description: 'Property damage assessment tools. Use our cost estimator to get instant pricing estimates for water damage, fire, mould, storm, and flood restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/tools',
  },
};

export default function ToolsIndexPage() {
  const schemaStr = JSON.stringify(pageSchema);
  return (
    <>
    <Script id="tools-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 50%, #0F2942 100%)',
        icon: <Wrench className="h-12 w-12" />,
        title: 'Tools & Calculators',
        subtitle: 'Assessment Tools for Property Owners',
      }}
      cta={{ text: 'Lodge a Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tools' },
      ]}
      sections={[
        {
          heading: 'Cost Estimator',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Get an instant cost estimate for emergency restoration based on your specific situation. Our estimator uses real Australian pricing data across all major damage types.</p>
              <div className="not-prose mt-6">
                <a href="/tools/cost-estimator" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Open Cost Estimator
                </a>
              </div>
              <h3>What you can estimate:</h3>
              <ul>
                <li>Water damage restoration costs</li>
                <li>Fire and smoke damage repair costs</li>
                <li>Mould remediation costs</li>
                <li>Storm damage repair costs</li>
                <li>Flood restoration costs</li>
                <li>Sewage cleanup costs</li>
                <li>Biohazard decontamination costs</li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'Is It Covered?',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Check whether your specific type of damage is typically covered by Australian home and contents insurance policies.</p>
              <div className="not-prose mt-6">
                <a href="/is-it-covered" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Check Coverage
                </a>
              </div>
            </div>
          ),
          background: 'light',
        },
      ]}
      relatedPages={getRelatedPages('cost-estimator')}
    />
    </>
  );
}
