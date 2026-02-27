import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import Link from 'next/link';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Restoration Pricing by City | Transparent Costs',
  description: 'Transparent disaster restoration pricing across 10 Australian cities. Water damage, fire, mould, storm, and flood recovery cost estimates.',
  alternates: { canonical: 'https://disasterrecovery.com.au/pricing' },
};

const cities = [
  'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide',
  'gold-coast', 'canberra', 'newcastle', 'sunshine-coast', 'wollongong',
];

const cityLabels: Record<string, string> = {
  sydney: 'Sydney',
  melbourne: 'Melbourne',
  brisbane: 'Brisbane',
  perth: 'Perth',
  adelaide: 'Adelaide',
  'gold-coast': 'Gold Coast',
  canberra: 'Canberra',
  newcastle: 'Newcastle',
  'sunshine-coast': 'Sunshine Coast',
  wollongong: 'Wollongong',
};

const serviceTypes = [
  { slug: 'water-damage', label: 'Water Damage' },
  { slug: 'fire-damage', label: 'Fire Damage' },
  { slug: 'mould-removal', label: 'Mould Removal' },
  { slug: 'storm-damage', label: 'Storm Damage' },
  { slug: 'flood-recovery', label: 'Flood Recovery' },
];

function CityPricingGrid({ service }: { service: { slug: string; label: string } }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cities.map((city) => (
        <Link
          key={city}
          href={`/pricing/${city}/${service.slug}`}
          className="group block p-3 rounded-xl text-center transition-all hover:scale-[1.02]"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">
            {cityLabels[city]}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function PricingHubPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)',
        icon: <DollarSign className="h-12 w-12" />,
        title: 'Restoration Pricing by City',
        subtitle: 'Transparent pricing for disaster restoration across 10 Australian cities. Select your city and damage type for detailed cost breakdowns.',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Pricing' },
      ]}
      stats={[
        { label: 'Cities', value: '10' },
        { label: 'Service Types', value: '5' },
        { label: 'Updated', value: '2026' },
        { label: 'Instant Estimates', value: 'Always' },
      ]}
      sections={[
        ...serviceTypes.map((service, i) => ({
          heading: `${service.label} Pricing`,
          ...(i % 2 === 1 ? { background: 'light' as const } : {}),
          body: <CityPricingGrid service={service} />,
        })),
        {
          heading: 'Minimum Callout Fees',
          background: 'light' as const,
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                All emergency callouts include a minimum service fee.{' '}
                <Link href="/pricing/minimum-callout" className="text-blue-400 hover:text-blue-300 underline">
                  View minimum callout pricing
                </Link>{' '}
                for details on emergency response fees across Australia.
              </p>
            </div>
          ),
        },
        {
          heading: 'Need a Detailed Cost Guide?',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                Our{' '}
                <Link href="/cost" className="text-blue-400 hover:text-blue-300 underline">
                  cost guides
                </Link>{' '}
                provide in-depth breakdowns including insurance coverage information, typical timelines, and factors affecting price. Use our{' '}
                <Link href="/tools/cost-estimator" className="text-blue-400 hover:text-blue-300 underline">
                  Cost Estimator Tool
                </Link>{' '}
                for an instant personalised estimate.
              </p>
            </div>
          ),
          background: 'dark' as const,
        },
      ]}
      relatedPages={getRelatedPages('cost-water')}
    />
  );
}
