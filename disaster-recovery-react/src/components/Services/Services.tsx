import React from 'react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

const Services: React.FC = () => {
  const services: Service[] = [
    {
      title: 'Water Damage Restoration',
      description: 'Rapid water extraction and drying to prevent mold growth and structural damage.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      features: ['24/7 Emergency Response', 'Moisture Detection', 'Dehumidification', 'Mold Prevention'],
      color: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Fire & Smoke Damage',
      description: 'Complete restoration and odor removal after fire incidents.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      ),
      features: ['Soot Removal', 'Smoke Odor Elimination', 'Content Restoration', 'Air Quality Testing'],
      color: 'from-orange-500 to-red-600',
    },
    {
      title: 'Mold Remediation',
      description: 'Safe and thorough mold removal with prevention strategies.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: ['Air Quality Testing', 'HEPA Filtration', 'Antimicrobial Treatment', 'Prevention Plans'],
      color: 'from-green-500 to-teal-600',
    },
    {
      title: 'Storm Damage Repair',
      description: 'Emergency tarping, board-up services, and complete storm restoration.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      features: ['Emergency Tarping', 'Debris Removal', 'Structural Repairs', 'Insurance Claims'],
      color: 'from-purple-500 to-indigo-600',
    },
  ];

  return (
    <section id="services" className="py-20 bg-dark-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Professional</span>
            <span className="text-white"> Restoration Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive disaster recovery solutions with cutting-edge technology and certified experts
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="card group hover:transform hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <div className="text-white">{service.icon}</div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn more link */}
              <a
                href="#contact"
                className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium text-sm group-hover:gap-3 transition-all"
              >
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="#contact" className="btn-primary inline-flex items-center space-x-2">
            <span>Get Emergency Help Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;