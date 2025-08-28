import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: '24/7 Emergency Response',
      description: 'Round-the-clock availability for immediate disaster response',
      icon: '🚨',
    },
    {
      title: 'Certified Technicians',
      description: 'IICRC certified professionals with years of experience',
      icon: '👷',
    },
    {
      title: 'Advanced Equipment',
      description: 'State-of-the-art restoration technology and tools',
      icon: '🔧',
    },
    {
      title: 'Insurance Support',
      description: 'Direct billing and claim assistance for all major insurers',
      icon: '📋',
    },
    {
      title: 'Rapid Response Time',
      description: 'On-site within 60 minutes of your emergency call',
      icon: '⚡',
    },
    {
      title: 'Comprehensive Services',
      description: 'Complete restoration from initial assessment to final repairs',
      icon: '🏗️',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Why Choose </span>
            <span className="gradient-text">Our Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Industry-leading disaster recovery with unmatched expertise and commitment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative card">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;