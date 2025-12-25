import React from 'react'

export default function ClientBenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-[#1a1d29]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            Benefits for <span className="gradient-text-teal-purple">Clients</span>
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Experience disaster recovery like never before with our innovative platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA6] to-[#3B82F6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">Lightning Fast Response</h3>
            <p className="text-[#9CA3AF]">
              Get matched with qualified contractors in under 60 seconds. No more waiting days for quotes.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#7C4DFF]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7C4DFF] to-[#8B5CF6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">Verified Contractors</h3>
            <p className="text-[#9CA3AF]">
              All contractors are thoroughly vetted, insured, and rated by our community. Quality guaranteed.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#3B82F6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#00BFA6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">Competitive Pricing</h3>
            <p className="text-[#9CA3AF]">
              Get multiple quotes instantly and choose the best price. Transparent pricing with no hidden fees.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA6] to-[#3B82F6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">Real-Time Updates</h3>
            <p className="text-[#9CA3AF]">
              Track your job progress in real-time. Know exactly when help is arriving and what's being done.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#7C4DFF]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7C4DFF] to-[#8B5CF6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">Secure & Protected</h3>
            <p className="text-[#9CA3AF]">
              Your information is encrypted and secure. We protect your privacy and data at all times.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#3B82F6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#00BFA6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">Quality Assurance</h3>
            <p className="text-[#9CA3AF]">
              Rate and review contractors. Help build a community of trusted professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
