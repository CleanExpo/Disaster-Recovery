'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Home,
  Shield,
  Clock,
  Phone,
  CheckCircle2,
  ArrowLeft,
  Maximize2,
  Volume2
} from 'lucide-react';
import Link from 'next/link';

export default function ClientPitch() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoUrl = "https://www.youtube.com/embed/hKwPx8JAInk";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-gray-900">
      {/* Header */}
      <div className="relative z-20 px-6 py-4 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            href="/pitch" 
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Pitch Selection</span>
          </Link>
          <h1 className="text-xl font-semibold text-white">Client Presentation</h1>
          <div className="w-32" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Your Home. Your Business.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Our Priority.
              </span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              When disaster strikes, every minute counts. Discover how we're revolutionizing 
              disaster recovery with 2-hour response times and real-time tracking.
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
            style={{ aspectRatio: '16/9' }}
          >
            <iframe
              src={`${videoUrl}?autoplay=0&controls=1&rel=0&modestbranding=1&enablejsapi=1`}
              title="Disaster Recovery Client Presentation"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              frameBorder="0"
            />
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
              <Clock className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">2-Hour Response</h3>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Guaranteed contractor contact within 2 hours of your claim
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <Shield className="w-10 h-10 text-cyan-600 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Claims Documentation</h3>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                We provide everything your insurer needs to process your reimbursement
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
              <CheckCircle2 className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Verified Contractors</h3>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                All contractors are licenced, insured, and quality-verified
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <Phone className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Real-time tracking and support throughout your recovery
              </p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Don't Wait for Disaster to Strike
            </h2>
            <p className="mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Join thousands of homeowners and businesses who trust us with their recovery needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all hover:scale-105">
                Get Emergency Help Now
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-gray-600 hover:bg-white/20 transition-all">
                Learn More About Coverage
              </button>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="mb-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Trusted by:</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Major Insurance Partners</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>•</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>3,450+ Families Helped</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>•</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>National Coverage</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}