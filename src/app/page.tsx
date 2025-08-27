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
    <main className="r6-container">
      {/* Premium Emergency Banner - R6 Dark Theme */}
      <div className="r6-emergency-banner">
        <div className="r6-badge">
          <Shield className="h-5 w-5" />
          <span>IICRC Certified</span>
          <CheckCircle2 className="h-5 w-5" />
          <span>Insurance Approved</span>
          <CheckCircle2 className="h-5 w-5" />
          <span>Servicing All Queensland</span>
        </div>
        <div className="r6-phone">
          <Clock className="h-5 w-5" />
          <span>24/7 Emergency Service</span>
          <Phone className="h-5 w-5" />
          <span>1300 566 166</span>
        </div>
      </div>

      {/* Premium Navigation - R6 Glass Morphism */}
      <nav className="r6-nav">
        <div className="r6-nav-logo">
          <Image 
            src="/images/disaster-recovery-logo.png" 
            alt="Disaster Recovery" 
            width={40} 
            height={40}
            className="filter brightness-0 invert"
          />
          <span>National Restoration Professionals</span>
        </div>
        
        <div className="r6-nav-menu">
          <div className="r6-nav-item">
            Services
            <ChevronDown className="inline h-4 w-4 ml-1" />
          </div>
          <div className="r6-nav-item">
            Emergency
            <ChevronDown className="inline h-4 w-4 ml-1" />
          </div>
          <div className="r6-nav-item">
            About
            <ChevronDown className="inline h-4 w-4 ml-1" />
          </div>
          <Link href="/contact" className="r6-nav-item">
            Contact
          </Link>
        </div>
        
        <div className="r6-nav-cta">
          <Link href="/get-help">
            <button className="r6-btn r6-btn-secondary">
              Get Quote
            </button>
          </Link>
          <Link href="/emergency">
            <button className="r6-btn r6-btn-primary">
              Emergency Call
              <Phone className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </nav>

      {/* Premium Hero Section - R6 Dark Theme */}
      <section className="r6-hero">
        <div className="r6-hero-tagline">
          National Restoration Professionals
        </div>
        
        <h1 className="r6-hero-title">
          Australia's First Professional Restoration Network
        </h1>
        
        <div className="r6-hero-subtitle">
          When Disaster Strikes, Professionals Respond<br/>
          <span className="r6-text-gold" style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1rem', display: 'block' }}>
            Certified • Insured • Professional • Accountable
          </span>
        </div>
        
        <p className="r6-hero-description" style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          marginBottom: '3rem', 
          fontSize: '1.125rem',
          lineHeight: 1.7,
          color: 'var(--r6-text-muted)'
        }}>
          Connect directly with National Restoration Professionals (NRP) - Australia's premier 
          network of qualified restoration specialists delivering premium emergency response services.
        </p>
        
        <div className="r6-cta-group">
          <Link href="/emergency">
            <button className="r6-btn r6-btn-emergency r6-animate-pulse">
              <Phone className="h-5 w-5" />
              Get Emergency Help Now
            </button>
          </Link>
          <Link href="/find-local">
            <button className="r6-btn r6-btn-primary">
              <MapPin className="h-5 w-5" />
              Find Local Professional
            </button>
          </Link>
          <Link href="/why-nrp">
            <button className="r6-btn r6-btn-secondary">
              <ArrowRight className="h-5 w-5" />
              Why Choose NRP
            </button>
          </Link>
        </div>

        {/* Premium Emergency Alert - Glass Morphism */}
        <div className="r6-alert r6-animate-fade-in">
          <div className="r6-alert-title">
            <AlertTriangle className="h-6 w-6" style={{ color: 'var(--r6-accent-gold)' }} />
            24/7 Emergency Response Available
          </div>
          <div className="r6-alert-text">
            Professional help is just one call away. Our NRP certified technicians are ready to respond 
            with cutting-edge equipment and proven restoration techniques.
          </div>
          <Link href="/emergency">
            <button className="r6-btn r6-btn-primary" style={{ marginTop: '1.5rem' }}>
              <Phone className="h-4 w-4" />
              Call Now: 1300 566 166
            </button>
          </Link>
        </div>
      </section>

      {/* Premium System Issues Section - R6 Dark Theme */}
      <section className="r6-system-section">
        <div className="r6-max-width">
          <h2 className="r6-system-title r6-animate-fade-in">
            The Current System Is Failing Australian Homeowners
          </h2>
          
          <div className="r6-system-cards">
            {/* Administrative Incompetence */}
            <div className="r6-system-card r6-animate-fade-in">
              <XCircle className="r6-system-icon" />
              <h3 className="r6-system-card-title">Administrative Incompetence</h3>
              <p className="r6-system-card-text">
                Third-party administrators without restoration experience making critical decisions from office chairs, 
                causing unnecessary delays and complications.
              </p>
              <div className="r6-system-stats">
                <div className="r6-system-stat">
                  <AlertTriangle className="h-4 w-4" style={{ color: 'var(--r6-accent-coral)' }} />
                  <span>Claim Processing Delays</span>
                </div>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--r6-text-muted)', 
                  marginTop: '0.5rem',
                  lineHeight: 1.5 
                }}>
                  Average delay of 6-8 weeks due to inexperienced administrative staff and bureaucratic processes
                </p>
              </div>
            </div>

            {/* Unqualified Builders */}
            <div className="r6-system-card r6-animate-fade-in">
              <XCircle className="r6-system-icon" />
              <h3 className="r6-system-card-title">Unqualified Builders</h3>
              <p className="r6-system-card-text">
                General builders managing specialized restoration work without proper IICRC certification, 
                water damage expertise, or contamination protocols.
              </p>
              <div className="r6-system-stats">
                <div className="r6-system-stat">
                  <AlertTriangle className="h-4 w-4" style={{ color: 'var(--r6-accent-coral)' }} />
                  <span>Zero Accountability Framework</span>
                </div>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--r6-text-muted)', 
                  marginTop: '0.5rem',
                  lineHeight: 1.5 
                }}>
                  No recourse when restoration fails, with homeowners left to deal with ongoing damage and health risks
                </p>
              </div>
            </div>

            {/* Cost Cutting Focus */}
            <div className="r6-system-card r6-animate-fade-in">
              <XCircle className="r6-system-icon" />
              <h3 className="r6-system-card-title">Profit-First Approach</h3>
              <p className="r6-system-card-text">
                Insurance companies prioritizing cheapest bidders over qualified professionals, 
                compromising safety standards and long-term restoration success.
              </p>
              <div className="r6-system-stats">
                <div className="r6-system-stat">
                  <AlertTriangle className="h-4 w-4" style={{ color: 'var(--r6-accent-coral)' }} />
                  <span>Documented Impact Statistics</span>
                </div>
                <div style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--r6-text-muted)', 
                  marginTop: '0.5rem',
                  lineHeight: 1.6
                }}>
                  <p>• Average project delays: 4-12 months</p>
                  <p>• Secondary damage increase: +45%</p>
                  <p>• Customer compensation claims: Up to $6,300</p>
                  <p>• Repeat remediation required: 35% of cases</p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium NRP Introduction Banner - Glass Morphism */}
          <div className="r6-glass r6-animate-fade-in" style={{ 
            background: 'var(--r6-gradient-electric)',
            padding: '3rem 2rem',
            marginTop: '4rem',
            borderRadius: 'var(--r6-radius-3xl)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 70%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}></div>
            
            <h3 style={{ 
              fontSize: 'var(--r6-text-4xl)', 
              fontWeight: 'var(--r6-weight-extrabold)', 
              marginBottom: '1.5rem',
              color: 'var(--r6-text-primary)',
              fontFamily: 'var(--r6-font-primary)',
              position: 'relative',
              zIndex: 1
            }}>
              Introducing National Restoration Professionals (NRP)
            </h3>
            <p style={{ 
              fontSize: 'var(--r6-text-xl)', 
              color: 'var(--r6-text-secondary)', 
              marginBottom: '2rem',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              lineHeight: 'var(--r6-leading-relaxed)',
              position: 'relative',
              zIndex: 1
            }}>
              A revolutionary network of certified professionals committed to excellence in disaster recovery, 
              transparency, and direct accountability to homeowners.
            </p>
            <div className="r6-cta-group" style={{ position: 'relative', zIndex: 1 }}>
              <Link href="/join-nrp">
                <button className="r6-btn" style={{
                  background: 'var(--r6-text-primary)',
                  color: 'var(--r6-electric-blue)',
                  fontWeight: 'var(--r6-weight-bold)'
                }}>
                  <Users className="h-5 w-5" />
                  Join the NRP Network
                </button>
              </Link>
              <Link href="/find-professional">
                <button className="r6-btn r6-btn-secondary">
                  <MapPin className="h-5 w-5" />
                  Find NRP Professional
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Statistics Bar - R6 Dark Theme */}
      <div className="r6-stats-bar r6-animate-glow">
        <div className="r6-stat">
          <span className="r6-stat-number">100%</span>
          <span className="r6-stat-label">IICRC Certified</span>
        </div>
        <div className="r6-stat">
          <span className="r6-stat-number">24/7</span>
          <span className="r6-stat-label">Emergency Response</span>
        </div>
        <div className="r6-stat">
          <span className="r6-stat-number">2hr</span>
          <span className="r6-stat-label">Average Response</span>
        </div>
        <div className="r6-stat">
          <span className="r6-stat-number">15+</span>
          <span className="r6-stat-label">Years Experience</span>
        </div>
        <div className="r6-stat">
          <span className="r6-stat-number">4.9⭐</span>
          <span className="r6-stat-label">Customer Rating</span>
        </div>
        <div className="r6-stat">
          <span className="r6-stat-number">500+</span>
          <span className="r6-stat-label">Projects Completed</span>
        </div>
      </div>

      {/* Premium Why Choose NRP Section - R6 Dark Theme */}
      <section style={{ 
        background: 'var(--r6-bg-tertiary)', 
        padding: '6rem 2rem',
        position: 'relative'
      }}>
        <div className="r6-max-width">
          <h2 className="r6-animate-fade-in" style={{ 
            fontSize: 'var(--r6-text-5xl)', 
            fontWeight: 'var(--r6-weight-extrabold)', 
            textAlign: 'center', 
            marginBottom: '4rem',
            color: 'var(--r6-text-primary)',
            fontFamily: 'var(--r6-font-primary)'
          }}>
            Why Choose NRP Certified Professionals?
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2.5rem',
            marginBottom: '4rem'
          }}>
            <div className="r6-glass r6-animate-fade-in" style={{ 
              textAlign: 'center',
              padding: '2.5rem 2rem',
              borderRadius: 'var(--r6-radius-2xl)',
              transition: 'all var(--r6-duration-normal) var(--r6-ease-premium)',
              cursor: 'pointer'
            }}>
              <Shield className="h-16 w-16 mx-auto mb-6" style={{ 
                color: 'var(--r6-electric-blue)',
                filter: 'drop-shadow(0 0 10px rgba(19, 28, 255, 0.4))'
              }} />
              <h3 style={{ 
                fontSize: 'var(--r6-text-2xl)', 
                fontWeight: 'var(--r6-weight-bold)', 
                marginBottom: '1rem',
                color: 'var(--r6-text-primary)',
                fontFamily: 'var(--r6-font-primary)'
              }}>
                Fully Certified
              </h3>
              <p style={{ 
                color: 'var(--r6-text-muted)',
                lineHeight: 'var(--r6-leading-relaxed)',
                fontSize: 'var(--r6-text-base)'
              }}>
                All NRP professionals maintain current IICRC certification with specialized training 
                in water damage restoration, mold remediation, and fire damage recovery.
              </p>
            </div>
            
            <div className="r6-glass r6-animate-fade-in" style={{ 
              textAlign: 'center',
              padding: '2.5rem 2rem',
              borderRadius: 'var(--r6-radius-2xl)',
              transition: 'all var(--r6-duration-normal) var(--r6-ease-premium)',
              cursor: 'pointer'
            }}>
              <Users className="h-16 w-16 mx-auto mb-6" style={{ 
                color: 'var(--r6-electric-blue)',
                filter: 'drop-shadow(0 0 10px rgba(19, 28, 255, 0.4))'
              }} />
              <h3 style={{ 
                fontSize: 'var(--r6-text-2xl)', 
                fontWeight: 'var(--r6-weight-bold)', 
                marginBottom: '1rem',
                color: 'var(--r6-text-primary)',
                fontFamily: 'var(--r6-font-primary)'
              }}>
                Direct Connection
              </h3>
              <p style={{ 
                color: 'var(--r6-text-muted)',
                lineHeight: 'var(--r6-leading-relaxed)',
                fontSize: 'var(--r6-text-base)'
              }}>
                No middleman bureaucracy. Deal directly with restoration professionals who 
                take personal accountability for your project's success.
              </p>
            </div>
            
            <div className="r6-glass r6-animate-fade-in" style={{ 
              textAlign: 'center',
              padding: '2.5rem 2rem',
              borderRadius: 'var(--r6-radius-2xl)',
              transition: 'all var(--r6-duration-normal) var(--r6-ease-premium)',
              cursor: 'pointer'
            }}>
              <CheckCircle2 className="h-16 w-16 mx-auto mb-6" style={{ 
                color: 'var(--r6-accent-emerald)',
                filter: 'drop-shadow(0 0 10px rgba(80, 227, 194, 0.4))'
              }} />
              <h3 style={{ 
                fontSize: 'var(--r6-text-2xl)', 
                fontWeight: 'var(--r6-weight-bold)', 
                marginBottom: '1rem',
                color: 'var(--r6-text-primary)',
                fontFamily: 'var(--r6-font-primary)'
              }}>
                Quality Guaranteed
              </h3>
              <p style={{ 
                color: 'var(--r6-text-muted)',
                lineHeight: 'var(--r6-leading-relaxed)',
                fontSize: 'var(--r6-text-base)'
              }}>
                Professional standards backed by comprehensive insurance, warranties, 
                and our commitment to excellence in every restoration project.
              </p>
            </div>
            
            <div className="r6-glass r6-animate-fade-in" style={{ 
              textAlign: 'center',
              padding: '2.5rem 2rem',
              borderRadius: 'var(--r6-radius-2xl)',
              transition: 'all var(--r6-duration-normal) var(--r6-ease-premium)',
              cursor: 'pointer'
            }}>
              <Zap className="h-16 w-16 mx-auto mb-6" style={{ 
                color: 'var(--r6-accent-gold)',
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.4))'
              }} />
              <h3 style={{ 
                fontSize: 'var(--r6-text-2xl)', 
                fontWeight: 'var(--r6-weight-bold)', 
                marginBottom: '1rem',
                color: 'var(--r6-text-primary)',
                fontFamily: 'var(--r6-font-primary)'
              }}>
                Rapid Response
              </h3>
              <p style={{ 
                color: 'var(--r6-text-muted)',
                lineHeight: 'var(--r6-leading-relaxed)',
                fontSize: 'var(--r6-text-base)'
              }}>
                Emergency response teams strategically positioned across Queensland, 
                ready to respond within 2 hours of your emergency call.
              </p>
            </div>
          </div>
          
          <div className="r6-cta-group r6-animate-fade-in">
            <Link href="/get-help">
              <button className="r6-btn r6-btn-primary" style={{
                fontSize: 'var(--r6-text-lg)',
                padding: 'var(--r6-space-5) var(--r6-space-10)'
              }}>
                <ArrowRight className="h-5 w-5" />
                Get Professional Help Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Final CTA Section - R6 Dark Theme */}
      <section style={{ 
        background: 'var(--r6-gradient-primary)', 
        padding: '6rem 2rem',
        color: 'var(--r6-text-primary)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Effects */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        
        <div className="r6-max-width" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="r6-animate-fade-in" style={{ 
            fontSize: 'var(--r6-text-5xl)', 
            fontWeight: 'var(--r6-weight-extrabold)', 
            marginBottom: '1.5rem',
            fontFamily: 'var(--r6-font-primary)',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
          }}>
            Ready to Experience Professional Restoration?
          </h2>
          <p className="r6-animate-fade-in" style={{ 
            fontSize: 'var(--r6-text-xl)', 
            marginBottom: '3rem', 
            opacity: 0.95,
            maxWidth: '800px',
            margin: '0 auto 3rem',
            lineHeight: 'var(--r6-leading-relaxed)'
          }}>
            Join thousands of satisfied customers who chose NRP certified professionals for their 
            restoration needs. Experience the difference of working with true professionals.
          </p>
          <div className="r6-cta-group r6-animate-fade-in">
            <Link href="/emergency">
              <button className="r6-btn r6-animate-pulse" style={{ 
                background: 'var(--r6-accent-gold)', 
                color: 'var(--r6-bg-primary)',
                fontWeight: 'var(--r6-weight-extrabold)',
                fontSize: 'var(--r6-text-lg)',
                padding: 'var(--r6-space-5) var(--r6-space-10)',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)'
              }}>
                <Phone className="h-5 w-5" />
                Call 1300 566 166 Now
              </button>
            </Link>
            <Link href="/get-quote">
              <button className="r6-btn r6-btn-secondary" style={{
                fontSize: 'var(--r6-text-lg)',
                padding: 'var(--r6-space-5) var(--r6-space-10)'
              }}>
                <Target className="h-5 w-5" />
                Get Free Assessment
              </button>
            </Link>
          </div>
          
          {/* Premium Trust Indicators */}
          <div className="r6-animate-fade-in" style={{
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--r6-space-8)',
            opacity: 0.8
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--r6-space-2)' }}>
              <Shield className="h-5 w-5" />
              <span style={{ fontSize: 'var(--r6-text-sm)', fontWeight: 'var(--r6-weight-medium)' }}>IICRC Certified</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--r6-space-2)' }}>
              <CheckCircle2 className="h-5 w-5" />
              <span style={{ fontSize: 'var(--r6-text-sm)', fontWeight: 'var(--r6-weight-medium)' }}>Fully Insured</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--r6-space-2)' }}>
              <Clock className="h-5 w-5" />
              <span style={{ fontSize: 'var(--r6-text-sm)', fontWeight: 'var(--r6-weight-medium)' }}>24/7 Available</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--r6-space-2)' }}>
              <Users className="h-5 w-5" />
              <span style={{ fontSize: 'var(--r6-text-sm)', fontWeight: 'var(--r6-weight-medium)' }}>500+ Projects</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}