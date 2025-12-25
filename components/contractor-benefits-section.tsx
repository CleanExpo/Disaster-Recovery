import React from 'react'

export default function ContractorBenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1a1d29]/50 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            Benefits for <span className="gradient-text-teal-purple">Contractors</span>
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Grow your business with our powerful contractor platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA6] to-[#3B82F6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">More Jobs, More Revenue</h3>
            <p className="text-[#9CA3AF]">
              Access a steady stream of qualified leads. Fill your schedule and grow your business.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#7C4DFF]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7C4DFF] to-[#8B5CF6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">Targeted Leads</h3>
            <p className="text-[#9CA3AF]">
              Get matched with jobs that fit your expertise and location. No more wasted time on unsuitable leads.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#3B82F6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#00BFA6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">Instant Job Alerts</h3>
            <p className="text-[#9CA3AF]">
              Get notified immediately when new jobs match your criteria. Be the first to respond.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA6] to-[#3B82F6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">Mobile App</h3>
            <p className="text-[#9CA3AF]">
              Manage your business on the go. Accept jobs, update status, and communicate with clients from your phone.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#7C4DFF]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7C4DFF] to-[#8B5CF6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">Fast Payment</h3>
            <p className="text-[#9CA3AF]">
              Get paid quickly and securely. No more chasing payments or dealing with late payers.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#3B82F6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#00BFA6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">Build Your Reputation</h3>
            <p className="text-[#9CA3AF]">
              Showcase your work and collect reviews. Build trust and attract more clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
