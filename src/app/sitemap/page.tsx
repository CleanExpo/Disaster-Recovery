import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { MapPin, FileText, DollarSign, Shield, Users, HelpCircle, Clock, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sitemap | All Pages | Disaster Recovery Australia',
  description: 'Complete sitemap of all pages on Disaster Recovery Australia. Find services, locations, pricing, and resources.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: 'Main Pages',
      icon: FileText,
      links: [
        { href: '/', label: 'Homepage' },
        { href: '/get-help', label: 'Get Emergency Help' },
        { href: '/contractors', label: 'For Contractors' },
        { href: '/contractors/apply', label: 'Join Our Network' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
      ]
    },
    {
      title: 'Services',
      icon: Shield,
      links: [
        { href: '/services', label: 'All Services' },
        { href: '/services/water-damage', label: 'Water Damage Restoration' },
        { href: '/services/fire-damage', label: 'Fire & Smoke Damage' },
        { href: '/services/mould-removal', label: 'Mould Remediation' },
        { href: '/services/flood-recovery', label: 'Flood Recovery' },
        { href: '/services/storm-damage', label: 'Storm Damage' },
        { href: '/services/biohazard-cleanup', label: 'Biohazard Cleanup' },
        { href: '/services/trauma-cleanup', label: 'Trauma Cleanup' },
        { href: '/services/sewage-cleanup', label: 'Sewage Cleanup' },
      ]
    },
    {
      title: 'Locations',
      icon: MapPin,
      links: [
        { href: '/locations', label: 'All Locations' },
        { href: '/locations/nsw', label: 'New South Wales' },
        { href: '/locations/vic', label: 'Victoria' },
        { href: '/locations/qld', label: 'Queensland' },
        { href: '/locations/wa', label: 'Western Australia' },
        { href: '/locations/sa', label: 'South Australia' },
        { href: '/locations/tas', label: 'Tasmania' },
        { href: '/locations/act', label: 'ACT' },
        { href: '/locations/nt', label: 'Northern Territory' },
      ]
    },
    {
      title: 'Pricing',
      icon: DollarSign,
      links: [
        { href: '/pricing', label: 'Pricing Overview' },
        { href: '/pricing/minimum-callout', label: '$2200 Minimum Explained' },
        { href: '/pricing/sydney', label: 'Sydney Pricing' },
        { href: '/pricing/melbourne', label: 'Melbourne Pricing' },
        { href: '/pricing/brisbane', label: 'Brisbane Pricing' },
        { href: '/pricing/perth', label: 'Perth Pricing' },
        { href: '/pricing/adelaide', label: 'Adelaide Pricing' },
      ]
    },
    {
      title: 'Emergency Response',
      icon: Clock,
      links: [
        { href: '/emergency', label: 'Emergency Times' },
        { href: '/emergency/after-hours', label: 'After Hours Service' },
        { href: '/emergency/weekend', label: 'Weekend Emergency' },
        { href: '/emergency/public-holiday', label: 'Public Holiday Service' },
        { href: '/emergency/christmas', label: 'Christmas Emergency' },
        { href: '/emergency/new-year', label: 'New Year Service' },
      ]
    },
    {
      title: 'Property Types',
      icon: Building,
      links: [
        { href: '/property-types', label: 'All Property Types' },
        { href: '/property-types/residential', label: 'Residential Homes' },
        { href: '/property-types/commercial', label: 'Commercial Properties' },
        { href: '/property-types/strata', label: 'Strata Properties' },
        { href: '/property-types/government', label: 'Government Facilities' },
        { href: '/property-types/industrial', label: 'Industrial Sites' },
        { href: '/property-types/healthcare', label: 'Healthcare Facilities' },
      ]
    },
    {
      title: 'Resources',
      icon: HelpCircle,
      links: [
        { href: '/faq', label: 'All FAQs' },
        { href: '/faq/general', label: 'General Questions' },
        { href: '/faq/water-damage', label: 'Water Damage FAQs' },
        { href: '/faq/insurance-claims', label: 'Insurance FAQs' },
        { href: '/compare/professional-vs-diy', label: 'Professional vs DIY' },
        { href: '/blog', label: 'Blog' },
      ]
    },
    {
      title: 'Insurance',
      icon: Shield,
      links: [
        { href: '/insurance', label: 'Insurance Claims' },
        { href: '/insurance/nrma', label: 'NRMA' },
        { href: '/insurance/aami', label: 'AAMI' },
        { href: '/insurance/suncorp', label: 'Suncorp' },
        { href: '/insurance/allianz', label: 'Allianz' },
        { href: '/insurance/qbe', label: 'QBE' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Site Map
            </h1>
            <p className="text-xl">
              Complete directory of all pages and resources
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sitemapSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Card key={index} className="p-6">
                    <div className="flex items-centre mb-4">
                      <Icon className="h-6 w-6 text-blue-600 mr-2" />
                      <h2 className="text-xl font-bold">{section.title}</h2>
                    </div>
                    <ul className="space-y-2">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link 
                            href={link.href}
                            className="text-gray-600 hover:text-blue-600 hover:underline text-sm"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4 text-centre">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <Link href="/get-help">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Get Emergency Help
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}