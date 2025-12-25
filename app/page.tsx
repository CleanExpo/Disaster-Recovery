'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB] relative overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-[#00BFA6] to-[#3B82F6] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-[#8B5CF6] to-[#00BFA6] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-br from-[#0F1115] to-[#1a1d29] border-b border-[#374151]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00BFA6] to-[#7C4DFF] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">DR</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] bg-clip-text text-transparent">
                  Disaster Recovery
                </h1>
                <p className="text-xs text-[#9CA3AF]">NRPG Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors font-medium border border-[#374151] rounded-lg hover:border-[#00BFA6]">
                Sign In
              </button>
              <button className="px-6 py-2 bg-gradient-to-br from-[#00BFA6] to-[#7C4DFF] text-white rounded-lg font-semibold hover:opacity-90 transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] bg-clip-text text-transparent">
                Disaster Recovery
              </span>
              <br />
              <span className="text-[#F9FAFB]">Made Simple</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto mb-8">
              Connect with verified contractors instantly. Get your property restored fast.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-br from-[#00BFA6] to-[#7C4DFF] text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-[#00BFA6]/20">
                Get Started
              </button>
              <button className="px-8 py-4 border border-[#374151] text-[#F9FAFB] rounded-lg font-semibold hover:border-[#00BFA6] transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-gradient-to-b from-transparent to-[#1a1d29]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#F9FAFB] mb-4">The Problem</h2>
              <p className="text-xl text-[#9CA3AF]">When disaster strikes, finding help should not be another disaster.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#0F1115] p-8 rounded-2xl border border-[#374151]/50">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-bold text-[#F9FAFB] mb-2">Time Wasted</h3>
                <p className="text-[#9CA3AF]">Hours spent searching for available contractors during emergencies.</p>
              </div>
              <div className="bg-[#0F1115] p-8 rounded-2xl border border-[#374151]/50">
                <div className="text-4xl mb-4">❓</div>
                <h3 className="text-xl font-bold text-[#F9FAFB] mb-2">Unknown Quality</h3>
                <p className="text-[#9CA3AF]">No way to verify contractor credentials or past work quality.</p>
              </div>
              <div className="bg-[#0F1115] p-8 rounded-2xl border border-[#374151]/50">
                <div className="text-4xl mb-4">💸</div>
                <h3 className="text-xl font-bold text-[#F9FAFB] mb-2">Price Gouging</h3>
                <p className="text-[#9CA3AF]">Emergency situations often lead to inflated prices and hidden fees.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#F9FAFB] mb-4">The Solution</h2>
              <p className="text-xl text-[#9CA3AF]">Our platform connects you with verified contractors in minutes.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00BFA6] to-[#3B82F6] rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-[#F9FAFB] mb-2">AI-Powered Matching</h3>
                <p className="text-[#9CA3AF]">Our AI matches you with the best contractor for your specific needs.</p>
              </div>
              <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#7C4DFF]/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-[#7C4DFF] to-[#8B5CF6] rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-[#F9FAFB] mb-2">Fast Response</h3>
                <p className="text-[#9CA3AF]">Get connected with available contractors within minutes, not hours.</p>
              </div>
              <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#3B82F6]/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#00BFA6] rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-xl font-bold text-[#F9FAFB] mb-2">Verified Network</h3>
                <p className="text-[#9CA3AF]">All contractors are vetted, licensed, and insured for your peace of mind.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-[#0F1115] to-transparent py-16 border-t border-[#374151]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[#9CA3AF] text-sm">
              © 2025 Disaster Recovery NRPG Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
