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
  AlertTriangle,
  XCircle,
  Clock,
  Users,
  Briefcase,
  ChevronDown,
  AlertCircle,
  TrendingDown,
  DollarSign
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Australia's First Professional Restoration Network | National Restoration Professionals (NRP)",
  description: "Connect directly with certified restoration professionals. No third-party administrators. IICRC certified, fully insured, and accountable. Get professional help now.",
  keywords: "NRP, National Restoration Professionals, restoration network, IICRC certified, professional restoration, disaster recovery",
};

export default function NRPHomePage() {
  return (
    <main className="nrp-container">
      {/* Emergency Banner */}
      <div className="nrp-emergency-banner">
        <div className="nrp-badge">
          <Shield className="h-5 w-5" />
          <span>IICRC Certified</span>
          <CheckCircle2 className="h-5 w-5" />
          <span>Insurance Approved</span>
          <CheckCircle2 className="h-5 w-5" />
          <span>Servicing All Queensland</span>
        </div>
        <div className="nrp-phone">
          <Clock className="h-5 w-5" />
          <span>24/7 Emergency Service</span>
          <Phone className="h-5 w-5" />
          <span>1300 566 166</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nrp-nav">
        <div className="nrp-nav-logo">
          <Image 
            src="/images/disaster-recovery-logo.png" 
            alt="Disaster Recovery" 
            width={40} 
            height={40}
          />
          <span>Disaster Recovery</span>
        </div>
        
        <div className="nrp-nav-menu">
          <div className="nrp-nav-item">
            Services
            <ChevronDown className="inline h-4 w-4 ml-1" />
          </div>
          <div className="nrp-nav-item">
            Emergency
            <ChevronDown className="inline h-4 w-4 ml-1" />
          </div>
          <div className="nrp-nav-item">
            About
            <ChevronDown className="inline h-4 w-4 ml-1" />
          </div>
          <Link href="/contact" className="nrp-nav-item">
            Contact
          </Link>
        </div>
        
        <div className="nrp-nav-cta">
          <Link href="/get-help">
            <button className="nrp-btn nrp-btn-secondary">
              Get Quote
            </button>
          </Link>
          <Link href="/emergency">
            <button className="nrp-btn nrp-btn-primary">
              Emergency Call
              <Phone className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section with NRP Introduction */}
      <section className="nrp-hero">
        <div className="nrp-hero-tagline">
          National Restoration Professionals
        </div>
        
        <h1 className="nrp-hero-title">
          Australia's First Professional Restoration Network
        </h1>
        
        <div className="nrp-hero-subtitle">
          When Disaster Strikes, Professionals Respond<br/>
          <span style={{ fontSize: '1rem', fontWeight: 500 }}>
            Certified - Insured - Professional - Accountable
          </span>
        </div>
        
        <p style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '2rem', lineHeight: 1.6 }}>
          Connect directly with National Restoration Professionals (NRP) - Australia's premier 
          network of qualified restoration specialists
        </p>
        
        <div className="nrp-cta-group">
          <Link href="/emergency">
            <button className="nrp-btn nrp-btn-emergency">
              <Phone className="h-5 w-5" />
              Get Emergency Help Now
            </button>
          </Link>
          <Link href="/find-local">
            <button className="nrp-btn nrp-btn-primary">
              <MapPin className="h-5 w-5" />
              Find Your Local NRP Professional
            </button>
          </Link>
          <Link href="/why-nrp">
            <button className="nrp-btn nrp-btn-secondary">
              <ArrowRight className="h-5 w-5" />
              Learn Why We're Different
            </button>
          </Link>
        </div>

        {/* Emergency Response Alert */}
        <div className="nrp-alert">
          <div className="nrp-alert-title">
            <AlertTriangle className="h-5 w-5" style={{ color: '#CCBA00' }} />
            24/7 Emergency Response Available
          </div>
          <div className="nrp-alert-text">
            Professional help is just one call away. Our NRP certified technicians are ready to respond.
          </div>
          <Link href="/emergency">
            <button className="nrp-btn nrp-btn-secondary" style={{ marginTop: '1rem' }}>
              Call Now
            </button>
          </Link>
        </div>
      </section>

      {/* System Failing Section */}
      <section className="nrp-system-section">
        <h2 className="nrp-system-title">
          The Current System Is Failing Australian Homeowners
        </h2>
        
        <div className="nrp-system-cards">
          {/* Administrative Incompetence */}
          <div className="nrp-system-card">
            <XCircle className="nrp-system-icon" />
            <h3 className="nrp-system-card-title">Administrative Incompetence</h3>
            <p className="nrp-system-card-text">
              Third-party administrators without restoration experience making critical decisions from office chairs
            </p>
            <div className="nrp-system-stats">
              <div className="nrp-system-stat">
                <AlertTriangle className="h-4 w-4" style={{ color: '#FF0000' }} />
                <span>Claim Delays</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
                Delayed claims processing due to inexperience and administrative burden
              </p>
            </div>
          </div>

          {/* Unqualified Builders */}
          <div className="nrp-system-card">
            <XCircle className="nrp-system-icon" />
            <h3 className="nrp-system-card-title">Unqualified Builders</h3>
            <p className="nrp-system-card-text">
              Builders managing restoration without specialized cleaning and remediation expertise
            </p>
            <div className="nrp-system-stats">
              <div className="nrp-system-stat">
                <AlertTriangle className="h-4 w-4" style={{ color: '#FF0000' }} />
                <span>No Accountability</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
                No accountability when restoration goes wrong or takes too long
              </p>
            </div>
          </div>

          {/* Cost Cutting Focus */}
          <div className="nrp-system-card">
            <XCircle className="nrp-system-icon" />
            <h3 className="nrp-system-card-title">Cost Cutting Focus</h3>
            <p className="nrp-system-card-text">
              Cheapest bidder approach compromising quality and safety standards
            </p>
            <div className="nrp-system-stats">
              <div className="nrp-system-stat">
                <AlertTriangle className="h-4 w-4" style={{ color: '#FF0000' }} />
                <span>Statistical Impact</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
                <p>• Average delays: 4-12 months</p>
                <p>• Secondary damage: +45%</p>
                <p>• Compensation: Up to $6,300</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div style={{ 
          background: 'linear-gradient(to right, #FFE500, #FFF8CC)', 
          padding: '2rem',
          marginTop: '3rem',
          borderRadius: '1rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Introducing National Restoration Professionals (NRP)
          </h3>
          <p style={{ fontSize: '1.125rem', color: '#374151', marginBottom: '1.5rem' }}>
            A network of certified professionals committed to excellence in disaster recovery
          </p>
          <div className="nrp-cta-group">
            <Link href="/join-nrp">
              <button className="nrp-btn nrp-btn-primary">
                Join the NRP Network
              </button>
            </Link>
            <Link href="/find-professional">
              <button className="nrp-btn nrp-btn-secondary">
                Find an NRP Professional
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <div className="nrp-stats-bar">
        <div className="nrp-stat">
          <span className="nrp-stat-number">100%</span>
          <span className="nrp-stat-label">IICRC Certified</span>
        </div>
        <div className="nrp-stat">
          <span className="nrp-stat-number">24/7</span>
          <span className="nrp-stat-label">Emergency Response</span>
        </div>
        <div className="nrp-stat">
          <span className="nrp-stat-number">2hr</span>
          <span className="nrp-stat-label">Average Response Time</span>
        </div>
        <div className="nrp-stat">
          <span className="nrp-stat-number">15+</span>
          <span className="nrp-stat-label">Years Experience</span>
        </div>
        <div className="nrp-stat">
          <span className="nrp-stat-number">4.9/5</span>
          <span className="nrp-stat-label">Customer Rating</span>
        </div>
      </div>

      {/* Why Choose NRP Section */}
      <section style={{ background: '#FFFFFF', padding: '4rem 2rem' }}>
        <div className="nrp-max-width">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '3rem' }}>
            Why Choose NRP Certified Professionals?
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <Shield className="h-12 w-12 mx-auto mb-4" style={{ color: '#0040FF' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Fully Certified
              </h3>
              <p style={{ color: '#6B7280' }}>
                All NRP professionals maintain current IICRC certification
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Users className="h-12 w-12 mx-auto mb-4" style={{ color: '#0040FF' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Direct Connection
              </h3>
              <p style={{ color: '#6B7280' }}>
                No middleman - deal directly with restoration professionals
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4" style={{ color: '#0040FF' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Quality Guaranteed
              </h3>
              <p style={{ color: '#6B7280' }}>
                Professional standards backed by comprehensive insurance
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Zap className="h-12 w-12 mx-auto mb-4" style={{ color: '#0040FF' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Fast Response
              </h3>
              <p style={{ color: '#6B7280' }}>
                Emergency teams ready 24/7 across Queensland
              </p>
            </div>
          </div>
          
          <div className="nrp-cta-group">
            <Link href="/get-help">
              <button className="nrp-btn nrp-btn-primary">
                Get Professional Help Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0040FF, #003ACC)', 
        padding: '4rem 2rem',
        color: '#FFFFFF',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
          Ready to Experience Professional Restoration?
        </h2>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
          Join thousands of satisfied customers who chose NRP certified professionals
        </p>
        <div className="nrp-cta-group">
          <Link href="/emergency">
            <button className="nrp-btn" style={{ 
              background: '#FFE500', 
              color: '#000000',
              fontWeight: 700
            }}>
              <Phone className="h-5 w-5" />
              Call 1300 566 166 Now
            </button>
          </Link>
          <Link href="/get-quote">
            <button className="nrp-btn" style={{ 
              background: 'transparent', 
              color: '#FFFFFF',
              border: '2px solid #FFFFFF'
            }}>
              Get Free Quote
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}