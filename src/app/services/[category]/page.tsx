import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, Clock, MapPin, Users, CheckCircle, 
  ArrowRight, Star, TrendingUp, Award, Zap,
  Droplets, Flame, Bug, Wind, AlertTriangle, Building2, MessageSquare} from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import { 
  GMB_CATEGORIES, 
  getCategoryBySlug, 
  generateCategoryTitle,
  generateCategoryDescription,
  generateCategorySchema 
} from '@/data/gmb-categories';

// Generate static params for all GMB categories
export async function generateStaticParams() {
  return GMB_CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata(
  { params }: { params: { category: string } }
): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    return {
      title: 'Service Not Found',
      description: 'The requested service page could not be found.',
    };
  }

  const title = generateCategoryTitle(category);
  const description = generateCategoryDescription(category);

  return {
    title,
    description,
    keywords: category.keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://disasterrecovery.com.au/services/${category.slug}`,
      images: [
        {
          url: '/images/optimised/damage/3D image of a house fire.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://disasterrecovery.com.au/services/${category.slug}`,
    },
  };
}

// Icon mapping for services
const getServiceIcon = (slug: string) => {
  const icons: Record<string, JSX.Element> = {
    'water-damage-restoration': <Droplets className="h-8 w-8" />,
    'fire-damage-restoration': <Flame className="h-8 w-8" />,
    'mold-remediation': <Bug className="h-8 w-8" />,
    'storm-damage-restoration': <Wind className="h-8 w-8" />,
    'biohazard-cleanup': <AlertTriangle className="h-8 w-8" />,
    'commercial-cleaning': <Building2 className="h-8 w-8" />,
    default: <Shield className="h-8 w-8" />
  };
  return icons[slug] || icons.default;
};

export default function GMBCategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  const schema = generateCategorySchema(category);

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <LandingHeader />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Category Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white">
                {getServiceIcon(category.slug)}
              </div>

              {/* Title */}
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                {category.name}
              </h1>

              {/* Description */}
              <p className="text-xl text-blue-200 mb-8">
                {category.description}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <Clock className="h-5 w-5 text-green-400" />
                  <span className="text-white">24/7 Response</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Insurance Approved</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  <span className="text-white">Australia Wide</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/client/emergency"
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-bold hover:shadow-2xl transition-all"
                >
                  Get Emergency Help
                  <ArrowRight className="inline-block ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/client/instant-quote"
                  className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl text-white font-bold hover:bg-white/20 transition-all"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Our {category.name} Services
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {category.services.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {service}
                      </h3>
                      <p className="text-blue-200 text-sm">
                        Professional {service.toLowerCase()} services available 24/7
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Why Choose Disaster Recovery
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">24/7 Emergency</h3>
                <p className="text-blue-200">Round-the-clock response teams ready to help</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">115K+ Contractors</h3>
                <p className="text-blue-200">Certified professionals across Australia</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Insurance Approved</h3>
                <p className="text-blue-200">Preferred vendor for major insurers</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Matching</h3>
                <p className="text-blue-200">Instant contractor matching technology</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Our {category.name} Process
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Emergency Assessment</h3>
                    <p className="text-blue-200">
                      Our team arrives quickly to assess the damage and create an action plan
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Immediate Mitigation</h3>
                    <p className="text-blue-200">
                      We start work immediately to prevent further damage and secure your property
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Complete Restoration</h3>
                    <p className="text-blue-200">
                      Full restoration to pre-loss condition with insurance coordination
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Coverage */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              {category.name} Coverage Areas
            </h2>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Darwin', 'Hobart', 'Canberra',
                'Newcastle', 'Gold Coast', 'Wollongong', 'Townsville', 'Cairns', 'Toowoomba', 'Ballarat', 'Bendigo'].map((city) => (
                <Link
                  key={city}
                  href={`/services/${category.slug}/${city.toLowerCase()}`}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-center hover:bg-white/10 transition-all group"
                >
                  <span className="text-white group-hover:text-blue-300 transition-colors">
                    {city}
                  </span>
                </Link>
              ))}
            </div>

            <p className="text-center text-blue-200 mt-8">
              And thousands more locations across Australia
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/80 to-purple-900/80">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Need {category.name}?
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Don't wait - every minute counts. Our certified professionals are ready to help 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/client/emergency"
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white font-bold hover:shadow-2xl transition-all animate-pulse"
              >
                <MessageSquare className="inline-block mr-2 h-5 w-5" />
                Emergency Response Now
              </Link>
              <Link
                href="/contractor/apply"
                className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl text-white font-bold hover:bg-white/20 transition-all"
              >
                Join Our Network
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}