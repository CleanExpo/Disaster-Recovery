import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  ArrowRight,
  Shield,
  Zap,
  Target,
  CheckCircle2,
  MapPin,
  Droplets,
  Flame,
  Wind,
  ChevronRight,
  Monitor,
  Smartphone,
  Award,
  Users,
  Clock,
  Briefcase
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Australia's First Professional Restoration Network | National Restoration Professionals (NRP)",
  description: "Connect directly with certified restoration professionals. No third-party administrators. IICRC certified, fully insured, and accountable. Get professional help now.",
  keywords: "NRP, National Restoration Professionals, restoration network, IICRC certified, professional restoration, disaster recovery",
};

export default function R6HomePage() {
  return (
    <main className="r6-container">
      {/* R6 Hero Section - Black with Electric Blue */}
      <section className="r6-hero">
        <div className="r6-hero-bg"></div>
        <div className="r6-hero-content">
          {/* Working with tag */}
          <div className="r6-tag animate-slide-in-top">
            Working with hundreds of businesses nationwide
          </div>
          
          <h1 className="r6-hero-title">
            Your perfect <span className="r6-text-gradient">restoration</span>
            <br />
            <span className="r6-underline">does exist!</span>
          </h1>
          
          <p className="r6-hero-subtitle">
            Our team of expert technicians and restoration specialists will
            bring your property back to life. We handle all the
            hard work, so you don't have to.
          </p>
          
          <div className="r6-hero-actions">
            <Link href="/get-help">
              <button className="r6-btn r6-btn-primary r6-btn-glow">
                <ArrowRight className="mr-2 h-5 w-5" />
                Let's get started
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Device Mockups */}
        <div className="r6-hero-devices">
          <div className="r6-device-laptop">
            <div className="r6-device-screen">
              <div className="r6-screen-content">
                <div className="r6-logo-badge">
                  <Shield className="h-12 w-12 text-white" />
                  <span>NRP CERTIFIED</span>
                </div>
                <h3>SUPERIOR<br/>RESTORATION</h3>
                <p>24/7 Emergency Response<br/>IICRC Certified Technicians</p>
                <button className="r6-btn-small">VIEW MORE</button>
              </div>
            </div>
          </div>
          
          <div className="r6-device-phone">
            <div className="r6-phone-screen">
              <div className="r6-phone-header">
                <Clock className="h-4 w-4" />
                <span>24/7 EMERGENCY</span>
              </div>
              <div className="r6-phone-content">
                <h4>OUR RESTORATION<br/>COLLECTION</h4>
                <p>Fast response for your home<br/>when disaster strikes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R6 Features Section */}
      <section className="r6-features">
        <div className="r6-container-inner">
          {/* Feature Cards */}
          <div className="r6-feature-grid">
            <div className="r6-feature-card">
              <div className="r6-feature-icon">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3>Designed for Mobile</h3>
              <p>Mobile has overtaken Desktop as the most used platform – so we build mobile first to ensure a great experience every time.</p>
            </div>

            <div className="r6-feature-card">
              <div className="r6-feature-icon">
                <Target className="h-8 w-8" />
              </div>
              <h3>Google Optimised</h3>
              <p>We have a team of SEO experts. Ask us about optimising your restoration services for search engines now.</p>
            </div>

            <div className="r6-feature-card">
              <div className="r6-feature-icon">
                <Award className="h-8 w-8" />
              </div>
              <h3>IICRC Certified</h3>
              <p>All our restoration professionals are IICRC certified and follow industry best practices for quality assurance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* R6 Showcase Section */}
      <section className="r6-showcase">
        <div className="r6-showcase-content">
          <div className="r6-showcase-text">
            <h2 className="r6-section-title">
              Designed to work with your
              <span className="r6-underline"> brand</span>
            </h2>
            <p className="r6-section-subtitle">
              We're more than just restoration technicians; we're
              recovery specialists too. We recognise the significance of
              your property and will craft a restoration plan to perfectly
              capture your needs and meet your
              insurance requirements.
            </p>
            <Link href="/services">
              <button className="r6-btn-text">
                <ArrowRight className="mr-2 h-5 w-5" />
                Get a quote today
              </button>
            </Link>
          </div>
          
          <div className="r6-showcase-visual">
            <div className="r6-visual-card r6-card-blue">
              <div className="r6-card-header">
                <span className="r6-card-tag">24/7 SERVICE</span>
                <h3>WATER DAMAGE<br/>RESTORATION</h3>
              </div>
              <div className="r6-card-content">
                <p>Emergency water extraction and complete restoration services. Quick response team available across Queensland.</p>
                <div className="r6-card-stats">
                  <div>
                    <span className="r6-stat-value">2hr</span>
                    <span className="r6-stat-label">Response</span>
                  </div>
                  <div>
                    <span className="r6-stat-value">100%</span>
                    <span className="r6-stat-label">Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R6 Services Grid */}
      <section className="r6-services">
        <div className="r6-container-inner">
          <h2 className="r6-section-title text-center mb-16">
            Professional Restoration Services
          </h2>
          
          <div className="r6-services-grid">
            {/* Water Damage */}
            <Link href="/services/water-damage" className="r6-service-card group">
              <div className="r6-service-icon">
                <Droplets className="h-12 w-12 text-[#0040FF] group-hover:text-white transition-colors" />
              </div>
              <h3>Water Damage</h3>
              <p>24/7 emergency water extraction and drying services</p>
              <div className="r6-service-arrow">
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>

            {/* Fire Damage */}
            <Link href="/services/fire-damage" className="r6-service-card group">
              <div className="r6-service-icon">
                <Flame className="h-12 w-12 text-[#FF4040] group-hover:text-white transition-colors" />
              </div>
              <h3>Fire Damage</h3>
              <p>Complete fire and smoke damage restoration services</p>
              <div className="r6-service-arrow">
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>

            {/* Storm Damage */}
            <Link href="/services/storm-damage" className="r6-service-card group">
              <div className="r6-service-icon">
                <Wind className="h-12 w-12 text-[#40A0FF] group-hover:text-white transition-colors" />
              </div>
              <h3>Storm Damage</h3>
              <p>Emergency storm damage response and repair services</p>
              <div className="r6-service-arrow">
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* R6 Engagement Section */}
      <section className="r6-engagement">
        <div className="r6-engagement-content">
          <h2 className="r6-section-title">
            Flexible engagement options<br/>
            for any size <span className="r6-text-gradient">disaster</span>
          </h2>
          
          <div className="r6-engagement-grid">
            <div className="r6-engagement-card">
              <h3>Emergency Response</h3>
              <ul className="r6-feature-list">
                <li><CheckCircle2 className="h-5 w-5" /> 24/7 availability</li>
                <li><CheckCircle2 className="h-5 w-5" /> 2-hour response time</li>
                <li><CheckCircle2 className="h-5 w-5" /> Direct insurance billing</li>
                <li><CheckCircle2 className="h-5 w-5" /> Certified technicians</li>
              </ul>
              <Link href="/get-help">
                <button className="r6-btn r6-btn-secondary w-full">
                  Get Emergency Help
                </button>
              </Link>
            </div>

            <div className="r6-engagement-card r6-card-featured">
              <div className="r6-badge">MOST POPULAR</div>
              <h3>Professional Service</h3>
              <ul className="r6-feature-list">
                <li><CheckCircle2 className="h-5 w-5" /> Complete restoration</li>
                <li><CheckCircle2 className="h-5 w-5" /> Insurance coordination</li>
                <li><CheckCircle2 className="h-5 w-5" /> Progress monitoring</li>
                <li><CheckCircle2 className="h-5 w-5" /> Quality guarantee</li>
              </ul>
              <Link href="/services">
                <button className="r6-btn r6-btn-primary w-full">
                  View Services
                </button>
              </Link>
            </div>

            <div className="r6-engagement-card">
              <h3>Enterprise Solutions</h3>
              <ul className="r6-feature-list">
                <li><CheckCircle2 className="h-5 w-5" /> Priority response</li>
                <li><CheckCircle2 className="h-5 w-5" /> Dedicated team</li>
                <li><CheckCircle2 className="h-5 w-5" /> Custom contracts</li>
                <li><CheckCircle2 className="h-5 w-5" /> Volume discounts</li>
              </ul>
              <Link href="/contractor">
                <button className="r6-btn r6-btn-secondary w-full">
                  Partner With Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* R6 CTA Section */}
      <section className="r6-cta">
        <div className="r6-cta-content">
          <h2 className="r6-cta-title">
            Ready to get started?
          </h2>
          <p className="r6-cta-subtitle">
            Connect with certified restoration professionals 24/7
          </p>
          <div className="r6-cta-actions">
            <Link href="/get-help">
              <button className="r6-btn r6-btn-primary r6-btn-glow">
                <Phone className="mr-2 h-5 w-5" />
                1300 566 166
              </button>
            </Link>
            <Link href="/locations">
              <button className="r6-btn r6-btn-outline">
                <MapPin className="mr-2 h-5 w-5" />
                Find Local NRP
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* R6 Stats Section */}
      <section className="r6-stats">
        <div className="r6-stats-grid">
          <div className="r6-stat">
            <div className="r6-stat-number">100%</div>
            <div className="r6-stat-label">Certified Professionals</div>
          </div>
          <div className="r6-stat">
            <div className="r6-stat-number">24/7</div>
            <div className="r6-stat-label">Emergency Response</div>
          </div>
          <div className="r6-stat">
            <div className="r6-stat-number">4.9/5</div>
            <div className="r6-stat-label">Customer Rating</div>
          </div>
          <div className="r6-stat">
            <div className="r6-stat-number">15+</div>
            <div className="r6-stat-label">Years Experience</div>
          </div>
        </div>
      </section>
    </main>
  );
}
