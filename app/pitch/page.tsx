'use client';


import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function PitchSelectionOriginal() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const pitchOptions = [
    {
      id: 'investor',
      title: 'Investor Pitch',
      subtitle: 'For Venture Capitalists & Angel Investors',
      description: 'Powerful storytelling narrative showcasing our revolution in disaster recovery',
      icon: TrendingUp,
      color: 'from-purple-600 to-indigo-600',
      link: '/pitch/investor',
      features: [
        '$3M Series A Investment Ask',
        'Market Analysis & Projections',
        'Emotional Founder Story',
        'Exit Strategy & Returns'
      ]
    },
    {
      id: 'client',
      title: 'Client Pitch',
      subtitle: 'For Homeowners & Businesses',
      description: 'How we help you recover from disasters faster than ever before',
      icon: Users,
      color: 'from-blue-600 to-cyan-600',
      link: '/pitch/client',
      features: [
        '2-Hour Emergency Response',
        'Direct Insurance Integration',
        'Real-Time Tracking',
        '24/7 Support System'
      ],
      videoUrl: 'PENDING_CLIENT_VIDEO_URL' // Will be updated when you provide the URL
    },
    {
      id: 'contractor',
      title: 'Contractor Pitch',
      subtitle: 'For Restoration Professionals',
      description: 'Join our network and transform your business with instant payments',
      icon: Building2,
      color: 'from-green-600 to-emerald-600',
      link: '/pitch/contractor',
      features: [
        'Instant KPI-Based Payments',
        'Quality Lead Generation',
        'Clean Claims Integration',
        'No More 90-Day Wait'
      ],
      videoUrl: 'PENDING_CONTRACTOR_VIDEO_URL' // Will be updated when you provide the URL
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 60%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-100 to-indigo-100 bg-clip-text text-transparent">
                Choose Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Pitch Experience
              </span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Select the presentation tailored to your needs and discover how Disaster Recovery Pro
              is revolutionising the industry for everyone involved.
            </p>
          </motion.div>

          {/* Pitch Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {pitchOptions.map((pitch, index) => (
              <motion.div
                key={pitch.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                onMouseEnter={() => setHoveredCard(pitch.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group"
              >
                <Link href={pitch.link}>
                  <div className={`
                    relative overflow-hidden rounded-2xl border border-gray-800 
                    bg-gray-900/50 backdrop-blur-sm p-8
                    transition-all duration-300 cursor-pointer
                    ${hoveredCard === pitch.id ? 'scale-105 border-gray-600' : ''}
                  `}>
                    {/* Gradient Overlay */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br ${pitch.color} opacity-0 
                      group-hover:opacity-10 transition-opacity duration-300
                    `} />

                    {/* Icon */}
                    <div className={`
                      w-16 h-16 rounded-xl bg-gradient-to-r ${pitch.color} 
                      flex items-center justify-center mb-6
                    `}>
                      <pitch.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-2">{pitch.title}</h3>
                    <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{pitch.subtitle}</p>
                    <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{pitch.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {pitch.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className={`
                            w-1.5 h-1.5 rounded-full bg-gradient-to-r ${pitch.color} 
                            mt-2 flex-shrink-0
                          `} />
                          <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className={`
                      flex items-center gap-2 text-white font-semibold
                      group-hover:gap-4 transition-all duration-300
                    `}>
                      <span>View Presentation</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className={`
                        absolute bottom-0 left-0 right-0 h-1 
                        bg-gradient-to-r ${pitch.color}
                      `}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredCard === pitch.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Each presentation is specifically crafted for its audience. 
              Choose the one that best fits your role in the disaster recovery ecosystem.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export default function PitchSelection() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <PitchSelectionOriginal />;
  }

  return (
    <>
      <AntigravityNavbar />
      <PitchSelectionOriginal />
      <AntigravityFooter />
    </>
  );
}
