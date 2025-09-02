'use client';

import React from 'react';
import { 
  Shield, 
  ArrowRight,
  Check,
  Clock,
  Users,
  Award,
  Zap,
  Droplets,
  Flame,
  Home,
  ChevronRight,
  Star,
  TrendingUp, MessageSquare} from 'lucide-react';

export default function R6DemoPage() {
  const services = [
    {
      icon: Droplets,
      title: 'Water Damage Restoration',
      description: 'Rapid water extraction and structural drying using advanced equipment.',
      features: ['24/7 Online Emergency Response', 'Insurance Approved', 'Certified Technicians'],
      colour: 'primary'
    },
    {
      icon: Flame,
      title: 'Fire & Smoke Damage',
      description: 'Complete restoration from fire, smoke, and soot damage.',
      features: ['Smoke Odour Removal', 'Structural Repairs', 'Content Restoration'],
      colour: 'dark'
    },
    {
      icon: Shield,
      title: 'Mould Remediation',
      description: 'Safe and thorough mould removal with prevention strategies.',
      features: ['HEPA Filtration', 'Air Quality Testing', 'Prevention Treatment'],
      colour: 'primary'
    },
    {
      icon: Home,
      title: 'Storm Damage Recovery',
      description: 'Emergency response for storm and flood damage restoration.',
      features: ['Debris Removal', 'Emergency Tarping', 'Full Reconstruction'],
      colour: 'dark'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Properties Restored', icon: Home },
    { value: '24/7', label: 'Emergency Response', icon: Clock },
    { value: '100%', label: 'Insurance Approved', icon: Shield },
    { value: '15+', label: 'Years Experience', icon: Award }
  ];

  return (
    <div className="r6-design-system">
      {/* Navigation - R6 Style */}
      <nav className="r6-nav">
        <div className="r6-container">
          <div className="r6-nav-container">
            <a href="/" className="r6-nav-logo">
              Disaster Recovery
            </a>
            <ul className="r6-nav-menu">
              <li><a href="#services" className="r6-nav-link">Services</a></li>
              <li><a href="#about" className="r6-nav-link">About</a></li>
              <li><a href="#process" className="r6-nav-link">Process</a></li>
              <li><a href="#contact" className="r6-nav-link">Contact</a></li>
            </ul>
            <div className="r6-flex r6-gap-3">
              <button className="r6-btn r6-btn-ghost r6-btn-sm">
                Partner Portal
              </button>
              <button className="r6-btn r6-btn-primary">
                <MessageSquare className="w-4 h-4" />
                <span>online support</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - R6 Style */}
      <section className="r6-hero">
        <div className="r6-hero-pattern" />
        <div className="r6-container">
          <div className="r6-hero-content">
            <div className="r6-stagger">
              <div className="r6-mb-4">
                <span className="r6-text-primary r6-font-semibold">24/7 Online Emergency Response</span>
              </div>
              <h1 className="r6-hero-title">
                Queensland's Premier
                <br />
                <span className="r6-text-primary">Disaster Recovery</span> Experts
              </h1>
              <p className="r6-hero-subtitle r6-mb-6 text-balance">
                Professional restoration services for water damage, fire damage, and mould remediation. 
                IICRC certified technicians available 24/7 across Queensland.
              </p>
              <div className="r6-flex r6-gap-3">
                <button className="r6-btn r6-btn-primary r6-btn-lg">
                  Get Emergency Help
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="r6-btn r6-btn-secondary r6-btn-lg">
                  Free Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Clean, No Yellow */}
      <section className="r6-section" style={{ background: 'rgb(250, 250, 250)' }}>
        <div className="r6-container">
          <div className="r6-grid r6-grid-cols-2 r6-grid-cols-4-desktop">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="r6-text-center r6-animate-scale-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="r6-flex r6-justify-center r6-mb-3">
                  <div className="r6-p-3" style={{
                    background: 'rgb(19, 28, 255, 0.1)',
                    borderRadius: 'var(--r6-radius-xl)'
                  }}>
                    <stat.icon className="w-8 h-8 r6-text-primary" />
                  </div>
                </div>
                <div className="r6-font-black r6-text-4xl r6-mb-1">{stat.value}</div>
                <div className="r6-text-gray">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - No Yellow/Amber Backgrounds */}
      <section id="services" className="r6-section">
        <div className="r6-container">
          <div className="r6-text-center r6-mb-6">
            <h2 className="r6-mb-3">Professional Restoration Services</h2>
            <p className="r6-text-gray r6-text-lg">
              Comprehensive solutions for all disaster recovery needs
            </p>
          </div>
          
          <div className="r6-grid r6-grid-cols-1 r6-grid-cols-2-tablet r6-grid-cols-4-desktop">
            {services.map((service, index) => (
              <div 
                key={index}
                className="r6-feature-card r6-animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="r6-mb-4">
                  <div className={`r6-inline-block r6-p-3 ${service.colour === 'primary' ? 'r6-bg-primary' : 'r6-bg-dark'}`} style={{
                    borderRadius: 'var(--r6-radius-xl)'
                  }}>
                    <service.icon className="w-8 h-8 r6-text-light" />
                  </div>
                </div>
                <h3 className="r6-mb-2">{service.title}</h3>
                <p className="r6-text-gray r6-mb-4">{service.description}</p>
                <ul className="r6-mb-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="r6-flex r6-items-center r6-gap-2 r6-mb-2">
                      <Check className="w-4 h-4 r6-text-primary" />
                      <span className="r6-text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="r6-btn r6-btn-ghost r6-btn-sm">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Clean Design */}
      <section className="r6-section r6-bg-dark">
        <div className="r6-container">
          <div className="r6-text-center">
            <h2 className="r6-text-light r6-mb-3">Need Emergency Assistance?</h2>
            <p className="r6-text-light r6-mb-6" style={{ opacity: 0.8 }}>
              Our certified technicians are available 24/7 across Queensland
            </p>
            <div className="r6-flex r6-justify-center r6-gap-3">
              <button className="r6-btn r6-btn-primary r6-btn-lg">
                <MessageSquare className="w-5 h-5" />
                Use Our Online Form
              </button>
              <button className="r6-btn r6-btn-secondary r6-btn-lg" style={{
                background: 'transparent',
                colour: 'white',
                borderColor: 'white'
              }}>
                Request Callback
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="r6-section">
        <div className="r6-container">
          <div className="r6-text-center r6-mb-6">
            <h2 className="r6-mb-3">Our Proven Process</h2>
            <p className="r6-text-gray r6-text-lg">
              Systematic approach to complete restoration
            </p>
          </div>
          
          <div className="r6-grid r6-grid-cols-1 r6-grid-cols-3-tablet">
            {[
              { 
                step: '01', 
                title: 'Emergency Response', 
                desc: 'Immediate 24/7 response to minimize damage',
                icon: Zap
              },
              { 
                step: '02', 
                title: 'Assessment & Planning', 
                desc: 'Thorough inspection and restoration strategy',
                icon: TrendingUp
              },
              { 
                step: '03', 
                title: 'Complete Restoration', 
                desc: 'Professional restoration to pre-loss condition',
                icon: Star
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="r6-card r6-animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="r6-card-body r6-text-center">
                  <div className="r6-text-primary r6-font-black r6-text-5xl r6-mb-3">
                    {item.step}
                  </div>
                  <div className="r6-flex r6-justify-center r6-mb-3">
                    <item.icon className="w-8 h-8 r6-text-dark" />
                  </div>
                  <h4 className="r6-mb-2">{item.title}</h4>
                  <p className="r6-text-gray r6-text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="r6-section" style={{ background: 'rgb(250, 250, 250)' }}>
        <div className="r6-container">
          <div className="r6-text-center r6-mb-6">
            <h2 className="r6-mb-3">Trusted by Thousands</h2>
            <div className="r6-flex r6-justify-center r6-gap-1 r6-mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current r6-text-primary" />
              ))}
            </div>
            <p className="r6-text-gray">4.9/5 from 2,847 reviews</p>
          </div>
          
          <div className="r6-grid r6-grid-cols-1 r6-grid-cols-3-tablet">
            {[
              {
                name: 'Sarah Mitchell',
                location: 'Brisbane',
                text: 'Outstanding service during our flood emergency. Professional team arrived within an hour.'
              },
              {
                name: 'James Chen',
                location: 'Gold Coast',
                text: 'Excellent mould remediation service. Thorough, professional, and great communication throughout.'
              },
              {
                name: 'Emma Wilson',
                location: 'Sunshine Coast',
                text: 'Fire damage restoration was handled perfectly. They worked directly with our insurance.'
              }
            ].map((review, index) => (
              <div 
                key={index}
                className="r6-card r6-animate-scale-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="r6-card-body">
                  <div className="r6-flex r6-gap-1 r6-mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current r6-text-primary" />
                    ))}
                  </div>
                  <p className="r6-mb-4 r6-text-gray">{review.text}</p>
                  <div>
                    <div className="r6-font-semibold">{review.name}</div>
                    <div className="r6-text-sm r6-text-gray">{review.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Clean Design */}
      <footer className="r6-bg-dark r6-p-6">
        <div className="r6-container">
          <div className="r6-text-center">
            <p className="r6-text-light" style={{ opacity: 0.8 }}>
              © 2025 Disaster Recovery Queensland. All rights reserved.
            </p>
            <p className="r6-text-light r6-text-sm r6-mt-2" style={{ opacity: 0.6 }}>
              IICRC Certified | Insurance Approved | 24/7 Emergency Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}